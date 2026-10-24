import { useState } from 'react'
import { Button } from '../../../components/ui/Button'
import { IconArrowUp } from '../../../components/ui/icons/IconArrowUp'
import { IconArrowDown } from '../../../components/ui/icons/IconArrowDown'
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

const invoices = [
  { id: 'INV-001', amount: 250 },
  { id: 'INV-002', amount: 90 },
  { id: 'INV-003', amount: 1200 },
]
const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

export const SortableTable = () => {
  const [direction, setDirection] = useState<'ascending' | 'descending' | null>(null)
  const rows = direction
    ? [...invoices].sort((a, b) => (direction === 'ascending' ? a.amount - b.amount : b.amount - a.amount))
    : invoices

  return (
    <TableContainer aria-label="Sortable invoices">
      <Table>
        <TableCaption className="caption-top">Sort amounts numerically with the Amount button.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead scope="col">Invoice</TableHead>
            <TableHead scope="col" aria-sort={direction ?? undefined} className="text-end">
              <Button
                variant="text"
                className="text-inherit"
                iconRight={
                  direction === 'ascending' ? (
                    <IconArrowUp />
                  ) : (
                    <IconArrowDown className={direction ? '' : 'opacity-50'} />
                  )
                }
                onClick={() => setDirection(direction === 'ascending' ? 'descending' : 'ascending')}
              >
                Amount
              </Button>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableHead scope="row">{row.id}</TableHead>
              <TableCell className="text-end tabular-nums">{currency.format(row.amount)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
