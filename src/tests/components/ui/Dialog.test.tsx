import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { describe, it, expect, vi } from 'vitest'
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
  CustomDialog,
} from '../../../components/ui/Dialog'
import { Button } from '../../../components/ui/Button'

const DialogHarness = ({
  onClose = vi.fn(),
  intent = undefined,
}: {
  onClose?: () => void
  intent?: 'error' | undefined
}) => {
  return (
    <Dialog open onClose={onClose} intent={intent}>
      <DialogHeader>
        <DialogTitle>Edit Profile</DialogTitle>
      </DialogHeader>
      <DialogBody>Body content</DialogBody>
      <DialogFooter>
        <Button variant="text" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={onClose}>Save</Button>
      </DialogFooter>
    </Dialog>
  )
}

describe('Dialog Component', () => {
  it('renders nothing when closed', () => {
    render(
      <Dialog open={false} onClose={vi.fn()}>
        <DialogBody>Hidden content</DialogBody>
      </Dialog>
    )

    expect(screen.queryByText('Hidden content')).not.toBeInTheDocument()
  })

  it('renders children and wires aria-labelledby to the title when open', () => {
    render(<DialogHarness />)

    const dialog = screen.getByRole('dialog')
    const title = screen.getByText('Edit Profile')

    expect(dialog).toHaveAttribute('aria-modal', 'true')
    expect(dialog).toHaveAttribute('aria-labelledby', title.id)
  })

  it('uses alertdialog role when intent is error', () => {
    render(<DialogHarness intent="error" />)

    expect(screen.getByRole('alertdialog')).toBeInTheDocument()
  })

  it('moves focus into the panel on open', () => {
    render(<DialogHarness />)

    expect(screen.getByRole('button', { name: 'Close dialog' })).toHaveFocus()
  })

  it('calls onClose on Escape', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()

    render(<DialogHarness onClose={onClose} />)
    await user.keyboard('{Escape}')

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('calls onClose on backdrop click', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()

    const { baseElement } = render(<DialogHarness onClose={onClose} />)
    await user.click(baseElement.querySelector('[aria-hidden="true"]')!)

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('calls onClose when the header close button is clicked', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()

    render(<DialogHarness onClose={onClose} />)
    await user.click(screen.getByRole('button', { name: 'Close dialog' }))

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('traps Tab focus within the panel', async () => {
    const user = userEvent.setup()

    render(<DialogHarness />)

    const closeButton = screen.getByRole('button', { name: 'Close dialog' })
    const cancelButton = screen.getByRole('button', { name: 'Cancel' })
    const saveButton = screen.getByRole('button', { name: 'Save' })

    expect(closeButton).toHaveFocus()

    await user.tab()
    expect(cancelButton).toHaveFocus()

    await user.tab()
    expect(saveButton).toHaveFocus()

    await user.tab()
    expect(closeButton).toHaveFocus()

    await user.tab({ shift: true })
    expect(saveButton).toHaveFocus()
  })

  it('restores focus to the trigger element on close', () => {
    const trigger = document.createElement('button')
    trigger.textContent = 'Open'
    document.body.appendChild(trigger)
    trigger.focus()
    expect(trigger).toHaveFocus()

    const { unmount } = render(<DialogHarness />)
    unmount()

    expect(trigger).toHaveFocus()
    trigger.remove()
  })

  it('passes a11y audit without violations', async () => {
    const { baseElement } = render(<DialogHarness />)

    const results = await axe(baseElement)
    expect(results).toHaveNoViolations()
  })

  it('applies the size max-width class', () => {
    render(
      <Dialog open onClose={vi.fn()} size="lg">
        <DialogBody>Content</DialogBody>
      </Dialog>
    )

    expect(screen.getByRole('dialog')).toHaveClass('max-w-2xl')
  })

  it('simple variant drops the hard shadow that default keeps', () => {
    const { rerender } = render(
      <Dialog open onClose={vi.fn()} variant="default">
        <DialogBody>Content</DialogBody>
      </Dialog>
    )
    expect(screen.getByRole('dialog').className).toMatch(/shadow-/)

    rerender(
      <Dialog open onClose={vi.fn()} variant="simple">
        <DialogBody>Content</DialogBody>
      </Dialog>
    )
    expect(screen.getByRole('dialog').className).not.toMatch(/shadow-/)
    expect(screen.getByRole('dialog').className).toMatch(/border-2/)
  })

  it('hides the close button when DialogHeader hideClose is set', () => {
    render(
      <Dialog open onClose={vi.fn()}>
        <DialogHeader hideClose>
          <DialogTitle>No Close Icon</DialogTitle>
        </DialogHeader>
        <DialogBody>Content</DialogBody>
      </Dialog>
    )

    expect(screen.queryByRole('button', { name: 'Close dialog' })).not.toBeInTheDocument()
  })
})
describe('CustomDialog Component', () => {
  it('calls onClose on Cancel and onAction (not onClose) on action click', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    const onAction = vi.fn()

    render(
      <CustomDialog
        open
        onClose={onClose}
        onAction={onAction}
        title="Delete Item"
        message="Are you sure?"
        actionLabel="Delete"
        offsetColor="#FF0000"
      />
    )

    await user.click(screen.getByRole('button', { name: 'Cancel' }))
    expect(onClose).toHaveBeenCalledTimes(1)
    expect(onAction).not.toHaveBeenCalled()

    await user.click(screen.getByRole('button', { name: 'Delete' }))
    expect(onAction).toHaveBeenCalledTimes(1)
    expect(onClose).toHaveBeenCalledTimes(1)
  })
})
