import type { PropItem } from '../../components/ui/PropsTable'

const sharedProps: PropItem[] = [
  {
    name: 'animation',
    type: 'SkeletonAnimation',
    typeDefinition: "type SkeletonAnimation = boolean | 'shimmer' | 'pulse'",
    defaultValue: 'true',
    description:
      'Use true for the default animation, "pulse" for pulse, or false to disable animation. "shimmer" is also accepted. Forced colors disable animation.',
  },
  {
    name: 'respectReducedMotion',
    type: 'boolean',
    defaultValue: 'false',
    description:
      'Set true to disable animation when the OS/browser requests reduced motion. animation={false} and forced colors always disable animation.',
  },
  {
    name: 'tone',
    type: 'SkeletonTone',
    typeDefinition: "type SkeletonTone = 'neutral' | 'accent'",
    defaultValue: '"neutral"',
    description: 'Theme-token-based fill, including Obsidian mode and custom accents.',
  },
  {
    name: 'className',
    type: 'LithosClass',
    description: 'Additional classes. Utilities override the default component classes.',
  },
  { name: 'style', type: 'CSSProperties', description: 'Inline styles applied to the root.' },
]

export const skeletonPropsData: PropItem[] = [
  {
    name: 'variant',
    type: 'SkeletonVariant',
    typeDefinition: "type SkeletonVariant = 'text' | 'rectangular' | 'rounded' | 'circular'",
    defaultValue: '"text"',
    description:
      'Text is 1em tall; rectangles are 8rem tall; circles are 3rem wide with a 1:1 aspect ratio. Set equal dimensions if overriding both circle dimensions.',
  },
  {
    name: 'width',
    type: 'CSSProperties["width"]',
    description: 'Number in pixels or CSS width. Capped at the parent width by default; inline style takes precedence.',
  },
  {
    name: 'height',
    type: 'CSSProperties["height"]',
    description: 'Number in pixels or CSS height. Inline style takes precedence.',
  },
  ...sharedProps,
  {
    name: 'ref',
    type: 'Ref<HTMLSpanElement>',
    description: 'React 19 ref to the empty span. Children and dangerouslySetInnerHTML are not supported.',
  },
]

export const skeletonTextPropsData: PropItem[] = [
  {
    name: 'lines',
    type: 'number',
    defaultValue: '3',
    description: 'Floored and clamped to 0–100. NaN and infinities fall back to three. Zero renders an empty wrapper.',
  },
  {
    name: 'lastLineWidth',
    type: 'CSSProperties["width"]',
    defaultValue: '"65%"',
    description: 'Width of the final line for multiline text. A single line stays full width.',
  },
  ...sharedProps,
  { name: 'ref', type: 'Ref<HTMLDivElement>', description: 'React 19 ref to the decorative text wrapper.' },
]
