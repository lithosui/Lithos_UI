import { render, screen, fireEvent, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { describe, it, expect, vi } from 'vitest'
import { Select, SelectTrigger, SelectContent, SelectItem } from '../../../components/ui/Select'

const mockOptions = [
  { label: 'Option 1', value: 'opt-1' },
  { label: 'Option 2', value: 'opt-2' },
  { label: 'Option 3', value: 'opt-3', disabled: true },
]

describe('Select Component', () => {
  it('should render trigger with placeholder by default', () => {
    render(<Select options={mockOptions} placeholder="Choose option" />)
    expect(screen.getByRole('button')).toHaveTextContent('Choose option')
  })

  it('should render trigger with default value if provided', () => {
    render(<Select options={mockOptions} defaultValue="opt-2" />)
    expect(screen.getByRole('button')).toHaveTextContent('Option 2')
  })

  it('should open dropdown menu when clicking trigger', async () => {
    const user = userEvent.setup()
    render(<Select options={mockOptions} />)

    const trigger = screen.getByRole('button')
    await user.click(trigger)

    expect(screen.getByRole('listbox')).toBeInTheDocument()
    expect(screen.getAllByRole('option')).toHaveLength(3)
  })

  it('should select option on click and close menu in uncontrolled mode', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    render(<Select options={mockOptions} onChange={onChange} />)

    const trigger = screen.getByRole('button')
    await user.click(trigger)

    const option2 = screen.getByRole('option', { name: 'Option 2' })
    await user.click(option2)

    expect(onChange).toHaveBeenCalledWith('opt-2', expect.anything())
    expect(trigger).toHaveTextContent('Option 2')
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })

  it('should work correctly in controlled mode', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    const { rerender } = render(<Select options={mockOptions} value="opt-1" onChange={onChange} />)

    const trigger = screen.getByRole('button')
    expect(trigger).toHaveTextContent('Option 1')

    await user.click(trigger)
    await user.click(screen.getByRole('option', { name: 'Option 2' }))

    expect(onChange).toHaveBeenCalledWith('opt-2', expect.anything())
    expect(trigger).toHaveTextContent('Option 1')

    rerender(<Select options={mockOptions} value="opt-2" onChange={onChange} />)
    expect(trigger).toHaveTextContent('Option 2')
  })

  it('should not allow selecting disabled options', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    render(<Select options={mockOptions} onChange={onChange} />)

    await user.click(screen.getByRole('button'))
    const disabledOption = screen.getByRole('option', { name: 'Option 3' })

    await user.click(disabledOption)
    expect(onChange).not.toHaveBeenCalled()
    expect(screen.getByRole('listbox')).toBeInTheDocument()
  })

  it('should support custom subcomponents composition', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    render(
      <Select value="val-2" onChange={onChange}>
        <SelectTrigger>Custom Trigger</SelectTrigger>
        <SelectContent>
          <SelectItem value="val-1">Item 1</SelectItem>
          <SelectItem value="val-2">Item 2</SelectItem>
        </SelectContent>
      </Select>
    )

    const trigger = screen.getByRole('button')
    expect(trigger).toHaveTextContent('Custom Trigger')

    await user.click(trigger)
    const item1 = screen.getByRole('option', { name: 'Item 1' })
    const item2 = screen.getByRole('option', { name: 'Item 2' })

    expect(item2).toHaveAttribute('aria-selected', 'true')
    await user.click(item1)
    expect(onChange).toHaveBeenCalledWith('val-1', expect.anything())
  })

  describe('Keyboard Navigation', () => {
    it('should navigate between options using arrow keys', async () => {
      const user = userEvent.setup()

      render(<Select options={mockOptions} />)
      const trigger = screen.getByRole('button')

      await user.click(trigger)
      const options = screen.getAllByRole('option')

      act(() => {
        fireEvent.keyDown(screen.getByRole('listbox'), { key: 'ArrowDown' })
      })
      expect(options[0]).toHaveAttribute('data-active', 'true')

      act(() => {
        fireEvent.keyDown(screen.getByRole('listbox'), { key: 'ArrowDown' })
      })
      expect(options[1]).toHaveAttribute('data-active', 'true')
    })

    it('should select active item when pressing Enter key', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()

      render(<Select options={mockOptions} onChange={onChange} />)
      await user.click(screen.getByRole('button'))

      const options = screen.getAllByRole('option')

      act(() => {
        fireEvent.keyDown(screen.getByRole('listbox'), { key: 'ArrowDown' })
      })

      expect(!!options[0]).toBe(true)
      act(() => {
        fireEvent.keyDown(options[0] as HTMLElement, { key: 'Enter' })
      })

      expect(onChange).toHaveBeenCalledWith('opt-1', expect.anything())
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
    })

    it('should close dropdown when pressing Escape key', async () => {
      const user = userEvent.setup()

      render(<Select options={mockOptions} />)
      const trigger = screen.getByRole('button')

      await user.click(trigger)
      expect(screen.getByRole('listbox')).toBeInTheDocument()

      act(() => {
        fireEvent.keyDown(document.body, { key: 'Escape' })
      })

      expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
    })
  })

  describe('Multiple Selection', () => {
    it('should allow selecting multiple options and keep menu open', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()

      render(<Select options={mockOptions} multiple onChange={onChange} />)

      const trigger = screen.getByRole('button')
      await user.click(trigger)

      const option1 = screen.getByRole('option', { name: 'Option 1' })
      const option2 = screen.getByRole('option', { name: 'Option 2' })

      await user.click(option1)
      expect(onChange).toHaveBeenLastCalledWith(['opt-1'], expect.anything())
      expect(trigger).toHaveTextContent('Option 1')
      expect(screen.getByRole('listbox')).toBeInTheDocument()

      await user.click(option2)
      expect(onChange).toHaveBeenLastCalledWith(['opt-1', 'opt-2'], expect.anything())
      expect(trigger).toHaveTextContent('Option 1, Option 2')
      expect(screen.getByRole('listbox')).toBeInTheDocument()
    })

    it('should deselect an already selected option in multiple mode', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()

      render(<Select options={mockOptions} multiple defaultValue={['opt-1', 'opt-2']} onChange={onChange} />)

      const trigger = screen.getByRole('button')
      expect(trigger).toHaveTextContent('Option 1, Option 2')

      await user.click(trigger)
      const option1 = screen.getByRole('option', { name: 'Option 1' })

      await user.click(option1)
      expect(onChange).toHaveBeenCalledWith(['opt-2'], expect.anything())
      expect(trigger).toHaveTextContent('Option 2')
    })

    it('should work correctly with multiple prop in controlled mode', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()

      const { rerender } = render(<Select options={mockOptions} multiple value={['opt-1']} onChange={onChange} />)

      const trigger = screen.getByRole('button')
      expect(trigger).toHaveTextContent('Option 1')

      await user.click(trigger)
      await user.click(screen.getByRole('option', { name: 'Option 2' }))

      expect(onChange).toHaveBeenCalledWith(['opt-1', 'opt-2'], expect.anything())
      expect(trigger).toHaveTextContent('Option 1')

      rerender(<Select options={mockOptions} multiple value={['opt-1', 'opt-2']} onChange={onChange} />)
      expect(trigger).toHaveTextContent('Option 1, Option 2')
    })
  })

  describe('Accessibility', () => {
    it('should have no accessibility violations when closed', async () => {
      const { container } = render(<Select options={mockOptions} />)

      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should have no accessibility violations when opened', async () => {
      const user = userEvent.setup()
      render(<Select options={mockOptions} />)

      await user.click(screen.getByRole('button'))

      const listbox = screen.getByRole('listbox')
      const results = await axe(listbox)

      expect(results).toHaveNoViolations()
    })
  })
})
