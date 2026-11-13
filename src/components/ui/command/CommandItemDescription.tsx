/**
 * @fileoverview Lithos UI CommandItemDescription component.
 * - Renders secondary description text for command items with subdued opacity styling.
 */
import { cn } from '../../../utils/cn'
import type { CommandItemDescriptionProps } from './command.types'

/**
 * Description text component providing secondary details or shortcuts inside command items.
 *
 * @param props - Description properties including custom class names and children content. - {@link CommandItemDescriptionProps}
 * @returns Description text span element.
 */
export const CommandItemDescription = ({ className, children, ...rest }: CommandItemDescriptionProps) => {
  return (
    <span
      data-slot="command-item-description"
      className={cn('block text-xs font-normal opacity-60 text-(--lithos-text)', className)}
      {...rest}
    >
      {children}
    </span>
  )
}
