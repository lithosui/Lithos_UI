/**
 * @fileoverview Lithos UI DrawerHeader component.
 * - Encloses top title and navigation elements within the Drawer primitive.
 * - Switches to DialogHeader when responsive desktop view is activated.
 */
import { DialogHeader } from '../Dialog'
import { cn } from '../../../utils/cn'
import { useDrawer } from './useDrawer'
import type { DrawerHeaderProps } from './drawer.types'

/**
 * Header title bar component for drawers.
 *
 * @param props - Drawer header properties including custom class names and header children. - {@link DrawerHeaderProps}
 * @returns Header container element or DialogHeader when in responsive desktop mode.
 */
export const DrawerHeader = ({ className, children, ...props }: DrawerHeaderProps) => {
  const { mode, isDesktop } = useDrawer()

  if (mode === 'responsive' && isDesktop) {
    return (
      <DialogHeader className={className} {...props}>
        {children}
      </DialogHeader>
    )
  }

  return (
    <div className={cn('flex-shrink-0 p-4 border-b border-(--lithos-border)', className)} {...props}>
      {children}
    </div>
  )
}
