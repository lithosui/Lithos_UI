import { PreviewBlock } from '../../components/ui/PreviewBlock'
import { CodeViewer } from '../../components/ui/CodeViewer'
import { PropsAccordion } from '../../components/ui/PropsTable'
import { SetupGuide } from '../layout/SetupGuide'
import { avatarPropsData, avatarGroupPropsData, avatarGroupCountPropsData } from '../propsData/avatar'
import { removeImports } from '../examples/removeImports'
import { DocCallout, DocExample, DocHeader, DocHeading, DocLeadText, DocList, DocSection } from '../layout/DocPage'
import { AvatarVariantsExample } from '../examples/avatar/variants'
import variantsSource from '../examples/avatar/variants.tsx?raw'
import { AvatarSizesExample } from '../examples/avatar/sizes'
import sizesSource from '../examples/avatar/sizes.tsx?raw'
import { TenUserAvatarGroupExample } from '../examples/avatar/groupTen'
import groupTenSource from '../examples/avatar/groupTen.tsx?raw'
import { FourteenUserAvatarGroupExample } from '../examples/avatar/groupFourteen'
import groupFourteenSource from '../examples/avatar/groupFourteen.tsx?raw'

const githubUrl = 'https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/Avatar.tsx'
const avatarCode = (source: string, componentNames: string[]) => ({
  body: removeImports(source),
  componentNames,
  manualPath: '../../components/ui/Avatar',
})

export const AvatarDoc = () => (
  <div className="max-w-5xl mx-auto px-6">
    <DocHeader
      title="Avatar"
      description="A hard-edge identity primitive that renders a picture and falls back to initials or custom content when none is available."
    />

    <DocSection>
      <DocLeadText>
        The Avatar is an atomic primitive designed to represent a user or entity. It swaps to its fallback automatically
        when the image fails to load.
      </DocLeadText>
      <DocCallout>
        Fallback initials are rendered whenever <code>src</code> is missing or the image fails to load — derived from{' '}
        <code>alt</code>. A single-word <code>alt</code> renders one letter; two or more words render the first letter
        of each of the first two words.
      </DocCallout>
    </DocSection>

    <DocSection>
      <DocHeading id="installation">Installation</DocHeading>
      <SetupGuide
        slug="avatar"
        componentNames={['Avatar', 'AvatarGroup', 'AvatarGroupCount']}
        manualPath="../../components/ui/Avatar"
        requires={['utils/cn.ts', 'utils/yiq.ts', 'core/useAccentColor.ts']}
      />
    </DocSection>

    <DocHeading id="examples">Examples</DocHeading>
    <DocExample
      id="variants"
      title="States"
      description={
        <>
          Use this to represent a user visually via an image or fallback initials. It renders a circular container with
          a 2px border and shadow. If the <code>src</code> image fails to load or is missing, it automatically falls
          back to rendering initials derived from the <code>alt</code> text (up to two letters). No explicit interaction
          states exist unless wrapped in a button or link. Ensures accessibility by relying on the <code>alt</code>{' '}
          attribute for screen readers, which must contain the user's real name.
        </>
      }
    >
      <PreviewBlock code={avatarCode(variantsSource, ['Avatar'])} githubUrl={githubUrl}>
        <AvatarVariantsExample />
      </PreviewBlock>
    </DocExample>

    <DocExample
      id="sizes"
      title="Sizes"
      description={
        <>
          Use the <code>size</code> prop to scale the avatar appropriately for the surrounding layout. It
          proportionately adjusts the circle diameter and the fallback initials font size (<code>sm</code> for dense
          lists or table rows, <code>md</code> for standard UI, <code>lg</code> for profile headers). Visual layout and
          border widths remain constant. Text limits are identical across sizes. Scaling does not affect structural
          accessibility.
        </>
      }
    >
      <PreviewBlock code={avatarCode(sizesSource, ['Avatar'])} githubUrl={githubUrl}>
        <AvatarSizesExample />
      </PreviewBlock>
    </DocExample>

    <DocExample
      id="group"
      title="Group"
      description={
        <>
          Use <code>AvatarGroup</code> to display a collection of related avatars in a condensed, overlapping stack. It
          renders up to a specified <code>max</code> number of avatars (default 4), automatically appending an{' '}
          <code>AvatarGroupCount</code> indicator for any remaining items. The overflow count indicator renders as plain
          text (e.g., <code>+2</code>), readable directly by assistive technologies without manual slicing.
        </>
      }
    >
      <PreviewBlock code={avatarCode(groupTenSource, ['AvatarGroup'])} githubUrl={githubUrl}>
        <TenUserAvatarGroupExample />
      </PreviewBlock>
      <PreviewBlock code={avatarCode(groupFourteenSource, ['AvatarGroup'])} githubUrl={githubUrl}>
        <FourteenUserAvatarGroupExample />
      </PreviewBlock>
    </DocExample>

    <DocSection>
      <DocHeading id="anatomy">Anatomy</DocHeading>
      <CodeViewer
        language="tsx"
        code={`<Avatar />

<AvatarGroup>
  <Avatar />
  <AvatarGroupCount />
</AvatarGroup>`}
      />
    </DocSection>

    <DocSection>
      <DocHeading id="accessibility">Accessibility</DocHeading>
      <DocList>
        <li>
          The underlying <code>&lt;img&gt;</code> always carries the <code>alt</code> text passed to Avatar.
        </li>
        <li>
          When falling back to initials, the same <code>alt</code> text is the only accessible label — pass a real name,
          not decorative text.
        </li>
        <li>
          <code>solid</code> variant's text color is computed via the YIQ engine to keep contrast against the accent
          color.
        </li>
        <li>
          <code>AvatarGroupCount</code> renders as plain text (<code>+N</code>), readable by screen readers with no
          extra markup.
        </li>
      </DocList>
    </DocSection>

    <DocSection>
      <DocHeading id="api">API Reference</DocHeading>
      <DocCallout className="mb-6">
        Avatars intentionally ignore the global <code>--lithos-radius</code> token to remain perfectly circular by
        design. You can still override this behavior manually via <code>className</code> if necessary.
      </DocCallout>
      <PropsAccordion title="Avatar Props" data={avatarPropsData} />
      <PropsAccordion title="AvatarGroupCount Props" data={avatarGroupCountPropsData} />
      <PropsAccordion title="AvatarGroup Props" data={avatarGroupPropsData} />
    </DocSection>
  </div>
)
