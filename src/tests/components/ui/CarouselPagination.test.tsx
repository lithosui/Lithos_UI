import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { describe, it, expect, vi } from 'vitest'
import { CarouselPagination } from '../../../components/ui/carousel/CarouselPagination'
import { renderWithContext } from './carouselTestUtils'

describe('CarouselPagination', () => {
  it('renders correct number of pagination dots by default', () => {
    renderWithContext(<CarouselPagination />, { totalSlides: 5 })

    const buttons = screen.getAllByRole('button', { hidden: true })
    expect(buttons).toHaveLength(5)
  })

  it('marks current active slide with aria-current="true"', () => {
    renderWithContext(<CarouselPagination />, { currentIndex: 2, totalSlides: 5 })

    const activeButton = screen.getByRole('button', { name: 'Move to the slide 3' })
    expect(activeButton).toHaveAttribute('aria-current', 'true')
  })

  it('calls scroll function with correct target index on click', async () => {
    const user = userEvent.setup()
    const scrollMock = vi.fn()

    renderWithContext(<CarouselPagination />, {
      currentIndex: 0,
      totalSlides: 4,
      scroll: scrollMock,
    })

    const targetButton = screen.getByRole('button', { name: 'Move to the slide 3' })
    await user.click(targetButton)

    expect(scrollMock).toHaveBeenCalledTimes(1)
    expect(scrollMock).toHaveBeenCalledWith(2)
  })

  it('renders numeric indicators when sliderSelector is "numbers"', () => {
    renderWithContext(<CarouselPagination />, {
      currentIndex: 0,
      totalSlides: 3,
      slideSelector: 'numbers',
    })

    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('renders counter indicator when showCounter is true', () => {
    renderWithContext(<CarouselPagination />, {
      currentIndex: 1,
      totalSlides: 4,
      showCounter: true,
    })

    expect(screen.getByText('2/4')).toBeInTheDocument()
  })

  it('hides slides beyond range index +/- 2 from screen reader tree and keyboard focus', () => {
    const { container } = renderWithContext(<CarouselPagination />, {
      currentIndex: 0,
      totalSlides: 7,
    })

    // get the out-of-range index 5 slide (0 + 2 = 2)
    const hiddenButton = container.querySelector('button[aria-label="Move to the slide 6"]')

    expect(hiddenButton).not.toBeNull()
    expect(hiddenButton).toHaveAttribute('aria-hidden', 'true')
    expect(hiddenButton).toHaveAttribute('tabindex', '-1')
  })

  it('should have no accessibility violations', async () => {
    const { container } = renderWithContext(<CarouselPagination />, {
      currentIndex: 0,
      totalSlides: 3,
    })

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
