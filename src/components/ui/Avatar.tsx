/**
 * @fileoverview Lithos UI avatar primitive.
 * - Always circular — the shape that reads correctly both standalone and stacked in a Group.
 * - Image swaps to initials from `alt` on load failure via onError, so a dead `src` never leaves a blank box.
 */
import { useState, type ComponentPropsWithRef, type Ref } from 'react'
import { getContrastText } from '../../utils/yiq'
import { useAccentColor } from '../../core/useAccentColor'
import { cn, type LithosClass } from '../../utils/cn'

type AvatarSizes = 'sm' | 'md' | 'lg'
type AvatarVariants = 'default' | 'solid'

export interface AvatarProps extends Omit<ComponentPropsWithRef<'span'>, 'children' | 'ref' | 'className'> {
  ref?: Ref<HTMLSpanElement | HTMLImageElement>
  src?: string | undefined
  alt?: string | undefined
  variant?: AvatarVariants
  size?: AvatarSizes
  className?: LithosClass
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

export interface AvatarGroupCountProps extends Omit<ComponentPropsWithRef<'div'>, 'children' | 'className'> {
  count: number
  size?: AvatarSizes
  className?: LithosClass
}

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

export interface AvatarGroupItem {
  src?: string | undefined
  alt: string
}

export interface AvatarGroupProps extends Omit<ComponentPropsWithRef<'div'>, 'children' | 'className'> {
  items: AvatarGroupItem[]
  max?: number
  size?: AvatarSizes
  className?: LithosClass
}

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
