import { PreviewBlock } from '../../components/ui/PreviewBlock'
import { Badge } from '../../components/ui/Badge'
import { useRef, useState } from 'react'
import { colors } from '../../utils/colors'
import { isHexColor } from '../../core/types'
import { Button } from '../../components/ui/Button'
import { PropsAccordion } from '../../components/ui/PropsTable'
import { badgePropsData } from '../propsData/badge'
import { SetupGuide } from '../layout/SetupGuide'

const githubUrl = 'https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/Badge.tsx'
const BADGE_PATH = '../../components/ui/Badge'

export const BadgeDoc = () => {
  const [customColor, setCustomColor] = useState('#FF00FF')
  const [error, setError] = useState('')

  const inputRef = useRef<null | HTMLInputElement>(null)

  const variantsCode = {
    body: `export const BadgeVariants = () => {
  return (
    <div className='flex flex-col items-center text-center flex-wrap'>
      <Badge className='mb-4'>Default</Badge>
      <Badge className='mb-4' intent='accent'>Accent</Badge>
      <Badge className='mb-4' intent='success'>Success</Badge>
      <Badge className='mb-4' intent='warning'>Warning</Badge>
      <Badge className='mb-4' intent='error'>Error</Badge>
      <Badge intent='info'>Info</Badge>
    </div>
  )
}`,
    componentNames: ['Badge'],
    manualPath: BADGE_PATH,
  }

  const sizesCode = {
    body: `export const BadgeVariants = () => {
  return (
    <div className='flex flex-col items-center text-center'>
      <Badge>Default</Badge>
      <Badge className='mt-4' size='sm'>Small</Badge>
      <Badge className='mt-4' size='md'>Medium</Badge>
      <Badge className='mt-4' size='lg'>Large</Badge>
    </div>
  )
}`,
    componentNames: ['Badge'],
    manualPath: BADGE_PATH,
  }

  const customCode = {
    body: `export const CustomizedBadge = () => {
  return (
    <Badge color='#FF0033' size='medium'>Custom Color</Badge>
  )
}`,
    componentNames: ['Badge'],
    manualPath: BADGE_PATH,
  }

  const handleFocus = () => setError('')

  const handleCustomColor = () => {
    if (!inputRef.current) return

    const value = inputRef.current.value

    if (!isHexColor(value)) {
      setError('Please specify a valid HEX color. (Example: #FF00FF)')
      return
    }

    setCustomColor(value)
  }

  return (
    <div className="max-w-5xl mx-auto px-6">
      <header className="mt-0">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none text-(--lithos-text) mb-8">Badge</h1>
        <p className="mt-2 text-lg md:text-xl font-display opacity-70 text-(--lithos-text)">
          A high-contrast metadata indicator that supports differents sizes and color variants.
        </p>
        <hr className="border-t-2 border-(--lithos-border) mt-8 mb-8" />
      </header>

      <section className="mb-12">
        <p className="mb-8 text-lg md:text-xl text-(--lithos-text) max-w-3xl font-body">
          The Badge is an atomic primitive designed to display metadata. It contains a faint shadow that differentiates
          it from the Button component.
        </p>
      </section>

      <div className="border-l-4 border-(--lithos-accent) pl-6 py-2 mb-8 bg-(--lithos-surface) p-4">
        <p className="text-sm font-bold font-body opacity-80 text-(--lithos-text)">
          Although this component looks like the Button component, it shouldn't be interactive.
        </p>
      </div>

      <h2 id="installation" className="mt-12 mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
        Installation
      </h2>

      <SetupGuide
        componentNames={['Badge']}
        manualPath="../../components/ui/Badge"
        requires={['utils/cn.ts', 'core/useAccentColor.ts', 'utils/yiq.ts', 'utils/colors.ts', 'core/types.ts']}
      />

      <h2 id="examples" className="mt-12 mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
        Examples
      </h2>

      <h3 id="variants" className="mb-4 text-xl font-black tracking-tight text-(--lithos-text)">
        Variants
      </h3>
      <p className="text-base text-(--lithos-text) max-w-3xl font-body mb-4 opacity-80">
        Use this to categorize or highlight small pieces of information, such as status labels or counts. It renders as
        an inline block with a solid background matching its intent, automatically adjusting text color via the YIQ
        engine. There are no hover or focus states since it is purely presentational. Content should be limited to 1-3
        words or a short number. Excluded from keyboard focus by default to prevent navigation friction.
      </p>

      <div className="mt-8 mb-16">
        <PreviewBlock code={variantsCode} githubUrl={githubUrl}>
          <div className="flex flex-col items-center text-center flex-wrap">
            <Badge className="mb-4">Default</Badge>
            <Badge className="mb-4" intent="accent">
              Accent
            </Badge>
            <Badge className="mb-4" intent="success">
              Success
            </Badge>
            <Badge className="mb-4" intent="warning">
              Warning
            </Badge>
            <Badge className="mb-4" intent="error">
              Error
            </Badge>
            <Badge intent="info">Info</Badge>
          </div>
        </PreviewBlock>
      </div>

      <h3 id="sizes" className="mb-4 text-xl font-black tracking-tight text-(--lithos-text)">
        Sizes
      </h3>
      <p className="text-base text-(--lithos-text) max-w-3xl font-body mb-4 opacity-80">
        Use the <code>size</code> prop to scale the badge appropriately for its context. It proportionally scales the
        font size and padding (<code>sm</code> for tight data tables, <code>md</code> for standard tags, <code>lg</code>{' '}
        for prominent status headers). Does not affect structural layout or color contrast. Limits remain identical
        across all sizes. Continues to be ignored by standard focus indexing.
      </p>

      <div className="mt-8 mb-16">
        <PreviewBlock code={sizesCode} githubUrl={githubUrl}>
          <div className="flex flex-col items-center text-center">
            <Badge>Default</Badge>
            <Badge className="mt-4" size="sm">
              Small
            </Badge>
            <Badge className="mt-4" size="md">
              Medium
            </Badge>
            <Badge className="mt-4" size="lg">
              Large
            </Badge>
          </div>
        </PreviewBlock>
      </div>

      <h3 id="custom-color" className="mb-4 text-xl font-black tracking-tight text-(--lithos-text)">
        Custom color
      </h3>
      <p className="text-base text-(--lithos-text) max-w-3xl font-body mb-4 opacity-80">
        Use this when the predefined intents do not match your branding or exact categorization needs. Pass a valid hex
        code to the <code>color</code> prop to completely override the background. The YIQ contrast engine will
        automatically calculate the most legible text and border colors against your custom background. Interaction and
        accessibility roles remain unchanged.
      </p>

      <div className="mt-8 mb-16">
        <PreviewBlock code={customCode} githubUrl={githubUrl}>
          <div className="flex flex-col items-center text-center">
            <Badge color={customColor} size="md">
              Custom Color
            </Badge>

            <div className="mt-4 text-center flex items-center">
              <input
                ref={inputRef}
                type="text"
                onFocus={handleFocus}
                defaultValue={customColor}
                max={7}
                min={4}
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

      <section className="mb-12">
        <h2 id="accessibility" className="mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
          Accessibility
        </h2>
        <ul className="list-disc pl-6 text-lg font-body text-(--lithos-text)">
          <li>Non-interactive by default; excluded from the focus order to keep keyboard navigation seamless.</li>
          <li>Maintains readable text contrast ratios across all status variants.</li>
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

        <PropsAccordion title="Badge Props" data={badgePropsData} />
      </section>
    </div>
  )
}
