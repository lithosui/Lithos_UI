import type { PropItem } from '../../components/ui/PropsTable'

export const selectProps: PropItem[] = [
  {
    name: 'options',
    type: 'SelectOption[]',
    required: false,
    description: 'Array of option objects for auto-rendering the dropdown list.',
  },
  {
    name: 'placeholder',
    type: 'string',
    defaultValue: '"Select an option..."',
    required: false,
    description: 'Placeholder text displayed when no option is selected.',
  },
  {
    name: 'label',
    type: 'string',
    required: false,
    description: 'Accessible label assigned to the select trigger.',
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
    description: 'Controlled value or array of values for the selected option(s).',
  },
  {
    name: 'defaultValue',
    type: 'string | string[]',
    required: false,
    description: 'Initial value or values for uncontrolled usage.',
  },
  {
    name: 'onChange',
    type: 'SelectOnChangeEvent',
    required: false,
    description: 'Callback fired when an option selection changes.',
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
  {
    name: 'label',
    type: 'string',
    required: false,
    description: 'Accessible text label for the trigger element.',
  },
  {
    name: 'placeholder',
    type: 'string',
    required: false,
    description: 'Fallback text displayed when no selection is present.',
  },
]

export const selectContentProps: PropItem[] = [
  {
    name: 'children',
    type: 'ReactNode',
    required: false,
    description: 'Collection of SelectItem elements or custom option content.',
  },
  {
    name: 'loop',
    type: 'boolean',
    defaultValue: 'true',
    required: false,
    description: 'Enables looping keyboard navigation when reaching the start or end of the list.',
  },
  {
    name: 'virtualizeThreshold',
    type: 'number | boolean',
    defaultValue: '30',
    required: false,
    description: 'Minimum item count to trigger virtualization, or boolean to toggle it.',
  },
  {
    name: 'estimateSize',
    type: 'number',
    defaultValue: '32',
    required: false,
    description: 'Estimated height in pixels for each item in the virtualized list.',
  },
  {
    name: 'overscan',
    type: 'number',
    defaultValue: '15',
    required: false,
    description: 'Number of additional items to render above and below the visible viewport.',
  },
  {
    name: 'className',
    type: 'LithosClass',
    required: false,
    description: 'Custom CSS classes applied to the popover content container.',
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
    name: 'children',
    type: 'ReactNode',
    required: true,
    description: 'Label content or custom layout rendered inside the option item.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: 'false',
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
    description: 'Custom CSS classes passed to the option list element.',
  },
]

export const useSelectProps: PropItem[] = [
  {
    name: 'selectedValue',
    type: 'string | string[]',
    required: true,
    description: 'Current selected value or array of values managed by context.',
  },
  {
    name: 'handleSelect',
    type: 'HandleSelectType',
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
  {
    name: 'labelsRef',
    type: 'RefObject<string[]>',
    required: true,
    description: 'Ref array tracking text labels of options for typeahead navigation.',
  },
  {
    name: 'selectedIndex',
    type: 'number | null',
    required: true,
    description: 'Index of the currently selected option item.',
  },
  {
    name: 'setSelectedIndex',
    type: '(index: number | null) => void',
    required: true,
    description: 'State dispatch function to update the selected item index.',
  },
  {
    name: 'registerElement',
    type: 'RegisterElementProps',
    required: true,
    description: 'Callback function to register option DOM nodes into the refs array.',
  },
  {
    name: 'multiple',
    type: 'boolean',
    defaultValue: 'false',
    required: false,
    description: 'Indicates whether the select context allows multiple selection.',
  },
  {
    name: 'options',
    type: 'SelectOption[]',
    required: false,
    description: 'List of options passed down through the select context.',
  },
]
