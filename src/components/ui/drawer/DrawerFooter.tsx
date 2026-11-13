/**
 * @fileoverview Lithos UI DrawerFooter component.
 * - Renders the bottom action bar container for the Drawer primitive.
 * - Adaptively renders DialogFooter when operating in responsive desktop view.
 */
import { DialogFooter } from '../Dialog'
import { cn } from '../../../utils/cn'
import { useDrawer } from './useDrawer'
import type { DrawerFooterProps } from './drawer.types'

/**
 * Footer action container component for drawer buttons.
 *
 * @param props - Drawer footer properties including custom class names and action children. - {@link DrawerFooterProps}
 * @returns Footer action container element or DialogFooter when in responsive desktop mode.
 */
export const DrawerFooter = ({ className, children, ...props }: DrawerFooterProps) => {
  const { mode, isDesktop } = useDrawer()

  if (mode === 'responsive' && isDesktop) {
    return (
      <DialogFooter className={className} {...props}>
        {children}
      </DialogFooter>
    )
  }

  return (
    <div
      className={cn('flex shrink-0 p-4 items-center justify-end border-t border-(--lithos-border) mt-auto', className)}
      {...props}
    >
      {children}
    </div>
  )
}
