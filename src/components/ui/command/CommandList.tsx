/**
 * @fileoverview Lithos UI CommandList component.
 * - Scrollable container viewport holding command groups and items, managing visibility based on palette open state.
 */
import { cn } from '../../../utils/cn'
import type { CommandListProps } from './command.types'
import { useCommand } from './CommandContext'

/**
 * Scrollable container listbox component enclosing command items and groups.
 *
 * @param props - List container properties including custom class names and children. - {@link CommandListProps}
 * @returns Listbox container element.
 */
export const CommandList = ({ className, children, ...rest }: CommandListProps) => {
  const { listId, isOpen } = useCommand()
  const classes = cn(
    'max-h-72 overflow-x-hidden overflow-y-auto p-1.5 focus:outline-none',
    !isOpen && 'hidden',
    className
  )

  return (
    <div
      data-slot="command-list"
      id={listId}
      role="listbox"
      aria-label="Commands"
      className={classes}
      tabIndex={-1}
      {...rest}
    >
      {children}
    </div>
  )
}
