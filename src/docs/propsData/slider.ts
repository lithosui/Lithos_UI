import type { PropItem } from '../../components/ui/PropsTable'

export const sliderPropsData: PropItem[] = [
  {
    name: 'mode',
    type: 'SliderMode',
    typeDefinition: "type SliderMode = 'horizontal' | 'vertical'",
    defaultValue: '"horizontal"',
    description:
      'Layout behavior: horizontal or vertical axis. Vertical values increase from bottom to top; customize height with className or style.',
  },
  {
    name: 'shape',
    type: 'SliderShape',
    typeDefinition: "type SliderShape = 'square' | 'round'",
    defaultValue: 'Global --lithos-radius token',
    description: 'Overrides the track and thumb radius with square corners or a pill track and circular thumb.',
  },
  {
    name: 'color',
    type: 'string',
    defaultValue: 'var(--lithos-accent)',
    description: 'Custom thumb color (use a hex color for YIQ border contrast). Does not change global theme tokens.',
  },
  {
    name: 'value',
    type: 'number',
    description: 'Controlled value. Pair with onValueChange or onChange; do not also supply defaultValue.',
  },
  {
    name: 'defaultValue',
    type: 'number',
    defaultValue: 'Midpoint between min and max',
    description:
      'Initial uncontrolled value, restored by a native form reset. The browser clamps it to the bounds and snaps it to step.',
  },
  {
    name: 'min',
    type: 'number',
    defaultValue: '0',
    description: 'Lower bound. Supply finite bounds with max greater than or equal to min.',
  },
  {
    name: 'max',
    type: 'number',
    defaultValue: '100',
    description: 'Upper bound. Equal bounds create a fixed-value slider.',
  },
  {
    name: 'step',
    type: 'SliderStep',
    typeDefinition: "type SliderStep = number | 'any'",
    defaultValue: '1',
    description:
      'Positive increment relative to min, or "any" for continuous values. With "any", keyboard increments follow native browser behavior.',
  },
  {
    name: 'size',
    type: 'SliderSize',
    typeDefinition: "type SliderSize = 'sm' | 'md' | 'lg'",
    defaultValue: '"md"',
    description: 'Thumb size. All sizes keep a 44px input hit area across the slider axis.',
  },
  {
    name: 'onValueChange',
    type: '(value: number) => void',
    description: 'Receives valueAsNumber on each user change, including pointer, touch, and keyboard interaction.',
  },
  {
    name: 'onChange',
    type: 'ChangeEventHandler<HTMLInputElement>',
    description: 'Native React change handler, called before onValueChange.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Disables interaction and removes the control from tab navigation and form submission.',
  },
  {
    name: 'className',
    type: 'LithosClass',
    description:
      'Additional classes merged with the input styles. Use pseudo-element utilities to customize track or thumb radius.',
  },
  { name: 'ref', type: 'Ref<HTMLInputElement>', description: 'Ref forwarded to the native range input.' },
  {
    name: '...props',
    type: 'Omit<LithosElementProps<"input">, "type" | "size" | "value" | "defaultValue" | "min" | "max" | "step" | "children">',
    description:
      'Native attributes including id, name, form, dir, style, aria-label, aria-labelledby, aria-describedby, aria-valuetext, and event handlers. Type is always range; children are unsupported.',
  },
]
