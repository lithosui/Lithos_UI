/**
 * @fileoverview Lithos UI BreadcrumbLink component.
 * - Renders interactive navigation hyperlinks with neo-brutalist hover states.
 */
import type { BreadcrumbLinkProps } from './breadcrumb.types'
import { cn } from '../../../utils/cn'

/**
 * Interactive link component for intermediary breadcrumb path steps.
 *
 * @param props - Anchor element properties including href and click handler. - {@link BreadcrumbLinkProps}
 * @returns Anchor link navigation element.
 */
export const BreadcrumbLink = ({ href, onClick, className, children, ...rest }: BreadcrumbLinkProps) => {
  const classes = cn(
    'lithos-click py-1 border-transparent hover:border-(--lithos-border) hover:bg-(--lithos-accent) hover:text-(--lithos-accent-text) rounded-(--lithos-radius) font-bold',
    className
  )

  return (
    <a
      href={href ?? '#'}
      onClick={(event) => {
        event.preventDefault()
        onClick?.(event)
      }}
      className={classes}
      {...rest}
    >
      {children}
    </a>
  )
}
