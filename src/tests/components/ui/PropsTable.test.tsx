import { fireEvent, render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { describe, it, expect } from 'vitest'
import { PropsTable, PropsAccordion } from '../../../components/ui/PropsTable'
import { ToastProvider } from '../../../components/ui/Toast'
import { ThemeProvider } from '../../../core/ThemeProvider'

const mockData = [
  {
    name: 'testProp',
    type: 'string',
    description: 'A test property',
  },
  {
    name: 'requiredProp',
    type: 'number',
    typeDefinition: 'number | undefined',
    required: true,
    defaultValue: '0',
    description: 'A required property',
  },
]

const renderWithProvider = (content: React.ReactElement) => {
  return render(
    <ThemeProvider>
      <ToastProvider>{content}</ToastProvider>
    </ThemeProvider>
  )
}

describe('PropsTable', () => {
  it('renders table headers', () => {
    renderWithProvider(<PropsTable data={mockData} />)
    expect(screen.getByText('Prop')).toBeInTheDocument()
    expect(screen.getByText('Type')).toBeInTheDocument()
    expect(screen.getByText('Default')).toBeInTheDocument()
    expect(screen.queryByText('Description')).not.toBeInTheDocument()
  })

  it('renders prop rows correctly', () => {
    renderWithProvider(<PropsTable data={mockData} />)
    expect(screen.getByText('testProp')).toBeInTheDocument()
    expect(screen.getByText('requiredProp')).toBeInTheDocument()
    expect(screen.queryByText('A test property')).not.toBeVisible()
    expect(screen.getByText('A required property')).toBeVisible()

    const codeViewer = document.querySelector('[data-code-viewer]')
    const renderedText = codeViewer?.textContent
    expect(renderedText).toBe('number | undefined')
  })

  it('allows required prop details to be collapsed and expanded', () => {
    renderWithProvider(<PropsTable data={mockData} />)
    const toggle = screen.getByRole('button', { name: 'Toggle requiredProp details' })

    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    fireEvent.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByText('A required property')).not.toBeVisible()

    fireEvent.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByText('A required property')).toBeVisible()

    const codeViewer = document.querySelector('[data-code-viewer]')
    const renderedText = codeViewer?.textContent
    expect(renderedText).toBe('number | undefined')
  })

  it('shows required indicator', () => {
    renderWithProvider(<PropsTable data={mockData} />)
    expect(screen.getByTitle('Required')).toBeInTheDocument()
    expect(screen.getByTitle('Optional')).toBeInTheDocument()
  })

  it('has zero accessibility violations', async () => {
    const { container } = renderWithProvider(<PropsTable data={mockData} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})

describe('PropsAccordion', () => {
  it('renders accordion with title', () => {
    renderWithProvider(<PropsAccordion title="Component Props" data={mockData} />)
    expect(screen.getByText('Component Props')).toBeInTheDocument()
    expect(screen.getByText('testProp')).toBeInTheDocument()
  })

  it('marks hook accordions with a badge and hides optional labels', () => {
    renderWithProvider(<PropsAccordion title="Hook return" data={mockData} isHook />)
    expect(screen.getByText('Hook')).toBeInTheDocument()
    expect(screen.queryByTitle('Optional')).not.toBeInTheDocument()
    expect(screen.queryByText('opt')).not.toBeInTheDocument()
  })

  it('has zero accessibility violations', async () => {
    const { container } = renderWithProvider(<PropsAccordion title="Component Props" data={mockData} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
