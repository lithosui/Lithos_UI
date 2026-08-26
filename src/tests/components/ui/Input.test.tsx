import { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { describe, it, expect } from 'vitest'
import { Input, InputGroup, InputGroupAddon, InputGroupInput } from '../../../components/ui/Input'
import { colors } from '../../../utils/colors'

describe('Input Component', () => {
  it('renders a native input element', () => {
    render(<Input placeholder="Enter your name" />)

    const input = screen.getByPlaceholderText('Enter your name')
    expect(input).toBeInTheDocument()
    expect(input).toBeInstanceOf(HTMLInputElement)
  })

  it('applies base brutalist styles', () => {
    render(<Input data-testid="input" />)

    const input = screen.getByTestId('input')
    expect(input).toHaveClass('border-2', 'px-3', 'py-2', 'text-sm', 'outline-none', 'font-bold')
  })

  it('forwards native attributes to the element', () => {
    render(<Input type="email" placeholder="you@example.com" />)

    const input = screen.getByPlaceholderText('you@example.com')
    expect(input).toHaveAttribute('type', 'email')
  })

  it('applies disabled styling, cursor-not-allowed, and drops hover transition when disabled', () => {
    const { rerender } = render(<Input data-testid="input" />)
    expect(screen.getByTestId('input')).toHaveClass('transition')

    rerender(<Input data-testid="input" disabled />)
    expect(screen.getByTestId('input')).toBeDisabled()
    expect(screen.getByTestId('input')).toHaveClass('opacity-50', 'cursor-not-allowed')
    expect(screen.getByTestId('input')).not.toHaveClass('transition')
  })

  it('applies the system error color when invalid is true', () => {
    render(<Input data-testid="input" invalid />)

    expect(screen.getByTestId('input')).toHaveStyle({ borderColor: colors.error })
  })

  it('keeps consumer inline styles while invalid forces only the border color', () => {
    render(<Input data-testid="input" invalid style={{ width: 200 }} />)

    expect(screen.getByTestId('input')).toHaveStyle({ borderColor: colors.error, width: '200px' })
  })

  it('merges additional custom classNames', () => {
    render(<Input data-testid="input" className="custom-class max-w-xs" />)

    expect(screen.getByTestId('input')).toHaveClass('custom-class', 'max-w-xs')
  })

  it('forwards ref to the underlying input element', () => {
    const ref = createRef<HTMLInputElement | null>()
    render(<Input ref={ref} />)

    expect(ref.current).toBeInstanceOf(HTMLInputElement)
  })

  it('renders at the correct size when size=sm', () => {
    render(<Input data-testid="input" size="sm" />)
    expect(screen.getByTestId('input')).toHaveClass('h-8', 'text-xs', 'px-2', 'py-1')
  })

  it('renders at the correct size when size=md', () => {
    render(<Input data-testid="input" size="md" />)
    expect(screen.getByTestId('input')).toHaveClass('h-11', 'text-base', 'px-3', 'py-2.5')
  })

  it('renders at the correct size when size=lg', () => {
    render(<Input data-testid="input" size="lg" />)
    expect(screen.getByTestId('input')).toHaveClass('h-12', 'text-lg', 'px-4', 'py-3')
  })

  it('defaults to size=default with h-10', () => {
    render(<Input data-testid="input" />)
    expect(screen.getByTestId('input')).toHaveClass('h-10', 'text-sm', 'px-3', 'py-2')
  })

  it('should have no accessibility violations', async () => {
    const { container } = render(<Input aria-label="Username" />)

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})

describe('InputGroup Component', () => {
  it('renders a group container with the input inside', () => {
    render(
      <InputGroup data-testid="group">
        <InputGroupInput placeholder="Search..." />
      </InputGroup>
    )

    expect(screen.getByTestId('group')).toBeInTheDocument()
    expect(screen.getByTestId('group')).toHaveAttribute('role', 'group')
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument()
  })

  it('applies the brutalist frame styles to the group', () => {
    render(
      <InputGroup data-testid="group">
        <InputGroupInput />
      </InputGroup>
    )

    expect(screen.getByTestId('group')).toHaveClass(
      'border-2',
      'shadow-[2px_2px_0_0_var(--lithos-shadow)]',
      'focus-within:shadow-[4px_4px_0_0_var(--lithos-shadow)]',
      'overflow-hidden'
    )
  })

  it('strips the standalone input frame so the group owns the border', () => {
    render(
      <InputGroup>
        <InputGroupInput data-testid="input" />
      </InputGroup>
    )

    const input = screen.getByTestId('input')
    expect(input).toHaveClass('border-0', 'shadow-none', 'focus:shadow-none', 'flex-1')
    expect(input).not.toHaveClass('border-2')
  })

  it('pins the addon to the inline start edge by default with a divider', () => {
    render(
      <InputGroup>
        <InputGroupInput />
        <InputGroupAddon data-testid="addon">Icon</InputGroupAddon>
      </InputGroup>
    )

    const addon = screen.getByTestId('addon')
    expect(addon).toHaveClass('order-first', 'border-r-2')
    expect(addon).not.toHaveClass('order-last')
  })

  it('pins the addon to the inline end edge when align is inline-end', () => {
    render(
      <InputGroup>
        <InputGroupInput />
        <InputGroupAddon align="inline-end" data-testid="addon">
          12 results
        </InputGroupAddon>
      </InputGroup>
    )

    const addon = screen.getByTestId('addon')
    expect(addon).toHaveClass('order-last', 'border-l-2')
    expect(addon).not.toHaveClass('order-first')
  })

  it('renders addon content regardless of DOM order', () => {
    render(
      <InputGroup>
        <InputGroupInput placeholder="Search..." />
        <InputGroupAddon>Icon</InputGroupAddon>
        <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
      </InputGroup>
    )

    expect(screen.getByText('Icon')).toHaveClass('order-first')
    expect(screen.getByText('12 results')).toHaveClass('order-last')
  })

  it('forwards native input attributes through InputGroupInput', () => {
    render(
      <InputGroup>
        <InputGroupInput type="email" placeholder="you@example.com" disabled />
      </InputGroup>
    )

    const input = screen.getByPlaceholderText('you@example.com')
    expect(input).toHaveAttribute('type', 'email')
    expect(input).toBeDisabled()
  })

  it('merges custom classNames on every subcomponent', () => {
    render(
      <InputGroup data-testid="group" className="custom-group max-w-xs">
        <InputGroupInput data-testid="input" className="custom-input" />
        <InputGroupAddon data-testid="addon" className="custom-addon">
          A
        </InputGroupAddon>
      </InputGroup>
    )

    expect(screen.getByTestId('group')).toHaveClass('custom-group', 'max-w-xs')
    expect(screen.getByTestId('input')).toHaveClass('custom-input')
    expect(screen.getByTestId('addon')).toHaveClass('custom-addon')
  })

  it('forwards refs to each subcomponent root', () => {
    const groupRef = createRef<HTMLDivElement | null>()
    const addonRef = createRef<HTMLDivElement | null>()
    render(
      <InputGroup ref={groupRef}>
        <InputGroupInput />
        <InputGroupAddon ref={addonRef}>A</InputGroupAddon>
      </InputGroup>
    )

    expect(groupRef.current).toBeInstanceOf(HTMLDivElement)
    expect(addonRef.current).toBeInstanceOf(HTMLDivElement)
  })

  it('renders startAdornment on the inline start edge', () => {
    render(
      <InputGroup data-testid="group">
        <InputGroupInput placeholder="Search..." />
      </InputGroup>
    )

    const group = screen.getByTestId('group')
    expect(group.querySelector('span')).toBeNull()
  })

  it('renders endAdornment on the inline end edge when provided', () => {
    render(
      <InputGroup data-testid="group" startAdornment={<span data-testid="start-icon">🔍</span>}>
        <InputGroupInput placeholder="Search..." />
      </InputGroup>
    )

    const icon = screen.getByTestId('start-icon')
    expect(icon.parentElement).toHaveClass('border-r-2')
  })

  it('should have no accessibility violations', async () => {
    const { container } = render(
      <InputGroup aria-label="Search files">
        <InputGroupInput aria-label="Search" />
        <InputGroupAddon>Icon</InputGroupAddon>
      </InputGroup>
    )

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
