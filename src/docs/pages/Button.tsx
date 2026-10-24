import { PreviewBlock } from '../../components/ui/PreviewBlock'
import { CodeViewer } from '../../components/ui/CodeViewer'
import { PropsAccordion } from '../../components/ui/PropsTable'
import { Typography } from '../../components/ui/Typography'
import { SetupGuide } from '../layout/SetupGuide'
import { DocCallout, DocExample, DocHeader, DocHeading, DocLeadText, DocList, DocSection } from '../layout/DocPage'
import { buttonPropsData, buttonGroupPropsData } from '../propsData/button'
import { removeImports } from '../examples/removeImports'
import { DefaultButtonExample } from '../examples/button/default'
import defaultSource from '../examples/button/default.tsx?raw'
import { SecondaryButtonExample } from '../examples/button/secondary'
import secondarySource from '../examples/button/secondary.tsx?raw'
import { AccentButtonExample } from '../examples/button/accent'
import accentSource from '../examples/button/accent.tsx?raw'
import { SolidButtonExample } from '../examples/button/solid'
import solidSource from '../examples/button/solid.tsx?raw'
import { TextButtonExample } from '../examples/button/text'
import textSource from '../examples/button/text.tsx?raw'
import { InverseButtonExample } from '../examples/button/inverse'
import inverseSource from '../examples/button/inverse.tsx?raw'
import { WithIconButtonsExample } from '../examples/button/withIcon'
import withIconSource from '../examples/button/withIcon.tsx?raw'
import { IconButtonExample } from '../examples/button/icon'
import iconSource from '../examples/button/icon.tsx?raw'
import { HorizontalButtonGroupExample } from '../examples/button/groupHorizontal'
import groupHorizontalSource from '../examples/button/groupHorizontal.tsx?raw'
import { VerticalButtonGroupExample } from '../examples/button/groupVertical'
import groupVerticalSource from '../examples/button/groupVertical.tsx?raw'
import { AttachedButtonGroupExample } from '../examples/button/groupAttached'
import groupAttachedSource from '../examples/button/groupAttached.tsx?raw'

const githubUrl = 'https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/Button.tsx'
const manualPath = '../../components/ui/Button'
const buttonCode = (source: string, componentNames = ['Button']) => ({
  body: removeImports(source),
  componentNames,
  manualPath,
})
const withIconCode = {
  ...buttonCode(withIconSource, ['Button', 'IconHome', 'IconSettings']),
  manualPath: {
    Button: manualPath,
    IconHome: '../../components/ui/icons/IconHome',
    IconSettings: '../../components/ui/icons/IconSettings',
  },
}
const iconCode = {
  ...buttonCode(iconSource, ['Button', 'IconDownload']),
  manualPath: {
    Button: manualPath,
    IconDownload: '../../components/ui/icons/IconDownload',
  },
}

export const ButtonDoc = () => (
  <div className="max-w-5xl mx-auto px-6">
    <DocHeader
      title="Button"
      description="A hard-bordered, high-contrast clickable primitive with four levels of visual emphasis."
    />

    <DocSection className="mb-6">
      <DocLeadText>
        Button is a strict native <code>&lt;button&gt;</code> primitive. It ships four <code>intent</code> variants —
        Default, Secondary, Accent, Text — built on the shared hard-shadow, hard-border interaction physics of{' '}
        <code>.lithos-click</code>.
      </DocLeadText>
      <DocCallout>
        <strong>Default</strong> is the primary call to action and requires no <code>intent</code> prop.{' '}
        <strong>Secondary</strong> is a secondary call-to-action with an outlined style. <strong>Accent</strong> is a
        secondary button that fills solid with the accent color on hover. <strong>Solid</strong> allows a custom
        background color with an automatically adapting contrast text. <strong>Inverse</strong> inverts the button
        colors to adapt to dark backgrounds. <strong>Text</strong> is a text-only button variant with no border or
        background, typically used for secondary or low-emphasis actions.
      </DocCallout>
    </DocSection>

    <DocSection>
      <DocHeading id="installation">Installation</DocHeading>
      <SetupGuide
        componentNames={['Button']}
        manualPath={manualPath}
        requires={['utils/cn.ts', 'core/types.ts', 'utils/yiq.ts']}
      />
    </DocSection>

    <DocHeading id="examples">Examples</DocHeading>
    <DocHeading id="button">Button</DocHeading>

    <DocExample
      id="default"
      title="Default"
      description="Use this as the primary call to action on a screen. It renders with a solid accent background and contrasting text. Hovering or focusing scales the button slightly. Do not use more than once per view to maintain visual hierarchy. Accessible via standard keyboard interactions."
    >
      <PreviewBlock code={buttonCode(defaultSource)} githubUrl={githubUrl}>
        <DefaultButtonExample />
      </PreviewBlock>
    </DocExample>

    <DocExample
      id="secondary"
      title="Secondary"
      description="Use this for lower-emphasis actions alongside a primary button, such as 'Cancel' or 'Back'. It renders with a transparent background and a solid border to reduce visual weight compared to the default variant. On hover or focus, the background fills with the accent color. Do not use for the main call to action. Fully accessible via standard keyboard navigation."
    >
      <PreviewBlock code={buttonCode(secondarySource)} githubUrl={githubUrl}>
        <SecondaryButtonExample />
      </PreviewBlock>
    </DocExample>

    <DocExample
      id="accent"
      title="Accent"
      description="Use this for a secondary call to action that needs to stand out without the full visual weight of the primary button. It renders exactly like the secondary variant but fills solid with the accent color on hover instead of remaining transparent. Content guidelines match the secondary variant. Fully keyboard accessible."
    >
      <PreviewBlock code={buttonCode(accentSource)} githubUrl={githubUrl}>
        <AccentButtonExample />
      </PreviewBlock>
    </DocExample>

    <DocExample
      id="solid"
      title="Solid"
      description="Use this when a specific action requires a unique background color unrelated to the global theme, such as a destructive 'Delete' button. Provide a custom hex color to set the background; the text color automatically adapts using a YIQ contrast check. Standard hover scaling applies. Ensure custom colors still meet accessibility contrast guidelines for colorblindness."
    >
      <PreviewBlock code={buttonCode(solidSource)} githubUrl={githubUrl}>
        <SolidButtonExample />
      </PreviewBlock>
    </DocExample>

    <DocExample
      id="text"
      title="Text"
      description="Use this for inline actions or tight spaces like toolbar items and table row actions. It renders as a flat, borderless variant with no background or shadow to minimize visual clutter. Hovering slightly scales the text. Do not use for standalone primary actions. Retains full focus management for keyboard users."
    >
      <PreviewBlock code={buttonCode(textSource)} githubUrl={githubUrl}>
        <TextButtonExample />
      </PreviewBlock>
    </DocExample>

    <DocExample
      id="inverse"
      title="Inverse"
      description="Use this variant when placing a button on a dark or inverted background. It explicitly sets the button background to match the global text color, ensuring high visibility regardless of the current theme mode."
    >
      <PreviewBlock code={buttonCode(inverseSource)} githubUrl={githubUrl}>
        <div className="p-4 bg-(--lithos-text) rounded-(--lithos-radius) inline-block">
          <InverseButtonExample />
        </div>
      </PreviewBlock>
    </DocExample>

    <DocExample
      id="with-icon"
      title="With Icon"
      description="Use this to provide a visual cue alongside the text label for faster recognition. It renders an icon inline with the text via the iconLeft or iconRight props. Keep labels short. The icon is treated as decorative, ensuring the text label dictates screen reader accessibility. Hover and focus states match the underlying variant."
    >
      <PreviewBlock code={withIconCode} githubUrl={githubUrl}>
        <WithIconButtonsExample />
      </PreviewBlock>
    </DocExample>

    <DocExample
      id="icon"
      title="Icon"
      description="An icon-only button with no label — pass a single icon as children and set aria-label so the action stays announced to assistive tech. The square .lithos-click padding keeps it visually balanced."
    >
      <PreviewBlock code={iconCode} githubUrl={githubUrl}>
        <IconButtonExample />
      </PreviewBlock>
    </DocExample>

    <DocHeading id="button-group">Button Group</DocHeading>
    <Typography variant="p" className="mb-6 text-base text-(--lithos-text) max-w-3xl font-body opacity-80">
      <code>ButtonGroup</code> lays out <code>Button</code> primitives side by side or stacked. Pass{' '}
      <code>attached</code> to fuse adjacent buttons into a single hard-bordered strip.
    </Typography>

    <DocExample
      id="group-horizontal"
      title="Default"
      description="Default mode, buttons laid out side by side with margin-based spacing between them. The classic dialog footer pattern: a secondary Cancel next to the primary confirming action."
    >
      <PreviewBlock code={buttonCode(groupHorizontalSource, ['Button', 'ButtonGroup'])} githubUrl={githubUrl}>
        <HorizontalButtonGroupExample />
      </PreviewBlock>
    </DocExample>

    <DocExample
      id="group-vertical"
      title="Vertical"
      description={
        <>
          Set <code>mode="vertical"</code> to stack buttons instead — useful in narrow sidebars, mobile sheets, or
          anywhere horizontal space is tight.
        </>
      }
    >
      <PreviewBlock code={buttonCode(groupVerticalSource, ['Button', 'ButtonGroup'])} githubUrl={githubUrl}>
        <VerticalButtonGroupExample />
      </PreviewBlock>
    </DocExample>

    <DocExample
      id="group-attached"
      title="Attached"
      description="The attached flag collapses the shared border between buttons into a single fused strip and pops the hovered/focused button's shadow above its neighbors via z-10 — a segmented-control look without giving up individual Button semantics."
    >
      <PreviewBlock code={buttonCode(groupAttachedSource, ['Button', 'ButtonGroup'])} githubUrl={githubUrl}>
        <AttachedButtonGroupExample />
      </PreviewBlock>
    </DocExample>

    <DocSection>
      <DocHeading id="anatomy">Anatomy</DocHeading>
      <CodeViewer language="tsx" code={`<ButtonGroup>\n  <Button />\n  <Button />\n</ButtonGroup>`} />
    </DocSection>

    <DocSection>
      <DocHeading id="accessibility">Accessibility</DocHeading>
      <DocList>
        <li>
          Uses native <code>&lt;button&gt;</code> element for built-in keyboard navigation and screen reader support.
        </li>
        <li>Supports standard focus outlines provided by the browser.</li>
        <li>Maintains high contrast ratios for all intent variants.</li>
        <li>
          Disabled state accurately maps to the native <code>disabled</code> attribute.
        </li>
      </DocList>
    </DocSection>

    <DocSection>
      <DocHeading id="api">API Reference</DocHeading>
      <DocCallout className="mb-6">
        <strong>Note:</strong> Border radius is configurable globally via the <code>--lithos-radius</code> CSS token, or
        per-instance via <code>className</code> (e.g. <code>rounded-full</code>). No custom prop is required.
      </DocCallout>
      <PropsAccordion title="Button Props" data={buttonPropsData} />
      <PropsAccordion title="ButtonGroup Props" data={buttonGroupPropsData} />
    </DocSection>
  </div>
)
