/**
 * @fileoverview Shared focus-trap behavior for overlay primitives (Dialog today, Popover/Select later).
 * - Cycles Tab/Shift+Tab within the container so focus can never escape to the page behind the overlay.
 * - Restores focus to the previously-focused element on deactivation, matching Toast's error-focus pattern.
 */
import { useEffect, type RefObject } from 'react'

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

export const useFocusTrap = (
  containerRef: RefObject<HTMLElement | null>,
  active: boolean,
  initialFocusRef?: RefObject<HTMLElement | null> | undefined
) => {
  useEffect(() => {
    if (!active) return

    const container = containerRef.current
    if (!container) return

    const previousFocus = document.activeElement as HTMLElement | null

    const getFocusable = () => Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))

    const toFocus = initialFocusRef?.current ?? getFocusable()[0] ?? container
    toFocus.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return

      const focusable = getFocusable()
      if (focusable.length === 0) {
        event.preventDefault()
        return
      }

      const first = focusable[0]!
      const last = focusable[focusable.length - 1]!
      const activeElement = document.activeElement

      if (event.shiftKey) {
        if (activeElement === first || !container.contains(activeElement)) {
          event.preventDefault()
          last.focus()
        }
      } else if (activeElement === last || !container.contains(activeElement)) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      if (previousFocus && typeof previousFocus.focus === 'function') {
        previousFocus.focus()
      }
    }
  }, [active, containerRef, initialFocusRef])
}
