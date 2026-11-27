import { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { describe, expect, it, vi } from 'vitest'
import { Label } from '../../../components/ui/Label'

describe('Label', () => {
  it('names and focuses the associated input through native label activation', async () => {
    const user = userEvent.setup()
    render(
      <>
        <Label htmlFor="email">Email</Label>
        <input id="email" type="email" />
      </>
    )
    expect(screen.getByText('Email').tagName).toBe('LABEL')
    await user.click(screen.getByText('Email'))
    expect(screen.getByRole('textbox', { name: 'Email' })).toHaveFocus()
  })

  it('supports nested controls and native keyboard interaction without another tab stop', async () => {
    const user = userEvent.setup()
    render(
      <Label>
        <input type="checkbox" /> Receive updates
      </Label>
    )
    const checkbox = screen.getByRole('checkbox', { name: 'Receive updates' })
    await user.tab()
    expect(checkbox).toHaveFocus()
    await user.keyboard(' ')
    expect(checkbox).toBeChecked()
    await user.click(screen.getByText('Receive updates'))
    expect(checkbox).not.toBeChecked()
    expect(screen.getByText('Receive updates')).not.toHaveAttribute('tabindex')
  })

  it('keeps the required marker out of the accessible name and preserves native validation', () => {
    render(
      <>
        <Label htmlFor="name" required>
          Name
        </Label>
        <input id="name" required />
      </>
    )
    expect(screen.getByText('*')).toHaveAttribute('aria-hidden', 'true')
    expect(screen.getByRole('textbox', { name: 'Name' })).toBeRequired()
    expect(screen.getByText('Name')).toHaveAttribute('data-required', 'true')
  })

  it('does not activate a disabled control', async () => {
    const user = userEvent.setup()
    render(
      <>
        <Label htmlFor="locked" disabled>
          Locked
        </Label>
        <input id="locked" type="checkbox" disabled />
      </>
    )
    await user.click(screen.getByText('Locked'))
    expect(screen.getByRole('checkbox')).not.toBeChecked()
    expect(screen.getByText('Locked')).toHaveClass('opacity-50', 'cursor-not-allowed')
    expect(screen.getByText('Locked')).not.toHaveAttribute('disabled')
  })

  it('forwards refs, native attributes, styles and event handlers', async () => {
    const ref = createRef<HTMLLabelElement>()
    const onClick = vi.fn()
    const user = userEvent.setup()
    render(
      <Label
        ref={ref}
        id="label"
        form="profile"
        title="Profile name"
        data-testid="label"
        style={{ marginTop: 12 }}
        onClick={onClick}
      >
        Profile
      </Label>
    )
    expect(ref.current).toBe(screen.getByTestId('label'))
    expect(ref.current).toHaveAttribute('form', 'profile')
    expect(ref.current).toHaveAttribute('title', 'Profile name')
    expect(ref.current).toHaveStyle({ marginTop: '12px' })
    await user.click(ref.current!)
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('updates optional states without leaving stale markers or attributes', () => {
    const { rerender } = render(
      <Label required disabled>
        Optional
      </Label>
    )
    rerender(<Label>Optional</Label>)
    expect(screen.queryByText('*')).not.toBeInTheDocument()
    expect(screen.getByText('Optional')).not.toHaveAttribute('data-required')
    expect(screen.getByText('Optional')).not.toHaveAttribute('data-disabled')
    expect(screen.getByText('Optional')).not.toHaveClass('opacity-50')
  })

  it.each([
    ['sm', 'text-xs'],
    ['md', 'text-(length:--lithos-label-size)'],
    ['lg', 'text-lg'],
  ] as const)('supports the %s size', (size, className) => {
    render(<Label size={size}>Size</Label>)
    expect(screen.getByText('Size')).toHaveClass(className)
  })

  it('allows consumer classes to override defaults and keeps theme colors in CSS', () => {
    render(<Label className={['text-xl', { 'normal-case': true }]}>Custom</Label>)
    const label = screen.getByText('Custom')
    expect(label).toHaveClass('text-xl', 'normal-case', 'text-(--lithos-text)')
    expect(label).not.toHaveClass('uppercase', 'text-(length:--lithos-label-size)')
    expect(label).not.toHaveAttribute('style')
  })

  it('supports an empty label without throwing', () => {
    const { container } = render(<Label />)
    expect(container.querySelector('label')).toBeEmptyDOMElement()
  })

  it('has no axe violations with required and disabled native controls', async () => {
    const { container } = render(
      <main>
        <Label htmlFor="accessible" required>
          Username
        </Label>
        <input id="accessible" required />
        <Label htmlFor="disabled" disabled>
          Account
        </Label>
        <input id="disabled" disabled />
      </main>
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
