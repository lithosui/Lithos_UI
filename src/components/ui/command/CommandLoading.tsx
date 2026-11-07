/**
 * @fileoverview Lithos UI CommandLoading component.
 * - Renders an animated loading status indicator while command items are being fetched or filtered asynchronously.
 */
import { cn } from '../../../utils/cn'
import type { CommandLoadingProps } from './command.types'
import { useCommand } from './CommandContext'

/**
 * Loading indicator status component displayed during asynchronous data retrieval.
 *
 * @param props - Loading container properties including custom message children and styling classes. - {@link CommandLoadingProps}
 * @returns Loading status indicator element or null if palette is closed.
 */
export const CommandLoading = ({ className, children = 'Searching...', ...rest }: CommandLoadingProps) => {
  const { isOpen } = useCommand()

  if (!isOpen) return null

  return (
    <div
      data-slot="command-loading"
      role="status"
      aria-live="polite"
      className={cn(
        'flex items-center justify-center py-6 text-sm font-medium opacity-60 text-(--lithos-text)',
        className
      )}
      {...rest}
    >
      <span className="inline-block w-2 h-2 mr-2 bg-(--lithos-text) rounded-full animate-ping" />
      <span>{children}</span>
    </div>
  )
}
