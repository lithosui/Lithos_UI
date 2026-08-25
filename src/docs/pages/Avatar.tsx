import { PreviewBlock } from '../../components/ui/PreviewBlock'
import { CodeViewer } from '../../components/ui/CodeViewer'
import { Avatar, AvatarGroup } from '../../components/ui/Avatar'
import { PropsAccordion } from '../../components/ui/PropsTable'
import { SetupGuide } from '../layout/SetupGuide'
import { avatarPropsData, avatarGroupPropsData, avatarGroupCountPropsData } from '../propsData/avatar'

const githubUrl = 'https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/Avatar.tsx'

const namedUsers = [
  { src: 'https://picsum.photos/id/64/200', alt: 'Jane Doe' },
  { src: 'https://picsum.photos/id/91/200', alt: 'John Smith' },
  { src: 'https://picsum.photos/id/22/200', alt: 'Amy Lee' },
]

const restOfUsers = (from: number, to: number) =>
  Array.from({ length: to - from + 1 }, (_, i) => ({ alt: `User ${from + i}` }))

const tenUsers = [...namedUsers, ...restOfUsers(4, 10)]
const fourteenUsers = [...namedUsers, ...restOfUsers(4, 14)]

export const AvatarDoc = () => {
  const variantsCode = {
    body: `export const AvatarVariants = () => {
  return (
    <div className='flex items-center space-x-4'>
      {/* default: image */}
      <Avatar src="https://picsum.photos/200" alt="Jane Doe" />
      {/* default: no src, two-word alt falls back to double-letter initials */}
      <Avatar alt="Jane Doe" />
      {/* default: single-word alt falls back to single-letter initial */}
      <Avatar alt="Amy" />
      {/* solid: broken src falls back to initials */}
      <Avatar variant='solid' src="https://broken.example/404.png" alt="Jane Doe" />
    </div>
  )
}`,
    componentNames: ['Avatar'],
    manualPath: '../../components/ui/Avatar',
  }

  const sizesCode = {
    body: `export const AvatarSizes = () => {
  return (
    <div className='flex items-end space-x-4'>
      <Avatar size='sm' src="https://picsum.photos/200" alt="Jane Doe" />
      <Avatar size='md' src="https://picsum.photos/200" alt="Jane Doe" />
      <Avatar size='lg' src="https://picsum.photos/200" alt="Jane Doe" />
    </div>
  )
}`,
    componentNames: ['Avatar'],
    manualPath: '../../components/ui/Avatar',
  }

  const autoGroupTenCode = {
    body: `const users = [
  { src: 'https://picsum.photos/id/64/200', alt: 'Jane Doe' },
  { src: 'https://picsum.photos/id/91/200', alt: 'John Smith' },
  { src: 'https://picsum.photos/id/22/200', alt: 'Amy Lee' },
  /* ...7 more, no src -> initials fallback */
]

export const TenUserGroup = () => {
  // 10 users, max 4 shown -> renders 4 Avatars + a "+6" AvatarGroupCount
  return <AvatarGroup items={users} max={4} />
}`,
    componentNames: ['AvatarGroup'],
    manualPath: '../../components/ui/Avatar',
  }

  const autoGroupFourteenCode = {
    body: `const users = [
  { src: 'https://picsum.photos/id/64/200', alt: 'Jane Doe' },
  { src: 'https://picsum.photos/id/91/200', alt: 'John Smith' },
  { src: 'https://picsum.photos/id/22/200', alt: 'Amy Lee' },
  /* ...11 more, no src -> initials fallback */
]

export const FourteenUserGroup = () => {
  // 14 users, max 4 shown -> renders 4 Avatars + a "+10" AvatarGroupCount
  return <AvatarGroup items={users} max={4} />
}`,
    componentNames: ['AvatarGroup'],
    manualPath: '../../components/ui/Avatar',
  }

  return (
    <div className="max-w-5xl mx-auto px-6">
      <header className="mt-0">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none text-(--lithos-text) mb-8">
          Avatar
        </h1>
        <p className="mt-2 text-lg md:text-xl font-display opacity-70 text-(--lithos-text)">
          A hard-edge identity primitive that renders a picture and falls back to initials or custom content when none
          is available.
        </p>
        <hr className="border-t-2 border-(--lithos-border) mt-8 mb-8" />
      </header>

      <section className="mb-12">
        <p className="mb-8 text-lg md:text-xl text-(--lithos-text) max-w-3xl font-body">
          The Avatar is an atomic primitive designed to represent a user or entity. It swaps to its fallback
          automatically when the image fails to load.
        </p>
      </section>

      <div className="border-l-4 border-(--lithos-accent) pl-6 py-2 mb-8 bg-(--lithos-surface) p-4">
        <p className="text-sm font-bold font-body opacity-80 text-(--lithos-text)">
          Fallback initials are rendered whenever `src` is missing or the image fails to load — derived from `alt`. A
          single-word `alt` renders one letter; two or more words render the first letter of each of the first two
          words.
        </p>
      </div>

      <h2 id="installation" className="mt-12 mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
        Installation
      </h2>

      <SetupGuide
        componentNames={['Avatar', 'AvatarGroup', 'AvatarGroupCount']}
        manualPath="../../components/ui/Avatar"
        requires={['utils/cn.ts', 'utils/yiq.ts', 'core/useAccentColor.ts']}
      />

      <h2 id="anatomy" className="mt-12 mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
        Anatomy
      </h2>
      <div className="mb-12">
        <CodeViewer
          language="tsx"
          code={`<AvatarGroup items={items} max={4} />
{/* internally renders: */}
<div>
  <Avatar src={item.src} alt={item.alt} />
  {/* ...one per visible item, up to max */}
  <AvatarGroupCount count={overflow} />
  {/* only when items.length > max */}
</div>`}
        />
      </div>

      <h2 id="examples" className="mt-12 mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
        Examples
      </h2>

      <h3 id="variants" className="mb-4 text-xl font-black tracking-tight text-(--lithos-text)">
        States
      </h3>
      <p className="mb-4 text-base text-(--lithos-text) max-w-3xl font-body opacity-80">
        Use this to represent a user visually via an image or fallback initials. It renders a circular container with a
        2px border and shadow. If the <code>src</code> image fails to load or is missing, it automatically falls back to
        rendering initials derived from the <code>alt</code> text (up to two letters). No explicit interaction states
        exist unless wrapped in a button or link. Ensures accessibility by relying on the <code>alt</code> attribute for
        screen readers, which must contain the user's real name.
      </p>

      <div className="mt-8 mb-16">
        <PreviewBlock code={variantsCode} githubUrl={githubUrl}>
          <div className="flex items-center space-x-4">
            <Avatar src="https://picsum.photos/200" alt="Jane Doe" />
            <Avatar alt="Jane Doe" />
            <Avatar alt="Amy" />
            <Avatar variant="solid" src="https://broken.example/404.png" alt="Jane Doe" />
          </div>
        </PreviewBlock>
      </div>

      <h3 id="sizes" className="mb-4 text-xl font-black tracking-tight text-(--lithos-text)">
        Sizes
      </h3>
      <p className="mb-4 text-base text-(--lithos-text) max-w-3xl font-body opacity-80">
        Use the <code>size</code> prop to scale the avatar appropriately for the surrounding layout. It proportionately
        adjusts the circle diameter and the fallback initials font size (<code>sm</code> for dense lists or table rows,{' '}
        <code>md</code> for standard UI, <code>lg</code> for profile headers). Visual layout and border widths remain
        constant. Text limits are identical across sizes. Scaling does not affect structural accessibility.
      </p>

      <div className="mt-8 mb-16">
        <PreviewBlock code={sizesCode} githubUrl={githubUrl}>
          <div className="flex items-end space-x-4">
            <Avatar size="sm" src="https://picsum.photos/200" alt="Jane Doe" />
            <Avatar size="md" src="https://picsum.photos/200" alt="Jane Doe" />
            <Avatar size="lg" src="https://picsum.photos/200" alt="Jane Doe" />
          </div>
        </PreviewBlock>
      </div>

      <h3 id="group" className="mb-4 text-xl font-black tracking-tight text-(--lithos-text)">
        Group
      </h3>
      <p className="mb-4 text-base text-(--lithos-text) max-w-3xl font-body opacity-80">
        Use <code>AvatarGroup</code> to display a collection of related avatars in a condensed, overlapping stack. It
        renders up to a specified <code>max</code> number of avatars (default 4), automatically appending an{' '}
        <code>AvatarGroupCount</code> indicator for any remaining items. Hovering over a grouped avatar slightly
        elevates it. The overflow count indicator renders as plain text (e.g., <code>+2</code>), readable directly by
        assistive technologies without manual slicing.
      </p>

      <div className="mt-8 mb-8">
        <PreviewBlock code={autoGroupTenCode} githubUrl={githubUrl}>
          <AvatarGroup items={tenUsers} max={4} />
        </PreviewBlock>
      </div>

      <div className="mt-8 mb-16">
        <PreviewBlock code={autoGroupFourteenCode} githubUrl={githubUrl}>
          <AvatarGroup items={fourteenUsers} max={4} />
        </PreviewBlock>
      </div>

      <section className="mb-12">
        <h2 id="accessibility" className="mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
          Accessibility
        </h2>
        <ul className="list-disc pl-6 text-lg font-body text-(--lithos-text)">
          <li>
            The underlying <code>&lt;img&gt;</code> always carries the <code>alt</code> text passed to Avatar.
          </li>
          <li>
            When falling back to initials, the same <code>alt</code> text is the only accessible label — pass a real
            name, not decorative text.
          </li>
          <li>
            <code>solid</code> variant's text color is computed via the YIQ engine to keep contrast against the accent
            color.
          </li>
          <li>
            <code>AvatarGroupCount</code> renders as plain text (<code>+N</code>), readable by screen readers with no
            extra markup.
          </li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 id="api" className="mb-4 text-2xl font-black tracking-tight text-(--lithos-text)">
          API Reference
        </h2>
        <div className="mb-6 p-4 border-l-4 border-(--lithos-accent) bg-(--lithos-surface) text-sm font-body text-(--lithos-text)">
          <strong>Note:</strong> Avatars intentionally ignore the global <code>--lithos-radius</code> token to remain
          perfectly circular by design. You can still override this behavior manually via <code>className</code> if
          necessary.
        </div>
        <PropsAccordion title="Avatar Props" data={avatarPropsData} />
        <PropsAccordion title="AvatarGroupCount Props" data={avatarGroupCountPropsData} />
        <PropsAccordion title="AvatarGroup Props" data={avatarGroupPropsData} />
      </section>
    </div>
  )
}
