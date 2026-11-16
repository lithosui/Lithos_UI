/**
 * @fileoverview Lithos UI input primitive.
 * - Wraps the native input element with brutalist hard-shadow geometry (2px border, 0-blur shadow that grows on hover/focus).
 * - `size` controls padding and height: 'sm' (h-8), 'default' (h-10), 'md' (h-11), 'lg' (h-12).
 * - `invalid` routes validation feedback through the shared error color; consumer inline styles always win except for the forced border.
 * - Disabled state drops hover physics, dims via opacity, and shows cursor-not-allowed; number spinners are stripped for cross-browser consistency.
 * - InputGroup, InputGroupInput, InputGroupAddon, and icon adornments are consolidated here for one-file consumption.
 * - InputGroup compound: group owns the frame, InputGroupInput renders the bare field, InputGroupAddon pins content to either edge via flex ordering.
 * - startAdornment / endAdornment on InputGroup render icon slots positioned inside the group border; InputGroupInput receives auto-padding.
 * - Zero-Gap Rule: edge alignment relies on flex order utilities and padding, never CSS gap.
 */
import type { ReactNode } from 'react'
import { colors } from '../../utils/colors'
import { cn } from '../../utils/cn'
import type { LithosElementProps } from '../../core/types'

/**
 * Standard sizing scales supported by input components.
 */
export type InputSizes = 'default' | 'sm' | 'md' | 'lg'

/**
 * Props configuration interface for the root `Input` component.
 */
export interface InputProps extends Omit<LithosElementProps<'input'>, 'size'> {
  /** Triggers invalid error state formatting and applies the shared error intent border color. */
  invalid?: boolean

  /** Height and padding size scale variant. */
  size?: InputSizes
}

/**
 * Props configuration interface for the `InputGroup` compound wrapper.
 */
export interface InputGroupProps extends LithosElementProps<'div'> {
  /** Optional leading adornment element or icon pinned to the start edge. */
  startAdornment?: ReactNode

  /** Optional trailing adornment element or icon pinned to the end edge. */
  endAdornment?: ReactNode
}

/**
 * Props configuration interface for the `InputGroupInput` bare field component.
 */
export type InputGroupInputProps = InputProps

/**
 * Alignment directions supported by input group add-on elements.
 */
export type InputAddonAlign = 'inline-start' | 'inline-end'

/**
 * Props configuration interface for the `InputGroupAddon` component.
 */
export interface InputGroupAddonProps extends LithosElementProps<'div'> {
  /** Flex placement alignment orientation edge for the add-on. */
  align?: InputAddonAlign
}

const inputSizeStyles = {
  sm: 'text-xs h-8 px-2 py-1',
  default: 'text-sm h-10 px-3 py-2',
  md: 'text-base h-11 px-3 py-2.5',
  lg: 'text-lg h-12 px-4 py-3',
}

/**
 * Root input primitive component featuring brutalist hard-shadow geometry and size scaling.
 *
 * @param props - Input field properties including sizes, invalid states, and native HTML attributes. - {@link InputProps}
 * @returns Native input element.
 */
export const Input = ({ className, invalid, size = 'default', style, ...props }: InputProps) => {
  const classes = cn(
    'rounded-(--lithos-radius)',
    'font-mono font-bold w-full outline-none border-2 border-(--lithos-border) shadow-[2px_2px_0_0_var(--lithos-shadow)] focus:shadow-[4px_4px_0_0_var(--lithos-shadow)] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
    inputSizeStyles[size],
    {
      'transition hover:shadow-[4px_4px_0_0_var(--lithos-shadow)]': !props.disabled,
      'opacity-50 cursor-not-allowed': props.disabled,
    },
    className
  )

  return <input className={classes} {...props} style={invalid ? { borderColor: colors.error, ...style } : style} />
}

/**
 * InputGroup — compound wrapper that owns the brutalist frame.
 *
 * @param props - Input group container properties including start/end adornments and custom classes. - {@link InputGroupProps}
 * @returns Group container element.
 */
export const InputGroup = ({ className, children, startAdornment, endAdornment, ...props }: InputGroupProps) => {
  return (
    <div
      role="group"
      className={cn(
        'relative flex w-full items-stretch overflow-hidden rounded-(--lithos-radius) border-2 border-(--lithos-border) bg-(--lithos-surface) shadow-[2px_2px_0_0_var(--lithos-shadow)] transition focus-within:shadow-[4px_4px_0_0_var(--lithos-shadow)]',
        className
      )}
      {...props}
    >
      {startAdornment && (
        <span className="inline-flex shrink-0 items-center self-stretch border-r-2 border-(--lithos-border) bg-(--lithos-surface) px-3 text-(--lithos-text)">
          {startAdornment}
        </span>
      )}
      {children}
      {endAdornment && (
        <span className="inline-flex shrink-0 items-center self-stretch border-l-2 border-(--lithos-border) bg-(--lithos-surface) px-3 text-(--lithos-text)">
          {endAdornment}
        </span>
      )}
    </div>
  )
}

/**
 * InputGroupInput — bare field stripped of standalone frame; sized to fill the group.
 *
 * @param props - Input group field properties. - {@link InputGroupInputProps}
 * @returns Bare input element filling the container group.
 */
export const InputGroupInput = ({ className, ...props }: InputGroupInputProps) => {
  return (
    <Input
      className={cn(
        'h-full min-w-0 flex-1 rounded-none border-0 bg-transparent shadow-none hover:shadow-none focus:shadow-none',
        className
      )}
      {...props}
    />
  )
}

const addonAlignClasses = {
  'inline-start': 'order-first border-r-2',
  'inline-end': 'order-last border-l-2',
} as const

/**
 * InputGroupAddon — pins content to either inline edge regardless of DOM order via flex ordering.
 *
 * @param props - Add-on properties including alignment options and custom classes. - {@link InputGroupAddonProps}
 * @returns Add-on container element.
 */
export const InputGroupAddon = ({ align = 'inline-start', className, children, ...props }: InputGroupAddonProps) => {
  return (
    <div
      className={cn(
        'inline-flex shrink-0 select-none items-center self-stretch border-(--lithos-border) bg-(--lithos-surface) px-3 font-mono text-sm font-bold text-(--lithos-text)',
        addonAlignClasses[align],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
