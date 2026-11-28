import type { PropItem } from '../../components/ui/PropsTable'

const spacingDef = "type CardSpacing = 'sm' | 'md' | 'lg'"

export const cardPropsData: PropItem[] = [
  {
    name: 'variant',
    type: 'CardVariants',
    typeDefinition: "type CardVariants = 'default' | 'accent' | 'image' | 'solid'",
    defaultValue: "'default'",
    required: false,
    description:
      'Visual treatment. image drops padding/background for edge-to-edge media; solid permanently fills with the theme accent color.',
  },
  {
    name: 'interactive',
    type: 'CardInteractive',
    typeDefinition: "type CardInteractive = boolean | 'elevate'",
    defaultValue: 'false',
    required: false,
    description:
      "Enables hover physics. true expands the shadow (default offset). 'elevate' translates the card on the Y-axis.",
  },
  {
    name: 'className',
    type: 'LithosClass',
    required: false,
    description: 'Additional CSS classes.',
  },
]

export const cardImagePropsData: PropItem[] = [
  {
    name: 'src',
    type: 'string',
    required: true,
    description: 'Image source URL.',
  },
  {
    name: 'alt',
    type: 'string',
    required: true,
    description: 'Accessible alternative text describing the image.',
  },
  {
    name: 'isBackground',
    type: 'boolean',
    defaultValue: 'false',
    required: false,
    description: 'Positions the image absolutely to bleed behind CardContent instead of stacking above it.',
  },
  {
    name: 'className',
    type: 'LithosClass',
    required: false,
    description: 'Additional CSS classes.',
  },
]

export const cardContentPropsData: PropItem[] = [
  {
    name: 'spacing',
    type: 'CardSpacing',
    typeDefinition: spacingDef,
    defaultValue: "'md'",
    required: false,
    description: 'Internal padding scale.',
  },
  {
    name: 'className',
    type: 'LithosClass',
    required: false,
    description: 'Additional CSS classes.',
  },
]

export const cardTitlePropsData: PropItem[] = [
  {
    name: 'className',
    type: 'LithosClass',
    required: false,
    description: 'Additional CSS classes.',
  },
]

export const cardDescriptionPropsData: PropItem[] = [
  {
    name: 'className',
    type: 'LithosClass',
    required: false,
    description: 'Additional CSS classes.',
  },
]

export const cardFooterPropsData: PropItem[] = [
  {
    name: 'spacing',
    type: 'CardSpacing',
    typeDefinition: spacingDef,
    defaultValue: "'md'",
    required: false,
    description: 'Internal padding scale, matched to the adjacent CardContent.',
  },
  {
    name: 'className',
    type: 'LithosClass',
    required: false,
    description: 'Additional CSS classes.',
  },
]
