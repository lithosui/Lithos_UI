import { render as testRender, screen, fireEvent, waitFor } from '@testing-library/react'
import { axe } from 'jest-axe'
import { describe, it, expect, vi } from 'vitest'
import { Tooltip, TooltipTrigger, TooltipContent, type TooltipProps } from '../../../components/ui/Tooltip'
import { ThemeProvider } from '../../../core/ThemeProvider'

const render = (children: React.ReactNode) => testRender(<ThemeProvider>{children}</ThemeProvider>)

describe('Tooltip Component', () => {
  const renderTooltip = (props: Partial<TooltipProps> = {}) => {
    return render(
      <Tooltip {...props}>
        <TooltipTrigger>Hover me</TooltipTrigger>
        <TooltipContent>Tooltip content</TooltipContent>
      </Tooltip>
    )
  }

  it('renders trigger correctly', () => {
    renderTooltip()
    expect(screen.getByText('Hover me')).toBeInTheDocument()
  })

  it('shows tooltip content on hover', async () => {
    renderTooltip()

    // Content should not be visible initially
    expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument()

    // Hover over the trigger
    fireEvent.mouseEnter(screen.getByText('Hover me'))

    // Content should be visible after hover
    await waitFor(() => {
      expect(screen.getByText('Tooltip content')).toBeInTheDocument()
    })
  })

  it('hides tooltip content on mouse leave', async () => {
    renderTooltip()

    // Hover over the trigger
    fireEvent.mouseEnter(screen.getByText('Hover me'))

    // Content should be visible
    await waitFor(() => {
      expect(screen.getByText('Tooltip content')).toBeInTheDocument()
    })

    // Leave the trigger
    fireEvent.mouseLeave(screen.getByText('Hover me'))

    // Content should be hidden
    await waitFor(() => {
      expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument()
    })
  })

  it('shows tooltip content on focus', async () => {
    renderTooltip({ initialOpen: true })

    fireEvent.focus(screen.getByText('Hover me'))

    await waitFor(() => {
      expect(screen.getByText('Tooltip content')).toBeInTheDocument()
    })
  })

  it('supports initialOpen prop', () => {
    renderTooltip({ initialOpen: true })

    expect(screen.getByText('Tooltip content')).toBeInTheDocument()
  })

  it('supports controlled open state', () => {
    const handleOpenChange = vi.fn()
    const { rerender } = render(
      <ThemeProvider>
        <Tooltip open={true} onOpenChange={handleOpenChange}>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent>Tooltip content</TooltipContent>
        </Tooltip>
      </ThemeProvider>
    )

    expect(screen.getByText('Tooltip content')).toBeInTheDocument()

    rerender(
      <ThemeProvider>
        <Tooltip open={false} onOpenChange={handleOpenChange}>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent>Tooltip content</TooltipContent>
        </Tooltip>
      </ThemeProvider>
    )

    expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument()
  })

  it('applies variant styles correctly', () => {
    render(
      <Tooltip initialOpen={true}>
        <TooltipTrigger>Hover me</TooltipTrigger>
        <TooltipContent variant="primary">Tooltip content</TooltipContent>
      </Tooltip>
    )

    const content = screen.getByText('Tooltip content').closest('div')
    expect(content).toHaveClass('bg-(--lithos-accent)')
  })

  it('throws error when child components are used outside of Tooltip provider', () => {
    const spy = vi.spyOn(console, 'error')
    spy.mockImplementation(() => {}) // Suppress React error logs

    // TooltipTrigger and TooltipContent now uses the Popover components inside
    const shouldThrow = 'Popover components must be wrapped in <Popover />'

    expect(() => render(<TooltipTrigger>Hover me</TooltipTrigger>)).toThrow(shouldThrow)
    expect(() => render(<TooltipContent>Tooltip content</TooltipContent>)).toThrow(shouldThrow)

    spy.mockRestore()
  })

  it('should have no accessibility violations', async () => {
    const { container } = renderTooltip({ initialOpen: true })
    const results = await axe(container, {
      rules: {
        // ignore the invisible focus guards of Floating UI
        'aria-command-name': { enabled: false },
      },
    })
    expect(results).toHaveNoViolations()
  })
})
