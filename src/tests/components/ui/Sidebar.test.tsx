import { render, renderHook, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { describe, expect, it, vi } from 'vitest'
import { Sidebar, SidebarContent, SidebarItem, SidebarTrigger, useSidebar } from '../../../components/ui/Sidebar'

describe('useSidebar', () => {
  it('throws an error when used outside of Sidebar provider', () => {
    // Suppress console.error output during the expected throw
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    expect(() => renderHook(() => useSidebar())).toThrow('useSidebar must be used within <Sidebar>')

    consoleSpy.mockRestore()
  })

  it('returns default context values when wrapped inside Sidebar', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => <Sidebar>{children}</Sidebar>
    const { result } = renderHook(() => useSidebar(), { wrapper })

    expect(result.current.mode).toBe('permanent')
    expect(result.current.role).toBe('complementary')
    expect(result.current.open).toBe(true)
    expect(typeof result.current.setOpen).toBe('function')
  })
})

describe('Sidebar Components', () => {
  it('renders correctly with default props', () => {
    render(
      <Sidebar data-testid="sidebar-root">
        <SidebarContent data-testid="sidebar-content">
          <SidebarItem icon="🏠">Dashboard</SidebarItem>
        </SidebarContent>
      </Sidebar>
    )

    const root = screen.getByTestId('sidebar-root')
    const content = screen.getByTestId('sidebar-content')
    const item = screen.getByRole('button', { name: /dashboard/i })

    expect(root).toBeInTheDocument()
    // default 'complementary' role uses div
    expect(content.tagName.toLowerCase()).toBe('div')
    expect(item).toBeInTheDocument()
  })

  it('renders the correct container HTML element based on role', () => {
    const { rerender } = render(
      <Sidebar role="navigation">
        <SidebarContent data-testid="sidebar-content">Content</SidebarContent>
      </Sidebar>
    )

    expect(screen.getByTestId('sidebar-content').tagName.toLowerCase()).toBe('nav')

    rerender(
      <Sidebar role="region">
        <SidebarContent data-testid="sidebar-content">Content</SidebarContent>
      </Sidebar>
    )

    expect(screen.getByTestId('sidebar-content').tagName.toLowerCase()).toBe('section')
  })

  it('toggles open state when trigger is clicked in mini mode', async () => {
    const user = userEvent.setup()

    render(
      <Sidebar mode="mini">
        <SidebarContent data-testid="sidebar-content">
          <SidebarTrigger data-testid="trigger" />
        </SidebarContent>
      </Sidebar>
    )

    const trigger = screen.getByTestId('trigger')
    const content = screen.getByTestId('sidebar-content')

    // Initial state (open = true) -> uses expandedWidth ('w-56')
    expect(content).toHaveClass('w-56')

    await user.click(trigger)

    waitFor(() => {
      // After click (open = false) -> uses collapsedWidth ('w-16')
      expect(content).toHaveClass('w-16')
    })
  })

  it('calls controlled setOpen when trigger is clicked', async () => {
    const user = userEvent.setup()
    const handleSetOpen = vi.fn()

    render(
      <Sidebar mode="mini" open={true} setOpen={handleSetOpen}>
        <SidebarContent>
          <SidebarTrigger data-testid="trigger" />
        </SidebarContent>
      </Sidebar>
    )

    await user.click(screen.getByTestId('trigger'))

    expect(handleSetOpen).toHaveBeenCalledTimes(1)
    expect(handleSetOpen).toHaveBeenCalledWith(false)
  })

  it('renders SidebarItem active state and handles clicks', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()

    render(
      <Sidebar>
        <SidebarContent>
          <SidebarItem active onClick={handleClick} icon="📦">
            Projects
          </SidebarItem>
        </SidebarContent>
      </Sidebar>
    )

    const button = screen.getByRole('button', { name: /projects/i })

    expect(button).toBeInTheDocument()
    await user.click(button)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('passes accessibility checks (jest-axe)', async () => {
    const { container } = render(
      <Sidebar role="navigation">
        <SidebarContent>
          <SidebarTrigger label="Toggle navigation" />
          <SidebarItem icon="🏠" active>
            Dashboard
          </SidebarItem>
          <SidebarItem icon="⚙️">Settings</SidebarItem>
        </SidebarContent>
      </Sidebar>
    )

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
