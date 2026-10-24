import { PreviewBlock } from '../../components/ui/PreviewBlock'
import { PropsAccordion } from '../../components/ui/PropsTable'
import { badgePropsData } from '../propsData/badge'
import { SetupGuide } from '../layout/SetupGuide'
import { removeImports } from '../examples/removeImports'
import { DocCallout, DocExample, DocHeader, DocHeading, DocLeadText, DocList, DocSection } from '../layout/DocPage'
import { BadgeVariantsExample } from '../examples/badge/variants'
import variantsSource from '../examples/badge/variants.tsx?raw'
import { BadgeSizesExample } from '../examples/badge/sizes'
import sizesSource from '../examples/badge/sizes.tsx?raw'
import { CustomColorBadgeExample } from '../examples/badge/customColor'

const githubUrl = 'https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/Badge.tsx'
const badgeCode = (source: string) => ({
  body: removeImports(source),
  componentNames: ['Badge'],
  manualPath: '../../components/ui/Badge',
})
const customColorCode = {
  body: `export const CustomColorBadge = () => (
  <Badge color="#FF00FF" size="md">Custom Color</Badge>
)`,
  componentNames: ['Badge'],
  manualPath: '../../components/ui/Badge',
}

export const BadgeDoc = () => (
  <div className="max-w-5xl mx-auto px-6">
    <DocHeader
      title="Badge"
      description="A high-contrast metadata indicator that supports different sizes and color variants."
    />

    <DocSection>
      <DocLeadText>
        The Badge is an atomic primitive designed to display metadata. It contains a faint shadow that differentiates it
        from the Button component.
      </DocLeadText>
      <DocCallout>Although this component looks like the Button component, it shouldn't be interactive.</DocCallout>
    </DocSection>

    <DocSection>
      <DocHeading id="installation">Installation</DocHeading>
      <SetupGuide
        componentNames={['Badge']}
        manualPath="../../components/ui/Badge"
        requires={['utils/cn.ts', 'core/useAccentColor.ts', 'utils/yiq.ts', 'utils/colors.ts', 'core/types.ts']}
      />
    </DocSection>

    <DocHeading id="examples">Examples</DocHeading>
    <DocExample
      id="variants"
      title="Variants"
      description={
        <>
          Use this to categorize or highlight small pieces of information, such as status labels or counts. It renders
          as an inline block with a solid background matching its intent, automatically adjusting text color via the YIQ
          engine. There are no hover or focus states since it is purely presentational. Content should be limited to 1-3
          words or a short number. Excluded from keyboard focus by default to prevent navigation friction.
        </>
      }
    >
      <PreviewBlock code={badgeCode(variantsSource)} githubUrl={githubUrl}>
        <BadgeVariantsExample />
      </PreviewBlock>
    </DocExample>

    <DocExample
      id="sizes"
      title="Sizes"
      description={
        <>
          Use the <code>size</code> prop to scale the badge appropriately for its context. It proportionally scales the
          font size and padding (<code>sm</code> for tight data tables, <code>md</code> for standard tags,{' '}
          <code>lg</code> for prominent status headers). Does not affect structural layout or color contrast. Limits
          remain identical across all sizes. Continues to be ignored by standard focus indexing.
        </>
      }
    >
      <PreviewBlock code={badgeCode(sizesSource)} githubUrl={githubUrl}>
        <BadgeSizesExample />
      </PreviewBlock>
    </DocExample>

    <DocExample
      id="custom-color"
      title="Custom color"
      description={
        <>
          Use this when the predefined intents do not match your branding or exact categorization needs. Pass a valid
          hex code to the <code>color</code> prop to completely override the background. The YIQ contrast engine will
          automatically calculate the most legible text and border colors against your custom background. Interaction
          and accessibility roles remain unchanged.
        </>
      }
    >
      <PreviewBlock code={customColorCode} githubUrl={githubUrl}>
        <CustomColorBadgeExample />
      </PreviewBlock>
    </DocExample>

    <DocSection>
      <DocHeading id="accessibility">Accessibility</DocHeading>
      <DocList>
        <li>Non-interactive by default; excluded from the focus order to keep keyboard navigation seamless.</li>
        <li>Maintains readable text contrast ratios across all status variants.</li>
      </DocList>
    </DocSection>

    <DocSection>
      <DocHeading id="api">API Reference</DocHeading>
      <DocCallout className="mb-6">
        <strong>Note:</strong> Border radius is configurable globally via the <code>--lithos-radius</code> CSS token, or
        per-instance via <code>className</code> (e.g. <code>rounded-full</code>). No custom prop is required.
      </DocCallout>
      <PropsAccordion title="Badge Props" data={badgePropsData} />
    </DocSection>
  </div>
)
