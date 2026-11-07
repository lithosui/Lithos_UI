/**
 * @fileoverview Lithos UI BreadcrumbSeparator component.
 * - Renders a non-interactive decorative separator element between breadcrumb items.
 */
import type { BreadcrumbItemProps } from './breadcrumb.types'
import { IconBreadcrumbSeparator } from '../icons/IconBreadcrumbSeparator'
import { cn } from '../../../utils/cn'

/**
 * Separator element component placed between individual breadcrumb steps.
 *
 * @param props - Element attributes for the list item container. - {@link BreadcrumbItemProps}
 * @returns Separator node element.
 */
export const BreadcrumbSeparator = ({ children, className, ...rest }: BreadcrumbItemProps) => {
  const classes = cn('inline-flex items-center text-xs font-bold opacity-40 mx-2 select-none', className)

  return (
    <span aria-hidden="true" data-testid="separator" className={classes} {...rest}>
      {children ?? <IconBreadcrumbSeparator />}
    </span>
  )
}
