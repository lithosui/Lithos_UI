import type { ComponentPropsWithRef } from 'react'
import { DialogTitle } from '../Dialog'
import { cn, type LithosClass } from '../../../utils/cn'
import { useDrawer } from './useDrawer'

export interface DrawerTitleProps extends Omit<ComponentPropsWithRef<'h2'>, 'className'> {
  className?: LithosClass
}

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
