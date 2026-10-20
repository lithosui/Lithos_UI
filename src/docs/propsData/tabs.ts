import type { PropItem } from '../../components/ui/PropsTable'

export const tabsPropsData: PropItem[] = [
  {
    name: 'defaultValue',
    type: 'string',
    required: false,
    description:
      'The value of the tab that should be active when initially rendered. Use when you do not need to control the state of the tabs.',
  },
  {
    name: 'value',
    type: 'string',
    required: false,
    description: 'The controlled value of the tab to activate. Should be used in conjunction with onValueChange.',
  },
  {
    name: 'onValueChange',
    type: '(value: string) => void',
    required: false,
    description: 'Event handler called when the value changes.',
  },
  {
    name: 'variant',
    type: '"default" | "underline" | "vertical"',
    defaultValue: '"default"',
    required: false,
    description: 'The visual variant of the tabs component.',
  },
  {
    name: 'children',
    type: 'ReactNode',
    required: true,
    description: 'The content of the Tabs, typically TabsList and TabsContent.',
  },
  {
    name: 'className',
    type: 'LithosClass',
    required: false,
    description: 'Additional CSS classes.',
  },
]

export const tabsTriggerPropsData: PropItem[] = [
  {
    name: 'value',
    type: 'string',
    required: true,
    description: 'A unique value that associates the trigger with a content.',
  },
  {
    name: 'children',
    type: 'ReactNode',
    required: true,
    description: 'The text or content to display inside the trigger.',
  },
  {
    name: 'className',
    type: 'LithosClass',
    required: false,
    description: 'Additional CSS classes.',
  },
]

export const tabsContentPropsData: PropItem[] = [
  {
    name: 'value',
    type: 'string',
    required: true,
    description: 'A unique value that associates the content with a trigger.',
  },
  {
    name: 'children',
    type: 'ReactNode',
    required: true,
    description: 'The content to display when the associated tab is active.',
  },
  {
    name: 'className',
    type: 'LithosClass',
    required: false,
    description: 'Additional CSS classes.',
  },
]
