/**
 * @fileoverview Lithos UI badge primitive.
 * - Dynamic contrast text resolution based on YIQ color space calculated from custom HEX or preset variant backgrounds.
 * - Integrates theme-aware accentColor fallback with hard-edged neo-brutalist border and shadow geometry.
 */
import type { ComponentPropsWithRef } from 'react'
import { getContrastText } from '../../utils/yiq'
import { colors } from '../../utils/colors'
import { useAccentColor } from '../../core/useAccentColor'
import type { HexColor } from '../../core/types'
import { cn, type LithosClass } from '../../utils/cn'

export type BadgeSizes = 'default' | 'sm' | 'md' | 'lg'
export type BadgeIntents = 'default' | 'accent' | 'success' | 'error' | 'warning' | 'info'

export interface BadgeProps extends Omit<ComponentPropsWithRef<'div'>, 'className'> {
  intent?: BadgeIntents
  className?: LithosClass
  size?: BadgeSizes
  color?: HexColor | string
}

const sizeStyles = {
  sm: 'text-[0.65rem] px-1.5',
  default: 'text-xs px-1.75',
  md: 'text-sm px-2',
  lg: 'text-lg px-3',
}

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
    'uppercase font-(--font-mono) font-bold border-2 border-(--lithos-border) shadow-[1px_1px_0_0_var(--lithos-border)] py-1 w-max rounded-(--lithos-radius)',
    sizeStyles[size],
    className
  )

  return (
    <div className={classes} style={{ backgroundColor: bgColor, color: contrastedColor }} {...props}>
      {children}
    </div>
  )
}
