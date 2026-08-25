import { useState } from 'react'
import { Toggle } from '../../components/ui/Toggle'
import { PreviewBlock } from '../../components/ui/PreviewBlock'
import { PropsAccordion } from '../../components/ui/PropsTable'
import { toggleProps } from '../propsData/toggle'
import { SetupGuide } from '../layout/SetupGuide'

export const ToggleDoc = () => {
  const [checked, setChecked] = useState(false)

  const usageCode = {
    body: `export const ToggleExample = () => {
  const [checked, setChecked] = useState(false)

  return (
    <Toggle
      checked={checked}
      onToggle={() => setChecked(!checked)}
      label="Documentation Toggle"
    />
  )
}`,
    componentNames: ['Toggle', 'useState'],
    manualPath: { useState: 'react', Toggle: '../../components/ui/Toggle' },
  }

  return (
    <div className="max-w-5xl mx-auto px-6">
      <header className="mt-0">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none text-(--lithos-text) mb-8">
          Toggle
        </h1>
        <p className="mt-2 text-lg md:text-xl font-display opacity-70 text-(--lithos-text)">
          A high-contrast binary control with strict mathematical dimensions.
        </p>
        <hr className="border-t-2 border-(--lithos-border) mt-8 mb-8" />
      </header>

      <section className="mb-12">
        <p className="mb-8 text-lg md:text-xl text-(--lithos-text) max-w-3xl font-body">
          Unlike native checkboxes, this toggle is engineered as a stationary shell. Only the internal thumb and
          external shadow translate, ensuring the surrounding layout never suffers from sub-pixel shifting during
          interaction.
        </p>
      </section>

      <div className="border-l-4 border-(--lithos-accent) pl-6 py-2 mb-8 bg-(--lithos-surface) p-4">
        <p className="text-sm font-bold font-body opacity-80 text-(--lithos-text)">
          Interact with the live assembly below to observe the binary contrast flip.
        </p>
      </div>

      <h2 id="installation" className="mt-12 mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
        Installation
      </h2>

      <SetupGuide
        componentNames={['Toggle']}
        manualPath="../../components/ui/Toggle"
        requires={['utils/cn.ts', 'components/ui/Button.tsx']}
      />

      <h2 id="examples" className="mt-12 mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
        Examples
      </h2>

      <h3 id="default" className="mb-4 text-xl font-black tracking-tight text-(--lithos-text)">
        Default
      </h3>
      <p className="mb-4 text-base text-(--lithos-text) max-w-3xl font-body opacity-80">
        Use this to instantly apply a binary choice, such as turning a specific setting on or off. It renders a
        prominent switch that clearly indicates its current state via a sliding thumb and color fill. Clicking or
        pressing Space/Enter toggles the state with a smooth horizontal translation. Ensure the <code>label</code> prop
        is always provided; even if visually hidden, it provides critical context to screen readers alongside the{' '}
        <code>aria-pressed</code> attribute.
      </p>

      <PreviewBlock
        code={usageCode}
        githubUrl="https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/Toggle.tsx"
      >
        <Toggle checked={checked} onToggle={() => setChecked(!checked)} label="Documentation Toggle" />
      </PreviewBlock>

      <section className="mb-12">
        <h2 id="accessibility" className="mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
          Accessibility
        </h2>
        <ul className="list-disc pl-6 text-lg font-body text-(--lithos-text)">
          <li>
            Rendered as a native <code>&lt;button&gt;</code> with <code>type="button"</code>, ensuring keyboard
            accessibility and focus management.
          </li>
          <li>
            Uses <code>aria-pressed</code> attribute to announce the toggle state (true/false) to assistive technology.
          </li>
          <li>
            Accepts a custom <code>label</code> prop that powers both <code>aria-label</code> and a visually-hidden{' '}
            <code>.sr-only</code> span for screen readers.
          </li>
          <li>
            High-contrast borders (2px black) and sharp state changes ensure visibility for users with low vision.
          </li>
          <li>Stationary shell design prevents layout shifts, reducing cognitive load and motion-triggered issues.</li>
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
        <PropsAccordion title="Toggle Props" data={toggleProps} />
      </section>
    </div>
  )
}
