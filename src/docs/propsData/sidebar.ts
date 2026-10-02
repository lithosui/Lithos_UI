import type { PropItem } from '../../components/ui/PropsTable'

export const sidebarPropsData: PropItem[] = [
  {
    name: 'open',
    type: 'boolean',
    required: false,
    description: 'Controls whether the mini sidebar is expanded.',
  },
  {
    name: 'setOpen',
    type: '(open: boolean) => void',
    required: false,
    description: 'State updater callback for open state.',
  },
  {
    name: 'mode',
    type: "'permanent' | 'mini'",
    defaultValue: "'permanent'",
    required: false,
    description: 'Layout mode of the sidebar.',
  },
  {
    name: 'role',
    type: "'complementary' | 'region' | 'navigation'",
    defaultValue: "'complementary'",
    required: false,
    description: 'ARIA landmark role that defines the semantic container tag.',
  },
  {
    name: 'children',
    type: 'ReactNode',
    required: false,
    description: 'Children nodes.',
  },
  {
    name: 'className',
    type: 'LithosClass',
    required: false,
    description: 'Additional CSS classes for the root container.',
  },
  {
    name: '...props',
    type: "ComponentPropsWithRef<'div'>",
    required: false,
    description: 'Native HTML attributes forwarded to the outer div element.',
  },
]

export const sidebarContentPropsData: PropItem[] = [
  {
    name: 'collapsedWidth',
    type: 'string',
    required: false,
    description: "Tailwind width class for collapsed state (e.g. 'w-16').",
  },
  {
    name: 'expandedWidth',
    type: 'string',
    required: false,
    description: "Tailwind width class for expanded state (e.g. 'w-56').",
  },
  {
    name: 'className',
    type: 'LithosClass',
    required: false,
    description: 'Additional CSS classes.',
  },
  {
    name: 'children',
    type: 'ReactNode',
    required: false,
    description: 'Children nodes.',
  },
  {
    name: '...props',
    type: 'ComponentPropsWithRef<SidebarContainerElement>',
    required: false,
    description: 'Native HTML attributes forwarded to the resolved container element.',
  },
]

export const sidebarTriggerPropsData: PropItem[] = [
  {
    name: 'children',
    type: 'ReactNode',
    required: false,
    description: 'Custom icon or content for the toggle button.',
  },
  {
    name: 'className',
    type: 'LithosClass',
    required: false,
    description: 'Additional CSS classes for the button.',
  },
  {
    name: 'label',
    type: 'string',
    required: false,
    description: 'Accessible label added to the trigger button.',
  },
  {
    name: '...props',
    type: "ComponentPropsWithRef<'button'>",
    required: false,
    description: 'Native HTML attributes forwarded to the button element.',
  },
]

export const sidebarItemPropsData: PropItem[] = [
  {
    name: 'icon',
    type: 'ReactNode',
    required: false,
    description: 'Icon displayed on the left or centered when collapsed.',
  },
  {
    name: 'active',
    type: 'boolean',
    required: false,
    description: 'Active navigation state.',
  },
  {
    name: 'className',
    type: 'LithosClass',
    required: false,
    description: 'Additional CSS classes.',
  },
  {
    name: '...props',
    type: 'ButtonProps',
    required: false,
    description: 'Native HTML attributes and ButtonProps forwarded to the underlying button.',
  },
]

export const useSidebarReturnPropsData: PropItem[] = [
  {
    name: 'mode',
    type: "'permanent' | 'mini'",
    required: true,
    description: 'Current layout mode of the sidebar.',
  },
  {
    name: 'role',
    type: "'complementary' | 'region' | 'navigation'",
    required: true,
    description: 'Active ARIA landmark role.',
  },
  {
    name: 'open',
    type: 'boolean',
    required: true,
    description: 'Current expanded/collapsed state.',
  },
  {
    name: 'setOpen',
    type: '(open: boolean) => void',
    required: true,
    description: 'Function to toggle or update the sidebar open state.',
  },
]
