import { PreviewBlock } from '../../components/ui/PreviewBlock'
import { SetupGuide } from '../layout/SetupGuide'
import { Button } from '../../components/ui/Button'
import { PropsAccordion } from '../../components/ui/PropsTable'
import { CodeViewer } from '../../components/ui/CodeViewer'
import { Popover, PopoverTrigger, PopoverContent, PopoverClose } from '../../components/ui/Popover'

import {
  popoverPropsData,
  popoverTriggerPropsData,
  popoverContentPropsData,
  popoverClosePropsData,
} from '../propsData/popover'

const githubUrl = 'https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/Popover.tsx'

const componentNames = ['Popover', 'PopoverTrigger', 'PopoverContent', 'PopoverClose']
const manualPath = {
  Popover: '../../components/ui/Popover',
  PopoverTrigger: '../../components/ui/Popover',
  PopoverContent: '../../components/ui/Popover',
  PopoverClose: '../../components/ui/Popover',
}

const PopoverDemo = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="flex flex-col">
          <h4 className="font-bold">Settings</h4>
          <p className="text-sm mt-2">Configure your preferences here.</p>
          <PopoverClose asChild>
            <Button variant="secondary" className="mt-4" fullWidth>
              Close
            </Button>
          </PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export const PopoverPage = () => {
  const defaultCode = {
    body: `export const DefaultPopover = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Open Popover</Button>
      </PopoverTrigger>
      
      <PopoverContent className="w-64">
        <div className="flex flex-col">
          <h4 className="font-bold">Settings</h4>
          <p className="text-sm mt-2">Configure your preferences here.</p>
          <PopoverClose asChild>
            <Button variant="secondary" className="mt-4" fullWidth>
              Close
            </Button>
          </PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  )
}`,
    componentNames: ['Popover', 'PopoverTrigger', 'PopoverContent', 'PopoverClose', 'Button'],
    manualPath: {
      Popover: '../../components/ui/Popover',
      PopoverTrigger: '../../components/ui/Popover',
      PopoverContent: '../../components/ui/Popover',
      PopoverClose: '../../components/ui/Popover',
      Button: '../../components/ui/Button',
    },
  }

  return (
    <div className="max-w-5xl mx-auto px-6">
      <header className="mt-0">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none text-(--lithos-text) mb-8">
          Popover
        </h1>
        <p className="mt-2 text-lg md:text-xl font-display opacity-70 text-(--lithos-text)">
          A floating overlay primitive powered by Floating UI, built for menus, dropdowns, and settings panels.
        </p>
        <hr className="border-t-2 border-(--lithos-border) mt-6 mb-6" />
      </header>

      <section className="mb-6">
        <p className="text-lg md:text-xl text-(--lithos-text) max-w-3xl font-body">
          Popover is the foundational abstraction for building complex floating interfaces like <code>Select</code>,{' '}
          <code>DropdownMenu</code>, and <code>Tooltip</code>. It completely abstracts away the collision-detection math
          and DOM-portal logic using <code>@floating-ui/react</code> while maintaining the brutalist UI aesthetic.
        </p>
      </section>

      <h2 id="installation" className="mt-12 mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
        Installation
      </h2>
      <SetupGuide
        componentNames={componentNames}
        manualPath={manualPath}
        requires={['@floating-ui/react', '../../utils/cn']}
      />

      <h2 id="anatomy" className="mt-12 mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
        Anatomy
      </h2>
      <div className="mb-12">
        <p className="mb-4 text-lg md:text-xl text-(--lithos-text) max-w-3xl font-body">
          Popover is an uncontrolled or controlled compound component. Compose it from the four subcomponents below to
          establish the floating context and interaction triggers.
        </p>
        <CodeViewer
          code={`<Popover>
  <PopoverTrigger>Trigger</PopoverTrigger>
  <PopoverContent>
    Content
    <PopoverClose>Close</PopoverClose>
  </PopoverContent>
</Popover>`}
          language="tsx"
        />
      </div>

      <h2 id="examples" className="mt-12 mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
        Examples
      </h2>

      <div className="mb-12">
        <h3 className="text-xl font-bold mb-4 font-display">Default</h3>
        <p className="mb-4 text-sm font-body opacity-80 max-w-2xl">
          By default, the popover opens below its trigger. It will automatically flip to the top if it collides with the
          bottom of the viewport. Focus is trapped inside while open.
        </p>
        <PreviewBlock code={defaultCode} githubUrl={githubUrl}>
          <div className="flex justify-center py-12">
            <PopoverDemo />
          </div>
        </PreviewBlock>
      </div>

      <h2 id="accessibility" className="mt-12 mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
        Accessibility
      </h2>
      <ul className="list-disc pl-6 space-y-2 mb-12 font-body text-(--lithos-text) opacity-80">
        <li>
          Uses <code>FloatingFocusManager</code> to trap focus inside the Popover when open.
        </li>
        <li>
          Automatically handles <code>aria-labelledby</code> and <code>aria-describedby</code> if IDs are provided.
        </li>
        <li>
          Toggles <code>data-state="open | closed"</code> on the trigger for custom styling.
        </li>
        <li>Dismissible via the Escape key, clicking outside, or clicking a trigger.</li>
      </ul>

      <h2 id="api-reference" className="mt-12 mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
        API Reference
      </h2>
      <div className="mb-12">
        <PropsAccordion title="Popover Props" data={popoverPropsData} />
        <div className="mt-8">
          <PropsAccordion title="PopoverTrigger Props" data={popoverTriggerPropsData} />
        </div>
        <div className="mt-8">
          <PropsAccordion title="PopoverContent Props" data={popoverContentPropsData} />
        </div>
        <div className="mt-8">
          <PropsAccordion title="PopoverClose Props" data={popoverClosePropsData} />
        </div>
      </div>
    </div>
  )
}
