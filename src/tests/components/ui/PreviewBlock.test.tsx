import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { describe, it, expect, vi } from 'vitest'
import { PreviewBlock } from '../../../components/ui/PreviewBlock'

// Mock CodeViewer as it's not the subject under test
vi.mock('../../../components/ui/CodeViewer', () => ({
  CodeViewer: ({ code }: { code: string }) => <div data-testid="mock-code-viewer">{code}</div>,
}))

describe('PreviewBlock', () => {
  const defaultProps = {
    code: 'const a = 1;',
  }

  it('renders children in preview tab by default', () => {
    render(
      <PreviewBlock {...defaultProps}>
        <div data-testid="preview-content">Hello</div>
      </PreviewBlock>
    )
    expect(screen.getByTestId('preview-content')).toBeInTheDocument()
    expect(screen.queryByTestId('mock-code-viewer')).not.toBeInTheDocument()
  })

  it('switches to code tab when clicked', async () => {
    const user = userEvent.setup()
    render(
      <PreviewBlock {...defaultProps}>
        <div data-testid="preview-content">Hello</div>
      </PreviewBlock>
    )

    const codeBtn = screen.getByRole('button', { name: /code/i })
    await user.click(codeBtn)

    expect(screen.getByTestId('mock-code-viewer')).toBeInTheDocument()
    expect(screen.queryByTestId('preview-content')).not.toBeInTheDocument()
  })

  it('renders install guide when button is clicked', async () => {
    const user = userEvent.setup()
    const installGuide = <div data-testid="install-guide">npm install test</div>
    render(
      <PreviewBlock {...defaultProps} installGuide={installGuide}>
        Hello
      </PreviewBlock>
    )

    const installBtn = screen.getByRole('button', { name: /install/i })
    await user.click(installBtn)

    expect(screen.getByTestId('install-guide')).toBeInTheDocument()
  })

  it('renders iframe and breakpoint buttons when slug is provided', async () => {
    const user = userEvent.setup()
    render(
      <PreviewBlock {...defaultProps} slug="test-slug">
        Hello
      </PreviewBlock>
    )

    const iframe = screen.getByTitle('Block preview')
    expect(iframe).toBeInTheDocument()
    expect(iframe).toHaveAttribute('src', '/blocks/preview/test-slug')

    // Test breakpoint buttons
    const mobileBtn = screen.getByRole('button', { name: /mobile/i })
    const tabletBtn = screen.getByRole('button', { name: /tablet/i })
    const desktopBtn = screen.getByRole('button', { name: /desktop/i })

    expect(mobileBtn).toBeInTheDocument()
    expect(tabletBtn).toBeInTheDocument()
    expect(desktopBtn).toBeInTheDocument()

    // Default should be desktop width
    expect(iframe.parentElement).toHaveStyle({ width: '100%' })

    // Click mobile
    await user.click(mobileBtn)
    expect(iframe.parentElement).toHaveStyle({ width: '375px' })

    // Click tablet
    await user.click(tabletBtn)
    expect(iframe.parentElement).toHaveStyle({ width: '768px' })
  })

  it('renders github button if githubUrl is provided', async () => {
    const user = userEvent.setup()
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null)

    render(
      <PreviewBlock {...defaultProps} githubUrl="https://github.com/test">
        Hello
      </PreviewBlock>
    )
    const button = screen.getByRole('button', { name: /source/i })
    expect(button).toBeInTheDocument()

    await user.click(button)
    expect(openSpy).toHaveBeenCalledWith('https://github.com/test', '_blank')
    openSpy.mockRestore()
  })

  it('has zero accessibility violations', async () => {
    const { container } = render(<PreviewBlock {...defaultProps}>Test</PreviewBlock>)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
