/**
 * @fileoverview Lithos UI BreadcrumbList container component.
 * - Ordered list wrapper organizing navigation steps horizontally.
 */
import type { BreadcrumbListProps } from './breadcrumb.types'
import { cn } from '../../../utils/cn'

/**
 * Ordered list container component wrapping the breadcrumb trail steps.
 *
 * @param props - Ordered list attributes and custom classes. - {@link BreadcrumbListProps}
 * @returns Ordered list wrapper element.
 */
export const BreadcrumbList = ({ className, children, ...rest }: BreadcrumbListProps) => {
  const classes = cn('inline-flex flex-wrap items-center font-mono text-sm tracking-tight -mt-2', className)

  return (
    <ol className={classes} {...rest}>
      {children}
    </ol>
  )
}
