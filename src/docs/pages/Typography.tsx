import { PreviewBlock } from '../../components/ui/PreviewBlock'
import { Typography } from '../../components/ui/Typography'
import { PropsAccordion } from '../../components/ui/PropsTable'
import { SetupGuide } from '../layout/SetupGuide'
import { typographyPropsData } from '../propsData/typography'

const githubUrl = 'https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/Typography.tsx'
const manualPath = '../../components/ui/Typography'

const articleSnippetCode = {
  body: `export const Article = () => {
  return (
    <article className="p-6 bg-(--lithos-bg) border-2 border-(--lithos-border) shadow-[4px_4px_0px_0px_var(--lithos-shadow)] flex flex-col space-y-4">
      <Typography variant="caption">Featured Note</Typography>
      <Typography variant="h2">Raw Layout Clarity</Typography>
      <Typography variant="p">Lithos UI relies on <Typography variant="mark">structural weight</Typography> and high contrast rather than smooth gradients.</Typography>
      <Typography variant="blockquote">"Neobrutalism is not about ugly UI, it is about raw layout clarity."</Typography>
      <Typography variant="small" className="text-(--lithos-text)/80">Run <Typography variant="code">npm i lithos-ui</Typography> to get started.</Typography>
    </article>
  )
}
  `,
  componentNames: ['Typography'],
  manualPath,
}

const usageCode = {
  body: `export const UsageCode = () => {
  return (
    <div className="flex flex-col space-y-6">
      <Typography variant="h1">H1 - Display Title</Typography>
      <Typography variant="h2">H2 - Section Header</Typography>
      <Typography variant="h3">H3 - Sub section Header</Typography>
      <Typography variant="h4">H4 - Card Title</Typography>
      <Typography variant="h5">H5 - Small Header</Typography>
      <Typography variant="h6">H6 - Micro Header</Typography>
      <Typography>
        Body - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Seamless fluid typography built for
        high-contrast interfaces.
      </Typography>
      <Typography variant="blockquote">
        Blockquote - "Neobrutalism is not about ugly UI, it is about raw layout clarity and structural personality."
      </Typography>
      <Typography variant="label">Label - Label Example</Typography>
      <div>
        <Typography variant="caption">Caption - CAPTION TEXT</Typography>
      </div>
      <div>
        Text with <Typography variant="mark">highlighted mark</Typography> and inline{' '}
        <Typography variant="code">const code = true</Typography> snippets.
      </div>
    </div>
  )
}`,
  componentNames: ['Typography'],
  manualPath,
}

const ArticleSnippet = () => {
  return (
    <article className="p-6 bg-(--lithos-bg) border-2 border-(--lithos-border) shadow-[4px_4px_0px_0px_var(--lithos-shadow)] flex flex-col space-y-4">
      <Typography variant="caption">Featured Note</Typography>

      <Typography variant="h2">Raw Layout Clarity</Typography>

      <Typography>
        Lithos UI relies on <Typography variant="mark">structural weight</Typography> and high contrast rather than
        smooth gradients.
      </Typography>

      <Typography variant="blockquote">"Neobrutalism is not about ugly UI, it is about raw layout clarity."</Typography>

      <Typography variant="small" className="text-(--lithos-text)/80">
        Run <Typography variant="code">npm i lithos-ui</Typography> to get started.
      </Typography>
    </article>
  )
}

const UsagePreview = () => {
  return (
    <div className="flex flex-col space-y-6">
      <Typography variant="h1">H1 - Display Title</Typography>
      <Typography variant="h2">H2 - Section Header</Typography>
      <Typography variant="h3">H3 - Sub section Header</Typography>
      <Typography variant="h4">H4 - Card Title</Typography>
      <Typography variant="h5">H5 - Small Header</Typography>
      <Typography variant="h6">H6 - Micro Header</Typography>
      <Typography>
        Body - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Seamless fluid typography built for
        high-contrast interfaces.
      </Typography>
      <Typography variant="blockquote">
        Blockquote - "Neobrutalism is not about ugly UI, it is about raw layout clarity and structural personality."
      </Typography>
      <Typography variant="label">Label - Label Example</Typography>
      <div>
        <Typography variant="caption">Caption - CAPTION TEXT</Typography>
      </div>
      <div>
        Text with <Typography variant="mark">highlighted mark</Typography> and inline{' '}
        <Typography variant="code">const code = true</Typography> snippets.
      </div>
    </div>
  )
}

export const TypographyDoc = () => {
  return (
    <div className="max-w-5xl mx-auto px-6">
      <header className="mt-0">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none text-(--lithos-text) mb-8">
          Typography
        </h1>
        <p className="mt-2 text-lg md:text-xl font-display opacity-70 text-(--lithos-text)">
          A polymorphic primitive for fluid headings, body text, and inline accents driven by raw structural weight.
        </p>
        <hr className="border-t-2 border-(--lithos-border) mt-8 mb-8" />
      </header>

      <section className="mb-12">
        <p className="mb-8 text-lg md:text-xl text-(--lithos-text) max-w-3xl font-body">
          Typography handles text scale, line-height, and semantic elements with built-in support for inline highlights,
          blockquotes, code tags, and solid text shadows.
        </p>
      </section>

      <div className="border-l-4 border-(--lithos-accent) pl-6 py-2 mb-8 bg-(--lithos-surface) p-4">
        <p className="text-sm font-bold font-body opacity-80 text-(--lithos-text)">
          All font sizes use fluid <code>clamp()</code> functions linked to <code>--lithos-[variant]-size</code> tokens,
          ensuring scale adaptability across device viewports.
        </p>
      </div>

      <h2 id="installation" className="mt-12 mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
        Installation
      </h2>

      <SetupGuide
        componentNames={['Typography']}
        manualPath={manualPath}
        requires={['utils/cn.ts', 'utils/yiq.ts', 'core/types.ts']}
      />

      <h2 id="examples" className="mt-12 mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
        Examples
      </h2>

      <h3 id="some" className="mb-4 text-xl font-black tracking-tight text-(--lithos-text)">
        Some
      </h3>

      <p className="text-base text-(--lithos-text) max-w-3xl font-body mb-4 opacity-80">
        Combine typographic variants to build structured content layouts with high contrast and explicit visual
        hierarchy.
      </p>

      <div className="mt-8 mb-16">
        <PreviewBlock code={articleSnippetCode} githubUrl={githubUrl}>
          <ArticleSnippet />
        </PreviewBlock>
      </div>

      <h3 id="all" className="mb-4 text-xl font-black tracking-tight text-(--lithos-text)">
        All
      </h3>
      <p className="text-base text-(--lithos-text) max-w-3xl font-body mb-4 opacity-80">
        Overview of all available typography scale variants from display headings down to micro captions, code blocks,
        and marks.
      </p>

      <div className="mt-8 mb-16">
        <PreviewBlock code={usageCode} githubUrl={githubUrl}>
          <UsagePreview />
        </PreviewBlock>
      </div>

      <section className="mb-12">
        <h2 id="accessibility" className="mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
          Accessibility
        </h2>
        <ul className="list-disc pl-6 text-lg font-body text-(--lithos-text)">
          <li>
            Supports semantic HTML tags automatically mapped by <code>variant</code> or explicitly overridden via{' '}
            <code>as</code>.
          </li>
          <li>Maintains WCAG contrast ratios across high-contrast background utility overlays.</li>
          <li>Ensures scalable text sizing that respects user root font size preferences.</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 id="api" className="mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
          API Reference
        </h2>
        <div className="mb-6 p-4 border-l-4 border-(--lithos-accent) bg-(--lithos-surface) text-sm font-body text-(--lithos-text)">
          <strong>Note:</strong> Typography font sizes are globally customizable using{' '}
          <code>--lithos-[variant]-size</code> CSS variables in your theme stylesheet, or per-instance using Tailwind
          utility classes via <code>className</code>.
        </div>
        <PropsAccordion title="Typography Props" data={typographyPropsData} />
      </section>
    </div>
  )
}
