/**
 * @fileoverview Lithos UI calendar type definitions and interfaces.
 * - Defines selection modes, date range payloads, and configuration props for the Calendar primitive.
 */
import type { HexColor, LithosElementProps } from '../../../core/types'
import type { LithosClass } from '../../../utils/cn'

/**
 * Selection mode behavior for the calendar component.
 */
export type CalendarMode = 'single' | 'multiple' | 'range' | 'rainbow'

/**
 * Structured date range payload with optional start and end endpoints.
 */
export interface DateRange {
  /** Start date of the range. */
  from: Date | null

  /** End date of the range. */
  to: Date | null
}

/**
 * Value union representing the selected state across different calendar modes.
 */
export type CalendarValue = Date | null | Date[] | DateRange

/** Day-of-week index starting at `0` for Sunday through `6` for Saturday. */
export type CalendarFirstDayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6

/** Date instance or numeric timestamp/day identifier marked as disabled. */
export type CalendarDisabledDate = Date | number

/** Associates a set of disabled dates with a highlight color. */
export type CalendarDateColorGroup = {
  /** Dates or day identifiers belonging to this color group. */
  dates: CalendarDisabledDate[]

  /** Highlight color applied to matching dates. */
  color: HexColor | string
}

/** Custom class overrides for internal `Calendar` sub-elements. */
export interface CalendarClasses {
  /** Root container wrapper. */
  container?: LithosClass

  /** Top calendar header bar. */
  header?: LithosClass

  /** Previous/next navigation controls container. */
  nav?: LithosClass

  /** Month selector dropdown. */
  monthSelect?: LithosClass

  /** Year selector dropdown. */
  yearSelect?: LithosClass

  /** Weekday labels row. */
  weekdays?: LithosClass

  /** Days grid container. */
  grid?: LithosClass

  /** Individual calendar grid cell wrapper. */
  cell?: LithosClass

  /** Day button or label inside a cell. */
  day?: LithosClass
}

/**
 * Props for the root `Calendar` component.
 */
export interface CalendarProps extends Omit<LithosElementProps<'div'>, 'defaultValue' | 'onChange'> {
  /**
   * Selection mode behavior.
   * @default 'single'
   */
  mode?: CalendarMode

  /**
   * Controlled selected date value.
   */
  value?: CalendarValue

  /**
   * Uncontrolled initial selected date value.
   */
  defaultValue?: CalendarValue

  /**
   * Callback function triggered when the selection value changes.
   */
  onChange?: (value: CalendarValue) => void

  /**
   * Controlled displayed month date.
   */
  month?: Date

  /**
   * Uncontrolled initial displayed month date.
   */
  defaultMonth?: Date

  /**
   * Callback function triggered when the displayed month changes.
   */
  onMonthChange?: (month: Date) => void

  /**
   * Minimum selectable date limit.
   */
  minDate?: Date

  /**
   * Maximum selectable date limit.
   */
  maxDate?: Date

  /**
   * Array of disabled specific dates or day numbers.
   */
  disabledDates?: CalendarDisabledDate[]

  /**
   * Custom validation function to determine if a specific date should be disabled.
   */
  isDateDisabled?: (date: Date) => boolean

  /**
   * Mode='multiple' only — assigns distinct colors per group of selected dates (e.g. leave types).
   */
  dateColors?: CalendarDateColorGroup[]

  /**
   * Index of the first day of the week (0 for Sunday, 1 for Monday, etc.).
   * @default 0
   */
  firstDayOfWeek?: CalendarFirstDayOfWeek

  /**
   * Locale string for formatting month and weekday labels.
   */
  locale?: string

  /**
   * Minimum and maximum year range bounds for the year selector dropdown.
   */
  yearRange?: [number, number]
  /**
   * Whether to render the outer border, surface background, padding, and brutalist shadow around the calendar container.
   * @default true
   */
  bordered?: boolean

  /**
   * Granular custom CSS class overrides for internal calendar structural sub-elements.
   */
  classes?: CalendarClasses
}
