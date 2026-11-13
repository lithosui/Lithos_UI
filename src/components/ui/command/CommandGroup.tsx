/**
 * @fileoverview Lithos UI CommandGroup component.
 * - Section wrapper providing semantic group container wrapping and conditional visibility based on child filtering.
 */
import { useId } from 'react'
import { cn } from '../../../utils/cn'
import type { CommandGroupProps } from './command.types'
import { useCommand, GroupContext } from './CommandContext'

/**
 * Section group container component organizing command items under optional headings with visibility filtering.
 *
 * @param props - Group properties including headings, custom classes, and nested command items. - {@link CommandGroupProps}
 * @returns Group section container element or null if no child items match the active search.
 */
export const CommandGroup = ({ heading, className, children, ...rest }: CommandGroupProps) => {
  const groupId = useId()
  const { isGroupVisible } = useCommand()

  const visible = isGroupVisible(groupId)

  if (!visible) return null

  return (
    <GroupContext.Provider value={{ groupId }}>
      <div data-slot="command-group" role="group" className={cn('overflow-hidden py-1', className)} {...rest}>
        {heading && (
          <div className="px-2 py-1 text-xs font-black tracking-wider uppercase opacity-50 select-none text-(--lithos-text)">
            {heading}
          </div>
        )}
        <div className="flex flex-col">{children}</div>
      </div>
    </GroupContext.Provider>
  )
}
