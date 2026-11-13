/**
 * @fileoverview Lithos UI CustomDialog composite component.
 * - Pre-composed action prompt layout combining Dialog, Header, Title, Body, and Footer for confirmation and destructive flows.
 */
import type { CustomDialogProps } from './dialog.types'
import { DialogHeader } from './DialogHeader'
import { DialogBody } from './DialogBody'
import { DialogFooter } from './DialogFooter'
import { Dialog } from './Dialog'
import { DialogTitle } from './DialogTitle'
import { Button } from '../Button'

/**
 * Flexible cancel/action composition of Dialog.
 * Exposes offset shadow and button styling for custom prompts like destructive deletes.
 *
 * @param props - Composite dialog configuration properties including titles, messages, and action callbacks. - {@link CustomDialogProps}
 * @returns Pre-composed dialog element.
 */
export const CustomDialog = ({
  onClose,
  onAction,
  title,
  message,
  actionLabel = 'Confirm',
  cancelLabel = 'Cancel',
  buttonVariant = 'primary',
  buttonColor,
  icon,
  ...rest
}: CustomDialogProps) => {
  return (
    <Dialog {...rest} onClose={onClose}>
      <DialogHeader icon={icon}>
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>
      <DialogBody>{typeof message === 'string' ? <p className="m-0 font-body">{message}</p> : message}</DialogBody>
      <DialogFooter>
        <Button variant="text" onClick={onClose} className="mr-2">
          {cancelLabel}
        </Button>
        <Button onClick={onAction} variant={buttonVariant} color={buttonColor}>
          {actionLabel}
        </Button>
      </DialogFooter>
    </Dialog>
  )
}
