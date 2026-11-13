/**
 * @fileoverview Lithos UI DialogTitle heading component.
 * - Renders accessible title headings linked to dialog aria-labelledby attributes.
 */
import type { DialogTitleProps } from './dialog.types'
import { cn } from '../../../utils/cn'
import { useDialog } from './useDialog'

/**
 * Heading title component linked to dialog accessibility attributes.
 *
 * @param props - Title properties including custom class names and text children. - {@link DialogTitleProps}
 * @returns Heading h2 element.
 */
export const DialogTitle = ({ className, children, ...rest }: DialogTitleProps) => {
  const { titleId } = useDialog()

  return (
    <h2
      id={titleId}
      className={cn('text-xl font-black uppercase tracking-tight leading-none m-0', className)}
      {...rest}
    >
      {children}
    </h2>
  )
}
