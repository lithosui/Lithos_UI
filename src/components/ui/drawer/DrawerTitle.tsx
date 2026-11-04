/**
 * @fileoverview Lithos UI DrawerTitle component.
 * - Provides accessible header typography linked to dialog ARIA attributes.
 * - Renders as DialogTitle when responsive desktop mode is active.
 */
import { DialogTitle } from '../Dialog'
import { cn } from '../../../utils/cn'
import { useDrawer } from './useDrawer'
import type { DrawerTitleProps } from './drawer.types'

/**
 * Heading title component for drawers linked to accessibility attributes.
 *
 * @param props - Drawer title properties including IDs, custom classes, and text children. - {@link DrawerTitleProps}
 * @returns Heading h2 element or DialogTitle when in responsive desktop mode.
 */
export const DrawerTitle = ({ id, className, children, ...props }: DrawerTitleProps) => {
  const { mode, isDesktop, titleId } = useDrawer()

  if (mode === 'responsive' && isDesktop) {
    return (
      <DialogTitle className={className} {...props}>
        {children}
      </DialogTitle>
    )
  }

  return (
    <h2 id={id ?? titleId} className={cn('text-lg font-semibold', className)} {...props}>
      {children}
    </h2>
  )
}
