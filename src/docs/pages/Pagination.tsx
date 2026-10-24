import { PreviewBlock } from '../../components/ui/PreviewBlock'
import { PropsAccordion } from '../../components/ui/PropsTable'
import { SetupGuide } from '../layout/SetupGuide'
import { paginationPropsData } from '../propsData/pagination'
import { DocExample, DocHeader, DocHeading, DocList, DocSection } from '../layout/DocPage'
import { removeImports } from '../examples/removeImports'
import { BasicPagination } from '../examples/pagination/BasicPagination'
import basicSource from '../examples/pagination/BasicPagination.tsx?raw'
import { PaginationPosition } from '../examples/pagination/PaginationPosition'
import positionSource from '../examples/pagination/PaginationPosition.tsx?raw'
import { PaginationShapes } from '../examples/pagination/PaginationShapes'
import shapesSource from '../examples/pagination/PaginationShapes.tsx?raw'
import { PaginationSizes } from '../examples/pagination/PaginationSizes'
import sizesSource from '../examples/pagination/PaginationSizes.tsx?raw'
import { ClassicPagination } from '../examples/pagination/classic'
import classicSource from '../examples/pagination/classic.tsx?raw'
import { DotsPagination } from '../examples/pagination/dots'
import dotsSource from '../examples/pagination/dots.tsx?raw'
import { BorderedPagination } from '../examples/pagination/bordered'
import borderedSource from '../examples/pagination/bordered.tsx?raw'
import { TrackPagination } from '../examples/pagination/track'
import trackSource from '../examples/pagination/track.tsx?raw'
import { CompactPagination } from '../examples/pagination/compact'
import compactSource from '../examples/pagination/compact.tsx?raw'
import { ProgressPagination } from '../examples/pagination/progress'
import progressSource from '../examples/pagination/progress.tsx?raw'

const manualPath = { others: '../../components/ui/Pagination', react: ['useState'] }
const paginationCode = (source: string, usesState = false) => ({
  body: removeImports(source),
  componentNames: usesState ? ['Pagination', 'useState'] : ['Pagination'],
  manualPath,
})

const githubUrl = 'https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/Pagination.tsx'

export const PaginationDoc = () => (
  <div className="max-w-5xl mx-auto px-6 min-w-0">
    <DocHeader
      title="Pagination"
      description="Navigate collections with numbered pages, dots, tracks, and progress indicators."
    />

    <DocSection>
      <DocHeading id="installation">Installation</DocHeading>
      <SetupGuide componentNames={['Pagination']} manualPath="../../components/ui/Pagination" slug="pagination" />
    </DocSection>

    <DocSection>
      <DocHeading id="examples">Examples</DocHeading>
      <DocExample
        id="basic"
        title="Basic"
        description={
          <>
            Pass the total number of pages directly to <code>count</code> (for example, <code>count={12}</code>).
            Control the displayed records with a one-based <code>page</code> and <code>onPageChange</code>. Page groups
            keep a single ellipsis in the middle, such as <code>1 2 ··· 5 6</code>. The current page group moves as you
            navigate. Double chevrons jump to the first or last page; single chevrons move one page at a time.
          </>
        }
      >
        <PreviewBlock code={paginationCode(basicSource, true)} githubUrl={githubUrl}>
          <BasicPagination />
        </PreviewBlock>
      </DocExample>

      <DocHeading id="styles" level="h3">
        Styles
      </DocHeading>
      <DocExample
        id="style-classic"
        title="Classic"
        description="Numbered controls with an accent-filled current page."
        headingLevel="h4"
      >
        <PreviewBlock code={paginationCode(classicSource)} githubUrl={githubUrl}>
          <ClassicPagination />
        </PreviewBlock>
      </DocExample>
      <DocExample
        id="style-dots"
        title="Dots"
        description="Compact page markers with a wider indicator for the current page."
        headingLevel="h4"
      >
        <PreviewBlock code={paginationCode(dotsSource)} githubUrl={githubUrl}>
          <DotsPagination />
        </PreviewBlock>
      </DocExample>
      <DocExample
        id="style-bordered"
        title="Bordered"
        description="Outlined page controls with an accent border on the current page."
        headingLevel="h4"
      >
        <PreviewBlock code={paginationCode(borderedSource)} githubUrl={githubUrl}>
          <BorderedPagination />
        </PreviewBlock>
      </DocExample>
      <DocExample
        id="style-track"
        title="Track"
        description="An accent marker highlights the current page without a baseline under the other numbers."
        headingLevel="h4"
      >
        <PreviewBlock code={paginationCode(trackSource)} githubUrl={githubUrl}>
          <TrackPagination />
        </PreviewBlock>
      </DocExample>
      <DocExample
        id="style-compact"
        title="Compact"
        description="Previous and next controls surround a short page counter."
        headingLevel="h4"
      >
        <PreviewBlock code={paginationCode(compactSource)} githubUrl={githubUrl}>
          <CompactPagination />
        </PreviewBlock>
      </DocExample>
      <DocExample
        id="style-progress"
        title="Progress"
        description="A progress bar and page counter show your place in the collection."
        headingLevel="h4"
      >
        <PreviewBlock code={paginationCode(progressSource)} githubUrl={githubUrl}>
          <ProgressPagination />
        </PreviewBlock>
      </DocExample>

      <DocExample
        id="shapes"
        title="Shapes"
        description={
          <>
            Use <code>shape="square"</code> for straight corners or <code>shape="pill"</code> for round controls and
            indicators. Shape is independent of the pagination style.
          </>
        }
      >
        <PreviewBlock code={paginationCode(shapesSource)} githubUrl={githubUrl}>
          <PaginationShapes />
        </PreviewBlock>
      </DocExample>
      <DocExample
        id="position"
        title="Position"
        description={
          <>
            Set <code>position</code> to <code>left</code>, <code>center</code>, or <code>right</code> to align the
            controls within their container.
          </>
        }
      >
        <PreviewBlock code={paginationCode(positionSource)} githubUrl={githubUrl}>
          <PaginationPosition />
        </PreviewBlock>
      </DocExample>
      <DocExample
        id="sizes"
        title="Sizes"
        description="Choose small, medium, or large controls. Use compact or progress styles for narrow layouts."
      >
        <PreviewBlock code={paginationCode(sizesSource)} githubUrl={githubUrl}>
          <PaginationSizes />
        </PreviewBlock>
      </DocExample>
    </DocSection>

    <DocSection>
      <DocHeading id="accessibility">Accessibility</DocHeading>
      <DocList>
        <li>
          Tab focuses available controls. Enter and Space select a page. Native buttons never submit the enclosing form.
        </li>
        <li>
          The current page exposes <code>aria-current="page"</code>. Dots have page labels, and a polite status
          announces the current page in every style.
        </li>
        <li>
          First, previous, next, and last controls stop at the page boundaries. The single centered ellipsis is
          decorative and cannot be focused.
        </li>
        <li>
          Give multiple pagers distinct names using <code>aria-label</code>. Controlled page state and displayed records
          should update together when the page count changes.
        </li>
      </DocList>
    </DocSection>

    <DocSection>
      <DocHeading id="api">API Reference</DocHeading>
      <PropsAccordion title="Pagination Props" data={paginationPropsData} />
    </DocSection>
  </div>
)
