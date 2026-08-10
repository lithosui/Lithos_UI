import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Carousel } from '../../../components/ui/Carousel'
import { describe, it, expect } from 'vitest'

describe('CarouselSlide Accessibility', () => {
  it('applies correct ARIA attributes and inert state based on active slide', () => {
    render(
      <Carousel>
        <Carousel.Slide>Slide 1</Carousel.Slide>
        <Carousel.Slide>Slide 2</Carousel.Slide>
      </Carousel>
    )

    const slides = screen.getAllByRole('group', { hidden: true })

    // first slide must be active and interactive
    expect(slides[0]).toHaveAttribute('aria-hidden', 'false')
    expect(slides[0]).not.toHaveAttribute('inert')
    expect(slides[0]).toHaveAttribute('aria-label', '1 of 2')

    // second slide must be hidden to screen readers and inerted
    expect(slides[1]).toHaveAttribute('aria-hidden', 'true')
    expect(slides[1]).toHaveAttribute('inert')
    expect(slides[1]).toHaveAttribute('aria-label', '2 of 2')
  })

  it('updates slide accessibility attributes when navigating to next slide', async () => {
    const user = userEvent.setup()

    render(
      <Carousel>
        <Carousel.Slide>Slide 1</Carousel.Slide>
        <Carousel.Slide>Slide 2</Carousel.Slide>
      </Carousel>
    )

    const nextButton = screen.getByRole('button', { name: /next/i })
    await user.click(nextButton)

    const slides = screen.getAllByRole('group', { hidden: true })

    // first slide must be inerted and hidden
    expect(slides[0]).toHaveAttribute('aria-hidden', 'true')
    expect(slides[0]).toHaveAttribute('inert')

    // first slide must be the active slide
    expect(slides[1]).toHaveAttribute('aria-hidden', 'false')
    expect(slides[1]).not.toHaveAttribute('inert')
  })
})
