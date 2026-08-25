import type { PropItem } from '../../components/ui/PropsTable'

export const carouselPropsData: PropItem[] = [
  {
    name: 'title',
    type: 'string',
    required: false,
    description: 'Header text for controls and screen reader accessibility label.',
  },
  {
    name: 'controlsPosition',
    type: '"top" | "bottom"',
    defaultValue: '"top"',
    required: false,
    description: 'Positioning of the prev/next arrow buttons.',
  },
  {
    name: 'hideControls',
    type: 'boolean',
    defaultValue: 'false',
    required: false,
    description: 'Hides the direction navigation buttons.',
  },
  {
    name: 'hidePagination',
    type: 'boolean',
    defaultValue: 'false',
    required: false,
    description: 'Hides slide selectors and pagination count.',
  },
  {
    name: 'slideSelector',
    type: '"dots" | "numbers"',
    defaultValue: '"dots"',
    required: false,
    description: 'The style of the sliders selectors.',
  },
  {
    name: 'showCounter',
    type: 'boolean',
    defaultValue: 'true',
    required: false,
    description: 'Shows or hides the slider position counter.',
  },
  {
    name: 'playInfinite',
    type: 'boolean',
    defaultValue: 'false',
    required: false,
    description: 'Enables automatic infinite slide rotation.',
  },
  {
    name: 'playInterval',
    type: 'number',
    defaultValue: '5000',
    required: false,
    description: 'Interval timing in milliseconds for automatic rotation.',
  },
  {
    name: 'playDirection',
    type: '"forwards" | "backwards"',
    defaultValue: '"forwards"',
    required: false,
    description: 'Direction of infinite scroll movement.',
  },
  {
    name: 'stopOnHover',
    type: 'boolean',
    defaultValue: 'true',
    required: false,
    description: 'Pauses auto-rotation on mouse enter or keyboard focus.',
  },
  {
    name: 'loop',
    type: 'boolean',
    defaultValue: 'false',
    required: false,
    description: 'Enables continuous looping, moving to the first item after reaching the end.',
  },
  {
    name: 'mode',
    type: '"horizontal" | "vertical"',
    defaultValue: '"horizontal"',
    required: false,
    description: 'Changes the layout and scroll direction from horizontal to vertical.',
  },
  {
    name: 'className',
    type: 'ClassValue | ClassArray',
    required: false,
    description: 'Custom CSS classes passed to the main carousel wrapper.',
  },
]

export const carouselSlidePropsData: PropItem[] = [
  {
    name: 'children',
    type: 'ReactNode',
    required: true,
    description: 'Content rendered inside the individual slide.',
  },
  {
    name: 'label',
    type: 'string',
    required: false,
    description: 'Accessible label for the slide.',
  },
  {
    name: 'className',
    type: 'ClassValue | ClassArray',
    required: false,
    description: 'Custom CSS classes passed to the slide wrapper.',
  },
]

export const carouselPrevPropsData: PropItem[] = [
  {
    name: 'label',
    type: 'string',
    defaultValue: '"Previous slide"',
    required: false,
    description: 'Accessible label for the previous button.',
  },
  {
    name: 'className',
    type: 'ClassValue | ClassArray',
    required: false,
    description: 'Custom CSS classes passed to the previous button element.',
  },
]

export const carouselNextPropsData: PropItem[] = [
  {
    name: 'label',
    type: 'string',
    defaultValue: '"Next slide"',
    required: false,
    description: 'Accessible label for the next button.',
  },
  {
    name: 'className',
    type: 'ClassValue | ClassArray',
    required: false,
    description: 'Custom CSS classes passed to the next button element.',
  },
]
