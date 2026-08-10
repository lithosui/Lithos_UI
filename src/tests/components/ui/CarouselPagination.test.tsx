import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { describe, it, expect, vi } from 'vitest'
import { CarouselPagination } from '../../../components/ui/carousel/CarouselPagination'

describe('CarouselPagination', () => {
  it('renders correct number of pagination dots by default', () => {
    render(<CarouselPagination index={0} slides={5} scroll={() => { }} />)

    const buttons = screen.getAllByRole('button', { hidden: true })
    expect(buttons).toHaveLength(5)
  })

  it('marks current active slide with aria-current="true"', () => {
    render(<CarouselPagination index={2} slides={5} scroll={() => { }} />)

    const activeButton = screen.getByRole('button', { name: 'Move to the slide 3' })
    expect(activeButton).toHaveAttribute('aria-current', 'true')
  })

  it('calls scroll function with correct target index on click', async () => {
    const user = userEvent.setup()
    const scrollMock = vi.fn()

    render(<CarouselPagination index={0} slides={4} scroll={scrollMock} />)

    const targetButton = screen.getByRole('button', { name: 'Move to the slide 3' })
    await user.click(targetButton)

    expect(scrollMock).toHaveBeenCalledTimes(1)
    expect(scrollMock).toHaveBeenCalledWith(2)
  })

  it('renders numeric indicators when sliderSelector is "numbers"', () => {
    render(
      <CarouselPagination
        index={0}
        slides={3}
        scroll={() => { }}
        sliderSelector="numbers"
      />
    )

    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('renders counter indicator when showCounter is true', () => {
    render(
      // don't add it as default value is true
      <CarouselPagination
        index={1}
        slides={4}
        scroll={() => { }}
      />
    )

    expect(screen.getByText('2/4')).toBeInTheDocument()
  })

  it('hides slides beyond range index +/- 2 from screen reader tree and keyboard focus', () => {
    const { container } = render(
      <CarouselPagination index={0} slides={7} scroll={() => { }} />
    )

    // get the out-of-range index 5 slide (0 + 2 = 2)
    const hiddenButton = container.querySelector(
      'button[aria-label="Move to the slide 6"]'
    )

    expect(hiddenButton).not.toBeNull()
    expect(hiddenButton).toHaveAttribute('aria-hidden', 'true')
    expect(hiddenButton).toHaveAttribute('tabindex', '-1')
  })

  it('should have no accessibility violations', async () => {
    const { container } = render(
      <CarouselPagination index={0} slides={3} scroll={() => { }} />
    )

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
