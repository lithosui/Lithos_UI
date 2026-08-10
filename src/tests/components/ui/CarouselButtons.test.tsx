import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { describe, it, expect, vi } from 'vitest'
import { CarouselProvider } from '../../../components/ui/carousel/CarouselContext'
import { CarouselPrev, CarouselNext } from '../../../components/ui/carousel/CarouselButton'

describe('CarouselButtons', () => {
  it('renders CarouselPrev and CarouselNext with default accessibility labels', () => {
    render(
      <CarouselProvider scroll={() => { }}>
        <CarouselPrev />
        <CarouselNext />
      </CarouselProvider>
    )

    expect(screen.getByRole('button', { name: 'Previous slide' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Next slide' })).toBeInTheDocument()
  })

  it('calls scroll function with correct direction when clicked', async () => {
    const user = userEvent.setup()
    const scrollMock = vi.fn()

    render(
      <CarouselProvider scroll={scrollMock}>
        <CarouselPrev />
        <CarouselNext />
      </CarouselProvider>
    )

    const prevButton = screen.getByRole('button', { name: 'Previous slide' })
    const nextButton = screen.getByRole('button', { name: 'Next slide' })

    await user.click(prevButton)
    expect(scrollMock).toHaveBeenLastCalledWith('prev')

    await user.click(nextButton)
    expect(scrollMock).toHaveBeenLastCalledWith('next')
    expect(scrollMock).toHaveBeenCalledTimes(2)
  })

  it('allows overriding the default label and passing custom onClick', async () => {
    const user = userEvent.setup()
    const customOnClick = vi.fn()
    const scrollMock = vi.fn()

    render(
      <CarouselProvider scroll={scrollMock}>
        <CarouselPrev label="Anterior" onClick={customOnClick} />
      </CarouselProvider>
    )

    const customBtn = screen.getByRole('button', { name: 'Anterior' })
    expect(customBtn).toBeInTheDocument()

    await user.click(customBtn)
    expect(customOnClick).toHaveBeenCalledTimes(1)
    expect(scrollMock).toHaveBeenCalledWith('prev')
  })

  it('renders custom children instead of default arrow icons', () => {
    render(
      <CarouselProvider scroll={() => { }}>
        <CarouselPrev>Custom Prev</CarouselPrev>
      </CarouselProvider>
    )

    expect(screen.getByText('Custom Prev')).toBeInTheDocument()
  })

  it('should have no accessibility violations', async () => {
    const { container } = render(
      <CarouselProvider scroll={() => { }}>
        <CarouselPrev />
        <CarouselNext />
      </CarouselProvider>
    )

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
