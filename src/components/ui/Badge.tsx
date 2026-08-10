/**
 * @fileoverview Lithos UI badge primitive.
 * - Dynamic contrast text resolution based on YIQ color space calculated from custom HEX or preset variant backgrounds.
 * - Integrates theme-aware accentColor fallback with hard-edged neo-brutalist border and shadow geometry.
 */
import type { ComponentPropsWithRef } from "react";
import { getContrastText } from "../../utils/yiq";
import { colors } from "../../utils/colors";
import { useTheme } from "../../core/useTheme";
import type { HexColor } from "../../core/types";
import { cn } from "../../utils/cn";

type BadgeSizes = 'default' | 'sm' | 'md' | 'lg'
type BadgeVariants = 'default' | 'accent' | 'success' | 'error' | 'warning' | 'info'

export interface BadgeProps extends ComponentPropsWithRef<'div'> {
  variant?: BadgeVariants
  className?: string
  size?: BadgeSizes
  color?: HexColor | string
}

const sizeStyles = {
  sm: 'text-[0.65rem] px-1.5',
  default: 'text-xs px-1.75',
  md: 'text-sm px-2',
  lg: 'text-lg px-3'
}

export const Badge = ({
  children,
  className = '',
  size = 'default',
  variant = 'default',
  color,
  ref,
  ...props
}: BadgeProps) => {
  const { accentColor } = useTheme()

  const bgColor = color || (variant === 'accent' ? accentColor : colors[variant])
  const contrastedColor = getContrastText(bgColor)

  const classes = cn(
    'uppercase font-(--font-sans) font-bold border-2 border-(--lithos-border) shadow-[1px_1px_0_0_var(--lithos-border)] py-1 w-max',
    sizeStyles[size],
    className
  )

  return (
    <div ref={ref} className={classes} style={{ backgroundColor: bgColor, color: contrastedColor }} {...props}>
      {children}
    </div>
  )
}
