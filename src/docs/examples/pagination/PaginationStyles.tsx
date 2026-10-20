import { Pagination } from '../../../components/ui/Pagination'
import { PreviewBlock } from '../../../components/ui/PreviewBlock'

const styles = [
  {
    variant: 'classic',
    title: 'Classic',
    page: 2,
    description: 'Numbered controls with an accent-filled current page.',
  },
  {
    variant: 'dots',
    title: 'Dots',
    page: 2,
    description: 'Compact page markers with a wider indicator for the current page.',
  },
  {
    variant: 'bordered',
    title: 'Bordered',
    page: 2,
    description: 'Outlined page controls with an accent border on the current page.',
  },
  {
    variant: 'track',
    title: 'Track',
    page: 3,
    description: 'An accent marker highlights the current page without a baseline under the other numbers.',
  },
  {
    variant: 'compact',
    title: 'Compact',
    page: 3,
    description: 'Previous and next controls surround a short page counter.',
  },
  {
    variant: 'progress',
    title: 'Progress',
    page: 3,
    description: 'A progress bar and page counter show your place in the collection.',
  },
] as const

export const PaginationStyles = () => (
  <>
    {styles.map(({ variant, title, page, description }) => (
      <section key={variant} aria-labelledby={`style-${variant}`}>
        <h4 id={`style-${variant}`} className="mt-8 mb-3 text-lg font-black text-(--lithos-text)">
          {title}
        </h4>
        <p className="mb-6 font-body text-base leading-relaxed text-(--lithos-text) opacity-80">{description}</p>
        <PreviewBlock
          code={{
            componentNames: ['Pagination'],
            manualPath: '../../components/ui/Pagination',
            body: `<Pagination
  count={5}
  defaultPage={${page}}
  variant="${variant}"
  position="center"
  aria-label="${title} pages"
/>`,
          }}
        >
          <Pagination count={5} defaultPage={page} variant={variant} position="center" aria-label={`${title} pages`} />
        </PreviewBlock>
      </section>
    ))}
  </>
)
