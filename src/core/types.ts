const HEX_COLOR_PATTERN = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/

// __brand doesn't exist at runtime; it just blocks plain strings from being assigned without going through isHexColor
export type HexColor = string & { readonly __brand: 'HexColor' }

export const isHexColor = (value: string): value is HexColor => HEX_COLOR_PATTERN.test(value)

export type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'text' | 'solid'

export type ToastType = 'success' | 'error' | 'warning' | 'info' | 'default'

export type ToastPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

export interface ToastProps {
  intent?: ToastType | undefined
  title: string
  message: string
  color?: HexColor | string | undefined
  duration?: number
}
