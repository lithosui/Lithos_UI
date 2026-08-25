export const popoverPropsData = [
  {
    name: 'initialOpen',
    type: 'boolean',
    default: 'false',
    description: 'The initial open state of the popover in uncontrolled mode.',
  },
  {
    name: 'placement',
    type: 'Placement',
    default: '"bottom-start"',
    description:
      'The preferred placement of the popover relative to the trigger. (e.g., top, bottom, left-end, right-start)',
  },
  {
    name: 'modal',
    type: 'boolean',
    default: 'false',
    description: 'Whether the popover acts as a modal, trapping focus inside and preventing outside interaction.',
  },
  {
    name: 'open',
    type: 'boolean',
    default: 'undefined',
    description: 'The controlled open state of the popover. Must be used with onOpenChange.',
  },
  {
    name: 'onOpenChange',
    type: '(open: boolean) => void',
    default: 'undefined',
    description: 'Event handler called when the open state changes.',
  },
]

export const popoverTriggerPropsData = [
  {
    name: 'asChild',
    type: 'boolean',
    default: 'false',
    description: 'If true, merges its props and refs onto its child element instead of rendering a wrapper <button>.',
  },
]

export const popoverContentPropsData = [
  {
    name: 'className',
    type: 'string',
    default: 'undefined',
    description: 'Additional CSS classes to apply to the content container.',
  },
]

export const popoverClosePropsData = [
  {
    name: 'onClick',
    type: 'function',
    default: 'undefined',
    description: 'Optional click handler executed before closing the popover.',
  },
]
