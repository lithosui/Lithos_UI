/**
 * @fileoverview Native label primitive with shared typography tokens.
 * Control activation stays with the browser; icon spacing uses explicit margins.
 */
import type { ReactNode } from 'react'
import type { LithosElementProps } from '../../core/types'
import { cn } from '../../utils/cn'

/** Native label attributes plus presentation options. */
export interface LabelProps extends LithosElementProps<'label'> {
  /** Typography scale. Defaults to the shared label size token. */
  size?: 'default' | 'sm' | 'md' | 'lg'

  /** Shows an asterisk; also set required on the associated control. */
  required?: boolean

  /** Dims the label; also set disabled on the associated control. */
  disabled?: boolean

  /** Decorative icon hidden from assistive technology. */
  icon?: ReactNode

  /** Icon placement relative to the label text. Defaults to left. */
  iconPosition?: 'left' | 'top'
}

const labelSizeStyles = {
  default: 'text-(length:--lithos-label-size)',
  sm: 'text-xs',
  md: 'text-base',
  lg: 'text-lg',
}

/** Form label preserving native attributes, refs, and control association. */
export const Label = ({
  size = 'default',
  required = false,
  disabled = false,
  icon,
  iconPosition = 'left',
  className,
  children,
  ...props
}: LabelProps) => {
  const hasIcon = icon != null && typeof icon !== 'boolean'
  const isVertical = iconPosition === 'top'
  const content = (
    <>
      {children}
      {required && (
        <span aria-hidden="true" className="ml-1">
          *
        </span>
      )}
    </>
  )

  return (
    <label
      {...props}
      className={cn(
        'leading-normal text-(--lithos-text)',
        labelSizeStyles[size],
        hasIcon ? (isVertical ? 'inline-flex flex-col items-start' : 'inline-flex items-center') : 'inline-block',
        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
        className
      )}
    >
      {hasIcon && (
        <span aria-hidden="true" className={isVertical ? 'inline-flex shrink-0 mb-2' : 'inline-flex shrink-0 mr-2'}>
          {icon}
        </span>
      )}
      {hasIcon ? <span className="min-w-0">{content}</span> : content}
    </label>
  )
}
