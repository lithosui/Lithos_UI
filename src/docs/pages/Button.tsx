import { Button, ButtonGroup } from '../../components/ui/Button'
import { IconDownload } from '../../components/ui/icons/IconDownload'
import { IconHome } from '../../components/ui/icons/IconHome'
import { IconSettings } from '../../components/ui/icons/IconSettings'
import { PreviewBlock } from '../../components/ui/PreviewBlock'
import { CodeViewer } from '../../components/ui/CodeViewer'
import { PropsAccordion } from '../../components/ui/PropsTable'
import { SetupGuide } from '../layout/SetupGuide'
import { buttonPropsData, buttonGroupPropsData } from '../propsData/button'

const githubUrl = 'https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/Button.tsx'

export const ButtonDoc = () => {
  const defaultCode = {
    body: `export const DefaultButton = () => {
  return <Button>Default</Button>
}`,
    componentNames: ['Button'],
    manualPath: '../../components/ui/Button',
  }

  const secondaryCode = {
    body: `export const SecondaryButton = () => {
  return <Button variant="secondary">Secondary</Button>
}`,
    componentNames: ['Button'],
    manualPath: '../../components/ui/Button',
  }

  const accentCode = {
    body: `export const AccentButton = () => {
  return <Button variant="accent">Accent</Button>
}`,
    componentNames: ['Button'],
    manualPath: '../../components/ui/Button',
  }

  const solidCode = {
    body: `export const SolidButton = () => {
  return <Button variant="solid" color="#0000FF">Solid</Button>
}`,
    componentNames: ['Button'],
    manualPath: '../../components/ui/Button',
  }

  const textCode = {
    body: `export const TextButton = () => {
  return <Button variant="text">Text</Button>
}`,
    componentNames: ['Button'],
    manualPath: '../../components/ui/Button',
  }

  const withIconCode = {
    body: `export const WithIconButtons = () => {
  return (
    <div className="flex items-center">
      <Button iconLeft={<IconHome />}>Home</Button>
      <Button variant="secondary" iconRight={<IconSettings />} className="ml-3">
        Settings
      </Button>
    </div>
  )
}`,
    componentNames: ['Button'],
    manualPath: '../../components/ui/Button',
  }

  const iconCode = {
    body: `export const IconButton = () => {
  return (
    <Button aria-label="Download">
      <IconDownload />
    </Button>
  )
}`,
    componentNames: ['Button'],
    manualPath: '../../components/ui/Button',
  }

  const groupHorizontalCode = {
    body: `export const HorizontalButtonGroup = () => {
  return (
    <ButtonGroup>
      <Button variant="secondary">Cancel</Button>
      <Button variant="primary">Save Changes</Button>
    </ButtonGroup>
  )
}`,
    componentNames: ['Button', 'ButtonGroup'],
    manualPath: '../../components/ui/Button',
  }

  const groupVerticalCode = {
    body: `export const VerticalButtonGroup = () => {
  return (
    <ButtonGroup orientation="vertical">
      <Button variant="primary">Save Changes</Button>
      <Button variant="secondary">Cancel</Button>
    </ButtonGroup>
  )
}`,
    componentNames: ['Button', 'ButtonGroup'],
    manualPath: '../../components/ui/Button',
  }

  const groupAttachedCode = {
    body: `export const AttachedButtonGroup = () => {
  return (
    <ButtonGroup attached>
      <Button variant="secondary">Cancel</Button>
      <Button variant="primary">Save Changes</Button>
    </ButtonGroup>
  )
}`,
    componentNames: ['Button', 'ButtonGroup'],
    manualPath: '../../components/ui/Button',
  }

  return (
    <div className="max-w-5xl mx-auto px-6">
      <header className="mt-0">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none text-(--lithos-text) mb-8">
          Button
        </h1>
        <p className="mt-2 text-lg md:text-xl font-display opacity-70 text-(--lithos-text)">
          A hard-bordered, high-contrast clickable primitive with four levels of visual emphasis.
        </p>
        <hr className="border-t-2 border-(--lithos-border) mt-6 mb-6" />
      </header>

      <section className="mb-6">
        <p className="text-lg md:text-xl text-(--lithos-text) max-w-3xl font-body">
          Button is a strict native <code>&lt;button&gt;</code> primitive. It ships four <code>intent</code> variants —
          Default, Secondary, Accent, Text — built on the shared hard-shadow, hard-border interaction physics of{' '}
          <code>.lithos-click</code>.
        </p>
      </section>

      <div className="border-l-4 border-(--lithos-accent) pl-6 py-2 mb-8 bg-(--lithos-surface) p-4">
        <p className="text-sm font-bold font-body opacity-80 text-(--lithos-text)">
          <strong>Default</strong> is the primary call to action and requires no <code>intent</code> prop.{' '}
          <strong>Secondary</strong> is a secondary call-to-action with an outlined style. <strong>Accent</strong> is a
          secondary button that fills solid with the accent color on hover. <strong>Solid</strong> allows a custom
          background color with an automatically adapting contrast text. <strong>Text</strong> is a text-only button
          variant with no border or background, typically used for secondary or low-emphasis actions.
        </p>
      </div>

      <h2 id="installation" className="mt-12 mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
        Installation
      </h2>

      <SetupGuide
        componentNames={['Button']}
        manualPath="../../components/ui/Button"
        requires={[
          'utils/cn.ts',
          'core/types.ts',
          'components/ui/icons/IconHome.tsx',
          'components/ui/icons/IconSettings.tsx',
          'components/ui/icons/IconDownload.tsx',
        ]}
      />

      <h2 id="anatomy" className="mt-12 mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
        Anatomy
      </h2>
      <div className="mb-12">
        <CodeViewer
          language="tsx"
          code={`<ButtonGroup>
  <Button />
  <Button />
</ButtonGroup>`}
        />
      </div>

      <h2 id="examples" className="mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
        Examples
      </h2>

      <h2 id="button" className="mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
        Button
      </h2>

      <h4 id="default" className="mb-3 text-lg font-black tracking-tight text-(--lithos-text)">
        Default
      </h4>
      <p className="text-base text-(--lithos-text) max-w-3xl font-body mb-4 opacity-80">
        Use this as the primary call to action on a screen. It renders with a solid accent background and contrasting
        text. Hovering or focusing scales the button slightly. Do not use more than once per view to maintain visual
        hierarchy. Accessible via standard keyboard interactions.
      </p>

      <PreviewBlock code={defaultCode} githubUrl={githubUrl}>
        <Button>Default</Button>
      </PreviewBlock>

      <h4 id="secondary" className="mb-3 text-lg font-black tracking-tight text-(--lithos-text)">
        Secondary
      </h4>
      <p className="text-base text-(--lithos-text) max-w-3xl font-body mb-4 opacity-80">
        Use this for lower-emphasis actions alongside a primary button, such as 'Cancel' or 'Back'. It renders with a
        transparent background and a solid border to reduce visual weight compared to the default variant. On hover or
        focus, the background fills with the accent color. Do not use for the main call to action. Fully accessible via
        standard keyboard navigation.
      </p>

      <PreviewBlock code={secondaryCode} githubUrl={githubUrl}>
        <Button variant="secondary">Secondary</Button>
      </PreviewBlock>

      <h4 id="accent" className="mb-3 text-lg font-black tracking-tight text-(--lithos-text)">
        Accent
      </h4>
      <p className="text-base text-(--lithos-text) max-w-3xl font-body mb-4 opacity-80">
        Use this for a secondary call to action that needs to stand out without the full visual weight of the primary
        button. It renders exactly like the secondary variant but fills solid with the accent color on hover instead of
        remaining transparent. Content guidelines match the secondary variant. Fully keyboard accessible.
      </p>

      <PreviewBlock code={accentCode} githubUrl={githubUrl}>
        <Button variant="accent">Accent</Button>
      </PreviewBlock>

      <h4 id="solid" className="mb-3 text-lg font-black tracking-tight text-(--lithos-text)">
        Solid
      </h4>
      <p className="text-base text-(--lithos-text) max-w-3xl font-body mb-4 opacity-80">
        Use this when a specific action requires a unique background color unrelated to the global theme, such as a
        destructive 'Delete' button. Provide a custom hex <code>color</code> to set the background; the text color
        automatically adapts using a YIQ contrast check. Standard hover scaling applies. Ensure custom colors still meet
        accessibility contrast guidelines for colorblindness.
      </p>

      <PreviewBlock code={solidCode} githubUrl={githubUrl}>
        <Button variant="solid" color="#0000FF">
          Solid
        </Button>
      </PreviewBlock>

      <h4 id="text" className="mb-3 text-lg font-black tracking-tight text-(--lithos-text)">
        Text
      </h4>
      <p className="text-base text-(--lithos-text) max-w-3xl font-body mb-4 opacity-80">
        Use this for inline actions or tight spaces like toolbar items and table row actions. It renders as a flat,
        borderless variant with no background or shadow to minimize visual clutter. Hovering slightly scales the text.
        Do not use for standalone primary actions. Retains full focus management for keyboard users.
      </p>

      <PreviewBlock code={textCode} githubUrl={githubUrl}>
        <Button variant="text">Text</Button>
      </PreviewBlock>

      <h4 id="with-icon" className="mb-3 text-lg font-black tracking-tight text-(--lithos-text)">
        With Icon
      </h4>
      <p className="text-base text-(--lithos-text) max-w-3xl font-body mb-4 opacity-80">
        Use this to provide a visual cue alongside the text label for faster recognition. It renders an icon inline with
        the text via the <code>iconLeft</code> or <code>iconRight</code> props. Keep labels short. The icon is treated
        as decorative, ensuring the text label dictates screen reader accessibility. Hover and focus states match the
        underlying variant.
      </p>

      <PreviewBlock code={withIconCode} githubUrl={githubUrl}>
        <div className="flex items-center">
          <Button iconLeft={<IconHome />}>Home</Button>
          <Button variant="secondary" iconRight={<IconSettings />} className="ml-3">
            Settings
          </Button>
        </div>
      </PreviewBlock>

      <h4 id="icon" className="mb-3 text-lg font-black tracking-tight text-(--lithos-text)">
        Icon
      </h4>
      <p className="text-base text-(--lithos-text) max-w-3xl font-body mb-4 opacity-80">
        An icon-only button with no label — pass a single icon as <code>children</code> and set <code>aria-label</code>{' '}
        so the action stays announced to assistive tech. The square <code>.lithos-click</code> padding keeps it visually
        balanced.
      </p>

      <PreviewBlock code={iconCode} githubUrl={githubUrl}>
        <Button aria-label="Download">
          <IconDownload />
        </Button>
      </PreviewBlock>

      <h2 id="button-group" className="mb-4 mt-8 text-2xl font-black tracking-tight text-(--lithos-text)">
        Button Group
      </h2>
      <p className="text-base text-(--lithos-text) max-w-3xl font-body mb-6 opacity-80">
        <code>ButtonGroup</code> lays out <code>Button</code> primitives side by side or stacked. Pass{' '}
        <code>attached</code> to fuse adjacent buttons into a single hard-bordered strip.
      </p>

      <h4 id="group-horizontal" className="mb-3 text-lg font-black tracking-tight text-(--lithos-text)">
        Default
      </h4>
      <p className="text-base text-(--lithos-text) max-w-3xl font-body mb-4 opacity-80">
        Default orientation, buttons laid out side by side with margin-based spacing between them. The classic dialog
        footer pattern: a secondary <em>Cancel</em> next to the primary confirming action.
      </p>

      <PreviewBlock code={groupHorizontalCode} githubUrl={githubUrl}>
        <ButtonGroup>
          <Button variant="secondary">Cancel</Button>
          <Button variant="primary">Save Changes</Button>
        </ButtonGroup>
      </PreviewBlock>

      <h4 id="group-vertical" className="mb-3 text-lg font-black tracking-tight text-(--lithos-text)">
        Vertical
      </h4>
      <p className="text-base text-(--lithos-text) max-w-3xl font-body mb-4 opacity-80">
        Set <code>orientation="vertical"</code> to stack buttons instead — useful in narrow sidebars, mobile sheets, or
        anywhere horizontal space is tight.
      </p>

      <PreviewBlock code={groupVerticalCode} githubUrl={githubUrl}>
        <ButtonGroup orientation="vertical">
          <Button variant="primary">Save Changes</Button>
          <Button variant="secondary">Cancel</Button>
        </ButtonGroup>
      </PreviewBlock>

      <h4 id="group-attached" className="mb-3 text-lg font-black tracking-tight text-(--lithos-text)">
        Attached
      </h4>
      <p className="text-base text-(--lithos-text) max-w-3xl font-body mb-4 opacity-80">
        The <code>attached</code> flag collapses the shared border between buttons into a single fused strip and pops
        the hovered/focused button's shadow above its neighbors via <code>z-10</code> — a segmented-control look without
        giving up individual <code>Button</code> semantics.
      </p>

      <PreviewBlock code={groupAttachedCode} githubUrl={githubUrl}>
        <ButtonGroup attached>
          <Button variant="secondary">Cancel</Button>
          <Button variant="primary">Save Changes</Button>
        </ButtonGroup>
      </PreviewBlock>

      <section className="mb-12">
        <h2 id="accessibility" className="mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
          Accessibility
        </h2>
        <ul className="list-disc pl-6 text-lg font-body text-(--lithos-text)">
          <li>
            Uses native <code>&lt;button&gt;</code> element for built-in keyboard navigation and screen reader support.
          </li>
          <li>Supports standard focus outlines provided by the browser.</li>
          <li>Maintains high contrast ratios for all intent variants.</li>
          <li>
            Disabled state accurately maps to the native <code>disabled</code> attribute.
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
        <PropsAccordion title="Button Props" data={buttonPropsData} />
        <PropsAccordion title="ButtonGroup Props" data={buttonGroupPropsData} />
      </section>
    </div>
  )
}
