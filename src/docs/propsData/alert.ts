import type { PropItem } from '../../components/ui/PropsTable'

export const alertPropsData: PropItem[] = [
  {
    name: 'intent',
    type: 'AlertIntent',
    typeDefinition: "type AlertIntent = 'default' | 'success' | 'error' | 'warning' | 'info' | 'accent'",
    defaultValue: "'default'",
    required: false,
    description: 'Status color palette drawn from the shared color tokens.',
  },
  {
    name: 'variant',
    type: 'AlertVariant',
    typeDefinition: "type AlertVariant = 'filled' | 'outlined'",
    defaultValue: "'filled'",
    required: false,
    description: 'Solid fill vs. outline-only border/shadow on the accent color.',
  },
  {
    name: 'size',
    type: 'AlertSize',
    typeDefinition: "type AlertSize = 'sm' | 'md' | 'lg'",
    defaultValue: "'lg'",
    required: false,
    description: 'Scales padding and typography together.',
  },
  {
    name: 'title',
    type: 'string',
    required: false,
    description: 'Optional heading rendered above the message.',
  },
  {
    name: 'color',
    type: 'HexColor | string',
    required: false,
    description: "Overrides type's palette with a custom hex color; contrast text is computed via the YIQ engine.",
  },
  {
    name: 'onClose',
    type: '() => void',
    required: false,
    description:
      'Renders a close button in the header when provided. Alert does not remove itself — call site owns the dismissed state.',
  },
  {
    name: 'onUndo',
    type: '() => void',
    required: false,
    description: 'Renders an undo button in the header when provided.',
  },
  {
    name: 'children',
    type: 'ReactNode',
    required: true,
    description: 'Message content rendered below the title.',
  },
  {
    name: 'className',
    type: 'LithosClass',
    required: false,
    description: 'Additional CSS classes.',
  },
]
