/**
 * @fileoverview Lithos UI CommandDialog component.
 * - Encapsulates the command palette inside a modal dialog container overlay.
 */
import { cn } from '../../../utils/cn'
import { Dialog } from '../Dialog'
import type { CommandDialogProps } from './command.types'

/**
 * Modal dialog wrapper component for displaying the command palette as an overlay.
 *
 * @param props - Dialog properties including open states, close handlers, and command children. - {@link CommandDialogProps}
 * @returns Modal dialog wrapper element.
 */
export const CommandDialog = ({ open, onClose, className, children, ...rest }: CommandDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      size="md"
      variant="default"
      className={cn(
        'p-0 overflow-hidden **:data-[slot=command]:border-0 **:data-[slot=command]:shadow-none **:data-[slot=command]:rounded-none',
        className
      )}
      {...rest}
    >
      {children}
    </Dialog>
  )
}
