import type { PropItem } from '../../components/ui/PropsTable'

export const selectProps: PropItem[] = [
  {
    name: 'options',
    type: 'SelectOption[]',
    required: false,
    description: 'Array of option objects for auto-rendering the dropdown list.',
  },
  {
    name: 'multiple',
    type: 'boolean',
    defaultValue: 'false',
    required: false,
    description: 'Allows selecting multiple options instead of a single value.',
  },
  {
    name: 'value',
    type: 'string | string[]',
    required: false,
    description: 'Controlled value of the selected option or options.',
  },
  {
    name: 'defaultValue',
    type: 'string | string[]',
    required: false,
    description: 'Initial value or values for uncontrolled usage.',
  },
  {
    name: 'onChange',
    type: 'SelectOnChangeEvent<string | string[]>',
    required: false,
    description: 'Callback fired when an option is selected.',
  },
  {
    name: 'placeholder',
    type: 'string',
    defaultValue: '"Select an option..."',
    required: false,
    description: 'Placeholder text displayed when no option is selected.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: 'false',
    required: false,
    description: 'Disables all user interactions with the select component.',
  },
  {
    name: 'className',
    type: 'LithosClass',
    required: false,
    description: 'Custom CSS classes passed to the select trigger wrapper.',
  },
  {
    name: 'children',
    type: 'ReactNode',
    required: false,
    description: 'Custom composition layout instead of using the default option list.',
  },
]

export const selectTriggerProps: PropItem[] = [
  {
    name: 'open',
    type: 'boolean',
    required: false,
    description: 'Controls or overrides the trigger visual state.',
  },
]

export const selectContentProps: PropItem[] = [
  {
    name: 'children',
    type: 'ReactNode',
    required: true,
    description: 'Collection of SelectItem elements or custom option content.',
  },
  {
    name: 'className',
    type: 'LithosClass',
    required: false,
    description: 'Custom CSS classes applied to the popover content container.',
  },
  {
    name: 'listLabel',
    type: 'string',
    required: false,
    defaultValue: '"Options"',
    description: 'Accessible ARIA label for the listbox element used by screen readers.',
  },
  {
    name: 'loop',
    type: 'boolean',
    required: false,
    defaultValue: 'true',
    description: 'Enables looping keyboard navigation when reaching the start or end of the list.',
  },
  {
    name: 'focusOnHover',
    type: 'boolean',
    required: false,
    defaultValue: 'true',
    description: 'Updates the active index automatically when hovering over options with the pointer.',
  },
]

export const selectItemProps: PropItem[] = [
  {
    name: 'value',
    type: 'string',
    required: true,
    description: 'Unique value associated with this option.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    required: false,
    description: 'Disables selection and interactions for this specific option.',
  },
  {
    name: 'index',
    type: 'number',
    required: false,
    description: 'Explicit index of the item used for keyboard navigation within the list.',
  },
  {
    name: 'className',
    type: 'LithosClass',
    required: false,
    description: 'Custom CSS classes passed to the option button element.',
  },
  {
    name: 'children',
    type: 'ReactNode',
    required: true,
    description: 'Label content or custom layout rendered inside the option item.',
  },
]

export const useSelectProps: PropItem[] = [
  {
    name: 'multiple',
    type: 'boolean',
    required: true,
    description: 'Indicates whether the select context allows multiple selection.',
  },
  {
    name: 'selectedValue',
    type: 'string | string[]',
    required: true,
    description: 'Current selected value or array of values managed by context.',
  },
  {
    name: 'handleSelect',
    type: '(value: string, e: MouseEvent | KeyboardEvent) => void',
    required: true,
    description: 'Function to execute selection changes and trigger callbacks.',
  },
  {
    name: 'open',
    type: 'boolean',
    required: true,
    description: 'Current visibility state of the select dropdown menu.',
  },
  {
    name: 'setOpen',
    type: '(open: boolean) => void',
    required: true,
    description: 'State dispatch function to open or close the dropdown menu.',
  },
  {
    name: 'activeIndex',
    type: 'number | null',
    required: true,
    description: 'Index of the currently focused item via keyboard navigation.',
  },
  {
    name: 'setActiveIndex',
    type: '(index: number | null) => void',
    required: true,
    description: 'State dispatch function to update active index on navigation.',
  },
  {
    name: 'elementsRef',
    type: 'RefObject<Array<HTMLElement | null>>',
    required: true,
    description: 'Ref array tracking option DOM nodes for Floating UI navigation.',
  },
]
