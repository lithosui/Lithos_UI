/**
 * @fileoverview Lithos UI popover state primitive.
 * - Manages floating placement, backdrop interactions, open state (controlled/uncontrolled), and ARIA attributes.
 * - Encapsulates `@floating-ui/react` logic into a single reusable hook and Context provider.
 */
import { useState, useMemo, createContext, useContext, useId } from 'react'
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useRole,
  useClick,
  useDismiss,
  useHover,
  useInteractions,
  size,
  type Middleware,
} from '@floating-ui/react'
import type { PopoverOptions, PopoverReturn, PopoverContextType } from './popover.types'

/**
 * Custom state hook wrapping `@floating-ui/react` primitives to manage positioning, auto-updates, and interactions.
 *
 * @param options - Popover configuration options.
 * @returns Popover return state and interaction handlers object.
 */
export const usePopover = ({
  initialOpen = false,
  placement = 'bottom-start',
  modal,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
  interactions: extraInteractions = [],
  offset: consumerOffset,
  hover: hoverOptions = false,
  role,
  matchTriggerWidth = true,
  middlewares,
}: PopoverOptions = {}): PopoverReturn => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(initialOpen)
  const labelId = useId()
  const descriptionId = useId()

  const open = controlledOpen ?? uncontrolledOpen
  const setOpen = setControlledOpen ?? setUncontrolledOpen

  const mergedMiddlewares = useMemo(() => {
    const defaultMiddlewares = [
      offset(consumerOffset ?? 0),
      flip({
        fallbackAxisSideDirection: 'end',
      }),
      shift({ padding: 8 }),
      matchTriggerWidth &&
        size({
          apply: ({ rects, elements }) => {
            const width = `${rects.reference.width}px`

            if (elements.floating.style.width !== width) {
              elements.floating.style.width = width
            }
          },
        }),
    ].filter(Boolean)

    if (!middlewares?.length) return defaultMiddlewares

    const customNames = new Set(middlewares.map((m) => m.name))

    // keep the default whose 'name' wasn't overwritten on the 'middlewares' prop
    const filteredDefaults = defaultMiddlewares.filter((m) => !customNames.has((m as Middleware).name))

    return [...filteredDefaults, ...middlewares]
  }, [middlewares, consumerOffset, matchTriggerWidth])

  const data = useFloating({
    placement,
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: mergedMiddlewares,
  })

  const { context } = data

  const hover = useHover(context, {
    enabled: !!hoverOptions,
    ...(typeof hoverOptions === 'object' ? hoverOptions : {}),
  })

  const click = useClick(context)
  const dismiss = useDismiss(context)
  const usedRole = useRole(context, { enabled: !!role, role })
  const interactions = useInteractions([click, hover, dismiss, usedRole, ...extraInteractions])

  return useMemo(
    () => ({
      open,
      setOpen,
      ...interactions,
      ...data,
      modal,
      labelId,
      descriptionId,
    }),
    [open, setOpen, interactions, data, modal, labelId, descriptionId]
  )
}

export const PopoverContext = createContext<PopoverContextType>(null)

/**
 * Custom hook to consume popover context values safely.
 *
 * @throws {Error} If called outside of a valid `<Popover>` component hierarchy.
 * @returns Current popover context return values.
 */
export const usePopoverContext = (): PopoverReturn => {
  const context = useContext(PopoverContext)
  if (!context) throw new Error('Popover components must be wrapped in <Popover />')

  return context
}
