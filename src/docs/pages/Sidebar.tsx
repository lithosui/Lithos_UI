import { useState } from 'react'
import { PreviewBlock } from '../../components/ui/PreviewBlock'
import { CodeViewer } from '../../components/ui/CodeViewer'
import { SetupGuide } from '../layout/SetupGuide'
import { Sidebar, SidebarContent, SidebarTrigger, SidebarItem } from '../../components/ui/Sidebar'
import { PropsAccordion } from '../../components/ui/PropsTable'
import {
  useSidebarReturnPropsData,
  sidebarItemPropsData,
  sidebarTriggerPropsData,
  sidebarContentPropsData,
  sidebarPropsData,
} from '../propsData/sidebar'

const githubUrl = 'https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/sidebar/Sidebar.tsx'
const manualPath = '../../components/ui/Sidebar'

export const ExamplePermanent = () => {
  const [active, setActive] = useState('item-0')

  const items = [
    { icon: '🏠', label: 'Dashboard', id: 'item-0' },
    { icon: '📦', label: 'Projects', id: 'item-1' },
    { icon: '⚙️', label: 'Settings', id: 'item-2' },
  ]

  return (
    <div className="flex h-screen w-full bg-(--lithos-surface)">
      <Sidebar role="navigation">
        <SidebarContent className="border-r-2 border-(--lithos-border) p-2 space-y-2">
          <div className="p-3 font-bold border-b-2 border-(--lithos-border) -mx-2 -mt-2 mb-2 uppercase">Lithos</div>

          {items.map((item) => (
            <SidebarItem key={item.id} icon={item.icon} active={active === item.id} onClick={() => setActive(item.id)}>
              {item.label}
            </SidebarItem>
          ))}
        </SidebarContent>
      </Sidebar>

      <main className="flex-1 flex flex-col min-w-[320px] overflow-y-auto p-6 space-y-6">
        <header className="border-b-2 border-(--lithos-border) pb-4">
          <h1 className="text-2xl font-black uppercase">Main Dashboard</h1>
          <p className="text-sm opacity-80">Overview of the layout integration with Permanent Sidebar.</p>
        </header>

        <section className="flex flex-wrap -m-2">
          <div className="w-full md:w-1/3 p-2">
            <div className="p-4 border-2 border-(--lithos-border) bg-(--lithos-surface) shadow-[4px_4px_0px_0px_var(--lithos-shadow)]">
              <h3 className="font-bold mb-1 truncate">Total Users</h3>
              <p className="text-2xl font-black">1,240</p>
            </div>
          </div>
          <div className="w-full md:w-1/3 p-2">
            <div className="p-4 border-2 border-(--lithos-border) bg-(--lithos-surface) shadow-[4px_4px_0px_0px_var(--lithos-shadow)]">
              <h3 className="font-bold mb-1 truncate">Conversion Rate</h3>
              <p className="text-2xl font-black">85%</p>
            </div>
          </div>
          <div className="w-full md:w-1/3 p-2">
            <div className="p-4 border-2 border-(--lithos-border) bg-(--lithos-surface) shadow-[4px_4px_0px_0px_var(--lithos-shadow)]">
              <h3 className="font-bold mb-1 truncate">Server Latency</h3>
              <p className="text-2xl font-black">12 ms</p>
            </div>
          </div>
        </section>

        <section className="p-4 border-2 border-(--lithos-border) bg-(--lithos-surface) shadow-[4px_4px_0px_0px_var(--lithos-border)] flex-1 min-h-[200px]">
          <h2 className="font-bold mb-2">Active View: {active}</h2>
          <p className="text-sm">Content related to the selected item goes here.</p>
        </section>
      </main>
    </div>
  )
}

export const ExampleMini = () => {
  const [open, setOpen] = useState(true)
  const [active, setActive] = useState('item-0')

  const items = [
    { icon: '🏠', label: 'Dashboard', id: 'item-0' },
    { icon: '📦', label: 'Projects', id: 'item-1' },
    { icon: '⚙️', label: 'Settings', id: 'item-2' },
  ]

  return (
    <div className="flex h-screen w-full bg-(--lithos-surface) overflow-hidden">
      <Sidebar open={open} setOpen={setOpen} mode="mini" role="navigation">
        <SidebarContent className="p-2 space-y-2">
          <div
            className={`flex items-center py-1.5 ${open ? 'px-2 justify-between' : 'justify-center'} border-b-2 border-(--lithos-border)`}
          >
            {open && <span className="font-bold tracking-wider uppercase text-lg">Lithos</span>}
            <SidebarTrigger />
          </div>

          {items.map((item) => (
            <SidebarItem key={item.id} icon={item.icon} active={active === item.id} onClick={() => setActive(item.id)}>
              {item.label}
            </SidebarItem>
          ))}
        </SidebarContent>
      </Sidebar>

      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto p-6 space-y-6">
        <header className="border-b-2 border-(--lithos-border) pb-4">
          <h1 className="text-2xl font-black uppercase">Main Dashboard</h1>
          <p className="text-sm opacity-80">Overview of the layout integration with Sidebar.</p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 spacex-4">
          <div className="p-4 border-2 border-(--lithos-border) bg-(--lithos-surface) shadow-[4px_4px_0px_0px_var(--lithos-shadow)]">
            <h3 className="font-bold mb-1">Total Users</h3>
            <p className="text-2xl font-black">1,240</p>
          </div>
          <div className="p-4 border-2 border-(--lithos-border) bg-(--lithos-surface) shadow-[4px_4px_0px_0px_var(--lithos-shadow)]">
            <h3 className="font-bold mb-1">Conversion Rate</h3>
            <p className="text-2xl font-black">85%</p>
          </div>
          <div className="p-4 border-2 border-(--lithos-border) bg-(--lithos-surface) shadow-[4px_4px_0px_0px_var(--lithos-shadow)]">
            <h3 className="font-bold mb-1">Server Latency</h3>
            <p className="text-2xl font-black">12 ms</p>
          </div>
        </section>

        <section className="p-4 border-2 border-(--lithos-border) bg-(--lithos-surface) shadow-[4px_4px_0px_0px_var(--lithos-border)] flex-1 min-h-[200px]">
          <h2 className="font-bold mb-2">Active View: {active}</h2>
          <p className="text-sm">Content related to the selected item goes here.</p>
        </section>
      </main>
    </div>
  )
}

const usagePermanent = {
  body: `export const ExamplePermanent = () => {
  const [active, setActive] = useState('item-0')

  const items = [
    { icon: '🏠', label: 'Dashboard', id: 'item-0' },
    { icon: '📦', label: 'Projects', id: 'item-1' },
    { icon: '⚙️', label: 'Settings', id: 'item-2' },
  ]

  return (
    <div className='flex h-screen w-full bg-(--lithos-surface)'>
      <Sidebar role='navigation'>
        <SidebarContent className='border-r-2 border-(--lithos-border) p-2 space-y-2'>
          <div className='p-3 font-bold border-b-2 border-(--lithos-border) -mx-2 -mt-2 mb-2 uppercase'>
            Lithos
          </div>

          {items.map(item => (
            <SidebarItem
              key={item.id}
              icon={item.icon}
              active={active === item.id}
              onClick={() => setActive(item.id)}
            >
              {item.label}
            </SidebarItem>
          ))}
        </SidebarContent>
      </Sidebar>

      <main className='flex-1 flex flex-col min-w-[320px] overflow-y-auto p-6 space-y-6'>
        <header className='border-b-2 border-(--lithos-border) pb-4'>
          <h1 className='text-2xl font-black uppercase'>Main Dashboard</h1>
          <p className='text-sm opacity-80'>Overview of the layout integration with Permanent Sidebar.</p>
        </header>

        <section className='flex flex-wrap -m-2'>
          <div className='w-full md:w-1/3 p-2'>
            <div className='p-4 border-2 border-(--lithos-border) bg-(--lithos-surface) shadow-[4px_4px_0px_0px_var(--lithos-shadow)]'>
              <h3 className='font-bold mb-1 truncate'>Total Users</h3>
              <p className='text-2xl font-black'>1,240</p>
            </div>
          </div>
          <div className='w-full md:w-1/3 p-2'>
            <div className='p-4 border-2 border-(--lithos-border) bg-(--lithos-surface) shadow-[4px_4px_0px_0px_var(--lithos-shadow)]'>
              <h3 className='font-bold mb-1 truncate'>Conversion Rate</h3>
              <p className='text-2xl font-black'>85%</p>
            </div>
          </div>
          <div className='w-full md:w-1/3 p-2'>
            <div className='p-4 border-2 border-(--lithos-border) bg-(--lithos-surface) shadow-[4px_4px_0px_0px_var(--lithos-shadow)]'>
              <h3 className='font-bold mb-1 truncate'>Server Latency</h3>
              <p className='text-2xl font-black'>12 ms</p>
            </div>
          </div>
        </section>

        <section className='p-4 border-2 border-(--lithos-border) bg-(--lithos-surface) shadow-[4px_4px_0px_0px_var(--lithos-border)] flex-1 min-h-[200px]'>
          <h2 className='font-bold mb-2'>Active View: {active}</h2>
          <p className='text-sm'>Content related to the selected item goes here.</p>
        </section>
      </main>
    </div>
  )
}`,
  componentNames: ['Sidebar', 'SidebarContent', 'SidebarItem', 'useState'],
  manualPath: {
    react: ['useState'],
    others: manualPath,
  },
}

const usageMini = {
  body: `export const ExampleMini = () => {
  const [open, setOpen] = useState(true)
  const [active, setActive] = useState('item-0')

  const items = [
    { icon: '🏠', label: 'Dashboard', id: 'item-0' },
    { icon: '📦', label: 'Projects', id: 'item-1' },
    { icon: '⚙️', label: 'Settings', id: 'item-2' },
  ]

  return (
    <div className='flex h-screen w-full bg-(--lithos-surface) overflow-hidden'>
      <Sidebar open={open} setOpen={setOpen} mode='mini' role='navigation'>
        <SidebarContent className='p-2 space-y-2'>
          <div className={\`flex items-center py-1.5 \${open ? 'px-2 justify-between' : 'justify-center'} border-b-2 border-(--lithos-border)\`}>
            {open && <span className='font-bold tracking-wider uppercase text-lg'>Lithos</span>}
            <SidebarTrigger />
          </div>

          {items.map(item => (
            <SidebarItem
              key={item.id}
              icon={item.icon}
              active={active === item.id}
              onClick={() => setActive(item.id)}
            >
              {item.label}
            </SidebarItem>
          ))}
        </SidebarContent>
      </Sidebar>

      <main className='flex-1 flex flex-col min-w-0 overflow-y-auto p-6 space-y-6'>
        <header className='border-b-2 border-(--lithos-border) pb-4'>
          <h1 className='text-2xl font-black uppercase'>Main Dashboard</h1>
          <p className='text-sm opacity-80'>Overview of the layout integration with Sidebar.</p>
        </header>

        <section className='grid grid-cols-1 md:grid-cols-3 spacex-4'>
          <div className='p-4 border-2 border-(--lithos-border) bg-(--lithos-surface) shadow-[4px_4px_0px_0px_var(--lithos-shadow)]'>
            <h3 className='font-bold mb-1'>Total Users</h3>
            <p className='text-2xl font-black'>1,240</p>
          </div>
          <div className='p-4 border-2 border-(--lithos-border) bg-(--lithos-surface) shadow-[4px_4px_0px_0px_var(--lithos-shadow)]'>
            <h3 className='font-bold mb-1'>Conversion Rate</h3>
            <p className='text-2xl font-black'>85%</p>
          </div>
          <div className='p-4 border-2 border-(--lithos-border) bg-(--lithos-surface) shadow-[4px_4px_0px_0px_var(--lithos-shadow)]'>
            <h3 className='font-bold mb-1'>Server Latency</h3>
            <p className='text-2xl font-black'>12 ms</p>
          </div>
        </section>

        <section className='p-4 border-2 border-(--lithos-border) bg-(--lithos-surface) shadow-[4px_4px_0px_0px_var(--lithos-border)] flex-1 min-h-[200px]'>
          <h2 className='font-bold mb-2'>Active View: {active}</h2>
          <p className='text-sm'>Content related to the selected item goes here.</p>
        </section>
      </main>
    </div>
  )
}`,
  componentNames: ['Sidebar', 'SidebarContent', 'SidebarTrigger', 'SidebarItem', 'useState'],
  manualPath: {
    react: ['useState'],
    others: manualPath,
  },
}

export const SidebarDoc = () => {
  return (
    <div className="max-w-5xl mx-auto px-6">
      <header className="mt-0">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none text-(--lithos-text) mb-6">
          Sidebar
        </h1>
        <p className="mt-2 text-lg md:text-xl font-display opacity-70 text-(--lithos-text)">
          A flexible navigation panel supporting permanent and collapsible mini modes with neo-brutalist styling.
        </p>
        <hr className="border-t-2 border-(--lithos-border) mt-6 mb-6" />
      </header>

      <section className="mb-12">
        <p className="mb-8 text-lg md:text-xl text-(--lithos-text) max-w-3xl font-body">
          The Sidebar component structures application layouts by grouping navigation links and controls. It supports a
          static permanent layout as well as a collapsible mini mode for space-constrained interfaces.
        </p>
      </section>

      <h2 id="installation" className="mt-12 mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
        Installation
      </h2>

      <SetupGuide
        componentNames={['Sidebar', 'SidebarContent', 'SidebarItem', 'SidebarTrigger']}
        manualPath={manualPath}
        requires={[
          'utils/cn.ts',
          'components/ui/Button',
          'components/ui/icons/IconChevronLeft',
          'components/ui/icons/IconSidebar',
        ]}
      />

      <h2 id="examples" className="mt-12 mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
        Examples
      </h2>

      <h3 id="permanent" className="mb-4 text-xl font-black tracking-tight text-(--lithos-text)">
        Permanent
      </h3>
      <p className="text-base text-(--lithos-text) max-w-3xl font-body mb-4 opacity-80">
        The default mode. The sidebar remains strictly visible at its full expanded width. Recommended for large desktop
        screens where navigation space is plentiful.
      </p>

      <div className="mt-8 mb-16">
        <PreviewBlock code={usagePermanent} githubUrl={githubUrl} className="overflow-x-auto">
          <ExamplePermanent />
        </PreviewBlock>
      </div>

      <h3 id="mini" className="mb-4 text-xl font-black tracking-tight text-(--lithos-text)">
        Mini
      </h3>
      <p className="text-base text-(--lithos-text) max-w-3xl font-body mb-4 opacity-80">
        Allows toggling between an expanded state and a compact icon-only view using the <code>SidebarTrigger</code>{' '}
        component.
      </p>

      <div className="mt-8 mb-16">
        <PreviewBlock code={usageMini} githubUrl={githubUrl}>
          <ExampleMini />
        </PreviewBlock>
      </div>

      <h2 id="anatomy" className="mt-12 mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
        Anatomy
      </h2>
      <div className="mb-12">
        <p className="mb-4 text-lg md:text-xl text-(--lithos-text) max-w-3xl font-body">
          Sidebar is a compound component. Combine its structural primitives to compose custom headers, navigation
          items, and collapse triggers.
        </p>
        <CodeViewer
          language="tsx"
          code={`<Sidebar>
  <SidebarContent>
    <SidebarTrigger />

    <SidebarItem></SidebarItem>
  </SidebarContent>
</Sidebar>`}
        />
      </div>

      <section className="mt-12 mb-12">
        <h2 id="accessibility" className="mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
          Accessibility
        </h2>
        <ul className="list-disc pl-6 text-lg font-body text-(--lithos-text)">
          <li>
            Supports semantic HTML landmark roles (<code>aside</code>, <code>nav</code>, <code>section</code>) via the{' '}
            <code>role</code> prop.
          </li>
          <li>
            <code>SidebarItem</code> leverages the native <code>Button</code> component to maintain keyboard focus
            indicators and click handling.
          </li>
          <li>
            Labels are dynamically exposed via <code>title</code> attributes when the sidebar is collapsed in mini mode.
          </li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 id="api" className="mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
          API Reference
        </h2>

        <div className="mb-6 p-4 border-l-4 border-(--lithos-accent) bg-(--lithos-surface) text-sm font-body text-(--lithos-text)">
          <strong>Note:</strong> Border styles and theme colors are powered globally via <code>--lithos-border</code>{' '}
          and <code>--lithos-surface</code> CSS variables. Override container layouts via <code>className</code>.
        </div>

        <PropsAccordion title="Sidebar Props" data={sidebarPropsData} />
        <PropsAccordion title="SidebarContent Props" data={sidebarContentPropsData} />
        <PropsAccordion title="SidebarTrigger Props" data={sidebarTriggerPropsData} />
        <PropsAccordion title="SidebarItem Props" data={sidebarItemPropsData} />
        <PropsAccordion title="useSidebar return" data={useSidebarReturnPropsData} isHook />
      </section>
    </div>
  )
}
