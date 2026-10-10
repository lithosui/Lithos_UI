import { PreviewBlock } from '../../components/ui/PreviewBlock'
import { PropsAccordion } from '../../components/ui/PropsTable'
import { CodeViewer } from '../../components/ui/CodeViewer'
import { SetupGuide } from '../layout/SetupGuide'
import { tableContainerPropsData, tablePartsPropsData, tablePropsData } from '../propsData/table'

import { BasicTable } from '../examples/table/BasicTable'
import BasicTableSource from '../examples/table/BasicTable?raw'

import { AccentTable } from '../examples/table/AccentTable'
import AccentTableSource from '../examples/table/AccentTable?raw'

import { TableStates } from '../examples/table/TableStates'
import TableStatesSource from '../examples/table/TableStates?raw'

import { BulkActionsTable } from '../examples/table/BulkActions'
import BulkActionsTableSource from '../examples/table/BulkActions?raw'

import { RowActionsTable } from '../examples/table/RowActions'
import RowActionsTableSource from '../examples/table/RowActions?raw'

import { DropdownActionsTable } from '../examples/table/DropdownActions'
import DropdownActionsTableSource from '../examples/table/DropdownActions?raw'

import hookSource from '../examples/table/useInvoiceActions?raw'
import actionsSource from '../examples/table/InvoiceActions?raw'

import { ResponsiveTable } from '../examples/table/ResponsiveTable'
import ResponsiveTableSource from '../examples/table/ResponsiveTable?raw'

import type { UsageCodeConfig } from '../utils/deriveUsageCode'

import { SortableTable } from '../examples/table/SortableTable'
import sortableSource from '../examples/table/SortableTable.tsx?raw'

import { GroupedHeadersTable } from '../examples/table/GroupedHeaders'
import GroupedHeadersTableSource from '../examples/table/GroupedHeaders.tsx?raw'

import {
  DocHeader,
  DocCallout,
  DocHeading,
  DocExample,
  DocLeadText,
  DocList,
  DocSection,
  Code,
} from '../layout/DocPage'

/** Bundle local example helpers so each PreviewBlock is independently copyable. */
const tableExampleCode = (...sources: string[]): UsageCodeConfig => {
  const componentNames = new Set<string>()
  const manualPath: Record<string, string | string[]> = {}
  const body = sources
    .map((source) =>
      source
        .replace(/^import\s*\{([^}]+)\}\s*from\s*['"]([^'"]+)['"]\s*\r?\n/gm, (_, imported: string, path: string) => {
          // These definitions are included in the bundled helper source.
          if (path === './InvoiceActions' || path === './useInvoiceActions') return ''
          const names = imported
            .split(',')
            .map((name) => name.trim())
            .filter(Boolean)
          names.forEach((name) => componentNames.add(name))
          if (path.startsWith('../../../')) {
            names.forEach((name) => {
              manualPath[name] = path.replace('../../../', '../../')
            })
          } else {
            manualPath[path] = [...new Set([...((manualPath[path] as string[]) ?? []), ...names])]
          }
          return ''
        })
        .trim()
    )
    .join('\n\n')
  return { body, componentNames: [...componentNames], manualPath }
}

const tableNames = [
  'Table',
  'TableBody',
  'TableCaption',
  'TableCell',
  'TableContainer',
  'TableFooter',
  'TableHead',
  'TableHeader',
  'TableRow',
]

export const TableDoc = () => (
  <div className="max-w-5xl mx-auto px-6 min-w-0">
    <DocHeader
      title="Table"
      description="Display structured data with contrasting headers, responsive layouts, sorting, and row actions."
    />

    <DocSection>
      <DocLeadText>
        Basic table uses the non-sticky default; States demonstrates a sticky header with state-driven feedback. The
        examples also compose <Code text="Badge" />, <Code text="Button" />, <Code text="Checkbox" />,{' '}
        <Code text="Input" />, <Code text="Spinner" />, <Code text="Dialog" />, <Code text="Dropdown" />,{' '}
        <Code text="Select" />, <Code text="Toast" />, and the shared Lithos icon components. Wrap your application in{' '}
        <Code text="ToastProvider" /> to use the States and action examples; load failures and action results use Toast
        notifications.
      </DocLeadText>
    </DocSection>

    <DocSection>
      <DocHeading id="installation">Installation</DocHeading>
      <SetupGuide
        slug="table"
        componentNames={tableNames}
        manualPath="../../components/ui/Table"
        requires={['utils/cn.ts']}
      />
    </DocSection>

    <DocHeading id="examples">Examples</DocHeading>

    <DocExample
      id="basic"
      title="Basic"
      description={
        <>
          Display invoices with a caption, row labels, and a totals footer. Text wraps naturally, and the container
          scrolls horizontally when the content needs more space.
        </>
      }
    >
      <PreviewBlock code={tableExampleCode(BasicTableSource)}>
        <BasicTable />
      </PreviewBlock>
    </DocExample>

    <DocExample
      id="accent"
      title="Accent"
      description={
        <>
          Set <Code text='variant="accent"' /> on TableHeader to use the selected theme accent. Header text adapts
          through Lithos's contrast engine. Change the theme accent to see the header update in light and Obsidian
          modes.
        </>
      }
    >
      <PreviewBlock code={tableExampleCode(AccentTableSource)}>
        <AccentTable />
      </PreviewBlock>
    </DocExample>

    <DocExample
      id="table-states"
      title="States"
      description={
        <>
          Use Preview state to switch between inventory, loading, empty, and error views. This demo combines compact,
          striped rows with a sticky header and loading feedback. Add product and Retry restore the sample inventory.
        </>
      }
    >
      <PreviewBlock code={tableExampleCode(TableStatesSource)}>
        <TableStates />
      </PreviewBlock>
    </DocExample>

    <DocExample
      id="sortable-table"
      title="Sorting"
      description={
        <>
          Activate the Amount header to sort invoices from lowest to highest or highest to lowest. Amounts are sorted
          numerically, and the direction is shown by an arrow and announced to assistive technology.
        </>
      }
    >
      <PreviewBlock code={tableExampleCode(sortableSource)}>
        <SortableTable />
      </PreviewBlock>
    </DocExample>

    <DocExample
      id="grouped-headers"
      title="Grouped Headers"
      description={
        <>
          Group Online and Retail under Units sold while Product spans both header rows. Scroll the table to see both
          header rows stay visible together.
        </>
      }
    >
      <PreviewBlock code={tableExampleCode(GroupedHeadersTableSource)}>
        <GroupedHeadersTable />
      </PreviewBlock>
    </DocExample>

    <DocExample
      id="responsive"
      title="Responsive"
      description={
        <>
          Adjust the width slider to move lower-priority columns into expandable row details. Use each row's chevron to
          reveal the hidden values. The layout responds to its container, including narrow panels on a desktop.
        </>
      }
    >
      <PreviewBlock code={tableExampleCode(ResponsiveTableSource)}>
        <ResponsiveTable />
      </PreviewBlock>
    </DocExample>

    <DocExample
      id="bulk-actions"
      title="Bulk Actions"
      description={
        <>
          Select invoices across pages, then duplicate or delete the selection. The header checkbox selects only the
          current page; selections remain when sorting or filtering. Edit is available when exactly one invoice is
          selected. Action icons appear only while at least one invoice is selected. Changes stay in this demo.
          Duplicate preserves the current page, filter, and sort, so new rows may appear on another page or be hidden by
          the filter. Toast notifications identify the affected invoices, including selections outside the current view.
        </>
      }
    >
      <PreviewBlock code={tableExampleCode(hookSource, actionsSource, BulkActionsTableSource)}>
        <BulkActionsTable />
      </PreviewBlock>
    </DocExample>

    <DocExample
      id="row-actions"
      title="Row Actions"
      description={
        <>
          Add an invoice or use a row's icon buttons to view details, edit the customer name, duplicate, or delete it.
          View opens a dialog; Duplicate appends a row with a new ID and briefly shows a check. Changes stay in this
          demo.
        </>
      }
    >
      <PreviewBlock code={tableExampleCode(hookSource, actionsSource, RowActionsTableSource)}>
        <RowActionsTable />
      </PreviewBlock>
    </DocExample>

    <DocExample
      id="dropdown-actions"
      title="Dropdown Actions"
      description={
        <>
          Open a row's menu to view details, edit the customer name, duplicate, or delete that invoice. The menu opens
          outside the scroll container to avoid clipping and supports keyboard navigation. Changes stay in this demo.
        </>
      }
    >
      <PreviewBlock code={tableExampleCode(hookSource, actionsSource, DropdownActionsTableSource)}>
        <DropdownActionsTable />
      </PreviewBlock>
    </DocExample>

    <DocSection>
      <DocHeading id="anatomy">Anatomy</DocHeading>
      <CodeViewer
        language="tsx"
        code={`<TableContainer>
  <Table>
    <TableCaption />
    <TableHeader>
      <TableRow>
        <TableHead />
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell />
      </TableRow>
    </TableBody>
    <TableFooter>
      <TableRow>
        <TableCell />
      </TableRow>
    </TableFooter>
  </Table>
</TableContainer>`}
      />
    </DocSection>

    <DocSection>
      <DocHeading id="accessibility">Accessibility</DocHeading>
      <DocList>
        <li>
          Name the scroll region and give the table a caption or accessible label. Use scope on column and row headers.
        </li>
        <li>
          Keep native table semantics. Sorting buttons and selection checkboxes provide keyboard interaction; rows are
          not clickable controls.
        </li>
        <li>
          TableRow selection is visual. Use labeled checkboxes to expose selection, and aria-sort on the active sorted
          header.
        </li>
        <li>
          Loading uses aria-busy with a status message outside the busy table. Empty and error rows span the current
          number of visible columns.
        </li>
        <li>
          For sticky headers, set a max-height on TableContainer. The entire header group sticks together, including
          multi-row headers. Separate borders preserve the header divider while scrolling.
        </li>
        <li>
          Text alignment follows writing direction. Use text-end and tabular-nums for numeric columns. Apply
          whitespace-nowrap selectively, and break-all for unbroken identifiers where needed.
        </li>
        <li>
          Use a portal-based Dropdown or Popover for menus that must escape the scroll container. Keep adequate contrast
          when customizing cell or row colors.
        </li>
      </DocList>
    </DocSection>

    <DocSection>
      <DocHeading id="api">API Reference</DocHeading>
      <DocCallout>
        <strong>Note:</strong> Border radius is configurable globally via the <code>--lithos-radius</code> CSS token, or
        per-instance via <Code text="className" />.
      </DocCallout>

      <PropsAccordion title="Table Props" data={tablePropsData} />
      <PropsAccordion title="TableContainer Props" data={tableContainerPropsData} />
      <PropsAccordion title="Table Parts" data={tablePartsPropsData} />
    </DocSection>
  </div>
)
