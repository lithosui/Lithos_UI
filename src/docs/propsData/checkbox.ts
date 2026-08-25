import type { PropItem } from '../../components/ui/PropsTable'

export const checkboxPropsData: PropItem[] = [
  {
    name: 'color',
    type: 'HexColor | string',
    required: false,
    description:
      'Overrides the default theme-accent fill with a custom hex color; contrast text is computed via the YIQ engine.',
  },
  {
    name: 'indeterminate',
    type: 'boolean',
    defaultValue: 'false',
    required: false,
    description:
      'Renders a dash instead of a check mark. Sets the native DOM `indeterminate` property directly (there is no HTML attribute for it), independent of `checked`.',
  },
  {
    name: 'label',
    type: 'ReactNode',
    required: false,
    description: 'Clickable label rendered next to the box.',
  },
  {
    name: 'description',
    type: 'ReactNode',
    required: false,
    description: 'Helper text rendered below the label.',
  },
  {
    name: 'value',
    type: 'string',
    required: false,
    description:
      'Native checkbox value. When rendered inside a CheckboxGroup, supplying this makes the item a controlled multi-select entry automatically.',
  },
  {
    name: 'checked',
    type: 'boolean',
    required: false,
    description: 'Controlled checked state, same as a native input. Ignored for items controlled by a CheckboxGroup.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: 'false',
    required: false,
    description: 'Disables the input and dims the label. Inherited from CheckboxGroup when set there.',
  },
  {
    name: 'className',
    type: 'ClassValue | ClassArray',
    required: false,
    description: 'Additional CSS classes on the outer label.',
  },
]

export const iconCheckboxPropsData: PropItem[] = [
  {
    name: 'icon',
    type: 'ComponentType<IconProps>',
    defaultValue: 'IconHeartOutline',
    required: false,
    description: 'Icon shown when unchecked.',
  },
  {
    name: 'checkedIcon',
    type: 'ComponentType<IconProps>',
    defaultValue: 'IconHeart',
    required: false,
    description: 'Icon shown when checked.',
  },
]

export const checkboxGroupPropsData: PropItem[] = [
  {
    name: 'value',
    type: 'string[]',
    required: true,
    description: 'Array of the checked child values. CheckboxGroup is always controlled.',
  },
  {
    name: 'onChange',
    type: '(value: string[]) => void',
    required: true,
    description: 'Called with the next array whenever a child Checkbox is toggled.',
  },
  {
    name: 'label',
    type: 'ReactNode',
    required: false,
    description: 'Heading rendered above the group and wired to it via aria-labelledby.',
  },
  {
    name: 'description',
    type: 'ReactNode',
    required: false,
    description: 'Helper text rendered below the label.',
  },
  {
    name: 'mode',
    type: "'horizontal' | 'vertical'",
    defaultValue: "'vertical'",
    required: false,
    description: 'Stacks items in a column or flows them in a row.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: 'false',
    required: false,
    description: 'Disables every child Checkbox in the group.',
  },
  {
    name: 'name',
    type: 'string',
    required: false,
    description: 'Shared `name` attribute applied to every child input.',
  },
  {
    name: 'children',
    type: 'ReactNode',
    required: true,
    description: 'Checkbox elements, each with its own `value` prop.',
  },
]
