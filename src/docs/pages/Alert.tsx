import { PreviewBlock } from '../../components/ui/PreviewBlock'
import { Alert } from '../../components/ui/Alert'
import { useRef, useState } from 'react'
import { colors } from '../../utils/colors'
import { isHexColor } from '../../core/types'
import { Button } from '../../components/ui/Button'
import { PropsAccordion } from '../../components/ui/PropsTable'
import { SetupGuide } from '../layout/SetupGuide'
import { alertPropsData } from '../propsData/alert'

const githubUrl = 'https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/Alert.tsx'

export const AlertDoc = () => {
  const [customColor, setCustomColor] = useState('#FF00FF')
  const [error, setError] = useState('')
  const [closeDismissed, setCloseDismissed] = useState(false)

  const inputRef = useRef<null | HTMLInputElement>(null)

  const filledCode = {
    body: `export const AlertFilled = () => {
  return (
    <div className='flex flex-col w-full'>
      <Alert className='mb-4' size='lg' variant='filled' title='Default'>Structural review pending.</Alert>
      <Alert className='mb-4' size='lg' intent='success' variant='filled' title='Success'>Deployment verified.</Alert>
      <Alert className='mb-4' size='lg' intent='warning' variant='filled' title='Warning'>Load tolerance nearing limit.</Alert>
      <Alert className='mb-4' size='lg' intent='error' variant='filled' title='Error'>Integrity check failed.</Alert>
      <Alert className='mb-4' size='lg' intent='info' variant='filled' title='Info'>Maintenance window scheduled.</Alert>
      <Alert size='lg' intent='accent' variant='filled' title='Accent'>Theme accent applied.</Alert>
    </div>
  )
}`,
    componentNames: ['Alert'],
    manualPath: '../../components/ui/Alert',
  }

  const outlineCode = {
    body: `export const AlertOutline = () => {
  return (
    <div className='flex flex-col w-full'>
      <Alert className='mb-4' size='lg' variant='outlined' title='Default'>Structural review pending.</Alert>
      <Alert className='mb-4' size='lg' intent='success' variant='outlined' title='Success'>Deployment verified.</Alert>
      <Alert className='mb-4' size='lg' intent='warning' variant='outlined' title='Warning'>Load tolerance nearing limit.</Alert>
      <Alert className='mb-4' size='lg' intent='error' variant='outlined' title='Error'>Integrity check failed.</Alert>
      <Alert className='mb-4' size='lg' intent='info' variant='outlined' title='Info'>Maintenance window scheduled.</Alert>
      <Alert size='lg' intent='accent' variant='outlined' title='Accent'>Theme accent applied.</Alert>
    </div>
  )
}`,
    componentNames: ['Alert'],
    manualPath: '../../components/ui/Alert',
  }

  const sizesCode = {
    body: `export const AlertSizes = () => {
  return (
    <div className='flex flex-col w-full'>
      <Alert className='mb-4' size='sm' title='Small'>Structural review pending.</Alert>
      <Alert className='mb-4' size='md' title='Medium'>Structural review pending.</Alert>
      <Alert size='lg' title='Large'>Structural review pending.</Alert>
    </div>
  )
}`,

    componentNames: ['Alert'],
    manualPath: '../../components/ui/Alert',
  }

  const titlelessCode = {
    body: `export const AlertNoTitle = () => {
  return (
    <div className='flex flex-col w-full'>
      <Alert size='md' intent='warning'>Load tolerance nearing limit.</Alert>
    </div>
  )
}`,
    componentNames: ['Alert'],
    manualPath: '../../components/ui/Alert',
  }

  const actionsCode = {
    body: `export const AlertWithClose = () => {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  return (
    <Alert size='md' intent='error' title='Deployment failed' onClose={() => setDismissed(true)}>
      Build #482 failed structural checks.
    </Alert>
  )
}

export const AlertWithUndo = () => {
  return (
    <Alert size='md' intent='warning' title='Config changed' onUndo={() => alert('Reverting configuration change.')}>
      Timeout threshold updated to 30s.
    </Alert>
  )
}`,
    componentNames: ['useState', 'Alert'],
    manualPath: { useState: 'react', Alert: '../../components/ui/Alert' },
  }

  const customCode = {
    body: `export const CustomizedAlert = () => {
  return (
    <Alert size='md' color='#FF0033' title='Custom'>Custom color alert.</Alert>
  )
}`,
    componentNames: ['Alert'],
    manualPath: '../../components/ui/Alert',
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
        <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none text-(--lithos-text) mb-8">Alert</h1>
        <p className="mt-2 text-lg md:text-xl font-display opacity-70 text-(--lithos-text)">
          A structural plaque for inline messaging that supports distinct status colors.
        </p>
        <hr className="border-t-2 border-(--lithos-border) mt-8 mb-8" />
      </header>

      <section className="mb-12">
        <p className="mb-8 text-lg md:text-xl text-(--lithos-text) max-w-3xl font-body">
          The Alert is an atomic primitive designed for persistent, blocking, in-flow messaging. Unlike the Toast, it
          never floats and never auto-dismisses.
        </p>
      </section>

      <div className="border-l-4 border-(--lithos-accent) pl-6 py-2 mb-8 bg-(--lithos-surface) p-4">
        <p className="text-sm font-bold font-body opacity-80 text-(--lithos-text)">
          Alerts never dismiss themselves. The close and undo actions only appear when you pass <code>onClose</code>/
          <code>onUndo</code>, and it's on you to remove the Alert from your layout state.
        </p>
      </div>

      <h2 id="installation" className="mt-12 mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
        Installation
      </h2>

      <SetupGuide
        componentNames={['Alert']}
        manualPath="../../components/ui/Alert"
        requires={[
          'utils/cn.ts',
          'utils/yiq.ts',
          'utils/colors.ts',
          'core/types.ts',
          'components/ui/Button.tsx',
          'components/ui/icons/IconUndo.tsx',
          'components/ui/icons/IconClose.tsx',
        ]}
      />

      <h2 id="examples" className="mt-12 mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
        Examples
      </h2>

      <h3 id="filled" className="mb-4 text-xl font-black tracking-tight text-(--lithos-text)">
        Filled
      </h3>
      <p className="mb-4 text-base text-(--lithos-text) max-w-3xl font-body opacity-80">
        Use this for high-priority messages that demand immediate user attention. It renders with a solid background
        corresponding to its intent, automatically adjusting text and border colors for contrast. On hover, the border
        and shadow slightly expand. Restrict content to concise messages without complex child layouts. Inherits the{' '}
        <code>alert</code> or <code>status</code> ARIA role based on intent.
      </p>

      <div className="mt-8 mb-16">
        <PreviewBlock code={filledCode} githubUrl={githubUrl}>
          <div className="flex flex-col w-full">
            <Alert className="mb-4" size="lg" variant="filled" title="Default">
              Structural review pending.
            </Alert>
            <Alert className="mb-4" size="lg" intent="success" variant="filled" title="Success">
              Deployment verified.
            </Alert>
            <Alert className="mb-4" size="lg" intent="warning" variant="filled" title="Warning">
              Load tolerance nearing limit.
            </Alert>
            <Alert className="mb-4" size="lg" intent="error" variant="filled" title="Error">
              Integrity check failed.
            </Alert>
            <Alert className="mb-4" size="lg" intent="info" variant="filled" title="Info">
              Maintenance window scheduled.
            </Alert>
            <Alert size="lg" intent="accent" variant="filled" title="Accent">
              Theme accent applied.
            </Alert>
          </div>
        </PreviewBlock>
      </div>

      <h3 id="outline" className="mb-4 text-xl font-black tracking-tight text-(--lithos-text)">
        Outline
      </h3>
      <p className="mb-4 text-base text-(--lithos-text) max-w-3xl font-body opacity-80">
        Use this for medium-priority notifications that should remain visible without overpowering the surrounding page
        content. It renders with a transparent background, applying the intent color to the border, shadow, and text
        instead. Interaction behavior mirrors the filled variant. Best suited for inline validation or standard
        informational messages. Standard ARIA status roles apply.
      </p>

      <div className="mt-8 mb-16">
        <PreviewBlock code={outlineCode} githubUrl={githubUrl}>
          <div className="flex flex-col w-full">
            <Alert className="mb-4" size="lg" variant="outlined" title="Default">
              Structural review pending.
            </Alert>
            <Alert className="mb-4" size="lg" intent="success" variant="outlined" title="Success">
              Deployment verified.
            </Alert>
            <Alert className="mb-4" size="lg" intent="warning" variant="outlined" title="Warning">
              Load tolerance nearing limit.
            </Alert>
            <Alert className="mb-4" size="lg" intent="error" variant="outlined" title="Error">
              Integrity check failed.
            </Alert>
            <Alert className="mb-4" size="lg" intent="info" variant="outlined" title="Info">
              Maintenance window scheduled.
            </Alert>
            <Alert size="lg" intent="accent" variant="outlined" title="Accent">
              Theme accent applied.
            </Alert>
          </div>
        </PreviewBlock>
      </div>

      <h3 id="sizes" className="mb-4 text-xl font-black tracking-tight text-(--lithos-text)">
        Sizes
      </h3>
      <p className="mb-4 text-base text-(--lithos-text) max-w-3xl font-body opacity-80">
        Use the <code>size</code> prop to scale the alert appropriately for its context. It adjusts padding, icon size,
        and typography (<code>sm</code> for dense lists, <code>md</code> for inline flow, <code>lg</code> for page-level
        notices). There are no layout differences other than geometric scaling. Ensure text length remains proportional
        to the chosen size. Does not impact accessibility structure.
      </p>

      <div className="mt-8 mb-16">
        <PreviewBlock code={sizesCode} githubUrl={githubUrl}>
          <div className="flex flex-col w-full">
            <Alert className="mb-4" size="sm" title="Small">
              Structural review pending.
            </Alert>
            <Alert className="mb-4" size="md" title="Medium">
              Structural review pending.
            </Alert>
            <Alert size="lg" title="Large">
              Structural review pending.
            </Alert>
          </div>
        </PreviewBlock>
      </div>

      <h3 id="no-title" className="mb-4 text-xl font-black tracking-tight text-(--lithos-text)">
        No title
      </h3>
      <p className="mb-4 text-base text-(--lithos-text) max-w-3xl font-body opacity-80">
        Use this for a plain message-only plaque when the surrounding context already provides a label for the alert.
        Omitting the <code>title</code> prop restricts the component to a single text node without a heading element.
        Visuals remain identical minus the title block. Avoid using for critical errors where an explicit summary
        heading is necessary. Screen readers will read the message directly.
      </p>

      <div className="mt-8 mb-16">
        <PreviewBlock code={titlelessCode} githubUrl={githubUrl}>
          <div className="flex flex-col w-full">
            <Alert size="md" intent="warning">
              Load tolerance nearing limit.
            </Alert>
          </div>
        </PreviewBlock>
      </div>

      <h3 id="actions" className="mb-4 text-xl font-black tracking-tight text-(--lithos-text)">
        Actions
      </h3>
      <p className="mb-4 text-base text-(--lithos-text) max-w-3xl font-body opacity-80">
        Use this to provide inline resolution for the alert condition. Pass <code>onClose</code> to render a dismiss
        button, or <code>onUndo</code> to render an undo button. The alert component itself does not manage its mount
        state; you must remove it from the DOM in the callback. Action buttons are strictly icon-only and are placed in
        the header. Rendered as native <code>&lt;button&gt;</code> elements with appropriate <code>aria-label</code>s
        for screen readers.
      </p>

      <div className="mt-8 mb-16">
        <PreviewBlock code={actionsCode} githubUrl={githubUrl}>
          <div className="flex flex-col w-full">
            {closeDismissed ? (
              <Button variant="secondary" className="mb-4 text-sm" onClick={() => setCloseDismissed(false)}>
                Reset example
              </Button>
            ) : (
              <Alert
                className="mb-4"
                size="md"
                intent="error"
                title="Deployment failed"
                onClose={() => setCloseDismissed(true)}
              >
                Build #482 failed structural checks.
              </Alert>
            )}

            <Alert size="md" intent="warning" title="Config changed" onUndo={() => {}}>
              Timeout threshold updated to 30s.
            </Alert>
          </div>
        </PreviewBlock>
      </div>

      <h3 id="custom-color" className="mb-4 text-xl font-black tracking-tight text-(--lithos-text)">
        Custom color
      </h3>
      <p className="mb-4 text-base text-(--lithos-text) max-w-3xl font-body opacity-80">
        Use this when the predefined intents do not fit your brand or use case. Pass any valid hex code to the{' '}
        <code>color</code> prop to override the intent palette. The YIQ contrast engine guarantees that text and border
        colors automatically adjust for maximum readability against your custom background. Interaction and
        accessibility roles remain unchanged.
      </p>

      <div className="mt-8 mb-16">
        <PreviewBlock code={customCode} githubUrl={githubUrl}>
          <div className="flex flex-col w-full">
            <Alert size="md" color={customColor} title="Custom">
              Custom color alert.
            </Alert>

            <div className="mt-4 text-center flex items-center justify-center">
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
              <span className="mt-2 text-xs block text-center" style={{ color: colors.error }}>
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
          <li>
            Root element carries <code>role="alert"</code> so assistive tech announces it on mount.
          </li>
          <li>
            Close/undo actions render as native <code>&lt;button&gt;</code>s with <code>aria-label</code> ("Close
            alert", "Undo") since they're icon-only.
          </li>
          <li>Foreground/background contrast is computed through the YIQ engine for both preset and custom colors.</li>
          <li>Never auto-dismisses, so it doesn't rely on timing that assistive tech users can't control.</li>
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
        <PropsAccordion title="Alert Props" data={alertPropsData} />
      </section>
    </div>
  )
}
