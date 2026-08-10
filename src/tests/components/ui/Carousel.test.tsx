import { render, screen, fireEvent, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { describe, it, expect, vi } from 'vitest'
import { Carousel } from '../../../components/ui/Carousel'

describe('Carousel', () => {
  it('renders with 2 children (slides)', () => {
    render(
      <Carousel>
        <Carousel.Slide>
          Slide 1
        </Carousel.Slide>
        <Carousel.Slide>
          Slide 2
        </Carousel.Slide>
      </Carousel>
    )

    const carousel = screen.getByRole('region', { name: /carousel/i })
    expect(carousel).toBeInTheDocument()

    const slides = screen.getAllByRole('group', { hidden: true })
    expect(slides.length).toBe(2)
  })

  it('renders controls and pagination by default', () => {
    render(
      <Carousel>
        <Carousel.Slide>
          Slide 1
        </Carousel.Slide>
        <Carousel.Slide>
          Slide 2
        </Carousel.Slide>
      </Carousel>
    )

    const carousel = screen.getByRole('region', { name: /carousel/i })
    expect(carousel).toBeInTheDocument()

    const prevButton = screen.getByRole('button', { name: /previous/i })
    const nextButton = screen.getByRole('button', { name: /next/i })

    expect(prevButton).toBeInTheDocument()
    expect(nextButton).toBeInTheDocument()

    // see if the live region is rendered
    const liveRegion = screen.getByText(/Slide 1 of 2/i)
    expect(liveRegion).toBeInTheDocument()
  })

  it('advances to the next slide and goes back on button clicks', async () => {
    const user = userEvent.setup()

    render(
      <Carousel>
        <Carousel.Slide>Slide 1</Carousel.Slide>
        <Carousel.Slide>Slide 2</Carousel.Slide>
        <Carousel.Slide>Slide 3</Carousel.Slide>
      </Carousel>
    )

    // initial state
    expect(screen.getByText('Slide 1 of 3')).toBeInTheDocument()

    // go to next slide
    const nextButton = screen.getByRole('button', { name: /next/i })
    await user.click(nextButton)

    expect(screen.getByText('Slide 2 of 3')).toBeInTheDocument()

    // go to prev slide
    const prevButton = screen.getByRole('button', { name: /previous/i })
    await user.click(prevButton)

    expect(screen.getByText('Slide 1 of 3')).toBeInTheDocument()
  })

  it('wraps around to the last slide when clicking previous on the first slide', async () => {
    const user = userEvent.setup()

    render(
      <Carousel>
        <Carousel.Slide>Slide 1</Carousel.Slide>
        <Carousel.Slide>Slide 2</Carousel.Slide>
        <Carousel.Slide>Slide 3</Carousel.Slide>
      </Carousel>
    )

    const prevButton = screen.getByRole('button', { name: /previous/i })
    await user.click(prevButton)

    expect(screen.getByText('Slide 3 of 3')).toBeInTheDocument()
  })

  it('navigates through slides using keyboard arrow keys', async () => {
    const user = userEvent.setup()

    render(
      <Carousel>
        <Carousel.Slide>Slide 1</Carousel.Slide>
        <Carousel.Slide>Slide 2</Carousel.Slide>
      </Carousel>
    )

    const carousel = screen.getByRole('region', { name: /carousel/i })

    // focus on the carousel container
    carousel.focus()
    expect(carousel).toHaveFocus()

    // go to the next slide using the keyboard
    await user.keyboard('{ArrowRight}')
    expect(screen.getByText('Slide 2 of 2')).toBeInTheDocument()

    // go to the prev slide using the keyboard
    await user.keyboard('{ArrowLeft}')
    expect(screen.getByText('Slide 1 of 2')).toBeInTheDocument()
  })

  it('hides controls and pagination when respective props are true', () => {
    render(
      <Carousel hideControls hidePagination>
        <Carousel.Slide>Slide 1</Carousel.Slide>
        <Carousel.Slide>Slide 2</Carousel.Slide>
      </Carousel>
    )

    // navigation buttons shouldn't render
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('rotates slides automatically when playInfinite is true', () => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
    const interval = 3000

    render(
      <Carousel playInfinite playInterval={interval}>
        <Carousel.Slide>Slide 1</Carousel.Slide>
        <Carousel.Slide>Slide 2</Carousel.Slide>
        <Carousel.Slide>Slide 3</Carousel.Slide>
      </Carousel>
    )

    expect(screen.getByText('Slide 1 of 3')).toBeInTheDocument()

    act(() => vi.advanceTimersByTime(interval))
    expect(screen.getByText('Slide 2 of 3')).toBeInTheDocument()

    act(() => vi.advanceTimersByTime(interval))
    expect(screen.getByText('Slide 3 of 3')).toBeInTheDocument()

    act(() => vi.advanceTimersByTime(interval))
    expect(screen.getByText('Slide 1 of 3')).toBeInTheDocument()

    vi.useRealTimers()
  })

  it('pauses infinite rotation on mouse enter and resumes on mouse leave', async () => {
    vi.useFakeTimers()
    const interval = 3000

    render(
      <Carousel playInfinite playInterval={interval} stopOnHover>
        <Carousel.Slide>Slide 1</Carousel.Slide>
        <Carousel.Slide>Slide 2</Carousel.Slide>
      </Carousel>
    )

    const carousel = screen.getByRole('region', { name: /carousel/i })

    fireEvent.mouseEnter(carousel)

    // shouldn't slide
    act(() => vi.advanceTimersByTime(interval))
    expect(screen.getByText('Slide 1 of 2')).toBeInTheDocument()

    // continue
    fireEvent.mouseLeave(carousel)

    // should slide
    act(() => vi.advanceTimersByTime(interval))
    expect(screen.getByText('Slide 2 of 2')).toBeInTheDocument()

    vi.useRealTimers()
  })

  it('pauses infinite rotation on focus and resumes on blur', () => {
    vi.useFakeTimers()
    const interval = 3000

    render(
      <Carousel playInfinite playInterval={interval} stopOnHover>
        <Carousel.Slide>Slide 1</Carousel.Slide>
        <Carousel.Slide>Slide 2</Carousel.Slide>
      </Carousel>
    )

    const carousel = screen.getByRole('region', { name: /carousel/i })

    fireEvent.focusIn(carousel)

    // shouldn't slide
    act(() => vi.advanceTimersByTime(interval))
    expect(screen.getByText('Slide 1 of 2')).toBeInTheDocument()

    fireEvent.focusOut(carousel)

    // should slide
    act(() => vi.advanceTimersByTime(interval))
    expect(screen.getByText('Slide 2 of 2')).toBeInTheDocument()

    vi.useRealTimers()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <Carousel title="Featured Gallery">
        <Carousel.Slide>Slide 1</Carousel.Slide>
        <Carousel.Slide>Slide 2</Carousel.Slide>
      </Carousel>
    )

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
