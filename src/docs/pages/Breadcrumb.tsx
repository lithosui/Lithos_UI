import { PreviewBlock } from '../../components/ui/PreviewBlock'
import { CodeViewer } from '../../components/ui/CodeViewer'
import { Breadcrumb } from '../../components/ui/Breadcrumb'
import { IconFolder } from '../../components/ui/icons/IconFolder'
import { IconSettings } from '../../components/ui/icons/IconSettings'
import { IconFileText } from '../../components/ui/icons/IconFileText'
import { SetupGuide } from '../layout/SetupGuide'
import { PropsAccordion } from '../../components/ui/PropsTable'
import { breadcrumbPropsData, breadcrumbItemDataPropsData } from '../propsData/breadcrumb'

const githubUrl = 'https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/Breadcrumb.tsx'

export const BreadcrumbDoc = () => {
  const collapsibleCode = {
    body: `
export const CollapsibleBreadcrumb = () => {
  const items = [
    { label: 'Lithos UI', href: '#' },
    { label: 'Components', href: '#' },
    { label: 'Breadcrumb', href: '#' },
    { label: 'Collapsible Breadcrumb', active: true },
  ]

  return (
    <Breadcrumb
      mode="collapsible"
      maxItems={3}
      itemsBeforeCollapse={1}
      itemsAfterCollapse={1}
      items={items}
    />
  )
}`,
    componentNames: ['Breadcrumb'],
    manualPath: {
      Breadcrumb: '../../components/ui/Breadcrumb',
    },
  }

  const iconNameCode = {
    body: `
export const IconNameBreadcrumb = () => {
  const items = [
    { label: 'Lithos UI', href: '#', onClick: (e) => e.preventDefault() },
    { label: 'Components', href: '#', icon: <IconFolder />, onClick: (e) => e.preventDefault() },
    { label: 'Breadcrumb', href: '#', icon: <IconSettings />, onClick: (e) => e.preventDefault() },
    { label: 'Icon', active: true, icon: <IconFileText /> },
  ]

  return <Breadcrumb showIcons items={items} />
}`,
    componentNames: ['Breadcrumb', 'IconFolder', 'IconSettings', 'IconFileText'],
    manualPath: {
      Breadcrumb: '../../components/ui/Breadcrumb',
      IconFolder: '../../components/ui/icons/IconFolder',
      IconSettings: '../../components/ui/icons/IconSettings',
      IconFileText: '../../components/ui/icons/IconFileText',
    },
  }

  return (
    <div className="max-w-5xl mx-auto px-6">
      <header className="mt-0">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none text-(--lithos-text) mb-8">
          Breadcrumb
        </h1>
        <p className="mt-2 text-lg md:text-xl font-display opacity-70 text-(--lithos-text)">
          Navigate with clean, accessible breadcrumbs featuring collapsible paths and icon-supported items.
        </p>
        <hr className="border-t-2 border-(--lithos-border) mt-8 mb-8" />
      </header>

      <section className="mb-12">
        <p className="mb-8 text-lg md:text-xl text-(--lithos-text) max-w-3xl font-body">
          Breadcrumbs show users where they are and help them navigate back to previous pages without getting lost.
          Lithos UI offers two simple styles: <strong>Collapsible</strong> to keep long paths tidy, and{' '}
          <strong>Icon</strong> for a visual touch.
        </p>
      </section>

      <div className="border-l-4 border-(--lithos-accent) pl-6 py-2 mb-8 bg-(--lithos-surface) p-4">
        <p className="text-sm font-bold font-body opacity-80 text-(--lithos-text)">
          Screen readers automatically recognize the breadcrumb landmark (
          <code>&lt;nav aria-label="Breadcrumb"&gt;</code>) and identify the active page (
          <code>aria-current="page"</code>) for easy keyboard navigation.
        </p>
      </div>

      <h2 id="installation" className="mt-12 mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
        Installation
      </h2>

      <SetupGuide
        componentNames={['Breadcrumb']}
        manualPath={{
          Breadcrumb: '../../components/ui/Breadcrumb',
        }}
        requires={[
          'utils/cn.ts',
          'components/ui/icons/IconHome.tsx',
          'components/ui/icons/IconBreadcrumbSeparator.tsx',
          'components/ui/icons/IconFolder.tsx',
          'components/ui/icons/IconSettings.tsx',
          'components/ui/icons/IconFileText.tsx',
        ]}
      />

      <h2 id="anatomy" className="mt-12 mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
        Anatomy
      </h2>
      <div className="mb-12">
        <CodeViewer
          language="tsx"
          code={`<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink />
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbEllipsis />
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage />
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`}
        />
      </div>

      <h2 id="examples" className="mt-12 mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
        Examples
      </h2>

      {/* Type 1: Collapsible */}
      <h3 id="collapsible" className="mb-2 text-xl font-black tracking-tight text-(--lithos-text)">
        Collapsible
      </h3>
      <p className="mb-4 text-base text-(--lithos-text) max-w-3xl font-body opacity-80">
        Use this when navigation paths become too long to fit cleanly on screen. It renders a standard breadcrumb but
        replaces intermediate items with an ellipsis button to save space. Clicking the ellipsis expands the hidden
        items inline. Restrict the maximum visible items using the <code>maxItems</code> prop. The ellipsis button is
        fully accessible, featuring a descriptive <code>aria-label</code> that alerts screen readers to its expanding
        function.
      </p>

      <div className="mt-4 mb-16">
        <PreviewBlock code={collapsibleCode} githubUrl={githubUrl}>
          <div className="flex flex-col items-center justify-center p-4">
            <Breadcrumb
              mode="collapsible"
              maxItems={3}
              itemsBeforeCollapse={1}
              itemsAfterCollapse={1}
              items={[
                { label: 'Lithos UI', href: '#', onClick: (e) => e.preventDefault() },
                { label: 'Components', href: '#', onClick: (e) => e.preventDefault() },
                { label: 'Breadcrumb', href: '#', onClick: (e) => e.preventDefault() },
                { label: 'Collapsible Breadcrumb', active: true },
              ]}
            />
          </div>
        </PreviewBlock>
      </div>

      {/* Type 2: Icon */}
      <h3 id="icon" className="mb-2 text-xl font-black tracking-tight text-(--lithos-text)">
        Icon
      </h3>
      <p className="mb-4 text-base text-(--lithos-text) max-w-3xl font-body opacity-80">
        Use this to pair descriptive icons alongside segment names, enhancing visual clarity and hierarchical scanning.
        It renders an icon preceding the text for each breadcrumb segment. Hover and focus states remain identical to
        the default text links. Keep segment text brief to accommodate the added icon width. Icons are treated as
        decorative and do not alter the navigation's semantic accessibility.
      </p>

      <div className="mt-4 mb-16">
        <PreviewBlock code={iconNameCode} githubUrl={githubUrl}>
          <div className="flex flex-col items-center justify-center p-4">
            <Breadcrumb
              showIcons
              items={[
                { label: 'Lithos UI', href: '#', onClick: (e) => e.preventDefault() },
                { label: 'Components', href: '#', icon: <IconFolder />, onClick: (e) => e.preventDefault() },
                { label: 'Breadcrumb', href: '#', icon: <IconSettings />, onClick: (e) => e.preventDefault() },
                { label: 'Icon', active: true, icon: <IconFileText /> },
              ]}
            />
          </div>
        </PreviewBlock>
      </div>

      <section className="mb-12">
        <h2 id="accessibility" className="mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
          Accessibility
        </h2>
        <ul className="list-disc pl-6 text-lg font-body text-(--lithos-text)">
          <li>
            Breadcrumbs are wrapped in a <code>&lt;nav aria-label="Breadcrumb"&gt;</code> element to define a navigation
            landmark.
          </li>
          <li>
            The currently active page is indicated to assistive technologies using <code>aria-current="page"</code>.
          </li>
          <li>
            Separators between items are hidden from screen readers using <code>aria-hidden="true"</code>.
          </li>
          <li>
            The collapsible ellipsis button provides a descriptive <code>aria-label</code> that updates dynamically when
            expanded.
          </li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 id="api" className="mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
          API Reference
        </h2>
        <PropsAccordion title="Breadcrumb Props" data={breadcrumbPropsData} />
        <PropsAccordion title="BreadcrumbItemData" data={breadcrumbItemDataPropsData} />
      </section>
    </div>
  )
}
