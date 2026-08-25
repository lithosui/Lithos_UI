import { PreviewBlock } from '../../components/ui/PreviewBlock'
import { CodeViewer } from '../../components/ui/CodeViewer'
import { Accordion, AccordionGroup } from '../../components/ui/Accordion'
import { PropsAccordion } from '../../components/ui/PropsTable'
import { SetupGuide } from '../layout/SetupGuide'
import { accordionPropsData } from '../propsData/accordion'

const githubUrl = 'https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/Accordion.tsx'

export const AccordionDoc = () => {
  const usageCode = {
    body: `export const FAQItem = () => {
  return (
    <Accordion title='Is Lithos UI really free forever?'>
      Yes. Absolutely free, forever. There is no paid tier, no 'Pro' version, and no locked features. The entire architecture and all components are open-source.
    </Accordion>
  )
}`,
    componentNames: ['Accordion'],
    manualPath: '../../components/ui/Accordion',
  }

  const groupedCode = {
    body: `export const FAQItem = () => {
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
    </AccordionGroup>
  )
}`,
    componentNames: ['Accordion', 'AccordionGroup'],
    manualPath: '../../components/ui/Accordion',
  }

  const groupedMultipleCode = {
    body: `export const FAQItem = () => {
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
}`,
    componentNames: ['Accordion', 'AccordionGroup'],
    manualPath: '../../components/ui/Accordion',
  }

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
          The Accordion is a compound primitive designed for progressive disclosure. It supports standalone uncontrolled
          usage or grouped co-op behavior with single or multi-item selection.
        </p>
      </section>

      <div className="border-l-4 border-(--lithos-accent) pl-6 py-2 mb-8 bg-(--lithos-surface) p-4">
        <p className="text-sm font-bold font-body opacity-80 text-(--lithos-text)">
          When using inside an AccordionGroup, ensure each Accordion receives a unique value prop to properly sync
          state.
        </p>
      </div>

      <h2 id="installation" className="mt-12 mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
        Installation
      </h2>

      <SetupGuide
        componentNames={['Accordion', 'AccordionGroup']}
        manualPath="../../components/ui/Accordion"
        requires={['utils/cn.ts', 'components/ui/Button.tsx', 'components/ui/icons/IconChevronUp.tsx']}
      />

      <h2 id="anatomy" className="mt-12 mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
        Anatomy
      </h2>
      <div className="mb-12">
        <CodeViewer
          language="tsx"
          code={`<AccordionGroup>
  <Accordion title="Heading">
    Content
  </Accordion>
</AccordionGroup>`}
        />
      </div>

      <h2 id="examples" className="mt-12 mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
        Examples
      </h2>

      <h3 id="default" className="mb-4 text-xl font-black tracking-tight text-(--lithos-text)">
        Default
      </h3>
      <p className="text-base text-(--lithos-text) max-w-3xl font-body mb-4 opacity-80">
        Use this to create a single, independently expanding collapsible section for hiding supplementary content. It
        renders as a bordered block with a chevron icon that rotates upon opening. Clicking the header toggles the
        content visibility with a smooth expansion. Standard ARIA attributes (<code>aria-expanded</code>,{' '}
        <code>aria-controls</code>) are automatically managed for screen reader support.
      </p>

      <div className="mt-8 mb-16">
        <PreviewBlock code={usageCode} githubUrl={githubUrl}>
          <Accordion title="Is Lithos UI really free forever?">
            Yes. Absolutely free, forever. There is no paid tier, no 'Pro' version, and no locked features. The entire
            architecture and all components are open-source.
          </Accordion>
        </PreviewBlock>
      </div>

      <h3 id="grouped-default" className="mb-4 text-xl font-black tracking-tight text-(--lithos-text)">
        Grouped default
      </h3>
      <p className="text-base text-(--lithos-text) max-w-3xl font-body mb-4 opacity-80">
        Use this to manage multiple accordions where only one panel should be open at a time (standard accordion
        behavior). It wraps multiple accordions to synchronize their states, rendering them as a stacked list. Clicking
        an unopened panel automatically closes the previously active one. Requires a unique <code>value</code> prop on
        each child. Keyboard navigation behaves standardly.
      </p>

      <div className="mt-8 mb-16">
        <PreviewBlock code={groupedCode} githubUrl={githubUrl}>
          <AccordionGroup defaultActive="faq-1">
            <Accordion title="Is Lithos UI really free forever?" value="faq-1">
              Yes. Absolutely free, forever. There is no paid tier, no 'Pro' version, and no locked features. The entire
              architecture and all components are open-source.
            </Accordion>
            <Accordion title="Is this just a fork of shadcn/ui?" value="faq-2">
              No. Lithos UI is a wholly original architecture. While it shares the philosophy of copy-paste components,
              it is built on its own foundation: the Zero-Gap layout system, an automated YIQ contrast engine, and
              universal specificity overrides. It is engineered from scratch for structural stability, not cloned.
            </Accordion>
            <Accordion title="What is the Zero-Gap rule?" value="faq-3">
              The Zero-Gap layout system means we strictly avoid CSS `gap` utilities for core layouts. Instead, we use
              explicit mathematically proportional margins to ensure perfect geometric stacking and rendering
              predictability across all viewports without flex/grid wrapping failures.
            </Accordion>
          </AccordionGroup>
        </PreviewBlock>
      </div>

      <h3 id="grouped-multiple" className="mb-4 text-xl font-black tracking-tight text-(--lithos-text)">
        Grouped multiple
      </h3>
      <p className="text-base text-(--lithos-text) max-w-3xl font-body mb-4 opacity-80">
        Use this when users need to compare content across multiple sections simultaneously. It allows multiple panels
        within the group to remain open at the same time. The visual design is identical to the grouped default, but
        state synchronization is bypassed by providing the <code>allowMultiple</code> prop. Interaction and
        accessibility remain fully supported.
      </p>

      <div className="mt-8 mb-16">
        <PreviewBlock code={groupedMultipleCode} githubUrl={githubUrl}>
          <AccordionGroup defaultActive={['faq-1', 'faq-3']} allowMultiple>
            <Accordion title="Is Lithos UI really free forever?" value="faq-1">
              Yes. Absolutely free, forever. There is no paid tier, no 'Pro' version, and no locked features. The entire
              architecture and all components are open-source.
            </Accordion>
            <Accordion title="Is this just a fork of shadcn/ui?" value="faq-2">
              No. Lithos UI is a wholly original architecture. While it shares the philosophy of copy-paste components,
              it is built on its own foundation: the Zero-Gap layout system, an automated YIQ contrast engine, and
              universal specificity overrides. It is engineered from scratch for structural stability, not cloned.
            </Accordion>
            <Accordion title="What is the Zero-Gap rule?" value="faq-3">
              The Zero-Gap layout system means we strictly avoid CSS `gap` utilities for core layouts. Instead, we use
              explicit mathematically proportional margins to ensure perfect geometric stacking and rendering
              predictability across all viewports without flex/grid wrapping failures.
            </Accordion>
          </AccordionGroup>
        </PreviewBlock>
      </div>

      <section className="mb-12">
        <h2 id="accessibility" className="mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
          Accessibility
        </h2>
        <ul className="list-disc pl-6 text-lg font-body text-(--lithos-text)">
          <li>
            Uses <code>aria-expanded</code> to indicate the open/closed state of the accordion panel.
          </li>
          <li>
            Uses <code>aria-controls</code> to link the button to the expandable content region.
          </li>
          <li>
            Implements <code>aria-hidden</code> on the content region when collapsed.
          </li>
          <li>
            Relies on the native <code>Button</code> element for proper keyboard focus management.
          </li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 id="api" className="mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
          API Reference
        </h2>
        <div className="mb-6 p-4 border-l-4 border-(--lithos-accent) bg-(--lithos-surface) text-sm font-body text-(--lithos-text)">
          <strong>Note:</strong> Border radius is configurable globally via the <code>--lithos-radius</code> CSS token,
          or per-instance via <code>className</code> (e.g. <code>rounded-full</code>). No custom prop is required.
        </div>
        <PropsAccordion title="Accordion Props" data={accordionPropsData} />
      </section>
    </div>
  )
}
