import type { ComponentPropsWithRef } from 'react'
import { DialogBody } from '../Dialog'
import { cn, type LithosClass } from '../../../utils/cn'
import { useDrawer } from './useDrawer'

export interface DrawerBodyProps extends Omit<ComponentPropsWithRef<'div'>, 'className'> {
  className?: LithosClass
}

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
