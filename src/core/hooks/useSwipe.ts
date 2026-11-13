/**
 * @fileoverview Hook to handle unidirectional swipe-to-dismiss gestures
 * via CSS transforms on drawers, modals, toasts, and overlays.
 */
import {
  useState,
  useRef,
  useCallback,
  useMemo,
  useEffect,
  type PointerEvent,
  type DragEvent,
  type CSSProperties,
} from 'react'
import type { UseSwipeOptions, UseSwipeReturn, SurfaceGestureHandlers, SurfacePlacement } from '../types'
import { calculateGestureDelta } from '../utils/gestureMath'

/**
 * Hook to handle unidirectional swipe-to-dismiss gestures
 * via CSS transforms on drawers, modals, toasts, and overlays.
 *
 * @param options - Configuration options provided as {@link UseSwipeOptions}.
 * @returns An object containing gesture handlers, computed transformation styles, and swipe state flags as {@link UseSwipeReturn}.
 */
export const useSwipe = ({
  placement,
  open,
  onDismiss,
  threshold = 100,
  allowSwipeOnContent = true,
}: UseSwipeOptions): UseSwipeReturn => {
  const [dragOffset, setDragOffset] = useState(0)
  const pointerStart = useRef({ x: 0, y: 0 })
  const isDragging = useRef(false)
  const lastOffset = useRef(0)
  const isClosingViaSwipe = useRef(false)

  // Clean up swipe refs immediately when drawer opens
  useEffect(() => {
    if (open) {
      isClosingViaSwipe.current = false
      lastOffset.current = 0
      setDragOffset(0)
    }
  }, [open])

  // Release pointer capture locks and clear active drag states
  const resetSwipeState = useCallback((e: PointerEvent) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId)
    }
    isDragging.current = false
    setDragOffset(0)
  }, [])

  const handlePointerDownCapture = useCallback(
    (e: PointerEvent) => {
      if (!open || !allowSwipeOnContent) return

      // Prevent interactive controls inside surface content from starting drag actions
      let interactiveSelector = 'button, input, textarea, select, [role="button"]'
      if (!allowSwipeOnContent) {
        interactiveSelector += ', a'
      }

      const target = e.target as HTMLElement
      if (target.closest(interactiveSelector)) return

      pointerStart.current = { x: e.clientX, y: e.clientY }
      isDragging.current = true
    },
    [open, allowSwipeOnContent]
  )

  const handlePointerMoveCapture = useCallback(
    (e: PointerEvent) => {
      if (!isDragging.current) return

      // Extract single-axis translation delta toward dismissal edge
      const { offset, isOrthogonalScroll } = calculateGestureDelta({
        pointerStart: pointerStart.current,
        currentPointer: { x: e.clientX, y: e.clientY },
        placement,
        mode: 'unidirectional',
      })

      if (isOrthogonalScroll) {
        isDragging.current = false
        return
      }

      if (offset > 0) {
        if (!e.currentTarget.hasPointerCapture(e.pointerId)) {
          e.currentTarget.setPointerCapture(e.pointerId)
        }
        setDragOffset(offset)
        lastOffset.current = offset
      }
    },
    [placement]
  )

  const handlePointerUpCapture = useCallback(
    (e: PointerEvent) => {
      if (!isDragging.current) return

      // Verify if travel distance equals or surpasses required dismiss threshold
      if (dragOffset >= threshold) {
        isClosingViaSwipe.current = true
        onDismiss()
      }

      resetSwipeState(e)
    },
    [dragOffset, threshold, onDismiss, resetSwipeState]
  )

  const handlePointerCancelCapture = useCallback((e: PointerEvent) => resetSwipeState(e), [resetSwipeState])

  const handleDragStartCapture = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      if (!allowSwipeOnContent) return
      // Block standard browser drag behaviors
      e.preventDefault()
    },
    [allowSwipeOnContent]
  )

  // Generate CSS transform strings mapped to placement orientation
  const style = useMemo((): CSSProperties => {
    // If open and not actively dragging, yield full control back to CSS classes
    if (open && dragOffset === 0) {
      return {}
    }

    const translateMap: Record<SurfacePlacement, string> = {
      bottom: `translateY(${dragOffset}px)`,
      top: `translateY(-${dragOffset}px)`,
      left: `translateX(-${dragOffset}px)`,
      right: `translateX(${dragOffset}px)`,
    }

    if (dragOffset === 0) {
      if (isClosingViaSwipe.current) {
        const offset = lastOffset.current
        const isNegativeOffset = placement === 'top' || placement === 'left'
        const translateValue = `${isNegativeOffset ? '-' : ''}${offset}px`
        const translateFunc = placement === 'left' || placement === 'right' ? 'translateX' : 'translateY'

        return {
          transform: `${translateFunc}(${translateValue})`,
          transformOrigin: placement,
          transitionProperty: 'translate, scale, transform, opacity',
        }
      }
      return {}
    }

    return {
      transform: translateMap[placement],
      transformOrigin: placement,
      transitionDuration: '0ms',
      transitionProperty: 'none',
    }
  }, [dragOffset, placement, open])

  const handlers = useMemo<SurfaceGestureHandlers>(
    () => ({
      onPointerDownCapture: handlePointerDownCapture,
      onPointerMoveCapture: handlePointerMoveCapture,
      onPointerUpCapture: handlePointerUpCapture,
      onPointerCancelCapture: handlePointerCancelCapture,
      onDragStartCapture: handleDragStartCapture,
    }),
    [
      handlePointerDownCapture,
      handlePointerMoveCapture,
      handlePointerUpCapture,
      handlePointerCancelCapture,
      handleDragStartCapture,
    ]
  )

  return {
    handlers,
    style,
    isDragging: isDragging.current && dragOffset !== 0,
    dragOffset,
  }
}
