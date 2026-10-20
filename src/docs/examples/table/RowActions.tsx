import { IconCheck } from '../../../components/ui/icons/IconCheck'
import { IconCopy } from '../../../components/ui/icons/IconCopy'
import { IconEdit } from '../../../components/ui/icons/IconEdit'
import { IconEye } from '../../../components/ui/icons/IconEye'
import { IconTrash } from '../../../components/ui/icons/IconTrash'
import { Button } from '../../../components/ui/Button'
import { Badge } from '../../../components/ui/Badge'
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
import { InvoiceEditor, InvoiceDetails } from './InvoiceActions'

const rowActionInvoices = demoInvoices.slice(0, 3)
export const RowActionsTable = ({ data = rowActionInvoices }: { data?: Invoice[] }) => {
  const actions = useInvoiceActions(data)
  return (
    <div className="w-full min-w-0">
      <Button className="mb-3" onClick={actions.addRow}>
        New invoice
      </Button>
      <TableContainer ref={actions.tableRef} aria-label="Row invoice actions">
        <Table>
          <TableCaption className="caption-top">View, edit, delete, or duplicate an individual invoice.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead scope="col">Invoice</TableHead>
              <TableHead scope="col">Customer</TableHead>
              <TableHead scope="col">Status</TableHead>
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
                  <TableCell>
                    <Badge intent={row.status === 'Paid' ? 'success' : 'warning'}>{row.status}</Badge>
                  </TableCell>
                  <TableCell className="text-end tabular-nums">{currency.format(row.amount)}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="text"
                            className="mr-1 p-2"
                            aria-label={`View ${row.id}`}
                            onClick={() => actions.view(row.id)}
                          >
                            <IconEye aria-hidden="true" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>View invoice</TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="text"
                            className="mr-1 p-2"
                            aria-label={`Edit ${row.id}`}
                            onClick={(event) => actions.startEdit(row, event.currentTarget)}
                          >
                            <IconEdit aria-hidden="true" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Edit invoice</TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="text"
                            className="mr-1 p-2"
                            aria-label={`Delete ${row.id}`}
                            onClick={() => actions.deleteRows(new Set([row.id]))}
                          >
                            <IconTrash aria-hidden="true" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Delete invoice</TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="text"
                            className="p-2"
                            aria-label={`${actions.duplicated.has(row.id) ? 'Duplicated' : 'Duplicate'} ${row.id}`}
                            onClick={() => void actions.duplicateRows([row], row.id)}
                          >
                            {actions.duplicated.has(row.id) ? (
                              <IconCheck aria-hidden="true" />
                            ) : (
                              <IconCopy aria-hidden="true" />
                            )}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          {actions.duplicated.has(row.id) ? 'Duplicated invoice' : 'Duplicate invoice'}
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5}>No invoices remaining.</TableCell>
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
