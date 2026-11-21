import type { PropItem } from '../../components/ui/PropsTable'

export const spinnerProps: PropItem[] = [
  {
    name: 'size',
    type: 'number | string',
    defaultValue: '24',
    required: false,
    description: 'The dimensions of the spinner in pixels or string format.',
  },
  {
    name: 'color',
    type: 'string',
    required: false,
    description: 'Custom color for the spinner icon. Overrides the variant color if provided.',
  },
  {
    name: 'variant',
    type: 'SpinnerVariant',
    typeDefinition: "type SpinnerVariant = 'default' | 'accent' | 'inverse'",
    defaultValue: '"default"',
    required: false,
    description: 'Dynamic color variant. Default uses primary text color.',
  },
  {
    name: 'icon',
    type: 'SpinnerIconType',
    defaultValue: '"FiLoader"',
    required: false,
    description: 'A predefined string selecting the spinner icon.',
  },
  {
    name: 'className',
    type: 'LithosClass',
    required: false,
    description: 'Custom CSS classes passed to the container.',
  },
  {
    name: 'anticlockwise',
    type: 'boolean',
    defaultValue: 'false',
    required: false,
    description: 'Reverses the direction of the spinner rotation (spins anticlockwise).',
  },
]
