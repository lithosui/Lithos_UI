/**
 * @fileoverview Lithos UI native table primitives.
 * - Theme tokens provide colors, YIQ-derived accent text, radius, and hard shadows; cn() preserves class overrides.
 * - Cell padding controls density without CSS gap; interactive behavior is composed with shared controls.
 */
import { cn } from '../../utils/cn'
import type { LithosElementProps } from '../../core/types'

/**
 * Utility type mapping native table element attributes and injecting `LithosClass` support.
 */
export type TableElementProps<
  T extends 'div' | 'table' | 'thead' | 'tbody' | 'tfoot' | 'tr' | 'th' | 'td' | 'caption',
> = LithosElementProps<T>

/** Props configuration interface for the `TableContainer` component. */
export type TableContainerProps = TableElementProps<'div'>

/** Props configuration interface for the root `Table` component. */
export interface TableProps extends TableElementProps<'table'> {
  /**
   * Size density scale variant controlling cell padding metrics.
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg'

  /**
   * Applies alternating background striping styles to table body rows.
   * @default false
   */
  striped?: boolean

  /**
   * Enables interactive hover background styling on table body rows.
   * @default false
   */
  hoverable?: boolean

  /**
   * Fixes the table header row at the top of the scroll container viewport.
   * @default false
   */
  stickyHeader?: boolean
}

/** Props configuration interface for the `TableHeader` component. */
export interface TableHeaderProps extends TableElementProps<'thead'> {
  /**
   * Visual header color theme variant mapping.
   * @default 'default'
   */
  variant?: 'default' | 'accent'
}

/** Props configuration interface for the `TableBody` component. */
export type TableBodyProps = TableElementProps<'tbody'>

/** Props configuration interface for the `TableFooter` component. */
export type TableFooterProps = TableElementProps<'tfoot'>

/** Props configuration interface for the `TableRow` component. */
export interface TableRowProps extends TableElementProps<'tr'> {
  /**
   * Visual selection state flag. Supply a labeled checkbox for interactive selection.
   * @default false
   */
  selected?: boolean
}

/** Props configuration interface for the `TableHead` header cell component. */
export type TableHeadProps = TableElementProps<'th'>

/** Props configuration interface for the `TableCell` standard data cell component. */
export type TableCellProps = TableElementProps<'td'>

/** Props configuration interface for the `TableCaption` description component. */
export type TableCaptionProps = TableElementProps<'caption'>

/**
 * Scrollable container wrapper component for data tables.
 *
 * @param props - Container properties including custom classes and ARIA attributes. - {@link TableContainerProps}
 * @returns Region container div element.
 */
export const TableContainer = ({ className, ...props }: TableContainerProps) => (
  <div
    data-slot="table-container"
    role="region"
    tabIndex={0}
    className={cn(
      'relative w-full min-w-0 overflow-auto rounded-(--lithos-radius) border-2 border-(--lithos-border) bg-(--lithos-surface) text-(--lithos-text) shadow-[4px_4px_0_0_var(--lithos-shadow)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--lithos-text)',
      className
    )}
    {...props}
  />
)

/**
 * Root table element component providing native semantics, spacing rules, and density scales.
 *
 * @param props - Table properties including sizes, striping, hover effects, and sticky header toggles. - {@link TableProps}
 * @returns Native table element.
 */
export const Table = ({
  size = 'md',
  striped = false,
  hoverable = false,
  stickyHeader = false,
  className,
  ...props
}: TableProps) => (
  <table
    data-slot="table"
    className={cn(
      'w-full border-separate border-spacing-0 caption-bottom text-start font-body text-sm text-(--lithos-text)',
      size === 'sm' && '[--table-cell-x:0.75rem] [--table-cell-y:0.5rem]',
      size === 'md' && '[--table-cell-x:1rem] [--table-cell-y:0.75rem]',
      size === 'lg' && '[--table-cell-x:1.25rem] [--table-cell-y:1rem]',
      striped &&
        '[&>tbody>tr:nth-child(odd):not([data-state=selected])]:bg-[color-mix(in_srgb,var(--lithos-text)_5%,var(--lithos-surface))]',
      hoverable &&
        '[&>tbody>tr:not([data-state=selected]):hover]:bg-[color-mix(in_srgb,var(--lithos-text)_10%,var(--lithos-surface))]',
      stickyHeader && '[&>thead]:sticky [&>thead]:top-0 [&>thead]:z-(--lithos-z-sticky)',
      className
    )}
    {...props}
  />
)

/**
 * Table header group section component (`<thead>`).
 *
 * @param props - Header properties including color theme variants and custom classes. - {@link TableHeaderProps}
 * @returns Native thead element.
 */
export const TableHeader = ({ variant = 'default', className, ...props }: TableHeaderProps) => (
  <thead
    data-slot="table-header"
    className={cn(
      variant === 'accent'
        ? 'bg-(--lithos-accent) text-(--lithos-accent-text)'
        : 'bg-(--lithos-text) text-(--lithos-bg)',
      className
    )}
    {...props}
  />
)

/**
 * Table body group section component (`<tbody>`).
 *
 * @param props - Body properties including custom classes. - {@link TableBodyProps}
 * @returns Native tbody element.
 */
export const TableBody = ({ className, ...props }: TableBodyProps) => (
  <tbody data-slot="table-body" className={cn('[&>tr:last-child>*]:border-b-0', className)} {...props} />
)

/**
 * Table footer group section component (`<tfoot>`).
 *
 * @param props - Footer properties including custom classes. - {@link TableFooterProps}
 * @returns Native tfoot element.
 */
export const TableFooter = ({ className, ...props }: TableFooterProps) => (
  <tfoot
    data-slot="table-footer"
    className={cn(
      'bg-(--lithos-surface) font-bold [&>tr:first-child>*]:border-t-2 [&>tr:last-child>*]:border-b-0',
      className
    )}
    {...props}
  />
)

/**
 * Table row component (`<tr>`) supporting visual selection states.
 *
 * @param props - Row properties including selection flags and custom classes. - {@link TableRowProps}
 * @returns Native tr element.
 */
export const TableRow = ({ selected = false, className, ...props }: TableRowProps) => (
  <tr
    data-slot="table-row"
    data-state={selected ? 'selected' : undefined}
    className={cn(
      'data-[state=selected]:bg-(--lithos-accent) data-[state=selected]:text-(--lithos-accent-text)',
      className
    )}
    {...props}
  />
)

/**
 * Table header cell component (`<th>`).
 *
 * @param props - Header cell properties including custom classes. - {@link TableHeadProps}
 * @returns Native th element.
 */
export const TableHead = ({ className, ...props }: TableHeadProps) => (
  <th
    data-slot="table-head"
    className={cn(
      'px-(--table-cell-x) py-(--table-cell-y) border-b-2 border-(--lithos-border) text-start align-middle font-black',
      className
    )}
    {...props}
  />
)

/**
 * Table standard data cell component (`<td>`).
 *
 * @param props - Cell properties including custom classes. - {@link TableCellProps}
 * @returns Native td element.
 */
export const TableCell = ({ className, ...props }: TableCellProps) => (
  <td
    data-slot="table-cell"
    className={cn(
      'px-(--table-cell-x) py-(--table-cell-y) border-b-2 border-(--lithos-border) align-middle',
      className
    )}
    {...props}
  />
)

/**
 * Table caption description component (`<caption>`).
 *
 * @param props - Caption properties including custom classes. - {@link TableCaptionProps}
 * @returns Native caption element.
 */
export const TableCaption = ({ className, ...props }: TableCaptionProps) => (
  <caption
    data-slot="table-caption"
    className={cn('px-4 py-3 text-start text-sm text-(--lithos-text)', className)}
    {...props}
  />
)
