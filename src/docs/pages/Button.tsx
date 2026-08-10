import { Button, ButtonGroup } from '../../components/ui/Button'
import { IconHome } from '../../components/ui/icons/IconHome'
import { IconSettings } from '../../components/ui/icons/IconSettings'
import { PreviewBlock } from '../../components/ui/PreviewBlock'
import { type PropItem, PropsAccordion } from '../../components/ui/PropsTable'

const buttonPropsData: PropItem[] = [
  {
    name: 'intent',
    type: "'primary' | 'secondary' | 'text'",
    defaultValue: "'primary'",
    required: false,
    description: 'Visual emphasis variant.',
  },
  {
    name: 'fullWidth',
    type: 'boolean',
    defaultValue: 'false',
    required: false,
    description: 'Expands the button to fill its container width.',
  },
  {
    name: 'type',
    type: "'button' | 'submit' | 'reset'",
    defaultValue: "'button'",
    required: false,
    description: 'Native HTML button type.',
  },
  {
    name: 'iconLeft',
    type: 'ReactNode',
    required: false,
    description: 'Icon rendered before the button label.',
  },
  {
    name: 'iconRight',
    type: 'ReactNode',
    required: false,
    description: 'Icon rendered after the button label.',
  },
  {
    name: 'children',
    type: 'ReactNode',
    required: true,
    description: 'Content rendered inside the button.',
  },
  {
    name: 'className',
    type: 'string',
    required: false,
    description: 'Additional CSS classes.',
  },
]

const buttonGroupPropsData: PropItem[] = [
  {
    name: 'orientation',
    type: "'horizontal' | 'vertical'",
    defaultValue: "'horizontal'",
    required: false,
    description: 'Lays buttons out side by side or stacked.',
  },
  {
    name: 'attached',
    type: 'boolean',
    defaultValue: 'false',
    required: false,
    description: 'Fuses adjacent buttons into a single hard-bordered strip instead of spacing them apart.',
  },
  {
    name: 'children',
    type: 'ReactNode',
    required: true,
    description: 'Button elements to lay out.',
  },
  {
    name: 'className',
    type: 'string',
    required: false,
    description: 'Additional CSS classes.',
  },
]

export const ButtonDoc = () => {
  const defaultCode = `import { Button } from '../../components/ui/Button'

export const DefaultButton = () => {
  return <Button className="cursor-pointer">Default</Button>
}`

  const secondaryCode = `import { Button } from '../../components/ui/Button'

export const SecondaryButton = () => {
  return (
    <Button intent="secondary" className="cursor-pointer">
      Secondary
    </Button>
  )
}`

  const textCode = `import { Button } from '../../components/ui/Button'

export const TextButton = () => {
  return (
    <Button intent="text" className="cursor-pointer">
      Text
    </Button>
  )
}`

  const iconLeftCode = `import { Button } from '../../components/ui/Button'
import { IconHome } from '../../components/ui/icons/IconHome'

export const IconLeftButton = () => {
  return (
    <Button iconLeft={<IconHome />} className="cursor-pointer">
      Home
    </Button>
  )
}`

  const iconRightCode = `import { Button } from '../../components/ui/Button'
import { IconSettings } from '../../components/ui/icons/IconSettings'

export const IconRightButton = () => {
  return (
    <Button intent="secondary" iconRight={<IconSettings />} className="cursor-pointer">
      Settings
    </Button>
  )
}`

  const groupHorizontalCode = `import { Button, ButtonGroup } from '../../components/ui/Button'

export const HorizontalButtonGroup = () => {
  return (
    <ButtonGroup>
      <Button intent="secondary" className="cursor-pointer">Cancel</Button>
      <Button intent="primary" className="cursor-pointer">Save Changes</Button>
    </ButtonGroup>
  )
}`

  const groupVerticalCode = `import { Button, ButtonGroup } from '../../components/ui/Button'

export const VerticalButtonGroup = () => {
  return (
    <ButtonGroup orientation="vertical">
      <Button intent="primary" className="cursor-pointer">Save Changes</Button>
      <Button intent="secondary" className="cursor-pointer">Cancel</Button>
    </ButtonGroup>
  )
}`

  const groupAttachedCode = `import { Button, ButtonGroup } from '../../components/ui/Button'

export const AttachedButtonGroup = () => {
  return (
    <ButtonGroup attached>
      <Button intent="secondary" className="cursor-pointer">Cancel</Button>
      <Button intent="primary" className="cursor-pointer">Save Changes</Button>
    </ButtonGroup>
  )
}`

  return (
    <div className="max-w-5xl mx-auto px-6">
      <header className="mt-0">
        <h1 className="text-4xl md:text-5xl font-display tracking-tight leading-none text-(--lithos-text) mb-6">
          Button
        </h1>
        <p className="mt-2 text-lg md:text-xl font-body opacity-70 text-(--lithos-text)">
          A hard-bordered, high-contrast clickable primitive with three levels of visual emphasis.
        </p>
        <hr className="border-t-2 border-(--lithos-border) mt-6 mb-6" />
      </header>

      <section className="mb-6">
        <p className="text-lg md:text-xl text-(--lithos-text) max-w-3xl font-body">
          Button is a strict native <code>&lt;button&gt;</code> primitive. It ships three <code>intent</code>{' '}
          variants — Default, Secondary, Text — built on the shared hard-shadow, hard-border interaction physics of{' '}
          <code>.lithos-click</code>.
        </p>
      </section>

      <div className="border-l-4 border-(--lithos-accent) pl-6 py-2 mb-8 bg-(--lithos-surface) p-4">
        <p className="text-sm font-bold font-body opacity-80 text-(--lithos-text)">
          <strong>Default</strong> is the primary call to action and requires no <code>intent</code> prop.{' '}
          <strong>Secondary</strong> is a secondary call-to-action with an outlined style.{' '}
          <strong>Text</strong> is a text-only button variant with no border or background, typically used for
          secondary or low-emphasis actions.
        </p>
      </div>

      <h2 id="examples" className="mb-4 text-2xl font-black uppercase tracking-tight text-(--lithos-text)">
        Examples
      </h2>

      <h2 id="button" className="mb-4 text-2xl font-black uppercase tracking-tight text-(--lithos-text)">
        Button
      </h2>

      <h4 id="default" className="mb-3 text-lg font-black uppercase tracking-tight text-(--lithos-text)">
        Default
      </h4>
      <p className="text-base text-(--lithos-text) max-w-3xl font-body mb-4 opacity-80">
        The <code>primary</code> intent, used with no <code>intent</code> prop. Solid accent fill for the main
        call to action on a screen — use it once per view so it stays the obvious next step.
      </p>
      <PreviewBlock
        code={defaultCode}
        githubUrl="https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/Button.tsx"
      >
        <Button className="cursor-pointer">Default</Button>
      </PreviewBlock>

      <h4 id="secondary" className="mb-3 text-lg font-black uppercase tracking-tight text-(--lithos-text)">
        Secondary
      </h4>
      <p className="text-base text-(--lithos-text) max-w-3xl font-body mb-4 opacity-80">
        Outlined, lower-emphasis variant for actions alongside a primary button — cancel, back, or any option
        that shouldn't compete visually with the main call to action.
      </p>
      <PreviewBlock
        code={secondaryCode}
        githubUrl="https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/Button.tsx"
      >
        <Button intent="secondary" className="cursor-pointer">
          Secondary
        </Button>
      </PreviewBlock>

      <h4 id="text" className="mb-3 text-lg font-black uppercase tracking-tight text-(--lithos-text)">
        Text
      </h4>
      <p className="text-base text-(--lithos-text) max-w-3xl font-body mb-4 opacity-80">
        Flat, borderless variant with no background or shadow. Fits inline actions or tight spaces — toolbar
        items, table row actions — where a full bordered button would be too heavy.
      </p>
      <PreviewBlock
        code={textCode}
        githubUrl="https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/Button.tsx"
      >
        <Button intent="text" className="cursor-pointer">
          Text
        </Button>
      </PreviewBlock>

      <h4 id="icon-left" className="mb-3 text-lg font-black uppercase tracking-tight text-(--lithos-text)">
        Icon Left
      </h4>
      <p className="text-base text-(--lithos-text) max-w-3xl font-body mb-4 opacity-80">
        The <code>iconLeft</code> prop places an icon before the label with mandate-compliant margin spacing
        (no CSS <code>gap</code>). Use it for actions where the icon reinforces meaning before the reader
        reaches the text — navigation, filters, or a leading status glyph.
      </p>
      <PreviewBlock
        code={iconLeftCode}
        githubUrl="https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/Button.tsx"
      >
        <Button iconLeft={<IconHome />} className="cursor-pointer">
          Home
        </Button>
      </PreviewBlock>

      <h4 id="icon-right" className="mb-3 text-lg font-black uppercase tracking-tight text-(--lithos-text)">
        Icon Right
      </h4>
      <p className="text-base text-(--lithos-text) max-w-3xl font-body mb-4 opacity-80">
        The <code>iconRight</code> prop places an icon after the label — well suited to actions that lead
        somewhere else, like opening a settings panel or a menu that expands to the right.
      </p>
      <PreviewBlock
        code={iconRightCode}
        githubUrl="https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/Button.tsx"
      >
        <Button intent="secondary" iconRight={<IconSettings />} className="cursor-pointer">
          Settings
        </Button>
      </PreviewBlock>

      <h2 id="button-group" className="mb-4 mt-8 text-2xl font-black uppercase tracking-tight text-(--lithos-text)">
        Button Group
      </h2>
      <p className="text-base text-(--lithos-text) max-w-3xl font-body mb-6 opacity-80">
        <code>ButtonGroup</code> lays out <code>Button</code> primitives side by side or stacked. Pass{' '}
        <code>attached</code> to fuse adjacent buttons into a single hard-bordered strip.
      </p>

      <h4 id="group-horizontal" className="mb-3 text-lg font-black uppercase tracking-tight text-(--lithos-text)">
        Default
      </h4>
      <p className="text-base text-(--lithos-text) max-w-3xl font-body mb-4 opacity-80">
        Default orientation, buttons laid out side by side with margin-based spacing between them. The classic
        dialog footer pattern: a secondary <em>Cancel</em> next to the primary confirming action.
      </p>
      <PreviewBlock
        code={groupHorizontalCode}
        githubUrl="https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/Button.tsx"
      >
        <ButtonGroup>
          <Button intent="secondary" className="cursor-pointer">Cancel</Button>
          <Button intent="primary" className="cursor-pointer">Save Changes</Button>
        </ButtonGroup>
      </PreviewBlock>

      <h4 id="group-vertical" className="mb-3 text-lg font-black uppercase tracking-tight text-(--lithos-text)">
        Vertical
      </h4>
      <p className="text-base text-(--lithos-text) max-w-3xl font-body mb-4 opacity-80">
        Set <code>orientation="vertical"</code> to stack buttons instead — useful in narrow sidebars, mobile
        sheets, or anywhere horizontal space is tight.
      </p>
      <PreviewBlock
        code={groupVerticalCode}
        githubUrl="https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/Button.tsx"
      >
        <ButtonGroup orientation="vertical">
          <Button intent="primary" className="cursor-pointer">Save Changes</Button>
          <Button intent="secondary" className="cursor-pointer">Cancel</Button>
        </ButtonGroup>
      </PreviewBlock>

      <h4 id="group-attached" className="mb-3 text-lg font-black uppercase tracking-tight text-(--lithos-text)">
        Attached
      </h4>
      <p className="text-base text-(--lithos-text) max-w-3xl font-body mb-4 opacity-80">
        The <code>attached</code> flag collapses the shared border between buttons into a single fused strip and
        pops the hovered/focused button's shadow above its neighbors via <code>z-10</code> — a segmented-control
        look without giving up individual <code>Button</code> semantics.
      </p>
      <PreviewBlock
        code={groupAttachedCode}
        githubUrl="https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/Button.tsx"
      >
        <ButtonGroup attached>
          <Button intent="secondary" className="cursor-pointer">Cancel</Button>
          <Button intent="primary" className="cursor-pointer">Save Changes</Button>
        </ButtonGroup>
      </PreviewBlock>

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
          <li>Uses native <code>&lt;button&gt;</code> element for built-in keyboard navigation and screen reader support.</li>
          <li>Supports standard focus outlines provided by the browser.</li>
          <li>Maintains high contrast ratios for all intent variants.</li>
          <li>Disabled state accurately maps to the native <code>disabled</code> attribute.</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 id="api" className="mb-4 text-2xl font-black uppercase tracking-tight text-(--lithos-text)">
          API Reference
        </h2>
        <PropsAccordion title="Button Props" data={buttonPropsData} />
        <PropsAccordion title="ButtonGroup Props" data={buttonGroupPropsData} />
      </section>
    </div>
  )
}
