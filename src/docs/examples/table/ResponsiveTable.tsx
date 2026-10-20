import { Fragment, useEffect, useId, useRef, useState } from 'react'
import { Button } from '../../../components/ui/Button'
import { IconChevronDown } from '../../../components/ui/icons/IconChevronDown'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../components/ui/Table'

const responsiveInvoices = [
  { id: 'INV-001', customer: 'Alex Morgan', status: 'Paid', amount: '$250.00', method: 'Credit card' },
  { id: 'INV-002', customer: 'Sam Rivera', status: 'Pending', amount: '$90.00', method: 'Bank transfer' },
  { id: 'INV-003', customer: 'Jordan Lee', status: 'Paid', amount: '$1,200.00', method: 'Credit card' },
]
// Reserve space for the invoice, customer, and disclosure button first.
// Keep higher-priority optional columns visible while their width budgets fit.
const optionalColumns = [
  { key: 'amount', label: 'Amount', width: 110 },
  { key: 'status', label: 'Status', width: 110 },
  { key: 'method', label: 'Payment method', width: 170 },
] as const

export const ResponsiveTable = () => {
  const id = useId()
  const containerRef = useRef<HTMLDivElement>(null)
  const [visibleCount, setVisibleCount] = useState(0)
  const [previewWidth, setPreviewWidth] = useState(800)
  const [expanded, setExpanded] = useState<Set<string>>(new Set())
  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const observer = new ResizeObserver(([entry]) => {
      if (!entry) return
      let budget = 290
      const count = optionalColumns.filter((column) => {
        budget += column.width
        return budget <= entry.contentRect.width
      }).length
      // Ignore pixel changes that do not change which columns fit.
      setVisibleCount((previous) => (previous === count ? previous : count))
    })
    observer.observe(container)
    return () => observer.disconnect()
  }, [])
  const visibleColumns = optionalColumns.slice(0, visibleCount)
  const hiddenColumns = optionalColumns.slice(visibleCount)
  const hasDetails = hiddenColumns.length > 0
  const toggle = (rowId: string) =>
    setExpanded((previous) => {
      const next = new Set(previous)
      if (next.has(rowId)) next.delete(rowId)
      else next.add(rowId)
      return next
    })

  return (
    <div className="w-full min-w-0">
      <label htmlFor={`${id}-width`} className="mb-2 block text-sm font-bold">
        Preview width (maximum): {previewWidth}px
      </label>
      {/* Native range exception to button physics: preserve browser drag and arrow-key behavior for resizing. */}
      <input
        id={`${id}-width`}
        type="range"
        min={280}
        max={800}
        step={10}
        value={previewWidth}
        onChange={(event) => setPreviewWidth(Number(event.target.value))}
        className="mb-3 w-full max-w-80"
      />
      <p className="mb-3 text-sm">Adjust the width. Columns that no longer fit move into each invoice's details.</p>
      <TableContainer ref={containerRef} aria-label="Responsive invoices" style={{ maxWidth: previewWidth }}>
        <Table size="sm" className="table-fixed">
          <TableCaption className="caption-top">Invoice details adapt to the available container width.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead scope="col" className="w-24">
                Invoice
              </TableHead>
              <TableHead scope="col">Customer</TableHead>
              {visibleColumns.map((column) => (
                <TableHead
                  key={column.key}
                  scope="col"
                  style={{ width: column.width }}
                  className={column.key === 'amount' ? 'text-end' : undefined}
                >
                  {column.label}
                </TableHead>
              ))}
              {hasDetails && (
                <TableHead scope="col" className="w-14">
                  <span className="sr-only">Details</span>
                </TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {responsiveInvoices.map((row) => (
              <Fragment key={row.id}>
                <TableRow>
                  <TableHead scope="row" className="break-words">
                    {row.id}
                  </TableHead>
                  <TableCell className="break-words">{row.customer}</TableCell>
                  {visibleColumns.map((column) => (
                    <TableCell
                      key={column.key}
                      className={column.key === 'amount' ? 'text-end tabular-nums' : undefined}
                    >
                      {row[column.key]}
                    </TableCell>
                  ))}
                  {hasDetails && (
                    <TableCell>
                      <Button
                        variant="text"
                        className="p-1"
                        aria-label={`${expanded.has(row.id) ? 'Hide' : 'Show'} details for ${row.id}`}
                        aria-expanded={expanded.has(row.id)}
                        aria-controls={`${id}-${row.id}`}
                        onClick={() => toggle(row.id)}
                      >
                        <IconChevronDown className={expanded.has(row.id) ? 'rotate-180' : ''} aria-hidden="true" />
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
                {hasDetails && (
                  <TableRow id={`${id}-${row.id}`} hidden={!expanded.has(row.id)}>
                    <TableCell colSpan={3 + visibleColumns.length} className="bg-(--lithos-surface)">
                      <Table size="sm" aria-label={`Details for ${row.id}`}>
                        <TableBody>
                          {hiddenColumns.map((column) => (
                            <TableRow key={column.key}>
                              <TableHead scope="row">{column.label}</TableHead>
                              <TableCell>{row[column.key]}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableCell>
                  </TableRow>
                )}
              </Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
