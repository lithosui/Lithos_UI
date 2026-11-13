/**
 * @fileoverview Lithos UI badge primitive.
 * - Dynamic contrast text resolution based on YIQ color space calculated from custom HEX or preset variant backgrounds.
 * - Integrates theme-aware accentColor fallback with hard-edged neo-brutalist border and shadow geometry.
 */
import { getContrastText } from '../../utils/yiq'
import { colors } from '../../utils/colors'
import { useAccentColor } from '../../core/useAccentColor'
import type { HexColor, LithosElementProps } from '../../core/types'
import { cn } from '../../utils/cn'

/**
 * Size scale variant determining padding and typography dimensions for the badge.
 */
export type BadgeSizes = 'default' | 'sm' | 'md' | 'lg'

/**
 * Semantic tone or intent variant for the badge background color.
 */
export type BadgeIntents = 'default' | 'accent' | 'success' | 'error' | 'warning' | 'info'

/*
 * Props for the `Badge` component.
 */
export interface BadgeProps extends LithosElementProps<'span'> {
  /**
   * Semantic style intent variant.
   * @default 'default'
   */
  intent?: BadgeIntents

  /**
   * Size scale for spacing and typography.
   * @default 'default'
   */
  size?: BadgeSizes

  /**
   * Custom background color override in HEX format or CSS color string.
   */
  color?: HexColor | string
}

const sizeStyles = {
  sm: 'text-[0.65rem] px-1.5',
  default: 'text-xs px-1.75',
  md: 'text-sm px-2',
  lg: 'text-lg px-3',
}

/**
 * Inline status indicator badge component featuring neo-brutalist styling,
 * monospace uppercase typography, and automated contrast text resolution.
 *
 * @param props - Badge configuration props including size, intent, color, and children content. - {@link BadgeProps}
 * @returns Status badge container element.
 */
export const Badge = ({
  children,
  className = '',
  size = 'default',
  intent = 'default',
  color,
  ...props
}: BadgeProps) => {
  const { accentColor } = useAccentColor()

  const bgColor = color || (intent === 'accent' ? accentColor : colors[intent])
  const contrastedColor = getContrastText(bgColor)

  const classes = cn(
    'inline-flex items-center uppercase font-(--font-mono) font-bold border-2 border-(--lithos-border) shadow-[1px_1px_0_0_var(--lithos-border)] py-1 w-max rounded-(--lithos-radius)',
    sizeStyles[size],
    className
  )

  return (
    <span className={classes} style={{ backgroundColor: bgColor, color: contrastedColor }} {...props}>
      {children}
    </span>
  )
}
