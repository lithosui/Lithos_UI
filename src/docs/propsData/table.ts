import type { PropItem } from '../../components/ui/PropsTable'

export const tablePropsData: PropItem[] = [
  {
    name: 'size',
    type: 'TableSize',
    typeDefinition: "type TableSize = 'sm' | 'md' | 'lg'",
    defaultValue: "'md'",
    description: 'Cell padding density. Individual cells can override padding with className.',
  },
  {
    name: 'striped',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Alternate body row backgrounds. Selected rows retain their accent background.',
  },
  {
    name: 'hoverable',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Highlight unselected body rows on hover. Does not make rows interactive.',
  },
  {
    name: 'stickyHeader',
    type: 'boolean',
    defaultValue: 'false',
    description:
      'Pin the header group to the top of the nearest scrolling container. Give TableContainer a bounded height.',
  },
  {
    name: 'className',
    type: 'LithosClass',
    description:
      'Merged Tailwind classes. Native table props, children, style, and ref are forwarded to the table element.',
  },
]
export const tableContainerPropsData: PropItem[] = [
  {
    name: 'aria-label / aria-labelledby',
    type: 'string',
    description: 'Give the scroll region an accessible name. Use a meaningful label or reference a visible heading.',
  },
  {
    name: 'tabIndex',
    type: 'number',
    defaultValue: '0',
    description: 'Allows keyboard users to focus and scroll the container.',
  },
  {
    name: 'role',
    type: 'React.AriaRole',
    defaultValue: "'region'",
    description: 'The container is a named scroll region by default.',
  },
  {
    name: 'className',
    type: 'LithosClass',
    description: 'Controls height, frame, shadow, and scrolling. All native div props and ref are forwarded.',
  },
]
export const tablePartsPropsData: PropItem[] = [
  {
    name: 'TableHeader.variant',
    type: 'TableHeaderVariant',
    typeDefinition: "type TableHeaderVariant = 'default' | 'accent'",
    defaultValue: "'default'",
    description:
      'Default uses inverse theme colors. Accent uses the current accent color and its YIQ-derived text color.',
  },
  {
    name: 'TableHeader.className',
    type: 'LithosClass',
    description:
      'Inverse theme colors distinguish column headers by default, including sticky headers. Override background and text colors together. Use text-inherit on text buttons inside the header.',
  },
  {
    name: 'TableRow.selected',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Accent selection styling. Selection state and labeled checkbox controls are owned by the consumer.',
  },
  {
    name: 'TableHead.scope',
    type: 'TableHeadScope',
    typeDefinition: "type TableHeadScope = 'col' | 'row' | 'colgroup' | 'rowgroup'",
    description: 'Native header association. Use col for column headers and row for row labels.',
  },
  {
    name: 'TableHead.aria-sort',
    type: 'TableHeadSort',
    typeDefinition: "type TableHeadSort = 'none' | 'ascending' | 'descending' | 'other'",
    description: 'Set on the currently sorted header. Put a real button inside the header to change sorting.',
  },
  {
    name: 'colSpan / rowSpan',
    type: 'number',
    description:
      'Native span attributes on TableHead and TableCell. Empty-state colSpan must match the visible columns.',
  },
  {
    name: 'className / ref / native props',
    type: 'Native element props',
    description:
      'Each part forwards native props and refs: Header → thead, Body → tbody, Footer → tfoot, Row → tr, Head → th, Cell → td, Caption → caption.',
  },
]
