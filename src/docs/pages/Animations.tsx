import { PreviewBlock } from '../../components/ui/PreviewBlock'
import { CodeViewer } from '../../components/ui/CodeViewer'
import { PropsAccordion } from '../../components/ui/PropsTable'
import {
  DocCallout,
  DocExample,
  DocHeader,
  DocHeading,
  DocLeadText,
  DocList,
  DocSection,
  Code,
} from '../layout/DocPage'
import { animationEffectData, animationMotionData, animationThemeApiData } from '../propsData/animations'
import { removeImports } from '../examples/removeImports'
import { AnimationMotionsExample } from '../examples/animations/motions'
import motionsSource from '../examples/animations/motions.tsx?raw'
import { AnimationEffectsExample } from '../examples/animations/effects'
import effectsSource from '../examples/animations/effects.tsx?raw'
import { AnimationCombinedExample } from '../examples/animations/combined'
import combinedSource from '../examples/animations/combined.tsx?raw'
import { AnimationThemeControlExample } from '../examples/animations/themeControl'
import themeControlSource from '../examples/animations/themeControl.tsx?raw'

const tokensGithubUrl = 'https://github.com/lithosui/Lithos_UI/blob/main/src/tokens.css'

export const AnimationsDoc = () => (
  <div className="mx-auto max-w-5xl px-6">
    <DocHeader
      title="Animations"
      description="Tactile neo-brutalist click physics and contrast-safe surface effects built directly into tokens.css."
    />

    <DocSection>
      <DocLeadText>
        Lithos UI ships all click physics and surface animations in <Code text="lithos-ui/tokens.css" /> inside{' '}
        <Code text="@layer components" />. There is zero JavaScript animation runtime overhead, and consumer Tailwind
        utilities always override cleanly.
      </DocLeadText>

      <DocCallout>
        <strong>Two ways to use today:</strong> switch presets globally via the Quick Theme Engine or{' '}
        <Code text="useTheme()" />, or apply classes like <Code text="lithos-sink" /> and <Code text="lithos-glint" />{' '}
        directly on <Code text="Button" /> or raw <Code text=".lithos-click" /> elements. Dedicated component props (
        <Code text='motion="sink"' />, <Code text='effect="glint"' />) are coming next.
      </DocCallout>

      <DocHeading id="setup">Setup</DocHeading>
      <p className="mb-4 text-base text-(--lithos-text) max-w-3xl font-body opacity-80">
        No extra package or provider configuration is required—every preset is ready as soon as your app imports{' '}
        <Code text="lithos-ui/tokens.css" /> after Tailwind CSS.
      </p>
      <CodeViewer language="tsx" code={`import './index.css'\nimport 'lithos-ui/tokens.css'`} />
    </DocSection>

    <DocHeading id="examples">Examples</DocHeading>

    <DocExample
      id="click-physics"
      title="Click & Hover Physics"
      description={
        <>
          Seven tactile interaction presets. <Code text="spring" /> is the default behavior on{' '}
          <Code text=".lithos-click" />; add any <Code text="lithos-*" /> class to override a specific control locally.
        </>
      }
    >
      <PreviewBlock
        githubUrl={tokensGithubUrl}
        code={{
          body: removeImports(motionsSource),
          componentNames: ['Button'],
          manualPath: '../../components/ui/Button',
        }}
      >
        <AnimationMotionsExample />
      </PreviewBlock>
    </DocExample>

    <DocExample
      id="surface-effects"
      title="Surface Effects"
      description="Contrast-safe gradients and patterns layered over any theme surface or accent color using currentColor and color-mix()."
    >
      <PreviewBlock
        githubUrl={tokensGithubUrl}
        code={{
          body: removeImports(effectsSource),
          componentNames: ['Button'],
          manualPath: '../../components/ui/Button',
        }}
      >
        <AnimationEffectsExample />
      </PreviewBlock>
    </DocExample>

    <DocExample
      id="combining"
      title="Combining Physics & Effects"
      description={
        <>
          Motion classes and surface effect classes compose independently—pair any physics class with any surface effect
          on <Code text="Button" /> (or alongside <Code text=".lithos-click" /> on custom elements).
        </>
      }
    >
      <PreviewBlock
        githubUrl={tokensGithubUrl}
        code={{
          body: removeImports(combinedSource),
          componentNames: ['Button'],
          manualPath: '../../components/ui/Button',
        }}
      >
        <AnimationCombinedExample />
      </PreviewBlock>
    </DocExample>

    <DocExample
      id="global-theme"
      title="Global Theme Control"
      description={
        <>
          Use <Code text="useTheme()" /> or the floating Quick Theme Engine to switch motion and surface effects across
          every <Code text=".lithos-click" /> element site-wide. Explicit per-element classes always win over the global
          preset.
        </>
      }
    >
      <PreviewBlock
        githubUrl="https://github.com/lithosui/Lithos_UI/blob/main/src/core/ThemeProvider.tsx"
        code={{
          body: removeImports(themeControlSource),
          componentNames: ['Button', 'useTheme'],
          manualPath: {
            others: '../../components/ui/Button',
            useTheme: '../../core/hooks/useTheme',
          },
        }}
      >
        <AnimationThemeControlExample />
      </PreviewBlock>
    </DocExample>

    <DocSection>
      <DocHeading id="accessibility">Accessibility</DocHeading>
      <DocList>
        <li>
          Respects <Code text="@media (prefers-reduced-motion: reduce)" /> globally by disabling transitions and
          keyframe animations across all <Code text=".lithos-*" /> classes.
        </li>
        <li>
          Hover and active transforms guard with <Code text=":not(:disabled)" /> so disabled controls stay stationary.
        </li>
        <li>
          Surface effects mix against <Code text="currentColor" /> and <Code text="--lithos-accent" /> so foreground
          contrast remains readable in both light and obsidian modes.
        </li>
      </DocList>
    </DocSection>

    <DocSection>
      <DocHeading id="reference">API Reference</DocHeading>
      <PropsAccordion title="Motion Classes" data={animationMotionData} />
      <PropsAccordion title="Surface Effect Classes" data={animationEffectData} />
      <PropsAccordion title="useTheme() Motion & Effect API" data={animationThemeApiData} />
    </DocSection>
  </div>
)
