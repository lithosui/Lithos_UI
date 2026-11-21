import type { PropItem } from '../../components/ui/PropsTable'

export const badgePropsData: PropItem[] = [
  {
    name: 'children',
    type: 'ReactNode',
    required: false,
    description: 'The content to be rendered inside the badge.',
  },
  {
    name: 'className',
    type: 'LithosClass',
    defaultValue: '""',
    required: false,
    description: 'Additional CSS classes to apply custom styles.',
  },
  {
    name: 'size',
    type: 'BadgeSizes',
    typeDefinition: "type BadgeSizes = 'default' | 'sm' | 'md' | 'lg'",
    defaultValue: '"default"',
    required: false,
    description: 'Defines the overall scale and padding of the badge.',
  },
  {
    name: 'intent',
    type: 'BadgeIntents',
    typeDefinition: "type BadgeIntents = 'default' | 'accent' | 'success' | 'error' | 'warning' | 'info'",
    defaultValue: '"default"',
    required: false,
    description: 'Controls the visual style and semantic status of the badge.',
  },
  {
    name: 'color',
    type: 'HexColor | string',
    required: false,
    description: 'Sets a custom background or accent color value.',
  },
  {
    name: 'ref',
    type: 'Ref<HTMLDivElement>',
    required: false,
    description: 'Ref forwarded to the root div element.',
  },
]
