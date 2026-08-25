import { useRef, useState } from 'react'
import { PreviewBlock } from '../../components/ui/PreviewBlock'
import { SetupGuide } from '../layout/SetupGuide'
import { PropsAccordion } from '../../components/ui/PropsTable'
import { CodeViewer } from '../../components/ui/CodeViewer'
import { Button } from '../../components/ui/Button'
import { Checkbox, PlainCheckbox, IconCheckbox, CheckboxGroup } from '../../components/ui/Checkbox'
import { checkboxPropsData, iconCheckboxPropsData, checkboxGroupPropsData } from '../propsData/checkbox'
import { colors } from '../../utils/colors'
import { isHexColor } from '../../core/types'

const githubUrl = 'https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/Checkbox.tsx'

const componentNames = ['Checkbox', 'PlainCheckbox', 'IconCheckbox', 'CheckboxGroup']
const manualPath = {
  Checkbox: '../../components/ui/Checkbox',
  PlainCheckbox: '../../components/ui/Checkbox',
  IconCheckbox: '../../components/ui/Checkbox',
  CheckboxGroup: '../../components/ui/Checkbox',
}

const SingleCheckboxDemo = () => {
  const [checked, setChecked] = useState(true)

  return (
    <Checkbox label="Accept terms and conditions" checked={checked} onChange={(e) => setChecked(e.target.checked)} />
  )
}

const PlainCheckboxDemo = () => <PlainCheckbox label="Remember me on this device" defaultChecked />

const IconCheckboxDemo = () => <IconCheckbox label="Add to favorites" defaultChecked />

const IndeterminateCheckboxDemo = () => {
  const options = ['cheese', 'pepperoni', 'olives']
  const [value, setValue] = useState<string[]>(['cheese'])

  const allChecked = value.length === options.length
  const indeterminate = value.length > 0 && !allChecked

  return (
    <div className="flex flex-col [&>*:not(:first-child)]:mt-2">
      <Checkbox
        label="Select all toppings"
        checked={allChecked}
        indeterminate={indeterminate}
        onChange={(e) => setValue(e.target.checked ? options : [])}
      />
      <div className="ml-6 flex flex-col [&>*:not(:first-child)]:mt-2">
        {options.map((option) => (
          <Checkbox
            key={option}
            label={option}
            checked={value.includes(option)}
            onChange={(e) => setValue(e.target.checked ? [...value, option] : value.filter((item) => item !== option))}
          />
        ))}
      </div>
    </div>
  )
}

const DisabledCheckboxDemo = () => (
  <div className="flex flex-col [&>*:not(:first-child)]:mt-3">
    <Checkbox label="Disabled unchecked" disabled />
    <Checkbox label="Disabled checked" disabled defaultChecked />
  </div>
)

const GroupCheckboxDemo = () => {
  const [value, setValue] = useState<string[]>(['email'])

  return (
    <CheckboxGroup value={value} onChange={setValue} label="Notify me by" description="Choose one or more channels.">
      <Checkbox value="email" label="Email" />
      <Checkbox value="sms" label="SMS" />
      <Checkbox value="push" label="Push notification" />
    </CheckboxGroup>
  )
}

const HorizontalGroupCheckboxDemo = () => {
  const [value, setValue] = useState<string[]>(['mon', 'wed', 'fri'])

  return (
    <CheckboxGroup value={value} onChange={setValue} mode="horizontal" label="Active days">
      <Checkbox value="mon" label="Mon" />
      <Checkbox value="tue" label="Tue" />
      <Checkbox value="wed" label="Wed" />
      <Checkbox value="thu" label="Thu" />
      <Checkbox value="fri" label="Fri" />
    </CheckboxGroup>
  )
}

export const CheckboxDoc = () => {
  const [customColor, setCustomColor] = useState('#FF0033')
  const [colorError, setColorError] = useState('')
  const colorInputRef = useRef<null | HTMLInputElement>(null)

  const handleColorFocus = () => setColorError('')

  const handleCustomColor = () => {
    if (!colorInputRef.current) return

    const value = colorInputRef.current.value

    if (!isHexColor(value)) {
      setColorError('Please specify a valid HEX color. (Example: #FF00FF)')
      return
    }

    setCustomColor(value)
  }

  const singleCode = {
    body: `export const SingleCheckboxDemo = () => {
  const [checked, setChecked] = useState(true)

  return (
    <Checkbox
      label="Accept terms and conditions"
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
    />
  )
}`,
    componentNames: ['Checkbox'],
    manualPath,
  }

  const plainCode = {
    body: `export const PlainCheckboxDemo = () => <PlainCheckbox label="Remember me on this device" defaultChecked />`,
    componentNames: ['PlainCheckbox'],
    manualPath,
  }

  const iconCode = {
    body: `export const IconCheckboxDemo = () => <IconCheckbox label="Add to favorites" defaultChecked />`,
    componentNames: ['IconCheckbox'],
    manualPath,
  }

  const customColorCode = {
    body: `export const CustomColorCheckboxDemo = () => (
  <>
    <Checkbox color="#FF0033" label="Subscribe to newsletter" defaultChecked />
    <PlainCheckbox color="#FF0033" label="Enable dark mode" defaultChecked />
    <IconCheckbox color="#FF0033" label="Add to favorites" defaultChecked />
  </>
)`,
    componentNames: ['Checkbox', 'PlainCheckbox', 'IconCheckbox'],
    manualPath,
  }

  const indeterminateCode = {
    body: `export const IndeterminateCheckboxDemo = () => {
  const options = ['cheese', 'pepperoni', 'olives']
  const [value, setValue] = useState<string[]>(['cheese'])

  const allChecked = value.length === options.length
  const indeterminate = value.length > 0 && !allChecked

  return (
    <>
      <Checkbox
        label="Select all toppings"
        checked={allChecked}
        indeterminate={indeterminate}
        onChange={(e) => setValue(e.target.checked ? options : [])}
      />
      {options.map((option) => (
        <Checkbox
          key={option}
          label={option}
          checked={value.includes(option)}
          onChange={(e) =>
            setValue(e.target.checked ? [...value, option] : value.filter((item) => item !== option))
          }
        />
      ))}
    </>
  )
}`,
    componentNames: ['Checkbox'],
    manualPath,
  }

  const disabledCode = {
    body: `export const DisabledCheckboxDemo = () => (
  <>
    <Checkbox label="Disabled unchecked" disabled />
    <Checkbox label="Disabled checked" disabled defaultChecked />
  </>
)`,
    componentNames: ['Checkbox'],
    manualPath,
  }

  const groupCode = {
    body: `export const GroupCheckboxDemo = () => {
  const [value, setValue] = useState<string[]>(['email'])

  return (
    <CheckboxGroup value={value} onChange={setValue} label="Notify me by" description="Choose one or more channels.">
      <Checkbox value="email" label="Email" />
      <Checkbox value="sms" label="SMS" />
      <Checkbox value="push" label="Push notification" />
    </CheckboxGroup>
  )
}`,
    componentNames: ['Checkbox', 'CheckboxGroup'],
    manualPath,
  }

  const horizontalGroupCode = {
    body: `export const HorizontalGroupCheckboxDemo = () => {
  const [value, setValue] = useState<string[]>(['mon', 'wed', 'fri'])

  return (
    <CheckboxGroup value={value} onChange={setValue} mode="horizontal" label="Active days">
      <Checkbox value="mon" label="Mon" />
      <Checkbox value="tue" label="Tue" />
      <Checkbox value="wed" label="Wed" />
      <Checkbox value="thu" label="Thu" />
      <Checkbox value="fri" label="Fri" />
    </CheckboxGroup>
  )
}`,
    componentNames: ['Checkbox', 'CheckboxGroup'],
    manualPath,
  }

  return (
    <div className="max-w-5xl mx-auto px-6">
      <header className="mt-0">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none text-(--lithos-text) mb-8">
          Checkbox
        </h1>
        <p className="mt-2 text-lg md:text-xl font-display opacity-70 text-(--lithos-text)">
          A native, form-friendly checkbox with a multi-select group.
        </p>
        <hr className="border-t-2 border-(--lithos-border) mt-8 mb-8" />
      </header>

      <section className="mb-12">
        <p className="mb-8 text-lg md:text-xl text-(--lithos-text) max-w-3xl font-body">
          Checkbox keeps a real <code>&lt;input type=&quot;checkbox&quot;&gt;</code> mounted off-screen for native
          keyboard, focus, and form-submission behavior, and paints a hard-edged box next to it from that input&apos;s
          own state. Use a single <code>Checkbox</code> for one on/off choice, or wrap several in a{' '}
          <code>CheckboxGroup</code> to collect multiple selections into one array.
        </p>
      </section>

      <h2 id="installation" className="mt-12 mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
        Installation
      </h2>

      <SetupGuide
        componentNames={componentNames}
        manualPath={manualPath}
        requires={['utils/cn.ts', 'utils/yiq.ts', 'core/types.ts']}
      />

      <h2 id="anatomy" className="mt-12 mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
        Anatomy
      </h2>
      <div className="mb-12">
        <p className="mb-4 text-lg md:text-xl text-(--lithos-text) max-w-3xl font-body">
          A standalone Checkbox needs no wrapper. Group several under one controlled array with CheckboxGroup:
        </p>
        <CodeViewer
          language="tsx"
          code={`<Checkbox label="Accept terms" checked={checked} onChange={(e) => setChecked(e.target.checked)} />

<CheckboxGroup value={value} onChange={setValue} label="Toppings">
  <Checkbox value="cheese" label="Cheese" />
  <Checkbox value="olives" label="Olives" />
</CheckboxGroup>`}
        />
      </div>

      <h2 id="examples" className="mt-12 mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
        Examples
      </h2>

      <h3 id="single" className="mb-2 text-xl font-black tracking-tight text-(--lithos-text)">
        Single checkbox
      </h3>
      <p className="mb-4 text-base text-(--lithos-text) max-w-3xl font-body opacity-80">
        A controlled on/off choice, same as a native input. Works uncontrolled with <code>defaultChecked</code> too.
        Checked shows a check icon by default.
      </p>
      <PreviewBlock code={singleCode} githubUrl={githubUrl}>
        <SingleCheckboxDemo />
      </PreviewBlock>

      <h3 id="plain" className="mb-2 text-xl font-black tracking-tight text-(--lithos-text)">
        Plain checkbox
      </h3>
      <p className="mb-4 text-base text-(--lithos-text) max-w-3xl font-body opacity-80">
        Use <code>PlainCheckbox</code> when the check mark would be redundant, like a settings toggle where the filled
        color alone already tells you it's on.
      </p>
      <PreviewBlock code={plainCode} githubUrl={githubUrl}>
        <PlainCheckboxDemo />
      </PreviewBlock>

      <h3 id="icon" className="mb-2 text-xl font-black tracking-tight text-(--lithos-text)">
        Icon checkbox
      </h3>
      <p className="mb-4 text-base text-(--lithos-text) max-w-3xl font-body opacity-80">
        <code>IconCheckbox</code> drops the box entirely: an outlined icon toggles to a filled one, for a favorite/like
        control instead of a form checkbox. Defaults to a heart; pass <code>icon</code>/<code>checkedIcon</code> to use
        a different pair.
      </p>
      <PreviewBlock code={iconCode} githubUrl={githubUrl}>
        <IconCheckboxDemo />
      </PreviewBlock>

      <h3 id="custom-color" className="mb-2 text-xl font-black tracking-tight text-(--lithos-text)">
        Custom color
      </h3>
      <p className="mb-4 text-base text-(--lithos-text) max-w-3xl font-body opacity-80">
        Pass any valid hex code to <code>color</code> to override the default theme-accent fill. The YIQ contrast engine
        picks legible contrast text/icon color automatically. Try it below.
      </p>
      <PreviewBlock code={customColorCode} githubUrl={githubUrl}>
        <div className="flex flex-col items-center text-center">
          <div className="flex flex-col [&>*:not(:first-child)]:mt-3">
            <Checkbox color={customColor} label="Subscribe to newsletter" defaultChecked />
            <PlainCheckbox color={customColor} label="Enable dark mode" defaultChecked />
            <IconCheckbox color={customColor} label="Add to favorites" defaultChecked />
          </div>

          <div className="mt-6 text-center flex items-center">
            <input
              ref={colorInputRef}
              type="text"
              onFocus={handleColorFocus}
              defaultValue={customColor}
              max={7}
              min={4}
              className="p-1.5 text-sm outline-none border-2 border-(--lithos-border) shadow-[2px_2px_0_0_var(--lithos-shadow)] focus:shadow-[4px_4px_0_0_var(--lithos-shadow)] hover:shadow-[4px_4px_0_0_var(--lithos-shadow)] max-w-[7.5rem]"
            />
            <Button variant="primary" className="ml-6 text-sm" onClick={handleCustomColor}>
              Use color
            </Button>
          </div>

          {colorError && (
            <span className="mt-2 text-xs" style={{ color: colors.error }}>
              {colorError}
            </span>
          )}
        </div>
      </PreviewBlock>

      <h3 id="indeterminate" className="mb-2 text-xl font-black tracking-tight text-(--lithos-text)">
        Indeterminate
      </h3>
      <p className="mb-4 text-base text-(--lithos-text) max-w-3xl font-body opacity-80">
        Use <code>indeterminate</code> for a &quot;select all&quot; checkbox whose children are partially checked. It
        sets the native DOM property directly and always renders a dash — checked and partially-checked are different
        states and stay visually distinct.
      </p>
      <PreviewBlock code={indeterminateCode} githubUrl={githubUrl}>
        <IndeterminateCheckboxDemo />
      </PreviewBlock>

      <h3 id="disabled" className="mb-2 text-xl font-black tracking-tight text-(--lithos-text)">
        Disabled
      </h3>
      <p className="mb-4 text-base text-(--lithos-text) max-w-3xl font-body opacity-80">
        Disables the input and dims the whole label, checked or not.
      </p>
      <PreviewBlock code={disabledCode} githubUrl={githubUrl}>
        <DisabledCheckboxDemo />
      </PreviewBlock>

      <h3 id="group" className="mb-2 text-xl font-black tracking-tight text-(--lithos-text)">
        Checkbox group
      </h3>
      <p className="mb-4 text-base text-(--lithos-text) max-w-3xl font-body opacity-80">
        CheckboxGroup owns one controlled <code>string[]</code>. Children declare a <code>value</code> and pick up
        checked-state and toggling from the group automatically, plus its shared <code>disabled</code> unless they set
        their own.
      </p>
      <PreviewBlock code={groupCode} githubUrl={githubUrl}>
        <GroupCheckboxDemo />
      </PreviewBlock>

      <h3 id="group-horizontal" className="mb-2 text-xl font-black tracking-tight text-(--lithos-text)">
        Horizontal group
      </h3>
      <p className="mb-4 text-base text-(--lithos-text) max-w-3xl font-body opacity-80">
        Pass <code>mode=&quot;horizontal&quot;</code> to flow items in a row instead of stacking them.
      </p>
      <PreviewBlock code={horizontalGroupCode} githubUrl={githubUrl}>
        <HorizontalGroupCheckboxDemo />
      </PreviewBlock>

      <section className="mb-12">
        <h2 id="accessibility" className="mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
          Accessibility
        </h2>
        <ul className="list-disc pl-6 text-lg font-body text-(--lithos-text)">
          <li>
            Renders a real <code>&lt;input type=&quot;checkbox&quot;&gt;</code> wrapped in a <code>&lt;label&gt;</code>,
            so click targets, keyboard toggling (Space), and screen reader semantics all come from the browser for free.
          </li>
          <li>
            The custom box is <code>aria-hidden</code> and purely visual — it tracks the input via{' '}
            <code>peer-checked</code>/<code>peer-indeterminate</code>, never duplicates state.
          </li>
          <li>
            <code>CheckboxGroup</code> exposes <code>role=&quot;group&quot;</code> with <code>aria-labelledby</code>{' '}
            pointed at its <code>label</code>.
          </li>
          <li>Focus is visible via a ring on the box when the hidden input is keyboard-focused.</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 id="api" className="mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
          API Reference
        </h2>
        <PropsAccordion title="Checkbox / PlainCheckbox / IconCheckbox Props" data={checkboxPropsData} />
        <div className="mt-8">
          <PropsAccordion title="IconCheckbox-only Props" data={iconCheckboxPropsData} />
        </div>
        <div className="mt-8">
          <PropsAccordion title="CheckboxGroup Props" data={checkboxGroupPropsData} />
        </div>
      </section>
    </div>
  )
}
