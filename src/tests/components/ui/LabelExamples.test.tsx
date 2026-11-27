import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { describe, expect, it } from 'vitest'
import { TextareaLabel } from '../../../docs/examples/label/textarea'
import { SelectLabel } from '../../../docs/examples/label/select'
import { SwitchLabel } from '../../../docs/examples/label/switch'
import { HelperTextLabel } from '../../../docs/examples/label/helperText'
import { ValidationLabel } from '../../../docs/examples/label/validation'
import { OptionalLabel } from '../../../docs/examples/label/optional'
import { IconLabel } from '../../../docs/examples/label/icon'
import { GroupLabel } from '../../../docs/examples/label/group'

describe('Label documentation examples', () => {
  it('focuses the textarea through its visible label', async () => {
    const user = userEvent.setup()
    render(<TextareaLabel />)
    await user.click(screen.getByText('Your message'))
    expect(screen.getByRole('textbox', { name: 'Your message' })).toHaveFocus()
  })

  it('names and opens the custom select through its label, then selects an option', async () => {
    const user = userEvent.setup()
    render(<SelectLabel />)
    const trigger = screen.getByRole('combobox', { name: 'Country' })
    await user.click(screen.getByText('Country'))
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    await user.click(await screen.findByRole('option', { name: 'Canada' }))
    expect(trigger).toHaveTextContent('Canada')
  })

  it('activates the switch by label and keyboard while preserving its accessible name', async () => {
    const user = userEvent.setup()
    render(<SwitchLabel />)
    const toggle = screen.getByRole('switch', { name: 'Notifications' })
    expect(toggle).toHaveAttribute('aria-checked', 'false')
    expect(toggle).not.toHaveAttribute('aria-pressed')
    await user.click(screen.getByText('Notifications'))
    expect(toggle).toHaveAttribute('aria-checked', 'true')
    expect(toggle).toHaveFocus()
    await user.keyboard(' ')
    expect(toggle).toHaveAttribute('aria-checked', 'false')
  })

  it('updates two visible switch labels independently while keeping their accessible names stable', async () => {
    const user = userEvent.setup()
    render(<SwitchLabel />)
    const notifications = screen.getByRole('switch', { name: 'Notifications' })
    const updates = screen.getByRole('switch', { name: 'Automatic updates' })
    const notificationLabel = screen.getByText('Notifications').closest('label')!
    const updatesLabel = screen.getByText('Automatic updates').closest('label')!
    expect(notificationLabel).toHaveTextContent('Notifications: Off')
    expect(updatesLabel).toHaveTextContent('Automatic updates: On')
    await user.click(notificationLabel)
    expect(notificationLabel).toHaveTextContent('Notifications: On')
    expect(notifications).toHaveAttribute('aria-checked', 'true')
    expect(updatesLabel).toHaveTextContent('Automatic updates: On')
    await user.click(updatesLabel)
    expect(updatesLabel).toHaveTextContent('Automatic updates: Off')
    expect(updates).toHaveAttribute('aria-checked', 'false')
    expect(notifications).toHaveAccessibleName('Notifications')
    expect(notifications).toHaveAttribute('aria-checked', 'true')
    expect(updates).toHaveAccessibleName('Automatic updates')
  })

  it('renders the icon label without a switch or state text', async () => {
    const { container } = render(<IconLabel />)
    const label = screen.getByText('Notifications')
    expect(label.tagName).toBe('LABEL')
    expect(label).toHaveTextContent(/^Notifications$/)
    expect(label.querySelector('svg')).toHaveAttribute('aria-hidden', 'true')
    expect(screen.queryByRole('switch')).not.toBeInTheDocument()
    expect(screen.queryByRole('checkbox')).not.toBeInTheDocument()
    expect(await axe(container)).toHaveNoViolations()
  })

  it('connects helper text as a description without replacing the field name', () => {
    render(<HelperTextLabel />)
    expect(screen.getByRole('textbox', { name: 'Username' })).toHaveAccessibleDescription(
      'Use the name you want others to see.'
    )
  })

  it('announces validation feedback and clears it when the field is corrected', async () => {
    const user = userEvent.setup()
    render(<ValidationLabel />)
    const input = screen.getByRole('textbox', { name: 'Full name' })
    await user.click(screen.getByRole('button', { name: 'Save profile' }))
    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(input).toHaveAccessibleDescription('* Required field Enter your full name.')
    expect(screen.getByRole('alert')).toHaveTextContent('Enter your full name.')
    await user.type(input, 'Alex Morgan')
    await user.click(screen.getByRole('button', { name: 'Save profile' }))
    expect(input).toHaveAttribute('aria-invalid', 'false')
    expect(input).toHaveAccessibleDescription('* Required field')
    expect(screen.getByRole('alert')).toBeEmptyDOMElement()
  })

  it('keeps optional fields optional and groups controls under a legend', async () => {
    const user = userEvent.setup()
    render(
      <>
        <OptionalLabel />
        <GroupLabel />
      </>
    )
    expect(screen.getByRole('textbox', { name: 'Phone number (optional)' })).not.toBeRequired()
    expect(screen.getByRole('group', { name: 'Contact preferences' })).toBeInTheDocument()
    await user.click(screen.getByText('SMS updates'))
    expect(screen.getByRole('checkbox', { name: 'SMS updates' })).toBeChecked()
    expect(screen.getByRole('checkbox', { name: 'Email updates' })).not.toBeChecked()
  })

  it('uses unique control IDs across repeated examples and passes axe checks', async () => {
    const { container } = render(
      <main>
        <TextareaLabel />
        <TextareaLabel />
        <SelectLabel />
        <SwitchLabel />
        <HelperTextLabel />
        <ValidationLabel />
        <OptionalLabel />
        <GroupLabel />
      </main>
    )
    const ids = Array.from(container.querySelectorAll('[id]'), (element) => element.id)
    expect(new Set(ids).size).toBe(ids.length)
    expect(await axe(container)).toHaveNoViolations()
  })
})
