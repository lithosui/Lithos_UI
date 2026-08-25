import { useState } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { describe, it, expect, vi } from 'vitest'
import { Checkbox, PlainCheckbox, CheckboxGroup } from '../../../components/ui/Checkbox'

describe('Checkbox', () => {
  it('renders unchecked by default', () => {
    render(<Checkbox label="Accept terms" />)
    expect(screen.getByRole('checkbox', { name: 'Accept terms' })).not.toBeChecked()
  })

  it('toggles on click when uncontrolled', async () => {
    const user = userEvent.setup()
    render(<Checkbox label="Subscribe" defaultChecked={false} />)
    const box = screen.getByRole('checkbox', { name: 'Subscribe' })
    await user.click(box)
    expect(box).toBeChecked()
  })

  it('fires onChange with the native event when clicked', async () => {
    const handleChange = vi.fn()
    const user = userEvent.setup()
    render(<Checkbox label="Newsletter" onChange={handleChange} />)
    await user.click(screen.getByRole('checkbox', { name: 'Newsletter' }))
    expect(handleChange).toHaveBeenCalledTimes(1)
  })

  it('respects a controlled checked prop', async () => {
    const Controlled = () => {
      const [checked, setChecked] = useState(false)
      return <Checkbox label="Controlled" checked={checked} onChange={(e) => setChecked(e.target.checked)} />
    }
    const user = userEvent.setup()
    render(<Controlled />)
    const box = screen.getByRole('checkbox', { name: 'Controlled' })
    expect(box).not.toBeChecked()
    await user.click(box)
    expect(box).toBeChecked()
  })

  it('does not toggle when disabled', async () => {
    const handleChange = vi.fn()
    const user = userEvent.setup()
    render(<Checkbox label="Locked" disabled onChange={handleChange} />)
    const box = screen.getByRole('checkbox', { name: 'Locked' })
    await user.click(box)
    expect(box).not.toBeChecked()
    expect(handleChange).not.toHaveBeenCalled()
    expect(box).toBeDisabled()
  })

  it('sets the native indeterminate DOM property', () => {
    render(<Checkbox label="Select all" indeterminate />)
    const box = screen.getByRole('checkbox', { name: 'Select all' }) as HTMLInputElement
    expect(box.indeterminate).toBe(true)
  })

  it('renders a description under the label', () => {
    render(<Checkbox label="Marketing emails" description="Occasional product updates only." />)
    expect(screen.getByText('Occasional product updates only.')).toBeInTheDocument()
  })

  it('renders PlainCheckbox', () => {
    render(<PlainCheckbox label="Enable dark mode" defaultChecked />)
    expect(screen.getByRole('checkbox', { name: 'Enable dark mode' })).toBeChecked()
  })

  it('applies a custom hex color', () => {
    render(<Checkbox label="Custom color" color="#FF0033" defaultChecked />)
    expect(screen.getByRole('checkbox', { name: 'Custom color' })).toBeChecked()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<Checkbox label="Accessible checkbox" description="Helper text" />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})

describe('CheckboxGroup', () => {
  const Toppings = () => {
    const [value, setValue] = useState<string[]>(['cheese'])
    return (
      <CheckboxGroup value={value} onChange={setValue} label="Toppings">
        <Checkbox value="cheese" label="Cheese" />
        <Checkbox value="pepperoni" label="Pepperoni" />
        <Checkbox value="olives" label="Olives" />
      </CheckboxGroup>
    )
  }

  it('reflects the initial group value on the matching items', () => {
    render(<Toppings />)
    expect(screen.getByRole('checkbox', { name: 'Cheese' })).toBeChecked()
    expect(screen.getByRole('checkbox', { name: 'Pepperoni' })).not.toBeChecked()
  })

  it('adds a value to the array when an unchecked item is clicked', async () => {
    const user = userEvent.setup()
    render(<Toppings />)
    await user.click(screen.getByRole('checkbox', { name: 'Pepperoni' }))
    expect(screen.getByRole('checkbox', { name: 'Pepperoni' })).toBeChecked()
    expect(screen.getByRole('checkbox', { name: 'Cheese' })).toBeChecked()
  })

  it('removes a value from the array when a checked item is clicked', async () => {
    const user = userEvent.setup()
    render(<Toppings />)
    await user.click(screen.getByRole('checkbox', { name: 'Cheese' }))
    expect(screen.getByRole('checkbox', { name: 'Cheese' })).not.toBeChecked()
  })

  it('exposes the group as an ARIA group labelled by its heading', () => {
    render(<Toppings />)
    expect(screen.getByRole('group', { name: 'Toppings' })).toBeInTheDocument()
  })

  it('disables every item when the group is disabled', () => {
    render(
      <CheckboxGroup value={[]} onChange={() => {}} disabled>
        <Checkbox value="a" label="A" />
        <Checkbox value="b" label="B" />
      </CheckboxGroup>
    )
    expect(screen.getByRole('checkbox', { name: 'A' })).toBeDisabled()
    expect(screen.getByRole('checkbox', { name: 'B' })).toBeDisabled()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<Toppings />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
