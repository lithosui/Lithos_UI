import { PreviewBlock } from '../../components/ui/PreviewBlock'
import { PropsAccordion } from '../../components/ui/PropsTable'
import { SetupGuide } from '../layout/SetupGuide'
import { alertPropsData } from '../propsData/alert'
import { removeImports } from '../examples/removeImports'
import { DocCallout, DocExample, DocHeader, DocHeading, DocLeadText, DocList, DocSection } from '../layout/DocPage'
import { FilledAlertsExample } from '../examples/alert/filled'
import filledSource from '../examples/alert/filled.tsx?raw'
import { OutlineAlertsExample } from '../examples/alert/outline'
import outlineSource from '../examples/alert/outline.tsx?raw'
import { AlertSizesExample } from '../examples/alert/sizes'
import sizesSource from '../examples/alert/sizes.tsx?raw'
import { TitlelessAlertExample } from '../examples/alert/noTitle'
import noTitleSource from '../examples/alert/noTitle.tsx?raw'
import { AlertActionsExample } from '../examples/alert/actions'
import actionsSource from '../examples/alert/actions.tsx?raw'
import { CustomColorAlertExample } from '../examples/alert/customColor'

const githubUrl = 'https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/Alert.tsx'
const alertCode = (source: string) => ({
  body: removeImports(source),
  componentNames: ['Alert'],
  manualPath: '../../components/ui/Alert',
})
const actionsCode = {
  body: removeImports(actionsSource),
  componentNames: ['useState', 'Alert', 'Button'],
  manualPath: {
    react: ['useState'],
    Alert: '../../components/ui/Alert',
    Button: '../../components/ui/Button',
  },
}
const customColorCode = {
  body: `export const CustomColorAlert = () => (
  <Alert size="md" color="#FF00FF" title="Custom">
    Custom color alert.
  </Alert>
)`,
  componentNames: ['Alert'],
  manualPath: '../../components/ui/Alert',
}

export const AlertDoc = () => (
  <div className="max-w-5xl mx-auto px-6">
    <DocHeader
      title="Alert"
      description="A structural plaque for inline messaging that supports distinct status colors."
    />

    <DocSection>
      <DocLeadText>
        The Alert is an atomic primitive designed for persistent, blocking, in-flow messaging. Unlike the Toast, it
        never floats and never auto-dismisses.
      </DocLeadText>
      <DocCallout>
        Alerts never dismiss themselves. The close and undo actions only appear when you pass <code>onClose</code>/
        <code>onUndo</code>, and it's on you to remove the Alert from your layout state.
      </DocCallout>
    </DocSection>

    <DocSection>
      <DocHeading id="installation">Installation</DocHeading>
      <SetupGuide
        componentNames={['Alert']}
        manualPath="../../components/ui/Alert"
        requires={[
          'utils/cn.ts',
          'utils/yiq.ts',
          'utils/colors.ts',
          'core/types.ts',
          'components/ui/Button.tsx',
          'components/ui/icons/IconUndo.tsx',
          'components/ui/icons/IconClose.tsx',
        ]}
      />
    </DocSection>

    <DocHeading id="examples">Examples</DocHeading>
    <DocExample
      id="filled"
      title="Filled"
      description={
        <>
          Use this for high-priority messages that demand immediate user attention. It renders with a solid background
          corresponding to its intent, automatically adjusting text and border colors for contrast. Restrict content to
          concise messages without complex child layouts. Root element carries <code>role="alert"</code>.
        </>
      }
    >
      <PreviewBlock code={alertCode(filledSource)} githubUrl={githubUrl}>
        <FilledAlertsExample />
      </PreviewBlock>
    </DocExample>

    <DocExample
      id="outline"
      title="Outline"
      description={
        <>
          Use this for medium-priority notifications that should remain visible without overpowering the surrounding
          page content. It renders with a transparent background, applying the intent color to the border, shadow, and
          text instead. Best suited for inline validation or standard informational messages. Root element carries{' '}
          <code>role="alert"</code>.
        </>
      }
    >
      <PreviewBlock code={alertCode(outlineSource)} githubUrl={githubUrl}>
        <OutlineAlertsExample />
      </PreviewBlock>
    </DocExample>

    <DocExample
      id="sizes"
      title="Sizes"
      description={
        <>
          Use the <code>size</code> prop to scale the alert appropriately for its context. It adjusts padding and
          typography together (<code>sm</code> for dense lists, <code>md</code> for inline flow, <code>lg</code> for
          page-level notices). There are no layout differences other than geometric scaling. Ensure text length remains
          proportional to the chosen size. Does not impact accessibility structure.
        </>
      }
    >
      <PreviewBlock code={alertCode(sizesSource)} githubUrl={githubUrl}>
        <AlertSizesExample />
      </PreviewBlock>
    </DocExample>

    <DocExample
      id="no-title"
      title="No title"
      description={
        <>
          Use this for a plain message-only plaque when the surrounding context already provides a label for the alert.
          Omitting the <code>title</code> prop restricts the component to a single text node without a heading element.
          Visuals remain identical minus the title block. Avoid using for critical errors where an explicit summary
          heading is necessary. Screen readers will read the message directly.
        </>
      }
    >
      <PreviewBlock code={alertCode(noTitleSource)} githubUrl={githubUrl}>
        <TitlelessAlertExample />
      </PreviewBlock>
    </DocExample>

    <DocExample
      id="actions"
      title="Actions"
      description={
        <>
          Use this to provide inline resolution for the alert condition. Pass <code>onClose</code> to render a dismiss
          button, or <code>onUndo</code> to render an undo button. The alert component itself does not manage its mount
          state; you must remove it from the DOM in the callback. Action buttons are strictly icon-only and are placed
          in the header. Rendered as native <code>&lt;button&gt;</code> elements with appropriate{' '}
          <code>aria-label</code>s for screen readers.
        </>
      }
    >
      <PreviewBlock code={actionsCode} githubUrl={githubUrl}>
        <AlertActionsExample />
      </PreviewBlock>
    </DocExample>

    <DocExample
      id="custom-color"
      title="Custom color"
      description={
        <>
          Use this when the predefined intents do not fit your brand or use case. Pass any valid hex code to the{' '}
          <code>color</code> prop to override the intent palette. The YIQ contrast engine guarantees that text and
          border colors automatically adjust for maximum readability against your custom background. Interaction and
          accessibility roles remain unchanged.
        </>
      }
    >
      <PreviewBlock code={customColorCode} githubUrl={githubUrl}>
        <CustomColorAlertExample />
      </PreviewBlock>
    </DocExample>

    <DocSection>
      <DocHeading id="accessibility">Accessibility</DocHeading>
      <DocList>
        <li>
          Root element carries <code>role="alert"</code> so assistive tech announces it on mount.
        </li>
        <li>
          Close/undo actions render as native <code>&lt;button&gt;</code>s with <code>aria-label</code> ("Close alert",
          "Undo") since they're icon-only.
        </li>
        <li>Foreground/background contrast is computed through the YIQ engine for both preset and custom colors.</li>
        <li>Never auto-dismisses, so it doesn't rely on timing that assistive tech users can't control.</li>
      </DocList>
    </DocSection>

    <DocSection>
      <DocHeading id="api">API Reference</DocHeading>
      <DocCallout className="mb-6">
        <strong>Note:</strong> Border radius is configurable globally via the <code>--lithos-radius</code> CSS token, or
        per-instance via <code>className</code> (e.g. <code>rounded-full</code>). No custom prop is required.
      </DocCallout>
      <PropsAccordion title="Alert Props" data={alertPropsData} />
    </DocSection>
  </div>
)
