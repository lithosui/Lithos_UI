/**
 * @fileoverview Native form label with Lithos typography and explicit state styling.
 * - Uses the shared label-size token; spacing uses margins, never CSS gap.
 * - Preserves native label activation and React 19 ref support.
 * - No click physics: labels delegate interaction to their associated controls.
 */
import type { LithosElementProps } from '../../core/types'
import { cn } from '../../utils/cn'

/** Supported label typography sizes. */
export type LabelSize = 'sm' | 'md' | 'lg'

/** Native label attributes and Lithos presentation options. */
export interface LabelProps extends LithosElementProps<'label'> {
  /** Typography scale. @default 'md' */
  size?: LabelSize
  /** Shows a decorative required marker. Set required on the control too. @default false */
  required?: boolean
  /** Dims the label. Disable the associated control separately. @default false */
  disabled?: boolean
}

const sizeStyles = {
  sm: 'text-xs',
  md: 'text-(length:--lithos-label-size)',
  lg: 'text-lg',
} as const

/** Semantic label for a control connected through htmlFor or nested inside it. */
export const Label = ({
  size = 'md',
  required = false,
  disabled = false,
  className,
  children,
  ...props
}: LabelProps) => (
  <label
    {...props}
    data-disabled={disabled || undefined}
    data-required={required || undefined}
    className={cn(
      'inline-block font-extrabold tracking-wide uppercase text-(--lithos-text) peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
      sizeStyles[size],
      disabled && 'cursor-not-allowed opacity-50',
      className
    )}
  >
    {children}
    {required && (
      <span aria-hidden="true" className="ms-1">
        *
      </span>
    )}
  </label>
)
