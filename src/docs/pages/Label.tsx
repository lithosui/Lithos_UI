import { PreviewBlock } from '../../components/ui/PreviewBlock'
import { PropsAccordion } from '../../components/ui/PropsTable'
import { labelPropsData } from '../propsData/label'
import { SetupGuide } from '../layout/SetupGuide'
import { Code, DocCallout, DocExample, DocHeader, DocHeading, DocList, DocSection } from '../layout/DocPage'
import { removeImports } from '../examples/removeImports'
import { getComponentGithubUrl } from '../utils/githubUrl'
import { BasicLabel } from '../examples/label/basic'
import basicSource from '../examples/label/basic.tsx?raw'
import { RequiredLabel } from '../examples/label/required'
import requiredSource from '../examples/label/required.tsx?raw'
import { DisabledLabel } from '../examples/label/disabled'
import disabledSource from '../examples/label/disabled.tsx?raw'
import { LabelSizes } from '../examples/label/sizes'
import sizesSource from '../examples/label/sizes.tsx?raw'
import { CheckboxLabel } from '../examples/label/checkbox'
import checkboxSource from '../examples/label/checkbox.tsx?raw'

import { TextareaLabel } from '../examples/label/textarea'
import textareaSource from '../examples/label/textarea.tsx?raw'
import { SelectLabel } from '../examples/label/select'
import selectSource from '../examples/label/select.tsx?raw'
import { SwitchLabel } from '../examples/label/switch'
import switchSource from '../examples/label/switch.tsx?raw'
import { HelperTextLabel } from '../examples/label/helperText'
import helperTextSource from '../examples/label/helperText.tsx?raw'
import { ValidationLabel } from '../examples/label/validation'
import validationSource from '../examples/label/validation.tsx?raw'
import { OptionalLabel } from '../examples/label/optional'
import optionalSource from '../examples/label/optional.tsx?raw'
import { GroupLabel } from '../examples/label/group'
import groupSource from '../examples/label/group.tsx?raw'

import { IconLabel } from '../examples/label/icon'
import iconSource from '../examples/label/icon.tsx?raw'

const labelPath = '../../components/ui/Label'
const githubUrl = getComponentGithubUrl('label')
const labelCode = (source: string, componentNames: string[]) => ({
  body: removeImports(source),
  componentNames,
  manualPath: {
    others: labelPath,
    Input: '../../components/ui/Input',
    PlainCheckbox: '../../components/ui/Checkbox',
    Textarea: '../../components/ui/Textarea',
    Select: '../../components/ui/Select',
    SelectTrigger: '../../components/ui/Select',
    SelectContent: '../../components/ui/Select',
    SelectItem: '../../components/ui/Select',
    Toggle: '../../components/ui/Toggle',
    IconBell: '../../components/ui/icons/IconBell',
    Button: '../../components/ui/Button',
    react: ['useId', 'useState'],
  },
})

export const LabelDoc = () => (
  <div className="max-w-5xl mx-auto px-6">
    <DocHeader
      title="Label"
      description="A native form label with bold Lithos typography and accessible control associations."
    />
    <DocSection>
      <p>
        Use <Code text="Label" /> to name an input, textarea, checkbox, or other labelable control. Clicking the label
        activates its associated control using native browser behavior.
      </p>
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
    <DocExample
      id="basic"
      title="Basic"
      description="Connect htmlFor to the input ID. useId keeps each example unique when rendered more than once."
    >
      <PreviewBlock code={labelCode(basicSource, ['Label', 'Input', 'useId'])} githubUrl={githubUrl}>
        <BasicLabel />
      </PreviewBlock>
    </DocExample>
    <DocExample
      id="required"
      title="Required"
      description="Show a required marker and set required on the input for native validation and screen reader announcements."
    >
      <PreviewBlock code={labelCode(requiredSource, ['Label', 'Input', 'useId'])} githubUrl={githubUrl}>
        <RequiredLabel />
      </PreviewBlock>
    </DocExample>
    <DocExample
      id="disabled"
      title="Disabled"
      description="Apply disabled to both the label and its control. The label prop changes presentation only."
    >
      <PreviewBlock code={labelCode(disabledSource, ['Label', 'Input', 'useId'])} githubUrl={githubUrl}>
        <DisabledLabel />
      </PreviewBlock>
    </DocExample>
    <DocExample
      id="sizes"
      title="Sizes"
      description="Choose small, medium, or large text. Medium follows the global label-size token."
    >
      <PreviewBlock code={labelCode(sizesSource, ['Label'])} githubUrl={githubUrl}>
        <LabelSizes />
      </PreviewBlock>
    </DocExample>
    <DocExample
      id="checkbox"
      title="Checkbox"
      description="An external label activates a checkbox without adding a second keyboard stop."
    >
      <PreviewBlock code={labelCode(checkboxSource, ['Label', 'PlainCheckbox', 'useId'])} githubUrl={githubUrl}>
        <CheckboxLabel />
      </PreviewBlock>
    </DocExample>
    <DocExample
      id="textarea"
      title="Textarea"
      description="Use htmlFor to connect the label to a multiline message field."
    >
      <PreviewBlock code={labelCode(textareaSource, ['Label', 'Textarea', 'useId'])} githubUrl={githubUrl}>
        <TextareaLabel />
      </PreviewBlock>
    </DocExample>
    <DocExample
      id="select"
      title="Select"
      description="Name the custom select trigger with aria-labelledby and connect htmlFor to its button ID."
    >
      <PreviewBlock
        code={labelCode(selectSource, [
          'Label',
          'Select',
          'SelectTrigger',
          'SelectContent',
          'SelectItem',
          'useId',
          'useState',
        ])}
        githubUrl={githubUrl}
      >
        <SelectLabel />
      </PreviewBlock>
    </DocExample>
    <DocExample
      id="switch"
      title="Switch"
      description="Each switch has its own state and label. Toggle either switch to update its visible On/Off text independently. Accessible names stay stable; aria-checked announces the state."
    >
      <PreviewBlock code={labelCode(switchSource, ['Label', 'Toggle', 'useId', 'useState'])} githubUrl={githubUrl}>
        <SwitchLabel />
      </PreviewBlock>
    </DocExample>
    <DocExample
      id="icon"
      title="Icon Label"
      description="Add a decorative icon beside the label text. The icon is hidden from screen readers. When used with a form control, connect the label using htmlFor and the control ID."
    >
      <PreviewBlock code={labelCode(iconSource, ['Label', 'IconBell'])} githubUrl={githubUrl}>
        <IconLabel />
      </PreviewBlock>
    </DocExample>
    <DocExample
      id="helper-text"
      title="Helper Text"
      description="Keep the field name in the label and connect supporting instructions with aria-describedby."
    >
      <PreviewBlock code={labelCode(helperTextSource, ['Label', 'Input', 'useId'])} githubUrl={githubUrl}>
        <HelperTextLabel />
      </PreviewBlock>
    </DocExample>
    <DocExample
      id="validation"
      title="Validation Errors"
      description="Submit an empty field to see an announced error. aria-invalid identifies the field and aria-describedby connects its feedback."
    >
      <PreviewBlock
        code={labelCode(validationSource, ['Label', 'Input', 'Button', 'useId', 'useState'])}
        githubUrl={githubUrl}
      >
        <ValidationLabel />
      </PreviewBlock>
    </DocExample>
    <DocExample
      id="optional"
      title="Optional Fields"
      description="Include optional in the visible label and leave the native field optional."
    >
      <PreviewBlock code={labelCode(optionalSource, ['Label', 'Input', 'useId'])} githubUrl={githubUrl}>
        <OptionalLabel />
      </PreviewBlock>
    </DocExample>
    <DocExample
      id="group"
      title="Grouped Controls"
      description="Use fieldset and legend for the group title, with an individual Label for each checkbox."
    >
      <PreviewBlock code={labelCode(groupSource, ['Label', 'PlainCheckbox', 'useId'])} githubUrl={githubUrl}>
        <GroupLabel />
      </PreviewBlock>
    </DocExample>
    <DocSection>
      <DocHeading id="accessibility">Accessibility</DocHeading>
      <DocList>
        <li>
          Renders a native <Code text="<label>" />. Connect it with <Code text="htmlFor" /> and a unique control ID, or
          nest one labelable control inside it.
        </li>
        <li>
          The label supplies the control's accessible name. Keep visible text descriptive and avoid conflicting
          aria-label values on the control.
        </li>
        <li>
          Tab focuses the associated control. Space toggles a focused checkbox; the label itself does not need a
          tabIndex or keyboard handlers.
        </li>
        <li>
          The asterisk is decorative and hidden from screen readers. Set required on native controls, or aria-required
          on custom controls that support it, and explain the marker in visible text.
        </li>
        <li>
          Disable the control separately. For automatic styling, place an input with className="peer" before the label;
          otherwise pass disabled explicitly.
        </li>
      </DocList>
      <DocCallout>
        Label uses theme text and typography tokens with margin-based spacing. Native label activation does not use
        button shadows or click physics.
      </DocCallout>
    </DocSection>
    <DocSection>
      <DocHeading id="api">API Reference</DocHeading>
      <PropsAccordion title="Label Props" data={labelPropsData} />
    </DocSection>
  </div>
)
