import { useEffect, useId, useState } from 'react'
import { IconCheck } from '../../../components/ui/icons/IconCheck'
import { IconCopy } from '../../../components/ui/icons/IconCopy'
import { IconEdit } from '../../../components/ui/icons/IconEdit'
import { IconTrash } from '../../../components/ui/icons/IconTrash'
import { IconClose } from '../../../components/ui/icons/IconClose'
import { IconArrowUp } from '../../../components/ui/icons/IconArrowUp'
import { IconArrowDown } from '../../../components/ui/icons/IconArrowDown'
import { Badge } from '../../../components/ui/Badge'
import { Button } from '../../../components/ui/Button'
import { Checkbox } from '../../../components/ui/Checkbox'
import { Input } from '../../../components/ui/Input'
import { Pagination } from '../../../components/ui/Pagination'
import { Select, SelectTrigger, SelectContent, SelectItem } from '../../../components/ui/Select'
import { IconChevronDown } from '../../../components/ui/icons/IconChevronDown'
import { Tooltip, TooltipContent, TooltipTrigger } from '../../../components/ui/Tooltip'
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

import { demoInvoices, currency, useInvoiceActions, type Invoice } from './useInvoiceActions'
import { InvoiceEditor } from './InvoiceActions'

/** Client-side recipe. Pass a complete dataset with unique, persistent IDs. */
export const BulkActionsTable = ({ data = demoInvoices }: { data?: Invoice[] }) => {
  const id = useId()
  const actions = useInvoiceActions(data)
  const { rows, startEdit, deleteRows, duplicateRows, duplicated } = actions
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState<{ key: 'customer' | 'amount'; descending: boolean } | null>(null)
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [showStatus, setShowStatus] = useState(true)
  const normalizedQuery = query.trim().toLowerCase()
  const filtered = normalizedQuery
    ? rows.filter((row) => `${row.id} ${row.customer} ${row.status}`.toLowerCase().includes(normalizedQuery))
    : rows
  const sorted = sort
    ? [...filtered].sort((a, b) => {
        const comparison =
          sort.key === 'amount' ? a.amount - b.amount : a.customer.localeCompare(b.customer, 'en', { numeric: true })
        return (sort.descending ? -comparison : comparison) || a.id.localeCompare(b.id)
      })
    : filtered
  const pageCount = Math.max(1, Math.ceil(sorted.length / pageSize))
  const currentPage = Math.min(page, pageCount - 1)
  const visible = sorted.slice(currentPage * pageSize, (currentPage + 1) * pageSize)
  const existingIds = new Set(rows.map((row) => row.id))
  const validSelection = new Set([...selected].filter((rowId) => existingIds.has(rowId)))
  const allPageSelected = visible.length > 0 && visible.every((row) => validSelection.has(row.id))
  const somePageSelected = visible.some((row) => validSelection.has(row.id))
  const selectedRows = rows.filter((row) => validSelection.has(row.id))

  useEffect(() => {
    const currentIds = new Set(rows.map((row) => row.id))
    setSelected((previous) => {
      const next = new Set([...previous].filter((rowId) => currentIds.has(rowId)))
      return next.size === previous.size ? previous : next
    })
  }, [rows])

  useEffect(() => {
    if (currentPage !== page) setPage(currentPage)
  }, [currentPage, page])

  const toggleRow = (rowId: string, checked: boolean) => {
    setSelected((previous) => {
      const next = new Set(previous)
      if (checked) next.add(rowId)
      else next.delete(rowId)
      return next
    })
  }
  const togglePage = (checked: boolean) => {
    setSelected((previous) => {
      const next = new Set(previous)
      visible.forEach((row) => {
        if (checked) next.add(row.id)
        else next.delete(row.id)
      })
      return next
    })
  }
  const changeSort = (key: 'customer' | 'amount') => {
    setSort((previous) => ({ key, descending: previous?.key === key ? !previous.descending : false }))
    setPage(0)
  }
  return (
    <div className="w-full min-w-0">
      <div className="mb-4 flex flex-wrap items-end">
        <div className="mr-5 mb-3 min-w-0 flex-1 basis-56">
          <label htmlFor={`${id}-filter`} className="mb-2 block text-sm font-bold">
            Filter invoices
          </label>
          <Input
            id={`${id}-filter`}
            placeholder="Customer, invoice, or status…"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              setPage(0)
            }}
          />
        </div>
        <Checkbox
          className="mb-3"
          label="Show status"
          checked={showStatus}
          onChange={(event) => setShowStatus(event.target.checked)}
        />
      </div>
      <TableContainer ref={actions.tableRef} aria-label="Bulk invoice selection">
        <Table hoverable>
          <TableCaption className="caption-top">
            <span className="sr-only">Bulk selection table</span>
            <div className="flex flex-wrap items-center">
              {validSelection.size > 0 && (
                <div role="group" aria-label="Bulk actions" className="mr-4 flex items-center">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="text"
                        className="mr-1 p-2"
                        aria-label="Edit selected"
                        disabled={selectedRows.length !== 1}
                        onClick={(event) => startEdit(selectedRows[0]!, event.currentTarget)}
                      >
                        <IconEdit aria-hidden="true" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Edit selected invoice</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="text"
                        className="mr-1 p-2"
                        aria-label="Delete selected"
                        disabled={validSelection.size === 0}
                        onClick={() => {
                          deleteRows(new Set(validSelection))
                          actions.tableRef.current?.focus()
                        }}
                      >
                        <IconTrash aria-hidden="true" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Delete selected invoices</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="text"
                        className="mr-1 p-2"
                        aria-label={duplicated.has('bulk') ? 'Duplicated selected' : 'Duplicate selected'}
                        disabled={validSelection.size === 0}
                        onClick={() => duplicateRows(selectedRows, 'bulk')}
                      >
                        {duplicated.has('bulk') ? <IconCheck aria-hidden="true" /> : <IconCopy aria-hidden="true" />}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      {duplicated.has('bulk') ? 'Duplicated invoices' : 'Duplicate selected invoices'}
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="text"
                        className="p-2"
                        aria-label="Clear selection"
                        disabled={validSelection.size === 0}
                        onClick={() => {
                          setSelected(new Set())
                          actions.tableRef.current?.focus()
                        }}
                      >
                        <IconClose aria-hidden="true" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Clear selection</TooltipContent>
                  </Tooltip>
                </div>
              )}
              <span role="status" className="text-sm">
                {filtered.length} results · {validSelection.size} selected across pages
              </span>
            </div>
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead scope="col">
                <Checkbox
                  aria-label="Select all on this page"
                  checked={allPageSelected}
                  indeterminate={somePageSelected && !allPageSelected}
                  disabled={visible.length === 0}
                  onChange={(event) => togglePage(event.target.checked)}
                />
              </TableHead>
              <TableHead scope="col">Invoice</TableHead>
              <TableHead
                scope="col"
                aria-sort={sort?.key === 'customer' ? (sort.descending ? 'descending' : 'ascending') : undefined}
              >
                <Button
                  variant="text"
                  className="text-inherit"
                  iconRight={
                    sort?.key === 'customer' && !sort.descending ? (
                      <IconArrowUp />
                    ) : (
                      <IconArrowDown className={sort?.key === 'customer' ? '' : 'opacity-50'} />
                    )
                  }
                  onClick={() => changeSort('customer')}
                >
                  Customer
                </Button>
              </TableHead>
              {showStatus && <TableHead scope="col">Status</TableHead>}
              <TableHead
                scope="col"
                className="text-end"
                aria-sort={sort?.key === 'amount' ? (sort.descending ? 'descending' : 'ascending') : undefined}
              >
                <Button
                  variant="text"
                  className="text-inherit"
                  iconRight={
                    sort?.key === 'amount' && !sort.descending ? (
                      <IconArrowUp />
                    ) : (
                      <IconArrowDown className={sort?.key === 'amount' ? '' : 'opacity-50'} />
                    )
                  }
                  onClick={() => changeSort('amount')}
                >
                  Amount
                </Button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visible.length ? (
              visible.map((row) => (
                <TableRow key={row.id} selected={validSelection.has(row.id)}>
                  <TableCell>
                    <Checkbox
                      aria-label={`Select ${row.id}`}
                      checked={validSelection.has(row.id)}
                      onChange={(event) => toggleRow(row.id, event.target.checked)}
                    />
                  </TableCell>
                  <TableHead scope="row" className="whitespace-nowrap">
                    {row.id}
                  </TableHead>
                  <TableCell className="min-w-40">{row.customer}</TableCell>
                  {showStatus && (
                    <TableCell>
                      <Badge intent={row.status === 'Paid' ? 'success' : 'warning'}>{row.status}</Badge>
                    </TableCell>
                  )}
                  <TableCell className="text-end tabular-nums whitespace-nowrap">
                    {currency.format(row.amount)}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={showStatus ? 5 : 4} className="h-28 text-center">
                  No invoices found. Try a different filter.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <InvoiceEditor actions={actions} />
      <div className="mt-5 flex flex-wrap items-center justify-between">
        <div className="mb-3 mr-4 flex items-center">
          <span id={`${id}-size-label`} className="mr-2 text-sm font-bold">
            Items per page
          </span>
          <Select
            value={String(pageSize)}
            onChange={(value) => {
              setPageSize(Number(value))
              setPage(0)
            }}
          >
            <SelectTrigger aria-labelledby={`${id}-size-label`}>
              {pageSize}
              <IconChevronDown className="ml-2 shrink-0" aria-hidden="true" />
            </SelectTrigger>
            <SelectContent>
              {[10, 20, 50].map((size, index) => (
                <SelectItem key={size} value={String(size)} index={index}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Pagination
          aria-label="Invoice pages"
          className="mb-3 w-auto"
          count={pageCount}
          page={currentPage + 1}
          onPageChange={(nextPage) => setPage(nextPage - 1)}
          variant="compact"
          position="right"
          size="sm"
          showEdges={false}
        />
      </div>
    </div>
  )
}
