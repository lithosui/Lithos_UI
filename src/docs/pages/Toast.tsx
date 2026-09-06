import { useToast } from '../../core/hooks/useToast'
import { PreviewBlock } from '../../components/ui/PreviewBlock'
import { SetupGuide } from '../layout/SetupGuide'
import { Button } from '../../components/ui/Button'
import { PropsAccordion } from '../../components/ui/PropsTable'
import { CodeViewer } from '../../components/ui/CodeViewer'

import { toastPropsData, toastProviderPropsData } from '../propsData/toast'
import { ToastProvider } from '../../components/ui/Toast'
import type { ToastProps, ToastType } from '../../core/types'

const githubUrl = 'https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/Toast.tsx'

const defaultToastProps: ToastProps = {
  title: 'SYSTEM TOAST',
  message: 'Structural integrity verified.',
  intent: 'default',
}

const customToastProps: ToastProps = {
  title: 'SYSTEM TOAST',
  message: 'Structural integrity verified.',
  intent: 'accent',
  duration: 10000,
}

const CustomToastTriggerButton = () => {
  const toast = useToast()

  const triggerToast = () => {
    if (toast && toast.addToast) toast.addToast({ ...customToastProps })
  }

  return <Button onClick={triggerToast}>Trigger Toast</Button>
}

const PositionedToast = () => {
  return (
    <ToastProvider position="top-left">
      <CustomToastTriggerButton />
    </ToastProvider>
  )
}

const AllIntentsToast = () => {
  const toast = useToast()

  const intents: ToastType[] = ['default', 'success', 'error', 'warning', 'info', 'accent']

  return (
    <div className="-mb-4 -mr-4 flex flex-wrap">
      {intents.map((intent) => (
        <Button
          key={intent}
          onClick={() => {
            if (toast && toast.addToast) {
              toast.addToast({
                message: `This is a ${intent} toast notification.`,
                intent,
              })
            }
          }}
          className="capitalize mb-4 mr-4"
        >
          {intent}
        </Button>
      ))}
    </div>
  )
}

export const ToastDoc = () => {
  const toast = useToast()

  const triggerToast = () => {
    if (toast && toast.addToast) toast.addToast({ ...defaultToastProps })
  }

  const usageCode = {
    body: `export const DefaultToast = () => {
  const { addToast } = useToast()

  const triggerToast = () => {
    if (addToast) {
      addToast({
        title: 'SYSTEM TOAST',
        message: 'Structural integrity verified.',
        intent: 'default',
      })
    }
  }

  return (
    <Button onClick={triggerToast}>
      Trigger Toast
    </Button>
  )
}`,
    componentNames: ['ToastProvider', 'useToast', 'Button'],
    manualPath: {
      ToastProvider: '../../components/ui/Toast',
      useToast: '../../core/hooks/useToast',
      Button: '../../components/ui/Button',
    },
  }

  const positionedCode = {
    body: `export const CustomPositionToast = () => {
  const { addToast } = useToast()

  const triggerToast = () => {
    if (addToast) {
      addToast({
        title: 'SYSTEM TOAST',
        message: 'Structural integrity verified.',
        intent: 'accent',
        duration: 10000,
      })
    }
  }

  return (
    <Button onClick={triggerToast}>
      Trigger Toast
    </Button>
  )
}

export const App = () => {
  return (
    <ToastProvider position='top-left'>
      <CustomPositionToast />
    </ToastProvider>
  )
}`,
    componentNames: ['ToastProvider', 'useToast', 'Button'],
    manualPath: {
      ToastProvider: '../../components/ui/Toast',
      useToast: '../../core/hooks/useToast',
      Button: '../../components/ui/Button',
    },
  }

  const allIntentsCode = {
    body: `export const AllIntentsToast = () => {
  const { addToast } = useToast()
  
  const intents: ToastType[] = ['default', 'success', 'error', 'warning', 'info', 'accent']

  return (
    <div className="-mb-4 -mr-4 flex flex-wrap">
      {intents.map((intent) => (
        <Button 
          key={intent} 
          onClick={() => {
            if (addToast) {
              addToast({
                message: \`This is a \${intent} toast notification.\`,
                intent
              })
            }
          }}
          className="capitalize mb-4 mr-4"
        >
          {intent}
        </Button>
      ))}
    </div>
  )
}`,
    componentNames: ['useToast', 'Button'],
    manualPath: {
      useToast: '../../core/hooks/useToast',
      Button: '../../components/ui/Button',
    },
  }

  return (
    <div className="max-w-5xl mx-auto px-6">
      <header className="mt-0">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none text-(--lithos-text) mb-8">Toast</h1>
        <p className="mt-2 text-lg md:text-xl font-display opacity-70 text-(--lithos-text)">
          A transient feedback stack operating strictly outside the page flow.
        </p>
        <hr className="border-t-2 border-(--lithos-border) mt-8 mb-8" />
      </header>

      <section className="mb-12">
        <p className="mb-8 text-lg md:text-xl text-(--lithos-text) max-w-3xl font-body">
          The Toast primitive renders as a hard plaque rather than a soft notification card. It utilizes explicit
          margins and absolute positioning to guarantee it never shifts or breaks the underlying layout grid when
          mounting.
        </p>
      </section>

      <div className="border-l-4 border-(--lithos-accent) pl-6 py-2 mb-8 bg-(--lithos-surface) p-4">
        <p className="text-sm font-bold font-body opacity-80 text-(--lithos-text)">
          Click the button below to dispatch a toast to the fixed coordinate stack.
        </p>
      </div>

      <h2 id="installation" className="mt-12 mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
        Installation
      </h2>

      <SetupGuide
        componentNames={['ToastProvider', 'useToast', 'Button']}
        manualPath={{
          ToastProvider: '../../components/ui/Toast',
          useToast: '../../core/hooks/useToast',
          Button: '../../components/ui/Button',
        }}
        requires={[
          'components/ui/icons/IconClose.tsx',
          'components/ui/Button.tsx',
          'core/hooks/useToast.ts',
          'core/types.ts',
          'utils/colors.ts',
          'utils/yiq.ts',
          'utils/cn.ts',
        ]}
      />

      <h2 id="examples" className="mt-12 mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
        Examples
      </h2>

      <h3 id="default" className="mb-4 text-xl font-black tracking-tight text-(--lithos-text)">
        Default
      </h3>
      <p className="mb-4 text-base text-(--lithos-text) max-w-3xl font-body opacity-80">
        Use this to provide transient feedback after a user action, such as saving a form or confirming a deletion. It
        renders a temporary overlay notification in the bottom-right corner. Toasts automatically disappear after a set
        duration, but hovering pauses the timer. Ensure messages are brief. Inherits <code>role="status"</code> for
        polite screen reader announcements without stealing focus.
      </p>

      <PreviewBlock code={usageCode} githubUrl={githubUrl}>
        <Button onClick={triggerToast}>Trigger Toast</Button>
      </PreviewBlock>

      <h3 id="intents" className="mb-4 text-xl font-black tracking-tight text-(--lithos-text)">
        Intents
      </h3>
      <p className="mb-4 text-base text-(--lithos-text) max-w-3xl font-body opacity-80">
        Toasts support multiple semantic intents (<code>success</code>, <code>error</code>, <code>warning</code>,{' '}
        <code>info</code>, <code>default</code>, and <code>accent</code>) which automatically map to specific background
        colors and guarantee perfect text/shadow contrast in both light and dark themes.
      </p>

      <PreviewBlock code={allIntentsCode} githubUrl={githubUrl}>
        <AllIntentsToast />
      </PreviewBlock>

      <h3 id="custom-position" className="mb-4 text-xl font-black tracking-tight text-(--lithos-text)">
        Custom position
      </h3>
      <p className="mb-4 text-base text-(--lithos-text) max-w-3xl font-body opacity-80">
        Use this when the default bottom-right placement obscures critical UI elements on your specific page. It alters
        the fixed positioning coordinates (e.g., top-left, bottom-center) of the toast container. The structural layout
        and animations remain identical. Positioning choices do not impact accessibility order or DOM semantics.
      </p>

      <PreviewBlock code={positionedCode} githubUrl={githubUrl}>
        <PositionedToast />
      </PreviewBlock>

      <h2 id="anatomy" className="mt-12 mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
        Anatomy
      </h2>
      <div className="mb-12">
        <p className="mb-4 text-lg md:text-xl text-(--lithos-text) max-w-3xl font-body">
          Toasts require a global provider to wrap your application, enabling any nested component to dispatch
          notifications using the hook.
        </p>
        <CodeViewer
          language="tsx"
          code={`<ToastProvider>
  <App />
</ToastProvider>`}
        />
      </div>

      <section className="mb-12">
        <h2 id="accessibility" className="mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
          Accessibility
        </h2>
        <ul className="list-disc pl-6 text-lg font-body text-(--lithos-text)">
          <li>
            Uses <code>role="alert"</code> and <code>aria-live="assertive"</code> for error toasts so critical feedback
            is announced immediately to screen readers.
          </li>
          <li>
            Uses <code>role="status"</code> and <code>aria-live="polite"</code> for non-critical notifications (success,
            info, warning) to avoid interrupting ongoing screen reader speech.
          </li>
          <li>
            Automatically shifts focus to error notifications when mounted and restores focus to the previously active
            element upon dismissal.
          </li>
          <li>
            Pauses the auto-dismiss timer on hover, allowing users extra time to read or interact with the content.
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
        <PropsAccordion title="ToastProvider Props" data={toastProviderPropsData} />

        <div className="mt-8">
          <PropsAccordion title="addToast Options (ToastProps)" data={toastPropsData} />
        </div>
      </section>
    </div>
  )
}
