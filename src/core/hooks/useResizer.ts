/**
 * @fileoverview Hook to manage fluid layout width resizing, min/max clamping,
 * and snap-point alignment for sidebars, split views, and panels.
 */
import { useState, useRef, useCallback, useMemo, type PointerEvent, type DragEvent, type CSSProperties } from 'react'
import type { UseResizerOptions, UseResizerReturn, SurfaceGestureHandlers } from '../types'
import { calculateGestureDelta } from '../utils/gestureMath'

/**
 * Hook that manages fluid layout width resizing, min/max clamping,
 * and snap-point alignment for sidebars, split views, and panels.
 *
 * @param options - Configuration options provided as {@link UseResizerOptions}.
 * @returns An object containing gesture handlers, computed width styles, and state flags as {@link UseResizerReturn}.
 */
export const useResizer = ({
  placement,
  baseWidthPx = 224,
  minWidthPx = 64,
  maxWidthPx,
  snapPoints = [],
  allowGestureOnContent = true,
  onDrag,
  onSnap,
  onDismiss,
}: UseResizerOptions): UseResizerReturn => {
  const [dragOffset, setDragOffset] = useState(0)
  const pointerStart = useRef({ x: 0, y: 0 })
  const isDragging = useRef(false)

  // Derive absolute maximum boundary prioritizing explicit props or the highest snap breakpoint
  const resolvedMaxWidth = useMemo(() => {
    if (maxWidthPx !== undefined) return maxWidthPx
    if (snapPoints.length > 0) return snapPoints[snapPoints.length - 1] ?? 400

    return 400
  }, [maxWidthPx, snapPoints])

  // Release active pointer captures and reset internal state
  const resetState = useCallback((e: PointerEvent) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId)
    }
    isDragging.current = false
    setDragOffset(0)
  }, [])

  const handlePointerDownCapture = useCallback(
    (e: PointerEvent) => {
      // Prevent initiating gestures when clicking interactive HTML inputs/buttons
      let interactiveSelector = 'button, input, textarea, select, [role="button"]'
      if (!allowGestureOnContent) {
        interactiveSelector += ', a'
      }

      const target = e.target as HTMLElement
      if (target.closest(interactiveSelector)) return

      pointerStart.current = { x: e.clientX, y: e.clientY }
      isDragging.current = true
    },
    [allowGestureOnContent]
  )

  const handlePointerMoveCapture = useCallback(
    (e: PointerEvent) => {
      if (!isDragging.current) return

      // Calculate directional delta offset and discard orthogonal scrolling gestures
      const { offset, isOrthogonalScroll } = calculateGestureDelta({
        pointerStart: pointerStart.current,
        currentPointer: { x: e.clientX, y: e.clientY },
        placement,
        mode: 'bidirectional',
      })

      if (isOrthogonalScroll) {
        isDragging.current = false
        return
      }

      // Lock global pointer events to the container to sustain dragging beyond element bounds
      if (!e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.setPointerCapture(e.pointerId)
      }

      const rawWidth = baseWidthPx + offset
      const nextWidth = Math.min(resolvedMaxWidth, Math.max(minWidthPx, rawWidth))

      setDragOffset(offset)
      onDrag?.(nextWidth)
    },
    [placement, baseWidthPx, minWidthPx, onDrag, resolvedMaxWidth]
  )

  // Compute live current width clamped within min/max boundaries
  const computedWidth = useMemo(() => {
    const rawWidth = baseWidthPx + dragOffset
    const maxBound = resolvedMaxWidth ?? minWidthPx

    return Math.min(maxBound, Math.max(minWidthPx, rawWidth))
  }, [dragOffset, baseWidthPx, minWidthPx, resolvedMaxWidth])

  // Calculate closest snapping target breakpoint based on absolute distance
  const getNearestSnapPoint = useCallback(
    (currentWidth: number) => {
      if (snapPoints.length === 0) return currentWidth

      let closest = snapPoints[0] ?? currentWidth
      let minDiff = Math.abs(currentWidth - closest)

      for (const point of snapPoints) {
        const diff = Math.abs(currentWidth - point)

        if (diff < minDiff) {
          minDiff = diff
          closest = point
        }
      }

      return closest
    },
    [snapPoints]
  )

  const handlePointerUpCapture = useCallback(
    (e: PointerEvent) => {
      if (!isDragging.current) return

      const finalWidth = computedWidth

      // Handle snap point matching or trigger dismiss if width falls at or below threshold
      if (snapPoints.length > 0) {
        const snappedWidth = getNearestSnapPoint(finalWidth)
        onSnap?.(snappedWidth)

        if (snappedWidth <= minWidthPx) onDismiss?.()
      } else {
        if (finalWidth <= minWidthPx) onDismiss?.()
      }

      resetState(e)
    },
    [computedWidth, snapPoints, getNearestSnapPoint, onSnap, minWidthPx, onDismiss, resetState]
  )

  const handlePointerCancelCapture = useCallback((e: PointerEvent) => resetState(e), [resetState])

  const handleDragStartCapture = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      if (!allowGestureOnContent) return

      // Prevent native browser drag-and-drop interfering with pointer capture
      e.preventDefault()
    },
    [allowGestureOnContent]
  )

  // Generate dynamic width override styles during active dragging to disable transitions
  const style = useMemo((): CSSProperties => {
    if (isDragging.current && dragOffset !== 0) {
      return {
        width: `${computedWidth}px`,
        transitionDuration: '0ms',
        transitionProperty: 'none',
      }
    }
    return {}
  }, [computedWidth, dragOffset])

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
    currentWidth: computedWidth,
  }
}
