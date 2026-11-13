/**
 * @fileoverview Lithos UI CommandShortcut component.
 * - Renders inline keyboard shortcut badge indicators aligned to the right side of command items.
 */
import { cn } from '../../../utils/cn'
import { Kbd } from '../Kbd'
import type { CommandShortcutProps } from './command.types'

/**
 * Keyboard shortcut badge component for command items.
 *
 * @param props - Shortcut properties including size scales, variants, and keys. - {@link CommandShortcutProps}
 * @returns Shortcut container span element.
 */
export const CommandShortcut = ({
  size = 'xs',
  variant = 'default',
  className,
  children,
  ...rest
}: CommandShortcutProps) => {
  return (
    <span data-slot="command-shortcut" className="ml-auto inline-flex items-center pl-2">
      <Kbd size={size} variant={variant} className={cn('tracking-normal font-mono', className)} {...rest}>
        {children}
      </Kbd>
    </span>
  )
}
