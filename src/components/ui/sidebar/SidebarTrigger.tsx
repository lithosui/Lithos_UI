/**
 * @fileoverview Lithos UI SidebarTrigger toggle primitive.
 * - Conditional visibility controller: automatically unmounts when layout mode is `'permanent'`.
 * - Polymorphic architecture: renders a default Lithos `Button` or delegates to a custom trigger element via `asChild`.
 * - Toggles open/collapsed state, merges nested `onClick` handlers, and configures fallback icon dimensions via `iconSize`.
 */
import {
  cloneElement,
  isValidElement,
  useEffect,
  useCallback,
  Fragment,
  type ReactElement,
  type ElementType,
  type MouseEvent,
  type ComponentPropsWithRef,
  type MouseEventHandler,
} from 'react'
import type { SidebarTriggerProps } from './sidebar.types'
import { useSidebar } from './useSidebar'
import { Button } from '../Button'
import { IconChevronLeft } from '../icons/IconChevronLeft'
import { IconSidebar } from '../icons/IconSidebar'
import { Tooltip, TooltipContent, TooltipTrigger } from '../Tooltip'
import { isShortcutPressed, getShortcutKeys } from './sidebar.utils'
import { Kbd } from '../Kbd'

/**
 * Control button component to toggle the sidebar open or collapsed state, supporting keyboard shortcuts and tooltips.
 *
 * @template T - Polymorphic element type override.
 * @param props - Configuration props including shortcut keys, label, and disableTooltip. - {@link SidebarTriggerProps}
 * @returns Interactive toggle button component.
 */
export const SidebarTrigger = <T extends ElementType = 'button'>({
  children,
  className,
  label,
  asChild = false,
  onClick,
  iconSize = 18,
  disableTooltip = false,
  tooltipPlacement,
  shortcutKey = 'ctrl+b',
  ...rest
}: SidebarTriggerProps<T>) => {
  const { mode, open, setOpen, placement, setActiveWidth, breakpoints } = useSidebar()
  const isRight = placement === 'right'

  const computedTooltipPlacement = tooltipPlacement ?? (isRight ? 'left' : 'right')

  const toggleSidebar = useCallback(() => {
    setOpen((prevOpen) => {
      const nextOpen = !prevOpen

      const newWidth = nextOpen ? (breakpoints.at(-1) ?? 224) : (breakpoints[0] ?? 64)

      setActiveWidth(newWidth)

      return nextOpen
    })
  }, [breakpoints, setActiveWidth, setOpen])

  useEffect(() => {
    if (!shortcutKey || mode === 'permanent') return

    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      const isInput =
        target?.tagName === 'INPUT' ||
        target?.tagName === 'TEXTAREA' ||
        target?.tagName === 'SELECT' ||
        target?.isContentEditable

      if (isInput) return

      if (isShortcutPressed(event, shortcutKey)) {
        event.preventDefault()

        toggleSidebar()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [shortcutKey, mode, toggleSidebar])

  if (mode === 'permanent') return null

  const renderDefaultIcon = () => {
    if (open) {
      return isRight ? <IconChevronLeft size={iconSize} className="rotate-180" /> : <IconChevronLeft size={iconSize} />
    }

    return <IconSidebar size={iconSize} className={isRight ? 'scale-x-[-1]' : undefined} />
  }

  const defaultIcon = renderDefaultIcon()
  const ariaLabel = label ?? (open ? 'Collapse sidebar' : 'Expand sidebar')

  const formattedKeys = shortcutKey ? getShortcutKeys(shortcutKey) : []

  const content = (
    <div className="flex items-center space-x-1.5">
      <span>{ariaLabel}</span>
      {formattedKeys.length > 0 && (
        <div className="ml-1 inline-flex items-center space-x-1">
          {formattedKeys.map((key, i) => (
            <Fragment key={`${key}-${i}`}>
              <Kbd className="text-md">{key}</Kbd>
              {i < formattedKeys.length - 1 && (
                <span className="font-mono text-xs font-bold opacity-60 text-(--lithos-text)">+</span>
              )}
            </Fragment>
          ))}
        </div>
      )}
    </div>
  )

  let triggerElement: ReactElement

  if (asChild && isValidElement(children)) {
    const child = children as ReactElement<ComponentPropsWithRef<T>>
    const childOnClick = child.props.onClick as ((e: MouseEvent<HTMLElement>) => void) | undefined
    const parentOnClick = onClick as ((e: MouseEvent<HTMLElement>) => void) | undefined

    const handleCombinedClick = (e: MouseEvent<HTMLElement>) => {
      childOnClick?.(e)
      parentOnClick?.(e)
      toggleSidebar()
    }

    triggerElement = cloneElement(child, {
      ...rest,
      onClick: handleCombinedClick,
      'aria-label': child.props['aria-label'] ?? ariaLabel,
    } as unknown as ComponentPropsWithRef<T>)
  } else {
    triggerElement = (
      <Button
        variant="text"
        onClick={(e) => {
          ;(onClick as MouseEventHandler<HTMLButtonElement>)?.(e)
          toggleSidebar()
        }}
        className={className}
        aria-label={ariaLabel}
        {...rest}
      >
        {children ?? defaultIcon}
      </Button>
    )
  }

  if (disableTooltip) return triggerElement

  return (
    <Tooltip key={String(open)} placement={computedTooltipPlacement}>
      <TooltipTrigger asChild>{triggerElement}</TooltipTrigger>
      <TooltipContent>{content}</TooltipContent>
    </Tooltip>
  )
}
