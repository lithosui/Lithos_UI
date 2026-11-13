/**
 * @fileoverview Lithos UI SidebarHeader layout primitive.
 * - Manages header layout structure and trigger placement based on the root sidebar state (`open`).
 * - Dynamically toggles alignment and spacing to maintain visual alignment when collapsed or expanded.
 */
import { useSidebar } from './useSidebar'
import { cn } from '../../../utils/cn'
import type { SidebarHeaderProps } from './sidebar.types'

/**
 * Top container header component for the sidebar, adjusting alignment based on open/collapsed state.
 *
 * @param props - Header props including children and class names. - {@link SidebarHeaderProps}
 * @returns Header layout container component.
 */
export const SidebarHeader = ({ children, className, ...rest }: SidebarHeaderProps) => {
  const { open } = useSidebar()

  return (
    <div
      className={cn(
        'flex items-center mb-4 py-1.5 border-b-2 border-(--lithos-border)',
        open ? 'px-2 justify-between' : 'justify-center',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  )
}
