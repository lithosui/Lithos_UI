import type { PropItem } from '../../components/ui/PropsTable'

const sizeDefinition = "type AvatarSizes = 'sm' | 'md' | 'lg'"

export const avatarPropsData: PropItem[] = [
  {
    name: 'src',
    type: 'string',
    required: false,
    description: 'Image URL. Falls back to initials when missing or when the image fails to load.',
  },
  {
    name: 'alt',
    type: 'string',
    required: false,
    description:
      "Accessible label and initials source — one word yields one letter, two or more yield the first two words' initials.",
  },
  {
    name: 'variant',
    type: 'AvatarVariants',
    typeDefinition: "type AvatarVariants = 'default' | 'solid'",
    defaultValue: "'default'",
    required: false,
    description:
      'default uses the neutral surface color; solid fills with the theme accent color with computed contrast text.',
  },
  {
    name: 'size',
    type: 'AvatarSizes',
    typeDefinition: sizeDefinition,
    defaultValue: "'md'",
    required: false,
    description: 'Scales the circle diameter and initials font size.',
  },
  {
    name: 'className',
    type: 'LithosClass',
    required: false,
    description: 'Additional CSS classes.',
  },
]

export const avatarGroupCountPropsData: PropItem[] = [
  {
    name: 'count',
    type: 'number',
    required: true,
    description: 'Number rendered as "+N", typically the overflow count at the end of an avatar stack.',
  },
  {
    name: 'size',
    type: 'AvatarSizes',
    typeDefinition: sizeDefinition,
    defaultValue: "'md'",
    required: false,
    description: 'Scales the circle diameter and font size to match adjacent Avatars.',
  },
  {
    name: 'className',
    type: 'LithosClass',
    required: false,
    description: 'Additional CSS classes.',
  },
]

export const avatarGroupPropsData: PropItem[] = [
  {
    name: 'items',
    type: 'AvatarGroupItem[]',
    typeDefinition: `interface AvatarGroupItem {
  src?: string
  alt: string
}`,
    required: true,
    description: 'Full list to render. Items beyond max are collapsed into a single AvatarGroupCount.',
  },
  {
    name: 'max',
    type: 'number',
    defaultValue: '4',
    required: false,
    description: 'Number of Avatars shown before the rest are collapsed into a "+N" count.',
  },
  {
    name: 'size',
    type: 'AvatarSizes',
    typeDefinition: sizeDefinition,
    defaultValue: "'md'",
    required: false,
    description: 'Scales every Avatar and the AvatarGroupCount together.',
  },
  {
    name: 'className',
    type: 'LithosClass',
    required: false,
    description: 'Additional CSS classes.',
  },
]
