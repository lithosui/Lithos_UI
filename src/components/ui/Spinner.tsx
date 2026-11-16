/**
 * @fileoverview Lithos UI loading spinner primitive component.
 * - Neobrutalism-inspired animated loading indicator supporting multiple icon bibliographies.
 * - Provides color intent variants, size scaling, and anticlockwise animation direction controls.
 * - Compliant with accessibility standards using `role="status"` and screen reader text.
 */
import { FiLoader, FiRefreshCw, FiRefreshCcw, FiSettings } from 'react-icons/fi'
import { VscLoading } from 'react-icons/vsc'
import { LuLoaderCircle, LuLoader } from 'react-icons/lu'
import { TbLoader2, TbLoader3 } from 'react-icons/tb'
import { PiSpinnerGap, PiCircleNotch } from 'react-icons/pi'
import { RiLoader2Line, RiLoader3Line, RiLoader4Line } from 'react-icons/ri'
import { cn } from '../../utils/cn'
import type { LithosElementProps } from '../../core/types'

/** Visual intent color variants supported by the spinner component. */
export type SpinnerVariant = 'default' | 'accent' | 'inverse'

/** Icon library keys supported for rendering the spinner element. */
export type SpinnerIconType =
  | 'FiLoader'
  | 'FiRefreshCw'
  | 'FiRefreshCcw'
  | 'FiSettings'
  | 'VscLoading'
  | 'LuLoaderCircle'
  | 'LuLoader'
  | 'TbLoader2'
  | 'TbLoader3'
  | 'PiSpinnerGap'
  | 'PiCircleNotch'
  | 'RiLoader2Line'
  | 'RiLoader3Line'
  | 'RiLoader4Line'

/**
 * Props configuration interface for the `Spinner` component.
 */
export interface SpinnerProps extends LithosElementProps<'div'> {
  /**
   * Dimension size value for the spinner icon (number or CSS string).
   * @default 24
   */
  size?: number | string

  /** Custom CSS color override value. */
  color?: string

  /**
   * Visual intent variant mapping.
   * @default 'default'
   * */
  variant?: SpinnerVariant

  /**
   * Icon bibliography type key.
   * @default 'FiLoader'
   * */
  icon?: SpinnerIconType

  /**
   * Reverses the rotation animation direction counterclockwise.
   * @default false
   * */
  anticlockwise?: boolean
}

const iconMap: Record<SpinnerIconType, React.ElementType> = {
  FiLoader,
  FiRefreshCw,
  FiRefreshCcw,
  FiSettings,
  VscLoading,
  LuLoaderCircle,
  LuLoader,
  TbLoader2,
  TbLoader3,
  PiSpinnerGap,
  PiCircleNotch,
  RiLoader2Line,
  RiLoader3Line,
  RiLoader4Line,
}

const variantClass: Record<SpinnerVariant, string> = {
  default: 'text-current',
  accent: 'text-(--lithos-accent)',
  inverse: 'text-(--lithos-bg)',
}

/**
 * Spinner primitive component rendering animated loading indicators with flexible icon styles and spin directions.
 *
 * @param props - Spinner properties including sizes, variants, icons, colors, and anticlockwise settings. - {@link SpinnerProps}
 * @returns Spinner status wrapper div element.
 */
export const Spinner = ({
  size = 24,
  color,
  variant = 'default',
  icon = 'FiLoader',
  anticlockwise = false,
  className,
  ...rest
}: SpinnerProps) => {
  const Icon = iconMap[icon] || FiLoader

  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn(
        'inline-flex items-center justify-center animate-spin',
        anticlockwise && '[animation-direction:reverse]',
        !color && variantClass[variant],
        className
      )}
      style={{ color }}
      {...rest}
    >
      <Icon size={size} strokeWidth={3} />
      <span className="sr-only">Loading...</span>
    </div>
  )
}
