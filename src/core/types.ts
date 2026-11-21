import type { ElementType, ReactNode, ComponentPropsWithRef, CSSProperties, PointerEvent, DragEvent } from 'react'
import type { LithosClass } from '../utils/cn'
import 'react'

declare module 'react' {
  interface CSSProperties {
    [key: `--${string}`]: string | number | undefined
  }
}

const HEX_COLOR_PATTERN = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/

// __brand doesn't exist at runtime; it just blocks plain strings from being assigned without going through isHexColor
export type HexColor = string & { readonly __brand: 'HexColor' }

export const isHexColor = (value: string): value is HexColor => HEX_COLOR_PATTERN.test(value)

/**
 * Creates a discriminated union supporting standard rendering or child delegation via `asChild`.
 *
 * @template BaseProps - Custom props required by the component.
 * @template DefaultElement - Default HTML element tag when `asChild` is false.
 * @template TargetElement - Dynamic element tag when `asChild` is true.
 */
export type AsChildProps<
  BaseProps,
  DefaultElement extends ElementType,
  TargetElement extends ElementType = DefaultElement,
> =
  | (BaseProps &
      Omit<LithosElementProps<DefaultElement>, keyof BaseProps> & {
        asChild?: false
      })
  | (BaseProps &
      Omit<LithosElementProps<TargetElement>, keyof BaseProps> & {
        /** Delegates rendering to its direct child element merging props and event handlers. */
        asChild: true
        children: ReactNode
      })

/**
 * Base props interface extending element attributes with LithosClass support.
 */
export type LithosElementProps<T extends ElementType> = Omit<ComponentPropsWithRef<T>, 'className'> & {
  className?: LithosClass
}

export type SurfaceHorizontalPlacement = 'left' | 'right'
export type SurfaceVerticalPlacement = 'top' | 'bottom'

/**
 * Axis orientations where an interactive surface can slide or resize.
 */
export type SurfacePlacement = SurfaceHorizontalPlacement | SurfaceVerticalPlacement

/**
 * Handlers attached to interactive surface containers or resizer hitboxes.
 */
export interface SurfaceGestureHandlers {
  onPointerDownCapture: (e: PointerEvent) => void
  onPointerMoveCapture: (e: PointerEvent) => void
  onPointerUpCapture: (e: PointerEvent) => void
  onPointerCancelCapture: (e: PointerEvent) => void
  onDragStartCapture: (e: DragEvent<HTMLDivElement>) => void
}

/**
 * Options for the `useResizer` hook.
 */
export interface UseResizerOptions {
  /** Layout edge where the surface or panel is pinned. */
  placement: SurfacePlacement

  /** Current active width in pixels before dragging begins. @default 224 */
  baseWidthPx?: number

  /** Minimum allowed width boundary in pixels. @default 64 */
  minWidthPx?: number

  /** Maximum allowed width boundary in pixels. */
  maxWidthPx?: number

  /** Array of pixel breakpoints to snap to upon releasing pointer. Example: [64, 128, 224] */
  snapPoints?: number[]

  /** Whether gesture interaction is allowed on the surface body. @default true */
  allowGestureOnContent?: boolean

  /** Callback fired continuously during active pointer drag gestures */
  onDrag?: (currentWidth: number) => void

  /** Callback executed when the pointer releases and aligns with a snap point. */
  onSnap?: (width: number) => void

  /** Callback fired when dragging reduces width at or below `minWidthPx`. */
  onDismiss?: () => void
}

/**
 * Return state and handlers for the `useResizer` hook.
 */
export interface UseResizerReturn {
  /** Event handlers to bind pointer capture listeners onto the container or resizer element. */
  handlers: SurfaceGestureHandlers

  /** Dynamic CSS inline styles for width and transition resets during active drag. */
  style: CSSProperties

  /** Boolean flag indicating if an active resize drag gesture is occurring. */
  isDragging: boolean

  /** Calculated real-time width in pixels clamped between `minWidthPx` and `maxWidthPx`. */
  currentWidth: number
}

/**
 * Options for the `useSwipe` hook.
 */
export interface UseSwipeOptions {
  /** Direction/edge towards which the surface dismisses via swipe. */
  placement: SurfacePlacement

  /** Current open state of the surface. */
  open: boolean

  /** Callback fired when swipe distance passes threshold on release. */
  onDismiss: () => void

  /** Required travel distance in pixels to trigger dismiss. @default 100 */
  threshold?: number

  /** Whether swipe gesture is enabled on general surface content. @default true */
  allowSwipeOnContent?: boolean
}

/**
 * Return state and handlers for the `useSwipe` hook.
 */
export interface UseSwipeReturn {
  /** Event handlers to bind pointer capture listeners onto the container element. */
  handlers: SurfaceGestureHandlers

  /** Dynamic CSS inline styles representing CSS transform translations. */
  style: CSSProperties

  /** Boolean flag indicating if an active swipe-to-dismiss drag is occurring. */
  isDragging: boolean

  /** Current displacement in pixels along the active placement axis. */
  dragOffset: number
}
