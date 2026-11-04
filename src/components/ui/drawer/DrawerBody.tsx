/**
 * @fileoverview Lithos UI DrawerBody component.
 * - Serves as the main scrollable content container for the Drawer primitive.
 * - Dynamically renders a DialogBody on desktop when responsive mode is enabled.
 */
import { DialogBody } from '../Dialog'
import { cn } from '../../../utils/cn'
import { useDrawer } from './useDrawer'
import type { DrawerBodyProps } from './drawer.types.ts'

/**
 * Scrollable body content container component for drawers.
 *
 * @param props - Drawer body properties including custom class names and children elements. - {@link DrawerBodyProps}
 * @returns Scrollable container div element or DialogBody when in responsive desktop mode.
 */
export const DrawerBody = ({ className, children, ...props }: DrawerBodyProps) => {
  const { mode, isDesktop } = useDrawer()

  if (mode === 'responsive' && isDesktop) {
    return (
      <DialogBody className={className} {...props}>
        {children}
      </DialogBody>
    )
  }

  return (
    <div className={cn('flex-1 overflow-y-auto p-4', className)} {...props}>
      {children}
    </div>
  )
}
