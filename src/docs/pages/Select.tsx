import { PreviewBlock } from '../../components/ui/PreviewBlock'
import { CodeViewer } from '../../components/ui/CodeViewer'
import { Select, SelectTrigger, SelectItem, SelectContent, useSelect } from '../../components/ui/Select'
import { PropsAccordion } from '../../components/ui/PropsTable'
import { SetupGuide } from '../layout/SetupGuide'
import {
  selectProps,
  selectTriggerProps,
  selectContentProps,
  selectItemProps,
  useSelectProps,
} from '../propsData/select'

import { colors } from '../../utils/colors'
import { cn } from '../../utils/cn'
import { IconChevronDown } from '../../components/ui/icons/IconChevronDown'

const githubUrl = 'https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/Select.tsx'

const FRAMEWORK_OPTIONS = [
  { value: 'react', label: 'React', color: 'bg-cyan-400', downloads: '20M/week' },
  { value: 'preact', label: 'Preact', color: 'bg-purple-500', downloads: '1.2M/week' },
  { value: 'vue', label: 'Vue.js', color: 'bg-emerald-500', downloads: '4M/week' },
  { value: 'svelte', label: 'Svelte', color: 'bg-orange-500', downloads: '800K/week' },
]

const CustomSelectLayout = () => {
  const { selectedValue } = useSelect()
  const currentOption = FRAMEWORK_OPTIONS.find((opt) => opt.value === selectedValue)

  return (
    <>
      <SelectTrigger className="w-full justify-between">
        <span className="flex items-center space-x-2 truncate min-w-0">
          {currentOption && <span className={cn('size-2 rounded-full shrink-0', currentOption.color)} />}
          <span className="truncate min-w-0 font-medium">
            {currentOption ? currentOption.label : 'Select a framework...'}
          </span>
        </span>
        <IconChevronDown className="ml-2 size-4 shrink-0 opacity-60" />
      </SelectTrigger>
      <SelectContent>
        {FRAMEWORK_OPTIONS.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            <div className="flex items-center justify-between w-full space-x-4">
              <span className="flex items-center space-x-2 min-w-0">
                <span className={cn('size-2 rounded-full shrink-0', opt.color)} />
                <span className="truncate">{opt.label}</span>
              </span>
              <span className="text-xs opacity-60 font-mono shrink-0">{opt.downloads}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </>
  )
}

const simpleLayoutCode = {
  body: `const FRAMEWORK_OPTIONS = [
  { label: 'React', value: 'react' },
  { label: 'Preact', value: 'preact' },
  { label: 'Vue.js', value: 'vue' },
  { label: 'Svelte', value: 'svelte' }
]

export const SelectSimple = () => {
  return (
    <Select
      options={FRAMEWORK_OPTIONS}
      placeholder='Select a framework...'
    />
  )
}`,
  componentNames: ['Select'],
  manualPath: '../../components/ui/Select',
}

const multipleUsageCode = {
  body: `const FRAMEWORK_OPTIONS = [
  { label: 'React', value: 'react' },
  { label: 'Preact', value: 'preact' },
  { label: 'Vue', value: 'vue' },
  { label: 'Svelte', value: 'svelte' }
]

export const SelectMultiple = () => {
  return (
    <Select
      multiple
      options={FRAMEWORK_OPTIONS}
      placeholder='Select frameworks...'
    />
  )
}`,
  componentNames: ['Select'],
  manualPath: '../../components/ui/Select',
}

const customLayoutCode = {
  body: `const FRAMEWORK_OPTIONS = [
  { value: 'react', label: 'React', color: 'bg-cyan-400', downloads: '20M/week' },
  { value: 'preact', label: 'Preact', color: 'bg-purple-500', downloads: '1.2M/week' },
  { value: 'vue', label: 'Vue.js', color: 'bg-emerald-500', downloads: '4M/week' },
  { value: 'svelte', label: 'Svelte', color: 'bg-orange-500', downloads: '800K/week' }
]

const CustomSelectLayout = () => {
  const { selectedValue } = useSelect()
  const currentOption = FRAMEWORK_OPTIONS.find(opt => opt.value === selectedValue)

  return (
    <>
      <SelectTrigger className='w-full justify-between'>
        <span className='flex items-center space-x-2 truncate min-w-0'>
          {currentOption && (
            <span className={\`size-2 rounded-full shrink-0 \${currentOption.color}\`} />
          )}
          <span className='truncate min-w-0 font-medium'>
            {currentOption ? currentOption.label : 'Select a framework...'}
          </span>
        </span>
        <IconChevronDown className='ml-2 size-4 shrink-0 opacity-60' />
      </SelectTrigger>

      <SelectContent>
        {FRAMEWORK_OPTIONS.map(opt => (
          <SelectItem key={opt.value} value={opt.value}>
            <div className='flex items-center justify-between w-full space-x-4'>
              <span className='flex items-center space-x-2 min-w-0'>
                <span className={\`size-2 rounded-full shrink-0 \${opt.color}\`} />
                <span className='truncate'>{opt.label}</span>
              </span>
              <span className='text-xs opacity-60 font-mono shrink-0'>
                {opt.downloads}
              </span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </>
  )
}

export const SelectCustom = () => {
  return (
    <Select>
      <CustomSelectLayout />
    </Select>
  )
}`,
  componentNames: ['Select', 'SelectTrigger', 'SelectContent', 'SelectItem', 'useSelect', 'IconChevronDown'],
  manualPath: {
    others: '../../components/ui/Select',
    IconChevronDown: '../../components/icons/IconChevronDown',
  },
}

export const SelectDoc = () => {
  return (
    <div className="max-w-5xl mx-auto px-6">
      <header className="mt-0">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none text-(--lithos-text) mb-8">
          Select
        </h1>
        <p className="mt-2 text-lg md:text-xl font-display opacity-70 text-(--lithos-text)">
          A custom dropdown component for selecting single or multiple values from a list of options.
        </p>
        <hr className="border-t-2 border-(--lithos-border) mt-8 mb-8" />
      </header>

      <section className="mb-12">
        <p className="mb-8 text-lg md:text-xl text-(--lithos-text) max-w-3xl font-body">
          The Select component presents a list of options when triggered, allowing users to pick single or multiple
          values. It supports both a quick declarative <code>options</code> array layout and a fully customizable
          compound component layout.
        </p>
      </section>

      <div className="border-l-4 border-(--lithos-accent) pl-6 py-2 mb-8 bg-(--lithos-surface) p-4">
        <p className="text-sm font-bold font-body opacity-80 text-(--lithos-text)">
          The Select popover automatically positions itself relative to the trigger button using Floating UI, keeping
          access fluid and responsive across screen boundaries.
        </p>
      </div>

      <h2 id="installation" className="mt-12 mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
        Installation
      </h2>

      <SetupGuide
        componentNames={['Select']}
        manualPath="../../components/ui/Select"
        requires={[
          'utils/cn.ts',
          'utils/yiq.ts',
          'core/useAccentColor.ts',
          'components/ui/Button.tsx',
          'components/ui/Popover.tsx',
          'components/ui/icons/IconChevronDown.tsx',
          'components/ui/select/SelectTrigger.tsx',
          'components/ui/select/SelectContent.tsx',
          'components/ui/select/SelectItem.tsx',
          'components/ui/select/useSelect.ts',
          '@floating-ui/react',
        ]}
      />

      <h2 id="examples" className="mt-12 mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
        Examples
      </h2>

      <h3 id="simple-usage" className="mb-4 text-xl font-black tracking-tight text-(--lithos-text)">
        Simple Usage
      </h3>
      <p className="mb-4 text-base text-(--lithos-text) max-w-3xl font-body opacity-80">
        Pass an array of options through the <code>options</code> prop for quick, declarative rendering without extra
        JSX boilerplate.
      </p>

      <div className="mt-8 mb-16">
        <PreviewBlock code={simpleLayoutCode} githubUrl={githubUrl}>
          <div className="max-w-xs w-full">
            <Select options={FRAMEWORK_OPTIONS} placeholder="Select a framework..." />
          </div>
        </PreviewBlock>
      </div>

      <h3 id="multiple-selection" className="mb-4 text-xl font-black tracking-tight text-(--lithos-text)">
        Multiple Selection
      </h3>
      <p className="mb-4 text-base text-(--lithos-text) max-w-3xl font-body opacity-80">
        Enable the <code>multiple</code> prop to allow selecting several options. Selected items are displayed
        comma-separated in the trigger while keeping the popover open during selection.
      </p>

      <div className="mt-8 mb-16">
        <PreviewBlock code={multipleUsageCode} githubUrl={githubUrl}>
          <div className="max-w-xs w-full">
            <Select multiple options={FRAMEWORK_OPTIONS} placeholder="Select frameworks..." />
          </div>
        </PreviewBlock>
      </div>

      <h3 id="custom-layout" className="mb-4 text-xl font-black tracking-tight text-(--lithos-text)">
        Custom Layout (Compound Components)
      </h3>
      <p className="mb-4 text-base text-(--lithos-text) max-w-3xl font-body opacity-80">
        Use subcomponents like <code>SelectTrigger</code>, <code>SelectContent</code>, and <code>SelectItem</code> when
        you need full control over structure, custom icons, or item rendering.
      </p>

      <div className="mt-8 mb-16">
        <PreviewBlock code={customLayoutCode} githubUrl={githubUrl}>
          <div className="max-w-xs w-full">
            <Select>
              <CustomSelectLayout />
            </Select>
          </div>
        </PreviewBlock>
      </div>

      <div className="border-l-4 pl-6 py-2 mb-8 bg-(--lithos-surface) p-4" style={{ borderColor: colors.warning }}>
        <p className="text-sm font-bold font-body opacity-80 text-(--lithos-text)">
          When using a custom composition layout with the <code>multiple</code> prop, retrieve{' '}
          <code>selectedValue</code> and <code>multiple</code> via the <code>useSelect()</code> hook to manage custom
          label rendering or multi-selection tags inside your trigger.
        </p>
      </div>

      <h2 id="anatomy" className="mt-12 mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
        Anatomy
      </h2>
      <div className="mb-12">
        <CodeViewer
          language="tsx"
          code={`<Select>
  <SelectTrigger>...</SelectTrigger>

  <SelectContent>
    <SelectItem>...</SelectItem>
    <SelectItem>...</SelectItem>
    <SelectItem>...</SelectItem>
  </SelectContent>
</Select>`}
        />
      </div>

      <section className="mb-12">
        <h2 id="accessibility" className="mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
          Accessibility
        </h2>

        <p className="mb-4 text-base font-body text-(--lithos-text)">
          The <code>Select</code> component follows the WAI-ARIA <strong>Select (Combobox) Pattern</strong>, built on
          top of Floating UI to provide seamless keyboard navigation, focus management, and screen reader feedback.
        </p>

        <h3 className="mb-2 text-lg font-bold text-(--lithos-text)">Keyboard Navigation</h3>
        <ul className="list-disc pl-6 text-base font-body text-(--lithos-text) space-y-2 mb-6">
          <li>
            <kbd>Space</kbd> or <kbd>Enter</kbd>: Opens the select menu when focused on the trigger, or selects the
            currently active option.
          </li>
          <li>
            <kbd>ArrowDown</kbd> / <kbd>ArrowUp</kbd>: Moves focus to the next or previous option in the list with
            looping support.
          </li>
          <li>
            <kbd>Home</kbd> / <kbd>End</kbd>: Jumps focus directly to the first or last available option in the menu.
          </li>
          <li>
            <kbd>Esc</kbd>: Closes the listbox immediately and returns focus back to the trigger element.
          </li>
        </ul>

        <h3 className="mb-2 text-lg font-bold text-(--lithos-text)">ARIA & State Management</h3>
        <ul className="list-disc pl-6 text-base font-body text-(--lithos-text) space-y-2">
          <li>
            The list container uses <code>role="listbox"</code> while each item uses <code>role="option"</code>.
          </li>
          <li>
            Options reflect their selection state via <code>aria-selected="true"</code> and communicate visual focus
            through <code>data-active</code> attributes.
          </li>
          <li>
            Implements a <strong>roving tabIndex</strong> mechanism (<code>tabIndex={0}</code> on active item,{' '}
            <code>-1</code> on rest), keeping the list clean for sequential keyboard navigation.
          </li>
          <li>
            Disabled options automatically set <code>aria-disabled="true"</code> and are skipped during arrow key
            navigation.
          </li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 id="api" className="mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
          API Reference
        </h2>

        <div className="mb-6 p-4 border-l-4 border-(--lithos-accent) bg-(--lithos-surface) text-sm font-body text-(--lithos-text)">
          <strong>Note:</strong> Border radius is configurable globally via the <code>--lithos-radius</code> CSS token,
          or per-instance via <code>className</code> prop of the Select subcomponent (e.g. <code>rounded-full</code> on
          the SelectTrigger). No custom prop is required.
        </div>

        <PropsAccordion title="Select Props" data={selectProps} className="mb-6" />
        <PropsAccordion title="SelectTrigger Props" data={selectTriggerProps} className="mb-6" />
        <PropsAccordion title="SelectContent Props" data={selectContentProps} className="mb-6" />
        <PropsAccordion title="SelectItem Props" data={selectItemProps} className="mb-6" />
        <PropsAccordion title="useSelect Return Values" isHook data={useSelectProps} />
      </section>
    </div>
  )
}
