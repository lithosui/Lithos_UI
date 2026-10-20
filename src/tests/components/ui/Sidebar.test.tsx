import { fireEvent, render, renderHook, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { describe, expect, it, vi, beforeAll } from 'vitest'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarItem,
  SidebarTitle,
  SidebarTrigger,
  useSidebar,
} from '../../../components/ui/Sidebar'

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
    expect(result.current.placement).toBe('left')
    expect(result.current.open).toBe(true)
    expect(result.current.breakpoints).toEqual([64, 128, 224])
    expect(result.current.activeWidth).toBe(224)
    expect(result.current.activeBreakpointIndex).toBe(2)
    expect(result.current.currentBreakpoint).toBe(224)
    expect(result.current.isDragging).toBe(false)
    expect(typeof result.current.setOpen).toBe('function')
  })

  it('calculates derived breakpoints correctly when collapsed (open = false)', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <Sidebar mode="mini" defaultOpen={false}>
        {children}
      </Sidebar>
    )
    const { result } = renderHook(() => useSidebar(), { wrapper })

    expect(result.current.open).toBe(false)
    expect(result.current.activeBreakpointIndex).toBe(-1)
    expect(result.current.currentBreakpoint).toBeNull()
  })

  it('sorts breakpoints array in ascending order', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <Sidebar breakpoints={[300, 100, 200]}>{children}</Sidebar>
    )
    const { result } = renderHook(() => useSidebar(), { wrapper })

    expect(result.current.breakpoints).toEqual([100, 200, 300])
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

    expect(content).toHaveStyle({ width: '224px' })

    await user.click(trigger)

    await waitFor(() => {
      expect(content).toHaveStyle({ width: '64px' })
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

  it('toggles open state via shortcut key (ctrl+b)', async () => {
    const handleSetOpen = vi.fn()

    render(
      <Sidebar mode="mini" open={true} setOpen={handleSetOpen}>
        <SidebarContent>
          <SidebarTrigger shortcutKey="ctrl+b" />
        </SidebarContent>
      </Sidebar>
    )

    fireEvent.keyDown(window, { key: 'b', ctrlKey: true })

    expect(handleSetOpen).toHaveBeenCalledTimes(1)
    expect(handleSetOpen).toHaveBeenCalledWith(false)
  })

  it('does not trigger shortcut key when typing inside an input', async () => {
    const handleSetOpen = vi.fn()

    render(
      <div>
        <input data-testid="test-input" />
        <Sidebar mode="mini" open={true} setOpen={handleSetOpen}>
          <SidebarContent>
            <SidebarTrigger shortcutKey="ctrl+b" />
          </SidebarContent>
        </Sidebar>
      </div>
    )

    const input = screen.getByTestId('test-input')
    input.focus()

    fireEvent.keyDown(input, { key: 'b', ctrlKey: true })

    expect(handleSetOpen).not.toHaveBeenCalled()
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

  it('renders polymorphic child using asChild on SidebarItem', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()

    render(
      <Sidebar>
        <SidebarContent>
          <SidebarItem asChild onClick={handleClick}>
            <a href="/settings">Settings Link</a>
          </SidebarItem>
        </SidebarContent>
      </Sidebar>
    )

    const link = screen.getByRole('link', { name: 'Settings Link' })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/settings')

    await user.click(link)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('hides SidebarTitle and adjusts SidebarHeader layout when collapsed', () => {
    const { rerender } = render(
      <Sidebar mode="mini" open={true}>
        <SidebarHeader data-testid="sidebar-header">
          <SidebarTitle data-testid="sidebar-title">Menu</SidebarTitle>
        </SidebarHeader>
      </Sidebar>
    )

    expect(screen.getByTestId('sidebar-title')).toBeInTheDocument()
    expect(screen.getByTestId('sidebar-header')).toHaveClass('justify-between')

    rerender(
      <Sidebar mode="mini" open={false}>
        <SidebarHeader data-testid="sidebar-header">
          <SidebarTitle data-testid="sidebar-title">Menu</SidebarTitle>
        </SidebarHeader>
      </Sidebar>
    )

    expect(screen.queryByTestId('sidebar-title')).not.toBeInTheDocument()
    expect(screen.getByTestId('sidebar-header')).toHaveClass('justify-center')
  })
})

describe('Sidebar Resizer & Gesture Interactivity', () => {
  beforeAll(() => {
    if (!Element.prototype.hasPointerCapture) {
      Element.prototype.hasPointerCapture = vi.fn().mockReturnValue(false)
    }
    if (!Element.prototype.setPointerCapture) {
      Element.prototype.setPointerCapture = vi.fn()
    }
    if (!Element.prototype.releasePointerCapture) {
      Element.prototype.releasePointerCapture = vi.fn()
    }
  })

  it('snaps width to the nearest breakpoint on pointer gesture finish', () => {
    const handleSetOpen = vi.fn()

    render(
      <Sidebar mode="mini" defaultOpen={true} setOpen={handleSetOpen} breakpoints={[64, 128, 224]}>
        <SidebarContent data-testid="sidebar-content">
          <div>Content</div>
        </SidebarContent>
      </Sidebar>
    )

    const content = screen.getByTestId('sidebar-content')

    // Simulate drag start (clientX = 224)
    fireEvent.pointerDown(content, { pointerId: 1, clientX: 224, clientY: 0 })

    // Simulate drag move (clientX = 135 -> dragOffset = 224 - 135 = 89 -> computedWidth = 224 - 89 = 135px)
    fireEvent.pointerMove(content, { pointerId: 1, clientX: 135, clientY: 0 })

    // Release gesture -> 135px snap to the closest breakpoint (128px)
    fireEvent.pointerUp(content, { pointerId: 1, clientX: 135, clientY: 0 })

    expect(content).toHaveStyle({ width: '128px' })
  })

  it('triggers dismiss (collapses) when snapped to or below minWidthPx boundary', () => {
    const handleSetOpen = vi.fn()

    render(
      <Sidebar mode="mini" defaultOpen={true} setOpen={handleSetOpen} breakpoints={[64, 128, 224]}>
        <SidebarContent data-testid="sidebar-content">
          <div>Content</div>
        </SidebarContent>
      </Sidebar>
    )

    const content = screen.getByTestId('sidebar-content')

    fireEvent.pointerDown(content, { clientX: 224, clientY: 0 })
    // Drag way left near or below min boundary 64px
    fireEvent.pointerMove(content, { clientX: 70, clientY: 0 })
    fireEvent.pointerUp(content, { clientX: 70, clientY: 0 })

    expect(handleSetOpen).toHaveBeenCalledWith(false)
  })

  it('disables gesture dragging when interacting with input elements inside content', () => {
    render(
      <Sidebar mode="mini" defaultOpen={true}>
        <SidebarContent data-testid="sidebar-content">
          <button data-testid="interactive-btn">Click me</button>
        </SidebarContent>
      </Sidebar>
    )

    const content = screen.getByTestId('sidebar-content')
    const button = screen.getByTestId('interactive-btn')

    // Initiate drag over interactive child element
    fireEvent.pointerDown(button, { clientX: 224, clientY: 0 })
    fireEvent.pointerMove(content, { clientX: 100, clientY: 0 })

    // Width should remain unchanged (224px)
    expect(content).toHaveStyle({ width: '224px' })
  })
})

describe('Sidebar Accessibility', () => {
  it('passes accessibility checks (jest-axe)', async () => {
    const { container } = render(
      <Sidebar role="navigation">
        <SidebarContent>
          <SidebarHeader>
            <SidebarTitle>App Header</SidebarTitle>
            <SidebarTrigger label="Toggle navigation" />
          </SidebarHeader>
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
