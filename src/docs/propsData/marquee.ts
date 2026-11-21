import type { PropItem } from '../../components/ui/PropsTable'

export const marqueePropsData: PropItem[] = [
  {
    name: 'children',
    type: 'ReactNode',
    required: true,
    description: 'Content elements or text to be looped continuously inside the marquee track.',
  },
  {
    name: 'variant',
    type: 'MarqueeVariants',
    typeDefinition: "type MarqueeVariants = 'default' | 'accent' | 'warning' | 'ghost' | 'bordered'",
    defaultValue: '"default"',
    required: false,
    description: 'Visual theme variant controlling borders, background fill, and typography colors.',
  },
  {
    name: 'direction',
    type: 'MarqueeDirection',
    typeDefinition: "type MarqueeDirection = 'left' | 'right'",
    defaultValue: '"left"',
    required: false,
    description: 'Horizontal translation direction of the marquee track.',
  },
  {
    name: 'speed',
    type: 'MarqueeSpeed',
    typeDefinition: "type MarqueeSpeed = 'slow' | 'normal' | 'fast' | number",
    defaultValue: '"normal"',
    required: false,
    description: 'Duration in seconds for one full loop cycle. Presets: slow (60s), normal (36s), fast (18s).',
  },
  {
    name: 'noPause',
    type: 'boolean',
    defaultValue: 'false',
    required: false,
    description: 'Disables the default pause-on-hover behavior, keeping the animation continuously scrolling.',
  },
  {
    name: 'fadeEdges',
    type: 'boolean',
    defaultValue: 'false',
    required: false,
    description: 'Applies horizontal gradient transparency masks on the left and right boundaries.',
  },
  {
    name: 'repeat',
    type: 'number',
    defaultValue: '3',
    required: false,
    description: 'Number of times content is cloned per track to guarantee seamless full-width coverage.',
  },
  {
    name: 'className',
    type: 'LithosClass',
    defaultValue: '""',
    required: false,
    description: 'Additional CSS class names applied to the outer container.',
  },
]
