import { PreviewBlock } from '../../components/ui/PreviewBlock'
import { PropsAccordion } from '../../components/ui/PropsTable'
import { SetupGuide } from '../layout/SetupGuide'
import { DocCallout, DocExample, DocHeader, DocHeading, DocList, DocSection, Code } from '../layout/DocPage'
import { sliderPropsData } from '../propsData/slider'
import { DefaultSliderExample } from '../examples/slider/default'
import { ControlledSliderExample } from '../examples/slider/controlled'
import { SteppedSliderExample } from '../examples/slider/steps'
import { SliderSizesExample } from '../examples/slider/sizes'
import defaultSource from '../examples/slider/default.tsx?raw'
import { IrregularSteppedSliderExample } from '../examples/slider/steps-irregular'
import irregularStepsSource from '../examples/slider/steps-irregular.tsx?raw'
import stepsSource from '../examples/slider/steps.tsx?raw'
import controlledSource from '../examples/slider/controlled.tsx?raw'
import { removeImports } from '../examples/removeImports'
import { DifficultySliderExample } from '../examples/slider/difficulty'
import { SliderShapesExample } from '../examples/slider/shapes'
import { AppBrightnessExample } from '../examples/slider/brightness'
import brightnessSource from '../examples/slider/brightness.tsx?raw'
import sizesSource from '../examples/slider/sizes.tsx?raw'
import shapesSource from '../examples/slider/shapes.tsx?raw'
import difficultySource from '../examples/slider/difficulty.tsx?raw'
import { RangeSliderExample } from '../examples/slider/range'
import { SliderOrientationExample } from '../examples/slider/orientation'
import orientationSource from '../examples/slider/orientation.tsx?raw'
import rangeSource from '../examples/slider/range.tsx?raw'

const githubUrl = 'https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/Slider.tsx'

export const SliderDoc = () => (
  <div className="max-w-5xl mx-auto px-6">
    <DocHeader title="Slider" description="A draggable input for picking a value or range." />
    <DocSection>
      <DocHeading id="installation">Installation</DocHeading>
      <SetupGuide
        slug="slider"
        componentNames={['Slider']}
        manualPath="../../components/ui/Slider"
        requires={['core/types.ts', 'utils/cn.ts', 'utils/yiq.ts']}
      />
      <DocCallout>
        Use React 19 and Tailwind CSS v4. Import your Tailwind stylesheet before <Code text="lithos-ui/tokens.css" />.
        Slider uses the global accent, border, surface, shadow, and radius tokens.
      </DocCallout>
    </DocSection>
    <DocHeading id="examples">Examples</DocHeading>
    <DocExample
      id="default"
      title="Default"
      description="An uncontrolled slider with a live percentage label. Set its starting value with defaultValue and update the label with onValueChange."
    >
      <PreviewBlock
        githubUrl={githubUrl}
        code={{
          body: removeImports(defaultSource),
          componentNames: ['Slider', 'useId', 'useState'],
          manualPath: { Slider: '../../components/ui/Slider', react: ['useId', 'useState'] },
        }}
      >
        <DefaultSliderExample />
      </PreviewBlock>
    </DocExample>
    <DocExample
      id="controlled"
      title="Controlled"
      description="Manage the slider value with React state and display the current percentage beside it."
    >
      <PreviewBlock
        githubUrl={githubUrl}
        code={{
          body: removeImports(controlledSource),
          componentNames: ['Slider', 'useState'],
          manualPath: { Slider: '../../components/ui/Slider', react: ['useState'] },
        }}
      >
        <ControlledSliderExample />
      </PreviewBlock>
    </DocExample>
    <DocSection>
      <DocHeading id="steps" level="h3">
        Stepped
      </DocHeading>
      <DocExample
        id="steps-twenty"
        title="Evenly Distributed"
        headingLevel="h4"
        description="Select 0, 20, 40, 60, 80, or 100 in equal increments. The thumb snaps to each labeled stop, and the selected stop is highlighted."
      >
        <PreviewBlock
          githubUrl={githubUrl}
          code={{
            body: removeImports(stepsSource),
            componentNames: ['Slider', 'useId', 'useState'],
            manualPath: { Slider: '../../components/ui/Slider', react: ['useId', 'useState'] },
          }}
        >
          <SteppedSliderExample />
        </PreviewBlock>
      </DocExample>
      <DocExample
        id="steps-irregular"
        title="Unevenly Distributed"
        headingLevel="h4"
        description="Drag the thumb to pick 0, 5, 15, 35, 65, or 100. The values have unequal increments, while their positions on the track are evenly spaced. Each stop selects one preset value."
      >
        <PreviewBlock
          githubUrl={githubUrl}
          code={{
            body: removeImports(irregularStepsSource),
            componentNames: ['Slider', 'useId', 'useState'],
            manualPath: { Slider: '../../components/ui/Slider', react: ['useId', 'useState'] },
          }}
        >
          <IrregularSteppedSliderExample />
        </PreviewBlock>
      </DocExample>
    </DocSection>
    <DocExample
      id="sizes"
      title="Sizes"
      description="Choose a small, medium, or large thumb. All sizes retain a 44px-tall input area."
    >
      <PreviewBlock
        githubUrl={githubUrl}
        code={{
          body: removeImports(sizesSource),
          componentNames: ['Slider'],
          manualPath: '../../components/ui/Slider',
        }}
      >
        <SliderSizesExample />
      </PreviewBlock>
    </DocExample>
    <DocExample
      id="shapes"
      title="Shapes"
      description="Choose square corners or a round track and thumb. Omit shape to follow the global radius token."
    >
      <PreviewBlock
        githubUrl={githubUrl}
        code={{
          body: removeImports(shapesSource),
          componentNames: ['Slider'],
          manualPath: '../../components/ui/Slider',
        }}
      >
        <SliderShapesExample />
      </PreviewBlock>
    </DocExample>
    <DocExample
      id="mode"
      title="Mode"
      description='Choose mode="horizontal" or mode="vertical". Focus the slider, then use Left/Right for horizontal controls or Up/Down for vertical controls. Vertical values increase from bottom to top.'
    >
      <PreviewBlock
        githubUrl={githubUrl}
        code={{
          body: removeImports(orientationSource),
          componentNames: ['Slider', 'useId', 'useState'],
          manualPath: { Slider: '../../components/ui/Slider', react: ['useId', 'useState'] },
        }}
      >
        <SliderOrientationExample />
      </PreviewBlock>
    </DocExample>
    <DocExample
      id="brightness"
      title="Filled"
      description="Control app brightness with icons inside or outside a filled track. Each example keeps its own value; the focused control sets the app brightness. The original brightness is restored when you leave the demo."
    >
      <PreviewBlock
        githubUrl={githubUrl}
        code={{
          body: removeImports(brightnessSource),
          componentNames: ['Slider', 'useState', 'useId', 'useEffect', 'LuSun', 'LuSunDim'],
          manualPath: {
            Slider: '../../components/ui/Slider',
            react: ['useState', 'useId', 'useEffect'],
            'react-icons/lu': ['LuSun', 'LuSunDim'],
          },
        }}
      >
        <AppBrightnessExample />
      </PreviewBlock>
    </DocExample>
    <DocExample
      id="range-slider"
      title="Range"
      description="Select a minimum and maximum percentage with two handles on one track. Drag a handle or focus it with Tab and use Left/Right. Values change by one percentage point, and the handles cannot cross."
    >
      <PreviewBlock
        githubUrl={githubUrl}
        code={{
          body: removeImports(rangeSource),
          componentNames: ['Slider', 'useRef', 'useState'],
          manualPath: { Slider: '../../components/ui/Slider', react: ['useRef', 'useState'] },
        }}
      >
        <RangeSliderExample />
      </PreviewBlock>
    </DocExample>
    <DocExample
      id="difficulty"
      title="Distribution"
      description="Drag the dividers to distribute 100% between Easy, Medium, and Hard. Shares change by one percentage point and always total 100%. Any share can be zero."
    >
      <PreviewBlock
        githubUrl={githubUrl}
        code={{
          body: removeImports(difficultySource),
          componentNames: ['Slider', 'useState'],
          manualPath: { Slider: '../../components/ui/Slider', react: ['useState'] },
        }}
      >
        <DifficultySliderExample />
      </PreviewBlock>
    </DocExample>
    <DocSection>
      <DocHeading id="accessibility">Accessibility</DocHeading>
      <DocList>
        <li>
          Provide a visible label with htmlFor/id, or use aria-label or aria-labelledby. Use aria-describedby for
          additional instructions.
        </li>
        <li>
          Tab focuses the control and shows a visible outline. Arrow keys adjust the value by step; Home and End select
          the minimum and maximum. Use Left/Right for horizontal sliders and Up/Down for vertical sliders. Direction
          follows native browser behavior and text direction.
        </li>
        <li>
          Native range semantics expose the current value and bounds to screen readers. Use aria-valuetext for units or
          human-readable descriptions. With step="any", the browser determines keyboard increments.
        </li>
        <li>
          Mouse and touch dragging use the browser's native range interaction. Disabled controls cannot be adjusted.
        </li>
        <li>
          Native forms submit the numeric value via name and reset uncontrolled sliders to defaultValue. Reset
          controlled values through your form's onReset handler.
        </li>
      </DocList>
      <DocCallout>
        This primitive is a single-value slider with horizontal and vertical orientations. For exact text entry, pair it
        with a labelled numeric input. The range input stays stationary during dragging; thumb shadows provide the
        hard-press feedback.
      </DocCallout>
    </DocSection>
    <DocSection>
      <DocHeading id="api">API Reference</DocHeading>
      <DocCallout>
        <Code text="mode" /> selects horizontal or vertical layout. Use <Code text="size" />, <Code text="shape" />, and{' '}
        <Code text="color" /> for their specific appearance settings. The native input <Code text="type" /> is fixed to{' '}
        <Code text="range" />. Slider has no semantic status states, so it does not expose <Code text="intent" />.
        Filled, distribution, and range examples compose the primitive; they are not <Code text="variant" /> values.
      </DocCallout>
      <PropsAccordion title="Slider Props" data={sliderPropsData} />
    </DocSection>
  </div>
)
