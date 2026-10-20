import { PreviewBlock } from '../../components/ui/PreviewBlock'
import { PropsAccordion } from '../../components/ui/PropsTable'
import { SetupGuide } from '../layout/SetupGuide'
import { paginationPropsData } from '../propsData/pagination'
import type { UsageCodeConfig } from '../utils/deriveUsageCode'
import { BasicPagination } from '../examples/pagination/BasicPagination'
import basicSource from '../examples/pagination/BasicPagination.tsx?raw'
import { PaginationStyles } from '../examples/pagination/PaginationStyles'
import { PaginationSizes } from '../examples/pagination/PaginationSizes'
import sizesSource from '../examples/pagination/PaginationSizes.tsx?raw'
import { PaginationPosition } from '../examples/pagination/PaginationPosition'
import positionSource from '../examples/pagination/PaginationPosition.tsx?raw'
import { PaginationShapes } from '../examples/pagination/PaginationShapes'
import shapesSource from '../examples/pagination/PaginationShapes.tsx?raw'

const exampleCode = (source: string): UsageCodeConfig => ({
  body: source.replace(/^import[^\n]+\r?\n/gm, '').trim(),
  componentNames: source.includes('import { useState }') ? ['useState', 'Pagination'] : ['Pagination'],
  manualPath: { react: ['useState'], Pagination: '../../components/ui/Pagination' },
})
const heading = 'mt-12 mb-4 text-2xl font-black tracking-tight text-(--lithos-text)'
const subheading = 'mt-8 mb-4 text-xl font-black text-(--lithos-text)'
const paragraph = 'mb-6 font-body text-base leading-relaxed text-(--lithos-text) opacity-80'

export const PaginationDoc = () => (
  <div className="max-w-5xl mx-auto px-6 min-w-0">
    <header className="mt-0">
      <h1 className="mb-8 text-4xl md:text-5xl font-black tracking-tight leading-none text-(--lithos-text)">
        Pagination
      </h1>
      <p className="mt-2 max-w-2xl text-lg md:text-xl font-display opacity-70 text-(--lithos-text)">
        Navigate collections with numbered pages, dots, tracks, and progress indicators.
      </p>
      <hr className="border-t-2 border-(--lithos-border) my-8" />
    </header>
    <h2 id="installation" className={heading}>
      Installation
    </h2>
    <SetupGuide componentNames={['Pagination']} manualPath="../../components/ui/Pagination" slug="pagination" />
    <section aria-labelledby="examples" className="mb-12">
      <h2 id="examples" className={heading}>
        Examples
      </h2>
      <h3 id="basic" className={subheading}>
        Basic
      </h3>
      <p className={paragraph}>
        Pass the total number of pages directly to <code>count</code> (for example, <code>count={12}</code>). Control
        the displayed records with a one-based <code>page</code> and <code>onPageChange</code>. Page groups keep a
        single ellipsis in the middle, such as <code>1 2 ··· 5 6</code>. The current page group moves as you navigate.
        Double chevrons jump to the first or last page; single chevrons move one page at a time.
      </p>
      <PreviewBlock code={exampleCode(basicSource)}>
        <BasicPagination />
      </PreviewBlock>
      <h3 id="styles" className={subheading}>
        Styles
      </h3>
      <p className={paragraph}>
        Choose classic, dots, bordered, track, compact, or progress. Each style is interactive and follows the selected
        Lithos accent.
      </p>
      <PaginationStyles />
      <h3 id="shapes" className={subheading}>
        Shapes
      </h3>
      <p className={paragraph}>
        Use <code>shape="square"</code> for straight corners or <code>shape="pill"</code> for round controls and
        indicators. Shape is independent of the pagination style.
      </p>
      <PreviewBlock code={exampleCode(shapesSource)}>
        <PaginationShapes />
      </PreviewBlock>
      <h3 id="position" className={subheading}>
        Position
      </h3>
      <p className={paragraph}>
        Set <code>position</code> to <code>left</code>, <code>center</code>, or <code>right</code> to align the controls
        within their container.
      </p>
      <PreviewBlock code={exampleCode(positionSource)}>
        <PaginationPosition />
      </PreviewBlock>
      <h3 id="sizes" className={subheading}>
        Sizes
      </h3>
      <p className={paragraph}>
        Choose small, medium, or large controls. Use compact or progress styles for narrow layouts.
      </p>
      <PreviewBlock code={exampleCode(sizesSource)}>
        <PaginationSizes />
      </PreviewBlock>
    </section>
    <h2 id="accessibility" className={heading}>
      Accessibility
    </h2>
    <ul className="mb-8 list-disc ps-6 space-y-3 font-body leading-relaxed">
      <li>
        Tab focuses available controls. Enter and Space select a page. Native buttons never submit the enclosing form.
      </li>
      <li>
        The current page exposes <code>aria-current="page"</code>. Dots have page labels, and a polite status announces
        the current page in every style.
      </li>
      <li>
        First, previous, next, and last controls stop at the page boundaries. The single centered ellipsis is decorative
        and cannot be focused.
      </li>
      <li>
        Give multiple pagers distinct names using <code>aria-label</code>. Controlled page state and displayed records
        should update together when the page count changes.
      </li>
    </ul>
    <h2 id="api" className={heading}>
      API Reference
    </h2>
    <PropsAccordion title="Pagination Props" data={paginationPropsData} />
  </div>
)
