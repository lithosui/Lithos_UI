import { useState } from 'react'
import { Button } from './Button'
import { IconChevronLeft } from './icons/IconChevronLeft'
import { cn } from '../../utils/cn'
import type { LithosElementProps } from '../../core/types'

/**
 * Visual structural variants supported by the pagination component.
 */
export type PaginationVariant = 'classic' | 'dots' | 'bordered' | 'track' | 'compact' | 'progress'

/**
 * Props configuration interface for the `Pagination` component.
 */
export interface PaginationProps extends Omit<LithosElementProps<'nav'>, 'children' | 'onChange'> {
  /** Total number of pages, not records. */
  count: number

  /** Controlled current page number, starting at 1. */
  page?: number

  /** Uncontrolled initial default page number when first mounted. */
  defaultPage?: number

  /** Callback function triggered when the active page changes. */
  onPageChange?: (page: number) => void

  /** Visual variant style mapping. */
  variant?: PaginationVariant

  /** Border radius shape configuration for the pagination buttons. */
  shape?: 'square' | 'pill'

  /** Flex alignment layout position of the pagination control bar. */
  position?: 'left' | 'center' | 'right'

  /** Size scale variant for the pagination buttons. */
  size?: 'sm' | 'md' | 'lg'

  /** Displays fast backward/forward navigation controls that jump directly to the first or last page. */
  showEdges?: boolean
}

const sizes = {
  sm: 'h-8 min-w-8 text-xs',
  md: 'h-10 min-w-10 text-sm',
  lg: 'h-12 min-w-12 text-base',
}

const positions = {
  left: 'justify-start rtl:justify-end',
  center: 'justify-center',
  right: 'justify-end rtl:justify-start',
}

const normalizeCount = (value: number) =>
  Number.isFinite(value) ? Math.max(0, Math.min(Number.MAX_SAFE_INTEGER, Math.floor(value))) : 0

const clampPage = (value: number, count: number) =>
  Math.min(Math.max(1, Number.isFinite(value) ? Math.floor(value) : 1), Math.max(1, count))

/** Two balanced page groups keep a single ellipsis centered while the current group slides. */
const pageItems = (page: number, count: number): (number | string)[] => {
  if (count <= 5) return Array.from({ length: count }, (_, index) => index + 1)

  if (page <= Math.floor(count / 2)) {
    const start = Math.max(1, page - 1)
    return [start, start + 1, 'ellipsis', count - 1, count]
  }

  const start = Math.min(page, count - 1)
  return [1, 2, 'ellipsis', start, start + 1]
}

const focusClass =
  'focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--lithos-text) motion-reduce:transition-none'

/**
 * Pagination component for navigating data sets across multiple page intervals.
 *
 * @param props - Pagination configuration properties including counts, active pages, variants, and event handlers. - {@link PaginationProps}
 * @returns Pagination navigation element.
 */
export const Pagination = ({
  count,
  page,
  defaultPage = 1,
  onPageChange,
  variant = 'classic',
  shape = 'square',
  position = 'left',
  size = 'md',
  showEdges = true,
  className,
  ...rest
}: PaginationProps) => {
  const total = normalizeCount(count)
  const [internalPage, setInternalPage] = useState(() => clampPage(defaultPage, total))
  const current = clampPage(page ?? internalPage, total)
  if (page === undefined && current !== internalPage) setInternalPage(current)
  const items = pageItems(current, total)
  const displayedPage = total === 0 ? 0 : current
  const summaryOnly = variant === 'compact' || variant === 'progress'
  const flat = variant === 'dots' || variant === 'track'
  const radius = shape === 'pill' ? 'rounded-full' : 'rounded-none'

  const selectPage = (next: number) => {
    if (total === 0 || next < 1 || next > total || next === current) return
    if (page === undefined) setInternalPage(next)

    onPageChange?.(next)
  }

  const arrow = (direction: 'first' | 'previous' | 'next' | 'last') => {
    const backward = direction === 'first' || direction === 'previous'
    const fast = direction === 'first' || direction === 'last'
    const target = fast ? (backward ? 1 : total) : current + (backward ? -1 : 1)
    const label = { first: 'First page', previous: 'Previous page', next: 'Next page', last: 'Last page' }[direction]

    return (
      <li className="m-1 flex shrink-0">
        <Button
          variant="text"
          aria-label={label}
          disabled={total === 0 || (backward ? current === 1 : current === total)}
          onClick={() => selectPage(target)}
          className={cn('px-1', sizes[size], radius, focus)}
        >
          <span
            aria-hidden="true"
            className={cn('inline-flex', backward ? 'rtl:rotate-180' : 'rotate-180 rtl:rotate-0')}
          >
            <IconChevronLeft size={14} />
            {fast && <IconChevronLeft size={14} className="-ml-2" />}
          </span>
        </Button>
      </li>
    )
  }

  return (
    <nav
      aria-label="Pagination"
      data-slot="pagination"
      className={cn('w-full min-w-0 text-(--lithos-text)', className)}
      {...rest}
    >
      <ul className={cn('flex flex-wrap items-center list-none p-0 -m-1', positions[position])}>
        {showEdges && arrow('first')}
        {arrow('previous')}
        {summaryOnly ? (
          <li className={cn('m-1 flex flex-wrap items-center font-mono font-bold tabular-nums', sizes[size])}>
            {variant === 'progress' && (
              <span
                aria-hidden="true"
                className={cn(
                  'relative me-4 h-2 w-24 overflow-hidden border border-(--lithos-border) bg-(--lithos-surface)',
                  radius
                )}
              >
                <span
                  className={cn('absolute inset-y-0 start-0 bg-(--lithos-accent)', radius)}
                  style={{ width: `${total ? (current / total) * 100 : 0}%` }}
                />
              </span>
            )}
            <span aria-hidden="true" className="whitespace-nowrap px-1">
              <span className="font-black">{displayedPage}</span>
              <span className="mx-2 opacity-50">/</span>
              {total}
            </span>
          </li>
        ) : (
          items.map((item) => {
            const selected = item === current
            return (
              <li
                key={item}
                className={cn('relative m-1 flex shrink-0 items-center justify-center', variant === 'track' && 'mx-0')}
              >
                {typeof item === 'number' ? (
                  <Button
                    variant={selected ? 'primary' : 'secondary'}
                    aria-label={`Go to page ${item}`}
                    aria-current={selected ? 'page' : undefined}
                    onClick={() => selectPage(item)}
                    className={cn(
                      'relative px-2 font-mono tabular-nums',
                      sizes[size],
                      radius,
                      focusClass,
                      flat && 'shadow-none hover:shadow-none active:translate-none',
                      selected &&
                        variant !== 'dots' &&
                        variant !== 'track' &&
                        'underline underline-offset-4 decoration-2',
                      variant === 'bordered' && 'bg-(--lithos-surface) text-(--lithos-text)',
                      variant === 'bordered' && selected && 'border-(--lithos-accent) ring-1 ring-(--lithos-accent)',
                      variant === 'dots' && 'px-1 border-transparent bg-transparent text-(--lithos-text)',
                      variant === 'track' && 'border-0 bg-transparent text-(--lithos-text)',
                      variant === 'track' &&
                        selected &&
                        'after:absolute after:-bottom-0.5 after:inset-x-0 after:h-1 after:bg-(--lithos-accent)'
                    )}
                  >
                    {variant === 'dots' ? (
                      <span
                        aria-hidden="true"
                        className={cn(
                          'block h-2 border border-(--lithos-border)',
                          radius,
                          selected ? 'w-5 bg-(--lithos-accent)' : 'w-2 bg-(--lithos-surface)'
                        )}
                      />
                    ) : (
                      item
                    )}
                  </Button>
                ) : (
                  <span
                    aria-hidden="true"
                    className={cn('inline-flex items-center justify-center px-2 font-bold leading-none', sizes[size])}
                  >
                    ···
                  </span>
                )}
              </li>
            )
          })
        )}
        {arrow('next')}
        {showEdges && arrow('last')}
      </ul>
      <span role="status" aria-atomic="true" className="sr-only">
        Page {displayedPage} of {total}
      </span>
    </nav>
  )
}
