import { useState } from 'react'
import { CodeViewer } from '../../components/ui/CodeViewer'
import { Button } from '../../components/ui/Button'
import { PreviewBlock } from '../../components/ui/PreviewBlock'
import { Accordion, AccordionGroup } from '../../components/ui/Accordion'
import { type PropItem, PropsAccordion } from '../../components/ui/PropsTable'

const accordionPropsData: PropItem[] = [
  {
    name: 'title',
    type: 'ReactNode',
    required: true,
    description: 'Header content rendered in the accordion trigger button.',
  },
  {
    name: 'defaultOpen',
    type: 'boolean',
    defaultValue: 'false',
    required: false,
    description: 'Initial open state when used in uncontrolled mode.',
  },
  {
    name: 'open',
    type: 'boolean',
    required: false,
    description: 'Controlled open state of the accordion.',
  },
  {
    name: 'value',
    type: 'string',
    required: false,
    description: 'Unique identifier when used inside an AccordionGroup.',
  },
  {
    name: 'classes',
    type: '{ container?: string; header?: string; content?: string }',
    required: false,
    description: 'Custom class overrides for container, header, and content elements.',
  },
  {
    name: 'children',
    type: 'ReactNode',
    required: false,
    description: 'Content rendered inside the expandable section.',
  },
  {
    name: 'className',
    type: 'string',
    required: false,
    description: 'Additional CSS classes applied to the root container.',
  },
]

export const AccordionDoc = () => {
  const [installTab, setInstallTab] = useState<'npm' | 'copy'>('npm')

  const inactiveBtnClass =
    'lithos-click bg-(--lithos-surface) text-(--lithos-text) hover:bg-(--lithos-accent) hover:text-(--lithos-accent-text)'
  const activeBtnClass = 'lithos-click bg-(--lithos-accent) text-(--lithos-accent-text)'

  const usageCode = `import { Accordion } from '../../components/ui/Accordion'

export const FAQItem = () => {
  return (
    <Accordion title='Is Lithos UI really free forever?'>
      Yes. Absolutely free, forever. There is no paid tier, no 'Pro' version, and no locked features. The entire architecture and all components are open-source.
    </Accordion>
  )
}`

  const groupedCode = `import { Accordion } from '../../components/ui/Accordion'

export const FAQItem = () => {
  return (
    <AccordionGroup>
      <Accordion title='Is Lithos UI really free forever?'>
        Yes. Absolutely free, forever. There is no paid tier, no 'Pro' version, and no locked features. The entire architecture and all components are open-source.
      </Accordion>
      <Accordion title='Is this just a fork of shadcn/ui?'>
        No. Lithos UI is a wholly original architecture. While it shares the philosophy of copy-paste components, it is built on its own foundation: the Zero-Gap layout system, an automated YIQ contrast engine, and universal specificity overrides. It is engineered from scratch for structural stability, not cloned.
      </Accordion>
      <Accordion title='What is the Zero-Gap rule?'>
        The Zero-Gap layout system means we strictly avoid CSS \`gap\` utilities for core layouts. Instead, we use explicit mathematically proportional margins to ensure perfect geometric stacking and rendering predictability across all viewports without flex/grid wrapping failures.
      </Accordion>
    <AccordionGroup>
  )
}`

  const groupedMultipleCode = `import { Accordion, AccordionGroup } from '../../components/ui/Accordion'

export const FAQItem = () => {
  return (
    <AccordionGroup defaultActive={['faq-1', 'faq-3']} allowMultiple>
      <Accordion title='Is Lithos UI really free forever?' value='faq-1'>
        Yes. Absolutely free, forever. There is no paid tier, no 'Pro' version, and no locked features. The entire architecture and all components are open-source.
      </Accordion>
      <Accordion title='Is this just a fork of shadcn/ui?' value='faq-2'>
        No. Lithos UI is a wholly original architecture. While it shares the philosophy of copy-paste components, it is built on its own foundation: the Zero-Gap layout system, an automated YIQ contrast engine, and universal specificity overrides. It is engineered from scratch for structural stability, not cloned.
      </Accordion>
      <Accordion title='What is the Zero-Gap rule?' value='faq-3'>
        The Zero-Gap layout system means we strictly avoid CSS \`gap\` utilities for core layouts. Instead, we use explicit mathematically proportional margins to ensure perfect geometric stacking and rendering predictability across all viewports without flex/grid wrapping failures.
      </Accordion>
    </AccordionGroup>
  )
}`


  return (
    <div className="max-w-5xl mx-auto px-6">
      <header className="mt-0">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none text-(--lithos-text) mb-8">
          Accordion
        </h1>
        <p className="mt-2 text-lg md:text-xl font-display opacity-70 text-(--lithos-text)">
          A vertically stacked set of interactive headings that expand and collapse content sections.
        </p>
        <hr className="border-t-2 border-(--lithos-border) mt-8 mb-8" />
      </header>

      <section className="mb-12">
        <p className="mb-8 text-lg md:text-xl text-(--lithos-text) max-w-3xl font-body">
          The Accordion is a compound primitive designed for progressive disclosure. It supports standalone uncontrolled usage or grouped co-op behavior with single or multi-item selection.
        </p>
      </section>

      <div className="border-l-4 border-(--lithos-accent) pl-6 py-2 mb-8 bg-(--lithos-surface) p-4">
        <p className="text-sm font-bold font-body opacity-80 text-(--lithos-text)">
          When using inside an AccordionGroup, ensure each Accordion receives a unique value prop to properly sync state.
        </p>
      </div>

      <h2 id="installation" className="mt-12 mb-4 text-2xl font-black uppercase tracking-tight text-(--lithos-text)">
        Installation
      </h2>

      <div className="mb-8">
        <div className="flex space-x-4 mb-4">
          <Button
            onClick={() => setInstallTab('npm')}
            className={installTab === 'npm' ? activeBtnClass : inactiveBtnClass}
          >
            npm
          </Button>
          <Button
            onClick={() => setInstallTab('copy')}
            className={installTab === 'copy' ? activeBtnClass : inactiveBtnClass}
          >
            Copy
          </Button>
        </div>

        <div className="border-2 border-(--lithos-border) bg-(--lithos-bg) p-4 md:p-6">
          {installTab === 'npm' ? (
            <>
              <p className="mb-4 text-sm font-bold opacity-80 text-(--lithos-text)">Install package:</p>
              <CodeViewer code="npm install lithos-ui" language="bash" className="mb-6" />
              <p className="mb-4 text-sm font-bold opacity-80 text-(--lithos-text)">Import:</p>
              <CodeViewer code='import { Accordion, AccordionGroup } from "lithos-ui"' language="tsx" />
            </>
          ) : (
            <>
              <p className="mb-4 text-sm font-bold opacity-80 text-(--lithos-text)">Copy the source components and import:</p>
              <CodeViewer code="import { Accordion, AccordionGroup } from '../../components/ui/Accordion'" language="tsx" className="mb-6" />
              <p className="text-sm font-bold opacity-80 text-(--lithos-text)">Requires: <code className="bg-(--lithos-surface) px-1 py-0.5">utils/cn.ts</code>, <code className="bg-(--lithos-surface) px-1 py-0.5">components/ui/Button.tsx</code>, <code className="bg-(--lithos-surface) px-1 py-0.5">components/ui/icons/IconChevronUp.tsx</code></p>
            </>
          )}
        </div>
      </div>

      <h2 id="examples" className="mt-12 mb-4 text-2xl font-black uppercase tracking-tight text-(--lithos-text)">
        Examples
      </h2>

      <h3 id="default" className="mb-4 text-xl font-black uppercase tracking-tight text-(--lithos-text)">
        Default
      </h3>

      <div className="mt-8 mb-16">
        <PreviewBlock
          code={usageCode}
          githubUrl="https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/Accordion.tsx"
        >
          <Accordion title='Is Lithos UI really free forever?'>
            Yes. Absolutely free, forever. There is no paid tier, no 'Pro' version, and no locked features. The entire architecture and all components are open-source.
          </Accordion>
        </PreviewBlock>
      </div>

      <h3 id="grouped-default" className="mb-4 text-xl font-black uppercase tracking-tight text-(--lithos-text)">
        Grouped default
      </h3>

      <div className="mt-8 mb-16">
        <PreviewBlock
          code={groupedCode}
          githubUrl="https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/Accordion.tsx"
        >
          <AccordionGroup defaultActive='faq-1'>
            <Accordion title='Is Lithos UI really free forever?' value='faq-1'>
              Yes. Absolutely free, forever. There is no paid tier, no 'Pro' version, and no locked features. The entire architecture and all components are open-source.
            </Accordion>
            <Accordion title='Is this just a fork of shadcn/ui?' value='faq-2'>
              No. Lithos UI is a wholly original architecture. While it shares the philosophy of copy-paste components, it is built on its own foundation: the Zero-Gap layout system, an automated YIQ contrast engine, and universal specificity overrides. It is engineered from scratch for structural stability, not cloned.
            </Accordion>
            <Accordion title='What is the Zero-Gap rule?' value='faq-3'>
              The Zero-Gap layout system means we strictly avoid CSS `gap` utilities for core layouts. Instead, we use explicit mathematically proportional margins to ensure perfect geometric stacking and rendering predictability across all viewports without flex/grid wrapping failures.
            </Accordion>
          </AccordionGroup>
        </PreviewBlock>
      </div>

      <h3 id="grouped-multiple" className="mb-4 text-xl font-black uppercase tracking-tight text-(--lithos-text)">
        Grouped multiple
      </h3>

      <div className="mt-8 mb-16">
        <PreviewBlock
          code={groupedMultipleCode}
          githubUrl="https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/Accordion.tsx"
        >
          <AccordionGroup defaultActive={['faq-1', 'faq-3']} allowMultiple>
            <Accordion title='Is Lithos UI really free forever?' value='faq-1'>
              Yes. Absolutely free, forever. There is no paid tier, no 'Pro' version, and no locked features. The entire architecture and all components are open-source.
            </Accordion>
            <Accordion title='Is this just a fork of shadcn/ui?' value='faq-2'>
              No. Lithos UI is a wholly original architecture. While it shares the philosophy of copy-paste components, it is built on its own foundation: the Zero-Gap layout system, an automated YIQ contrast engine, and universal specificity overrides. It is engineered from scratch for structural stability, not cloned.
            </Accordion>
            <Accordion title='What is the Zero-Gap rule?' value='faq-3'>
              The Zero-Gap layout system means we strictly avoid CSS `gap` utilities for core layouts. Instead, we use explicit mathematically proportional margins to ensure perfect geometric stacking and rendering predictability across all viewports without flex/grid wrapping failures.
            </Accordion>
          </AccordionGroup>
        </PreviewBlock>
      </div>

      <h2 id="requires" className="mb-4 text-2xl font-black uppercase tracking-tight text-(--lithos-text)">
        Requires
      </h2>
      <ul className="list-disc pl-6 mb-12 text-lg font-body text-(--lithos-text)">
        <li><code>utils/cn.ts</code> for class merging utility.</li>
        <li><code>components/ui/Button.tsx</code> for the trigger element.</li>
        <li><code>components/ui/icons/IconChevronUp.tsx</code> for the toggle icon.</li>
      </ul>

      <section className="mb-12">
        <h2 id="accessibility" className="mb-4 text-2xl font-black uppercase tracking-tight text-(--lithos-text)">
          Accessibility
        </h2>
        <ul className="list-disc pl-6 text-lg font-body text-(--lithos-text)">
          <li>Uses <code>aria-expanded</code> to indicate the open/closed state of the accordion panel.</li>
          <li>Uses <code>aria-controls</code> to link the button to the expandable content region.</li>
          <li>Implements <code>aria-hidden</code> on the content region when collapsed.</li>
          <li>Relies on the native <code>Button</code> element for proper keyboard focus management.</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 id="api" className="mb-4 text-2xl font-black uppercase tracking-tight text-(--lithos-text)">
          API Reference
        </h2>
        <PropsAccordion title="Accordion Props" data={accordionPropsData} />
      </section>
    </div>
  )
}
