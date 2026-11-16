/**
 * @fileoverview Lithos UI DropdownSeparator primitive.
 * - Renders a horizontal divider line with `role="separator"` using global `--lithos-border`.
 * - Spans full container width with negative margins (`-mx-1`) to visually break up menu sections.
 */
import { cn } from '../../../utils/cn'
import type { DropdownSeparatorProps } from './dropdown.types'

/**
 * Divider line component for partitioning sections within dropdown menus.
 *
 * @param props - Separator properties including custom class names. - {@link DropdownSeparatorProps}
 * @returns Separator divider element.
 */
export const DropdownSeparator = ({ className, ...props }: DropdownSeparatorProps) => {
  return (
    <div
      role="separator"
      aria-orientation="horizontal"
      className={cn('-mx-1 my-1 h-px bg-(--lithos-border)', className)}
      {...props}
    />
  )
}
