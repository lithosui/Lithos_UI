import { PreviewBlock } from '../../components/ui/PreviewBlock'
import { CodeViewer } from '../../components/ui/CodeViewer'
import { PropsAccordion } from '../../components/ui/PropsTable'
import { SetupGuide } from '../layout/SetupGuide'
import { DocCallout, DocExample, DocHeader, DocHeading, DocLeadText, DocSection } from '../layout/DocPage'
import { BasicSelectExample } from '../examples/select/basic'
import basicSource from '../examples/select/basic.tsx?raw'
import { MultipleSelectExample } from '../examples/select/multiple'
import multipleSource from '../examples/select/multiple.tsx?raw'
import { CustomSelectExample } from '../examples/select/customLayout'
import customLayoutSource from '../examples/select/customLayout.tsx?raw'
import { AsyncSelectExample } from '../examples/select/async'
import asyncSource from '../examples/select/async.tsx?raw'
import { removeImports } from '../examples/removeImports'
import {
  selectProps,
  selectTriggerProps,
  selectContentProps,
  selectItemProps,
  useSelectProps,
} from '../propsData/select'

import { colors } from '../../utils/colors'

const githubUrl = 'https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/Select.tsx'
const simpleLayoutCode = {
  body: removeImports(basicSource),
  componentNames: ['Select'],
  manualPath: '../../components/ui/Select',
}
const multipleUsageCode = {
  body: removeImports(multipleSource),
  componentNames: ['Select'],
  manualPath: '../../components/ui/Select',
}
const customLayoutCode = {
  body: removeImports(customLayoutSource),
  componentNames: ['Select', 'SelectTrigger', 'SelectContent', 'SelectItem', 'useSelect', 'cn', 'IconChevronDown'],
  manualPath: {
    others: '../../components/ui/Select',
    cn: '../../utils/cn',
    IconChevronDown: '../../components/ui/icons/IconChevronDown',
  },
}
const asyncUsageCode = {
  body: removeImports(asyncSource),
  componentNames: ['useCallback', 'useState', 'Button', 'Select', 'SelectOption'],
  manualPath: {
    react: ['useCallback', 'useState'],
    others: '../../components/ui/Select',
    Button: '../../components/ui/Button',
    SelectOption: '../../components/ui/select/select.types',
  },
  types: ['SelectOption'],
}

export const SelectDoc = () => {
  return (
    <div className="max-w-5xl mx-auto px-6">
      <DocHeader
        title="Select"
        description="A custom dropdown component for selecting single or multiple values from a list of options."
      />

      <DocSection>
        <DocLeadText>
          The Select component presents a list of options when triggered, allowing users to pick single or multiple
          values. It supports both a quick declarative <code>options</code> array layout and a fully customizable
          compound component layout.
        </DocLeadText>

        <DocCallout>
          The Select popover automatically positions itself relative to the trigger button using Floating UI, keeping
          access fluid and responsive across screen boundaries.
        </DocCallout>
      </DocSection>

      <DocHeading id="installation">Installation</DocHeading>

      <SetupGuide
        componentNames={['Select']}
        manualPath="../../components/ui/Select"
        requires={[
          'utils/cn.ts',
          'utils/yiq.ts',
          'core/useAccentColor.ts',
          'components/ui/Button.tsx',
          'components/ui/Popover.tsx',
          'components/ui/popover/PopoverContent.tsx',
          'components/ui/popover/PopoverTrigger.tsx',
          'components/ui/popover/usePopover.ts',
          'components/ui/icons/IconChevronDown.tsx',
          'components/ui/select/Select.tsx',
          'components/ui/select/SelectTrigger.tsx',
          'components/ui/select/SelectContent.tsx',
          'components/ui/select/SelectItem.tsx',
          'components/ui/select/useSelect.ts',
          'components/ui/select/select.types.ts',
          '@floating-ui/react',
          'core/hooks/useVirtualizer.ts',
        ]}
      />

      <DocHeading id="examples">Examples</DocHeading>

      <DocExample
        id="basic"
        title="Basic"
        description={
          <>
            Pass an array of options through the <code>options</code> prop for quick, declarative rendering without
            extra JSX boilerplate.
          </>
        }
      >
        <PreviewBlock code={simpleLayoutCode} githubUrl={githubUrl}>
          <div className="max-w-xs w-full">
            <BasicSelectExample />
          </div>
        </PreviewBlock>
      </DocExample>

      <DocExample
        id="multiple"
        title="Multiple"
        description={
          <>
            Enable the <code>multiple</code> prop to allow selecting several options. Selected items are displayed
            comma-separated in the trigger while keeping the popover open during selection.
          </>
        }
      >
        <PreviewBlock code={multipleUsageCode} githubUrl={githubUrl}>
          <div className="max-w-xs w-full">
            <MultipleSelectExample />
          </div>
        </PreviewBlock>
      </DocExample>

      <DocExample
        id="custom-layout"
        title="Custom Layout"
        description={
          <>
            Use subcomponents like <code>SelectTrigger</code>, <code>SelectContent</code>, and <code>SelectItem</code>{' '}
            when you need full control over structure, custom icons, or item rendering.
          </>
        }
      >
        <PreviewBlock code={customLayoutCode} githubUrl={githubUrl}>
          <div className="max-w-xs w-full">
            <CustomSelectExample />
          </div>
        </PreviewBlock>
      </DocExample>

      <DocCallout borderColor={colors.warning}>
        <p className="text-sm font-bold font-body opacity-80 text-(--lithos-text)">
          When using a custom composition layout with the <code>multiple</code> prop, retrieve{' '}
          <code>selectedValue</code> and <code>multiple</code> via the <code>useSelect()</code> hook to manage custom
          label rendering or multi-selection tags inside your trigger.
        </p>

        <p className="text-sm font-medium font-body opacity-80 mt-4">
          Don't forget to add the <code>index</code>prop to the SelectItem, otherwise you will need to add an onClick
          event to the SelectContent component.
        </p>
      </DocCallout>

      <DocExample
        id="async-virtualized"
        title="Async Data & Virtualization"
        description="Seamlessly handle options loaded asynchronously. The virtualizer updates scroll alignment automatically when datasets update dynamically."
      >
        <PreviewBlock code={asyncUsageCode} githubUrl={githubUrl}>
          <div className="max-w-xs w-full">
            <AsyncSelectExample />
          </div>
        </PreviewBlock>
      </DocExample>

      <DocCallout borderColor={colors.warning} className="py-4 mb-12">
        <h4 className="text-base font-bold text-(--lithos-text) mb-4">Virtualization Performance & Constraints</h4>
        <p className="text-sm font-body opacity-80 text-(--lithos-text) leading-relaxed">
          By default, <code>SelectContent</code> automatically enables windowing/virtualization when the options array
          contains <strong>30 or more items</strong> (configurable via <code>virtualizeThreshold</code>).
        </p>
        <ul className="list-disc pl-5 mt-2 text-sm font-body opacity-80 text-(--lithos-text) space-y-1">
          <li>
            Automatic virtualization requires passing options via the <code>options</code> prop on{' '}
            <code>&lt;Select /&gt;</code>.
          </li>
          <li>
            All virtualized items must have uniform height (default: <code>32px</code>, adjustable with{' '}
            <code>estimateSize</code>).
          </li>
          <li>
            Custom compound components using manual <code>&lt;SelectItem&gt;</code> children will bypass
            auto-virtualization.
          </li>
        </ul>
      </DocCallout>

      <DocSection>
        <DocHeading id="anatomy">Anatomy</DocHeading>
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
      </DocSection>

      <DocSection>
        <DocHeading id="accessibility">Accessibility</DocHeading>

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
      </DocSection>

      <DocSection>
        <DocHeading id="api">API Reference</DocHeading>

        <DocCallout className="mb-6">
          <strong>Note:</strong> Border radius is configurable globally via the <code>--lithos-radius</code> CSS token,
          or per-instance via <code>className</code> prop of the Select subcomponent (e.g. <code>rounded-full</code> on
          the SelectTrigger). No custom prop is required.
        </DocCallout>

        <PropsAccordion title="Select Props" data={selectProps} className="mb-6" />
        <PropsAccordion title="SelectTrigger Props" data={selectTriggerProps} className="mb-6" />
        <PropsAccordion title="SelectContent Props" data={selectContentProps} className="mb-6" />
        <PropsAccordion title="SelectItem Props" data={selectItemProps} className="mb-6" />
        <PropsAccordion title="useSelect Return Values" isHook data={useSelectProps} />
      </DocSection>
    </div>
  )
}
