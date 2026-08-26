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

  it.each(['primary', 'secondary', 'accent', 'text'] as const)('renders the %s intent variant', (intent) => {
    render(<Button variant={intent}>Click me</Button>)
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
    render(
      <Button disabled onClick={handleClick}>
        Click me
      </Button>
    )
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    await user.click(button)
    expect(handleClick).not.toHaveBeenCalled()
  })

  it.each(['primary', 'secondary', 'accent', 'text'] as const)(
    'has no accessibility violations — %s intent',
    async (intent) => {
      const { container } = render(<Button variant={intent}>Accessible</Button>)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    }
  )

  it('renders icon-only with an accessible name from aria-label', async () => {
    render(
      <Button aria-label="Download">
        <span data-testid="icon">D</span>
      </Button>
    )
    const button = screen.getByRole('button', { name: 'Download' })
    expect(button).toContainElement(screen.getByTestId('icon'))
    const results = await axe(button)
    expect(results).toHaveNoViolations()
  })

  it('renders iconLeft before children', () => {
    render(<Button iconLeft={<span data-testid="icon-left">L</span>}>Click me</Button>)
    const button = screen.getByRole('button')
    const icon = screen.getByTestId('icon-left')
    expect(button).toContainElement(icon)
    expect(button.textContent).toBe('LClick me')
  })

  it('renders iconRight after children', () => {
    render(<Button iconRight={<span data-testid="icon-right">R</span>}>Click me</Button>)
    const button = screen.getByRole('button')
    const icon = screen.getByTestId('icon-right')
    expect(button).toContainElement(icon)
    expect(button.textContent).toBe('Click meR')
  })

  it('allows consumer to override border-radius via tailwind-merge (rounded-full)', () => {
    render(<Button className="rounded-full">Click me</Button>)
    const button = screen.getByRole('button')
    expect(button.className).toContain('rounded-full')
    expect(button.className).not.toContain('rounded-(--lithos-radius)')
  })

  it('passes id and other native props through to the root element', () => {
    render(
      <Button id="custom-id" data-testid="custom-button">
        Click me
      </Button>
    )
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('id', 'custom-id')
    expect(button).toHaveAttribute('data-testid', 'custom-button')
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

  it.each(['horizontal', 'vertical'] as const)('applies %s mode layout', (mode) => {
    render(
      <ButtonGroup mode={mode}>
        <Button>One</Button>
      </ButtonGroup>
    )
    const group = screen.getByRole('group')
    expect(group.className).toContain(mode === 'vertical' ? 'flex-col' : 'flex-row')
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

  it('passes className, id, and other native props through to the root element', () => {
    const { container } = render(
      <ButtonGroup className="custom-class" id="custom-id" data-testid="custom-group">
        <Button>One</Button>
      </ButtonGroup>
    )
    const root = container.firstElementChild
    expect(root).toHaveClass('custom-class')
    expect(root).toHaveAttribute('id', 'custom-id')
    expect(root).toHaveAttribute('data-testid', 'custom-group')
  })
})
