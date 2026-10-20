/**
 * @fileoverview Lithos UI tooltip primitive.
 * - Wraps Popover to reuse floating placement, hover delay, and overlay state management.
 * - Injects custom middlewares (`flip`, `arrow`) and passes an internal `arrowRef` via context.
 * - Defaults `role='tooltip'` and sets `matchTriggerWidth={false}` to maintain a compact overlay.
 */
import { useRef, useMemo, type ReactNode, type RefObject } from 'react'
import { Popover, usePopoverContext } from '../Popover'
import { TooltipContext } from './useTooltip'
import { flip, arrow } from '@floating-ui/react'
import type { TooltipProps } from './tooltip.types'

interface TooltipProviderProps {
  arrowRef: RefObject<SVGSVGElement | null>
  children: ReactNode
}

const TooltipProvider = ({ arrowRef, children }: TooltipProviderProps) => {
  const { open, setOpen } = usePopoverContext()

  const value = useMemo(
    () => ({
      open,
      setOpen,
      arrowRef,
    }),
    [open, setOpen, arrowRef]
  )

  return <TooltipContext.Provider value={value}>{children}</TooltipContext.Provider>
}

const TooltipRoot = ({ children, offset: consumerOffset = 4, placement = 'top', ...rest }: TooltipProps) => {
  const arrowRef = useRef<SVGSVGElement | null>(null)

  const tooltipMiddlewares = useMemo(
    () => [flip({ fallbackAxisSideDirection: 'start' }), arrow({ element: arrowRef })],
    []
  )

  return (
    <Popover
      placement={placement}
      offset={consumerOffset + 8}
      matchTriggerWidth={false}
      middlewares={tooltipMiddlewares}
      {...rest}
      hover={{ move: false }}
      role="tooltip"
    >
      <TooltipProvider arrowRef={arrowRef}>{children}</TooltipProvider>
    </Popover>
  )
}

export const Tooltip = ({ children, ...rest }: TooltipProps) => <TooltipRoot {...rest}>{children}</TooltipRoot>
