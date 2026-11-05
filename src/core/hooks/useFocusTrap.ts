/**
 * @fileoverview Shared focus-trap behavior for overlay primitives.
 * - Cycles Tab/Shift+Tab within the container so focus can never escape to the page behind the overlay.
 * - Restores focus to the previously-focused element on deactivation, matching Toast's error-focus pattern.
 */
import { useEffect, type RefObject } from 'react'

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

/** Options for the {@link useFocusTrap} hook. */
export interface FocusTrapOptions {
  /** Reference to the container element that traps the focus. */
  containerRef: RefObject<HTMLElement | null>

  /** Flag indicating whether the focus trap is currently active. */
  active: boolean

  /** Optional reference to the specific element that should receive initial focus upon activation. */
  initialFocusRef?: RefObject<HTMLElement | null>
}

/**
 * A hook that traps keyboard focus within a specified container element.
 *
 * - Cycles Tab/Shift+Tab within the container so focus can never escape to the background.
 * - Restores focus to the previously-focused element upon deactivation.
 *
 * @param options - Configuration options provided as {@link FocusTrapOptions}.
 */
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
