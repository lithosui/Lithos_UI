/**
 * @fileoverview Lithos UI CommandBadge component.
 * - Renders a right-aligned badge element inside command items for metadata or tags.
 */
import { cn } from '../../../utils/cn'
import { Badge } from '../Badge'
import type { CommandBadgeProps } from './command.types'

/**
 * Metadata badge component aligned to the right of command items.
 *
 * @param props - Badge properties including sizing and variants. - {@link CommandBadgeProps}
 * @returns Badge element.
 */
export const CommandBadge = ({ className, size = 'sm', ...rest }: CommandBadgeProps) => (
  <Badge size={size} className={cn('ml-auto select-none', className)} {...rest} />
)
