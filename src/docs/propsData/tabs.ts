import type { PropItem } from '../../components/ui/PropsTable'

export const tabsPropsData: PropItem[] = [
  {
    name: 'defaultValue',
    type: 'string',
    required: false,
    description: 'The default value of the tab to select. Use when uncontrolled.',
  },
  {
    name: 'variant',
    type: "'outlined' | 'filled' | 'text'",
    defaultValue: "'outlined'",
    required: false,
    description: 'The visual style variant of the tabs.',
  },
  {
    name: 'intent',
    type: "'default' | 'success' | 'error' | 'warning' | 'info' | 'accent'",
    defaultValue: "'accent'",
    required: false,
    description: 'The semantic color intent of the tabs, affecting the active state of filled and text variants.',
  },
  {
    name: 'value',
    type: 'string',
    required: false,
    description: 'The controlled value of the active tab.',
  },
  {
    name: 'onValueChange',
    type: '(value: string) => void',
    required: false,
    description: 'Event handler called when the value changes.',
  },
  {
    name: 'className',
    type: 'string',
    required: false,
    description: 'Additional CSS classes applied to the root container.',
  },
  {
    name: 'children',
    type: 'ReactNode',
    required: false,
    description: 'The tabs list and content items.',
  },
]
