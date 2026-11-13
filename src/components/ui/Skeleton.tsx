/**
 * @fileoverview Lithos UI skeleton loader primitives (`Skeleton` and `SkeletonText`).
 * - Renders placeholder placeholder shapes with neo-brutalist border styling and animation effects (`shimmer` or `pulse`).
 * - Supports accessibility hiding (`aria-hidden="true"` and `inert`) and responsive motion preference adjustments.
 */
import type { CSSProperties } from 'react'
import { cn } from '../../utils/cn'
import type { LithosElementProps } from '../../core/types'

/** Animation behavior configurations for skeleton loaders. */
export type SkeletonAnimation = boolean | 'shimmer' | 'pulse'

/** Structural shape variant styles supported by skeleton components. */
export type SkeletonVariant = 'text' | 'rectangular' | 'rounded' | 'circular'

/** Color tone themes supported by skeleton components. */
export type SkeletonTone = 'neutral' | 'accent'

/** Props configuration interface for the root `Skeleton` component. */
export interface SkeletonProps extends Omit<LithosElementProps<'span'>, 'children' | 'dangerouslySetInnerHTML'> {
  /** Children are explicitly disallowed for skeleton placeholders. */
  children?: never

  /**
   * Structural shape variant style.
   * @default 'text'
   */
  variant?: SkeletonVariant

  /**
   * Animation behavior type or boolean toggle.
   * @default true
   */
  animation?: SkeletonAnimation

  /**
   * Disables animations when user system preferences request reduced motion.
   * @default false
   */
  respectReducedMotion?: boolean

  /**
   * Semantic color tone theme category.
   * @default 'neutral'
   */
  tone?: SkeletonTone

  /** Custom width dimension style property. */
  width?: CSSProperties['width']

  /** Custom height dimension style property. */
  height?: CSSProperties['height']
}

/** Props configuration interface for the `SkeletonText` component. */
export interface SkeletonTextProps extends Omit<LithosElementProps<'div'>, 'children' | 'dangerouslySetInnerHTML'> {
  /** Children are explicitly disallowed for skeleton text blocks. */
  children?: never

  /**
   * Total number of placeholder text lines to render.
   * @default 3
   */
  lines?: number

  /**
   * Width dimension style applied specifically to the final text line.
   * @default '65%'
   */
  lastLineWidth?: CSSProperties['width']

  /**
   * Animation behavior type or boolean toggle.
   * @default true
   */
  animation?: SkeletonAnimation

  /**
   * Disables animations when user system preferences request reduced motion.
   * @default false
   */
  respectReducedMotion?: boolean

  /**
   * Semantic color tone theme category.
   * @default 'neutral'
   */
  tone?: SkeletonTone
}

const variants: Record<SkeletonVariant, string> = {
  text: 'w-full h-[1em] rounded-(--lithos-radius)',
  rectangular: 'w-full h-32 rounded-none',
  rounded: 'w-full h-32 rounded-[max(var(--lithos-radius),0.5rem)]',
  circular: 'w-12 h-auto aspect-square shrink-0 rounded-full',
}

const tones: Record<SkeletonTone, string> = {
  neutral: 'bg-[color-mix(in_srgb,var(--lithos-text)_12%,var(--lithos-surface))]',
  accent: 'bg-[color-mix(in_srgb,var(--lithos-accent)_28%,var(--lithos-surface))]',
}

const animations: Record<Exclude<SkeletonAnimation, boolean>, string> = {
  pulse: 'animate-pulse [animation-duration:1s]',
  shimmer:
    'animate-[lithos-shimmer_1.5s_linear_infinite] [mask-image:linear-gradient(to_right,#0006_35%,#000_50%,#0006_65%)] [mask-size:300%_100%] [mask-clip:no-clip] [mask-repeat:repeat] forced-colors:[mask-image:none]',
}

/**
 * Skeleton placeholder primitive component rendering animated loading shapes with neo-brutalist styling.
 *
 * @param props - Skeleton properties including variants, animations, tones, widths, and heights. - {@link SkeletonProps}
 * @returns Skeleton span element.
 */
export const Skeleton = ({
  variant = 'text',
  animation = true,
  respectReducedMotion = false,
  tone = 'neutral',
  width,
  height,
  className,
  style,
  ...props
}: SkeletonProps) => (
  <span
    {...props}
    className={cn(
      'block overflow-hidden box-border min-w-0 max-w-full border-2 border-(--lithos-border) shadow-[2px_2px_0_var(--lithos-shadow)] pointer-events-none select-none',
      variants[variant],
      tones[tone],
      animation ? animations[animation === true ? 'shimmer' : animation] : 'animate-none',
      respectReducedMotion && 'motion-reduce:animate-none',
      respectReducedMotion && (animation === true || animation === 'shimmer') && 'motion-reduce:[mask-image:none]',
      'forced-colors:border-[CanvasText] forced-colors:bg-[Canvas] forced-colors:shadow-none forced-colors:animate-none',
      className
    )}
    style={{ width, height, ...style }}
    data-variant={variant}
    data-animation={animation === true ? 'shimmer' : animation || 'none'}
    data-tone={tone}
    aria-hidden="true"
    inert
  />
)

/**
 * SkeletonText layout component rendering multi-line paragraph loading placeholders with custom line counts and trailing widths.
 *
 * @param props - Skeleton text properties including line quantities, last line widths, tones, and animations. - {@link SkeletonTextProps}
 * @returns Skeleton text container div element.
 */
export const SkeletonText = ({
  lines = 3,
  lastLineWidth = '65%',
  animation = true,
  respectReducedMotion = false,
  tone = 'neutral',
  className,
  ...props
}: SkeletonTextProps) => {
  const count = Number.isFinite(lines) ? Math.min(100, Math.max(0, Math.floor(lines))) : 3

  return (
    <div {...props} className={cn('min-w-0 w-full space-y-[0.625em]', className)} aria-hidden="true" inert>
      {Array.from({ length: count }, (_, index) => (
        <Skeleton
          key={index}
          animation={animation}
          respectReducedMotion={respectReducedMotion}
          tone={tone}
          width={count > 1 && index === count - 1 ? lastLineWidth : undefined}
        />
      ))}
    </div>
  )
}
