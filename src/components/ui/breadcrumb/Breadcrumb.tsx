/**
 * @fileoverview Lithos UI root Breadcrumb navigation primitive.
 * - Supports default, collapsible, and icon variants with custom separators and automated active state handling.
 */
import { Fragment, useState } from 'react'
import type { BreadcrumbItemData, BreadcrumbProps } from './breadcrumb.types'
import { IconHome } from '../icons/IconHome'
import { IconBreadcrumbSeparator } from '../icons/IconBreadcrumbSeparator'
import { cn } from '../../../utils/cn'
import { BreadcrumbList } from './BreadcrumbList'
import { BreadcrumbItem } from './BreadcrumbItem'
import { BreadcrumbLink } from './BreadcrumbLink'
import { BreadcrumbPage } from './BreadcrumbPage'
import { BreadcrumbSeparator } from './BreadcrumbSeparator'
import { BreadcrumbEllipsis } from './BreacrumbEllipsis'

/**
 * Accessible breadcrumb navigation component supporting structured data arrays,
 * collapsible truncation, custom separators, and automated active page styling.
 *
 * @param props - Configuration properties including items array, truncation limits, and display settings. - {@link BreadcrumbProps}
 * @returns Accessible navigation landmark element.
 */
export const Breadcrumb = ({
  items,
  mode,
  separator = <IconBreadcrumbSeparator />,
  showHomeIcon = true,
  humanPrefix,
  maxItems = 4,
  itemsBeforeCollapse = 1,
  itemsAfterCollapse = 1,
  className,
  children,
  ...rest
}: BreadcrumbProps) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const classes = cn('relative inline-flex items-center flex-wrap', className)

  if (!items || items.length === 0) {
    return (
      <nav aria-label="Breadcrumb" className={classes} {...rest}>
        {humanPrefix}
        <BreadcrumbList>{children}</BreadcrumbList>
      </nav>
    )
  }

  const isCollapsible = mode === 'collapsible' || items.length > maxItems
  const hasEnoughToCollapse = items.length > itemsBeforeCollapse + itemsAfterCollapse

  type RenderedEntry =
    { type: 'item'; data: BreadcrumbItemData; originalIndex: number } | { type: 'ellipsis'; count: number }

  let renderedEntries: RenderedEntry[] = []

  if (isCollapsible && hasEnoughToCollapse) {
    const before = items
      .slice(0, itemsBeforeCollapse)
      .map((data, i) => ({ type: 'item' as const, data, originalIndex: i }))

    const after = items.slice(items.length - itemsAfterCollapse).map((data, i) => ({
      type: 'item' as const,
      data,
      originalIndex: items.length - itemsAfterCollapse + i,
    }))

    const middle = items.slice(itemsBeforeCollapse, items.length - itemsAfterCollapse)

    const ellipsis = { type: 'ellipsis' as const, count: middle.length }

    if (!isExpanded) {
      renderedEntries = [...before, ellipsis, ...after]
    } else {
      renderedEntries = [
        ...before,
        ellipsis,
        ...middle.map((data, i) => ({ type: 'item' as const, data, originalIndex: itemsBeforeCollapse + i })),
        ...after,
      ]
    }
  } else {
    renderedEntries = items.map((data, i) => ({ type: 'item' as const, data, originalIndex: i }))
  }

  return (
    <nav aria-label="Breadcrumb" className={classes} {...rest}>
      {humanPrefix}
      <BreadcrumbList>
        {renderedEntries.map((entry, index) => {
          const isLastEntry = index === renderedEntries.length - 1

          if (entry.type === 'ellipsis') {
            return (
              <Fragment key={`ellipsis-${index}`}>
                <BreadcrumbItem key={`ellipsis-${index}`}>
                  <BreadcrumbEllipsis
                    isExpanded={isExpanded}
                    onClick={() => setIsExpanded(!isExpanded)}
                    title={isExpanded ? 'Collapse breadcrumb steps' : `Show ${entry.count} hidden steps`}
                  />

                  {!isLastEntry && <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>}
                </BreadcrumbItem>
              </Fragment>
            )
          }

          const item = entry.data
          const originalIndex = entry.originalIndex
          const isItemLast = originalIndex === items.length - 1
          const isActive = item.active ?? isItemLast
          const showDefaultHome = showHomeIcon && originalIndex === 0 && !item.icon

          const BreadcrumbType = isActive ? BreadcrumbPage : BreadcrumbLink

          return (
            <Fragment key={`${item.label}-${originalIndex}`}>
              <BreadcrumbItem>
                <BreadcrumbType href={item.href} onClick={isActive ? undefined : item.onClick}>
                  {showDefaultHome && (
                    <IconHome data-testid="home-icon" className="mr-1.5 inline-block" strokeWidth="3" />
                  )}
                  {item.icon && <span className="mr-1.5 inline-flex items-center">{item.icon}</span>}
                  {item.label}
                </BreadcrumbType>

                {!isLastEntry && <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>}
              </BreadcrumbItem>
            </Fragment>
          )
        })}
      </BreadcrumbList>
    </nav>
  )
}
