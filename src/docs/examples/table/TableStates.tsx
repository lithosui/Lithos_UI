import { useId, useState } from 'react'
import { useToast } from '../../../components/ui/toast/useToast'
import { Badge } from '../../../components/ui/Badge'
import { Button } from '../../../components/ui/Button'
import { Spinner } from '../../../components/ui/Spinner'
import { Select, SelectTrigger, SelectContent, SelectItem } from '../../../components/ui/Select'
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

export const TableStates = () => {
  const { addToast } = useToast()
  const id = useId()
  const [state, setState] = useState('ready')

  return (
    <div className="w-full min-w-0">
      <div className="mb-4 flex items-center">
        <span id={id} className="mr-2 font-bold">
          Preview state
        </span>
        <Select
          value={state}
          onChange={(value) => {
            setState(value)
            if (value === 'error')
              addToast({ title: 'Load failed', message: 'Inventory could not be loaded.', intent: 'error' })
          }}
        >
          <SelectTrigger aria-labelledby={id} className="px-3 py-2">
            <span>{state.charAt(0).toUpperCase() + state.slice(1)}</span>
            <IconChevronDown className="ml-2 size-4 shrink-0" aria-hidden="true" />
          </SelectTrigger>
          <SelectContent>
            {['ready', 'loading', 'empty', 'error'].map((value, index) => (
              <SelectItem key={value} value={value} index={index}>
                {value.charAt(0).toUpperCase() + value.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div role="status" className="sr-only">
        {state === 'loading' ? 'Loading inventory' : state === 'ready' ? 'Inventory ready' : ''}
      </div>
      <TableContainer aria-label="Inventory preview" className="max-h-72">
        <Table size="sm" striped hoverable stickyHeader aria-busy={state === 'loading'}>
          <TableCaption className="caption-top">
            Inventory preview with a sticky header and compact entries.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead scope="col">Product</TableHead>
              <TableHead scope="col">Availability</TableHead>
              <TableHead scope="col" className="text-end">
                Stock
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {state === 'ready' ? (
              Array.from({ length: 12 }, (_, index) => (
                <TableRow key={`SKU-${index + 1}`}>
                  <TableHead scope="row" className="min-w-56">
                    {index === 0
                      ? 'Studio monitor with an extra-long product description that wraps naturally'
                      : `Studio accessory ${index + 1}`}
                  </TableHead>
                  <TableCell>
                    <Badge intent={index % 3 === 0 ? 'warning' : 'success'}>
                      {index % 3 === 0 ? 'Low stock' : 'Available'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-end tabular-nums">{index * 7 + 2}</TableCell>
                </TableRow>
              ))
            ) : state === 'loading' ? (
              <TableRow>
                <TableCell colSpan={3} className="h-40 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <Spinner size={32} aria-hidden="true" className="text-(--lithos-accent)" />
                    <span className="mt-3">Loading inventory</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : state === 'empty' ? (
              <TableRow>
                <TableCell colSpan={3} className="h-40 text-center">
                  <div className="flex flex-col items-center">
                    <span>No products yet. Add your first product to get started.</span>
                    <Button className="mt-3" onClick={() => setState('ready')}>
                      Add product
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="h-40 text-center">
                  <div className="flex flex-col items-center">
                    <p>Inventory could not be loaded. Try again.</p>
                    <Button className="mt-3" onClick={() => setState('ready')}>
                      Retry
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
