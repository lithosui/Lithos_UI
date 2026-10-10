import { PreviewBlock } from '../../components/ui/PreviewBlock'
import { CodeViewer } from '../../components/ui/CodeViewer'
import { PropsAccordion } from '../../components/ui/PropsTable'
import { SetupGuide } from '../layout/SetupGuide'
import { accordionPropsData, accordionGroupPropsData } from '../propsData/accordion'
import { removeImports } from '../examples/removeImports'

import { DocHeader, DocCallout, DocHeading, DocExample, DocLeadText, DocList, DocSection } from '../layout/DocPage'

import { DefaultExample } from '../examples/accordion/default'
import DefaultExampleSource from '../examples/accordion/default?raw'

import { DefaultGrouped } from '../examples/accordion/groupedDefault'
import DefaultGrouppedSource from '../examples/accordion/groupedDefault?raw'

import { GroupedMultiple } from '../examples/accordion/groupedMultiple'
import GroupedMultipleSource from '../examples/accordion/groupedMultiple?raw'

const githubUrl = 'https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/Accordion.tsx'
const manualPath = '../../components/ui/Accordion'

const usageCode = {
  body: removeImports(DefaultExampleSource),
  componentNames: ['Accordion'],
  manualPath,
}

const groupedCode = {
  body: removeImports(DefaultGrouppedSource),
  componentNames: ['Accordion', 'AccordionGroup'],
  manualPath,
}

const groupedMultipleCode = {
  body: removeImports(GroupedMultipleSource),
  componentNames: ['Accordion', 'AccordionGroup'],
  manualPath,
}

export const AccordionDoc = () => (
  <div className="max-w-5xl mx-auto px-6">
    <DocHeader
      title="Accordion"
      description="A vertically stacked set of interactive headings that expand and collapse content sections."
    />

    <DocSection>
      <DocLeadText>
        The Accordion is a compound primitive designed for progressive disclosure. It supports standalone uncontrolled
        usage or grouped co-op behavior with single or multi-item selection.
      </DocLeadText>
      <DocCallout>
        When using inside an AccordionGroup, ensure each Accordion receives a unique value prop to properly sync state.
      </DocCallout>
    </DocSection>

    <DocSection>
      <DocHeading id="installation">Installation</DocHeading>
      <SetupGuide
        slug="accordion"
        componentNames={['Accordion', 'AccordionGroup']}
        manualPath={manualPath}
        requires={['utils/cn.ts', 'components/ui/Button.tsx', 'components/ui/icons/IconChevronUp.tsx']}
      />
    </DocSection>

    <DocHeading id="examples">Examples</DocHeading>

    <DocExample
      id="default"
      title="Default"
      description={
        <>
          Use this to create a single, independently expanding collapsible section for hiding supplementary content. It
          renders as a bordered block with a chevron icon that rotates upon opening. Standard ARIA attributes (
          <code>aria-expanded</code>, <code>aria-controls</code>) are automatically managed.
        </>
      }
    >
      <PreviewBlock code={usageCode} githubUrl={githubUrl}>
        <DefaultExample />
      </PreviewBlock>
    </DocExample>

    <DocExample
      id="grouped-default"
      title="Grouped default"
      description={
        <>
          Use this to manage multiple accordions where only one panel should be open at a time. Synchronizes states
          across children. Requires a unique <code>value</code> prop on each child.
        </>
      }
    >
      <PreviewBlock code={groupedCode} githubUrl={githubUrl}>
        <DefaultGrouped />
      </PreviewBlock>
    </DocExample>

    <DocExample
      id="grouped-multiple"
      title="Grouped multiple"
      description={
        <>
          Allows multiple panels within the group to remain open at the same time using the <code>allowMultiple</code>{' '}
          prop.
        </>
      }
    >
      <PreviewBlock code={groupedMultipleCode} githubUrl={githubUrl}>
        <GroupedMultiple />
      </PreviewBlock>
    </DocExample>

    <DocSection>
      <DocHeading id="anatomy">Anatomy</DocHeading>
      <CodeViewer language="tsx" code={`<AccordionGroup>\n  <Accordion />\n</AccordionGroup>`} />
    </DocSection>

    <DocSection>
      <DocHeading id="accessibility">Accessibility</DocHeading>
      <DocList>
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
      </DocList>
    </DocSection>

    <DocSection>
      <DocHeading id="api">API Reference</DocHeading>
      <DocCallout>
        <strong>Note:</strong> Border radius is configurable globally via the <code>--lithos-radius</code> CSS token, or
        per-instance via <code>className</code>.
      </DocCallout>
      <PropsAccordion title="Accordion Props" data={accordionPropsData} />
      <PropsAccordion title="AccordionGroup Props" data={accordionGroupPropsData} className="mt-4" />
    </DocSection>
  </div>
)
