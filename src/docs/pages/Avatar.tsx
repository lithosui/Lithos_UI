import { PreviewBlock } from '../../components/ui/PreviewBlock'
import { Avatar, AvatarGroup } from '../../components/ui/Avatar'
import { type PropItem, PropsAccordion } from '../../components/ui/PropsTable'

const avatarPropsData: PropItem[] = [
  {
    name: 'src',
    type: 'string',
    required: false,
    description: 'Image URL. Falls back to initials when missing or when the image fails to load.',
  },
  {
    name: 'alt',
    type: 'string',
    required: false,
    description: "Accessible label and initials source — one word yields one letter, two or more yield the first two words' initials.",
  },
  {
    name: 'variant',
    type: "'default' | 'solid'",
    defaultValue: "'default'",
    required: false,
    description: 'default uses the neutral surface color; solid fills with the theme accent color with computed contrast text.',
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    defaultValue: "'md'",
    required: false,
    description: 'Scales the circle diameter and initials font size.',
  },
  {
    name: 'className',
    type: 'string',
    required: false,
    description: 'Additional CSS classes.',
  },
]

const avatarGroupCountPropsData: PropItem[] = [
  {
    name: 'count',
    type: 'number',
    required: true,
    description: 'Number rendered as "+N", typically the overflow count at the end of an avatar stack.',
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    defaultValue: "'md'",
    required: false,
    description: 'Scales the circle diameter and font size to match adjacent Avatars.',
  },
  {
    name: 'className',
    type: 'string',
    required: false,
    description: 'Additional CSS classes.',
  },
]

const avatarGroupPropsData: PropItem[] = [
  {
    name: 'items',
    type: '{ src?: string; alt: string }[]',
    required: true,
    description: 'Full list to render. Items beyond max are collapsed into a single AvatarGroupCount.',
  },
  {
    name: 'max',
    type: 'number',
    defaultValue: '4',
    required: false,
    description: 'Number of Avatars shown before the rest are collapsed into a "+N" count.',
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    defaultValue: "'md'",
    required: false,
    description: 'Scales every Avatar and the AvatarGroupCount together.',
  },
  {
    name: 'className',
    type: 'string',
    required: false,
    description: 'Additional CSS classes.',
  },
]

export const AvatarDoc = () => {
  const variantsCode = `import { Avatar } from '../../components/ui/Avatar'

export const AvatarVariants = () => {
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
}`

  const sizesCode = `import { Avatar } from '../../components/ui/Avatar'

export const AvatarSizes = () => {
  return (
    <div className='flex items-end space-x-4'>
      <Avatar size='sm' src="https://picsum.photos/200" alt="Jane Doe" />
      <Avatar size='md' src="https://picsum.photos/200" alt="Jane Doe" />
      <Avatar size='lg' src="https://picsum.photos/200" alt="Jane Doe" />
    </div>
  )
}`

  const namedUsers = [
    { src: 'https://picsum.photos/id/64/200', alt: 'Jane Doe' },
    { src: 'https://picsum.photos/id/91/200', alt: 'John Smith' },
    { src: 'https://picsum.photos/id/22/200', alt: 'Amy Lee' },
  ]
  const restOfUsers = (from: number, to: number) =>
    Array.from({ length: to - from + 1 }, (_, i) => ({ alt: `User ${from + i}` }))

  const tenUsers = [...namedUsers, ...restOfUsers(4, 10)]
  const fourteenUsers = [...namedUsers, ...restOfUsers(4, 14)]

  const autoGroupTenCode = `import { AvatarGroup } from '../../components/ui/Avatar'

const users = [
  { src: 'https://picsum.photos/id/64/200', alt: 'Jane Doe' },
  { src: 'https://picsum.photos/id/91/200', alt: 'John Smith' },
  { src: 'https://picsum.photos/id/22/200', alt: 'Amy Lee' },
  /* ...7 more, no src -> initials fallback */
]

export const TenUserGroup = () => {
  // 10 users, max 4 shown -> renders 4 Avatars + a "+6" AvatarGroupCount
  return <AvatarGroup items={users} max={4} />
}`

  const autoGroupFourteenCode = `import { AvatarGroup } from '../../components/ui/Avatar'

const users = [
  { src: 'https://picsum.photos/id/64/200', alt: 'Jane Doe' },
  { src: 'https://picsum.photos/id/91/200', alt: 'John Smith' },
  { src: 'https://picsum.photos/id/22/200', alt: 'Amy Lee' },
  /* ...11 more, no src -> initials fallback */
]

export const FourteenUserGroup = () => {
  // 14 users, max 4 shown -> renders 4 Avatars + a "+10" AvatarGroupCount
  return <AvatarGroup items={users} max={4} />
}`

  return (
    <div className="max-w-5xl mx-auto px-6">
      <header className="mt-0">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none text-(--lithos-text) mb-8">
          Avatar
        </h1>
        <p className="mt-2 text-lg md:text-xl font-display opacity-70 text-(--lithos-text)">
          A hard-edge identity primitive that renders a picture and falls back to initials or custom content when none is available.
        </p>
        <hr className="border-t-2 border-(--lithos-border) mt-8 mb-8" />
      </header>

      <section className="mb-12">
        <p className="mb-8 text-lg md:text-xl text-(--lithos-text) max-w-3xl font-body">
          The Avatar is an atomic primitive designed to represent a user or entity. It swaps to its fallback automatically when the image fails to load.
        </p>
      </section>

      <div className="border-l-4 border-(--lithos-accent) pl-6 py-2 mb-8 bg-(--lithos-surface) p-4">
        <p className="text-sm font-bold font-body opacity-80 text-(--lithos-text)">
          Fallback initials are rendered whenever `src` is missing or the image fails to load — derived from `alt`. A single-word `alt` renders one letter; two or more words render the first letter of each of the first two words.
        </p>
      </div>

      <h2 id="examples" className="mt-12 mb-4 text-2xl font-black uppercase tracking-tight text-(--lithos-text)">
        Examples
      </h2>

      <h3 id="variants" className="mb-4 text-xl font-black uppercase tracking-tight text-(--lithos-text)">
        States
      </h3>
      <p className="mb-4 text-base text-(--lithos-text) max-w-3xl font-body opacity-80">
        Image, two-word initials, single-word initial, and the automatic fallback triggered by a broken{' '}
        <code>src</code> — same markup, no extra prop needed to opt into the fallback.
      </p>

      <div className="mt-8 mb-16">
        <PreviewBlock
          code={variantsCode}
          githubUrl="https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/Avatar.tsx"
        >
          <div className='flex items-center space-x-4'>
            <Avatar src="https://picsum.photos/200" alt="Jane Doe" />
            <Avatar alt="Jane Doe" />
            <Avatar alt="Amy" />
            <Avatar variant='solid' src="https://broken.example/404.png" alt="Jane Doe" />
          </div>
        </PreviewBlock>
      </div>

      <h3 id="sizes" className="mb-4 text-xl font-black uppercase tracking-tight text-(--lithos-text)">
        Sizes
      </h3>
      <p className="mb-4 text-base text-(--lithos-text) max-w-3xl font-body opacity-80">
        <code>size</code> scales the circle diameter and initials font together — <code>sm</code> for dense
        lists, <code>md</code> (default) for most contexts, <code>lg</code> for a profile header.
      </p>

      <div className="mt-8 mb-16">
        <PreviewBlock
          code={sizesCode}
          githubUrl="https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/Avatar.tsx"
        >
          <div className='flex items-end space-x-4'>
            <Avatar size='sm' src="https://picsum.photos/200" alt="Jane Doe" />
            <Avatar size='md' src="https://picsum.photos/200" alt="Jane Doe" />
            <Avatar size='lg' src="https://picsum.photos/200" alt="Jane Doe" />
          </div>
        </PreviewBlock>
      </div>

      <h3 id="group" className="mb-4 text-xl font-black uppercase tracking-tight text-(--lithos-text)">
        Group
      </h3>
      <p className="mb-4 text-base text-(--lithos-text) max-w-3xl font-body opacity-80">
        <code>AvatarGroup</code> takes the full <code>items</code> list and a <code>max</code> (default 4),
        renders only the first <code>max</code> Avatars, and appends an <code>AvatarGroupCount</code> for
        whatever's left — no manual slicing needed.
      </p>

      <div className="mt-8 mb-8">
        <PreviewBlock
          code={autoGroupTenCode}
          githubUrl="https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/Avatar.tsx"
        >
          <AvatarGroup items={tenUsers} max={4} />
        </PreviewBlock>
      </div>

      <div className="mt-8 mb-16">
        <PreviewBlock
          code={autoGroupFourteenCode}
          githubUrl="https://github.com/lithosui/Lithos_UI/blob/main/src/components/ui/Avatar.tsx"
        >
          <AvatarGroup items={fourteenUsers} max={4} />
        </PreviewBlock>
      </div>

      <h2 id="requires" className="mb-4 text-2xl font-black uppercase tracking-tight text-(--lithos-text)">
        Requires
      </h2>
      <ul className="list-disc pl-6 mb-12 text-lg font-body text-(--lithos-text)">
        <li><code>clsx</code> and <code>tailwind-merge</code> for class merging utility.</li>
        <li>The YIQ contrast engine in <code>src/utils/yiq.ts</code> for <code>solid</code> variant text color.</li>
        <li><code>useTheme</code> from <code>src/core/useTheme.ts</code> for the current accent color.</li>
      </ul>

      <section className="mb-12">
        <h2 id="accessibility" className="mb-4 text-2xl font-black uppercase tracking-tight text-(--lithos-text)">
          Accessibility
        </h2>
        <ul className="list-disc pl-6 text-lg font-body text-(--lithos-text)">
          <li>The underlying <code>&lt;img&gt;</code> always carries the <code>alt</code> text passed to Avatar.</li>
          <li>When falling back to initials, the same <code>alt</code> text is the only accessible label — pass a real name, not decorative text.</li>
          <li><code>solid</code> variant's text color is computed via the YIQ engine to keep contrast against the accent color.</li>
          <li><code>AvatarGroupCount</code> renders as plain text (<code>+N</code>), readable by screen readers with no extra markup.</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 id="api" className="mb-4 text-2xl font-black uppercase tracking-tight text-(--lithos-text)">
          API Reference
        </h2>
        <PropsAccordion title="Avatar Props" data={avatarPropsData} />
        <PropsAccordion title="AvatarGroupCount Props" data={avatarGroupCountPropsData} />
        <PropsAccordion title="AvatarGroup Props" data={avatarGroupPropsData} />
      </section>
    </div>
  )
}
