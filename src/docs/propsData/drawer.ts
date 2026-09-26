import type { PropItem } from '../../components/ui/PropsTable'

export const drawerPropsData: PropItem[] = [
  {
    name: 'open',
    type: 'boolean',
    required: true,
    description: 'Controls the open state of the drawer.',
  },
  {
    name: 'onOpenChange',
    type: '(open: boolean) => void',
    required: true,
    description: 'Callback fired when the drawer open state changes.',
  },
  {
    name: 'children',
    type: 'ReactNode',
    required: true,
    description: 'Content to render inside the drawer.',
  },
  {
    name: 'aria-label',
    type: 'string',
    required: false,
    description: 'Accessible label for the drawer. Required if aria-labelledby is not provided.',
  },
  {
    name: 'aria-labelledby',
    type: 'string',
    required: false,
    description: 'ID of the element that labels the drawer. Required if aria-label is not provided.',
  },
  {
    name: 'trigger',
    type: 'ReactNode',
    required: false,
    description: 'Trigger element used to open the drawer.',
  },
  {
    name: 'mode',
    type: "DrawerMode ('default' | 'responsive')",
    defaultValue: "'default'",
    required: false,
    description: 'Drawer rendering mode. Responsive mode automatically converts to a Dialog on desktop.',
  },
  {
    name: 'placement',
    type: "DrawerPlacement ('left' | 'right' | 'top' | 'bottom')",
    defaultValue: "mode === 'responsive' ? 'bottom' : 'right'",
    required: false,
    description: 'Placement edge where the drawer enters from.',
  },
  {
    name: 'transition',
    type: "DrawerTransition ('slide' | 'fade' | 'zoom')",
    defaultValue: "'slide'",
    required: false,
    description: 'Transition effect applied when opening or closing the drawer.',
  },
  {
    name: 'transformOrigin',
    type: 'DrawerTransformOrigin',
    defaultValue: "'center'",
    required: false,
    description: 'Origin point for CSS transform animations.',
  },
  {
    name: 'transitionDuration',
    type: 'DrawerTransitionDuration (number | { enter: number; exit: number })',
    defaultValue: '150',
    required: false,
    description: 'Transition duration in milliseconds. Can be a single number or an object with enter and exit values.',
  },
  {
    name: 'indicator',
    type: 'boolean',
    defaultValue: "placement === 'bottom' || placement === 'top'",
    required: false,
    description: 'Whether to display a visual swipe handle indicator.',
  },
  {
    name: 'indicatorLabel',
    type: 'string',
    defaultValue: "'Drag handle'",
    required: false,
    description: 'Accessible label for the swipe handle indicator.',
  },
  {
    name: 'swipeOnlyOnIndicator',
    type: 'boolean',
    defaultValue: 'false',
    required: false,
    description: 'If true, drag/swipe gestures will only trigger when dragging directly from the handle indicator.',
  },
  {
    name: 'allowSwipeOnContent',
    type: 'boolean',
    defaultValue: 'true',
    required: false,
    description:
      "Whether swipe/drag gesture is allowed directly on the drawer content. If set to false, interactive elements won't capture pointer drag events.",
  },
  {
    name: 'threshold',
    type: 'number',
    defaultValue: '100',
    required: false,
    description: 'Minimum swipe distance in pixels required to trigger the close action.',
  },
  {
    name: 'onEnter',
    type: '() => void',
    required: false,
    description: 'Callback fired when the enter transition starts.',
  },
  {
    name: 'onExit',
    type: '() => void',
    required: false,
    description: 'Callback fired when the exit transition ends.',
  },
  {
    name: 'className',
    type: 'LithosClass',
    required: false,
    description: 'Additional CSS classes for the drawer main panel container.',
  },
  {
    name: 'backdropClass',
    type: 'LithosClass',
    required: false,
    description: 'Additional CSS classes for the backdrop overlay.',
  },
  {
    name: 'aria-describedby',
    type: 'string',
    required: false,
    description: 'ID of the element that describes the drawer content for screen readers.',
  },
]

export const drawerHeaderPropsData: PropItem[] = [
  {
    name: 'children',
    type: 'ReactNode',
    required: false,
    description: 'Header content such as titles or navigation elements.',
  },
  {
    name: 'className',
    type: 'LithosClass',
    required: false,
    description: 'Additional CSS classes for the header container.',
  },
]

export const drawerBodyPropsData: PropItem[] = [
  {
    name: 'children',
    type: 'ReactNode',
    required: false,
    description: 'Main scrollable content of the drawer.',
  },
  {
    name: 'className',
    type: 'LithosClass',
    required: false,
    description: 'Additional CSS classes for the body container.',
  },
]

export const drawerFooterPropsData: PropItem[] = [
  {
    name: 'children',
    type: 'ReactNode',
    required: false,
    description: 'Footer actions such as confirmation buttons or controls.',
  },
  {
    name: 'className',
    type: 'LithosClass',
    required: false,
    description: 'Additional CSS classes for the footer container.',
  },
]

export const drawerTitlePropsData: PropItem[] = [
  {
    name: 'children',
    type: 'ReactNode',
    required: false,
    description: 'The title text or node to display inside the drawer header.',
  },
  {
    name: 'className',
    type: 'LithosClass',
    required: false,
    description: 'Additional CSS classes for styling the title element.',
  },
]

export const useDrawerReturnData: PropItem[] = [
  {
    name: 'open',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Current open state of the parent drawer.',
  },
  {
    name: 'onOpenChange',
    type: '(open: boolean) => void',
    description: 'Callback to request opening or closing the parent drawer.',
  },
  {
    name: 'mode',
    type: 'DrawerMode',
    defaultValue: "'default'",
    description: 'Rendering mode of the drawer.',
  },
  {
    name: 'isDesktop',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Indicates whether the current viewport matches the desktop breakpoint.',
  },
  {
    name: 'titleId',
    type: 'string',
    defaultValue: 'undefined',
    description: 'Unique HTML id assigned to the DrawerTitle element for accessibility.',
  },
]
