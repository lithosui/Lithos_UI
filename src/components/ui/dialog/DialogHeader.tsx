/**
 * @fileoverview Lithos UI DialogHeader title bar component.
 * - Encapsulates leading icons, heading titles, optional close buttons, and bottom scrollable dividers.
 */
import type { DialogHeaderProps } from './dialog.types'
import { IconClose } from '../icons/IconClose'
import { Button } from '../Button'
import { useDialog } from './useDialog'
import { cn } from '../../../utils/cn'

/**
 * Header title bar component for modal dialogs featuring optional icons and close triggers.
 *
 * @param props - Header configuration properties including leading icons, hideClose flags, and title content. - {@link DialogHeaderProps}
 * @returns Header container element.
 */
export const DialogHeader = ({ icon, hideClose = false, className, children, ...rest }: DialogHeaderProps) => {
  const { onClose, scrollable } = useDialog()

  return (
    <div
      className={cn(
        'flex items-start justify-between shrink-0 p-4 sm:p-6',
        scrollable && 'border-b-2 border-(--lithos-border)',
        className
      )}
      {...rest}
    >
      <div className="flex items-start flex-1 mr-4">
        {icon && (
          <span className="inline-flex shrink-0 mr-3" aria-hidden="true">
            {icon}
          </span>
        )}
        <div className="flex-1">{children}</div>
      </div>

      {!hideClose && (
        <Button onClick={onClose} variant="text" className="shrink-0 -mr-2 -mt-2" aria-label="Close dialog">
          <IconClose aria-hidden="true" />
        </Button>
      )}
    </div>
  )
}
