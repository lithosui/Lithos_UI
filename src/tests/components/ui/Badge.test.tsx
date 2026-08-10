import { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { describe, it, expect, vi } from 'vitest'
import { Badge } from '../../../components/ui/Badge'
import { colors } from '../../../utils/colors'

// Mock de las utilidades y hooks dependientes
vi.mock('../../../core/useTheme.ts', () => ({
  useTheme: () => ({
    accentColor: '#ff5722'
  })
}))

describe('Badge Component', () => {
  it('renders children correctly', () => {
    render(<Badge>New Feature</Badge>)

    expect(screen.getByText('New Feature')).toBeInTheDocument()
  })

  it('applies default variant and size styles correctly', () => {
    render(<Badge>Default Badge</Badge>)

    const badge = screen.getByText('Default Badge')
    expect(badge).toHaveClass('text-xs', 'px-1.75', 'uppercase', 'font-bold')
    expect(badge).toHaveStyle({
      backgroundColor: '#ffffff',
      color: '#000000'
    })
  })

  it('renders different size styles correctly', () => {
    const { rerender } = render(<Badge size="small">Small</Badge>)
    expect(screen.getByText('Small')).toHaveClass('text-[0.65rem]', 'px-1.5')

    rerender(<Badge size="medium">Medium</Badge>)
    expect(screen.getByText('Medium')).toHaveClass('text-sm', 'px-2')

    rerender(<Badge size="large">Large</Badge>)
    expect(screen.getByText('Large')).toHaveClass('text-lg', 'px-3')
  })

  it('resolves color for accent variant using useTheme accentColor', () => {
    render(<Badge variant="accent">Accent</Badge>)

    const badge = screen.getByText('Accent')

    // getYiqValue('#ff5722') -> 131.19 (the color should be #000000)
    expect(badge).toHaveStyle({
      backgroundColor: '#ff5722',
      color: '#000000'
    })
  })

  it('resolves color for predefined variants (e.g. success, error)', () => {
    const { rerender } = render(<Badge variant="success">Success</Badge>)
    expect(screen.getByText('Success')).toHaveStyle({ backgroundColor: colors.success })

    rerender(<Badge variant="error">Error</Badge>)
    expect(screen.getByText('Error')).toHaveStyle({ backgroundColor: colors.error })
  })

  it('prioritizes custom color prop over variant color', () => {
    render(<Badge variant="success" color="#000000">Custom Color</Badge>)

    const badge = screen.getByText('Custom Color')
    expect(badge).toHaveStyle({
      backgroundColor: '#000000',
      color: '#ffffff'
    })
  })

  it('merges additional custom classNames', () => {
    render(<Badge className="custom-class shadow-lg">Class Test</Badge>)

    const badge = screen.getByText('Class Test')
    expect(badge).toHaveClass('custom-class', 'shadow-lg')
  })

  it('forwards ref to the underlying div element', () => {
    const ref = createRef<HTMLDivElement | null>()
    render(<Badge ref={ref}>Ref Badge</Badge>)

    expect(ref.current).toBeInstanceOf(HTMLDivElement)
    expect(ref.current?.textContent).toBe('Ref Badge')
  })

  it('passes through extra HTML attributes', () => {
    render(<Badge data-testid="badge-element" id="badge-1">Extra Props</Badge>)

    const badge = screen.getByTestId('badge-element')
    expect(badge).toHaveAttribute('id', 'badge-1')
  })

  it('should have no accessibility violations', async () => {
    const { container } = render(<Badge>Accessible Badge</Badge>)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
