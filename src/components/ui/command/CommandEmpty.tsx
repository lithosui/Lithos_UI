/**
 * @fileoverview Lithos UI CommandEmpty component.
 * - Renders a fallback status notification when active search queries yield no matching command items.
 */
import { cn } from '../../../utils/cn'
import type { CommandEmptyProps } from './command.types'
import { useCommand } from './CommandContext'

/**
 * Empty results feedback component displayed when search queries return zero matching options.
 *
 * @param props - Empty container properties including custom message children and styling classes. - {@link CommandEmptyProps}
 * @returns Empty status feedback element or null if results exist or palette is closed.
 */
export const CommandEmpty = ({ className, children = 'No results found.', ...rest }: CommandEmptyProps) => {
  const { search, visibleItemsCount, isOpen } = useCommand()

  if (!isOpen || !search.trim() || visibleItemsCount > 0) return null

  return (
    <div
      data-slot="command-empty"
      role="status"
      aria-live="polite"
      className={cn('py-8 text-center text-sm font-medium opacity-60 text-(--lithos-text)', className)}
      {...rest}
    >
      {children}
    </div>
  )
}
