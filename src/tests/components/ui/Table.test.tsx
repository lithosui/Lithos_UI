import { createRef, type ReactElement } from 'react'
import { act, render as renderWithProvider, screen, within, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { describe, expect, it, vi, afterEach } from 'vitest'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../components/ui/Table'
import { ToastProvider } from '../../../components/ui/Toast'
import { ThemeProvider } from '../../../core/ThemeProvider'
import { BasicTable } from '../../../docs/examples/table/BasicTable'
import { TableStates } from '../../../docs/examples/table/TableStates'
import { BulkActionsTable } from '../../../docs/examples/table/BulkActions'
import { RowActionsTable } from '../../../docs/examples/table/RowActions'
import { DropdownActionsTable } from '../../../docs/examples/table/DropdownActions'
import { ResponsiveTable } from '../../../docs/examples/table/ResponsiveTable'
import { SortableTable } from '../../../docs/examples/table/SortableTable'
import { GroupedHeadersTable } from '../../../docs/examples/table/GroupedHeaders'

const render = (ui: ReactElement) =>
  renderWithProvider(ui, {
    wrapper: ({ children }) => (
      <ThemeProvider>
        <ToastProvider>{children}</ToastProvider>
      </ThemeProvider>
    ),
  })

afterEach(() => vi.unstubAllGlobals())
afterEach(() => vi.restoreAllMocks())

describe('Table primitives', () => {
  it('supports accent header contrast, native refs, and consumer color overrides', () => {
    const ref = createRef<HTMLTableSectionElement>()
    const { rerender } = render(
      <Table>
        <TableHeader ref={ref} variant="accent">
          <TableRow>
            <TableHead>Invoice</TableHead>
          </TableRow>
        </TableHeader>
      </Table>
    )
    expect(ref.current).toHaveClass('bg-(--lithos-accent)', 'text-(--lithos-accent-text)')
    expect(ref.current).not.toHaveAttribute('variant')
    rerender(
      <Table>
        <TableHeader ref={ref} variant="accent" className="bg-red-500 text-white">
          <TableRow>
            <TableHead>Invoice</TableHead>
          </TableRow>
        </TableHeader>
      </Table>
    )
    expect(ref.current).toHaveClass('bg-red-500', 'text-white')
    expect(ref.current).not.toHaveClass('bg-(--lithos-accent)', 'text-(--lithos-accent-text)')
  })
  it('moves overflow columns into accessible details and restores them when space returns', async () => {
    const user = userEvent.setup()
    let onResize: ResizeObserverCallback | undefined
    vi.stubGlobal(
      'ResizeObserver',
      class {
        constructor(callback: ResizeObserverCallback) {
          onResize = callback
        }
        observe() {}
        unobserve() {}
        disconnect() {}
      }
    )
    const resize = (width: number) =>
      act(() => onResize?.([{ contentRect: { width } } as ResizeObserverEntry], {} as ResizeObserver))
    const { container } = render(<ResponsiveTable />)
    resize(300)
    expect(screen.getAllByRole('columnheader')).toHaveLength(3)
    const toggle = screen.getByRole('button', { name: 'Show details for INV-001' })
    await user.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    const detailsTable = screen.getByRole('table', { name: 'Details for INV-001' })
    const paymentMethodLabel = within(detailsTable).getByRole('rowheader', { name: 'Payment method' })
    expect(within(paymentMethodLabel.closest('tr')!).getByRole('cell')).toHaveTextContent('Credit card')
    expect(document.getElementById(toggle.getAttribute('aria-controls')!)).toHaveAttribute('id')
    resize(500)
    expect(screen.getAllByRole('columnheader')).toHaveLength(4)
    expect(
      within(screen.getByRole('table', { name: 'Details for INV-001' })).queryByRole('rowheader', { name: 'Amount' })
    ).toBeNull()
    resize(800)
    expect(screen.getAllByRole('columnheader')).toHaveLength(5)
    expect(screen.queryByRole('button', { name: /details for/ })).toBeNull()
    resize(300)
    expect(screen.getByRole('button', { name: 'Hide details for INV-001' })).toHaveAttribute('aria-expanded', 'true')
    expect(await axe(container)).toHaveNoViolations()
  })
  it('preserves table semantics, header associations, spans, native props and refs', () => {
    const tableRef = createRef<HTMLTableElement>()
    const containerRef = createRef<HTMLDivElement>()
    const headRef = createRef<HTMLTableCellElement>()
    const cellRef = createRef<HTMLTableCellElement>()
    const headerRef = createRef<HTMLTableSectionElement>()
    const bodyRef = createRef<HTMLTableSectionElement>()
    const footerRef = createRef<HTMLTableSectionElement>()
    const rowRef = createRef<HTMLTableRowElement>()
    const captionRef = createRef<HTMLTableCaptionElement>()
    render(
      <TableContainer aria-label="Orders region" ref={containerRef}>
        <Table ref={tableRef} id="orders">
          <TableCaption ref={captionRef}>Orders</TableCaption>
          <TableHeader ref={headerRef}>
            <TableRow ref={rowRef}>
              <TableHead ref={headRef} scope="col" colSpan={2} aria-sort="ascending">
                Details
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody ref={bodyRef}>
            <TableRow>
              <TableHead scope="row">Order 1</TableHead>
              <TableCell ref={cellRef} rowSpan={2}>
                Paid
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead scope="row">Order 2</TableHead>
            </TableRow>
          </TableBody>
          <TableFooter ref={footerRef}>
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    )
    expect(tableRef.current).toBe(screen.getByRole('table', { name: 'Orders' }))
    expect(tableRef.current).toHaveAttribute('id', 'orders')
    expect(containerRef.current).toBe(screen.getByRole('region', { name: 'Orders region' }))
    expect(headRef.current).toHaveAttribute('scope', 'col')
    expect(headRef.current).toHaveAttribute('colspan', '2')
    expect(headRef.current).toHaveAttribute('aria-sort', 'ascending')
    expect(cellRef.current).toHaveAttribute('rowspan', '2')
    expect(headerRef.current).toBe(tableRef.current?.querySelector('thead'))
    expect(bodyRef.current).toBe(tableRef.current?.querySelector('tbody'))
    expect(footerRef.current).toBe(tableRef.current?.querySelector('tfoot'))
    expect(rowRef.current).toBe(headRef.current?.parentElement)
    expect(captionRef.current).toBe(tableRef.current?.querySelector('caption'))
    expect(screen.getByText('Total').closest('tfoot')).not.toBeNull()
  })

  it('allows keyboard focus on the scrolling region and consumer class overrides', async () => {
    const user = userEvent.setup()
    render(
      <TableContainer aria-label="Wide table" className="shadow-none">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="px-8">Content</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    )
    await user.tab()
    const region = screen.getByRole('region', { name: 'Wide table' })
    expect(region).toHaveFocus()
    expect(region).toHaveClass('shadow-none')
    expect(region.className).not.toContain('shadow-[4px')
    expect(screen.getByRole('cell')).toHaveClass('px-8')
    expect(screen.getByRole('cell').className).not.toContain('px-(--table-cell-x)')
  })

  it('changes visual selection without adding incorrect interactive row semantics', () => {
    const { rerender } = render(
      <Table>
        <TableBody>
          <TableRow selected>
            <TableCell>Selected</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )
    expect(screen.getByRole('row')).toHaveAttribute('data-state', 'selected')
    expect(screen.getByRole('row')).not.toHaveAttribute('tabindex')
    expect(screen.getByRole('row')).not.toHaveAttribute('aria-selected')
    rerender(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Selected</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )
    expect(screen.getByRole('row')).not.toHaveAttribute('data-state')
  })

  it('has no automated accessibility violations in the basic example', async () => {
    const { container } = render(<BasicTable />)
    expect(screen.getByRole('table', { name: 'Three recent invoices, in USD.' }).querySelector('caption')).toHaveClass(
      'caption-top'
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})

describe('Loading, empty, and error states', () => {
  it('updates one table for loading, empty, and error states', async () => {
    const user = userEvent.setup()
    render(<TableStates />)
    expect(screen.getByText('Preview state')).toHaveClass('mr-2')
    const inventoryTable = screen.getByRole('table', {
      name: 'Inventory preview with a sticky header and compact entries.',
    })
    expect(inventoryTable.querySelector('caption')).toHaveClass('caption-top')
    await user.click(screen.getByLabelText('Preview state'))
    await user.click(screen.getByRole('option', { name: 'Loading' }))
    const status = screen.getByRole('status')
    expect(status).toHaveTextContent('Loading inventory')
    expect(status.closest('[aria-busy="true"]')).toBeNull()
    expect(inventoryTable).toHaveAttribute('aria-busy', 'true')
    expect(screen.getAllByRole('table')).toHaveLength(1)
    expect(within(inventoryTable).getAllByRole('row')).toHaveLength(2)
    await user.click(screen.getByLabelText('Preview state'))
    await user.click(screen.getByRole('option', { name: 'Empty' }))
    expect(within(inventoryTable).getByRole('cell')).toHaveTextContent('No products yet')
    expect(within(inventoryTable).getByRole('cell')).toHaveAttribute('colspan', '3')
    await user.click(screen.getByRole('button', { name: 'Add product' }))
    expect(within(inventoryTable).getAllByRole('row')).toHaveLength(13)
    await user.click(screen.getByLabelText('Preview state'))
    await user.click(screen.getByRole('option', { name: 'Error' }))
    expect(screen.getByRole('alert')).toHaveTextContent('Inventory could not be loaded')
    expect(within(inventoryTable).getByText('Inventory could not be loaded. Try again.')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Retry' }))
    expect(screen.getByRole('status')).toBe(status)
    expect(status).toHaveTextContent('Inventory ready')
    expect(within(inventoryTable).getAllByRole('row')).toHaveLength(13)
    expect(within(inventoryTable).getAllByRole('rowheader')[0]).toHaveTextContent('Studio monitor')
  })
})

describe('Bulk actions', () => {
  it('shows actions only for a selection and restores focus when clearing it', async () => {
    const user = userEvent.setup()
    render(<BulkActionsTable />)
    expect(screen.queryByRole('group', { name: 'Bulk actions' })).toBeNull()
    await user.click(screen.getByLabelText('Select INV-001'))
    expect(screen.getByRole('group', { name: 'Bulk actions' })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Clear selection' }))
    expect(screen.queryByRole('group', { name: 'Bulk actions' })).toBeNull()
    expect(screen.getByRole('region', { name: 'Bulk invoice selection' })).toHaveFocus()
    await user.click(screen.getByLabelText('Select INV-001'))
    await user.click(screen.getByRole('button', { name: 'Delete selected' }))
    expect(screen.queryByRole('group', { name: 'Bulk actions' })).toBeNull()
    expect(screen.getByRole('region', { name: 'Bulk invoice selection' })).toHaveFocus()
    const toast = screen.getByText('Deleted invoice INV-001.').closest('[role="status"]')!
    expect(toast).toBeInTheDocument()
    await user.click(within(toast as HTMLElement).getByRole('button', { name: 'Close notification' }))
    expect(toast).not.toBeInTheDocument()
  })
  it('sorts amounts numerically and keeps selection attached to the record', async () => {
    const user = userEvent.setup()
    render(<BulkActionsTable />)
    const bulkTable = screen.getByRole('table', { name: /Bulk selection table/ })
    await user.click(screen.getByLabelText('Select INV-002'))
    await user.click(screen.getByRole('button', { name: 'Amount' }))
    expect(within(bulkTable).getAllByRole('row')[1]).toHaveTextContent('INV-006')
    expect(within(bulkTable).getByRole('columnheader', { name: 'Amount' })).toHaveAttribute('aria-sort', 'ascending')
    expect(screen.getByLabelText('Select INV-002')).toBeChecked()
    await user.click(screen.getByRole('button', { name: 'Amount' }))
    expect(within(bulkTable).getAllByRole('row')[1]).toHaveTextContent('INV-003')
    expect(within(bulkTable).getByRole('columnheader', { name: 'Amount' })).toHaveAttribute('aria-sort', 'descending')
    await user.click(screen.getByRole('button', { name: 'Customer' }))
    expect(within(bulkTable).getByRole('columnheader', { name: 'Amount' })).not.toHaveAttribute('aria-sort')
  })

  it('resets pagination when filtering, and calculates empty-state spans from visible columns', async () => {
    const user = userEvent.setup()
    const { container } = render(<BulkActionsTable />)
    const bulkTable = screen.getByRole('table', { name: /Bulk selection table/ })
    expect(screen.getByRole('navigation', { name: 'Invoice pages' })).toHaveAttribute('data-slot', 'pagination')
    await user.click(screen.getByRole('button', { name: 'Next page' }))
    await user.type(screen.getByLabelText('Filter invoices'), 'Alex')
    expect(screen.getByText('Page 1 of 1')).toBeInTheDocument()
    expect(within(bulkTable).getByRole('rowheader', { name: 'INV-001' })).toBeInTheDocument()
    await user.type(screen.getByLabelText('Filter invoices'), 'not-found')
    expect(within(bulkTable).getByRole('cell')).toHaveAttribute('colspan', '5')
    await user.click(screen.getByLabelText('Show status'))
    expect(within(bulkTable).getByRole('cell')).toHaveAttribute('colspan', '4')
    expect(screen.getByLabelText('Select all on this page')).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Next page' })).toBeDisabled()
    expect(await axe(container)).toHaveNoViolations()
  })

  it('selects only the current page, exposes mixed selection, and clears hidden selections', async () => {
    const user = userEvent.setup()
    render(<BulkActionsTable />)
    const bulkTable = screen.getByRole('table', { name: /Bulk selection table/ })
    expect(within(bulkTable).getAllByRole('row')).toHaveLength(11)
    await user.click(screen.getByLabelText('Select INV-001'))
    expect(screen.getByLabelText('Select all on this page')).toBePartiallyChecked()
    await user.click(screen.getByLabelText('Select all on this page'))
    expect(screen.getByText(/10 selected across pages/)).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Next page' }))
    expect(screen.getByLabelText('Select all on this page')).not.toBeChecked()
    expect(screen.getByLabelText('Select INV-011')).not.toBeChecked()
    await user.type(screen.getByLabelText('Filter invoices'), 'Robin')
    expect(screen.getByText(/10 selected across pages/)).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Clear selection' }))
    expect(screen.getByText(/0 selected across pages/)).toBeInTheDocument()
  })

  it('clamps pages and prunes selection when records disappear', async () => {
    const user = userEvent.setup()
    const data = Array.from({ length: 12 }, (_, index) => ({
      id: `row-${index}`,
      customer: `Customer ${index}`,
      status: 'Paid' as const,
      amount: index,
    }))
    const { rerender } = render(<BulkActionsTable data={data} />)
    await user.click(screen.getByRole('button', { name: 'Next page' }))
    await user.click(screen.getByLabelText('Select row-11'))
    rerender(<BulkActionsTable data={data.slice(0, 2)} />)
    expect(screen.getByText('Page 1 of 1')).toBeInTheDocument()
    expect(screen.getByText(/0 selected across pages/)).toBeInTheDocument()
    rerender(<BulkActionsTable data={data} />)
    expect(screen.getByText('Page 1 of 2')).toBeInTheDocument()
    expect(screen.getByText(/0 selected across pages/)).toBeInTheDocument()
  })

  it('supports page-size changes without submitting a surrounding form', async () => {
    const user = userEvent.setup()
    render(
      <form>
        <BulkActionsTable />
      </form>
    )
    await user.click(screen.getByRole('button', { name: 'Next page' }))
    await user.click(screen.getByLabelText('Items per page'))
    await user.click(screen.getByRole('option', { name: '20' }))
    expect(screen.getAllByRole('row')).toHaveLength(13)
    expect(screen.getByText('Page 1 of 1')).toBeInTheDocument()
    await user.click(screen.getByLabelText('Select INV-001'))
    expect(screen.getByRole('button', { name: 'Duplicate selected' })).toHaveAttribute('type', 'button')
  })

  it('edits locally, rejects blank names, copies, and deletes selected records', async () => {
    const user = userEvent.setup()
    render(<BulkActionsTable />)
    await user.click(screen.getByLabelText('Select INV-001'))
    await user.click(screen.getByRole('button', { name: 'Edit selected' }))
    const input = screen.getByRole('textbox', { name: 'Customer for INV-001' })
    expect(input).toHaveFocus()
    await user.clear(input)
    expect(screen.getByRole('button', { name: 'Save' })).toBeDisabled()
    expect(input).toHaveAccessibleDescription('Customer name is required for INV-001.')
    await user.type(input, 'Alex Cooper')
    await user.click(screen.getByRole('button', { name: 'Save' }))
    expect(screen.getByText('Alex Cooper')).toBeInTheDocument()
    expect(screen.getByText('Updated INV-001.').closest('[role="status"]')).toBeInTheDocument()
    await user.click(screen.getByLabelText('Select INV-002'))
    await user.click(screen.getByRole('button', { name: 'Duplicate selected' }))
    expect(screen.getByText('Page 1 of 2')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Next page' }))
    expect(screen.getByRole('rowheader', { name: 'INV-013' })).toBeInTheDocument()
    expect(screen.getByRole('rowheader', { name: 'INV-014' })).toBeInTheDocument()
    expect(await screen.findByRole('button', { name: 'Duplicated selected' })).toBeInTheDocument()
    expect(
      screen.getByText('Duplicated invoices: INV-001 as INV-013, INV-002 as INV-014.').closest('[role="status"]')
    ).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Delete selected' }))
    expect(screen.queryByRole('rowheader', { name: 'INV-001' })).not.toBeInTheDocument()
    expect(screen.getByText('Deleted invoices: INV-001, INV-002.').closest('[role="status"]')).toBeInTheDocument()
    expect(screen.getByText(/0 selected across pages/)).toBeInTheDocument()
  })

  it('clamps the last page after deletion and disables bulk edit for multiple selections', async () => {
    const user = userEvent.setup()
    render(<BulkActionsTable />)
    await user.click(screen.getByRole('button', { name: 'Next page' }))
    await user.click(screen.getByLabelText('Select all on this page'))
    expect(screen.getByRole('button', { name: 'Edit selected' })).toBeDisabled()
    await user.click(screen.getByRole('button', { name: 'Delete selected' }))
    expect(screen.getByText('Page 1 of 1')).toBeInTheDocument()
    expect(screen.getAllByRole('row')).toHaveLength(11)
  })

  it('preserves page, sorting, and filtering when duplicating selections', async () => {
    const user = userEvent.setup()
    render(<BulkActionsTable />)
    await user.click(screen.getByRole('button', { name: 'Amount' }))
    await user.click(screen.getByLabelText('Select INV-006'))
    await user.click(screen.getByRole('button', { name: 'Duplicate selected' }))
    expect(screen.getByText('Page 1 of 2')).toBeInTheDocument()
    expect(screen.getByRole('rowheader', { name: 'INV-013' }).closest('tr')).toHaveTextContent('$75.00')
    expect(screen.getByRole('columnheader', { name: 'Amount' })).toHaveAttribute('aria-sort', 'ascending')
    await user.type(screen.getByLabelText('Filter invoices'), 'INV-006')
    await user.click(screen.getByRole('button', { name: 'Duplicated selected' }))
    expect(screen.getByText('Page 1 of 1')).toBeInTheDocument()
    expect(screen.getByLabelText('Filter invoices')).toHaveValue('INV-006')
    expect(screen.queryByRole('rowheader', { name: 'INV-014' })).toBeNull()
    expect(screen.getByText('Duplicated invoice INV-006 as INV-014.').closest('[role="status"]')).toBeInTheDocument()
    await user.clear(screen.getByLabelText('Filter invoices'))
    expect(screen.getByRole('rowheader', { name: 'INV-014' })).toBeInTheDocument()
  })

  it('returns focus to bulk Edit after saving', async () => {
    const user = userEvent.setup()
    render(<BulkActionsTable />)
    await user.click(screen.getByLabelText('Select INV-001'))
    const edit = screen.getByRole('button', { name: 'Edit selected' })
    await user.click(edit)
    await user.click(screen.getByRole('button', { name: 'Save' }))
    expect(edit).toHaveFocus()
  })
})

describe('Independent action previews', () => {
  it('opens a detail dialog, restores focus, and leaves other previews unchanged after deletion', async () => {
    const user = userEvent.setup()
    render(
      <>
        <BulkActionsTable />
        <RowActionsTable />
        <DropdownActionsTable />
      </>
    )
    const trigger = screen.getByRole('button', { name: 'View INV-001' })
    await user.click(trigger)
    const dialog = screen.getByRole('dialog', { name: 'Invoice INV-001' })
    const detailsTable = within(dialog).getByRole('table', { name: 'Details for invoice INV-001' })
    expect(within(detailsTable).getByRole('rowheader', { name: 'Customer' })).toBeInTheDocument()
    expect(within(detailsTable).getByText('Alex Morgan')).toBeInTheDocument()
    expect(within(detailsTable).getByRole('rowheader', { name: 'Payment method' })).toBeInTheDocument()
    expect(within(detailsTable).getByText('Credit card')).toBeInTheDocument()
    expect(await axe(dialog)).toHaveNoViolations()
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(trigger).toHaveFocus()
    await user.click(screen.getByRole('button', { name: 'Delete INV-001' }))
    expect(within(screen.getByRole('region', { name: 'Row invoice actions' })).queryByText('INV-001')).toBeNull()
    expect(
      within(screen.getByRole('region', { name: 'Bulk invoice selection' })).getByText('INV-001')
    ).toBeInTheDocument()
    expect(
      within(screen.getByRole('region', { name: 'Dropdown invoice actions' })).getByText('INV-001')
    ).toBeInTheDocument()
  })

  it('duplicates an invoice and resets the duplicated indicator', async () => {
    const user = userEvent.setup()
    render(<RowActionsTable />)
    await user.click(screen.getByRole('button', { name: 'Duplicate INV-001' }))
    expect(screen.getByRole('rowheader', { name: 'INV-004' })).toBeInTheDocument()
    expect(screen.getByRole('row', { name: /INV-004 Alex Morgan Paid \$250\.00/ })).toBeInTheDocument()
    expect(
      within(screen.getByRole('region', { name: 'Row invoice actions' }))
        .getAllByRole('rowheader')
        .at(-1)
    ).toHaveTextContent('INV-004')
    expect(
      within(screen.getByRole('region', { name: 'Row invoice actions' }))
        .getAllByRole('rowheader')
        .map((header) => header.textContent)
    ).toEqual(['INV-001', 'INV-002', 'INV-003', 'INV-004'])
    expect(await screen.findByRole('button', { name: 'Duplicated INV-001' })).toBeInTheDocument()
    expect(screen.getByText('Duplicated invoice INV-001 as INV-004.').closest('[role="status"]')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Duplicate INV-002' })).toBeInTheDocument()
    await waitFor(() => expect(screen.getByRole('button', { name: 'Duplicate INV-001' })).toBeInTheDocument(), {
      timeout: 3000,
    })
  })

  it('cancels edits without changing data and saves to the stable record ID', async () => {
    const user = userEvent.setup()
    render(<RowActionsTable />)
    await user.click(screen.getByRole('button', { name: 'Edit INV-002' }))
    await user.clear(screen.getByRole('textbox'))
    await user.type(screen.getByRole('textbox'), 'Changed')
    await user.click(screen.getByRole('button', { name: 'Cancel' }))
    expect(screen.getByText('Sam Rivera')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Edit INV-002' })).toHaveFocus()
    await user.click(screen.getByRole('button', { name: 'Edit INV-002' }))
    await user.clear(screen.getByRole('textbox'))
    await user.type(screen.getByRole('textbox'), 'Changed')
    await user.click(screen.getByRole('button', { name: 'Save' }))
    expect(screen.getByRole('rowheader', { name: 'INV-002' }).closest('tr')).toHaveTextContent('Changed')
    expect(screen.getByRole('button', { name: 'Edit INV-002' })).toHaveFocus()
  })

  it('portals dropdown menus, supports keyboard actions, and restores focus after View', async () => {
    const user = userEvent.setup()
    render(<DropdownActionsTable />)
    const trigger = screen.getByRole('button', { name: 'Actions for INV-001' })
    await user.click(trigger)
    const menu = await screen.findByRole('menu')
    expect(menu.closest('table')).toBeNull()
    const view = within(menu).getByRole('menuitem', { name: 'View' })
    await waitFor(() => expect(view).toHaveFocus())
    await user.keyboard('{Enter}')
    expect(await screen.findByRole('dialog', { name: 'Invoice INV-001' })).toBeInTheDocument()
    await user.keyboard('{Escape}')
    await waitFor(() => expect(trigger).toHaveFocus())
    await user.click(trigger)
    await user.click(await screen.findByRole('menuitem', { name: 'Duplicate' }))
    expect(screen.getByRole('rowheader', { name: 'INV-004' })).toBeInTheDocument()
    expect(screen.getByText('Duplicated invoice INV-001 as INV-004.').closest('[role="status"]')).toBeInTheDocument()
    await user.click(trigger)
    expect(await screen.findByRole('menuitem', { name: 'Duplicated' })).toBeInTheDocument()
    await user.click(screen.getByRole('menuitem', { name: 'Edit' }))
    await waitFor(() => expect(screen.getByRole('textbox', { name: 'Customer for INV-001' })).toHaveFocus())
    await user.click(screen.getByRole('button', { name: 'Cancel' }))
    await waitFor(() => expect(trigger).toHaveFocus())
    await user.click(trigger)
    await user.click(await screen.findByRole('menuitem', { name: 'Delete' }))
    expect(screen.queryByRole('rowheader', { name: 'INV-001' })).toBeNull()
    expect(screen.getByText('Deleted invoice INV-001.').closest('[role="status"]')).toBeInTheDocument()
  })

  it('adds a row and announces the action with a toast', async () => {
    const user = userEvent.setup()
    render(<RowActionsTable />)
    await user.click(screen.getByRole('button', { name: 'New invoice' }))
    expect(screen.getByRole('rowheader', { name: 'INV-004' })).toBeInTheDocument()
    expect(screen.getByText('Added INV-004.').closest('[role="status"]')).toBeInTheDocument()
  })

  it('returns focus to the table if the edited record disappears', async () => {
    const user = userEvent.setup()
    const data = [{ id: 'INV-001', customer: 'Alex', status: 'Paid' as const, amount: 250 }]
    const { rerender } = render(<RowActionsTable data={data} />)
    await user.click(screen.getByRole('button', { name: 'Edit INV-001' }))
    rerender(<RowActionsTable data={[]} />)
    expect(screen.queryByRole('textbox')).toBeNull()
    expect(screen.getByRole('region', { name: 'Row invoice actions' })).toHaveFocus()
  })
})

describe('Focused table examples', () => {
  it('sorts numeric amounts through keyboard activation', async () => {
    const user = userEvent.setup()
    render(<SortableTable />)
    const sortButton = screen.getByRole('button', { name: 'Amount' })
    sortButton.focus()
    await user.keyboard('{Enter}')
    expect(screen.getAllByRole('rowheader').map((cell) => cell.textContent)).toEqual(['INV-002', 'INV-001', 'INV-003'])
    expect(screen.getByRole('columnheader', { name: 'Amount' })).toHaveAttribute('aria-sort', 'ascending')
    await user.keyboard(' ')
    expect(screen.getAllByRole('rowheader').map((cell) => cell.textContent)).toEqual(['INV-003', 'INV-001', 'INV-002'])
    expect(screen.getByRole('columnheader', { name: 'Amount' })).toHaveAttribute('aria-sort', 'descending')
  })

  it('exposes grouped headers and native column groups without accessibility violations', async () => {
    const { container } = render(<GroupedHeadersTable />)
    expect(screen.getByRole('columnheader', { name: 'Product' })).toHaveAttribute('rowspan', '2')
    const group = screen.getByRole('columnheader', { name: 'Units sold' })
    expect(group).toHaveAttribute('scope', 'colgroup')
    expect(group).toHaveAttribute('colspan', '2')
    expect(container.querySelectorAll('colgroup')[1]).toHaveAttribute('span', '2')
    expect(await axe(container)).toHaveNoViolations()
  })
})
