/**
 * @fileoverview Lithos UI tooltip content overlay.
 * - Wraps PopoverContent to inherit entry/exit animations and positioning logic.
 * - Applies size, typography, and color token variants (`default`, `primary`, `inverse`).
 * - Renders FloatingArrow connected to `arrowRef` and dynamically offsets it on rounded borders.
 */
import { FloatingArrow } from '@floating-ui/react'
import { cn } from '../../../utils/cn'
import { useTooltip } from './useTooltip'
import { PopoverContent, usePopoverContext } from '../Popover'
import type { TooltipVariant, TooltipContentProps } from './tooltip.types'
import { useTheme } from '../../../core/hooks/useTheme'

const variantStyles: Record<TooltipVariant, { container: string; fill: string; stroke: string }> = {
  default: {
    container: 'bg-(--lithos-surface) text-(--lithos-text) border-(--lithos-border)',
    fill: 'var(--lithos-surface)',
    stroke: 'var(--lithos-border)',
  },
  primary: {
    container: 'bg-(--lithos-accent) text-(--lithos-accent-text) border-(--lithos-border)',
    fill: 'var(--lithos-accent)',
    stroke: 'var(--lithos-border)',
  },
  inverse: {
    container: 'bg-(--lithos-text) text-(--lithos-bg) border-(--lithos-bg)',
    fill: 'var(--lithos-text)',
    stroke: 'var(--lithos-bg)',
  },
}

export const TooltipContent = ({ className, variant = 'default', children, ...rest }: TooltipContentProps) => {
  const { context, placement } = usePopoverContext()
  const { arrowRef } = useTooltip()
  const { radius } = useTheme()

  const currentVariant = variantStyles[variant]

  const isHorizontal = placement === 'left' || placement === 'right'
  const noSharpRadius = radius >= 4

  return (
    <PopoverContent
      className={cn('min-w-[unset] px-3 py-1.5 text-sm font-bold', currentVariant.container, className)}
      {...rest}
    >
      {children}
      <FloatingArrow
        ref={arrowRef}
        context={context}
        fill={currentVariant.fill}
        stroke={currentVariant.stroke}
        strokeWidth={2}
        style={
          isHorizontal && noSharpRadius
            ? {
                [placement]: `calc(100% - 4px)`,
              }
            : undefined
        }
      />
    </PopoverContent>
  )
}
