import type { PropItem } from '../../components/ui/PropsTable'

export const dialogPropsData: PropItem[] = [
  {
    name: 'open',
    type: 'boolean',
    required: true,
    description: 'Controls whether the overlay is mounted and visible. Dialog renders nothing when false.',
  },
  {
    name: 'onClose',
    type: '() => void',
    required: true,
    description: 'Called on Escape, backdrop click, and the header close button.',
  },
  {
    name: 'variant',
    type: "'default' | 'simple' | 'bare'",
    defaultValue: "'default'",
    required: false,
    description:
      "Visual style. 'default' is bordered with the hard offset shadow. 'simple' keeps the border and --lithos-radius but drops the shadow. 'bare' strips all chrome for fully custom content.",
  },
  {
    name: 'intent',
    type: "'default' | 'success' | 'error' | 'warning' | 'info'",
    defaultValue: "'default'",
    required: false,
    description:
      "Semantic status color for the panel border/shadow. 'error' also switches the ARIA role to alertdialog.",
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg' | 'xl'",
    defaultValue: "'md'",
    required: false,
    description: 'Panel max-width, MUI Dialog maxWidth-style scale.',
  },
  {
    name: 'scrollable',
    type: 'boolean',
    defaultValue: 'false',
    required: false,
    description:
      'Enables border dividers on DialogHeader and DialogFooter to visually separate scrollable content in DialogBody.',
  },
  {
    name: 'initialFocusRef',
    type: 'RefObject<HTMLElement | null>',
    required: false,
    description:
      'Element to focus on open instead of the first focusable child (e.g. a "Cancel" button in a destructive dialog).',
  },
  {
    name: 'children',
    type: 'ReactNode',
    required: true,
    description: 'Typically DialogHeader, DialogBody, and DialogFooter composed together.',
  },
]

export const dialogHeaderPropsData: PropItem[] = [
  {
    name: 'children',
    type: 'ReactNode',
    required: true,
    description: 'Typically a DialogTitle. The close button is appended automatically unless hideClose is set.',
  },
  {
    name: 'icon',
    type: 'ReactNode',
    required: false,
    description: 'Optional leading icon rendered to the left of the title.',
  },
  {
    name: 'hideClose',
    type: 'boolean',
    defaultValue: 'false',
    required: false,
    description: 'Hides the close (X) button. Escape and backdrop click still close the dialog either way.',
  },
  {
    name: 'className',
    type: 'string',
    required: false,
    description: 'Additional CSS classes.',
  },
]

export const dialogTitlePropsData: PropItem[] = [
  {
    name: 'children',
    type: 'ReactNode',
    required: true,
    description: 'Renders as an h2 wired to the panel via aria-labelledby automatically.',
  },
  {
    name: 'className',
    type: 'string',
    required: false,
    description: 'Additional CSS classes.',
  },
]

export const dialogBodyPropsData: PropItem[] = [
  {
    name: 'children',
    type: 'ReactNode',
    required: true,
    description: 'The only scrollable region of the panel — DialogHeader and DialogFooter stay fixed above/below it.',
  },
  {
    name: 'className',
    type: 'string',
    required: false,
    description: 'Additional CSS classes.',
  },
]

export const dialogFooterPropsData: PropItem[] = [
  {
    name: 'children',
    type: 'ReactNode',
    required: true,
    description:
      'Typically action Buttons, right-aligned. Stays fixed at the bottom of the panel when DialogBody scrolls.',
  },
  {
    name: 'className',
    type: 'string',
    required: false,
    description: 'Additional CSS classes.',
  },
]

export const customDialogPropsData: PropItem[] = [
  {
    name: 'open',
    type: 'boolean',
    required: true,
    description: 'Controls whether the dialog is mounted and visible.',
  },
  {
    name: 'onClose',
    type: '() => void',
    required: true,
    description: 'Called on Escape, backdrop click, the header close button, and the Cancel button.',
  },
  {
    name: 'onAction',
    type: '() => void',
    required: true,
    description:
      'Called when the action button is clicked. Does not also call onClose — call it yourself if the action should close the dialog.',
  },
  {
    name: 'title',
    type: 'string',
    required: true,
    description: 'Dialog heading.',
  },
  {
    name: 'message',
    type: 'ReactNode',
    required: true,
    description: 'Body content. Strings are wrapped in a styled paragraph automatically.',
  },
  {
    name: 'actionLabel',
    type: 'string',
    defaultValue: "'Confirm'",
    required: false,
    description: 'Label for the action button.',
  },
  {
    name: 'cancelLabel',
    type: 'string',
    defaultValue: "'Cancel'",
    required: false,
    description: 'Label for the cancel action button.',
  },
  {
    name: 'buttonVariant',
    type: 'ButtonVariant',
    defaultValue: "'primary'",
    required: false,
    description: 'Variant of the action button.',
  },
  {
    name: 'buttonColor',
    type: 'string',
    required: false,
    description: 'Custom color for the action button.',
  },
  {
    name: 'offsetColor',
    type: 'string',
    required: false,
    description: 'Custom color for the offset box-shadow of the dialog.',
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg' | 'xl'",
    defaultValue: "'md'",
    required: false,
    description: 'Panel max-width, matching the underlying Dialog scale.',
  },
  {
    name: 'scrollable',
    type: 'boolean',
    defaultValue: 'false',
    required: false,
    description: 'Enables border dividers on the header and footer to visually separate scrollable content.',
  },
  {
    name: 'icon',
    type: 'ReactNode',
    required: false,
    description: 'Optional icon rendered next to the title.',
  },
]
