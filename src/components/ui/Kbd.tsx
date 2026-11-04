/**
 * @fileoverview Lithos UI keyboard key primitive.
 * - Semantic <kbd> tag rendering user keyboard triggers, keycaps, and shortcut combinations.
 * - Neo-brutalist mechanical keycap styling with 0px blur hard shadow depth.
 * - Zero-Gap Rule: KbdGroup uses explicit margin math (space-x-1.5 or attached -ml-0.5), never CSS gap.
 * - Contrast integrity: custom color or accent variants route through the YIQ engine (src/utils/yiq.ts).
 */
import { cn } from '../../utils/cn'
import { getContrastText } from '../../utils/yiq'
import type { HexColor, LithosElementProps } from '../../core/types'

/**
 * Standard sizing scales supported by keycap components.
 */
export type KbdSize = 'xs' | 'sm' | 'md' | 'lg'

/**
 * Visual structural variants supported by keycap components.
 */
export type KbdVariant = 'default' | 'accent' | 'outline' | 'solid' | 'subtle' | 'inverse'

/**
 * Props configuration interface for the root `Kbd` component.
 */
export interface KbdProps extends LithosElementProps<'kbd'> {
  /** Size scale variant for the keycap. */
  size?: KbdSize

  /** Visual variant style mapping. */
  variant?: KbdVariant

  /** Custom hexadecimal or color string for solid background styling. */
  color?: HexColor | string
}

/**
 * Props configuration interface for the `KbdGroup` compound component.
 */
export interface KbdGroupProps extends LithosElementProps<'div'> {
  /** Merges neighboring keycaps closely together into an attached strip. */
  attached?: boolean
}

const sizeStyles: Record<KbdSize, string> = {
  xs: 'text-[0.65rem] min-w-5 h-5 px-1 pt-0.5 pb-0',
  sm: 'text-xs min-w-6 h-6 px-1.5 pt-0.5 pb-0',
  md: 'text-xs min-w-7 h-7 px-2 pt-0.5 pb-0',
  lg: 'text-sm min-w-8 h-8 px-2.5 pt-0.5 pb-0',
}

const variantStyles: Record<KbdVariant, string> = {
  default:
    'bg-(--lithos-surface) text-(--lithos-text) border-2 border-(--lithos-border) shadow-[1px_2px_0px_0px_var(--lithos-shadow)]',
  accent:
    'bg-(--lithos-accent) text-(--lithos-accent-text) border-2 border-(--lithos-border) shadow-[1px_2px_0px_0px_var(--lithos-shadow)]',
  outline: 'bg-transparent text-(--lithos-text) border-2 border-(--lithos-border) shadow-none',
  solid: 'border-2 border-(--lithos-border) shadow-[1px_2px_0px_0px_var(--lithos-shadow)]',
  subtle:
    'bg-(--lithos-surface) text-(--lithos-text) border border-(--lithos-border)/50 shadow-[1px_1px_0px_0px_var(--lithos-border)]',
  inverse:
    'bg-(--lithos-text) text-(--lithos-bg) border-2 border-(--lithos-border) shadow-[1px_2px_0px_0px_var(--lithos-shadow)]',
}

/**
 * Keyboard key primitive component featuring neo-brutalist mechanical keycap styling and YIQ contrast integrity.
 *
 * @param props - Keycap properties including sizes, variants, custom colors, and children. - {@link KbdProps}
 * @returns Kbd element.
 */
export const Kbd = ({ children, size = 'md', variant = 'default', color, className, style, ...rest }: KbdProps) => {
  const isSolid = variant === 'solid'
  const customBg = color || (isSolid ? '#00FF00' : undefined)
  const customContrast = customBg ? getContrastText(customBg) : undefined

  const customStyle = customBg
    ? {
        backgroundColor: customBg,
        color: customContrast,
      }
    : undefined

  const classes = cn(
    'inline-flex items-center justify-center font-(--font-mono) font-bold text-center leading-none select-none rounded-(--lithos-radius) box-border',
    sizeStyles[size],
    variantStyles[variant],
    className
  )

  return (
    <kbd data-slot="kbd" className={classes} style={{ ...customStyle, ...style }} {...rest}>
      {children}
    </kbd>
  )
}

/**
 * KbdGroup lays out multiple `Kbd` primitives together in keyboard shortcut sequences.
 * Adheres strictly to the Zero-Gap Rule using explicit margins and support for attached strips.
 *
 * @param props - Group properties including attached layout toggles and custom classes. - {@link KbdGroupProps}
 * @returns Group container element.
 */
export const KbdGroup = ({ attached = false, className, children, ...rest }: KbdGroupProps) => {
  const classes = cn(
    'inline-flex items-center',
    attached ? '[&>*:not(:first-child)]:-ml-0.5' : 'space-x-1.5',
    className
  )

  return (
    <div role="group" data-slot="kbd-group" className={classes} {...rest}>
      {children}
    </div>
  )
}
