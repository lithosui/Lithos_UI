import { useRef } from 'react'
import { IconCheck } from '../../../components/ui/icons/IconCheck'
import { IconCopy } from '../../../components/ui/icons/IconCopy'
import { IconEdit } from '../../../components/ui/icons/IconEdit'
import { IconEye } from '../../../components/ui/icons/IconEye'
import { IconMoreHorizontal } from '../../../components/ui/icons/IconMoreHorizontal'
import { IconTrash } from '../../../components/ui/icons/IconTrash'
import { Button } from '../../../components/ui/Button'
import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownSeparator,
} from '../../../components/ui/Dropdown'
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
import { InvoiceEditor, InvoiceDetails } from './InvoiceActions'

const dropdownInvoices = demoInvoices.slice(0, 3)
export const DropdownActionsTable = ({ data = dropdownInvoices }: { data?: Invoice[] }) => {
  const actions = useInvoiceActions(data)
  const triggers = useRef(new Map<string, HTMLButtonElement>())
  return (
    <div className="w-full min-w-0">
      <TableContainer ref={actions.tableRef} aria-label="Dropdown invoice actions">
        <Table>
          <TableCaption className="caption-top">Open an invoice menu for actions.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead scope="col">Invoice</TableHead>
              <TableHead scope="col">Customer</TableHead>
              <TableHead scope="col" className="text-end">
                Amount
              </TableHead>
              <TableHead scope="col">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {actions.rows.length ? (
              actions.rows.map((row) => (
                <TableRow key={row.id}>
                  <TableHead scope="row" className="whitespace-nowrap">
                    {row.id}
                  </TableHead>
                  <TableCell>{row.customer}</TableCell>
                  <TableCell className="text-end tabular-nums">{currency.format(row.amount)}</TableCell>
                  <TableCell>
                    <Dropdown matchTriggerWidth={false}>
                      <DropdownTrigger
                        asChild
                        ref={(node) => {
                          if (node) triggers.current.set(row.id, node)
                          else triggers.current.delete(row.id)
                        }}
                      >
                        <Button variant="secondary" aria-label={`Actions for ${row.id}`}>
                          {actions.duplicated.has(row.id) ? (
                            <IconCheck aria-hidden="true" />
                          ) : (
                            <IconMoreHorizontal aria-hidden="true" />
                          )}
                        </Button>
                      </DropdownTrigger>
                      <DropdownContent portaled>
                        <DropdownItem
                          onClick={() => {
                            // Restore a persistent trigger before Dialog captures its return-focus target.
                            triggers.current.get(row.id)?.focus()
                            actions.view(row.id)
                          }}
                        >
                          <IconEye className="mr-2" aria-hidden="true" />
                          View
                        </DropdownItem>
                        <DropdownItem
                          onClick={() => {
                            const trigger = triggers.current.get(row.id)
                            if (trigger) actions.startEdit(row, trigger)
                          }}
                        >
                          <IconEdit className="mr-2" aria-hidden="true" />
                          Edit
                        </DropdownItem>
                        <DropdownItem onClick={() => void actions.duplicateRows([row], row.id)}>
                          {actions.duplicated.has(row.id) ? (
                            <IconCheck className="mr-2" aria-hidden="true" />
                          ) : (
                            <IconCopy className="mr-2" aria-hidden="true" />
                          )}
                          {actions.duplicated.has(row.id) ? 'Duplicated' : 'Duplicate'}
                        </DropdownItem>
                        <DropdownSeparator />
                        <DropdownItem onClick={() => actions.deleteRows(new Set([row.id]))}>
                          <IconTrash className="mr-2" aria-hidden="true" />
                          Delete
                        </DropdownItem>
                      </DropdownContent>
                    </Dropdown>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4}>No invoices remaining.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <InvoiceEditor actions={actions} />
      <InvoiceDetails actions={actions} />
    </div>
  )
}
