import { useEffect, useRef, type RefObject } from 'react'

/** Options for the {@link useIntersectionPrefetch} hook. */
export interface IntersectionPrefetchProps {
  /** A function returning a promise that loads the dynamic route or component chunk. */
  importRoute: () => Promise<unknown>

  /**
   * The margin around the root element to trigger the prefetch early.
   * @default '200px'
   * */
  rootMargin?: string | undefined
}

/**
 * Lithos UI Custom hook that prefetches a dynamic route or component chunk
 * when the target element enters or approaches the viewport using an IntersectionObserver.
 *
 * @template T - The HTML element type to attach the ref to (defaults to HTMLElement).
 * @param options - Configuration options provided as {@link IntersectionPrefetchProps}.
 * @returns A ref to be attached to the DOM element you want to observe.
 */
export const useIntersectionPrefetch = <T extends HTMLElement = HTMLElement>({
  importRoute,
  rootMargin = '200px',
}: IntersectionPrefetchProps): RefObject<T | null> => {
  const elementRef = useRef<T | null>(null)

  useEffect(() => {
    const target = elementRef.current
    if (!target) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          // Trigger the dynamic import chunk load
          importRoute()

          observer.disconnect()
        }
      },
      {
        rootMargin: rootMargin ?? '200px',
        threshold: 0.01,
      }
    )

    observer.observe(target)

    return () => {
      if (target) observer.unobserve(target)
    }
  }, [importRoute, rootMargin])

  return elementRef
}
