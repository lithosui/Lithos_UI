/**
 * @fileoverview Lithos UI BreadcrumbEllipsis component.
 * - Control button used to expand or collapse hidden items in truncated breadcrumb lists.
 */
import type { BreadcrumbEllipsisProps } from './breadcrumb.types'
import { cn } from '../../../utils/cn'
import { Button } from '../Button'

/**
 * Ellipsis control button component for toggling hidden breadcrumb items in collapsible mode.
 *
 * @param props - Button properties including expansion state and click toggle handler. - {@link BreadcrumbEllipsisProps}
 * @returns Ellipsis button interactive component.
 */
export const BreadcrumbEllipsis = ({ onClick, isExpanded, className, children, ...rest }: BreadcrumbEllipsisProps) => {
  const classes = cn('py-0.5 text-xs font-black select-none', className)

  return (
    <Button
      variant="accent"
      onClick={onClick}
      aria-label={isExpanded ? 'Collapse breadcrumb steps' : 'Expand breadcrumb steps'}
      className={classes}
      {...rest}
    >
      {children ?? (isExpanded ? '‹‹' : '•••')}
    </Button>
  )
}
