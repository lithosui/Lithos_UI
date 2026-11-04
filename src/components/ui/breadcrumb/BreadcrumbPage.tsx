/**
 * @fileoverview Lithos UI BreadcrumbPage component.
 * - Displays the current active page node with filled highlight styles and ARIA current markers.
 */
import type { BreadcrumbPageProps } from './breadcrumb.types'
import { cn } from '../../../utils/cn'

/**
 * Non-interactive text span component indicating the current active page in the breadcrumb trail.
 *
 * @param props - Span element attributes and styling. - {@link BreadcrumbPageProps}
 * @returns Active page span indicator element.
 */
export const BreadcrumbPage = ({ className, children, ...rest }: BreadcrumbPageProps) => {
  const classes = cn(
    'inline-flex items-center px-2.5 py-1 border-2 border-(--lithos-border) bg-(--lithos-accent) text-(--lithos-accent-text) font-black tracking-tight shadow-[2px_2px_0px_0px_var(--lithos-border)] rounded-(--lithos-radius)',
    className
  )

  return (
    <span role="link" aria-disabled="true" aria-current="page" className={classes} {...rest}>
      {children}
    </span>
  )
}
