/**
 * @fileoverview Lithos UI Drawer primitive.
 * - Renders temporary overlay drawers as well as permanent and mini layout sidebars.
 * - Integrates accessibility features, popovers, portals, and gesture swipe interactions.
 */
import { useEffect, useRef, useMemo, useId, lazy, Suspense, isValidElement, cloneElement, type MouseEvent } from 'react'
import { cn } from '../../../utils/cn'
import { Popover, PopoverTrigger, PopoverContent } from '../Popover'
import { FloatingPortal } from '@floating-ui/react'

import { DrawerContext } from './useDrawer'
import { getDrawerClasses, getDuration } from './drawer.utils'
import type { DrawerProps } from './drawer.types'
import { useDrawerSwipe } from './useDrawerSwipe'
import { DrawerIndicator } from './DrawerIndicator'
import { useMediaQuery } from '../../../core/hooks/useMediaQuery'

const Dialog = lazy(() => import('../Dialog').then((mod) => ({ default: mod.Dialog })))

export const Drawer = ({
  open,
  onOpenChange,
  mode = 'default',
  placement = mode === 'responsive' ? 'bottom' : 'right',
  transition = 'slide',
  transformOrigin,
  children,
  onEnter,
  onExit,
  className,
  backdropClass = 'bg-black/50',
  trigger,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  'aria-describedby': ariaDescribedBy,
  transitionDuration = 150,
  swipeOnlyOnIndicator = false,
  allowSwipeOnContent = true,
  indicator = placement === 'bottom' || placement === 'top',
  indicatorLabel,
  threshold = 100,
}: DrawerProps) => {
  const isFirstRender = useRef(true)
  const isDesktop = useMediaQuery('(min-width: 768px)')

  const shouldRenderDialog = mode === 'responsive' && isDesktop

  const generatedTitleId = useId()
  const titleId = ariaLabelledBy ?? generatedTitleId
  const resolvedLabelledBy = ariaLabel ? undefined : titleId

  const activeDuration = getDuration(transitionDuration, open)
  const activeDurationMS = `${activeDuration}ms`

  const a11y = {
    role: 'dialog',
    'aria-label': ariaLabel,
    'aria-labelledby': resolvedLabelledBy,
    'aria-describedby': ariaDescribedBy ?? undefined,
  }

  const { handlers: swipeHandlers, style: swipeStyle } = useDrawerSwipe({
    placement,
    open,
    onClose: () => onOpenChange(false),
    threshold,
    allowSwipeOnContent,
  })

  const handleTarget = swipeOnlyOnIndicator ? undefined : swipeHandlers

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    if (open) {
      onEnter?.()
    } else {
      onExit?.()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  useEffect(() => {
    if (shouldRenderDialog) return

    const originalStyle = window.getComputedStyle(document.body).overflow

    if (open) {
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.body.style.overflow = originalStyle
    }
  }, [open, shouldRenderDialog])

  const desktopTrigger = isValidElement(trigger)
    ? cloneElement(trigger, {
        onClick: (e: MouseEvent) => {
          ;(trigger.props as { onClick?: (e: MouseEvent) => void }).onClick?.(e)
          onOpenChange(true)
        },
      } as Record<string, unknown>)
    : trigger

  const contextValue = useMemo(
    () => ({
      open,
      onOpenChange,
      mode,
      isDesktop,
      titleId,
    }),
    [open, onOpenChange, mode, isDesktop, titleId]
  )

  if (shouldRenderDialog) {
    return (
      <DrawerContext.Provider value={contextValue}>
        {desktopTrigger}
        <Suspense fallback={null}>
          <Dialog open={open} onClose={() => onOpenChange(false)}>
            {children}
          </Dialog>
        </Suspense>
      </DrawerContext.Provider>
    )
  }

  const isVertical = placement === 'top' || placement === 'bottom'
  const touchClass = isVertical ? 'touch-pan-y' : 'touch-pan-x'

  const contentClasses = cn(
    'fixed bg-(--lithos-surface) min-w-[unset] border-0 shadow-none rounded-none p-0 z-(--lithos-z-drawer) select-none',
    touchClass,

    // disable image & links native drags
    '[&_a]:select-none [&_img]:select-none [&_a]:[-webkit-user-drag:none] [&_img]:[-webkit-user-drag:none]',

    'transition-[translate,scale,opacity,transform] ease-out',
    getDrawerClasses(transition, placement, transformOrigin),
    className
  )

  return (
    <Popover matchTriggerWidth={false} open={open} onOpenChange={onOpenChange}>
      {trigger && <PopoverTrigger asChild>{trigger}</PopoverTrigger>}

      <DrawerContext.Provider value={contextValue}>
        <FloatingPortal>
          <div
            aria-hidden={!open}
            className={cn('fixed inset-0 z-(--lithos-z-drawer)', open ? 'pointer-events-auto' : 'pointer-events-none')}
          >
            <div
              aria-hidden="true"
              onClick={() => onOpenChange(false)}
              className={cn(
                'absolute inset-0 transition-opacity ease-out z-(--lithos-z-overlay)',
                backdropClass,
                open ? 'opacity-100' : 'opacity-0'
              )}
              style={{ transitionDuration: activeDurationMS }}
            />

            <PopoverContent
              portaled={false}
              aria-modal="true"
              {...a11y}
              {...handleTarget}
              style={{
                position: 'fixed',
                top: 'auto',
                transform: swipeStyle.transform ?? undefined,
                left: 'auto',
                transitionDuration: activeDurationMS,
                ...swipeStyle,
              }}
              className={contentClasses}
              transitionDuration={activeDuration}
            >
              {indicator && (
                <DrawerIndicator
                  aria-label={indicatorLabel}
                  placement={placement}
                  swipeHandlers={swipeOnlyOnIndicator ? swipeHandlers : undefined}
                />
              )}

              <div data-scrollable className="flex flex-col h-full w-full overflow-y-scroll overflow-x-hidden">
                {children}
              </div>
            </PopoverContent>
          </div>
        </FloatingPortal>
      </DrawerContext.Provider>
    </Popover>
  )
}
