import { PreviewBlock } from '../../components/ui/PreviewBlock'
import { Badge } from '../../components/ui/Badge'
import { useRef, useState } from 'react'
import { colors } from '../../utils/colors'
import { isHexColor } from '../../core/types'
import { Button } from '../../components/ui/Button'
import { type PropItem, PropsAccordion } from '../../components/ui/PropsTable'

const githubUrl = 'https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/Badge.tsx'

const badgeProps: PropItem[] = [
  {
    name: 'children',
    type: 'ReactNode',
    required: false,
    description: 'The content to be rendered inside the badge.'
  },
  {
    name: 'className',
    type: 'string',
    defaultValue: '""',
    required: false,
    description: 'Additional CSS classes to apply custom styles.'
  },
  {
    name: 'size',
    type: '"default" | "sm" | "md" | "lg"',
    defaultValue: '"default"',
    required: false,
    description: 'Defines the overall scale and padding of the badge.'
  },
  {
    name: 'variant',
    type: '"default" | "accent" | "success" | "error" | "warning" | "info"',
    defaultValue: '"default"',
    required: false,
    description: 'Controls the visual style and semantic status of the badge.'
  },
  {
    name: 'color',
    type: 'HexColor | string',
    required: false,
    description: 'Sets a custom background or accent color value.'
  },
  {
    name: 'ref',
    type: 'Ref<HTMLDivElement>',
    required: false,
    description: 'Ref forwarded to the root div element.'
  }
]

export const BadgeDoc = () => {
  const [customColor, setCustomColor] = useState('#FF00FF')
  const [error, setError] = useState('')

  const inputRef = useRef<null | HTMLInputElement>(null)

  const variantsCode = `import { Badge } from '../../components/ui/Badge'

export const BadgeVariants = () => {
  return (
    <div className='flex flex-col items-center text-center flex-wrap'>
      <Badge className='mb-4'>Default</Badge>
      <Badge className='mb-4' variant='accent'>Accent</Badge>
      <Badge className='mb-4' variant='success'>Success</Badge>
      <Badge className='mb-4' variant='warning'>Warning</Badge>
      <Badge className='mb-4' variant='error'>Error</Badge>
      <Badge variant='info'>Info</Badge>
    </div>
  )
}`

  const sizesCode = `import { Badge } from '../../components/ui/Badge'

export const BadgeVariants = () => {
  return (
    <div className='flex flex-col items-center text-center'>
      <Badge>Default</Badge>
      <Badge className='mt-4' size='sm'>Small</Badge>
      <Badge className='mt-4' size='md'>Medium</Badge>
      <Badge className='mt-4' size='lg'>Large</Badge>
    </div>
  )
}`

  const customCode = `import { Badge } from '../../components/ui/Badge'

export const CustomizedBadge = () => {
  return (
    <Badge color='#FF0033' size='medium'>Custom Color</Badge>
  )
}`

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
        <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none text-(--lithos-text) mb-8">
          Badge
        </h1>
        <p className="mt-2 text-lg md:text-xl font-display opacity-70 text-(--lithos-text)">
          A high-contrast metadata indicator that supports differents sizes and color variants.
        </p>
        <hr className="border-t-2 border-(--lithos-border) mt-8 mb-8" />
      </header>

      <section className="mb-12">
        <p className="mb-8 text-lg md:text-xl text-(--lithos-text) max-w-3xl font-body">
          The Badge is an atomic primitive designed to display metadata. It contains a faint shadow that differentiates it from the Button component.
        </p>
      </section>

      <div className="border-l-4 border-(--lithos-accent) pl-6 py-2 mb-8 bg-(--lithos-surface) p-4">
        <p className="text-sm font-bold font-body opacity-80 text-(--lithos-text)">
          Although this component looks like the Button component, it shouldn't be interactive.
        </p>
      </div>

      <h2 id="examples" className="mt-12 mb-4 text-2xl font-black uppercase tracking-tight text-(--lithos-text)">
        Examples
      </h2>

      <h3 id="variants" className="mb-4 text-xl font-black uppercase tracking-tight text-(--lithos-text)">
        Variants
      </h3>

      <div className="mt-8 mb-16">
        <PreviewBlock code={variantsCode} githubUrl={githubUrl}>
          <div className='flex flex-col items-center text-center flex-wrap'>
            <Badge className='mb-4'>Default</Badge>
            <Badge className='mb-4' variant='accent'>Accent</Badge>
            <Badge className='mb-4' variant='success'>Success</Badge>
            <Badge className='mb-4' variant='warning'>Warning</Badge>
            <Badge className='mb-4' variant='error'>Error</Badge>
            <Badge variant='info'>Info</Badge>
          </div>
        </PreviewBlock>
      </div>

      <h3 id="sizes" className="mb-4 text-xl font-black uppercase tracking-tight text-(--lithos-text)">
        Sizes
      </h3>

      <div className="mt-8 mb-16">
        <PreviewBlock code={sizesCode} githubUrl={githubUrl}>
          <div className='flex flex-col items-center text-center'>
            <Badge>Default</Badge>
            <Badge className='mt-4' size='sm'>Small</Badge>
            <Badge className='mt-4' size='md'>Medium</Badge>
            <Badge className='mt-4' size='lg'>Large</Badge>
          </div>
        </PreviewBlock>
      </div>

      <h3 id="custom-color" className="mb-4 text-xl font-black uppercase tracking-tight text-(--lithos-text)">
        Custom color
      </h3>

      <div className="mt-8 mb-16">
        <PreviewBlock code={customCode} githubUrl={githubUrl}>
          <div className='flex flex-col items-center text-center'>
            <Badge color={customColor} size='md'>Custom Color</Badge>

            <div className='mt-4 text-center flex items-center'>
              <input ref={inputRef} type='text' onFocus={handleFocus} defaultValue={customColor} max={7} min={4} className='p-1.5 text-sm outline-none border-2 border-(--lithos-border) shadow-[2px_2px_0_0_var(--lithos-shadow)] focus:shadow-[4px_4px_0_0_var(--lithos-shadow)] hover:shadow-[4px_4px_0_0_var(--lithos-shadow)] max-w-[7.5rem]' />
              <Button intent='primary' className='ml-6 text-sm' onClick={handleCustomColor}>Use color</Button>
            </div>

            {error && (<span className='mt-2 text-xs' style={{ color: colors.error }}>{error}</span>)}
          </div>
        </PreviewBlock>
      </div>

      <h2 id="requires" className="mb-4 text-2xl font-black uppercase tracking-tight text-(--lithos-text)">
        Requires
      </h2>
      <ul className="list-disc pl-6 mb-12 text-lg font-body text-(--lithos-text)">
        <li><code>clsx</code> and <code>tailwind-merge</code> for class merging utility.</li>
      </ul>

      <section className="mb-12">
        <h2 id="accessibility" className="mb-4 text-2xl font-black uppercase tracking-tight text-(--lithos-text)">
          Accessibility
        </h2>
        <ul className="list-disc pl-6 text-lg font-body text-(--lithos-text)">
          <li>Non-interactive by default; excluded from the focus order to keep keyboard navigation seamless.</li>
          <li>Maintains readable text contrast ratios across all status variants.</li>
        </ul>
      </section>

      <section className='mb-12'>
        <h2 id='api' className='mb-4 text-2xl font-black uppercase tracking-tight text-(--lithos-text)'>
          API Reference
        </h2>

        <PropsAccordion title='Badge Props' data={badgeProps} />
      </section>
    </div>
  )
}
