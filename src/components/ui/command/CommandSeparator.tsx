/**
 * @fileoverview Lithos UI CommandSeparator component.
 * - Renders a horizontal divider line inside the command list, conditionally hidden when no items are visible.
 */
import { cn } from '../../../utils/cn'
import type { CommandSeparatorProps } from './command.types'
import { useCommand } from './CommandContext'

/**
 * Separator divider component for partitioning sections within the command list.
 *
 * @param props - Divider properties including custom class names. - {@link CommandSeparatorProps}
 * @returns Separator divider element or null if no items are visible.
 */
export const CommandSeparator = ({ className, ...rest }: CommandSeparatorProps) => {
  const { visibleItemsCount } = useCommand()

  if (visibleItemsCount === 0) return null

  return (
    <div
      data-slot="command-separator"
      role="separator"
      className={cn('my-1 -mx-1.5 border-b-2 border-(--lithos-border)', className)}
      {...rest}
    />
  )
}
