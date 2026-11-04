/**
 * @fileoverview Lithos UI button primitive.
 * - Centralizes `.lithos-click` physics behind a typed `variant` prop so call sites stop hand-rolling className strings.
 * - Text variant overrides `.lithos-click`'s border/shadow to stay flat: text only, no outline, no background fill.
 * - Zero-Gap Rule: `iconLeft`/`iconRight` spacing and `ButtonGroup` layout use explicit margins, never CSS `gap`.
 * - Native `type="button"` default prevents accidental form submission; opt into `type="submit"` explicitly.
 */
import type { ReactNode } from 'react'
import type { LithosElementProps } from '../../core/types'
import { cn } from '../../utils/cn'
import { getContrastText } from '../../utils/yiq'

/**
 * Visual styling variant for the button component.
 */
export type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'text' | 'solid' | 'inverse'

/**
 * Props for the `Button` component.
 */
export interface ButtonProps extends Omit<LithosElementProps<'button'>, 'type'> {
  /**
   * Visual variant determining the color palette and interaction style.
   * @default 'primary'
   */
  variant?: ButtonVariant

  /**
   * Custom background color override (primarily used with the 'solid' variant).
   */
  color?: string | undefined

  /**
   * Expands the button width to 100% of its container.
   * @default false
   */
  fullWidth?: boolean

  /**
   * HTML button type attribute.
   * @default 'button'
   */
  type?: 'button' | 'submit' | 'reset' | undefined

  /**
   * Optional icon node rendered before the button text.
   */
  iconLeft?: ReactNode

  /**
   * Optional icon node rendered after the button text.
   */
  iconRight?: ReactNode
}

const variantClass: Record<ButtonVariant, string> = {
  primary: 'bg-(--lithos-accent) text-(--lithos-accent-text)',
  secondary: 'bg-(--lithos-surface) text-(--lithos-text)',
  accent: 'bg-(--lithos-surface) text-(--lithos-text) hover:bg-(--lithos-accent) hover:text-(--lithos-accent-text)',
  text: 'bg-transparent text-(--lithos-text) border-transparent shadow-none hover:shadow-none hover:bg-(--lithos-surface-hover)',
  solid: '',
  inverse: 'bg-(--lithos-text) text-(--lithos-bg) border-(--lithos-bg)',
}

/**
 * Interactive button component featuring neo-brutalist click physics,
 * semantic variants, optional icon slots, and disabled states.
 *
 * @param props - Button configuration props including variant, type, icons, and event handlers. - {@link ButtonProps}
 * @returns Interactive button element.
 */
export const Button = ({
  variant = 'primary',
  color,
  fullWidth = false,
  type = 'button',
  iconLeft,
  iconRight,
  className,
  children,
  style,
  ...rest
}: ButtonProps) => {
  const classes = [
    'lithos-click rounded-(--lithos-radius) disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
    variantClass[variant],
    fullWidth && 'w-full',
    className,
  ]

  const isSolid = variant === 'solid'
  const solidColor = color || '#00FF00'
  const solidStyle = isSolid ? { backgroundColor: solidColor, color: getContrastText(solidColor) } : {}

  return (
    <button type={type} className={cn(classes)} style={{ ...solidStyle, ...style }} {...rest}>
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

/**
 * Props for the `ButtonGroup` container component.
 */
export interface ButtonGroupProps extends LithosElementProps<'div'> {
  /**
   * Layout orientation mode for grouped buttons.
   * @default 'horizontal'
   */
  mode?: 'horizontal' | 'vertical'

  /**
   * Fuses adjacent buttons together into a single attached strip with overlapping borders.
   * @default false
   */
  attached?: boolean
}

/**
 * ButtonGroup lays out `Button` primitives side by side (`horizontal`) or stacked (`vertical`).
 * `attached` fuses adjacent buttons into a single hard-bordered strip by collapsing the shared
 * border and popping the hovered/focused item's shadow above its neighbors via `z-10`.
 *
 * @param props - Group configuration props including layout mode, attached style, and children. - {@link ButtonGroupProps}
 * @returns Button group container element.
 */
export const ButtonGroup = ({
  mode = 'horizontal',
  attached = false,
  className,
  children,
  ...rest
}: ButtonGroupProps) => {
  const isVertical = mode === 'vertical'

  const classes = [
    'inline-flex flex-row',
    isVertical && 'flex-col',
    attached
      ? isVertical
        ? '[&>*:not(:first-child)]:-mt-0.5'
        : '[&>*:not(:first-child)]:-ml-0.5'
      : isVertical
        ? 'space-y-2'
        : 'space-x-2',
    className,
  ]

  return (
    <div role="group" className={cn(classes)} {...rest}>
      {children}
    </div>
  )
}
