import type { PropItem } from '../../components/ui/PropsTable'

export const dropdownPropsData: PropItem[] = [
  {
    name: 'placement',
    type: 'DropdownPlacement',
    typeDefinition: "type DropdownPlacement = 'bottom-start' | 'bottom-end'",
    defaultValue: '"bottom-end"',
    description: 'Placement edge where the dropdown is anchored.',
  },
  {
    name: '...props',
    type: 'PopoverProps',
    definitionPath: 'popover',
    description: 'Same props as Popover.',
  },
]

export const dropdownTriggerPropsData: PropItem[] = [
  {
    name: '...props',
    type: 'PopoverTriggerProps',
    definitionPath: { path: 'popover', label: 'PopoverTrigger' },
    description: 'Same props as PopoverTrigger.',
  },
]

export const dropdownContentPropsData: PropItem[] = [
  {
    name: 'loop',
    type: 'boolean',
    defaultValue: 'true',
    description: 'Enables loop navigation through items when reaching the start or end of the menu.',
  },
  {
    name: 'onCloseSubmenu',
    type: '() => void',
    defaultValue: '() => {}',
    description: 'Callback function triggered when closing a nested submenu.',
  },
  {
    name: '...props',
    type: 'PopoverContentProps',
    definitionPath: { path: 'popover', label: 'PopoverContent' },
    description: 'Same props as PopoverContent.',
  },
]

export const dropdownItemPropsData: PropItem[] = [
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Prevents interactions and applies disabled styling.',
  },
  {
    name: '...props',
    type: 'ComponentPropsWithRef<"button">',
    description: 'Props passed to the HTML button element.',
  },
]

export const dropdownSubPropsData: PropItem[] = [
  {
    name: 'trigger',
    type: 'ReactNode',
    required: true,
    description: 'The label or interactive trigger content for the submenu.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Disables interaction on the submenu trigger item.',
  },
  {
    name: '...props',
    type: 'PopoverProps',
    definitionPath: 'popover',
    description: 'Same props as Popover.',
  },
]

export const dropdownGroupPropsData: PropItem[] = [
  {
    name: 'label',
    type: 'string',
    description: 'Optional group header text used for visual categorization.',
  },
  {
    name: '...props',
    type: 'ComponentPropsWithRef<"div">',
    description: 'Props passed to the HTML div element.',
  },
]

export const dropdownSeparatorPropsData: PropItem[] = [
  {
    name: '...props',
    type: 'ComponentPropsWithRef<"div">',
    description: 'Props passed to the HTML div element.',
  },
]

export const useDropdownPropsData: PropItem[] = [
  {
    name: 'open',
    type: 'boolean',
    description: 'Current open state of the dropdown menu.',
  },
  {
    name: 'toggle',
    type: '() => void',
    description: 'Function to toggle the open state between true and false.',
  },
  {
    name: 'close',
    type: '() => void',
    description: 'Function to close the dropdown menu.',
  },
  {
    name: 'triggerRef',
    type: 'RefObject<ReferenceType | null>',
    description: 'Ref pointing to the reference element.',
  },
]
