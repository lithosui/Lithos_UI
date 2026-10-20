import type { PropItem } from '../../components/ui/PropsTable'

export const toastProviderPropsData: PropItem[] = [
  {
    name: 'children',
    type: 'ReactNode',
    required: true,
    description: 'The React node tree wrapped with the toast context.',
  },
  {
    name: 'duration',
    type: 'number | DurationObjType',
    defaultValue: '5000',
    description: 'Global duration in ms. Accepts a single number or an object with per-type values.',
  },
  {
    name: 'position',
    type: "'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'",
    defaultValue: "'bottom-right'",
    description: 'Corner position on the viewport where toasts will stack.',
  },
  {
    name: 'className',
    type: 'LithosClass',
    description: 'Additional CSS classes to apply to the stack container.',
  },
]

export const toastPropsData: PropItem[] = [
  {
    name: 'message',
    type: 'string',
    required: true,
    description: 'The main body text displayed inside the toast notification.',
  },
  {
    name: 'title',
    type: 'string',
    description: 'Optional headline text rendered at the top of the toast.',
  },
  {
    name: 'intent',
    type: '"default" | "success" | "error" | "warning" | "info" | "accent"',
    defaultValue: '"default"',
    description: 'Defines the structural intent and default styling variant.',
  },
  {
    name: 'color',
    type: 'string',
    description: 'Custom inline CSS background or accent color variable.',
  },
  {
    name: 'duration',
    type: 'number',
    description: 'Custom lifetime in milliseconds for this specific toast, overriding the provider setting.',
  },
]
