import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { describe, it, expect, vi } from 'vitest'

import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownGroup,
  DropdownSeparator,
  DropdownSub,
  useDropdownNavigation,
} from '../../../components/ui/Dropdown'

const TestDropdown = ({ onSelectProfile = vi.fn(), onSelectSettings = vi.fn(), disabledItem = false }) => (
  <Dropdown>
    <DropdownTrigger>Options</DropdownTrigger>
    <DropdownContent>
      <DropdownGroup label="User">
        <DropdownItem onClick={onSelectProfile}>Profile</DropdownItem>
        <DropdownItem disabled={disabledItem} onClick={onSelectSettings}>
          Settings
        </DropdownItem>
      </DropdownGroup>
      <DropdownSeparator />
      <DropdownSub trigger="More options">
        <DropdownItem onClick={vi.fn()}>Sub item 1</DropdownItem>
      </DropdownSub>
    </DropdownContent>
  </Dropdown>
)

describe('Dropdown Component Suite', () => {
  it('should pass accessibility (a11y) checks when open', async () => {
    const user = userEvent.setup()
    const { container } = render(<TestDropdown />)

    const trigger = screen.getByRole('button', { name: 'Options' })
    await user.click(trigger)

    const results = await axe(container, {
      rules: {
        // ignore the invisible focus guards of Floating UI
        'aria-command-name': { enabled: false },
      },
    })

    expect(results).toHaveNoViolations()
  })

  it('opens content on trigger click and displays menu items', async () => {
    const user = userEvent.setup()
    render(<TestDropdown />)

    expect(screen.queryByRole('menuitem', { name: 'Profile' })).not.toBeInTheDocument()

    const trigger = screen.getByRole('button', { name: 'Options' })
    await user.click(trigger)

    expect(screen.getByRole('menuitem', { name: 'Profile' })).toBeInTheDocument()
    expect(screen.getByRole('group', { name: 'User' })).toBeInTheDocument()
    expect(screen.getByRole('separator')).toBeInTheDocument()
  })

  it('executes onClick callback and closes menu when selecting a DropdownItem', async () => {
    const user = userEvent.setup()
    const handleSelect = vi.fn()
    render(<TestDropdown onSelectProfile={handleSelect} />)

    await user.click(screen.getByRole('button', { name: 'Options' }))

    const profileItem = screen.getByRole('menuitem', { name: 'Profile' })
    await user.click(profileItem)

    expect(handleSelect).toHaveBeenCalledTimes(1)
    expect(screen.queryByRole('menuitem', { name: 'Profile' })).not.toBeInTheDocument()
  })

  it('triggers DropdownItem action when pressing Enter key', async () => {
    const user = userEvent.setup()
    const handleSelect = vi.fn()
    render(<TestDropdown onSelectProfile={handleSelect} />)

    await user.click(screen.getByRole('button', { name: 'Options' }))

    const profileItem = screen.getByRole('menuitem', { name: 'Profile' })
    profileItem.focus()
    await user.keyboard('{Enter}')

    expect(handleSelect).toHaveBeenCalledTimes(1)
  })

  it('does not trigger callback nor close menu when clicking a disabled DropdownItem', async () => {
    const user = userEvent.setup()
    const handleSelect = vi.fn()
    render(<TestDropdown disabledItem onSelectSettings={handleSelect} />)

    await user.click(screen.getByRole('button', { name: 'Options' }))

    const disabledItem = screen.getByRole('menuitem', { name: 'Settings' })
    expect(disabledItem).toHaveAttribute('disabled')
    expect(disabledItem).toHaveAttribute('tabIndex', '-1')

    await user.click(disabledItem)

    expect(handleSelect).not.toHaveBeenCalled()
    expect(screen.getByRole('menuitem', { name: 'Settings' })).toBeInTheDocument()
  })

  it('opens submenu correctly when interacting with DropdownSub', async () => {
    const user = userEvent.setup()
    render(<TestDropdown />)

    await user.click(screen.getByRole('button', { name: 'Options' }))

    const subTrigger = screen.getByRole('menuitem', { name: 'More options' })
    expect(subTrigger).toHaveAttribute('aria-haspopup', 'menu')

    await user.click(subTrigger)

    expect(await screen.findByRole('menuitem', { name: 'Sub item 1' })).toBeInTheDocument()
  })

  it('throws a descriptive error when useDropdownNavigation is used outside DropdownContent', () => {
    const TestComponent = () => {
      useDropdownNavigation()
      return null
    }

    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})

    expect(() => render(<TestComponent />)).toThrow('useDropdownNavigation must be used within <DropdownContent>')

    consoleError.mockRestore()
  })

  it('navigates focus across menu items using ArrowDown, ArrowUp, Home, and End keys', async () => {
    const user = userEvent.setup()
    render(<TestDropdown />)

    await user.click(screen.getByRole('button', { name: 'Options' }))

    const profileItem = screen.getByRole('menuitem', { name: 'Profile' })
    const settingsItem = screen.getByRole('menuitem', { name: 'Settings' })
    const moreOptionsItem = screen.getByRole('menuitem', { name: 'More options' })

    // wait until the focus effect runs
    await waitFor(() => {
      expect(profileItem).toHaveFocus()
    })

    await user.keyboard('{ArrowDown}')
    expect(settingsItem).toHaveFocus()

    await user.keyboard('{End}')
    expect(moreOptionsItem).toHaveFocus()

    await user.keyboard('{Home}')
    expect(profileItem).toHaveFocus()
  })

  it('closes menu and shifts focus to the next element when pressing Tab key', async () => {
    const user = userEvent.setup()

    render(
      <div>
        <TestDropdown />
        <button type="button">Next element</button>
      </div>
    )

    const trigger = screen.getByRole('button', { name: 'Options' })
    const nextButton = screen.getByRole('button', { name: 'Next element' })

    await user.click(trigger)
    const profileItem = screen.getByRole('menuitem', { name: 'Profile' })
    await waitFor(() => {
      expect(profileItem).toHaveFocus()
    })

    await user.keyboard('{Tab}')
    await waitFor(() => {
      expect(screen.queryByRole('menuitem', { name: 'Profile' })).not.toBeInTheDocument()
      expect(trigger).toHaveFocus()
    })

    await user.tab()
    expect(nextButton).toHaveFocus()
  })
})
