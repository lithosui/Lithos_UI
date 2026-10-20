import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useToast, ToastProvider, ToastItem } from '../../../components/ui/Toast'

const TestComponent = ({
  toastProps = { title: 'Toast toast', message: 'Test notification' },
}: {
  toastProps?: Parameters<ReturnType<typeof useToast>['addToast']>[0]
}) => {
  const { addToast, removeToast } = useToast()

  return (
    <div>
      <button type="button" onClick={() => addToast(toastProps)}>
        Trigger Toast
      </button>
      <button type="button" onClick={() => removeToast('custom-id')}>
        Manual Remove
      </button>
    </div>
  )
}

describe('Toast Component', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
  })

  afterEach(() => {
    vi.runOnlyPendingTimers()
    vi.useRealTimers()
  })

  it('renders children correctly', () => {
    render(
      <ToastProvider>
        <div>Application Content</div>
      </ToastProvider>
    )

    expect(screen.getByText('Application Content')).toBeInTheDocument()
  })

  it('throws an error when useToast is used outside of ToastProvider', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    expect(() => render(<TestComponent />)).toThrow('useToast must be used within a ToastProvider')

    consoleErrorSpy.mockRestore()
  })

  it('dispatches and displays a toast message when triggered', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })

    render(
      <ToastProvider>
        <TestComponent toastProps={{ title: 'Alert', message: 'Operation completed' }} />
      </ToastProvider>
    )

    await user.click(screen.getByRole('button', { name: 'Trigger Toast' }))

    expect(screen.getByText('Alert')).toBeInTheDocument()
    expect(screen.getByText('Operation completed')).toBeInTheDocument()
  })

  it('applies correct position classes to the stack container', () => {
    const { baseElement } = render(
      <ToastProvider position="top-left">
        <div>Content</div>
      </ToastProvider>
    )

    const stackContainer = baseElement.querySelector('.fixed')
    expect(stackContainer).toHaveClass('top-0', 'left-0')
  })

  it('dismisses toast automatically after default duration', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })

    render(
      <ToastProvider>
        <TestComponent toastProps={{ title: 'Transient title', message: 'Transient message' }} />
      </ToastProvider>
    )

    await user.click(screen.getByRole('button', { name: 'Trigger Toast' }))
    expect(screen.getByText('Transient message')).toBeInTheDocument()

    act(() => {
      vi.advanceTimersByTime(5000)
    })

    expect(screen.queryByText('Transient message')).not.toBeInTheDocument()
  })

  it('respects per-type duration configuration object', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })

    render(
      <ToastProvider duration={{ error: 8000, default: 3000 }}>
        <TestComponent toastProps={{ title: 'ERROR!', message: 'Error toast', intent: 'error' }} />
      </ToastProvider>
    )

    await user.click(screen.getByRole('button', { name: 'Trigger Toast' }))
    expect(screen.getByText('Error toast')).toBeInTheDocument()

    act(() => {
      vi.advanceTimersByTime(5000)
    })
    expect(screen.getByText('Error toast')).toBeInTheDocument()

    act(() => {
      vi.advanceTimersByTime(3000)
    })
    expect(screen.queryByText('Error toast')).not.toBeInTheDocument()
  })

  it('pauses auto-dismiss timer on mouse enter and resumes on mouse leave', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })

    render(
      <ToastProvider>
        <TestComponent toastProps={{ title: 'Hover me!', message: 'Hoverable toast' }} />
      </ToastProvider>
    )

    await user.click(screen.getByRole('button', { name: 'Trigger Toast' }))
    const toastElement = screen.getByText('Hoverable toast').closest('div[role]')!

    await user.hover(toastElement)

    act(() => {
      vi.advanceTimersByTime(6000)
    })
    expect(screen.getByText('Hoverable toast')).toBeInTheDocument()

    await user.unhover(toastElement)

    act(() => {
      vi.advanceTimersByTime(5000)
    })
    expect(screen.queryByText('Hoverable toast')).not.toBeInTheDocument()
  })

  it('removes toast when close button is clicked', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })

    render(
      <ToastProvider>
        <TestComponent toastProps={{ title: 'Click me!', message: 'Dismissible toast' }} />
      </ToastProvider>
    )

    await user.click(screen.getByRole('button', { name: 'Trigger Toast' }))
    expect(screen.getByText('Dismissible toast')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Close notification' }))

    expect(screen.queryByText('Dismissible toast')).not.toBeInTheDocument()
  })

  it('sets proper accessibility attributes for standard and error toasts', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })

    render(
      <ToastProvider>
        <TestComponent toastProps={{ title: 'Standard!', message: 'Standard status', intent: 'info' }} />
        <TestComponent toastProps={{ title: 'Critical!', message: 'Critical alert', intent: 'error' }} />
      </ToastProvider>
    )

    const buttons = screen.getAllByRole('button', { name: 'Trigger Toast' })
    expect(buttons).toHaveLength(2)

    await user.click(buttons[0]!)
    await user.click(buttons[1]!)

    const statusToast = screen.getByText('Standard status').closest('div[role="status"]')
    const alertToast = screen.getByText('Critical alert').closest('div[role="alert"]')

    expect(statusToast).toHaveAttribute('aria-live', 'polite')
    expect(alertToast).toHaveAttribute('aria-live', 'assertive')
  })

  it('focuses error toast tile on mount and restores previous focus on unmount', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })

    render(
      <ToastProvider>
        <TestComponent toastProps={{ title: 'Error!', message: 'Error occurred', intent: 'error' }} />
      </ToastProvider>
    )

    const triggerBtn = screen.getByRole('button', { name: 'Trigger Toast' })
    triggerBtn.focus()
    expect(triggerBtn).toHaveFocus()

    await user.click(triggerBtn)

    const errorToast = screen.getByText('Error occurred').closest('div[role="alert"]')!
    expect(errorToast).toHaveFocus()

    await user.click(screen.getByRole('button', { name: 'Close notification' }))

    expect(triggerBtn).toHaveFocus()
  })

  it('passes a11y audit without violations', async () => {
    const { container } = render(
      <ToastItem
        toast={{
          id: 'test-a11y',
          message: 'Accessible message',
          title: 'A11y Test',
          intent: 'default',
          duration: 5000,
        }}
        onRemove={vi.fn()}
      />
    )

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
