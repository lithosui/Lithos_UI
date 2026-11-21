import type { PropItem } from '../../components/ui/PropsTable'

export const paginationPropsData: PropItem[] = [
  {
    name: 'count',
    type: 'number',
    description: 'Required total number of pages as a non-negative integer. For example, pass 12 to show 12 pages.',
  },
  {
    name: 'page',
    type: 'number',
    description: 'Controlled current page, starting at 1. Clamped to the available range for display.',
  },
  {
    name: 'defaultPage',
    type: 'number',
    defaultValue: '1',
    description: 'Initial page for uncontrolled usage. The current page adjusts when count shrinks.',
  },
  {
    name: 'onPageChange',
    type: '(page: number) => void',
    description: 'Called when another valid page is selected. Your application owns data loading and slicing.',
  },
  {
    name: 'variant',
    type: 'PaginationVariant',
    typeDefinition: "type PaginationVariant = 'classic' | 'dots' | 'bordered' | 'track' | 'compact' | 'progress'",
    defaultValue: "'classic'",
    description: 'Visual pagination style. Combine classic with shape="pill" for the Pills style.',
  },
  {
    name: 'shape',
    type: 'PaginationShape',
    typeDefinition: "type PaginationShape = 'square' | 'pill'",
    defaultValue: "'square'",
    description: 'Straight corners or rounded controls, dots, and progress bars. Track marks only the current page.',
  },
  {
    name: 'position',
    type: 'PaginationPosition',
    typeDefinition: "type PaginationPosition = 'left' | 'center' | 'right'",
    defaultValue: "'left'",
    description: 'Horizontal alignment within the full-width pagination container.',
  },
  {
    name: 'size',
    type: 'PaginationSize',
    typeDefinition: "type PaginationSize = 'sm' | 'md' | 'lg'",
    defaultValue: "'md'",
    description: '32px, 40px, or 48px control height.',
  },
  {
    name: 'showEdges',
    type: 'boolean',
    defaultValue: 'true',
    description:
      'Show double-chevron controls to jump directly to the first or last page. Set false to show only previous and next arrows.',
  },
  {
    name: 'className / ref / native props',
    type: 'LithosClass / native nav props',
    description: 'Merged classes, ref, style, aria-label, aria-controls, and other nav attributes are forwarded.',
  },
]
