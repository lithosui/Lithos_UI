import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { describe, it, expect, vi, beforeEach } from 'vitest'

import { Drawer } from '../../../components/ui/drawer/Drawer'
import { useDrawer } from '../../../components/ui/drawer/useDrawer'
import { getDrawerClasses, getDuration } from '../../../components/ui/drawer/drawer.utils'

const axeOptions = {
  rules: {
    // ignore the invisible focus guards of Floating UI
    'aria-command-name': { enabled: false },
  },
}

const ConsumerComponent = () => {
  const { open, onOpenChange } = useDrawer()
  return (
    <div>
      <span data-testid="drawer-status">{open ? 'open' : 'closed'}</span>
      <button onClick={() => onOpenChange(false)}>Close from consumer</button>
    </div>
  )
}

describe('Drawer', () => {
  beforeEach(() => {
    document.body.style.overflow = ''

    if (!Element.prototype.setPointerCapture) {
      Element.prototype.setPointerCapture = vi.fn()
    }

    if (!Element.prototype.hasPointerCapture) {
      Element.prototype.hasPointerCapture = vi.fn()
    }

    if (!Element.prototype.releasePointerCapture) {
      Element.prototype.releasePointerCapture = vi.fn()
    }
  })

  describe('Accessibility (a11y)', () => {
    it('should pass accessibility tests when open in default mode', async () => {
      const { container } = render(
        <Drawer open onOpenChange={() => {}} aria-label="Settings panel">
          <p>Drawer Content</p>
        </Drawer>
      )
      const results = await axe(container, axeOptions)
      expect(results).toHaveNoViolations()
    })
  })

  describe('Default Mode Rendering & Interactions', () => {
    it('should render trigger and open drawer when trigger is clicked', async () => {
      const user = userEvent.setup()
      const handleOpenChange = vi.fn()

      render(
        <Drawer
          open={false}
          onOpenChange={handleOpenChange}
          aria-label="Test drawer with trigger"
          trigger={<button>Open Drawer</button>}
        >
          <p>Drawer Content</p>
        </Drawer>
      )

      const triggerBtn = screen.getByRole('button', { name: 'Open Drawer' })
      expect(triggerBtn).toBeInTheDocument()

      await user.click(triggerBtn)
      expect(handleOpenChange?.mock?.calls?.[0]?.[0]).toBe(true)
    })

    it('should trigger onOpenChange(false) when backdrop is clicked', async () => {
      const user = userEvent.setup()
      const handleOpenChange = vi.fn()

      render(
        <Drawer open onOpenChange={handleOpenChange} aria-label="Test drawer with backdrop">
          <p>Drawer Content</p>
        </Drawer>
      )

      const backdrop = document.querySelector('[aria-hidden="true"]')
      expect(backdrop).not.toBeNull()

      if (backdrop) {
        await user.click(backdrop)
        expect(handleOpenChange).toHaveBeenCalledWith(false)
      }
    })

    it('should modify body overflow style when open and clean up on unmount', () => {
      const { unmount, rerender } = render(
        <Drawer open onOpenChange={() => {}} aria-label="Overflow test drawer">
          Content
        </Drawer>
      )

      expect(document.body.style.overflow).toBe('hidden')

      rerender(
        <Drawer open={false} onOpenChange={() => {}} aria-label="Overflow test drawer">
          Content
        </Drawer>
      )
      expect(document.body.style.overflow).toBe('')

      rerender(
        <Drawer open onOpenChange={() => {}} aria-label="Overflow test drawer">
          Content
        </Drawer>
      )
      expect(document.body.style.overflow).toBe('hidden')

      unmount()
      expect(document.body.style.overflow).toBe('')
    })
  })

  describe('Lifecycle Callbacks', () => {
    it('should trigger onEnter when open changes to true and onExit when changes to false', () => {
      const handleEnter = vi.fn()
      const handleExit = vi.fn()

      const { rerender } = render(
        <Drawer
          open={false}
          onOpenChange={() => {}}
          aria-label="Lifecycle test drawer"
          onEnter={handleEnter}
          onExit={handleExit}
        >
          Content
        </Drawer>
      )

      expect(handleEnter).not.toHaveBeenCalled()
      expect(handleExit).not.toHaveBeenCalled()

      rerender(
        <Drawer
          open
          onOpenChange={() => {}}
          aria-label="Lifecycle test drawer"
          onEnter={handleEnter}
          onExit={handleExit}
        >
          Content
        </Drawer>
      )
      expect(handleEnter).toHaveBeenCalledTimes(1)
      expect(handleExit).not.toHaveBeenCalled()

      rerender(
        <Drawer
          open={false}
          onOpenChange={() => {}}
          aria-label="Lifecycle test drawer"
          onEnter={handleEnter}
          onExit={handleExit}
        >
          Content
        </Drawer>
      )
      expect(handleExit).toHaveBeenCalledTimes(1)
    })
  })

  describe('DrawerIndicator Integration', () => {
    it('should render indicator automatically on bottom placement', () => {
      render(
        <Drawer open placement="bottom" onOpenChange={() => {}} aria-label="Bottom drawer with indicator">
          Content
        </Drawer>
      )

      expect(screen.getByLabelText('Drag handle')).toBeInTheDocument()
    })

    it('should allow custom indicatorLabel prop', () => {
      render(
        <Drawer
          open
          placement="bottom"
          indicatorLabel="Custom handle label"
          onOpenChange={() => {}}
          aria-label="Bottom drawer with custom indicator"
        >
          Content
        </Drawer>
      )

      expect(screen.getByLabelText('Custom handle label')).toBeInTheDocument()
    })
  })

  describe('Swipe Gesture Handling', () => {
    it('should trigger onClose when dragged past threshold on bottom placement', () => {
      const handleOpenChange = vi.fn()

      render(
        <Drawer
          open
          placement="bottom"
          threshold={50}
          onOpenChange={handleOpenChange}
          aria-label="Swipeable bottom drawer"
        >
          <div>Swipeable Content</div>
        </Drawer>
      )

      const dialog = screen.getByRole('dialog')

      fireEvent.pointerDown(dialog, { clientX: 100, clientY: 100, pointerId: 1 })
      fireEvent.pointerMove(dialog, { clientX: 100, clientY: 180, pointerId: 1 })
      fireEvent.pointerUp(dialog, { pointerId: 1 })

      expect(handleOpenChange).toHaveBeenCalledWith(false)
    })

    it('should not trigger onClose when swipe delta is below threshold', () => {
      const handleOpenChange = vi.fn()

      render(
        <Drawer
          open
          placement="bottom"
          threshold={100}
          onOpenChange={handleOpenChange}
          aria-label="Swipeable bottom drawer"
        >
          <div>Swipeable Content</div>
        </Drawer>
      )

      const dialog = screen.getByRole('dialog')

      fireEvent.pointerDown(dialog, { clientX: 100, clientY: 100, pointerId: 1 })
      fireEvent.pointerMove(dialog, { clientX: 100, clientY: 130, pointerId: 1 })
      fireEvent.pointerUp(dialog, { pointerId: 1 })

      expect(handleOpenChange).not.toHaveBeenCalled()
    })
  })

  describe('useDrawer Hook Context', () => {
    it('should provide open state and onOpenChange callback through context', async () => {
      const user = userEvent.setup()
      const handleOpenChange = vi.fn()

      render(
        <Drawer open onOpenChange={handleOpenChange} aria-label="Context drawer">
          <ConsumerComponent />
        </Drawer>
      )

      expect(screen.getByTestId('drawer-status')).toHaveTextContent('open')

      await user.click(screen.getByRole('button', { name: 'Close from consumer' }))
      expect(handleOpenChange).toHaveBeenCalledWith(false)
    })

    it('should throw an error when useDrawer is used outside <Drawer>', () => {
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})

      expect(() => render(<ConsumerComponent />)).toThrow('useDrawer must be used within <Drawer>')

      consoleError.mockRestore()
    })
  })
})

describe('Drawer Utils', () => {
  describe('getTransitionClasses', () => {
    it('should return slide transition classes by default', () => {
      const classes = getDrawerClasses('slide', 'right')
      expect(classes).toContain('translate-x-full')
      expect(classes).toContain('data-[status=open]:translate-x-0')
    })

    it('should return fade transition classes', () => {
      const classes = getDrawerClasses('fade', 'left')
      expect(classes).toContain('opacity-0')
      expect(classes).toContain('data-[status=open]:opacity-100')
    })

    it('should return zoom transition classes with proper origin', () => {
      const classes = getDrawerClasses('zoom', 'bottom', 'center')
      expect(classes).toContain('scale-75')
      expect(classes).toContain('origin-center')
      expect(classes).toContain('data-[status=open]:scale-100')
    })
  })

  describe('getDuration', () => {
    it('should return single number if provided', () => {
      expect(getDuration(300, true)).toBe(300)
      expect(getDuration(300, false)).toBe(300)
    })

    it('should return correct object transition duration depending on open state', () => {
      const duration = { enter: 250, exit: 180 }
      expect(getDuration(duration, true)).toBe(250)
      expect(getDuration(duration, false)).toBe(180)
    })
  })
})
