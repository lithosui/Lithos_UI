import type { PropItem } from '../../components/ui/PropsTable'

export const tooltipPropsData: PropItem[] = [
  {
    name: '...props',
    type: "Omit<PopoverOptions, 'modal'>",
    description:
      'Accepts all Popover configuration options (e.g., placement, offset, open, onOpenChange, hover, delay, etc.), excluding modal mode.',
  },
]

export const tooltipTriggerPropsData: PropItem[] = [
  {
    name: '...props',
    type: 'PopoverTriggerProps',
    description:
      'Accepts all PopoverTrigger props (including asChild, className, and all HTML attributes/event handlers).',
  },
]

export const tooltipContentPropsData: PropItem[] = [
  {
    name: 'variant',
    type: 'TooltipVariant',
    typeDefinition: "type TooltipVariant = 'default' | 'primary' | 'inverse'",
    defaultValue: '"default"',
    description: 'The visual style variant of the tooltip surface.',
  },
  {
    name: '...props',
    type: 'PopoverContentProps',
    description:
      'Accepts all remaining PopoverContent props (such as portaled, className, transitionDuration, and HTML attributes).',
  },
]

export const useTooltipPropsData: PropItem[] = [
  {
    name: 'open',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Indicates whether the tooltip overlay is currently open.',
  },
  {
    name: 'setOpen',
    type: '(open: boolean) => void',
    defaultValue: '(open) => void',
    description: 'State dispatch handler passed directly from Popover context to toggle visibility.',
  },
  {
    name: 'arrowRef',
    type: 'RefObject<SVGSVGElement | null>',
    defaultValue: '{ current: null }',
    description: 'Mutable ref object bound to the FloatingArrow element rendered inside TooltipContent.',
  },
]
