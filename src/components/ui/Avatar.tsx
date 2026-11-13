/**
 * @fileoverview Lithos UI avatar primitive.
 * - Always circular — the shape that reads correctly both standalone and stacked in a Group.
 * - Image swaps to initials from `alt` on load failure via onError, so a dead `src` never leaves a blank box.
 */
import { useState, type Ref } from 'react'
import { getContrastText } from '../../utils/yiq'
import { useAccentColor } from '../../core/useAccentColor'
import { cn } from '../../utils/cn'
import type { LithosElementProps } from '../../core/types'

/** Available sizes for the Avatar component. */
export type AvatarSizes = 'sm' | 'md' | 'lg'

/** Available visual variants for the Avatar component. */
export type AvatarVariants = 'default' | 'solid'

/** Props for the Avatar component. */
export interface AvatarProps extends Omit<LithosElementProps<'span'>, 'children' | 'ref'> {
  /** Reference to the underlying span or image element. */
  ref?: Ref<HTMLSpanElement | HTMLImageElement>

  /** The source URL of the avatar image. */
  src?: string | undefined

  /**
   * Alternative text for the avatar image, used to generate initials if the image fails or is missing.
   * @default ''
   */
  alt?: string | undefined

  /**
   * The visual variant of the avatar.
   * @default 'default'
   */
  variant?: AvatarVariants

  /**
   * The size of the avatar.
   * @default 'md'
   */
  size?: AvatarSizes
}

/** Props for the AvatarGroupCount component. */
export interface AvatarGroupCountProps extends Omit<LithosElementProps<'div'>, 'children'> {
  /** The remaining overflow count to display. */
  count: number

  /**
   * The size of the count badge.
   * @default 'md'
   */
  size?: AvatarSizes
}

/** Represents an individual item within an AvatarGroup. */
export interface AvatarGroupItem {
  /** The source URL of the avatar image. */
  src?: string | undefined

  /** Alternative text for the avatar image, used for initials and accessibility. */
  alt: string
}

/** Props for the AvatarGroup component. */
export interface AvatarGroupProps extends Omit<LithosElementProps<'div'>, 'children'> {
  /** List of items to display in the group. */
  items: AvatarGroupItem[]

  /**
   * Maximum number of avatars to display before showing the overflow count.
   * @default 4
   */
  max?: number

  /**
   * The size of the avatars in the group.
   * @default 'md'
   */
  size?: AvatarSizes
}

const sizeStyles = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-12 h-12 text-base',
  lg: 'w-16 h-16 text-xl',
}

const getInitials = (value: string) =>
  value
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join('') || null

/**
 * Avatar component used to display user profile pictures or fallback initials.
 *
 * @param props - Avatar properties for image content, initials, visual variant, and size. - {@link AvatarProps}
 * @returns The rendered avatar element.
 */
export const Avatar = ({
  src,
  alt = '',
  variant = 'default',
  size = 'md',
  className = '',
  ref,
  ...props
}: AvatarProps) => {
  const [imgFailed, setImgFailed] = useState(false)
  const { accentColor } = useAccentColor()

  const showImage = !!src && !imgFailed
  const bgColor = variant === 'solid' ? accentColor : undefined
  const contrastedColor = bgColor ? getContrastText(bgColor) : undefined

  const classes = cn(
    'relative inline-flex items-center justify-center shrink-0 overflow-hidden rounded-full border-2 border-(--lithos-border) shadow-[2px_2px_0px_0px_var(--lithos-shadow)] font-(--font-mono) font-bold uppercase',
    variant === 'default' && 'bg-(--lithos-surface) text-(--lithos-text)',
    sizeStyles[size],
    className
  )

  const style = bgColor ? { backgroundColor: bgColor, color: contrastedColor } : undefined

  return showImage ? (
    <img
      ref={ref as Ref<HTMLImageElement>}
      src={src}
      alt={alt}
      className={cn(classes, 'object-cover')}
      style={style}
      onError={() => setImgFailed(true)}
      {...props}
    />
  ) : (
    <span ref={ref as Ref<HTMLSpanElement>} className={classes} style={style} {...props}>
      {getInitials(alt)}
    </span>
  )
}

/**
 * AvatarGroupCount component used to display the remaining overflow count in an avatar group.
 *
 * @param props - Avatar count properties for the displayed total and size. - {@link AvatarGroupCountProps}
 * @returns The rendered overflow count element.
 */
export const AvatarGroupCount = ({ count, size = 'md', className = '', ...props }: AvatarGroupCountProps) => {
  const classes = cn(
    'relative inline-flex items-center justify-center shrink-0 rounded-full border-2 border-(--lithos-border) shadow-[2px_2px_0px_0px_var(--lithos-shadow)] bg-(--lithos-surface) text-(--lithos-text) font-(--font-mono) font-bold uppercase',
    sizeStyles[size],
    className
  )

  return (
    <div className={classes} {...props}>
      +{count}
    </div>
  )
}

/**
 * AvatarGroup component used to display a clustered group of avatars with an optional overflow count.
 *
 * @param props - Avatar group properties for the items, visible limit, and size. - {@link AvatarGroupProps}
 * @returns The rendered group of avatars.
 */
export const AvatarGroup = ({ items, max = 4, size = 'md', className = '', ...props }: AvatarGroupProps) => {
  const visible = items.slice(0, max)
  const overflow = items.length - max

  return (
    <div className={cn('flex -space-x-3', className)} {...props}>
      {visible.map((item, index) => (
        <Avatar key={`${item.alt}-${index}`} src={item.src} alt={item.alt} size={size} />
      ))}
      {overflow > 0 && <AvatarGroupCount count={overflow} size={size} />}
    </div>
  )
}
