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
import type { ComponentPropsWithRef, ReactNode } from 'react'
import { colors } from '../../utils/colors'
import { cn } from '../../utils/cn'
import type { ClassArray, ClassValue } from 'clsx'

type InputSizes = 'default' | 'sm' | 'md' | 'lg'

export interface InputProps extends Omit<ComponentPropsWithRef<'input'>, 'className'> {
  className?: ClassValue | ClassArray
  invalid?: boolean
  size?: InputSizes
}

const inputSizeStyles = {
  sm: 'text-xs h-8 px-2 py-1',
  default: 'text-sm h-10 px-3 py-2',
  md: 'text-base h-11 px-3 py-2.5',
  lg: 'text-lg h-12 px-4 py-3',
}

export const Input = ({ className = '', ref, invalid, size = 'default', style, ...props }: InputProps) => {
  const classes = cn(
    'rounded-(--lithos-radius)',
    'font-(--font-mono) font-bold w-full outline-none border-2 border-(--lithos-border) shadow-[2px_2px_0_0_var(--lithos-shadow)] focus:shadow-[4px_4px_0_0_var(--lithos-shadow)] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
    inputSizeStyles[size],
    {
      'transition hover:shadow-[4px_4px_0_0_var(--lithos-shadow)]': !props.disabled,
      'opacity-50 cursor-not-allowed': props.disabled,
    },
    className
  )

  return (
    <input ref={ref} className={classes} {...props} style={invalid ? { borderColor: colors.error, ...style } : style} />
  )
}

/**
 * InputGroup — compound wrapper that owns the brutalist frame.
 */

export interface InputGroupProps extends Omit<ComponentPropsWithRef<'div'>, 'className'> {
  className?: ClassValue | ClassArray
  startAdornment?: ReactNode
  endAdornment?: ReactNode
}

export const InputGroup = ({
  className = '',
  ref,
  children,
  startAdornment,
  endAdornment,
  ...props
}: InputGroupProps) => {
  return (
    <div
      ref={ref}
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
 */

export type InputGroupInputProps = InputProps

export const InputGroupInput = ({ className = '', ...props }: InputGroupInputProps) => {
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

/**
 * InputGroupAddon — pins content to either inline edge regardless of DOM order via flex ordering.
 */

type AddonAlign = 'inline-start' | 'inline-end'

export interface InputGroupAddonProps extends Omit<ComponentPropsWithRef<'div'>, 'className' | 'children'> {
  align?: AddonAlign
  className?: ClassValue | ClassArray
  children: ReactNode
}

const addonAlignClasses = {
  'inline-start': 'order-first border-r-2',
  'inline-end': 'order-last border-l-2',
} as const

export const InputGroupAddon = ({
  align = 'inline-start',
  className = '',
  children,
  ref,
  ...props
}: InputGroupAddonProps) => {
  return (
    <div
      ref={ref}
      className={cn(
        'inline-flex shrink-0 select-none items-center self-stretch border-(--lithos-border) bg-(--lithos-surface) px-3 font-(--font-mono) text-sm font-bold text-(--lithos-text)',
        addonAlignClasses[align],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
