import type { PropItem } from '../../components/ui/PropsTable'

export const inputPropsData: PropItem[] = [
  {
    name: 'size',
    type: '"default" | "sm" | "md" | "lg"',
    defaultValue: '"default"',
    required: false,
    description: 'Controls padding and height. sm=h-8, default=h-10, md=h-11, lg=h-12.',
  },
  {
    name: 'className',
    type: 'ClassValue | ClassArray',
    defaultValue: '""',
    required: false,
    description: 'Additional CSS classes to apply custom styles.',
  },
  {
    name: 'invalid',
    type: 'boolean',
    defaultValue: 'false',
    required: false,
    description: 'Applies the system error color to the border for validation feedback.',
  },
  {
    name: 'ref',
    type: 'Ref<HTMLInputElement>',
    required: false,
    description: 'Ref forwarded to the underlying input element.',
  },
  {
    name: '...props',
    type: 'ComponentPropsWithRef<"input">',
    required: false,
    description:
      'All native input attributes (type, placeholder, value, onChange, disabled, etc.) are forwarded to the element.',
  },
]

export const inputGroupPropsData: PropItem[] = [
  {
    name: 'children',
    type: 'ReactNode',
    required: true,
    description: 'The InputGroupInput and InputGroupAddon elements composing the field.',
  },
  {
    name: 'startAdornment',
    type: 'ReactNode',
    required: false,
    description: 'Icon or element rendered inside the group border on the inline start edge.',
  },
  {
    name: 'endAdornment',
    type: 'ReactNode',
    required: false,
    description: 'Icon or element rendered inside the group border on the inline end edge.',
  },
  {
    name: 'className',
    type: 'ClassValue | ClassArray',
    defaultValue: '""',
    required: false,
    description: 'Additional CSS classes for the frame. Use max-w-* here to constrain the group width.',
  },
  {
    name: 'ref',
    type: 'Ref<HTMLDivElement>',
    required: false,
    description: 'Ref forwarded to the group container.',
  },
]

export const inputGroupInputPropsData: PropItem[] = [
  {
    name: '...props',
    type: 'ComponentPropsWithRef<"input">',
    required: false,
    description:
      'Every prop accepted by the Input primitive (placeholder, type, disabled, invalid, size, etc.) is forwarded.',
  },
]

export const inputGroupAddonPropsData: PropItem[] = [
  {
    name: 'children',
    type: 'ReactNode',
    required: true,
    description: 'Addon content, usually an icon or short helper text.',
  },
  {
    name: 'align',
    type: '"inline-start" | "inline-end"',
    defaultValue: '"inline-start"',
    required: false,
    description: 'Pins the addon to the leading or trailing edge of the group, independent of DOM order.',
  },
  {
    name: 'className',
    type: 'ClassValue | ClassArray',
    defaultValue: '""',
    required: false,
    description: 'Additional CSS classes for the addon segment.',
  },
]
