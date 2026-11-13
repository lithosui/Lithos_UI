/**
 * @fileoverview Lithos UI DialogBody scrollable container component.
 * - Provides vertical scrolling bounds and padding for primary dialog content.
 */
import type { DialogBodyProps } from './dialog.types'
import { cn } from '../../../utils/cn'

/**
 * Scrollable content body container component for modal dialogs.
 *
 * @param props - Dialog body properties including custom class names and children elements. - {@link DialogBodyProps}
 * @returns Scrollable container div element.
 */
export const DialogBody = ({ className, children, ...rest }: DialogBodyProps) => (
  <div className={cn('flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 font-body', className)} {...rest}>
    {children}
  </div>
)
