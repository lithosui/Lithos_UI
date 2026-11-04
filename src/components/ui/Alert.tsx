/**
 * @fileoverview Lithos UI alert primitive.
 * - Renders inline within the page flow; never floats or auto-dismisses like Toast.
 * - No timer, no built-in dismiss: `onClose`/`onUndo` are opt-in, so the plaque stays
 *   persistent by default and only gains actions when the consumer wires them up.
 * - `filled` keeps border/shadow on the global --lithos-border/--lithos-shadow tokens so the
 *   edge stays visible against the page regardless of fill color; `outlined` moves border/shadow
 *   onto the accent color itself since the fill no longer carries it.
 */
import type { CSSProperties } from 'react'
import { getContrastText } from '../../utils/yiq'
import { colors } from '../../utils/colors'
import type { HexColor, LithosElementProps } from '../../core/types'
import { cn } from '../../utils/cn'
import { Button } from './Button'
import { IconUndo } from './icons/IconUndo'
import { IconClose } from './icons/IconClose'

/**
 * Semantic tone or intent variant for the alert component.
 */
export type AlertIntent = 'default' | 'success' | 'error' | 'warning' | 'info' | 'accent'

/**
 * Visual styling variant for the alert background and border presentation.
 */
export type AlertVariant = 'filled' | 'outlined'

/**
 * Size scale variant determining padding, title size, and message typography dimensions.
 */
export type AlertSize = 'sm' | 'md' | 'lg'

/**
 * Props for the `Alert` component.
 */
export interface AlertProps extends LithosElementProps<'div'> {
  /**
   * Semantic style intent variant.
   * @default 'default'
   */
  intent?: AlertIntent

  /**
   * Visual presentation style variant.
   * @default 'filled'
   */
  variant?: AlertVariant

  /**
   * Size scale for spacing and typography.
   * @default 'lg'
   */
  size?: AlertSize

  /**
   * Optional header title text displayed above the alert message.
   */
  title?: string

  /**
   * Custom background or border color override.
   */
  color?: HexColor | string

  /**
   * Callback function triggered when clicking the close button. Renders the close button if provided.
   */
  onClose?: () => void

  /**
   * Callback function triggered when clicking the undo button. Renders the undo button if provided.
   */
  onUndo?: () => void
}

const sizeStyles: Record<AlertSize, { container: string; title: string; headerGap: string; message: string }> = {
  sm: { container: 'p-3 max-w-xs', title: 'text-sm', headerGap: 'mb-2', message: 'text-xs' },
  md: { container: 'p-6 max-w-md', title: 'text-lg', headerGap: 'mb-3', message: 'text-base' },
  lg: { container: 'p-9', title: 'text-2xl', headerGap: 'mb-4', message: 'text-xl' },
}

/**
 * Inline persistent notification plaque component featuring neo-brutalist styling,
 * dynamic contrast calculation, and optional action buttons.
 *
 * @param props - Alert configuration props including intent, variant, size, title, and callbacks.
 * @returns Persistent alert container element.
 */
export const Alert = ({
  intent = 'default',
  variant = 'filled',
  size = 'lg',
  title,
  color,
  onClose,
  onUndo,
  className = '',
  style,
  children,
  ...props
}: AlertProps) => {
  const isAccent = intent === 'accent' && !color
  const isDefault = intent === 'default' && !color
  const accentColor = color || (intent === 'accent' ? 'var(--lithos-accent)' : colors[intent])
  const outlineColor = isDefault ? 'var(--lithos-border)' : accentColor
  const isFilled = variant === 'filled'
  const textColor = isFilled
    ? isAccent
      ? 'var(--lithos-accent-text)'
      : getContrastText(accentColor)
    : 'var(--lithos-text)'
  const sizing = sizeStyles[size]

  const actionColor = isFilled ? textColor : outlineColor

  const classes = cn(
    'border-2 w-full rounded-(--lithos-radius)',
    isFilled && 'border-(--lithos-border) shadow-[4px_4px_0px_0px_var(--lithos-shadow)]',
    sizing.container,
    className
  )

  const computedStyle: CSSProperties = isFilled
    ? { backgroundColor: accentColor, color: textColor, ...style }
    : {
        backgroundColor: 'var(--lithos-bg)',
        color: textColor,
        borderColor: outlineColor,
        boxShadow: `4px 4px 0px 0px ${outlineColor}`,
        ...style,
      }

  return (
    <div role="alert" className={classes} style={computedStyle} {...props}>
      {(title || onClose || onUndo) && (
        <div className={`flex items-center ${sizing.headerGap}`}>
          {title && (
            <h4
              className={cn('font-black uppercase tracking-tighter leading-none m-0', sizing.title)}
              style={!isFilled ? { color: outlineColor } : undefined}
            >
              {title}
            </h4>
          )}

          {(onClose || onUndo) && (
            <div className="flex items-center shrink-0 ml-auto">
              {onUndo && (
                <Button
                  onClick={onUndo}
                  aria-label="Undo"
                  className={cn('shrink-0', onClose && 'mr-3')}
                  style={{
                    backgroundColor: isFilled ? accentColor : 'var(--lithos-bg)',
                    borderColor: actionColor,
                    color: actionColor,
                    '--lithos-shadow': actionColor,
                  }}
                >
                  <IconUndo />
                </Button>
              )}

              {onClose && (
                <Button
                  onClick={onClose}
                  aria-label="Close alert"
                  className="shrink-0"
                  style={{
                    backgroundColor: isFilled ? accentColor : 'var(--lithos-bg)',
                    borderColor: actionColor,
                    color: actionColor,
                    '--lithos-shadow': actionColor,
                  }}
                >
                  <IconClose />
                </Button>
              )}
            </div>
          )}
        </div>
      )}

      <p className={cn('leading-tight m-0 font-body', sizing.message)}>{children}</p>
    </div>
  )
}
