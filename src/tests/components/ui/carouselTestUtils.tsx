import { render, type RenderOptions } from '@testing-library/react'
import type { ReactNode } from 'react'
import { vi } from 'vitest'
import { CarouselContext, type CarouselContextValue } from '../../../components/ui/carousel/useCarousel'

const createMockContext = (overrides?: Partial<CarouselContextValue>): CarouselContextValue => ({
  scroll: vi.fn(),
  currentIndex: 0,
  totalSlides: 3,
  mode: 'horizontal',
  containerRef: { current: null },
  handleScroll: vi.fn(),
  dragHandlers: {
    onPointerDown: () => {},
    onPointerMove: () => {},
    onPointerUp: () => {},
    onPointerCancel: () => {},
  },
  title: 'Test Carousel',
  loop: false,
  slideSelector: 'dots',
  showCounter: true,
  isPaused: false,
  playInfinite: false,
  vertical: false,
  bottomControls: false,
  registerSlide: vi.fn(() => vi.fn()),
  ...overrides,
})

export const renderWithContext = (
  ui: ReactNode,
  contextValue?: Partial<CarouselContextValue>,
  options?: Omit<RenderOptions, 'wrapper'>
) => {
  const value = createMockContext(contextValue)
  return render(<CarouselContext.Provider value={value}>{ui}</CarouselContext.Provider>, options)
}
