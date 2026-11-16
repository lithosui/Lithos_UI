import type { PropItem } from '../../components/ui/PropsTable'

export const labelPropsData: PropItem[] = [
  {
    name: 'htmlFor',
    type: 'string',
    description: 'ID of the associated control. Clicking the label activates that control.',
  },
  {
    name: 'size',
    type: '"default" | "sm" | "md" | "lg"',
    defaultValue: '"default"',
    description: 'Typography scale. Default follows the shared label token; other sizes match Input text sizes.',
  },
  {
    name: 'required',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Shows an asterisk. Also set required on the associated control for validation and accessibility.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Dims the label. Also set disabled on the associated control to disable interaction.',
  },
  {
    name: 'icon',
    type: 'ReactNode',
    description: 'Decorative icon hidden from assistive technology. Keep visible text to name the control.',
  },
  {
    name: 'iconPosition',
    type: '"left" | "top"',
    defaultValue: '"left"',
    description: 'Positions the icon beside or above the text.',
  },
  { name: 'children', type: 'ReactNode', description: 'Visible label text or inline content.' },
  { name: 'className', type: 'LithosClass', description: 'Custom classes merged with the base styles.' },
  { name: 'ref', type: 'Ref<HTMLLabelElement>', description: 'Ref forwarded to the native label element.' },
  {
    name: '...props',
    type: 'ComponentPropsWithRef<"label">',
    description: 'Native label attributes, event handlers, and styles.',
  },
]
