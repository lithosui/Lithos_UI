import { useState } from 'react'
import { PreviewBlock } from '../../components/ui/PreviewBlock'
import { CodeViewer } from '../../components/ui/CodeViewer'
import {
  Drawer,
  DrawerHeader,
  DrawerFooter,
  DrawerBody,
  DrawerTitle,
  type DrawerPlacement,
} from '../../components/ui/Drawer'
import { Button } from '../../components/ui/Button'

import { IconClose } from '../../components/ui/icons/IconClose'

import { PropsAccordion } from '../../components/ui/PropsTable'
import { SetupGuide } from '../layout/SetupGuide'
import {
  drawerPropsData,
  drawerHeaderPropsData,
  drawerBodyPropsData,
  drawerFooterPropsData,
  drawerTitlePropsData,
  useDrawerReturnData,
} from '../propsData/drawer'

import { colors } from '../../utils/colors'

const githubUrl = 'https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/Drawer.tsx'

export const DefaultDrawerPreview = () => {
  const [open, setOpen] = useState(false)

  const linkClass = 'block rounded-lg px-3 py-2 text-sm font-medium hover:bg-(--lithos-accent)/10 transition-colors'

  const sections = [
    {
      title: 'Main',
      links: ['Overview', 'Dashboard', 'Analytics', 'Reports'],
    },
    {
      title: 'Management',
      links: ['Users', 'Roles', 'Permissions', 'Integrations'],
    },
    {
      title: 'Preferences',
      links: ['General', 'Security', 'Notifications', 'Billing'],
    },
    {
      title: 'Help & Support',
      links: ['Documentation', 'API Reference', 'Community', 'Contact Us'],
    },
  ]

  return (
    <Drawer
      open={open}
      onOpenChange={setOpen}
      trigger={<Button onClick={() => setOpen(true)}>Open</Button>}
      aria-label="Navigation drawer"
    >
      <div className="flex h-full w-80 flex-col bg-(--lithos-surface) p-6">
        <div className="flex items-center justify-between border-b border-(--lithos-border) pb-4 shrink-0">
          <h2 className="text-lg font-semibold">Menu</h2>
          <Button variant="text" onClick={() => setOpen(false)} aria-label="Close menu">
            <IconClose aria-hidden="true" />
          </Button>
        </div>

        <nav className="flex-1 overflow-y-auto space-y-6 py-4 pr-1">
          {sections.map((section) => (
            <div key={section.title} className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-(--lithos-text)/60 px-3">
                {section.title}
              </p>
              <div className="space-y-1">
                {section.links.map((link) => (
                  <a key={link} href={`#${link.toLowerCase().replace(/\s+/g, '-')}-fake`} className={linkClass}>
                    {link}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="border-t border-(--lithos-border) pt-4 shrink-0">
          <Button className="w-full" onClick={() => setOpen(false)}>
            Logout
          </Button>
        </div>
      </div>
    </Drawer>
  )
}

const ResponsiveDrawerPreview = () => {
  const [open, setOpen] = useState(false)

  return (
    <Drawer
      open={open}
      onOpenChange={setOpen}
      mode="responsive"
      trigger={<Button onClick={() => setOpen(true)}>Edit Profile</Button>}
      aria-label="Edit Profile"
    >
      <DrawerHeader>
        <DrawerTitle>Edit Profile</DrawerTitle>
      </DrawerHeader>

      <DrawerBody>
        <p className="text-sm text-(--lithos-text)/80">
          Make changes to your profile here. Click save when you're done.
        </p>
        <div className="mt-4 space-y-3">
          <input type="text" placeholder="Username" className="w-full rounded-md border p-2 text-sm" />
          <input type="email" placeholder="Email" className="w-full rounded-md border p-2 text-sm" />
        </div>
      </DrawerBody>

      <DrawerFooter className="space-x-2">
        <Button variant="text" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button onClick={() => setOpen(false)}>Save Changes</Button>
      </DrawerFooter>
    </Drawer>
  )
}

const PlacementsDrawerPreview = () => {
  const [open, setOpen] = useState(false)
  const [placement, setPlacement] = useState<DrawerPlacement>('right')

  const positions: DrawerPlacement[] = ['left', 'right', 'top', 'bottom']
  const isVertical = placement === 'top' || placement === 'bottom'

  return (
    <>
      <div className="flex space-x-3">
        {positions.map((pos) => (
          <Button
            key={pos}
            onClick={() => {
              setPlacement(pos)
              setOpen(true)
            }}
            className="capitalize"
          >
            {pos}
          </Button>
        ))}
      </div>

      <Drawer open={open} placement={placement} onOpenChange={setOpen} aria-label="Placement example drawer">
        <div className={`flex p-6 ${isVertical ? 'w-full flex-col' : 'h-full w-80 flex-col'}`}>
          <div className="flex items-center justify-between border-b pb-4">
            <h2 className="text-lg font-semibold capitalize">{placement} Drawer</h2>
            <Button variant="text" onClick={() => setOpen(false)} aria-label="Close drawer">
              <IconClose aria-hidden="true" />
            </Button>
          </div>

          <p className="flex-1 py-4 text-sm text-(--lithos-text)/75">
            This drawer is aligned to the {placement} edge of the screen.
          </p>

          <div className="border-t pt-4">
            <Button className="w-full" onClick={() => setOpen(false)}>
              Close
            </Button>
          </div>
        </div>
      </Drawer>
    </>
  )
}

const defaultDrawerCode = {
  body: `export const DefaultDrawer = () => {
  const [open, setOpen] = useState(false)

  const linkClass = 'block rounded-lg px-3 py-2 text-sm font-medium hover:bg-(--lithos-accent)/10 transition-colors'

  const sections = [
    {
      title: 'Main',
      links: ['Overview', 'Dashboard', 'Analytics', 'Reports']
    },
    {
      title: 'Management',
      links: ['Users', 'Roles', 'Permissions', 'Integrations']
    },
    {
      title: 'Preferences',
      links: ['General', 'Security', 'Notifications', 'Billing']
    },
    {
      title: 'Help & Support',
      links: ['Documentation', 'API Reference', 'Community', 'Contact Us']
    }
  ]

  return (
    <Drawer
      open={open}
      onOpenChange={setOpen}
      trigger={<Button onClick={() => setOpen(true)}>Open Drawer</Button>}
      aria-label='Navigation drawer'
    >
      <div className='flex h-full w-80 flex-col bg-(--lithos-surface) p-6'>
        <div className='flex items-center justify-between border-b border-(--lithos-border) pb-4 shrink-0'>
          <h2 className='text-lg font-semibold'>Menu</h2>
          <Button
            variant='text'
            onClick={() => setOpen(false)}
            aria-label='Close menu'
          >
            <IconClose />
          </Button>
        </div>

        <nav className='flex-1 overflow-y-auto space-y-6 py-4 pr-1'>
          {sections.map(section => (
            <div key={section.title} className='space-y-2'>
              <p className='text-xs font-semibold uppercase tracking-wider text-(--lithos-text)/60 px-3'>
                {section.title}
              </p>
              <div className='space-y-1'>
                {section.links.map(link => (
                  <a
                    key={link}
                    href={\`#\${link.toLowerCase().replace(/\\s+/g, '-')}\`}
                    className={linkClass}
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className='border-t border-(--lithos-border) pt-4 shrink-0'>
          <Button className='w-full' onClick={() => setOpen(false)}>
            Logout
          </Button>
        </div>
      </div>
    </Drawer>
  )
}`,
  componentNames: ['Drawer', 'Button', 'useState'],
  manualPath: {
    Drawer: '../../components/ui/Drawer',
    Button: '../../components/ui/Button',
    react: 'useState',
  },
}

const responsiveDrawerCode = {
  body: `export const ResponsiveDrawer = () => {
  const [open, setOpen] = useState(false)

  return (
    <Drawer
      open={open}
      onOpenChange={setOpen}
      mode='responsive'
      trigger={<Button onClick={() => setOpen(true)}>Edit Profile</Button>}
      aria-label='Edit Profile'
    >
      <DrawerHeader>
        <DrawerTitle>Edit Profile</DrawerTitle>
      </DrawerHeader>

      <DrawerBody>
        <p className='text-sm text-(--lithos-text)/80'>
          Make changes to your profile here. Click save when you're done.
        </p>
        <div className='mt-4 space-y-3'>
          <input
            type='text'
            placeholder='Username'
            className='w-full rounded-md border p-2 text-sm'
          />
          <input
            type='email'
            placeholder='Email'
            className='w-full rounded-md border p-2 text-sm'
          />
        </div>
      </DrawerBody>

      <DrawerFooter className='space-x-2'>
        <Button variant='text' onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button onClick={() => setOpen(false)}>Save Changes</Button>
      </DrawerFooter>
    </Drawer>
  )
}`,
  componentNames: ['Drawer', 'DrawerHeader', 'DrawerTitle', 'DrawerBody', 'DrawerFooter', 'Button', 'useState'],
  manualPath: {
    Button: '../../components/ui/Button',
    react: 'useState',
    others: '../../components/ui/Drawer',
  },
}

const placementsDrawerCode = {
  body: `export const PlacementsDrawer = () => {
  const [open, setOpen] = useState(false)
  const [placement, setPlacement] = useState<DrawerPlacement>('right')

  const positions: DrawerPlacement[] = ['left', 'right', 'top', 'bottom']
  const isVertical = placement === 'top' || placement === 'bottom'

  return (
    <>
      <div className='flex space-x-3'>
        {positions.map(pos => (
          <Button
            key={pos}
            onClick={() => {
              setPlacement(pos)
              setOpen(true)
            }}
          >
            {pos}
          </Button>
        ))}
      </div>

      <Drawer
        open={open}
        placement={placement}
        onOpenChange={setOpen}
        aria-label='Placement example drawer'
      >
        <div className={\`flex bg-(--lithos-surface) p-6 \${isVertical ? 'w-full flex-col' : 'h-full w-80 flex-col'}\`}>
          <div className='flex items-center justify-between border-b pb-4'>
            <h2 className='text-lg font-semibold capitalize'>
              {placement} Drawer
            </h2>
            <Button
              variant='text'
              onClick={() => setOpen(false)}
              aria-label='Close drawer'
            >
              <IconClose aria-hidden='true' />
            </Button>
          </div>

          <p className='flex-1 py-4 text-sm text-(--lithos-text)/75'>
            This drawer is aligned to the {placement} edge of the screen.
          </p>

          <div className='border-t pt-4'>
            <Button className='w-full' onClick={() => setOpen(false)}>
              Close
            </Button>
          </div>
        </div>
      </Drawer>
    </>
  )
}`,
  componentNames: ['Drawer', 'Button', 'useState', 'DrawerPlacement'],
  manualPath: {
    Button: '../../components/ui/Button',
    type: 'DrawerPlacement',
    react: 'useState',
    others: '../../components/ui/Drawer',
  },
}

export const DrawerDoc = () => {
  return (
    <div className="max-w-5xl mx-auto px-6">
      <header className="mt-0">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none text-(--lithos-text) mb-8">
          Drawer
        </h1>
        <p className="mt-2 text-lg md:text-xl font-display opacity-70 text-(--lithos-text)">
          A flexible sliding panel primitive that supports temporary overlays, touch gestures, responsive viewport
          adaptation, and customizable transitions.
        </p>
        <hr className="border-t-2 border-(--lithos-border) mt-8 mb-8" />
      </header>

      <section className="mb-12">
        <p className="mb-8 text-lg md:text-xl text-(--lithos-text) max-w-3xl font-body">
          The Drawer component provides an accessible, slide-out surface for navigation, forms, and supplemental
          content. It seamlessly adapts across mobile and desktop viewports while handling touch interactions cleanly.
        </p>
      </section>

      <div className="border-l-4 border-(--lithos-accent) pl-6 py-2 mb-8 bg-(--lithos-surface) p-4">
        <p className="text-sm font-bold font-body opacity-80 text-(--lithos-text)">
          Drawers automatically handle touch swipe gestures, body scroll locking, and focus traps when active, ensuring
          a native-feeling overlay experience across devices.
        </p>
      </div>

      <h2 id="installation" className="mt-12 mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
        Installation
      </h2>

      <SetupGuide
        componentNames={['Drawer', 'useDrawer']}
        manualPath="../../components/ui/Drawer"
        requires={[
          'utils/cn.ts',
          'components/ui/drawer/Drawer.tsx',
          'components/ui/drawer/DrawerIndicator.tsx',
          'components/ui/drawer/DrawerHeader.tsx',
          'components/ui/drawer/DrawerBody.tsx',
          'components/ui/drawer/DrawerFooter.tsx',
          'components/ui/drawer/DrawerTitle.tsx',
          'components/ui/Dialog.tsx',
          'components/ui/drawer/drawer.utils.ts',
          'components/ui/drawer/useDrawer.ts',
          'components/ui/drawer/useDrawerSwipe.ts',
          'components/ui/Popover.ts',
          '@floating-ui/react',
          'core/hooks/useMediaQuery.ts',
        ]}
      />

      <h2 id="examples" className="mt-12 mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
        Examples
      </h2>

      <h3 id="scrollable-content" className="mb-4 text-xl font-black tracking-tight text-(--lithos-text)">
        Scrollable content
      </h3>
      <p className="mb-4 text-base text-(--lithos-text) max-w-3xl font-body opacity-80">
        Renders as a temporary overlay panel with a semi-transparent backdrop. It traps focus, prevents body scrolling
        while open, and allows vertical scrolling inside <code>DrawerBody</code> when content exceeds the viewport
        height.
      </p>

      <div className="mt-8 mb-16">
        <PreviewBlock code={defaultDrawerCode} githubUrl={githubUrl}>
          <DefaultDrawerPreview />
        </PreviewBlock>
      </div>

      <h3 id="positions" className="mb-4 text-xl font-black tracking-tight text-(--lithos-text)">
        Positions
      </h3>
      <p className="mb-4 text-base text-(--lithos-text) max-w-3xl font-body opacity-80">
        Drawers can slide out from any edge of the screen using the <code>placement</code> prop (<code>left</code>,{' '}
        <code>right</code>, <code>top</code>, or <code>bottom</code>). Radius curvature automatically adapts to flush
        edges seamlessly.
      </p>

      <div className="mt-8 mb-16">
        <PreviewBlock code={placementsDrawerCode} githubUrl={githubUrl}>
          <PlacementsDrawerPreview />
        </PreviewBlock>
      </div>

      <h3 id="responsive" className="mb-4 text-xl font-black tracking-tight text-(--lithos-text)">
        Responsive
      </h3>
      <p className="mb-4 text-base text-(--lithos-text) max-w-3xl font-body opacity-80">
        When configured with <code>mode="responsive"</code>, the panel renders as a bottom or side Drawer on mobile
        viewports and automatically transitions into a centered Dialog modal on desktop screens.
      </p>

      <div className="border-l-4 pl-6 py-2 mb-8 bg-(--lithos-surface) p-4" style={{ borderColor: colors.info }}>
        <p className="text-sm font-bold font-body text-(--lithos-text)">Responsive Subcomponents Note</p>
        <p className="text-sm font-medium font-body opacity-80 mt-2 text-(--lithos-text)">
          Always use the <code>DrawerHeader</code>, <code>DrawerTitle</code>, <code>DrawerBody</code>, and{' '}
          <code>DrawerFooter</code> family inside your drawer composition. When <code>mode="responsive"</code> activates
          desktop viewports, these subcomponents automatically proxy and render their corresponding <code>Dialog</code>{' '}
          counterparts under the hood for clean layout continuity.
        </p>
      </div>

      <div className="mt-8 mb-16">
        <PreviewBlock code={responsiveDrawerCode} githubUrl={githubUrl}>
          <ResponsiveDrawerPreview />
        </PreviewBlock>
      </div>

      <section className="my-12">
        <h2 id="anatomy" className="mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
          Anatomy
        </h2>
        <p className="mb-4 text-base text-(--lithos-text) max-w-3xl font-body opacity-80">
          Import and compose the components to build flexible slide-out panels:
        </p>

        <CodeViewer
          language="tsx"
          code={`<Drawer>
  <DrawerHeader>
    <DrawerTitle></DrawerTitle>
  </DrawerHeader>

  <DrawerBody></DrawerBody>

  <DrawerFooter></DrawerFooter>
</Drawer>`}
        />
      </section>

      <section className="mb-12">
        <h2 id="accessibility" className="mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
          Accessibility
        </h2>
        <ul className="list-disc pl-6 text-lg font-body text-(--lithos-text) space-y-2">
          <li>
            Applies <code>role="dialog"</code> along with <code>aria-modal="true"</code>.
          </li>
          <li>
            Requires an accessible name via either <code>aria-label</code> or <code>aria-labelledby</code>.
          </li>
          <li>
            Automatically links <code>DrawerTitle</code> to the root container's <code>aria-labelledby</code> attribute
            using context IDs.
          </li>
          <li>
            Restricts keyboard interaction using a focus trap to prevent users from navigating off-screen elements while
            open.
          </li>
          <li>Restores focus to the trigger element when dismissed.</li>
          <li>
            Supports keyboard dismissal via the <kbd>Escape</kbd> key.
          </li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 id="api" className="mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
          API Reference
        </h2>
        <div className="mb-6 p-4 border-l-4 border-(--lithos-accent) bg-(--lithos-surface) text-sm font-body text-(--lithos-text)">
          <strong>Note:</strong> Rounded corners defined by the global <code>--lithos-radius</code> token are
          selectively applied exclusively to the unattached outer edges of the Drawer panel depending on its current{' '}
          <code>placement</code> (for instance, top-right and bottom-right corners when anchored to <code>left</code>).
          The edges flush against the screen viewport remain unrounded for a clean layout boundary.
        </div>

        <PropsAccordion title="Drawer Props" data={drawerPropsData} />
        <PropsAccordion title="DrawerHeader Props" data={drawerHeaderPropsData} />
        <PropsAccordion title="DrawerTitle Props" data={drawerTitlePropsData} />
        <PropsAccordion title="DrawerBody Props" data={drawerBodyPropsData} />
        <PropsAccordion title="DrawerFooter Props" data={drawerFooterPropsData} />
        <PropsAccordion title="useDrawer return" data={useDrawerReturnData} isHook />
      </section>
    </div>
  )
}
