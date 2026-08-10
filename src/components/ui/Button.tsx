/**
 * @fileoverview Lithos UI button primitive.
 * - Centralizes `.lithos-click` physics behind typed `intent` variants so call sites stop hand-rolling className strings.
 * - Text intent overrides `.lithos-click`'s border/shadow to stay flat: text only, no outline, no background fill.
 * - Zero-Gap Rule: `iconLeft`/`iconRight` spacing and `ButtonGroup` layout use explicit margins, never CSS `gap`.
 * - Native `type="button"` default prevents accidental form submission; opt into `type="submit"` explicitly.
 */
import { forwardRef } from 'react'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import type { ButtonIntent } from '../../core/types'
import { cn } from '../../utils/cn'
import type { ClassArray, ClassValue } from 'clsx'

export interface ButtonProps extends Omit<ComponentPropsWithoutRef<'button'>, 'type' | 'className'> {
  intent?: ButtonIntent | undefined
  fullWidth?: boolean | undefined
  type?: 'button' | 'submit' | 'reset' | undefined
  iconLeft?: ReactNode
  iconRight?: ReactNode
  children: ReactNode
  className?: ClassValue | ClassArray
}

const intentClass: Record<ButtonIntent, string> = {
  primary: 'bg-(--lithos-accent) text-(--lithos-accent-text)',
  secondary: 'bg-(--lithos-surface) text-(--lithos-text)',
  text: 'bg-transparent text-(--lithos-text) cursor-pointer !border-transparent !shadow-none hover:!shadow-none',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { intent = 'primary', fullWidth = false, type = 'button', iconLeft, iconRight, className, children, ...rest },
    ref
  ) => {
    const classes = [
      'lithos-click',
      intentClass[intent],
      fullWidth && 'w-full',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
      className,
    ]

    return (
      <button ref={ref} type={type} className={cn(classes)} {...rest}>
        {iconLeft && (
          <span className="inline-flex shrink-0 mr-2" aria-hidden="true">
            {iconLeft}
          </span>
        )}
        {children}
        {iconRight && (
          <span className="inline-flex shrink-0 ml-2" aria-hidden="true">
            {iconRight}
          </span>
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'

/**
 * ButtonGroup lays out `Button` primitives side by side (`horizontal`) or stacked (`vertical`).
 * `attached` fuses adjacent buttons into a single hard-bordered strip by collapsing the shared
 * border and popping the hovered/focused item's shadow above its neighbors via `z-10`.
 */
export interface ButtonGroupProps extends Omit<ComponentPropsWithoutRef<'div'>, 'className'> {
  orientation?: 'horizontal' | 'vertical' | undefined
  attached?: boolean | undefined
  className?: ClassValue | ClassArray
}

export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ orientation = 'horizontal', attached = false, className, children, ...rest }, ref) => {
    const isVertical = orientation === 'vertical'

    const classes = [
      'inline-flex',
      isVertical ? 'flex-col' : 'flex-row',
      attached
        ? [
            '[&>*]:relative [&>*:hover]:z-10 [&>*:focus-visible]:z-10',
            isVertical ? '[&>*:not(:first-child)]:-mt-0.5' : '[&>*:not(:first-child)]:-ml-0.5',
          ]
        : isVertical
          ? '[&>*:not(:first-child)]:mt-2'
          : '[&>*:not(:first-child)]:ml-2',
      className,
    ]

    return (
      <div ref={ref} role="group" className={cn(classes)} {...rest}>
        {children}
      </div>
    )
  }
)

ButtonGroup.displayName = 'ButtonGroup'
