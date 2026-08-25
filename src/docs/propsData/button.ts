import type { PropItem } from '../../components/ui/PropsTable'

export const buttonPropsData: PropItem[] = [
  {
    name: 'variant',
    type: "'primary' | 'secondary' | 'accent' | 'text' | 'solid'",
    defaultValue: "'primary'",
    required: false,
    description: 'Visual emphasis variant.',
  },
  {
    name: 'color',
    type: 'string',
    required: false,
    description: 'Custom background color for the solid variant. Text color automatically adapts for contrast.',
  },
  {
    name: 'fullWidth',
    type: 'boolean',
    defaultValue: 'false',
    required: false,
    description: 'Expands the button to fill its container width.',
  },
  {
    name: 'type',
    type: "'button' | 'submit' | 'reset'",
    defaultValue: "'button'",
    required: false,
    description: 'Native HTML button type.',
  },
  {
    name: 'iconLeft',
    type: 'ReactNode',
    required: false,
    description: 'Icon rendered before the button label.',
  },
  {
    name: 'iconRight',
    type: 'ReactNode',
    required: false,
    description: 'Icon rendered after the button label.',
  },
  {
    name: 'children',
    type: 'ReactNode',
    required: true,
    description: 'Content rendered inside the button.',
  },
  {
    name: 'className',
    type: 'string',
    required: false,
    description: 'Additional CSS classes.',
  },
]

export const buttonGroupPropsData: PropItem[] = [
  {
    name: 'orientation',
    type: "'horizontal' | 'vertical'",
    defaultValue: "'horizontal'",
    required: false,
    description: 'Lays buttons out side by side or stacked.',
  },
  {
    name: 'attached',
    type: 'boolean',
    defaultValue: 'false',
    required: false,
    description: 'Fuses adjacent buttons into a single hard-bordered strip instead of spacing them apart.',
  },
  {
    name: 'children',
    type: 'ReactNode',
    required: true,
    description: 'Button elements to lay out.',
  },
  {
    name: 'className',
    type: 'string',
    required: false,
    description: 'Additional CSS classes.',
  },
]
