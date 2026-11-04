/**
 * @fileoverview Lithos UI BreadcrumbItem wrapper component.
 * - Acts as an individual list container for navigation path elements and separators.
 */
import type { BreadcrumbItemProps } from './breadcrumb.types'
import { cn } from '../../../utils/cn'

/**
 * List item wrapper component for individual breadcrumb steps.
 *
 * @param props - Element attributes including children and styling. - {@link BreadcrumbItemProps}
 * @returns List item node element.
 */
export const BreadcrumbItem = ({ className, children, ...rest }: BreadcrumbItemProps) => {
  const classes = cn('inline-flex items-center text-xs font-bold mt-2 w-max', className)
  return (
    <li className={classes} {...rest}>
      {children}
    </li>
  )
}
