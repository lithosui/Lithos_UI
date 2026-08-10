import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { describe, it, expect, vi } from 'vitest'
import { Alert } from '../../../components/ui/Alert'

describe('Alert', () => {
  it('renders the message', () => {
    render(<Alert>Structural review pending.</Alert>)
    expect(screen.getByRole('alert')).toHaveTextContent('Structural review pending.')
  })

  it('renders a title when provided', () => {
    render(<Alert title="Warning">Load tolerance nearing limit.</Alert>)
    expect(screen.getByText('Warning')).toBeInTheDocument()
  })

  it('omits the title block when not provided', () => {
    render(<Alert>Load tolerance nearing limit.</Alert>)
    expect(screen.queryByRole('heading')).not.toBeInTheDocument()
  })

  it.each(['default', 'success', 'error', 'warning', 'info', 'accent'] as const)(
    'renders the %s type',
    (type) => {
      render(<Alert type={type}>Message</Alert>)
      expect(screen.getByRole('alert')).toBeInTheDocument()
    }
  )

  it.each(['filled', 'outlined'] as const)('renders the %s variant', (variant) => {
    render(<Alert variant={variant}>Message</Alert>)
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it.each(['sm', 'md', 'lg'] as const)('renders the %s size', (size) => {
    render(<Alert size={size}>Message</Alert>)
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it('applies a custom hex color', () => {
    render(<Alert color="#FF0033">Message</Alert>)
    const alert = screen.getByRole('alert')
    expect(alert.getAttribute('style')).toContain('background-color: rgb(255, 0, 51)')
  })

  it('renders a close button and fires onClose when clicked', async () => {
    const handleClose = vi.fn()
    const user = userEvent.setup()
    render(
      <Alert title="Deployment failed" onClose={handleClose}>
        Build #482 failed structural checks.
      </Alert>
    )
    await user.click(screen.getByRole('button', { name: 'Close alert' }))
    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  it('renders an undo button and fires onUndo when clicked', async () => {
    const handleUndo = vi.fn()
    const user = userEvent.setup()
    render(
      <Alert title="Config changed" onUndo={handleUndo}>
        Timeout threshold updated to 30s.
      </Alert>
    )
    await user.click(screen.getByRole('button', { name: 'Undo' }))
    expect(handleUndo).toHaveBeenCalledTimes(1)
  })

  it('renders both close and undo buttons when both handlers are provided', () => {
    render(
      <Alert title="Config changed" onClose={() => {}} onUndo={() => {}}>
        Message
      </Alert>
    )
    expect(screen.getByRole('button', { name: 'Undo' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Close alert' })).toBeInTheDocument()
  })

  it('omits action buttons when no handlers are provided', () => {
    render(<Alert title="Info">Message</Alert>)
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it.each(['default', 'success', 'error', 'warning', 'info', 'accent'] as const)(
    'has no accessibility violations — %s type',
    async (type) => {
      const { container } = render(
        <Alert type={type} title="Accessible">
          Message
        </Alert>
      )
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    }
  )

  it('has no accessibility violations with close/undo actions', async () => {
    const { container } = render(
      <Alert title="Accessible" onClose={() => {}} onUndo={() => {}}>
        Message
      </Alert>
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
