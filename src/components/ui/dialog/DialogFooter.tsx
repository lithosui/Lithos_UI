/**
 * @fileoverview Lithos UI DialogFooter toolbar action container component.
 * - Aligns action buttons to the right and renders a top dividing border when scrollable mode is active.
 */
import type { DialogFooterProps } from './dialog.types'
import { useDialog } from './useDialog'
import { cn } from '../../../utils/cn'

/**
 * Footer container component for action buttons inside modal dialogs.
 *
 * @param props - Dialog footer properties including custom class names and action children. - {@link DialogFooterProps}
 * @returns Footer action container div element.
 */
export const DialogFooter = ({ className, children, ...rest }: DialogFooterProps) => {
  const { scrollable } = useDialog()

  return (
    <div
      className={cn(
        'flex items-center justify-end shrink-0 p-4 sm:p-6',
        scrollable && 'border-t-2 border-(--lithos-border)',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  )
}
