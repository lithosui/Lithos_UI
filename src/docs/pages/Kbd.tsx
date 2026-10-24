import { PreviewBlock } from '../../components/ui/PreviewBlock'
import { Kbd, KbdGroup } from '../../components/ui/Kbd'
import { useEffect, useRef, useState } from 'react'
import { colors } from '../../utils/colors'
import { isHexColor } from '../../core/types'
import { Button } from '../../components/ui/Button'
import { InputGroup, InputGroupInput } from '../../components/ui/Input'
import { PropsAccordion } from '../../components/ui/PropsTable'
import { kbdPropsData, kbdGroupPropsData } from '../propsData/kbd'
import { SetupGuide } from '../layout/SetupGuide'

const githubUrl = 'https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/Kbd.tsx'
const KBD_PATH = '../../components/ui/Kbd'

export const KbdDoc = () => {
  const [customColor, setCustomColor] = useState('#A855F7')
  const [error, setError] = useState('')
  const inputRef = useRef<null | HTMLInputElement>(null)
  const searchInputRef = useRef<null | HTMLInputElement>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        searchInputRef.current?.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const defaultCode = {
    body: `export const DefaultKbd = () => {
  return (
    <div className="flex items-center space-x-2">
      <Kbd>⌘</Kbd>
      <Kbd>K</Kbd>
      <Kbd>Esc</Kbd>
      <Kbd>Enter</Kbd>
      <Kbd>Tab</Kbd>
    </div>
  )
}`,
    componentNames: ['Kbd'],
    manualPath: KBD_PATH,
  }

  const shortcutsCode = {
    body: `export const ShortcutSequences = () => {
  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Standard spaced group */}
      <KbdGroup>
        <Kbd>Ctrl</Kbd>
        <span className="text-xs font-mono font-bold opacity-60 text-(--lithos-text)">+</span>
        <Kbd>Shift</Kbd>
        <span className="text-xs font-mono font-bold opacity-60 text-(--lithos-text)">+</span>
        <Kbd>P</Kbd>
      </KbdGroup>

      {/* Attached brutalist strip */}
      <KbdGroup attached>
        <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
      </KbdGroup>
    </div>
  )
}`,
    componentNames: ['Kbd', 'KbdGroup'],
    manualPath: KBD_PATH,
  }

  const variantsCode = {
    body: `export const KbdVariants = () => {
  return (
    <div className="flex flex-wrap items-center justify-center space-x-3">
      <Kbd variant="default">Default</Kbd>
      <Kbd variant="accent">Accent</Kbd>
      <Kbd variant="outline">Outline</Kbd>
      <Kbd variant="subtle">Subtle</Kbd>
      <Kbd variant="inverse">Inverse</Kbd>
    </div>
  )
}`,
    componentNames: ['Kbd'],
    manualPath: KBD_PATH,
  }

  const sizesCode = {
    body: `export const KbdSizes = () => {
  return (
    <div className="flex items-center space-x-3">
      <Kbd size="xs">XS</Kbd>
      <Kbd size="sm">SM</Kbd>
      <Kbd size="md">MD</Kbd>
      <Kbd size="lg">LG</Kbd>
    </div>
  )
}`,
    componentNames: ['Kbd'],
    manualPath: KBD_PATH,
  }

  const customColorCode = {
    body: `export const CustomColorKbd = () => {
  return (
    <div className="flex flex-wrap items-center justify-center space-x-3">
      <Kbd color="#00FF00" size="lg">Ctrl</Kbd>
      <Kbd color="#00FFFF" size="lg">Alt</Kbd>
      <Kbd color="#FFFF00" size="lg">Shift</Kbd>
      <Kbd color="#FF0055" size="lg">⌘</Kbd>
      <Kbd color="#A855F7" size="lg">Custom</Kbd>
    </div>
  )
}`,
    componentNames: ['Kbd'],
    manualPath: KBD_PATH,
  }

  const inContextCode = {
    body: `export const InContextKbd = () => {
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <InputGroup
      className="w-full max-w-sm"
      endAdornment={
        <KbdGroup>
          <Kbd size="sm">Ctrl</Kbd>
          <span className="text-xs font-mono font-bold opacity-60 text-(--lithos-text)">+</span>
          <Kbd size="sm">K</Kbd>
        </KbdGroup>
      }
    >
      <InputGroupInput ref={inputRef} placeholder="Quick Search... (Ctrl + K)" />
    </InputGroup>
  )
}`,
    componentNames: ['Kbd', 'KbdGroup', 'InputGroup', 'InputGroupInput'],
    manualPath: KBD_PATH,
  }

  const handleFocus = () => setError('')

  const handleCustomColor = () => {
    if (!inputRef.current) return

    const value = inputRef.current.value

    if (!isHexColor(value)) {
      setError('Please specify a valid HEX color. (Example: #00FF00)')
      return
    }

    setCustomColor(value)
  }

  return (
    <div className="max-w-5xl mx-auto px-6">
      <header className="mt-0">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none text-(--lithos-text) mb-8">Kbd</h1>
        <p className="mt-2 text-lg md:text-xl font-display opacity-70 text-(--lithos-text)">
          A mechanical neo-brutalist keycap primitive for displaying keyboard shortcuts and hardware triggers.
        </p>
        <hr className="border-t-2 border-(--lithos-border) mt-8 mb-8" />
      </header>

      <section className="mb-12">
        <p className="mb-8 text-lg md:text-xl text-(--lithos-text) max-w-3xl font-body">
          The <code>Kbd</code> component renders a semantic HTML <code>&lt;kbd&gt;</code> element with tactical keycap
          proportions, high-contrast monospace typography, and brutalist 0px-blur hard-drop shadows.
        </p>
      </section>

      <div className="border-l-4 border-(--lithos-accent) pl-6 py-2 mb-8 bg-(--lithos-surface) p-4">
        <p className="text-sm font-bold font-body opacity-80 text-(--lithos-text)">
          Adheres to the Zero-Gap Rule: multi-key shortcut layouts use <code>KbdGroup</code> with explicit margin
          arithmetic, never CSS <code>gap</code>.
        </p>
      </div>

      <h2 id="installation" className="mt-12 mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
        Installation
      </h2>

      <SetupGuide
        slug="kbd"
        componentNames={['Kbd', 'KbdGroup']}
        manualPath={KBD_PATH}
        requires={['utils/cn.ts', 'utils/yiq.ts', 'core/types.ts']}
      />

      <h2 id="examples" className="mt-12 mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
        Examples
      </h2>

      <h3 id="default" className="mb-4 text-xl font-black tracking-tight text-(--lithos-text)">
        Default
      </h3>
      <p className="text-base text-(--lithos-text) max-w-3xl font-body mb-4 opacity-80">
        Standard atomic keycaps for single keys and special modifier characters.
      </p>

      <div className="mt-8 mb-16">
        <PreviewBlock code={defaultCode} githubUrl={githubUrl}>
          <div className="flex items-center space-x-2">
            <Kbd>⌘</Kbd>
            <Kbd>K</Kbd>
            <Kbd>Esc</Kbd>
            <Kbd>Enter</Kbd>
            <Kbd>Tab</Kbd>
          </div>
        </PreviewBlock>
      </div>

      <h3 id="shortcuts" className="mb-4 text-xl font-black tracking-tight text-(--lithos-text)">
        Shortcuts &amp; Groups
      </h3>
      <p className="text-base text-(--lithos-text) max-w-3xl font-body mb-4 opacity-80">
        Use <code>KbdGroup</code> to compose shortcut combinations. The <code>attached</code> prop fuses adjacent
        keycaps into a single monolithic strip.
      </p>

      <div className="mt-8 mb-16">
        <PreviewBlock code={shortcutsCode} githubUrl={githubUrl}>
          <div className="flex flex-col items-center space-y-4">
            <KbdGroup>
              <Kbd>Ctrl</Kbd>
              <span className="text-xs font-mono font-bold opacity-60 text-(--lithos-text)">+</span>
              <Kbd>Shift</Kbd>
              <span className="text-xs font-mono font-bold opacity-60 text-(--lithos-text)">+</span>
              <Kbd>P</Kbd>
            </KbdGroup>

            <KbdGroup attached>
              <Kbd>⌘</Kbd>
              <Kbd>K</Kbd>
            </KbdGroup>
          </div>
        </PreviewBlock>
      </div>

      <h3 id="variants" className="mb-4 text-xl font-black tracking-tight text-(--lithos-text)">
        Variants
      </h3>
      <p className="text-base text-(--lithos-text) max-w-3xl font-body mb-4 opacity-80">
        Preset styles including brand accent fills, flat outlines, and subtle borders.
      </p>

      <div className="mt-8 mb-16">
        <PreviewBlock code={variantsCode} githubUrl={githubUrl}>
          <div className="flex flex-wrap items-center justify-center space-x-3">
            <Kbd variant="default">Default</Kbd>
            <Kbd variant="accent">Accent</Kbd>
            <Kbd variant="outline">Outline</Kbd>
            <Kbd variant="subtle">Subtle</Kbd>
            <Kbd variant="inverse">Inverse</Kbd>
          </div>
        </PreviewBlock>
      </div>

      <h3 id="sizes" className="mb-4 text-xl font-black tracking-tight text-(--lithos-text)">
        Sizes
      </h3>
      <p className="text-base text-(--lithos-text) max-w-3xl font-body mb-4 opacity-80">
        Scale keycaps proportionally using the <code>size</code> prop (<code>xs</code>, <code>sm</code>, <code>md</code>
        , <code>lg</code>).
      </p>

      <div className="mt-8 mb-16">
        <PreviewBlock code={sizesCode} githubUrl={githubUrl}>
          <div className="flex items-center space-x-3">
            <Kbd size="xs">XS</Kbd>
            <Kbd size="sm">SM</Kbd>
            <Kbd size="md">MD</Kbd>
            <Kbd size="lg">LG</Kbd>
          </div>
        </PreviewBlock>
      </div>

      <h3 id="custom-color" className="mb-4 text-xl font-black tracking-tight text-(--lithos-text)">
        Custom Color
      </h3>
      <p className="text-base text-(--lithos-text) max-w-3xl font-body mb-4 opacity-80">
        Pass any valid hex color to the <code>color</code> prop. The YIQ contrast engine automatically recalculates
        high-contrast text color.
      </p>

      <div className="mt-8 mb-16">
        <PreviewBlock code={customColorCode} githubUrl={githubUrl}>
          <div className="flex flex-col items-center text-center">
            <div className="flex flex-wrap items-center justify-center space-x-3">
              <Kbd color="#00FF00" size="lg">
                Ctrl
              </Kbd>
              <Kbd color="#00FFFF" size="lg">
                Alt
              </Kbd>
              <Kbd color="#FFFF00" size="lg">
                Shift
              </Kbd>
              <Kbd color="#FF0055" size="lg">
                ⌘
              </Kbd>
              <Kbd color={customColor} size="lg">
                Custom
              </Kbd>
            </div>

            <div className="mt-6 text-center flex items-center">
              <input
                ref={inputRef}
                type="text"
                onFocus={handleFocus}
                defaultValue={customColor}
                maxLength={7}
                minLength={4}
                className="p-1.5 text-sm outline-none border-2 border-(--lithos-border) shadow-[2px_2px_0_0_var(--lithos-shadow)] focus:shadow-[4px_4px_0_0_var(--lithos-shadow)] hover:shadow-[4px_4px_0_0_var(--lithos-shadow)] max-w-30"
              />
              <Button variant="primary" className="ml-6 text-sm" onClick={handleCustomColor}>
                Use color
              </Button>
            </div>

            {error && (
              <span className="mt-2 text-xs" style={{ color: colors.error }}>
                {error}
              </span>
            )}
          </div>
        </PreviewBlock>
      </div>

      <h3 id="in-context" className="mb-4 text-xl font-black tracking-tight text-(--lithos-text)">
        In Context
      </h3>
      <p className="text-base text-(--lithos-text) max-w-3xl font-body mb-4 opacity-80">
        Seamlessly integrates alongside search fields, buttons, dialogs, and navigation palettes. Pressing{' '}
        <Kbd size="xs">Ctrl</Kbd> + <Kbd size="xs">K</Kbd> directly focuses the input below.
      </p>

      <div className="mt-8 mb-16">
        <PreviewBlock code={inContextCode} githubUrl={githubUrl}>
          <InputGroup
            className="w-full max-w-sm cursor-text"
            onClick={() => searchInputRef.current?.focus()}
            endAdornment={
              <KbdGroup>
                <Kbd size="sm">Ctrl</Kbd>
                <span className="text-xs font-mono font-bold opacity-60 text-(--lithos-text)">+</span>
                <Kbd size="sm">K</Kbd>
              </KbdGroup>
            }
          >
            <InputGroupInput ref={searchInputRef} placeholder="Quick Search... (Ctrl + K)" />
          </InputGroup>
        </PreviewBlock>
      </div>

      <section className="mb-12">
        <h2 id="accessibility" className="mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
          Accessibility
        </h2>
        <ul className="list-disc pl-6 text-lg font-body text-(--lithos-text) space-y-2">
          <li>
            Uses semantic <code>&lt;kbd&gt;</code> elements so assistive technologies recognize keyboard input
            indicators.
          </li>
          <li>Enforces WCAG AA/AAA contrast ratios dynamically through the YIQ engine.</li>
          <li>
            Grouping container uses <code>role="group"</code> for assistive software hierarchy.
          </li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 id="api" className="mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
          API Reference
        </h2>
        <div className="mb-6 p-4 border-l-4 border-(--lithos-accent) bg-(--lithos-surface) text-sm font-body text-(--lithos-text)">
          <strong>Note:</strong> Corner radius adheres to global <code>--lithos-radius</code> token, and layout spacing
          honors the Zero-Gap rule.
        </div>

        <PropsAccordion title="Kbd Props" data={kbdPropsData} />
        <div className="mt-6">
          <PropsAccordion title="KbdGroup Props" data={kbdGroupPropsData} />
        </div>
      </section>
    </div>
  )
}
