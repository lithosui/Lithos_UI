import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { axe } from 'jest-axe'
import { describe, it, expect, vi } from 'vitest'
import { PropsTable, PropsAccordion, type PropItem } from '../../../components/ui/PropsTable'
import { ToastProvider } from '../../../components/ui/Toast'
import { ThemeProvider } from '../../../core/ThemeProvider'
import { componentPages } from '../../../core/lithos.utils'

const mockData: PropItem[] = [
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
    <MemoryRouter>
      <ThemeProvider>
        <ToastProvider>{content}</ToastProvider>
      </ThemeProvider>
    </MemoryRouter>
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
    const toggle = screen.getByRole('button', { name: 'Toggle required prop details' })

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

  it('updates expanded state when required and optional props change', () => {
    const initialData: PropItem[] = [
      { name: 'firstProp', type: 'string', required: true, description: 'First description' },
      { name: 'secondProp', type: 'boolean', required: false, description: 'Second description' },
    ]

    const { rerender } = renderWithProvider(<PropsTable data={initialData} />)

    expect(screen.getByRole('button', { name: 'Toggle first prop details' })).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('button', { name: 'Toggle second prop details' })).toHaveAttribute('aria-expanded', 'false')

    // Swap required status while keeping the count of required props equal to 1
    const updatedData: PropItem[] = [
      { name: 'firstProp', type: 'string', required: false, description: 'First description' },
      { name: 'secondProp', type: 'boolean', required: true, description: 'Second description' },
    ]

    rerender(
      <ThemeProvider>
        <ToastProvider>
          <PropsTable data={updatedData} />
        </ToastProvider>
      </ThemeProvider>
    )

    expect(screen.getByRole('button', { name: 'Toggle first prop details' })).toHaveAttribute('aria-expanded', 'false')
    expect(screen.getByRole('button', { name: 'Toggle second prop details' })).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByText('Second description')).toBeVisible()
  })

  it('sanitizes prop names and builds readable ARIA labels', () => {
    const specialProps: PropItem[] = [
      { name: 'onChangeHandler', type: '() => void', description: 'Change handler' },
      { name: '...restProps', type: 'Record<string, unknown>', description: 'Rest props' },
    ]

    renderWithProvider(<PropsTable data={specialProps} />)

    expect(screen.getByRole('button', { name: 'Toggle on change handler details' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Toggle rest props details' })).toBeInTheDocument()
  })

  it('renders valid string and object definitionPath links', () => {
    const validPage = componentPages[0]
    expect(validPage).toBeDefined()

    const propsWithValidPaths: PropItem[] = [
      {
        name: 'stringPathProp',
        type: 'CustomType',
        required: true,
        definitionPath: validPage?.path ?? '',
        description: 'Uses string path',
      },
      {
        name: 'objectPathProp',
        type: 'CustomObjType',
        required: true,
        definitionPath: { path: validPage?.path ?? '', label: 'Custom Link Label' },
        description: 'Uses object path',
      },
    ]

    renderWithProvider(<PropsTable data={propsWithValidPaths} />)

    expect(screen.getByText(validPage?.label ?? '')).toBeInTheDocument()
    expect(screen.getByText('Custom Link Label')).toBeInTheDocument()
  })

  it('throws on invalid definitionPath even when the prop row is collapsed', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    const collapsedInvalidPath: PropItem[] = [
      {
        name: 'collapsedBadPath',
        type: 'BadType',
        required: false,
        definitionPath: '/non-existent-component-path',
        description: 'Should fail immediately on render',
      },
    ]

    expect(() => renderWithProvider(<PropsTable data={collapsedInvalidPath} />)).toThrow(/Invalid definitionPath/)

    const malformedObjectPath: PropItem[] = [
      {
        name: 'malformedObjectProp',
        type: 'BadObjType',
        required: false,
        definitionPath: { path: '/some-path' } as unknown as { path: string; label: string },
        description: 'Missing label property',
      },
    ]

    expect(() => renderWithProvider(<PropsTable data={malformedObjectPath} />)).toThrow(/Invalid definitionPath object/)

    consoleErrorSpy.mockRestore()
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
