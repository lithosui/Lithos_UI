import type { PropItem } from '../../components/ui/PropsTable'

export const kbdPropsData: PropItem[] = [
  {
    name: 'children',
    type: 'ReactNode',
    required: false,
    description: 'Keycap label, character, or icon to display inside the key element.',
  },
  {
    name: 'size',
    type: 'KbdSize',
    typeDefinition: "type KbdSize = 'xs' | 'sm' | 'md' | 'lg'",
    defaultValue: '"md"',
    required: false,
    description: 'Controls the proportional dimensions, font size, and padding of the keycap.',
  },
  {
    name: 'variant',
    type: 'KbdVariant',
    typeDefinition: "type KbdVariant = 'default' | 'accent' | 'outline' | 'solid' | 'subtle' | 'inverse'",
    defaultValue: '"default"',
    required: false,
    description: 'Visual style variant representing keycap status, theme, or hierarchy.',
  },
  {
    name: 'color',
    type: 'HexColor | string',
    required: false,
    description: 'Custom background color with automatic YIQ biological contrast calculation for text.',
  },
  {
    name: 'className',
    type: 'LithosClass',
    defaultValue: '""',
    required: false,
    description: 'Additional CSS classes to customize or override styling.',
  },
  {
    name: 'ref',
    type: 'Ref<HTMLElement>',
    required: false,
    description: 'Ref forwarded directly to the root <kbd> element.',
  },
]

export const kbdGroupPropsData: PropItem[] = [
  {
    name: 'children',
    type: 'ReactNode',
    required: false,
    description: 'Kbd keycap components and optional separators to group together.',
  },
  {
    name: 'attached',
    type: 'boolean',
    defaultValue: 'false',
    required: false,
    description: 'When true, fuses adjacent keycaps into a continuous border strip using negative margins.',
  },
  {
    name: 'className',
    type: 'LithosClass',
    defaultValue: '""',
    required: false,
    description: 'Additional CSS classes to apply to the group wrapper.',
  },
]
