import { PreviewBlock } from '../../components/ui/PreviewBlock'
import { PropsAccordion } from '../../components/ui/PropsTable'
import { SetupGuide } from '../layout/SetupGuide'
import { DocCallout, DocExample, DocHeader, DocHeading, DocLeadText, DocSection } from '../layout/DocPage'
import { marqueePropsData } from '../propsData/marquee'
import { removeImports } from '../examples/removeImports'
import { getComponentGithubUrl } from '../utils/githubUrl'

import { DefaultMarqueeExample } from '../examples/marquee/default'
import defaultSource from '../examples/marquee/default.tsx?raw'
import { MarqueeAccentExample } from '../examples/marquee/accent'
import accentSource from '../examples/marquee/accent.tsx?raw'
import { MarqueeWarningExample } from '../examples/marquee/warning'
import warningSource from '../examples/marquee/warning.tsx?raw'
import { MarqueeBorderedExample } from '../examples/marquee/bordered'
import borderedSource from '../examples/marquee/bordered.tsx?raw'
import { MarqueeGhostExample } from '../examples/marquee/ghost'
import ghostSource from '../examples/marquee/ghost.tsx?raw'
import { MarqueeSpeedExample } from '../examples/marquee/speed'
import speedSource from '../examples/marquee/speed.tsx?raw'
import { MarqueeDirectionExample } from '../examples/marquee/direction'
import directionSource from '../examples/marquee/direction.tsx?raw'
import { MarqueeInteractiveExample } from '../examples/marquee/interactive'
import interactiveSource from '../examples/marquee/interactive.tsx?raw'

const githubUrl = getComponentGithubUrl('marquee')
const marqueeCode = (source: string) => ({
  body: removeImports(source),
  componentNames: ['Marquee'],
  manualPath: '../../components/ui/Marquee',
})

export const MarqueeDoc = () => (
  <div className="max-w-5xl mx-auto px-6">
    <DocHeader
      title="Marquee"
      description="An infinite-loop scrolling ticker ribbon with pause-on-hover interaction, bidirectional motion, and neo-brutalist styling."
    />

    <DocSection>
      <DocLeadText>
        The Marquee component creates continuous scrolling ribbons, announcement tickers, and animated showcases.It uses
        hardware-accelerated dual-track translation for mathematical continuity without stutter or gap degradation.
      </DocLeadText>
      <DocCallout>
        Hovering over the Marquee automatically freezes the animation, enabling users to read announcements or interact
        with nested cards. Use the <code>noPause</code> prop to keep the ticker scrolling continuously.
      </DocCallout>
    </DocSection>

    <DocSection>
      <DocHeading id="installation">Installation</DocHeading>
      <SetupGuide
        slug="marquee"
        componentNames={['Marquee']}
        manualPath="../../components/ui/Marquee"
        requires={['core/types.ts', 'utils/cn.ts']}
      />
    </DocSection>

    <DocHeading id="examples">Examples</DocHeading>

    <DocExample
      id="default"
      title="Default"
      description="Standard horizontal continuous ticker ribbon featuring 2px brutalist borders, theme background tokens, and signature drop shadows."
    >
      <PreviewBlock code={marqueeCode(defaultSource)} githubUrl={githubUrl}>
        <DefaultMarqueeExample />
      </PreviewBlock>
    </DocExample>

    <DocExample
      id="accent"
      title="Accent"
      description="Flooded with the active theme accent color and automated contrast typography. Ideal for prominent announcements, key milestones, and high-impact brand statements."
    >
      <PreviewBlock code={marqueeCode(accentSource)} githubUrl={githubUrl}>
        <MarqueeAccentExample />
      </PreviewBlock>
    </DocExample>

    <DocExample
      id="warning"
      title="Warning"
      description="High-visibility safety warning ticker rendered in safety yellow with solid black typography. Ideal for urgent system banners, critical maintenance alerts, and unreleased package notices."
    >
      <PreviewBlock code={marqueeCode(warningSource)} githubUrl={githubUrl}>
        <MarqueeWarningExample />
      </PreviewBlock>
    </DocExample>

    <DocExample
      id="bordered"
      title="Bordered"
      description="Full-bleed continuous ribbon featuring top and bottom borders only, without lateral overflow. Designed for edge-to-edge section dividers and seamless content separators."
    >
      <PreviewBlock code={marqueeCode(borderedSource)} githubUrl={githubUrl}>
        <MarqueeBorderedExample />
      </PreviewBlock>
    </DocExample>

    <DocExample
      id="ghost"
      title="Ghost"
      description="Transparent, borderless variant that inherits the underlying page surface or strata pattern. Provides subtle, ambient motion without heavy container styling."
    >
      <PreviewBlock code={marqueeCode(ghostSource)} githubUrl={githubUrl}>
        <MarqueeGhostExample />
      </PreviewBlock>
    </DocExample>

    <DocExample
      id="speed"
      title="Speed"
      description="Controls the continuous translation velocity using calibrated presets or custom numeric durations. Includes slow (60s loop for relaxed reading), normal (36s loop default), and fast (18s loop for high-energy tickers)."
    >
      <PreviewBlock code={marqueeCode(speedSource)} githubUrl={githubUrl}>
        <MarqueeSpeedExample />
      </PreviewBlock>
    </DocExample>

    <DocExample
      id="direction"
      title="Direction"
      description="Supports bidirectional translation across the viewport. Set direction to 'left' for standard right-to-left scrolling, or 'right' for reverse left-to-right flow."
    >
      <PreviewBlock code={marqueeCode(directionSource)} githubUrl={githubUrl}>
        <MarqueeDirectionExample />
      </PreviewBlock>
    </DocExample>

    <DocExample
      id="interactive"
      title="Interactive"
      description="Embed interactive cards, badges, or buttons inside the track. Automatically freezes playback on hover and features edge-fade gradient masking (fadeEdges) for elegant lateral blending."
    >
      <PreviewBlock code={marqueeCode(interactiveSource)} githubUrl={githubUrl}>
        <MarqueeInteractiveExample />
      </PreviewBlock>
    </DocExample>

    <DocSection>
      <DocHeading id="api">API Reference</DocHeading>
      <PropsAccordion title="Marquee Props" data={marqueePropsData} />
    </DocSection>
  </div>
)
