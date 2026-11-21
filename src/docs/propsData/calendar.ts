import type { PropItem } from '../../components/ui/PropsTable'

const calendarValueDefinition = 'type CalendarValue = Date | null | Date[] | DateRange'

export const calendarPropsData: PropItem[] = [
  {
    name: 'mode',
    type: 'CalendarMode',
    typeDefinition: "type CalendarMode = 'single' | 'multiple' | 'range' | 'rainbow'",
    defaultValue: '"single"',
    description: 'Selection mode for the calendar.',
  },
  {
    name: 'value',
    type: 'CalendarValue',
    typeDefinition: calendarValueDefinition,
    description: 'Controlled selected date(s).',
  },
  {
    name: 'defaultValue',
    type: 'CalendarValue',
    typeDefinition: calendarValueDefinition,
    description: 'Initial selected date(s).',
  },
  {
    name: 'onChange',
    type: '(value: CalendarValue) => void',
    description: 'Callback when selection changes.',
  },
  {
    name: 'month',
    type: 'Date',
    description: 'Controlled displayed month.',
  },
  {
    name: 'defaultMonth',
    type: 'Date',
    description: 'Initial displayed month.',
  },
  {
    name: 'onMonthChange',
    type: '(month: Date) => void',
    description: 'Callback when month changes.',
  },
  {
    name: 'minDate',
    type: 'Date',
    description: 'Minimum selectable date.',
  },
  {
    name: 'maxDate',
    type: 'Date',
    description: 'Maximum selectable date.',
  },
  {
    name: 'disabledDates',
    type: 'CalendarDisabledDate[]',
    typeDefinition: 'type CalendarDisabledDate = Date | number',
    description: 'Specific dates that cannot be selected.',
  },
  {
    name: 'isDateDisabled',
    type: '(date: Date) => boolean',
    description: 'Callback to determine if a date should be disabled.',
  },
  {
    name: 'dateColors',
    type: 'CalendarDateColorGroup[]',
    typeDefinition: `type CalendarDateColorGroup = {
  dates: CalendarDisabledDate[]
  color: HexColor | string
}`,
    description: 'Assigns distinct colors per group of selected dates (e.g. leave types).',
  },
  {
    name: 'firstDayOfWeek',
    type: 'CalendarFirstDayOfWeek',
    typeDefinition: 'type CalendarFirstDayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6',
    defaultValue: '0',
    description: 'First day of the week (0 = Sunday, 1 = Monday, etc).',
  },
  {
    name: 'locale',
    type: 'string',
    description: 'Locale string for date formatting.',
  },
  {
    name: 'yearRange',
    type: '[number, number]',
    description: 'Min and max year range in the year dropdown.',
  },
  {
    name: 'className',
    type: 'LithosClass',
    description: 'Additional CSS classes applied to the calendar container.',
  },
  {
    name: 'classes',
    type: 'CalendarClasses',
    typeDefinition: `interface CalendarClasses {
  container?: LithosClass
  header?: LithosClass
  nav?: LithosClass
  monthSelect?: LithosClass
  yearSelect?: LithosClass
  weekdays?: LithosClass
  grid?: LithosClass
  cell?: LithosClass
  day?: LithosClass
}`,
    description: 'Custom class overrides for calendar internal elements.',
  },
]
