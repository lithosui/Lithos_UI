import type { PropItem } from '../../components/ui/PropsTable'

const placementDef = "type SidebarPlacement = 'left' | 'right'"
const roleDef = "type SidebarRole = 'complementary' | 'region' | 'navigation'"
const modeDef = "type SidebarMode = 'permanent' | 'mini'"

export const sidebarPropsData: PropItem[] = [
  {
    name: 'open',
    type: 'boolean',
    defaultValue: 'true',
    description: 'Controls whether the mini sidebar is expanded.',
  },
  {
    name: 'setOpen',
    type: 'SidebarSetOpen',
    defaultValue: '() => {}',
    description: 'State updater callback for open state.',
  },
  {
    name: 'mode',
    type: 'SidebarMode',
    typeDefinition: modeDef,
    defaultValue: "'permanent'",
    description: 'Layout mode of the sidebar.',
  },
  {
    name: 'role',
    type: 'SidebarRole',
    typeDefinition: roleDef,
    defaultValue: "'complementary'",
    description: 'ARIA landmark role that defines the semantic container tag.',
  },
  {
    name: 'placement',
    type: 'SidebarPlacement',
    typeDefinition: placementDef,
    defaultValue: "'left'",
    description:
      'Layout side where the sidebar is positioned in the application. Controls the directional orientation of default chevron icons and tooltips.',
  },
  {
    name: 'breakpoints',
    type: 'number[]',
    defaultValue: '[64, 128, 224]',
    description: 'Width breakpoints in pixels for snap/resize steps.',
  },
  {
    name: 'children',
    type: 'ReactNode',
    description: 'Children nodes.',
  },
  {
    name: 'className',
    type: 'LithosClass',
    description: 'Additional CSS classes for the root container.',
  },
  {
    name: '...props',
    type: "Omit<ComponentPropsWithRef<'div'>, 'className'>",
    description: 'Native HTML attributes forwarded to the outer div container.',
  },
]

export const sidebarContentPropsData: PropItem[] = [
  {
    name: 'allowSwipeOnContent',
    type: 'boolean',
    defaultValue: 'true',
    description:
      "Whether swipe/drag gesture is allowed directly on the sidebar content. If false, interactive elements won't capture pointer drag events.",
  },
  {
    name: 'resizerAriaLabel',
    type: 'string',
    defaultValue: "'Resize sidebar'",
    description: 'Accessible label for the resizer separator handle.',
  },
  {
    name: 'resizerClass',
    type: 'LithosClass',
    description: 'Additional CSS classes for the resizer handle container.',
  },
  {
    name: 'resizerIndicatorClass',
    type: 'LithosClass',
    description: 'Additional CSS classes for the resizer handle indicator line.',
  },
  {
    name: 'resizer',
    type: 'ReactNode',
    description: 'Custom element or render function for the resizer handle.',
  },
  {
    name: 'openThresholdOffset',
    type: 'number',
    defaultValue: '8',
    description:
      'Additional pixel threshold beyond the collapsed width required to toggle the `open` state to `true` during active dragging. Helps prevent flickering caused by accidental micro-gestures.',
  },
  {
    name: 'className',
    type: 'LithosClass',
    description: 'Additional CSS classes.',
  },
  {
    name: 'children',
    type: 'ReactNode',
    description: 'Children nodes.',
  },
  {
    name: '...props',
    type: "ComponentPropsWithRef<T extends ElementType = 'aside'>",
    description:
      'Native HTML attributes forwarded to the resolved container element (aside, div, section, or nav based on role).',
  },
]

export const sidebarTriggerPropsData: PropItem[] = [
  {
    name: 'children',
    type: 'ReactNode',
    description: 'Custom icon or content for the toggle button.',
  },
  {
    name: 'className',
    type: 'LithosClass',
    description: 'Additional CSS classes for the trigger element.',
  },
  {
    name: 'label',
    type: 'string',
    description: 'Accessible label added to the trigger button.',
  },
  {
    name: 'asChild',
    type: 'boolean',
    defaultValue: 'false',
    description:
      'Delegates rendering to its direct child element, merging styles, accessibility attributes, and event handlers.',
  },
  {
    name: 'iconSize',
    type: 'number',
    defaultValue: '18',
    description: 'Pixel dimension for default render icons.',
  },
  {
    name: 'disableTooltip',
    type: 'boolean',
    description: 'Whether to disable the tooltip wrapper.',
  },
  {
    name: 'tooltipPlacement',
    type: "TooltipProps['placement']",
    defaultValue: "placement === 'right' ? 'left' : 'right'",
    description: 'Placement orientation for the trigger tooltip. Automatically mirrors placement side by default.',
  },
  {
    name: 'shortcutKey',
    type: 'string | null',
    defaultValue: "'ctrl+b'",
    description:
      "Keyboard shortcut combination to toggle the sidebar state globally (e.g., 'ctrl+b', 'cmd+b'). Set to null to disable.",
  },
  {
    name: '...props',
    type: "AsChildProps<BaseSidebarTriggerProps, 'button', T>",
    description:
      'Native HTML and Lithos Button attributes forwarded by default, or target element props forwarded to the child when asChild is true.',
  },
]

export const sidebarItemPropsData: PropItem[] = [
  {
    name: 'icon',
    type: 'ReactNode',
    description: 'Icon displayed on the left or centered when collapsed.',
  },
  {
    name: 'active',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Active navigation state.',
  },
  {
    name: 'textVariant',
    type: 'TypographyVariants',
    defaultValue: "'label'",
    description: 'Valid variant added to the internal Typography primitive.',
  },
  {
    name: 'textClass',
    type: 'LithosClass',
    description: 'Additional CSS classes added to the internal Typography primitive.',
  },
  {
    name: 'asChild',
    type: 'boolean',
    defaultValue: 'false',
    description:
      'When true, delegates rendering to its direct child element (e.g. <a />, Link), merging styles, classNames, and event handlers.',
  },
  {
    name: 'className',
    type: 'LithosClass',
    description: 'Additional CSS classes.',
  },
  {
    name: 'children',
    type: 'ReactNode',
    description: 'Label content displayed when expanded or used as title tooltip when collapsed.',
  },
  {
    name: '...props',
    type: "AsChildProps<BaseSidebarItemProps & Omit<ButtonProps, 'className'>, 'button', T>",
    description:
      'Native HTML attributes forwarded to the button by default, or target element props (e.g. href, to, target) forwarded to the child when asChild is true.',
  },
]

export const useSidebarReturnPropsData: PropItem[] = [
  {
    name: 'mode',
    type: 'SidebarMode',
    typeDefinition: modeDef,
    description: 'The structural mode of the sidebar. Determines layout behavior and responsive characteristics.',
  },
  {
    name: 'role',
    type: 'SidebarRole',
    typeDefinition: roleDef,
    description: 'Accessibility ARIA role applied to the main sidebar container.',
  },
  {
    name: 'open',
    type: 'boolean',
    description: 'Current expansion state of the sidebar. True when expanded/visible, false when collapsed/hidden.',
  },
  {
    name: 'setOpen',
    type: 'SidebarSetOpen',
    description:
      'Function to update the sidebar expansion state. Supports direct boolean assignment or function updater pattern.',
  },
  {
    name: 'placement',
    type: 'SidebarPlacement',
    typeDefinition: placementDef,
    description:
      "Layout side where the sidebar is positioned in the application ('left' or 'right'). Used by child components to adapt icon orientations, borders, and tooltip alignments.",
  },
  {
    name: 'breakpoints',
    type: 'number[]',
    description:
      'Width breakpoints in pixels for snap/resize steps. The first item sets the collapsed width and the last item sets the expanded width.',
  },
  {
    name: 'activeWidth',
    type: 'number',
    description: 'Current active width in pixels applied to the sidebar layout.',
  },
  {
    name: 'setActiveWidth',
    type: '(width: number | ((prev: number) => number)) => void',
    description: 'Dispatcher to update the active width state from resizer or content interactions.',
  },
  {
    name: 'activeBreakpointIndex',
    type: 'number',
    description:
      'Derived zero-based index representing the current breakpoint step within breakpoints. Evaluates to -1 when open is false.',
  },
  {
    name: 'currentBreakpoint',
    type: 'number | null',
    description: 'Current breakpoint width in pixels if open is true, otherwise null.',
  },
  {
    name: 'isDragging',
    type: 'boolean',
    description: 'Flag indicating whether the sidebar is currently being resized or dragged.',
  },
  {
    name: 'setIsDragging',
    type: '(isDragging: boolean) => void',
    description: 'Updates the dragging state.',
  },
]

export const sidebarHeaderPropsData: PropItem[] = [
  {
    name: 'className',
    type: 'LithosClass',
    description: 'Additional CSS classes for custom styling and layout overrides.',
  },
  {
    name: 'children',
    type: 'ReactNode',
    description: 'Header content such as branding titles, logos, or the SidebarTrigger component.',
  },
  {
    name: '...props',
    type: "Omit<ComponentPropsWithRef<'div'>, 'className'>",
    description: 'Native HTML attributes forwarded to the container div element.',
  },
]

export const sidebarTitlePropsData: PropItem[] = [
  {
    name: 'variant',
    type: 'TypographyVariants',
    defaultValue: "'h4'",
    description: 'Typography variant configuration passed to the underlying Typography primitive.',
  },
  {
    name: 'className',
    type: 'LithosClass',
    description: 'Additional CSS classes applied to the typography title element.',
  },
  {
    name: 'children',
    type: 'ReactNode',
    description: 'Title text content rendered when the sidebar is expanded.',
  },
  {
    name: '...props',
    type: 'TypographyProps',
    description: 'Supports all native attributes and properties accepted by the Typography primitive.',
  },
]
