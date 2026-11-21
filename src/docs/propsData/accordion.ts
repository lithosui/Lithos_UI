import type { PropItem } from '../../components/ui/PropsTable'

export const accordionPropsData: PropItem[] = [
  {
    name: 'title',
    type: 'ReactNode',
    required: true,
    description: 'Header content rendered in the accordion trigger button.',
  },
  {
    name: 'defaultOpen',
    type: 'boolean',
    defaultValue: 'false',
    required: false,
    description: 'Initial open state when used in uncontrolled mode.',
  },
  {
    name: 'open',
    type: 'boolean',
    required: false,
    description: 'Controlled open state of the accordion.',
  },
  {
    name: 'value',
    type: 'string',
    required: false,
    description: 'Unique identifier when used inside an AccordionGroup.',
  },
  {
    name: 'classes',
    type: 'AccordionClasses',
    typeDefinition: `interface AccordionClasses {
  container?: LithosClass
  header?: LithosClass
  content?: LithosClass
}`,
    required: false,
    description: 'Custom class overrides for container, header, and content elements.',
  },
  {
    name: 'children',
    type: 'ReactNode',
    required: false,
    description: 'Content rendered inside the expandable section.',
  },
  {
    name: 'className',
    type: 'LithosClass',
    required: false,
    description: 'Additional CSS classes applied to the root container.',
  },
]

export const accordionGroupPropsData: PropItem[] = [
  {
    name: 'allowMultiple',
    type: 'boolean',
    defaultValue: 'false',
    required: false,
    description: 'Allows multiple accordion items to be open simultaneously.',
  },
  {
    name: 'defaultActive',
    type: 'string | string[]',
    required: false,
    description: 'The value(s) of the accordion item(s) to open by default.',
  },
  {
    name: 'children',
    type: 'ReactNode',
    required: false,
    description: 'The Accordion items to group.',
  },
  {
    name: 'className',
    type: 'LithosClass',
    required: false,
    description: 'Additional CSS classes applied to the group container.',
  },
]
