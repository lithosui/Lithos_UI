import type { PropItem } from '../../components/ui/PropsTable'

export const labelPropsData: PropItem[] = [
  { name: 'children', type: 'ReactNode', description: 'Visible text or inline content naming the associated control.' },
  {
    name: 'htmlFor',
    type: 'string',
    description: 'ID of the form control to label. May be omitted when the control is nested inside the label.',
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    defaultValue: "'md'",
    description: 'Typography scale; md uses the global --lithos-label-size token.',
  },
  {
    name: 'required',
    type: 'boolean',
    defaultValue: 'false',
    description:
      'Adds a decorative asterisk hidden from assistive technology. Set required or aria-required on the control separately.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Applies muted text and a disabled cursor. Does not disable the associated control.',
  },
  {
    name: 'className',
    type: 'LithosClass',
    description: 'Classes merged through cn() to customize typography, spacing, and state styles.',
  },
  {
    name: 'ref',
    type: 'Ref<HTMLLabelElement>',
    description: 'Ref to the native label element, supported directly through React 19.',
  },
  {
    name: 'Native label props',
    type: "Omit<ComponentPropsWithRef<'label'>, 'className'>",
    description:
      'Supports native attributes and handlers, including id, form, style, title, onClick, data-* and aria-*.',
  },
]
