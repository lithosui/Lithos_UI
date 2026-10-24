import { PreviewBlock } from '../../components/ui/PreviewBlock'
import { SetupGuide } from '../layout/SetupGuide'
import { PropsAccordion } from '../../components/ui/PropsTable'
import { CodeViewer } from '../../components/ui/CodeViewer'
import { Button } from '../../components/ui/Button'
import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownGroup,
  DropdownItem,
  DropdownSeparator,
  DropdownSub,
} from '../../components/ui/Dropdown'

import {
  dropdownPropsData,
  dropdownTriggerPropsData,
  dropdownContentPropsData,
  dropdownItemPropsData,
  dropdownSubPropsData,
  dropdownGroupPropsData,
  dropdownSeparatorPropsData,
  useDropdownPropsData,
} from '../propsData/dropdown'

const githubUrl = 'https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/Dropdown.tsx'

const ProfileDropdownDemo = () => {
  return (
    <div className="flex items-center justify-center p-12">
      <Dropdown>
        <DropdownTrigger asChild>
          <Button variant="accent">My account</Button>
        </DropdownTrigger>

        <DropdownContent className="w-56">
          <DropdownGroup label="Settings">
            <DropdownItem onClick={() => console.log('Go to profile')}>Profile</DropdownItem>

            <DropdownItem onClick={() => console.log('Go to plan')}>Plan</DropdownItem>

            <DropdownItem disabled className="flex flex-col items-start space-y-2">
              <span>Integrations</span>
              <span className="opacity-60">(Coming soon)</span>
            </DropdownItem>
          </DropdownGroup>

          <DropdownSeparator />

          <DropdownSub
            trigger={
              <span className="flex items-center justify-between w-full">
                Preferences <span>▶</span>
              </span>
            }
          >
            <DropdownItem>Toggle Theme</DropdownItem>
            <DropdownItem>Language</DropdownItem>
          </DropdownSub>

          <DropdownSeparator />

          <DropdownGroup>
            <DropdownItem
              onClick={() => console.log('Log out')}
              className="text-red-500 hover:bg-red-500/5 focus:bg-red-500/5"
            >
              Log out
            </DropdownItem>
          </DropdownGroup>
        </DropdownContent>
      </Dropdown>
    </div>
  )
}

export const DropdownDoc = () => {
  const usageCode = {
    body: `export const ProfileDropdown = () => {
  return (
    <Dropdown placement='bottom-start'>
      <DropdownTrigger asChild>
        <Button variant='accent'>My account</Button>
      </DropdownTrigger>

      <DropdownContent className='w-56 p-1'>
        <DropdownGroup label='Settings'>
          <DropdownItem onClick={() => console.log('Profile')}>
            Profile
          </DropdownItem>
          <DropdownItem onClick={() => console.log('Plan')}>
            Plan
          </DropdownItem>
        </DropdownGroup>

        <DropdownSeparator />

        <DropdownSub trigger={<span className='flex items-center justify-between w-full'>Preferences <span>▶</span></span>}>
          <DropdownItem>Toggle Theme</DropdownItem>
          <DropdownItem>Language</DropdownItem>
        </DropdownSub>

        <DropdownSeparator />

        <DropdownItem onClick={() => console.log('Log out')} className='text-red-500 hover:bg-red-500/5 focus:bg-red-500/5'>
          Log out
        </DropdownItem>
      </DropdownContent>
    </Dropdown>
  )
}`,
    componentNames: [
      'Dropdown',
      'DropdownTrigger',
      'DropdownContent',
      'DropdownGroup',
      'DropdownItem',
      'DropdownSeparator',
      'DropdownSub',
      'DropdownClose',
      'Button',
    ],
    manualPath: {
      Button: '../../components/ui/Button',
      others: '../../components/ui/Dropdown',
    },
  }

  return (
    <div className="max-w-5xl mx-auto px-6">
      <header className="mt-0">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none text-(--lithos-text) mb-8">
          Dropdown
        </h1>
        <p className="mt-2 text-lg md:text-xl font-display opacity-70 text-(--lithos-text)">
          Displays a menu to the user-such as a set of actions or functions-triggered by a button.
        </p>
        <hr className="border-t-2 border-(--lithos-border) mt-8 mb-8" />
      </header>

      <section className="mb-12">
        <p className="mb-8 text-lg md:text-xl text-(--lithos-text) max-w-3xl font-body">
          The Dropdown component allows you to present a list of contextual actions, groups, and submenus without
          altering the state or label of the trigger element. Built on top of Floating UI, it provides robust
          positioning, focus management, and accessibility features.
        </p>
      </section>

      <div className="border-l-4 border-(--lithos-accent) pl-6 py-2 mb-8 bg-(--lithos-surface) p-4">
        <p className="text-sm font-bold font-body opacity-80 text-(--lithos-text)">
          Click the trigger button below to open the menu and test navigation, subgroups, and submenus.
        </p>
      </div>

      <h2 id="installation" className="mt-12 mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
        Installation
      </h2>

      <SetupGuide
        slug="dropdown"
        componentNames={[
          'Dropdown',
          'DropdownContent',
          'DropdownItem',
          'DropdownGroup',
          'DropdownSeparator',
          'DropdownTrigger',
          'DropdownSub',
          'useDropdown',
        ]}
        manualPath={{
          others: '../../components/ui/Dropdown',
        }}
        requires={[
          'utils/cn.ts',
          'components/ui/Button.tsx',
          'components/ui/dropdown/Dropdown.tsx',
          'components/ui/dropdown/DropdownContent.tsx',
          'components/ui/dropdown/DropdownItem.tsx',
          'components/ui/dropdown/DropdownGroup.tsx',
          'components/ui/dropdown/DropdownSeparator.tsx',
          'components/ui/dropdown/DropdownTrigger.tsx',
          'components/ui/dropdown/DropdownSub.tsx',
          'components/ui/dropdown/useDropdown.ts',
          'components/ui/dropdown/DropdownNavigationContext.ts',
        ]}
      />

      <h2 id="examples" className="mt-12 mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
        Examples
      </h2>

      <h3 id="default" className="mb-4 text-xl font-black tracking-tight text-(--lithos-text)">
        Default
      </h3>
      <p className="mb-4 text-base text-(--lithos-text) max-w-3xl font-body opacity-80">
        Use a Dropdown when you need to group related actions (like account settings, navigation options, or
        administrative triggers) into a compact popover overlay. Items automatically close the dropdown upon selection
        unless explicitly configured otherwise.
      </p>

      <PreviewBlock code={usageCode} githubUrl={githubUrl}>
        <ProfileDropdownDemo />
      </PreviewBlock>

      <h2 id="anatomy" className="mt-12 mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
        Anatomy
      </h2>
      <div className="mb-12">
        <p className="mb-4 text-lg md:text-xl text-(--lithos-text) max-w-3xl font-body">
          Assemble the menu by composing subcomponents inside the root <code>Dropdown</code> provider:
        </p>
        <CodeViewer
          language="tsx"
          code={`<Dropdown>
  <DropdownTrigger></DropdownTrigger>

  <DropdownContent>

    <DropdownGroup>
      <DropdownItem></DropdownItem>
      <DropdownItem></DropdownItem>
    </DropdownGroup>

    <DropdownSeparator />

    <DropdownSub>
      <DropdownItem></DropdownItem>
    </DropdownSub>

  </DropdownContent>
</Dropdown>`}
        />
      </div>

      <section className="mb-12">
        <h2 id="accessibility" className="mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
          Accessibility
        </h2>
        <ul className="list-disc pl-6 text-lg font-body text-(--lithos-text) space-y-2">
          <li>
            Uses <code>role="menu"</code> on the floating content container and <code>role="menuitem"</code> on
            interactive options.
          </li>
          <li>
            Manages <code>aria-haspopup="menu"</code> and <code>aria-expanded</code> attributes dynamically on the
            trigger element.
          </li>
          <li>
            Supports keyboard dismissal via the <kbd>Escape</kbd> key and closes automatically when clicking outside or
            interacting with non-disabled items.
          </li>
          <li>
            Submenus expose <code>aria-haspopup="menu"</code> on their trigger items and support safe hover interactions
            through polygon pointer detection.
          </li>
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
        <PropsAccordion title="Dropdown Props" data={dropdownPropsData} />
        <PropsAccordion title="DropdownTrigger Props" data={dropdownTriggerPropsData} />
        <PropsAccordion title="DropdownContent Props" data={dropdownContentPropsData} />
        <PropsAccordion title="DropdownItem Props" data={dropdownItemPropsData} />
        <PropsAccordion title="DropdownSub Props" data={dropdownSubPropsData} />
        <PropsAccordion title="DropdownGroup Props" data={dropdownGroupPropsData} />
        <PropsAccordion title="DropdownSeparator Props" data={dropdownSeparatorPropsData} />
        <PropsAccordion title="useDropdown Return" data={useDropdownPropsData} isHook />
      </section>
    </div>
  )
}
