import { Spinner, type SpinnerIconType } from '../../components/ui/Spinner'
import { PreviewBlock } from '../../components/ui/PreviewBlock'
import { PropsAccordion } from '../../components/ui/PropsTable'
import { spinnerProps } from '../propsData/spinner'
import { SetupGuide } from '../layout/SetupGuide'
import { Button } from '../../components/ui/Button'
import { InputGroup, InputGroupInput } from '../../components/ui/Input'
import { Badge } from '../../components/ui/Badge'
import { Alert } from '../../components/ui/Alert'
import { useRef, useState } from 'react'
import { colors } from '../../utils/colors'
import { isHexColor } from '../../core/types'

export const SpinnerDoc = () => {
  const [customColor, setCustomColor] = useState('#f59e0b')
  const [error, setError] = useState('')
  const inputRef = useRef<null | HTMLInputElement>(null)

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

  const usageCode = {
    body: `export const SpinnerExample = () => {
  return (
    <div className="flex items-center space-x-8">
      <Spinner size={32} variant="default" />
      <Spinner size={32} variant="accent" />
      <Spinner size={32} color="${customColor}" />
    </div>
  )
}`,
    componentNames: ['Spinner'],
    manualPath: { Spinner: '../../components/ui/Spinner' },
  }

  const sizesCode = {
    body: `export const SpinnerSizes = () => {
  return (
    <div className="flex items-center space-x-8">
      <Spinner size={16} />
      <Spinner size={24} />
      <Spinner size={32} />
      <Spinner size={48} />
    </div>
  )
}`,
    componentNames: ['Spinner'],
    manualPath: { Spinner: '../../components/ui/Spinner' },
  }

  const iconsCode = {
    body: `export const SpinnerIcons = () => {
  return (
    <div className="flex items-center space-x-8 flex-wrap">
      {/* Default FiLoader */}
      <Spinner size={32} />
      <Spinner size={32} icon="FiRefreshCw" />
      <Spinner size={32} icon="LuLoaderCircle" />
      <Spinner size={32} icon="TbLoader2" />
      <Spinner size={32} icon="PiSpinnerGap" />
      <Spinner size={32} icon="RiLoader4Line" />
      <Spinner size={32} icon="MdAutorenew" />
      {/* ... and many more */}
    </div>
  )
}`,
    componentNames: ['Spinner'],
    manualPath: { Spinner: '../../components/ui/Spinner' },
  }

  const rotationCode = {
    body: `export const SpinnerRotation = () => {
  return (
    <div className="flex items-center space-x-8">
      <Spinner size={32} icon="FiRefreshCw" />
      <Spinner size={32} icon="FiRefreshCcw" anticlockwise />
    </div>
  )
}`,
    componentNames: ['Spinner'],
    manualPath: { Spinner: '../../components/ui/Spinner' },
  }

  const integrationCode = {
    body: `export const SpinnerIntegration = () => {
  return (
    <div className="flex flex-col items-center w-full space-y-10">
      {/* Button Examples */}
      <div className="flex flex-wrap justify-center space-x-6">
        <Button disabled variant="primary" iconLeft={<Spinner size={16} icon="FiSettings" />}>
          Applying Configuration
        </Button>
        <Button disabled variant="inverse" iconLeft={<Spinner size={16} icon="PiSpinnerGap" />}>
          Authenticating
        </Button>
      </div>

      {/* Input Example */}
      <div className="w-full max-w-sm">
        <InputGroup startAdornment={<Spinner size={16} icon="LuLoader" />}>
          <InputGroupInput placeholder="Searching database..." disabled />
        </InputGroup>
      </div>

      {/* Badge Examples */}
      <div className="flex flex-wrap justify-center space-x-6">
        <Badge intent="warning" className="flex items-center space-x-2 px-3 py-1.5">
          <Spinner size={12} icon="FiRefreshCw" />
          <span>SYNCING CLOUD</span>
        </Badge>
        <Badge intent="success" className="flex items-center space-x-2 px-3 py-1.5">
          <Spinner size={12} icon="FiRefreshCcw" anticlockwise />
          <span>RESTORING BACKUP</span>
        </Badge>
      </div>

      {/* Alert Example */}
      <div className="w-full max-w-lg">
        <Alert intent="info" variant="outlined" size="md" title="Migration in progress">
          <span className="flex items-center space-x-3">
            <Spinner size={20} icon="VscLoading" />
            <span>Moving 2.4 million records to the new cluster...</span>
          </span>
        </Alert>
      </div>
    </div>
  )
}`,
    componentNames: ['Spinner', 'Button', 'InputGroup', 'InputGroupInput', 'Badge', 'Alert'],
    manualPath: {
      Spinner: '../../components/ui/Spinner',
      Button: '../../components/ui/Button',
      InputGroup: '../../components/ui/Input',
      InputGroupInput: '../../components/ui/Input',
      Badge: '../../components/ui/Badge',
      Alert: '../../components/ui/Alert',
    },
  }

  return (
    <div className="max-w-5xl mx-auto px-6">
      <header className="mt-0">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none text-(--lithos-text) mb-8">
          Spinner
        </h1>
        <p className="mt-2 text-lg md:text-xl font-display opacity-70 text-(--lithos-text)">
          An animated loading indicator for pending states.
        </p>
        <hr className="border-t-2 border-(--lithos-border) mt-8 mb-8" />
      </header>

      <section className="mb-12">
        <p className="mb-8 text-lg md:text-xl text-(--lithos-text) max-w-3xl font-body">
          A drop-in icon for any neobrutalist control. Use this component to indicate loading states during pending
          submits, fetches, and inline busy states.
        </p>
      </section>

      <div className="border-l-4 border-(--lithos-accent) pl-6 py-2 mb-8 bg-(--lithos-surface) p-4">
        <p className="text-sm font-bold font-body opacity-80 text-(--lithos-text)">
          Spinners do not disrupt layout or block interactions directly; combine them with disabled states on parent
          interactive elements.
        </p>
      </div>

      <h2 id="installation" className="mt-12 mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
        Installation
      </h2>

      <SetupGuide componentNames={['Spinner']} manualPath="../../components/ui/Spinner" requires={['utils/cn.ts']} />

      <h2 id="examples" className="mt-12 mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
        Examples
      </h2>

      <h3 id="default" className="mb-4 text-xl font-black tracking-tight text-(--lithos-text)">
        Custom Color
      </h3>
      <p className="mb-4 text-base text-(--lithos-text) max-w-3xl font-body opacity-80">
        Renders a simple rotating loader. It inherits text color by default, making it easy to drop into buttons, cards,
        or alerts.
      </p>

      <PreviewBlock
        code={usageCode}
        githubUrl="https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/Spinner.tsx"
      >
        <div className="flex flex-col items-center p-8">
          <div className="flex items-center justify-center space-x-8">
            <Spinner size={32} variant="default" />
            <Spinner size={32} variant="accent" />
            <Spinner size={32} color={customColor} />
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

      <h3 id="sizes" className="mt-12 mb-4 text-xl font-black tracking-tight text-(--lithos-text)">
        Sizes
      </h3>
      <p className="mb-4 text-base text-(--lithos-text) max-w-3xl font-body opacity-80">
        Scale the spinner to any proportion using the <code>size</code> prop, which accepts a number (in pixels) or a
        string.
      </p>

      <div className="mb-12">
        <PreviewBlock
          code={sizesCode}
          githubUrl="https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/Spinner.tsx"
        >
          <div className="flex flex-col items-center p-8">
            <div className="flex items-end justify-center space-x-8">
              <div className="flex flex-col items-center space-y-2">
                <Spinner size={16} />
                <span className="text-xs font-mono opacity-70">16px</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <Spinner size={24} />
                <span className="text-xs font-mono opacity-70">24px</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <Spinner size={32} />
                <span className="text-xs font-mono opacity-70">32px</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <Spinner size={48} />
                <span className="text-xs font-mono opacity-70">48px</span>
              </div>
            </div>
          </div>
        </PreviewBlock>
      </div>

      <h3 id="rotation" className="mt-12 mb-4 text-xl font-black tracking-tight text-(--lithos-text)">
        Rotation
      </h3>
      <p className="mb-4 text-base text-(--lithos-text) max-w-3xl font-body opacity-80">
        You can control the direction of the spinner's rotation using the <code>anticlockwise</code> prop. The default
        rotation is clockwise.
      </p>

      <div className="mb-12">
        <PreviewBlock
          code={rotationCode}
          githubUrl="https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/Spinner.tsx"
        >
          <div className="flex flex-col items-center p-8">
            <div className="flex items-end justify-center space-x-12">
              <div className="flex flex-col items-center space-y-2">
                <Spinner size={32} icon="FiRefreshCw" />
                <span className="text-xs font-mono opacity-70">clockwise</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <Spinner size={32} icon="FiRefreshCcw" anticlockwise />
                <span className="text-xs font-mono opacity-70">anticlockwise</span>
              </div>
            </div>
          </div>
        </PreviewBlock>
      </div>

      <h3 id="icons" className="mt-12 mb-4 text-xl font-black tracking-tight text-(--lithos-text)">
        Choosing the Spinner
      </h3>
      <p className="mb-4 text-base text-(--lithos-text) max-w-3xl font-body opacity-80">
        You can pass a predefined string to the <code>icon</code> prop. The Spinner will render the corresponding icon
        and automatically pass down the <code>size</code> while spinning indefinitely.
      </p>

      <div className="mb-12">
        <PreviewBlock
          code={iconsCode}
          githubUrl="https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/Spinner.tsx"
        >
          <div className="flex flex-col items-center p-8">
            <div className="flex flex-wrap items-end justify-center -m-4">
              {[
                'FiLoader',
                'FiRefreshCw',
                'FiRefreshCcw',
                'FiSettings',
                'VscLoading',
                'LuLoaderCircle',
                'LuLoader',
                'TbLoader2',
                'TbLoader3',
                'PiSpinnerGap',
                'PiCircleNotch',
                'RiLoader2Line',
                'RiLoader3Line',
                'RiLoader4Line',
              ].map((iconName) => (
                <div key={iconName} className="flex flex-col items-center space-y-2 m-4">
                  <Spinner size={32} icon={iconName as SpinnerIconType} />
                  <span className="text-[10px] font-mono opacity-70">{iconName}</span>
                </div>
              ))}
            </div>
          </div>
        </PreviewBlock>
      </div>

      <h3 id="integration" className="mt-12 mb-4 text-xl font-black tracking-tight text-(--lithos-text)">
        Integration
      </h3>
      <p className="mb-4 text-base text-(--lithos-text) max-w-3xl font-body opacity-80">
        Spinners compose effortlessly with other UI components. Drop them into buttons, inputs, or badges to indicate
        processing states.
      </p>

      <div className="mb-12">
        <PreviewBlock code={integrationCode}>
          <div className="flex flex-col items-center w-full p-8 space-y-10">
            {/* Button Examples */}
            <div className="flex flex-wrap justify-center space-x-6">
              <Button disabled variant="primary" iconLeft={<Spinner size={16} icon="FiSettings" />}>
                Applying Configuration
              </Button>
              <Button disabled variant="inverse" iconLeft={<Spinner size={16} icon="PiSpinnerGap" />}>
                Authenticating
              </Button>
            </div>

            {/* Input Example */}
            <div className="w-full max-w-sm">
              <InputGroup startAdornment={<Spinner size={16} icon="LuLoader" />}>
                <InputGroupInput placeholder="Searching database..." disabled />
              </InputGroup>
            </div>

            {/* Badge Examples */}
            <div className="flex flex-wrap justify-center space-x-6">
              <Badge intent="warning" className="flex items-center space-x-2 px-3 py-1.5">
                <Spinner size={12} icon="FiRefreshCw" />
                <span>SYNCING CLOUD</span>
              </Badge>
              <Badge intent="success" className="flex items-center space-x-2 px-3 py-1.5">
                <Spinner size={12} icon="FiRefreshCcw" anticlockwise />
                <span>RESTORING BACKUP</span>
              </Badge>
            </div>

            {/* Alert Example */}
            <div className="w-full max-w-lg">
              <Alert intent="info" variant="outlined" size="md" title="Migration in progress">
                <span className="flex items-center space-x-3">
                  <Spinner size={20} icon="VscLoading" />
                  <span>Moving 2.4 million records to the new cluster...</span>
                </span>
              </Alert>
            </div>
          </div>
        </PreviewBlock>
      </div>

      <section className="mb-12">
        <h2 id="accessibility" className="mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
          Accessibility
        </h2>
        <ul className="list-disc pl-6 text-lg font-body text-(--lithos-text)">
          <li>
            Uses <code>role="status"</code> to announce its presence to screen readers dynamically.
          </li>
          <li>
            Includes a visually hidden <code>.sr-only</code> text node ("Loading...") as a fallback.
          </li>
          <li>
            Respects system animation settings; while the spin class handles rotation, ensure you don't over-use
            animations for users sensitive to motion.
          </li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 id="api" className="mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
          API Reference
        </h2>
        <PropsAccordion title="Spinner Props" data={spinnerProps} />
      </section>
    </div>
  )
}
