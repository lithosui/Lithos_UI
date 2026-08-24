import { PreviewBlock } from '../../components/ui/PreviewBlock'
import { CodeViewer } from '../../components/ui/CodeViewer'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/Tabs'
import { PropsAccordion } from '../../components/ui/PropsTable'
import { SetupGuide } from '../layout/SetupGuide'
import { tabsPropsData } from '../propsData/tabs'

const githubUrl = 'https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/Tabs.tsx'

export const TabsDoc = () => {
  const usageCode = {
    body: `export const SettingsTabs = () => {
  return (
    <Tabs defaultValue="account">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <p>Make changes to your account here.</p>
      </TabsContent>
      <TabsContent value="password">
        <p>Change your password here.</p>
      </TabsContent>
      <TabsContent value="settings">
        <p>Manage your notification settings.</p>
      </TabsContent>
    </Tabs>
  )
}`,
    componentNames: ['Tabs', 'TabsList', 'TabsTrigger', 'TabsContent'],
    manualPath: '../../components/ui/Tabs',
  }

  const pillCode = {
    body: `export const FilledTabs = () => {
  return (
    <Tabs defaultValue="account" variant="filled">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <p>Make changes to your account here.</p>
      </TabsContent>
      <TabsContent value="password">
        <p>Change your password here.</p>
      </TabsContent>
    </Tabs>
  )
}`,
    componentNames: ['Tabs', 'TabsList', 'TabsTrigger', 'TabsContent'],
    manualPath: '../../components/ui/Tabs',
  }

  const underlineCode = {
    body: `export const TextTabs = () => {
  return (
    <Tabs defaultValue="account" variant="text">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <p>Make changes to your account here.</p>
      </TabsContent>
      <TabsContent value="password">
        <p>Change your password here.</p>
      </TabsContent>
    </Tabs>
  )
}`,
    componentNames: ['Tabs', 'TabsList', 'TabsTrigger', 'TabsContent'],
    manualPath: '../../components/ui/Tabs',
  }

  return (
    <div className="max-w-5xl mx-auto px-6">
      <header className="mt-0">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none text-(--lithos-text) mb-8">
          Tabs
        </h1>
        <p className="mt-2 text-lg md:text-xl font-display opacity-70 text-(--lithos-text)">
          A set of layered sections of content—known as tab panels—that are displayed one at a time.
        </p>
        <hr className="border-t-2 border-(--lithos-border) mt-8 mb-8" />
      </header>

      <section className="mb-12">
        <p className="mb-8 text-lg md:text-xl text-(--lithos-text) max-w-3xl font-body">
          The Tabs component is built using a compound component architecture. It strictly follows the Lithos UI physics engine by enforcing hard borders and solid drop shadows.
        </p>
      </section>

      <h2 id="installation" className="mt-12 mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
        Installation
      </h2>

      <SetupGuide
        componentNames={['Tabs', 'TabsList', 'TabsTrigger', 'TabsContent']}
        manualPath="../../components/ui/Tabs"
        requires={['utils/cn.ts']}
      />

      <h2 id="anatomy" className="mt-12 mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
        Anatomy
      </h2>
      <div className="mb-12">
        <CodeViewer
          language="tsx"
          code={`<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>`}
        />
      </div>

      <h2 id="examples" className="mt-12 mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
        Examples
      </h2>

      <h3 id="default" className="mb-4 text-xl font-black tracking-tight text-(--lithos-text)">
        Default
      </h3>

      <div className="mt-8 mb-16">
        <PreviewBlock code={usageCode} githubUrl={githubUrl}>
          <div className="w-full max-w-md">
            <Tabs defaultValue="account">
              <TabsList>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="account">
                <p>Make changes to your account here.</p>
              </TabsContent>
              <TabsContent value="password">
                <p>Change your password here.</p>
              </TabsContent>
              <TabsContent value="settings">
                <p>Manage your notification settings.</p>
              </TabsContent>
            </Tabs>
          </div>
        </PreviewBlock>
      </div>

      <h3 id="filled" className="mb-4 text-xl font-black tracking-tight text-(--lithos-text)">
        Filled Variant
      </h3>

      <div className="mt-8 mb-16">
        <PreviewBlock code={pillCode} githubUrl={githubUrl}>
          <div className="w-full max-w-md">
            <Tabs defaultValue="account" variant="filled">
              <TabsList>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
              </TabsList>
              <TabsContent value="account">
                <p>Make changes to your account here.</p>
              </TabsContent>
              <TabsContent value="password">
                <p>Change your password here.</p>
              </TabsContent>
            </Tabs>
          </div>
        </PreviewBlock>
      </div>

      <h3 id="text" className="mb-4 text-xl font-black tracking-tight text-(--lithos-text)">
        Text Variant
      </h3>

      <div className="mt-8 mb-16">
        <PreviewBlock code={underlineCode} githubUrl={githubUrl}>
          <div className="w-full max-w-md">
            <Tabs defaultValue="account" variant="text">
              <TabsList>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
              </TabsList>
              <TabsContent value="account">
                <p>Make changes to your account here.</p>
              </TabsContent>
              <TabsContent value="password">
                <p>Change your password here.</p>
              </TabsContent>
            </Tabs>
          </div>
        </PreviewBlock>
      </div>

      <section className="mb-12">
        <h2 id="accessibility" className="mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
          Accessibility
        </h2>
        <ul className="list-disc pl-6 text-lg font-body text-(--lithos-text)">
          <li>
            Uses <code>role="tablist"</code>, <code>role="tab"</code>, and <code>role="tabpanel"</code> for correct screen reader semantics.
          </li>
          <li>
            Maintains proper <code>aria-selected</code> states dynamically.
          </li>
          <li>
            Keyboard accessible (users can tab and hit enter to toggle content).
          </li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 id="api" className="mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
          API Reference
        </h2>
        <PropsAccordion title="Tabs Props" data={tabsPropsData} />
      </section>
    </div>
  )
}
