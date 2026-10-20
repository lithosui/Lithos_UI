import { PreviewBlock } from '../../components/ui/PreviewBlock'
import { CodeViewer } from '../../components/ui/CodeViewer'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/Tabs'
import { PropsAccordion } from '../../components/ui/PropsTable'
import { tabsPropsData, tabsTriggerPropsData, tabsContentPropsData } from '../propsData/tabs'
import { SetupGuide } from '../layout/SetupGuide'

const githubUrl = 'https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/Tabs.tsx'

export const TabsDoc = () => {
  const defaultCode = {
    body: `export const DefaultTabs = () => {
  return (
    <Tabs defaultValue="account">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <p className="text-sm font-bold">Account Settings</p>
        <p className="text-sm mt-2 opacity-80">Make changes to your account here.</p>
      </TabsContent>
      <TabsContent value="password">
        <p className="text-sm font-bold">Password Settings</p>
        <p className="text-sm mt-2 opacity-80">Change your password here.</p>
      </TabsContent>
    </Tabs>
  )
}`,
    componentNames: ['Tabs', 'TabsList', 'TabsTrigger', 'TabsContent'],
    manualPath: { Tabs: '../../components/ui/Tabs' },
  }

  const underlineCode = {
    body: `export const UnderlineTabs = () => {
  return (
    <Tabs defaultValue="account" variant="underline">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <p className="text-sm font-bold">Account Settings</p>
        <p className="text-sm mt-2 opacity-80">Make changes to your account here.</p>
      </TabsContent>
      <TabsContent value="password">
        <p className="text-sm font-bold">Password Settings</p>
        <p className="text-sm mt-2 opacity-80">Change your password here.</p>
      </TabsContent>
    </Tabs>
  )
}`,
    componentNames: ['Tabs', 'TabsList', 'TabsTrigger', 'TabsContent'],
    manualPath: { Tabs: '../../components/ui/Tabs' },
  }

  const verticalCode = {
    body: `export const VerticalTabs = () => {
  return (
    <Tabs defaultValue="account" variant="vertical">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <p className="text-sm font-bold">Account Settings</p>
        <p className="text-sm mt-2 opacity-80">Make changes to your account here.</p>
      </TabsContent>
      <TabsContent value="password">
        <p className="text-sm font-bold">Password Settings</p>
        <p className="text-sm mt-2 opacity-80">Change your password here.</p>
      </TabsContent>
    </Tabs>
  )
}`,
    componentNames: ['Tabs', 'TabsList', 'TabsTrigger', 'TabsContent'],
    manualPath: { Tabs: '../../components/ui/Tabs' },
  }

  return (
    <div className="max-w-5xl mx-auto px-6">
      <header className="mt-0">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none text-(--lithos-text) mb-8">Tabs</h1>
        <p className="mt-2 text-lg md:text-xl font-display opacity-70 text-(--lithos-text)">
          A set of layered sections of content—known as tab panels—that are displayed one at a time.
        </p>
        <hr className="border-t-2 border-(--lithos-border) mt-8 mb-8" />
      </header>

      <section className="mb-12">
        <p className="mb-8 text-lg md:text-xl text-(--lithos-text) max-w-3xl font-body">
          The Tabs component is perfect for settings pages, dashboards, or any interface where you want to toggle
          between different views without navigating to a new page. It features a Neo-brutalist design aesthetic.
        </p>
      </section>

      <h2 id="installation" className="mt-12 mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
        Installation
      </h2>

      <SetupGuide
        slug="tabs"
        componentNames={['Tabs', 'TabsList', 'TabsTrigger', 'TabsContent']}
        manualPath="../../components/ui/Tabs"
        requires={['utils/cn.ts']}
      />

      <h2 id="examples" className="mt-12 mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
        Examples
      </h2>

      <h3 id="default" className="mb-4 text-xl font-black tracking-tight text-(--lithos-text)">
        Default
      </h3>
      <p className="text-base text-(--lithos-text) max-w-3xl font-body mb-4 opacity-80">
        The default tab structure with a provided <code>defaultValue</code>.
      </p>

      <div className="mt-8 mb-16">
        <PreviewBlock code={defaultCode} githubUrl={githubUrl}>
          <div className="flex flex-col w-full max-w-md mx-auto">
            <Tabs defaultValue="account">
              <TabsList>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
              </TabsList>
              <TabsContent value="account">
                <p className="text-sm font-bold">Account Settings</p>
                <p className="text-sm mt-2 opacity-80">Make changes to your account here.</p>
              </TabsContent>
              <TabsContent value="password">
                <p className="text-sm font-bold">Password Settings</p>
                <p className="text-sm mt-2 opacity-80">Change your password here.</p>
              </TabsContent>
            </Tabs>
          </div>
        </PreviewBlock>
      </div>

      <h3 id="underline" className="mb-4 text-xl font-black tracking-tight text-(--lithos-text)">
        Underline
      </h3>
      <p className="text-base text-(--lithos-text) max-w-3xl font-body mb-4 opacity-80">
        A cleaner variant with a thick bottom border, ideal for subtle page navigation while retaining the brutalist
        aesthetic.
      </p>

      <div className="mt-8 mb-16">
        <PreviewBlock code={underlineCode} githubUrl={githubUrl}>
          <div className="flex flex-col w-full max-w-md mx-auto">
            <Tabs defaultValue="account" variant="underline">
              <TabsList>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
              </TabsList>
              <TabsContent value="account">
                <p className="text-sm font-bold">Account Settings</p>
                <p className="text-sm mt-2 opacity-80">Make changes to your account here.</p>
              </TabsContent>
              <TabsContent value="password">
                <p className="text-sm font-bold">Password Settings</p>
                <p className="text-sm mt-2 opacity-80">Change your password here.</p>
              </TabsContent>
            </Tabs>
          </div>
        </PreviewBlock>
      </div>

      <h3 id="vertical" className="mb-4 text-xl font-black tracking-tight text-(--lithos-text)">
        Vertical
      </h3>
      <p className="text-base text-(--lithos-text) max-w-3xl font-body mb-4 opacity-80">
        A vertical variant where the tabs are stacked to the side of the content.
      </p>

      <div className="mt-8 mb-16">
        <PreviewBlock code={verticalCode} githubUrl={githubUrl}>
          <div className="flex w-full max-w-2xl mx-auto">
            <Tabs defaultValue="account" variant="vertical">
              <TabsList>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
              </TabsList>
              <TabsContent value="account">
                <p className="text-sm font-bold">Account Settings</p>
                <p className="text-sm mt-2 opacity-80">Make changes to your account here.</p>
              </TabsContent>
              <TabsContent value="password">
                <p className="text-sm font-bold">Password Settings</p>
                <p className="text-sm mt-2 opacity-80">Change your password here.</p>
              </TabsContent>
            </Tabs>
          </div>
        </PreviewBlock>
      </div>

      <h2 id="anatomy" className="mt-12 mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
        Anatomy
      </h2>
      <div className="mb-12">
        <CodeViewer
          language="tsx"
          code={`<Tabs>
  <TabsList>
    <TabsTrigger />
  </TabsList>
  <TabsContent />
</Tabs>`}
        />
      </div>

      <section className="mb-12">
        <h2 id="accessibility" className="mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
          Accessibility
        </h2>
        <ul className="list-disc pl-6 text-lg font-body text-(--lithos-text)">
          <li>
            Uses standard WAI-ARIA roles (<code>tablist</code>, <code>tab</code>, and <code>tabpanel</code>).
          </li>
          <li>
            <code>TabsTrigger</code> uses native <code>&lt;button&gt;</code> elements and automatically manages the{' '}
            <code>aria-selected</code> state.
          </li>
          <li>Keyboard navigation is inherently supported through native button focus management.</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 id="api" className="mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
          API Reference
        </h2>
        <PropsAccordion title="Tabs Props" data={tabsPropsData} />
        <PropsAccordion title="TabsTrigger Props" data={tabsTriggerPropsData} />
        <PropsAccordion title="TabsContent Props" data={tabsContentPropsData} />
      </section>
    </div>
  )
}
