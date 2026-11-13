/**
 * @fileoverview Lithos UI CommandFooter component.
 * - Renders a bottom toolbar footer providing keyboard navigation shortcut hints and active item counters.
 */
import { cn } from '../../../utils/cn'
import { Kbd } from '../Kbd'
import type { CommandFooterProps } from './command.types'
import { useCommand } from './CommandContext'

/**
 * Footer toolbar component displaying navigation guide hints and item counts.
 *
 * @param props - Footer properties including navigation hint toggles, item count displays, and custom children. - {@link CommandFooterProps}
 * @returns Footer container element or hidden state if palette is closed.
 */
export const CommandFooter = ({
  showNavigationHints = true,
  showItemCount = true,
  className,
  children,
  ...rest
}: CommandFooterProps) => {
  const { visibleItemsCount, isOpen } = useCommand()

  return (
    <div
      data-slot="command-footer"
      className={cn(
        'flex items-center justify-between border-t-2 border-(--lithos-border) px-3 py-1.5 bg-(--lithos-surface) text-xs font-mono select-none text-(--lithos-text)',
        !isOpen && 'hidden',
        className
      )}
      {...rest}
    >
      {children ? (
        children
      ) : (
        <>
          {showNavigationHints && (
            <div className="flex items-center space-x-2.5">
              <span className="inline-flex items-center space-x-1">
                <Kbd size="xs" variant="subtle">
                  ↑
                </Kbd>
                <Kbd size="xs" variant="subtle">
                  ↓
                </Kbd>
                <span className="text-[11px] opacity-70">Navigate</span>
              </span>
              <span className="inline-flex items-center space-x-1">
                <Kbd size="xs" variant="subtle">
                  ↵
                </Kbd>
                <span className="text-[11px] opacity-70">Select</span>
              </span>
              <span className="inline-flex items-center space-x-1">
                <Kbd size="xs" variant="subtle">
                  Esc
                </Kbd>
                <span className="text-[11px] opacity-70">Close</span>
              </span>
            </div>
          )}
          {showItemCount && (
            <div className="ml-auto inline-flex items-center text-[10px] font-bold uppercase tracking-wider opacity-50">
              {visibleItemsCount} {visibleItemsCount === 1 ? 'item' : 'items'}
            </div>
          )}
        </>
      )}
    </div>
  )
}
