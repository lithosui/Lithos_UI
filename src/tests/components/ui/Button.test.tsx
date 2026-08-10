import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { describe, it, expect, vi } from 'vitest'
import { Button, ButtonGroup } from '../../../components/ui/Button'

describe('Button', () => {
  it('renders with children', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  it('defaults to type="button" to prevent accidental form submission', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button')
  })

  it('respects an explicit type prop', () => {
    render(<Button type="submit">Submit</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit')
  })

  it.each(['primary', 'secondary', 'text'] as const)('renders the %s intent variant', (intent) => {
    render(<Button intent={intent}>Click me</Button>)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('applies full width styling when fullWidth is set', () => {
    render(<Button fullWidth>Click me</Button>)
    expect(screen.getByRole('button').className).toContain('w-full')
  })

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()
    render(<Button onClick={handleClick}>Click me</Button>)
    await user.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('is disabled and does not fire onClick when disabled', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()
    render(<Button disabled onClick={handleClick}>Click me</Button>)
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    await user.click(button)
    expect(handleClick).not.toHaveBeenCalled()
  })

  it.each(['primary', 'secondary', 'text'] as const)('has no accessibility violations — %s intent', async (intent) => {
    const { container } = render(<Button intent={intent}>Accessible</Button>)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('renders iconLeft before children', () => {
    render(
      <Button iconLeft={<span data-testid="icon-left">L</span>}>Click me</Button>
    )
    const button = screen.getByRole('button')
    const icon = screen.getByTestId('icon-left')
    expect(button).toContainElement(icon)
    expect(button.textContent).toBe('LClick me')
  })

  it('renders iconRight after children', () => {
    render(
      <Button iconRight={<span data-testid="icon-right">R</span>}>Click me</Button>
    )
    const button = screen.getByRole('button')
    const icon = screen.getByTestId('icon-right')
    expect(button).toContainElement(icon)
    expect(button.textContent).toBe('Click meR')
  })
})

describe('ButtonGroup', () => {
  it('renders children buttons', () => {
    render(
      <ButtonGroup>
        <Button>One</Button>
        <Button>Two</Button>
      </ButtonGroup>
    )
    expect(screen.getByRole('button', { name: 'One' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Two' })).toBeInTheDocument()
  })

  it('exposes a group role', () => {
    render(
      <ButtonGroup>
        <Button>One</Button>
      </ButtonGroup>
    )
    expect(screen.getByRole('group')).toBeInTheDocument()
  })

  it.each(['horizontal', 'vertical'] as const)('applies %s orientation layout', (orientation) => {
    render(
      <ButtonGroup orientation={orientation}>
        <Button>One</Button>
      </ButtonGroup>
    )
    const group = screen.getByRole('group')
    expect(group.className).toContain(orientation === 'vertical' ? 'flex-col' : 'flex-row')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <ButtonGroup>
        <Button>One</Button>
        <Button>Two</Button>
      </ButtonGroup>
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})