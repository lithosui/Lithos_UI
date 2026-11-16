/**
 * @fileoverview Lithos UI card primitive.
 * - Root renders raw `children` with no flex/grid imposed and no padding, so `CardImage` can bleed edge-to-edge.
 * - `CardContent`/`CardFooter` own their own padding; stack spacing between them is margin-based, never `gap`.
 * - Hard geometry: fixed-offset shadow always shows; `hover:translate` lift is opt-in via `interactive`, not forced on every Card.
 */
import { cn } from '../../utils/cn'
import type { LithosElementProps } from '../../core/types'

/**
 * Visual styling variant for the card component.
 */
export type CardVariants = 'default' | 'accent' | 'image' | 'solid'

/**
 * Props for the root `Card` container component.
 */
export interface CardProps extends LithosElementProps<'div'> {
  /**
   * Enables interactive hover effects (shadow enlargement or elevation translation).
   * @default false
   */
  interactive?: boolean | 'elevate'

  /**
   * Visual theme variant style.
   * @default 'default'
   */
  variant?: CardVariants
}

/**
 * Card container primitive featuring hard-edged neo-brutalist shadow geometry and variant themes.
 * Root renders raw children with no padding, allowing edge-to-edge images.
 *
 * @param props - Card properties including interactive mode, variant style, and children. - {@link CardProps}
 * @returns Card container element.
 */
export const Card = ({ interactive = false, variant = 'default', className, children, ...rest }: CardProps) => {
  const isImage = variant === 'image'

  const classes = cn(
    'relative border-2 border-(--lithos-border) overflow-hidden shadow-[4px_4px_0px_0px_var(--lithos-shadow)] rounded-(--lithos-radius)',
    isImage
      ? 'bg-transparent text-white flex flex-col justify-end'
      : variant === 'solid'
        ? 'bg-(--lithos-accent) text-(--lithos-accent-text)'
        : 'bg-(--lithos-surface) text-(--lithos-text)',
    variant === 'accent' && 'transition-colors hover:bg-(--lithos-accent) hover:text-(--lithos-accent-text)',
    interactive &&
      (interactive === 'elevate'
        ? 'transition-transform hover:-translate-y-1'
        : 'transition-shadow duration-150 ease-out hover:shadow-[6px_6px_0px_0px_var(--lithos-shadow)]'),
    className
  )

  return (
    <div className={classes} {...rest}>
      {isImage && (
        <div className="absolute inset-0 z-10 bg-linear-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />
      )}
      {children}
    </div>
  )
}

/**
 * Props for the `CardImage` component.
 */
export interface CardImageProps extends LithosElementProps<'img'> {
  /** Image source URL. */
  src: string

  /** Alternative descriptive text for accessibility. */
  alt: string

  /** Renders the image as an absolute background layer covering the card. */
  isBackground?: boolean
}

/**
 * Image component for cards, supporting standard block headers or absolute background placement.
 *
 * @param props - Image properties including source, alt text, and background mode. - {@link CardImageProps}
 * @returns Image element.
 */
export const CardImage = ({ isBackground = false, className, ...rest }: CardImageProps) => {
  const classes = cn(
    isBackground
      ? 'absolute inset-0 w-full h-full object-cover z-0'
      : 'w-full h-48 object-cover block border-b-2 border-(--lithos-border)',
    className
  )

  return <img className={classes} {...rest} />
}

/**
 * Props for the `CardContent` body container.
 */
export interface CardContentProps extends LithosElementProps<'div'> {
  /** Internal padding spacing scale. */
  spacing?: 'sm' | 'md' | 'lg'
}

/**
 * Body content container component for the card, managing internal padding scale.
 *
 * @param props - Content properties including padding spacing and children. - {@link CardContentProps}
 * @returns Content container element.
 */
export const CardContent = ({ spacing = 'md', className, children, ...rest }: CardContentProps) => {
  const spacingClass = {
    sm: 'p-3',
    md: 'p-6',
    lg: 'p-9',
  }[spacing]

  const classes = cn('relative z-20', spacingClass, className)

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  )
}

/**
 * Props for the `CardTitle` heading component.
 */
export type CardTitleProps = LithosElementProps<'h3'>

/**
 * Heading component for card titles, featuring bold uppercase typography.
 *
 * @param props - Heading element attributes and custom classes. - {@link CardTitleProps}
 * @returns Card title heading element.
 */
export const CardTitle = ({ className, children, ...rest }: CardTitleProps) => {
  const classes = cn('text-xl font-black uppercase tracking-tight leading-none mb-3', className)

  return (
    <h3 className={classes} {...rest}>
      {children}
    </h3>
  )
}

/**
 * Props for the `CardDescription` body text component.
 */
export type CardDescriptionProps = LithosElementProps<'p'>

/**
 * Paragraph text description component for cards.
 *
 * @param props - Paragraph element attributes and custom classes. - {@link CardDescriptionProps}
 * @returns Card description paragraph element.
 */
export const CardDescription = ({ className, children, ...rest }: CardDescriptionProps) => {
  const classes = cn('font-body opacity-70 leading-snug', className)

  return (
    <p className={classes} {...rest}>
      {children}
    </p>
  )
}

/**
 * Props for the `CardFooter` action bar container.
 */
export interface CardFooterProps extends LithosElementProps<'div'> {
  /** Internal padding spacing scale. */
  spacing?: 'sm' | 'md' | 'lg'
}

/**
 * Footer action container component for the bottom of cards, separated by a top border.
 *
 * @param props - Footer properties including spacing scale and action buttons. - {@link CardFooterProps}
 * @returns Footer container element.
 */
export const CardFooter = ({ spacing = 'md', className, children, ...rest }: CardFooterProps) => {
  const spacingClass = {
    sm: 'px-3 pt-2 pb-3',
    md: 'px-6 pt-4 pb-6',
    lg: 'px-9 pt-6 pb-9',
  }[spacing]

  const classes = cn(
    'relative z-20 flex items-center justify-end border-t-2 border-(--lithos-border)',
    spacingClass,
    className
  )

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  )
}
