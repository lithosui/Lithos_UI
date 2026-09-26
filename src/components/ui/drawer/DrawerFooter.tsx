import type { ComponentPropsWithRef } from 'react'
import { DialogFooter } from '../Dialog'
import { cn, type LithosClass } from '../../../utils/cn'
import { useDrawer } from './useDrawer'

export interface DrawerFooterProps extends Omit<ComponentPropsWithRef<'div'>, 'className'> {
  className?: LithosClass
}

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
