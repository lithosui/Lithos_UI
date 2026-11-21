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
    type: 'CarouselControlsPosition',
    typeDefinition: "type CarouselControlsPosition = 'top' | 'bottom'",
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
    type: 'CarouselSlideSelector',
    typeDefinition: "type CarouselSlideSelector = 'dots' | 'numbers'",
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
    type: 'CarouselDirection',
    typeDefinition: "type CarouselDirection = 'forwards' | 'backwards'",
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
    type: 'CarouselMode',
    typeDefinition: "type CarouselMode = 'horizontal' | 'vertical'",
    defaultValue: '"horizontal"',
    required: false,
    description: 'Changes the layout and scroll direction from horizontal to vertical.',
  },
  {
    name: 'className',
    type: 'LithosClass',
    required: false,
    description: 'Custom CSS classes passed to the main carousel wrapper.',
  },
  {
    name: 'asChild',
    type: 'boolean',
    defaultValue: 'false',
    required: false,
    description: 'Renders children without using wrappers, use it when using custom layouts.',
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
    type: 'LithosClass',
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
    type: 'LithosClass',
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
    type: 'LithosClass',
    required: false,
    description: 'Custom CSS classes passed to the next button element.',
  },
]

export const carouselControlsPropsData: PropItem[] = [
  {
    name: 'className',
    type: 'LithosClass',
    required: false,
    description: 'Custom CSS classes passed to the controls container.',
  },
]

export const carouselPaginationPropsData: PropItem[] = [
  {
    name: 'label',
    type: 'string',
    defaultValue: '"Move to the slide $"',
    required: false,
    description:
      'Accessible label pattern for slide navigation buttons. The "$" symbol is replaced by the slide number.',
  },
  {
    name: 'className',
    type: 'LithosClass',
    required: false,
    description: 'Custom CSS classes passed to the pagination container.',
  },
]

export const carouselTrackPropsData: PropItem[] = [
  {
    name: 'children',
    type: 'ReactNode',
    required: true,
    description: 'Slide elements rendered inside the scrollable track.',
  },
  {
    name: 'className',
    type: 'LithosClass',
    required: false,
    description: 'Custom CSS classes passed to the track container.',
  },
]

export const useCarouselPropsData: PropItem[] = [
  {
    name: 'scroll',
    type: 'ScrollFunc',
    description: 'Function to programmatically scroll the carousel.',
  },
  {
    name: 'currentIndex',
    defaultValue: '0',
    type: 'number',
    description: 'Index of the currently active slide.',
  },
  {
    name: 'totalSlides',
    defaultValue: '0',
    type: 'number',
    description: 'Total number of registered slides in the carousel.',
  },
  {
    name: 'mode',
    type: 'CarouselMode',
    defaultValue: '"horizontal"',
    description: 'Indicates the current scrolling mode of the carousel.',
  },
  {
    name: 'containerRef',
    type: 'RefObject<HTMLDivElement | null>',
    description: 'React ref attached to the main scrollable container element.',
  },
  {
    name: 'handleScroll',
    type: '(e: UIEvent<HTMLDivElement>) => void',
    description: 'Event handler triggered on container scroll to update active state.',
  },
  {
    name: 'dragHandlers',
    type: "Omit<useCarouselDragReturn, 'isDragging'>",
    description: 'Pointer and mouse event handlers to manage drag-to-scroll interactions.',
  },
  {
    name: 'registerSlide',
    type: '(id: string) => () => void',
    description: 'Registers a slide ID in the context and returns an unregister cleanup function.',
  },
  {
    name: 'slideIds',
    type: 'string[]',
    defaultValue: '[]',
    description: 'Array containing all currently registered slide IDs.',
  },
  {
    name: 'title',
    type: 'string',
    defaultValue: '""',
    description: 'It passes the title that was passed to the Carousel, useful in very nested components',
  },
  {
    name: 'loop',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Indicates whether the carousel loops back to the start when reaching the end.',
  },
  {
    name: 'slideSelector',
    type: 'CarouselSlideSelector',
    typeDefinition: "type CarouselSlideSelector = 'dots' | 'numbers'",
    defaultValue: '"dots"',
    description: 'Indicates the used slider selector ("dots" | "number").',
  },
  {
    name: 'showCounter',
    type: 'boolean',
    defaultValue: 'true',
    description: 'Indicates the visibility of the slide index indicator or counter.',
  },
  {
    name: 'vertical',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Indicates whether the carousel layout and scroll direction are vertical.',
  },
  {
    name: 'bottomControls',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Determines if navigation controls are rendered at the bottom.',
  },
  {
    name: 'isPaused',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Indicates if the autoplay cycle is currently paused.',
  },
  {
    name: 'playInfinite',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Indicates whether autoplay is enabled to continuously transition slides.',
  },
]
