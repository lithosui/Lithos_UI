/**
 * @fileoverview Lithos UI DropdownGroup primitive.
 * - Wraps a set of related menu items under a shared container with `role="group"`.
 * - Renders an optional non-interactive section header text via `label` for semantic categorization.
 */
import { cn } from '../../../utils/cn'
import type { DropdownGroupProps } from './dropdown.types'

/**
 * Section container component organizing related dropdown items under optional group headings.
 *
 * @param props - Group configuration properties including section labels and child items. - {@link DropdownGroupProps}
 * @returns Group container div element.
 */
export const DropdownGroup = ({ children, label, className, ...props }: DropdownGroupProps) => {
  return (
    <div role="group" aria-label={label} className={cn('px-1 py-1', className)} {...props}>
      {label && (
        <div role="presentation" className="px-2 py-1 text-xs font-semibold text-(--lithos-text)/70">
          {label}
        </div>
      )}
      {children}
    </div>
  )
}
