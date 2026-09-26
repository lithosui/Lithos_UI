import { useState, useRef, useCallback, useMemo, type PointerEvent, type DragEvent, type CSSProperties } from 'react'
import type { UseDrawerSwipeOptions, DrawerPlacement } from './drawer.types'

export const useDrawerSwipe = ({
  placement,
  open,
  onClose,
  threshold = 100,
  allowSwipeOnContent = true,
}: UseDrawerSwipeOptions) => {
  const [dragOffset, setDragOffset] = useState(0)
  const pointerStart = useRef({ x: 0, y: 0 })
  const isDragging = useRef(false)

  const lastOffset = useRef(0)
  const isClosingViaSwipe = useRef(false)

  if (open && isClosingViaSwipe.current && dragOffset === 0) {
    isClosingViaSwipe.current = false
    lastOffset.current = 0
  }

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

      const deltaY = e.clientY - pointerStart.current.y
      const deltaX = e.clientX - pointerStart.current.x

      const absX = Math.abs(deltaX)
      const absY = Math.abs(deltaY)

      if ((placement === 'left' || placement === 'right') && absY > absX) {
        isDragging.current = false
        return
      }

      if ((placement === 'top' || placement === 'bottom') && absX > absY) {
        isDragging.current = false
        return
      }

      let offset = 0

      if (placement === 'left' && deltaX < 0) {
        offset = absX
      } else if (placement === 'right' && deltaX > 0) {
        offset = deltaX
      } else if (placement === 'bottom' && deltaY > 0) {
        offset = deltaY
      } else if (placement === 'top' && deltaY < 0) {
        offset = absY
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

      if (dragOffset >= threshold) {
        isClosingViaSwipe.current = true
        onClose()
      }

      resetSwipeState(e)
    },
    [dragOffset, onClose, threshold, resetSwipeState]
  )

  const handlePointerCancelCapture = useCallback(
    (e: PointerEvent) => {
      resetSwipeState(e)
    },
    [resetSwipeState]
  )

  const handleDragStartCapture = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      if (!allowSwipeOnContent) return

      // prevent draggable elements elements to start the native drag-n-drop
      e.preventDefault()
    },
    [allowSwipeOnContent]
  )

  const getSwipeStyle = useCallback((): CSSProperties => {
    const translateMap: Record<DrawerPlacement, string> = {
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
  }, [dragOffset, placement])

  return useMemo(
    () => ({
      handlers: {
        onPointerDownCapture: handlePointerDownCapture,
        onPointerMoveCapture: handlePointerMoveCapture,
        onPointerUpCapture: handlePointerUpCapture,
        onPointerCancelCapture: handlePointerCancelCapture,
        onDragStartCapture: handleDragStartCapture,
      },
      style: getSwipeStyle(),
      isDragging: dragOffset > 0,
    }),
    [
      dragOffset,
      getSwipeStyle,
      handlePointerUpCapture,
      handlePointerDownCapture,
      handlePointerMoveCapture,
      handlePointerCancelCapture,
      handleDragStartCapture,
    ]
  )
}
