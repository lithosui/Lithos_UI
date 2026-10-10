import { PreviewBlock } from '../../components/ui/PreviewBlock'
import { PropsAccordion } from '../../components/ui/PropsTable'
import { SetupGuide } from '../layout/SetupGuide'
import { calendarPropsData } from '../propsData/calendar'
import { removeImports } from '../examples/removeImports'

import { SingleCalendar } from '../examples/calendar/single'
import SingleCalendarSource from '../examples/calendar/single?raw'

import { MultipleCalendar } from '../examples/calendar/multiple'
import MultipleCalendarSource from '../examples/calendar/multiple?raw'

import { MultiColorCalendar } from '../examples/calendar/multicolor'
import MultiColorCalendarSource from '../examples/calendar/multicolor?raw'

import { RainbowCalendar } from '../examples/calendar/rainbow'
import RainbowCalendarSource from '../examples/calendar/rainbow?raw'

import { RangeCalendar } from '../examples/calendar/range'
import RangeCalendarSource from '../examples/calendar/range?raw'

import { DisabledDatesCalendar } from '../examples/calendar/disabledDates'
import DisabledDatesCalendarSource from '../examples/calendar/disabledDates?raw'

import { BoundedYearsCalendar } from '../examples/calendar/boundedYears'
import BoundedYearsCalendarSource from '../examples/calendar/boundedYears?raw'

import { ControlledCalendar } from '../examples/calendar/controlled'
import ControlledCalendarSource from '../examples/calendar/controlled?raw'

import { DocHeader, DocCallout, DocHeading, DocExample, DocLeadText, DocList, DocSection } from '../layout/DocPage'

const githubUrl = 'https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/Calendar.tsx'
const componentNames = ['Calendar']
const manualPath = '../../components/ui/Calendar'

const getCode = (source: string) => ({
  body: removeImports(source),
  componentNames,
  manualPath,
})

const controlledCode = {
  body: removeImports(ControlledCalendarSource),
  componentNames: ['Calendar', 'useState', 'CalendarValue'],
  manualPath: {
    react: ['useState'],
    others: manualPath,
  },
  types: ['CalendarValue'],
}

export const CalendarDoc = () => (
  <div className="max-w-5xl mx-auto px-6">
    <DocHeader
      title="Calendar"
      description="A date grid for picking single dates, multiple dates, or ranges — with month/year jump, bounds, and disabled
          dates."
    />

    <DocSection>
      <DocLeadText>
        Calendar supports three selection modes via the <code>mode</code> prop: <code>single</code> for one date,{' '}
        <code>multiple</code> for any set of individual dates, and <code>range</code> for a contiguous start-to-end
        span. The displayed month and the selection are independently controlled or uncontrolled, so jumping years via
        the header selects never disturbs the current selection.
      </DocLeadText>
      <DocCallout>
        Pass <code>disabledDates</code>, <code>minDate</code>, or <code>maxDate</code> to block off booked or
        out-of-range days. Disabled days are unclickable and skipped by keyboard navigation.
      </DocCallout>
    </DocSection>

    <DocSection>
      <DocHeading id="installation">Installation</DocHeading>
      <SetupGuide
        slug="calendar"
        componentNames={componentNames}
        manualPath={manualPath}
        requires={[
          'utils/cn.ts',
          'utils/yiq.ts',
          'core/types.ts',
          'utils/date.ts',
          'components/ui/Button.tsx',
          'components/ui/icons/IconChevronDown.tsx',
          'components/ui/icons/IconChevronLeft.tsx',
        ]}
      />
    </DocSection>

    <DocHeading id="examples">Examples</DocHeading>

    <DocExample
      id="single"
      title="Single"
      description={
        <>
          Use this to select a single specific date from the calendar grid. It renders the standard monthly calendar
          interface. Selecting a new date unselects the previous one. Does not limit bounds unless min/max props are
          provided. Keyboard navigable via standard arrow keys; selected dates use <code>aria-pressed</code>.
        </>
      }
    >
      <PreviewBlock code={getCode(SingleCalendarSource)} githubUrl={githubUrl}>
        <div className="scale-[0.85] sm:scale-100">
          <SingleCalendar />
        </div>
      </PreviewBlock>
    </DocExample>

    <DocExample
      id="multiple"
      title="Multiple"
      description={
        <>
          Use this when the user needs to select several unconnected dates, such as picking individual days for an event
          schedule. It allows multiple selection within the same grid. Clicking an already selected date toggles it off.
          Navigation and accessibility behavior match the single selection mode.
        </>
      }
    >
      <PreviewBlock code={getCode(MultipleCalendarSource)} githubUrl={githubUrl}>
        <div className="scale-[0.85] sm:scale-100">
          <MultipleCalendar />
        </div>
      </PreviewBlock>
    </DocExample>

    <DocExample
      id="multicolor"
      title="Multicolor"
      description={
        <>
          Use this to visually categorize selected dates into distinct groups, such as different shift types or
          availability tiers. It accepts an array of objects mapping specific dates to custom hex colors. The YIQ
          contrast engine ensures readability inside the colored selection indicators. Behavior is identical to multiple
          selection mode.
        </>
      }
    >
      <PreviewBlock code={getCode(MultiColorCalendarSource)} githubUrl={githubUrl}>
        <div className="scale-[0.85] sm:scale-100">
          <MultiColorCalendar />
        </div>
      </PreviewBlock>
    </DocExample>

    <DocExample
      id="rainbow"
      title="Rainbow"
      description={
        <>
          Use this for playful or highly specific visual differentiation where each selected date is assigned a random
          or sequential color. It behaves exactly like multiple selection but automatically applies a diverse color
          palette to the selected dates. Does not alter structural layout or ARIA states.
        </>
      }
    >
      <PreviewBlock code={getCode(RainbowCalendarSource)} githubUrl={githubUrl}>
        <div className="scale-[0.85] sm:scale-100">
          <RainbowCalendar />
        </div>
      </PreviewBlock>
    </DocExample>

    <DocExample
      id="range"
      title="range"
      description={
        <>
          Use this when the user needs to select a contiguous block of dates, such as a booking period or filter range.
          It requires two clicks: one for the start date and one for the end date, visually connecting all dates in
          between. Hovering before the second click highlights the prospective range.
        </>
      }
    >
      <PreviewBlock code={getCode(RangeCalendarSource)} githubUrl={githubUrl}>
        <div className="scale-[0.85] sm:scale-100">
          <RangeCalendar />
        </div>
      </PreviewBlock>
    </DocExample>

    <DocExample
      id="disabled-dates"
      title="Disabled dates"
      description={
        <>
          Use this to prevent selection of specific days, such as past dates, fully booked days, or holidays. Pass an
          array of dates or bounds to make them unclickable. They render with reduced opacity and a crossed-out visual
          style. Disabled dates are explicitly marked with <code>aria-disabled="true"</code> for screen readers.
        </>
      }
    >
      <PreviewBlock code={getCode(DisabledDatesCalendarSource)} githubUrl={githubUrl}>
        <div className="scale-[0.85] sm:scale-100">
          <DisabledDatesCalendar />
        </div>
      </PreviewBlock>
    </DocExample>

    <DocExample
      id="bounded-years"
      title="Bounded years"
      description={
        <>
          Use this to constrain the year dropdown navigation to a specific range, such as historical data (e.g., [1940,
          2024]). It limits the selectable years in the header dropdown menu without affecting the month grid layout.
          Prevents out-of-bounds navigation.
        </>
      }
    >
      <PreviewBlock code={getCode(BoundedYearsCalendarSource)} githubUrl={githubUrl}>
        <div className="scale-[0.85] sm:scale-100">
          <BoundedYearsCalendar />
        </div>
      </PreviewBlock>
    </DocExample>

    <DocExample
      id="controlled"
      title="Controlled"
      description={
        <>
          Use this to explicitly manage the calendar's internal state (selected dates and visible month) from a parent
          component. Pass <code>value</code> and <code>month</code> alongside their respective change handlers. Visually
          identical to uncontrolled variants, but guarantees sync with external state logic.
        </>
      }
    >
      <PreviewBlock code={controlledCode} githubUrl={githubUrl}>
        <div className="scale-[0.85] sm:scale-100">
          <ControlledCalendar />
        </div>
      </PreviewBlock>
    </DocExample>

    <DocSection>
      <DocHeading id="accessibility">Accessibility</DocHeading>
      <DocList>
        <li>
          Uses <code>role="grid"</code>, <code>role="row"</code>, and <code>role="gridcell"</code> to create a
          semantically correct grid structure.
        </li>
        <li>
          Uses <code>display: contents</code> on rows to preserve the zero-gap grid layout while maintaining standard
          ARIA parent-child relationships.
        </li>
        <li>
          Uses <code>aria-selected</code> on the gridcells to indicate active selections.
        </li>
        <li>
          Applies <code>aria-disabled</code> to dates out of bounds or marked as disabled.
        </li>
        <li>
          Fully keyboard navigable (arrow keys to move between days, PageUp/PageDown for months, Home/End for week
          boundaries).
        </li>
      </DocList>
    </DocSection>

    <DocSection>
      <DocHeading id="api">API Reference</DocHeading>
      <DocCallout>
        <strong>Note:</strong> Border radius is configurable globally via the <code>--lithos-radius</code> CSS token, or
        per-instance via <code>className</code>.
      </DocCallout>
      <PropsAccordion title="Calendar Props" data={calendarPropsData} />
    </DocSection>
  </div>
)
