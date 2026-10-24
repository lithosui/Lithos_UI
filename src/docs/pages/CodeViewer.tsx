import { PreviewBlock } from '../../components/ui/PreviewBlock'
import { CodeViewer } from '../../components/ui/CodeViewer'

// should this file be removed?

export const CodeViewerDoc = () => {
  const sampleCode = `export const BrutalistButton = () => {
  return (
    <button className="bg-(--lithos-accent) text-(--lithos-accent-text) lithos-click">
      Click Me
    </button>
  )
}`

  const usageCode = {
    body: `export const CodeViewerExample = () => {
  const sampleCode = \\\`export const BrutalistButton = () => {
  return (
    <button className="bg-(--lithos-accent) text-(--lithos-accent-text) lithos-click">
      Click Me
    </button>
  )
}\\\`

  return (
    <CodeViewer
      code={sampleCode}
      language="tsx"
      showLanguage={true}
      className="mb-0"
    />
  )
}`,
    componentNames: ['CodeViewer'],
    manualPath: '../../components/ui/CodeViewer',
  }

  return (
    <div className="max-w-5xl mx-auto px-6">
      <header className="mt-0">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none text-(--lithos-text) mb-8">
          Code Viewer
        </h1>
        <p className="mt-2 text-lg md:text-xl font-display opacity-70 text-(--lithos-text)">
          A hard-shelled syntax highlighter with built-in clipboard interactions and toast feedback.
        </p>
        <hr className="border-t-2 border-(--lithos-border) mt-8 mb-8" />
      </header>

      <section className="mb-12">
        <p className="mb-8 text-lg md:text-xl text-(--lithos-text) max-w-3xl font-body">
          The Code Viewer is an atomic primitive designed to display raw architectural blueprints. It strictly avoids
          soft styling, utilizing explicit borders and a high-contrast terminal aesthetic.
        </p>
      </section>

      <div className="border-l-4 border-(--lithos-accent) pl-6 py-2 mb-8 bg-(--lithos-surface) p-4">
        <p className="text-sm font-bold font-body opacity-80 text-(--lithos-text)">
          Test the live clipboard interaction below. You can toggle the <code className="font-black">showLanguage</code>{' '}
          prop to switch between a language label and structural window squares.
        </p>
      </div>

      <h2 id="examples" className="mt-12 mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
        Examples
      </h2>

      <h3 id="default" className="mb-4 text-xl font-black tracking-tight text-(--lithos-text)">
        Default
      </h3>

      {/* Enforcing structural zero-gap compliance using standard margins */}
      <div className="mt-8 mb-16">
        <PreviewBlock
          code={usageCode}
          githubUrl="https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/CodeViewer.tsx"
        >
          <CodeViewer code={sampleCode} language="tsx" showLanguage={false} className="mb-0" />
        </PreviewBlock>
      </div>
    </div>
  )
}
