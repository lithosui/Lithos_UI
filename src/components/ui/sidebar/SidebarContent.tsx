/**
 * @fileoverview Lithos UI SidebarContent structural primitive.
 * - Dynamic semantic landmark container: maps `role` prop to accessible HTML elements (`nav`, `section`, `div`, `aside`).
 * - Smooth width transitions (`duration-150 ease-out`) adjusting between breakpoints or layout modes.
 * - Integrated resizer gesture control using the dedicated `useResizer` hook.
 */
import { useMemo, useEffect, type ElementType } from 'react'
import type { SidebarContentProps } from './sidebar.types'
import { useSidebar } from './useSidebar'
import { cn } from '../../../utils/cn'
import { useResizer } from '../../../core/hooks/useResizer'

const containersMap = {
  complementary: 'div',
  region: 'section',
  navigation: 'nav',
} as const

/**
 * Structural container for sidebar items and content blocks, supporting touch gestures, resizing, and semantic landmarks.
 *
 * @template T - Polymorphic element type override.
 * @param props - Configuration props for gestures, resizer handles, and styling. - {@link SidebarContentProps}
 * @returns Semantic landmark container wrapping sidebar content.
 */
export const SidebarContent = <T extends ElementType = 'aside'>({
  allowSwipeOnContent = true,
  resizerAriaLabel = 'Resize sidebar',
  resizerClass,
  resizerIndicatorClass,
  resizer,
  className,
  children,
  style,
  openThresholdOffset = 8,
  ...rest
}: SidebarContentProps<T>) => {
  const { role, mode, open, setOpen, placement, breakpoints, activeWidth, setActiveWidth, setIsDragging } = useSidebar()

  // Minimum and maximum thresholds dynamically derived from sorted breakpoints
  const minWidthPx = breakpoints[0] ?? 64
  const maxWidthPx = breakpoints[breakpoints.length - 1] ?? 224

  const isPermanent = mode === 'permanent'
  const isResizable = !isPermanent

  const currentBaseWidth = open ? activeWidth : minWidthPx

  const {
    handlers,
    style: resizerStyle,
    isDragging,
  } = useResizer({
    placement,
    baseWidthPx: currentBaseWidth,
    minWidthPx,
    maxWidthPx,
    snapPoints: breakpoints,
    allowGestureOnContent: allowSwipeOnContent,
    onDrag: (currentWidth) => {
      const closedBoundary = minWidthPx

      // soft hysteresis, requires passing threshold to open, but closes
      // immediately upon returning to or below the boundary
      if (currentWidth > closedBoundary + openThresholdOffset) {
        setOpen(true)
      } else if (currentWidth <= closedBoundary) {
        setOpen(false)
      }
    },
    onSnap: (snappedWidth) => {
      setActiveWidth(snappedWidth)

      const closedBoundary = minWidthPx
      setOpen(snappedWidth > closedBoundary)
    },
    onDismiss: () => setOpen(false),
  })

  // Sync internal dragging state with context
  useEffect(() => {
    setIsDragging(isDragging)
  }, [isDragging, setIsDragging])

  const ResolvedContainer = (containersMap[role] ?? 'aside') as ElementType
  const activeHandlers = isResizable ? handlers : {}

  // Priority: active drag style > computed pixel width > external style prop
  const dynamicStyle = useMemo(() => {
    if (isDragging) return { ...style, ...resizerStyle }
    if (isPermanent) return { ...style, width: `${maxWidthPx}px` }

    const targetWidth = open ? activeWidth : minWidthPx
    return { ...style, width: `${targetWidth}px` }
  }, [isDragging, style, resizerStyle, activeWidth, open, isPermanent, minWidthPx, maxWidthPx])

  const isLeft = placement === 'left'

  return (
    <ResolvedContainer
      className={cn(
        'relative flex flex-col h-full shrink-0 bg-(--lithos-surface) overflow-y-auto overflow-x-hidden border-(--lithos-border) p-2',
        !isDragging && 'transition-[width] duration-150 ease-out',
        isLeft ? 'border-r-2' : 'border-l-2',
        className
      )}
      style={dynamicStyle}
      {...activeHandlers}
      {...rest}
    >
      {children}

      {isResizable &&
        (resizer ?? (
          <div
            role="separator"
            aria-orientation="vertical"
            aria-label={resizerAriaLabel}
            className={cn(
              'absolute top-0 bottom-0 z-10 w-3 cursor-col-resize touch-none select-none group',
              'flex items-center justify-center transition-colors',
              isLeft ? 'right-0 translate-x-1/2' : 'left-0 -translate-x-1/2',
              resizerClass
            )}
            onPointerDown={(e) => e.stopPropagation()}
          >
            <div
              className={cn(
                'h-full w-0.5 bg-transparent transition-colors group-hover:bg-(--lithos-border)',
                isDragging && 'bg-(--lithos-accent) w-1',
                resizerIndicatorClass
              )}
            />
          </div>
        ))}
    </ResolvedContainer>
  )
}
