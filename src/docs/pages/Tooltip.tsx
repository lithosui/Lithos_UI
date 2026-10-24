import { PreviewBlock } from '../../components/ui/PreviewBlock'
import { CodeViewer } from '../../components/ui/CodeViewer'
import { SetupGuide } from '../layout/SetupGuide'
import { PropsAccordion } from '../../components/ui/PropsTable'
import {
  tooltipPropsData,
  tooltipTriggerPropsData,
  tooltipContentPropsData,
  useTooltipPropsData,
} from '../propsData/tooltip'

import { removeImports } from '../examples/removeImports'

import { DefaultExample } from '../examples/tooltip/default'
import DefaultExampleSource from '../examples/tooltip/default?raw'
import { PlacementExample } from '../examples/tooltip/placement'
import PlacementExampleSource from '../examples/tooltip/placement?raw'
import { PrimaryExample } from '../examples/tooltip/primary'
import PrimaryExampleSource from '../examples/tooltip/primary?raw'

import { InverseExample } from '../examples/tooltip/inverse'
import InverseExampleSource from '../examples/tooltip/inverse?raw'

const githubUrl = 'https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/tooltip/Tooltip.tsx'
const manualPath = '../../components/ui/Tooltip'
const componentNames = ['Tooltip', 'TooltipTrigger', 'TooltipContent', 'Button']

const codeDefaults = {
  componentNames,
  manualPath: {
    Button: '../../components/ui/Button',
    others: manualPath,
  },
}

const defaultCode = { body: removeImports(DefaultExampleSource), ...codeDefaults }
const placementCode = { body: removeImports(PlacementExampleSource), ...codeDefaults }
const primaryCode = { body: removeImports(PrimaryExampleSource), ...codeDefaults }
const inverseCode = { body: removeImports(InverseExampleSource), ...codeDefaults }

export const TooltipDoc = () => {
  return (
    <div className="max-w-5xl mx-auto px-6">
      <header className="mt-0">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none text-(--lithos-text) mb-6">
          Tooltip
        </h1>
        <p className="mt-2 text-lg md:text-xl font-display opacity-70 text-(--lithos-text)">
          Hover and focus hints with the neo-brutalist border-and-shadow treatment.
        </p>
        <hr className="border-t-2 border-(--lithos-border) mt-6 mb-6" />
      </header>

      <section className="mb-12">
        <p className="mb-8 text-lg md:text-xl text-(--lithos-text) max-w-3xl font-body">
          A pop-up that displays information related to an element when the element receives keyboard focus or the mouse
          hovers over it.
        </p>
      </section>

      <h2 id="installation" className="mt-12 mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
        Installation
      </h2>

      <SetupGuide
        slug="tooltip"
        componentNames={['Tooltip', 'TooltipTrigger', 'TooltipContent', 'useTooltip']}
        manualPath={manualPath}
        requires={['utils/cn.ts', 'components/ui/Popover']}
      />

      <h2 id="examples" className="mt-12 mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
        Examples
      </h2>

      <h3 id="default" className="mb-4 text-xl font-black tracking-tight text-(--lithos-text)">
        Default
      </h3>
      <p className="text-base text-(--lithos-text) max-w-3xl font-body mb-4 opacity-80">
        The basic tooltip structure. Set <code>asChild</code> on the trigger to attach events directly to your button.
      </p>

      <div className="mt-8 mb-16">
        <PreviewBlock code={defaultCode} githubUrl={githubUrl}>
          <div className="flex items-center justify-center p-12">
            <DefaultExample />
          </div>
        </PreviewBlock>
      </div>

      <h3 id="placement" className="mb-4 text-xl font-black tracking-tight text-(--lithos-text)">
        Placement
      </h3>
      <p className="text-base text-(--lithos-text) max-w-3xl font-body mb-4 opacity-80">
        Use the <code>placement</code> prop to change the position of the tooltip.
      </p>

      <div className="mt-8 mb-16">
        <PreviewBlock code={placementCode} githubUrl={githubUrl}>
          <PlacementExample />
        </PreviewBlock>
      </div>

      <p className="text-base text-(--lithos-text) max-w-3xl font-body mb-4 opacity-80">
        You can pass the <code>variant</code> prop to <code>TooltipContent</code> to change its style. Supported
        variants are <code>default</code>, <code>primary</code>, and <code>inverse</code>.
      </p>

      <h3 id="primary-variant" className="mt-8 mb-4 text-lg font-black tracking-tight text-(--lithos-text)">
        Primary
      </h3>
      <div className="mt-4 mb-8">
        <PreviewBlock code={primaryCode}>
          <div className="flex items-center justify-center p-12">
            <PrimaryExample />
          </div>
        </PreviewBlock>
      </div>

      <h3 id="inverse-variant" className="mt-8 mb-4 text-lg font-black tracking-tight text-(--lithos-text)">
        Inverse
      </h3>
      <div className="mt-4 mb-16">
        <PreviewBlock code={inverseCode}>
          <div className="flex items-center justify-center p-12">
            <InverseExample />
          </div>
        </PreviewBlock>
      </div>

      <h2 id="anatomy" className="mt-12 mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
        Anatomy
      </h2>
      <div className="mb-12">
        <p className="mb-4 text-lg md:text-xl text-(--lithos-text) max-w-3xl font-body">
          Tooltip is a compound component. Compose it from the three subcomponents below to establish the floating
          context, trigger, and content overlay.
        </p>
        <CodeViewer
          language="tsx"
          code={`<Tooltip>
  <TooltipTrigger></TooltipTrigger>
  <TooltipContent></TooltipContent>
</Tooltip>`}
        />
      </div>

      <section className="mt-12 mb-12">
        <h2 id="accessibility" className="mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
          Accessibility
        </h2>
        <ul className="list-disc pl-6 text-lg font-body text-(--lithos-text) space-y-2">
          <li>Inherits robust accessibility and ARIA management directly from Popover.</li>
          <li>
            Automatically sets <code>role="tooltip"</code> and configures appropriate ARIA references between the
            trigger and content.
          </li>
          <li>Supports seamless hover and keyboard focus interactions out of the box.</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 id="api-reference" className="mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
          API Reference
        </h2>
        <div className="mb-12">
          <PropsAccordion title="Tooltip Props" data={tooltipPropsData} />
          <div className="mt-8">
            <PropsAccordion title="TooltipTrigger Props" data={tooltipTriggerPropsData} />
          </div>
          <div className="mt-8">
            <PropsAccordion title="TooltipContent Props" data={tooltipContentPropsData} />
          </div>
          <div className="mt-8">
            <PropsAccordion title="useTooltip Return" data={useTooltipPropsData} isHook />
          </div>
        </div>
      </section>
    </div>
  )
}
