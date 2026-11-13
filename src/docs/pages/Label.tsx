import { PreviewBlock } from '../../components/ui/PreviewBlock'
import { CodeViewer } from '../../components/ui/CodeViewer'
import { PropsAccordion } from '../../components/ui/PropsTable'
import {
  Code,
  DocCallout,
  DocExample,
  DocHeader,
  DocHeading,
  DocLeadText,
  DocList,
  DocSection,
} from '../layout/DocPage'
import { SetupGuide } from '../layout/SetupGuide'
import { removeImports } from '../examples/removeImports'
import { getComponentGithubUrl } from '../utils/githubUrl'
import { labelPropsData } from '../propsData/label'
import { BasicLabelExample } from '../examples/label/basic'
import basicSource from '../examples/label/basic.tsx?raw'
import { LabelIconPlacementExample } from '../examples/label/iconPlacement'
import iconPlacementSource from '../examples/label/iconPlacement.tsx?raw'
import { RequiredLabelExample } from '../examples/label/required'
import requiredSource from '../examples/label/required.tsx?raw'
import { DisabledLabelExample } from '../examples/label/disabled'
import disabledSource from '../examples/label/disabled.tsx?raw'
import { LabelDescriptionExample } from '../examples/label/description'
import descriptionSource from '../examples/label/description.tsx?raw'
import { LabelTextareaExample } from '../examples/label/textarea'
import textareaSource from '../examples/label/textarea.tsx?raw'
import { LabelCheckboxExample } from '../examples/label/checkbox'
import checkboxSource from '../examples/label/checkbox.tsx?raw'
import { LabelSizesExample } from '../examples/label/sizes'
import sizesSource from '../examples/label/sizes.tsx?raw'

const labelPath = '../../components/ui/Label'
const githubUrl = getComponentGithubUrl('label')
const labelCode = (source: string, components: string[], usesId = true) => ({
  body: removeImports(source),
  componentNames: ['Label', ...components, ...(usesId ? ['useId'] : [])],
  manualPath: {
    Label: labelPath,
    Input: '../../components/ui/Input',
    Textarea: '../../components/ui/Textarea',
    Checkbox: '../../components/ui/Checkbox',
    Typography: '../../components/ui/Typography',
    Card: '../../components/ui/Card',
    CardContent: '../../components/ui/Card',
    IconFolder: '../../components/ui/icons',
    react: ['useId'],
  },
})

const examples = [
  {
    id: 'basic',
    title: 'Basic',
    description: 'Connect htmlFor to the control ID. Clicking the label focuses the input.',
    source: basicSource,
    Component: BasicLabelExample,
    components: ['Input'],
  },
  {
    id: 'icon-placement',
    title: 'Icon placement',
    description:
      'Compare left and top icon placement in cards with a title and supporting text. The default placement is left.',
    source: iconPlacementSource,
    Component: LabelIconPlacementExample,
    components: ['Card', 'CardContent', 'Typography', 'IconFolder'],
  },
  {
    id: 'required',
    title: 'Required',
    description: 'Show an asterisk and set required on the control for native validation.',
    source: requiredSource,
    Component: RequiredLabelExample,
    components: ['Input'],
  },
  {
    id: 'disabled',
    title: 'Disabled',
    description: 'Set disabled on the label and the control to align presentation and behavior.',
    source: disabledSource,
    Component: DisabledLabelExample,
    components: ['Input'],
  },
  {
    id: 'description',
    title: 'Description',
    description: 'Keep helper text separate and connect it to the control with aria-describedby.',
    source: descriptionSource,
    Component: LabelDescriptionExample,
    components: ['Input', 'Typography'],
  },
  {
    id: 'textarea',
    title: 'Textarea',
    description: 'Use the same native connection with a multiline field.',
    source: textareaSource,
    Component: LabelTextareaExample,
    components: ['Textarea'],
  },
  {
    id: 'checkbox',
    title: 'Checkbox',
    description: 'Click the label text to toggle the associated checkbox.',
    source: checkboxSource,
    Component: LabelCheckboxExample,
    components: ['Checkbox'],
  },
  {
    id: 'sizes',
    title: 'Sizes',
    description: 'Use the shared label size or match the small, medium, and large Input text scales.',
    source: sizesSource,
    Component: LabelSizesExample,
    components: ['Input'],
  },
]

export const LabelDoc = () => (
  <div className="max-w-5xl mx-auto px-6">
    <DocHeader title="Label" description="A native form label with theme-aware typography and control association." />
    <DocSection className="mb-6">
      <DocLeadText>
        Label wraps the native <Code text="<label>" /> element with shared typography tokens. Connect it to a control
        through matching <Code text="htmlFor" /> and <Code text="id" /> values to preserve browser-managed activation.
      </DocLeadText>
      <DocCallout>
        Customize presentation with <Code text="className" />. Set <Code text="required" /> and <Code text="disabled" />
        on the associated control as well; Label uses these props for styling.
      </DocCallout>
    </DocSection>

    <DocSection>
      <DocHeading id="installation">Installation</DocHeading>
      <SetupGuide
        slug="label"
        componentNames={['Label']}
        manualPath={labelPath}
        requires={['core/types.ts', 'utils/cn.ts']}
      />
    </DocSection>

    <DocHeading id="examples">Examples</DocHeading>
    {examples.map(({ id, title, description, source, Component, components }) => (
      <DocExample key={id} id={id} title={title} description={description}>
        <PreviewBlock code={labelCode(source, components, id !== 'icon-placement')} githubUrl={githubUrl}>
          <Component />
        </PreviewBlock>
      </DocExample>
    ))}

    <DocSection>
      <DocHeading id="anatomy">Anatomy</DocHeading>
      <CodeViewer language="tsx" code={`<Label />`} />
    </DocSection>

    <DocSection>
      <DocHeading id="accessibility">Accessibility</DocHeading>
      <DocList>
        <li>
          Connect the control's <Code text="id" /> to <Code text="htmlFor" />. Use <Code text="useId" /> in the parent
          to keep IDs unique when rendering the same field more than once.
        </li>
        <li>The browser handles label clicks. Keyboard users tab directly to the associated control.</li>
        <li>
          Decorative icons and the required asterisk are hidden from assistive technology. Keep visible text to name the
          control.
        </li>
        <li>
          Set <Code text="required" /> and <Code text="disabled" /> on the control itself for native behavior.
        </li>
        <li>
          Connect helper and error text to the control with <Code text="aria-describedby" />.
        </li>
        <li>Keep buttons, links, and other labels outside Label to preserve their own interactions.</li>
      </DocList>
    </DocSection>

    <DocSection>
      <DocHeading id="api">API Reference</DocHeading>
      <DocCallout className="mb-6">
        Label extends native label props, including <Code text="htmlFor" />, <Code text="ref" />, event handlers, and
        styles. Use <Code text="className" /> to override its presentation.
      </DocCallout>
      <PropsAccordion title="Label Props" data={labelPropsData} />
    </DocSection>
  </div>
)
