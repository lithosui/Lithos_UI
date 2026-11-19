import { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { describe, expect, it, vi } from 'vitest'
import { Label } from '../../../components/ui/Label'
import { Input } from '../../../components/ui/Input'
import { BasicLabelExample } from '../../../docs/examples/label/basic'
import { RequiredLabelExample } from '../../../docs/examples/label/required'
import { DisabledLabelExample } from '../../../docs/examples/label/disabled'
import { LabelDescriptionExample } from '../../../docs/examples/label/description'
import { LabelTextareaExample } from '../../../docs/examples/label/textarea'
import { LabelCheckboxExample } from '../../../docs/examples/label/checkbox'
import { LabelSizesExample } from '../../../docs/examples/label/sizes'
import { LabelIconPlacementExample } from '../../../docs/examples/label/iconPlacement'

describe('Label', () => {
  it('keeps repeated fields uniquely associated with their own controls', async () => {
    render(
      <>
        <BasicLabelExample />
        <BasicLabelExample />
      </>
    )
    const inputs = screen.getAllByRole('textbox', { name: 'Name' })
    const labels = screen.getAllByText('Name')
    expect(inputs[0].id).not.toBe(inputs[1].id)
    const user = userEvent.setup()
    await user.click(labels[0])
    expect(inputs[0]).toHaveFocus()
    await user.click(labels[1])
    expect(inputs[1]).toHaveFocus()
  })

  it('names the associated control and preserves native focus and editing', async () => {
    render(<BasicLabelExample />)
    const user = userEvent.setup()
    const input = screen.getByRole('textbox', { name: 'Name' })
    await user.click(screen.getByText('Name'))
    expect(input).toHaveFocus()
    await user.keyboard('Ada')
    expect(input).toHaveValue('Ada')
  })

  it('supports native association with a nested input', async () => {
    render(
      <Label>
        Username
        <Input />
      </Label>
    )
    await userEvent.setup().click(screen.getByText('Username'))
    expect(screen.getByRole('textbox', { name: 'Username' })).toHaveFocus()
  })

  it('forwards native refs, attributes, handlers, and style overrides', async () => {
    const ref = createRef<HTMLLabelElement>()
    const onClick = vi.fn()
    render(
      <Label
        ref={ref}
        id="native-label"
        title="Account name"
        onClick={onClick}
        className="normal-case"
        style={{ marginTop: 8 }}
      >
        Name
      </Label>
    )
    const label = screen.getByText('Name').closest('label')
    expect(ref.current).toBe(label)
    expect(label).toHaveAttribute('id', 'native-label')
    expect(label).toHaveAttribute('title', 'Account name')
    expect(label).toHaveClass('normal-case')
    expect(label).not.toHaveClass('uppercase')
    expect(label).toHaveStyle({ marginTop: '8px' })
    await userEvent.setup().click(screen.getByText('Name'))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('leaves keyboard focus on the control rather than adding a tab stop', async () => {
    render(<BasicLabelExample />)
    await userEvent.setup().tab()
    expect(screen.getByRole('textbox', { name: 'Name' })).toHaveFocus()
  })

  it('keeps required indicators out of the accessible name and uses native validation', () => {
    render(<RequiredLabelExample />)
    const input = screen.getByRole('textbox', { name: 'Email' })
    expect(input).toBeRequired()
    expect(input).toBeInvalid()
    expect(screen.getByText('*')).toHaveAttribute('aria-hidden', 'true')
  })

  it('does not activate a disabled control', async () => {
    render(<DisabledLabelExample />)
    const input = screen.getByRole('textbox', { name: 'Account ID' })
    await userEvent.setup().click(screen.getByText('Account ID'))
    expect(input).toBeDisabled()
    expect(input).not.toHaveFocus()
  })

  it('connects helper text as a description without changing the name', () => {
    render(<LabelDescriptionExample />)
    expect(screen.getByRole('textbox', { name: 'Display name' })).toHaveAccessibleDescription(
      'This name appears on your profile.'
    )
  })

  it('activates associated checkboxes', async () => {
    render(<LabelCheckboxExample />)
    await userEvent.setup().click(screen.getByText('Send me updates'))
    expect(screen.getByRole('checkbox', { name: 'Send me updates' })).toBeChecked()
  })

  it('names and focuses a textarea', async () => {
    render(<LabelTextareaExample />)
    await userEvent.setup().click(screen.getByText('Message'))
    expect(screen.getByRole('textbox', { name: 'Message' })).toHaveFocus()
  })

  it.each(['left', 'top'] as const)(
    'keeps %s icons decorative while preserving control activation',
    async (iconPosition) => {
      render(
        <>
          <Label
            htmlFor="search"
            icon={<svg role="img" aria-label="Search icon" data-testid="icon" />}
            iconPosition={iconPosition}
          >
            Search
          </Label>
          <Input id="search" />
        </>
      )
      expect(screen.queryByRole('img')).not.toBeInTheDocument()
      await userEvent.setup().click(screen.getByTestId('icon'))
      expect(screen.getByRole('textbox', { name: 'Search' })).toHaveFocus()
    }
  )

  it('renders icon placement as cards with sample text', () => {
    render(<LabelIconPlacementExample />)
    expect(screen.getAllByText('Project overview')).toHaveLength(2)
    expect(screen.getAllByText('Keep your project notes, tasks, and updates together in one place.')).toHaveLength(2)
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument()
  })

  it('keeps every documented example accessible', async () => {
    const { container } = render(
      <main>
        <BasicLabelExample />
        <RequiredLabelExample />
        <DisabledLabelExample />
        <LabelDescriptionExample />
        <LabelTextareaExample />
        <LabelCheckboxExample />
        <LabelSizesExample />
        <LabelIconPlacementExample />
      </main>
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
