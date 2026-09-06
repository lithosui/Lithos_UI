import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { describe, it, expect, vi } from 'vitest'
import { CarouselPrev, CarouselNext } from '../../../components/ui/carousel/CarouselButton'
import { renderWithContext } from './carouselTestUtils'

describe('CarouselButtons', () => {
  it('renders CarouselPrev and CarouselNext with default accessibility labels', () => {
    renderWithContext(
      <>
        <CarouselPrev />
        <CarouselNext />
      </>
    )

    expect(screen.getByRole('button', { name: 'Previous slide' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Next slide' })).toBeInTheDocument()
  })

  it('calls scroll function with correct direction when clicked', async () => {
    const user = userEvent.setup()
    const scrollMock = vi.fn()

    renderWithContext(
      <>
        <CarouselPrev />
        <CarouselNext />
      </>,
      { scroll: scrollMock }
    )

    const prevButton = screen.getByRole('button', { name: 'Previous slide' })
    const nextButton = screen.getByRole('button', { name: 'Next slide' })

    await user.click(prevButton)
    expect(scrollMock).toHaveBeenLastCalledWith('backwards')

    await user.click(nextButton)
    expect(scrollMock).toHaveBeenLastCalledWith('forwards')
    expect(scrollMock).toHaveBeenCalledTimes(2)
  })

  it('allows overriding the default label and passing custom onClick', async () => {
    const user = userEvent.setup()
    const customOnClick = vi.fn()
    const scrollMock = vi.fn()

    renderWithContext(<CarouselPrev label="Prev" onClick={customOnClick} />, { scroll: scrollMock })

    const customBtn = screen.getByRole('button', { name: 'Prev' })
    expect(customBtn).toBeInTheDocument()

    await user.click(customBtn)
    expect(customOnClick).toHaveBeenCalledTimes(1)
    expect(scrollMock).toHaveBeenCalledWith('backwards')
  })

  it('renders custom children instead of default arrow icons', () => {
    renderWithContext(<CarouselPrev>Custom Prev</CarouselPrev>)

    expect(screen.getByText('Custom Prev')).toBeInTheDocument()
  })

  it('should have no accessibility violations', async () => {
    const { container } = renderWithContext(
      <>
        <CarouselPrev />
        <CarouselNext />
      </>
    )

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
