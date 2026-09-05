import type { PropItem } from '../../components/ui/PropsTable'

export const breadcrumbPropsData: PropItem[] = [
  {
    name: 'items',
    type: 'BreadcrumbItemData[]',
    required: false,
    description: 'Array of data objects to dynamically render breadcrumb segments.',
  },
  {
    name: 'mode',
    type: "'collapsible'",
    required: false,
    description: 'Navigation mode. Set to "collapsible" to auto-hide middle items behind an ellipsis button.',
  },
  {
    name: 'separator',
    type: 'ReactNode',
    required: false,
    description: 'Custom separator between items. Defaults to a chevron icon.',
  },
  {
    name: 'showHomeIcon',
    type: 'boolean',
    defaultValue: 'true',
    required: false,
    description: 'Whether to show the default home icon on the first item if no custom icon is provided.',
  },
  {
    name: 'humanPrefix',
    type: 'ReactNode',
    required: false,
    description: 'Optional prefix content rendered before the breadcrumb list.',
  },
  {
    name: 'maxItems',
    type: 'number',
    defaultValue: '4',
    required: false,
    description:
      'Maximum items to show before collapsing (used with collapsible variant or automatically triggers collapse if exceeded).',
  },
  {
    name: 'itemsBeforeCollapse',
    type: 'number',
    defaultValue: '1',
    required: false,
    description: 'Number of items to always show at the start when collapsed.',
  },
  {
    name: 'itemsAfterCollapse',
    type: 'number',
    defaultValue: '1',
    required: false,
    description: 'Number of items to always show at the end when collapsed.',
  },
  {
    name: 'className',
    type: 'string',
    required: false,
    description: 'Additional CSS classes applied to the root nav element.',
  },
]

export const breadcrumbItemDataPropsData: PropItem[] = [
  {
    name: 'label',
    type: 'string',
    required: true,
    description: 'Text label for the breadcrumb item.',
  },
  {
    name: 'href',
    type: 'string',
    required: false,
    description: 'URL the item links to.',
  },
  {
    name: 'icon',
    type: 'ReactNode',
    required: false,
    description: 'Optional icon rendered next to the label.',
  },
  {
    name: 'active',
    type: 'boolean',
    required: false,
    description: 'Forces the item to render as the active page. Automatically true for the last item if undefined.',
  },
  {
    name: 'onClick',
    type: 'MouseEventHandler',
    required: false,
    description: 'Click handler for the link.',
  },
]
