/**
 * @fileoverview Lithos UI Drawer visual handle indicator component.
 * - Displays a drag handle bar and captures swipe gesture handlers for touch/mouse interactions.
 */
import type { DrawerPlacement } from './drawer.types'
import { cn } from '../../../utils/cn'
import type { DrawerIndicatorProps } from './drawer.types'

const indicatorClasses: Record<DrawerPlacement, string> = {
  bottom: 'top-2',
  top: 'bottom-2',
  left: 'right-2',
  right: 'left-2',
}

/**
 * Visual drag indicator handle component for swipeable drawers.
 *
 * @param props - Indicator properties including placement edge, gesture handlers, and accessible labels. - {@link DrawerIndicatorProps}
 * @returns Indicator handle element.
 */
export const DrawerIndicator = ({
  placement,
  swipeHandlers,
  'aria-label': indicatorLabel = 'Drag handle',
}: DrawerIndicatorProps) => {
  const isHorizontal = placement === 'left' || placement === 'right'

  return (
    <div
      {...swipeHandlers}
      className={cn(
        'relative absolute bg-(--lithos-border) rounded-full touch-none select-none cursor-grab active:cursor-grabbing',
        'before:content-[""] before:absolute before:-inset-3 before:z-10',
        isHorizontal ? 'h-16 w-2 top-1/2 -translate-y-1/2' : 'w-16 h-2 left-1/2 -translate-x-1/2',
        indicatorClasses[placement]
      )}
      aria-label={indicatorLabel}
    />
  )
}
