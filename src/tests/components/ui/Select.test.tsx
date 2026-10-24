import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { describe, it, expect, vi } from 'vitest'
import { flip, shift } from '@floating-ui/react'
import { Select, SelectTrigger, SelectContent, SelectItem } from '../../../components/ui/Select'

vi.mock('@floating-ui/react', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@floating-ui/react')>()
  return {
    ...actual,
    flip: vi.fn(actual.flip),
    shift: vi.fn(actual.shift),
  }
})

const mockOptions = [
  { label: 'Option 1', value: 'opt-1' },
  { label: 'Option 2', value: 'opt-2' },
  { label: 'Option 3', value: 'opt-3', disabled: true },
]

describe('Select Component', () => {
  it('should render trigger with placeholder by default', () => {
    render(<Select options={mockOptions} placeholder="Choose option" />)
    expect(screen.getByRole('combobox')).toHaveTextContent('Choose option')
  })

  it('should render trigger with default value if provided', () => {
    render(<Select options={mockOptions} defaultValue="opt-2" />)
    expect(screen.getByRole('combobox')).toHaveTextContent('Option 2')
  })

  it('should open dropdown menu when clicking trigger', async () => {
    const user = userEvent.setup()
    render(<Select options={mockOptions} />)

    const trigger = screen.getByRole('combobox')
    await user.click(trigger)

    expect(screen.getByRole('listbox')).toBeInTheDocument()
    expect(screen.getAllByRole('option')).toHaveLength(3)
  })

  it('should select option on click and close menu in uncontrolled mode', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    render(<Select options={mockOptions} onChange={onChange} />)

    const trigger = screen.getByRole('combobox')
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

    const trigger = screen.getByRole('combobox')
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

    await user.click(screen.getByRole('combobox'))
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
          <SelectItem value="val-1" index={0}>
            Item 1
          </SelectItem>
          <SelectItem value="val-2" index={1}>
            Item 2
          </SelectItem>
        </SelectContent>
      </Select>
    )

    const trigger = screen.getByRole('combobox')
    expect(trigger).toHaveTextContent('Custom Trigger')

    await user.click(trigger)
    const item1 = screen.getByRole('option', { name: 'Item 1' })
    const item2 = screen.getByRole('option', { name: 'Item 2' })

    expect(item2).toHaveAttribute('aria-selected', 'true')
    await user.click(item1)
    expect(onChange).toHaveBeenCalledWith('val-1', expect.anything())
  })

  it('inherits flip and shift middleware from the underlying Popover so the dropdown can reposition near a viewport edge', async () => {
    const user = userEvent.setup()
    render(<Select options={mockOptions} />)

    await user.click(screen.getByRole('combobox'))
    expect(screen.getByRole('listbox')).toBeInTheDocument()

    expect(flip).toHaveBeenCalled()
    expect(shift).toHaveBeenCalled()
  })

  describe('Keyboard Navigation', () => {
    it('should navigate between options using arrow keys', async () => {
      const user = userEvent.setup()

      render(<Select options={mockOptions} />)
      const trigger = screen.getByRole('combobox')

      await user.click(trigger)
      const options = screen.getAllByRole('option')

      await user.keyboard('{ArrowDown}')
      expect(options[1]).toHaveAttribute('data-active', 'true')

      // should not navigate to the disabled option
      await user.keyboard('{ArrowDown}')
      expect(options[2]).not.toHaveAttribute('data-active')
    })

    it('should select active item when pressing Enter key', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()

      render(<Select options={mockOptions} onChange={onChange} />)

      // (Floating UI positions the initial focus on the first option)
      await user.click(screen.getByRole('combobox'))
      await user.keyboard('{Enter}')

      expect(onChange).toHaveBeenCalledWith('opt-1', expect.anything())
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
    })

    it('should loop from last to first option when pressing ArrowDown at the end', async () => {
      const user = userEvent.setup()
      render(<Select options={mockOptions} />)
      const trigger = screen.getByRole('combobox')

      await user.click(trigger)
      const options = screen.getAllByRole('option')

      // opt-3 is disabled, so opt-2 (index 1) is the last enabled option
      await user.keyboard('{ArrowDown}') // -> index 1 (opt-2)
      expect(options[1]).toHaveAttribute('data-active', 'true')

      await user.keyboard('{ArrowDown}') // should loop back to index 0 (opt-1)
      expect(options[0]).toHaveAttribute('data-active', 'true')
    })

    it('should jump to first/last enabled option with Home/End', async () => {
      const user = userEvent.setup()
      render(<Select options={mockOptions} />)
      const trigger = screen.getByRole('combobox')

      await user.click(trigger)
      const options = screen.getAllByRole('option')

      await user.keyboard('{End}')
      expect(options[1]).toHaveAttribute('data-active', 'true') // last enabled = opt-2

      await user.keyboard('{Home}')
      expect(options[0]).toHaveAttribute('data-active', 'true') // first = opt-1
    })

    it('should close dropdown when pressing Escape key', async () => {
      const user = userEvent.setup()

      render(<Select options={mockOptions} />)
      const trigger = screen.getByRole('combobox')

      await user.click(trigger)
      expect(screen.getByRole('listbox')).toBeInTheDocument()

      await user.keyboard('{Escape}')

      expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
    })
  })

  describe('Multiple Selection', () => {
    it('should allow selecting multiple options and keep menu open', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()

      render(<Select options={mockOptions} multiple onChange={onChange} />)

      const trigger = screen.getByRole('combobox')
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

      const trigger = screen.getByRole('combobox')
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

      const trigger = screen.getByRole('combobox')
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
      const { container } = render(<Select options={mockOptions} aria-label="Select option" />)

      await user.click(screen.getByRole('combobox'))

      const results = await axe(container, {
        rules: {
          // ignore the invisible focus guards of Floating UI
          'aria-command-name': { enabled: false },
        },
      })

      expect(results).toHaveNoViolations()
    })
  })
})
