import { PreviewBlock } from '../../components/ui/PreviewBlock'
import { CodeViewer } from '../../components/ui/CodeViewer'
import { SetupGuide } from '../layout/SetupGuide'
import { PropsAccordion } from '../../components/ui/PropsTable'

import { removeImports } from '../examples/removeImports'
import { ExamplePermanent } from '../examples/sidebar/permanent'
import { ExampleMini } from '../examples/sidebar/mini'
import { ExampleRightMini } from '../examples/sidebar/miniRight'

import examplePermanentSource from '../examples/sidebar/permanent?raw'
import exampleMiniSource from '../examples/sidebar/mini?raw'
import exampleRightMiniSource from '../examples/sidebar/miniRight?raw'

import {
  DocHeader,
  DocCallout,
  DocHeading,
  DocExample,
  DocLeadText,
  DocList,
  DocSection,
  Code,
} from '../layout/DocPage'

import {
  useSidebarReturnPropsData,
  sidebarItemPropsData,
  sidebarTriggerPropsData,
  sidebarContentPropsData,
  sidebarHeaderPropsData,
  sidebarTitlePropsData,
  sidebarPropsData,
} from '../propsData/sidebar'

const githubUrl = 'https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/sidebar/Sidebar.tsx'
const sidebarPath = '../../components/ui/Sidebar'

const componentNames = [
  'Sidebar',
  'SidebarContent',
  'SidebarItem',
  'SidebarHeader',
  'SidebarTitle',
  'useState',
  'IconFolder',
  'IconHome',
  'IconSettings',
]

const manualPath = {
  react: ['useState'],
  IconHome: '../../components/ui/icons/IconHome',
  IconFolder: '../../components/ui/icons/IconFolder',
  IconSettings: '../../components/ui/icons/IconSettings',
  others: sidebarPath,
}

const usagePermanent = {
  body: removeImports(examplePermanentSource),
  componentNames,
  manualPath,
}

const usageMini = {
  body: removeImports(exampleMiniSource),
  componentNames: [...componentNames, 'SidebarTrigger'],
  manualPath,
}

const usageRightMini = {
  body: removeImports(exampleRightMiniSource),
  componentNames: [...componentNames, 'SidebarTrigger'],
  manualPath,
}

export const SidebarDoc = () => (
  <div className="max-w-5xl mx-auto px-6">
    <DocHeader
      title="Sidebar"
      description="A flexible navigation panel supporting permanent and collapsible mini modes with neo-brutalist styling."
    />

    <DocSection>
      <DocLeadText>
        The Sidebar component structures application layouts by grouping navigation links and controls. It supports a
        static permanent layout as well as a collapsible mini mode for space-constrained interfaces.
      </DocLeadText>
    </DocSection>

    <DocSection>
      <DocHeading id="installation">Installation</DocHeading>
      <SetupGuide
        slug="sidebar"
        componentNames={['Sidebar', 'SidebarContent', 'SidebarTrigger', 'SidebarItem', 'useSidebar']}
        manualPath={manualPath}
        requires={[
          'utils/cn.ts',
          'components/ui/Button',
          'components/ui/Typography',
          'components/ui/Tooltip',
          'components/ui/icons/IconChevronLeft',
          'components/ui/icons/IconSidebar',
          'core/types.ts',
          'core/hooks/useResizer.ts',
        ]}
      />
    </DocSection>

    <DocHeading id="examples">Examples</DocHeading>

    <DocExample
      id="permanent"
      title="Permanent"
      description={
        <>
          The default mode. The sidebar remains strictly visible at its full expanded width. Recommended for large
          desktop screens where navigation space is plentiful.
        </>
      }
    >
      <PreviewBlock code={usagePermanent} githubUrl={githubUrl} className="overflow-x-auto">
        <ExamplePermanent />
      </PreviewBlock>
    </DocExample>

    <DocExample
      id="mini"
      title="Mini"
      description={
        <>
          Allows toggling between an expanded state and a compact icon-only view using the <code>SidebarTrigger</code>{' '}
          component.
        </>
      }
    >
      <PreviewBlock code={usageMini} githubUrl={githubUrl}>
        <ExampleMini />
      </PreviewBlock>
    </DocExample>

    <h3 id="right-placement" className="mb-4 text-xl font-black tracking-tight text-(--lithos-text)">
      Right placement
    </h3>
    <p className="text-base text-(--lithos-text) max-w-3xl font-body mb-4 opacity-80">
      Positions the sidebar on the right side of the layout using the <code>placement="right"</code> prop. It
      automatically adjusts internal element alignment, reverses icon directions, and aligns tooltips to keep the UI
      intuitive.
    </p>

    <div className="mt-8 mb-16">
      <PreviewBlock code={usageRightMini} githubUrl={githubUrl}>
        <ExampleRightMini />
      </PreviewBlock>
    </div>

    <DocSection>
      <DocHeading id="anatomy">Anatomy</DocHeading>
      <CodeViewer
        language="tsx"
        code={`<Sidebar>
  <SidebarContent>

    <SidebarHeader>
      <SidebarTitle></SidebarTitle>
      <SidebarTrigger />
    </SidebarHeader>

    <SidebarItem></SidebarItem>
  </SidebarContent>
</Sidebar>`}
      />
    </DocSection>

    <DocSection>
      <DocHeading id="accessibility">Accessibility</DocHeading>
      <DocList>
        <li>
          Supports semantic HTML landmark roles (<code>aside</code>, <code>nav</code>, <code>section</code>) via the{' '}
          <Code text="role" /> prop.
        </li>
        <li>
          <Code text="SidebarItem" /> leverages the native <Code text="Button" /> primitive to maintain keyboard focus
          indicators and click handling.
        </li>
        <li>
          Labels are displayed as <Code text="Tooltip" />s in the <Code text="SidebarItem" />s when the{' '}
          <Code text="Sidebar" /> is closed.
        </li>
      </DocList>
    </DocSection>

    <DocSection>
      <DocHeading id="api">API Reference</DocHeading>
      <DocCallout>
        <strong>Note:</strong> Border styles and theme colors are powered globally via <code>--lithos-border</code> and{' '}
        <code>--lithos-surface</code> CSS variables. Override container layouts via <Code text="className" />.
      </DocCallout>

      <PropsAccordion title="Sidebar Props" data={sidebarPropsData} />
      <PropsAccordion title="SidebarContent Props" data={sidebarContentPropsData} />
      <PropsAccordion title="SidebarTrigger Props" data={sidebarTriggerPropsData} />
      <PropsAccordion title="SidebarItem Props" data={sidebarItemPropsData} />
      <PropsAccordion title="SidebarHeader Props" data={sidebarHeaderPropsData} />
      <PropsAccordion title="SidebarTitle Props" data={sidebarTitlePropsData} />
      <PropsAccordion title="useSidebar return" data={useSidebarReturnPropsData} isHook />
    </DocSection>
  </div>
)
