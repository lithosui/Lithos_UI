import type { PropItem } from '../../components/ui/PropsTable'

export const typographyPropsData: PropItem[] = [
  {
    name: 'as',
    type: 'TypographyComponent',
    required: false,
    description:
      'The underlying HTML element or component tag to render (e.g. "h1", "p", "span", "label"). Defaults to the element mapped by variant.',
  },
  {
    name: 'variant',
    type: 'TypographyVariants',
    defaultValue: "'p'",
    required: false,
    description:
      'Applies predefined neobrutalist typography styles and determines default HTML element if "as" is not specified.',
  },
  {
    name: 'children',
    type: 'ReactNode',
    required: false,
    description: 'Text or node content to render inside the typography element.',
  },
  {
    name: 'color',
    type: 'HexColor | string',
    required: false,
    description: 'Hex color value for background with automatic contrast text resolution.',
  },
  {
    name: 'className',
    type: 'LithosClass',
    required: false,
    description: 'Additional CSS classes for custom styling or overriding default variant styles.',
  },
]
