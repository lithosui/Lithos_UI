import { useState, useMemo } from 'react'
import { PreviewBlock } from '../../components/ui/PreviewBlock'
import { CodeViewer } from '../../components/ui/CodeViewer'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { PropsAccordion } from '../../components/ui/PropsTable'
import { iconPropsData } from '../propsData/icons'
import { SetupGuide } from '../layout/SetupGuide'
import { DocHeader, DocHeading, DocExample, DocSection } from '../layout/DocPage'
import { removeImports } from '../examples/removeImports'

import { DefaultExample } from '../examples/icons/default'
import DefaultExampleSource from '../examples/icons/default?raw'
import { WithButtonExample } from '../examples/icons/withButton'
import WithButtonExampleSource from '../examples/icons/withButton?raw'
import { SizeAndStrokeExample } from '../examples/icons/sizeAndStroke'
import SizeAndStrokeExampleSource from '../examples/icons/sizeAndStroke?raw'
import { ColorAndTokenExample } from '../examples/icons/colorAndToken'
import ColorAndTokenExampleSource from '../examples/icons/colorAndToken?raw'

// Import all 44 icon components
import { IconAlertTriangle } from '../../components/ui/icons/IconAlertTriangle'
import { IconArrowDown } from '../../components/ui/icons/IconArrowDown'
import { IconArrowLeft } from '../../components/ui/icons/IconArrowLeft'
import { IconArrowRight } from '../../components/ui/icons/IconArrowRight'
import { IconArrowUp } from '../../components/ui/icons/IconArrowUp'
import { IconBreadcrumbSeparator } from '../../components/ui/icons/IconBreadcrumbSeparator'
import { IconCheck } from '../../components/ui/icons/IconCheck'
import { IconChevronDown } from '../../components/ui/icons/IconChevronDown'
import { IconChevronLeft } from '../../components/ui/icons/IconChevronLeft'
import { IconChevronUp } from '../../components/ui/icons/IconChevronUp'
import { IconCircle } from '../../components/ui/icons/IconCircle'
import { IconClose } from '../../components/ui/icons/IconClose'
import { IconCode } from '../../components/ui/icons/IconCode'
import { IconCopy } from '../../components/ui/icons/IconCopy'
import { IconDownload } from '../../components/ui/icons/IconDownload'
import { IconEdit } from '../../components/ui/icons/IconEdit'
import { IconExternalLink } from '../../components/ui/icons/IconExternalLink'
import { IconEye } from '../../components/ui/icons/IconEye'
import { IconFileText } from '../../components/ui/icons/IconFileText'
import { IconFolder } from '../../components/ui/icons/IconFolder'
import { IconHeart } from '../../components/ui/icons/IconHeart'
import { IconHeartOutline } from '../../components/ui/icons/IconHeartOutline'
import { IconHome } from '../../components/ui/icons/IconHome'
import { IconMaximize } from '../../components/ui/icons/IconMaximize'
import { IconMenu } from '../../components/ui/icons/IconMenu'
import { IconMinimize } from '../../components/ui/icons/IconMinimize'
import { IconMinus } from '../../components/ui/icons/IconMinus'
import { IconMonitor } from '../../components/ui/icons/IconMonitor'
import { IconMoreHorizontal } from '../../components/ui/icons/IconMoreHorizontal'
import { IconRadiusLg } from '../../components/ui/icons/IconRadiusLg'
import { IconRadiusMd } from '../../components/ui/icons/IconRadiusMd'
import { IconRadiusNone } from '../../components/ui/icons/IconRadiusNone'
import { IconRadiusSm } from '../../components/ui/icons/IconRadiusSm'
import { IconRedo } from '../../components/ui/icons/IconRedo'
import { IconRefreshCcw } from '../../components/ui/icons/IconRefreshCcw'
import { IconRotateCcw } from '../../components/ui/icons/IconRotateCcw'
import { IconSearch } from '../../components/ui/icons/IconSearch'
import { IconSettings } from '../../components/ui/icons/IconSettings'
import { IconSidebar } from '../../components/ui/icons/IconSidebar'
import { IconSmartphone } from '../../components/ui/icons/IconSmartphone'
import { IconTablet } from '../../components/ui/icons/IconTablet'
import { IconTrash } from '../../components/ui/icons/IconTrash'
import { IconUndo } from '../../components/ui/icons/IconUndo'
import { IconUpload } from '../../components/ui/icons/IconUpload'

const githubUrl = 'https://github.com/lithosui/Lithos_UI/tree/main/src/components/ui/icons'

interface IconItem {
  name: string

  Component: React.ComponentType<{
    size?: number | string
    strokeWidth?: number | string
    color?: string
    className?: string
    fill?: string
  }>

  tags: string[]
}

const ALL_ICONS: IconItem[] = [
  { name: 'IconAlertTriangle', Component: IconAlertTriangle, tags: ['alert', 'warning', 'triangle', 'caution'] },
  { name: 'IconArrowDown', Component: IconArrowDown, tags: ['arrow', 'down', 'navigation', 'direction'] },
  { name: 'IconArrowLeft', Component: IconArrowLeft, tags: ['arrow', 'left', 'back', 'navigation', 'direction'] },
  { name: 'IconArrowRight', Component: IconArrowRight, tags: ['arrow', 'right', 'forward', 'navigation', 'direction'] },
  { name: 'IconArrowUp', Component: IconArrowUp, tags: ['arrow', 'up', 'navigation', 'direction'] },
  {
    name: 'IconBreadcrumbSeparator',
    Component: IconBreadcrumbSeparator,
    tags: ['breadcrumb', 'separator', 'slash', 'divider'],
  },
  { name: 'IconCheck', Component: IconCheck, tags: ['check', 'success', 'tick', 'mark', 'done'] },
  { name: 'IconChevronDown', Component: IconChevronDown, tags: ['chevron', 'down', 'dropdown', 'accordion'] },
  { name: 'IconChevronLeft', Component: IconChevronLeft, tags: ['chevron', 'left', 'back'] },
  { name: 'IconChevronUp', Component: IconChevronUp, tags: ['chevron', 'up', 'collapse'] },
  { name: 'IconCircle', Component: IconCircle, tags: ['circle', 'shape', 'round', 'dot'] },
  { name: 'IconClose', Component: IconClose, tags: ['close', 'x', 'cancel', 'cross', 'delete'] },
  { name: 'IconCode', Component: IconCode, tags: ['code', 'developer', 'xml', 'brackets'] },
  { name: 'IconCopy', Component: IconCopy, tags: ['copy', 'clipboard', 'duplicate'] },
  { name: 'IconDownload', Component: IconDownload, tags: ['download', 'save', 'arrow', 'export'] },
  { name: 'IconEdit', Component: IconEdit, tags: ['edit', 'pencil', 'write', 'modify'] },
  { name: 'IconExternalLink', Component: IconExternalLink, tags: ['external', 'link', 'out', 'share', 'open'] },
  { name: 'IconEye', Component: IconEye, tags: ['eye', 'view', 'visibility', 'preview'] },
  { name: 'IconFileText', Component: IconFileText, tags: ['file', 'text', 'document', 'page'] },
  { name: 'IconFolder', Component: IconFolder, tags: ['folder', 'directory', 'storage'] },
  { name: 'IconHeart', Component: IconHeart, tags: ['heart', 'like', 'love', 'favorite'] },
  { name: 'IconHeartOutline', Component: IconHeartOutline, tags: ['heart', 'outline', 'love', 'favorite'] },
  { name: 'IconHome', Component: IconHome, tags: ['home', 'house', 'dashboard', 'index'] },
  { name: 'IconMaximize', Component: IconMaximize, tags: ['maximize', 'fullscreen', 'expand'] },
  { name: 'IconMenu', Component: IconMenu, tags: ['menu', 'hamburger', 'navigation', 'sidebar'] },
  { name: 'IconMinimize', Component: IconMinimize, tags: ['minimize', 'exit-fullscreen', 'collapse'] },
  { name: 'IconMinus', Component: IconMinus, tags: ['minus', 'dash', 'remove', 'subtract'] },
  { name: 'IconMonitor', Component: IconMonitor, tags: ['monitor', 'screen', 'desktop', 'display'] },
  {
    name: 'IconMoreHorizontal',
    Component: IconMoreHorizontal,
    tags: ['more', 'horizontal', 'dots', 'menu', 'options'],
  },
  { name: 'IconRadiusLg', Component: IconRadiusLg, tags: ['radius', 'large', 'pill', 'circle', 'round'] },
  { name: 'IconRadiusMd', Component: IconRadiusMd, tags: ['radius', 'medium', 'round'] },
  { name: 'IconRadiusNone', Component: IconRadiusNone, tags: ['radius', 'none', 'sharp', 'square'] },
  { name: 'IconRadiusSm', Component: IconRadiusSm, tags: ['radius', 'small', 'round'] },
  { name: 'IconRedo', Component: IconRedo, tags: ['redo', 'forward', 'repeat', 'arrow'] },
  { name: 'IconRefreshCcw', Component: IconRefreshCcw, tags: ['refresh', 'reload', 'sync', 'ccw'] },
  { name: 'IconRotateCcw', Component: IconRotateCcw, tags: ['rotate', 'ccw', 'counterclockwise', 'history'] },
  { name: 'IconSearch', Component: IconSearch, tags: ['search', 'find', 'lookup', 'magnifier'] },
  { name: 'IconSettings', Component: IconSettings, tags: ['settings', 'gear', 'preferences', 'config'] },
  { name: 'IconSidebar', Component: IconSidebar, tags: ['sidebar', 'layout', 'panel', 'navigation'] },
  { name: 'IconSmartphone', Component: IconSmartphone, tags: ['smartphone', 'phone', 'mobile', 'device'] },
  { name: 'IconTablet', Component: IconTablet, tags: ['tablet', 'ipad', 'device'] },
  { name: 'IconTrash', Component: IconTrash, tags: ['trash', 'delete', 'remove', 'bin'] },
  { name: 'IconUndo', Component: IconUndo, tags: ['undo', 'back', 'history', 'arrow'] },
  { name: 'IconUpload', Component: IconUpload, tags: ['upload', 'send', 'arrow', 'cloud'] },
]

/**
 * Documentation page for Lithos UI icons and interactive gallery explorer.
 */
export const IconsDoc = () => {
  const [search, setSearch] = useState('')
  const [previewSize, setPreviewSize] = useState(16)
  const [previewStroke, setPreviewStroke] = useState(2)
  const [copiedIcon, setCopiedIcon] = useState<string | null>(null)
  const [isExpanded, setIsExpanded] = useState(false)

  const filteredIcons = useMemo(() => {
    const q = search.toLowerCase().trim()
    if (!q) return ALL_ICONS
    return ALL_ICONS.filter(
      (icon) => icon.name.toLowerCase().includes(q) || icon.tags.some((tag) => tag.toLowerCase().includes(q))
    )
  }, [search])

  const isSearching = search.trim().length > 0

  const displayedIcons = useMemo(() => {
    if (isSearching || isExpanded) {
      return filteredIcons
    }
    return filteredIcons.slice(0, 6)
  }, [filteredIcons, isSearching, isExpanded])

  const handleCopy = (iconName: string) => {
    navigator.clipboard.writeText(`<${iconName} />`)
    setCopiedIcon(iconName)
    setTimeout(() => {
      setCopiedIcon((current) => (current === iconName ? null : current))
    }, 1800)
  }

  const manualPath = '../../components/ui/icons/IconArrowRight'

  const usageCode = {
    body: removeImports(DefaultExampleSource),
    componentNames: ['IconArrowRight', 'IconHeart', 'IconSettings'],
    manualPath,
  }

  const withButtonCode = {
    body: removeImports(WithButtonExampleSource),
    componentNames: ['Button', 'IconDownload', 'IconExternalLink', 'IconTrash'],
    manualPath: '../../components/ui/icons/IconDownload',
  }

  const strokeAndSizeCode = {
    body: removeImports(SizeAndStrokeExampleSource),
    componentNames: ['IconSearch'],
    manualPath: '../../components/ui/icons/IconSearch',
  }

  const colorCode = {
    body: removeImports(ColorAndTokenExampleSource),
    componentNames: ['IconHeart', 'IconCheck', 'IconAlertTriangle'],
    manualPath: '../../components/ui/icons/IconHeart',
  }

  return (
    <div className="max-w-5xl mx-auto px-6">
      <DocHeader
        title="Icons"
        description={
          <>
            A standardized wrapper around <code>react-icons</code> with preset geometry, stroke widths, and design token
            support.
          </>
        }
      />

      {/* Setup Guide */}
      <DocSection>
        <DocHeading id="installation">Installation</DocHeading>
        <SetupGuide
          componentNames={['IconArrowRight', 'IconHeart', 'IconSettings']}
          manualPath={manualPath}
          slug="icons"
        />
      </DocSection>

      {/* Interactive Gallery Explorer Section */}
      <section className="mt-12 mb-16">
        <div className="border-4 border-(--lithos-border) bg-(--lithos-surface) p-6 rounded-(--lithos-radius) shadow-[8px_8px_0_0_var(--lithos-shadow)]">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b-2 border-(--lithos-border) space-y-4 md:space-y-0">
            <div>
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 bg-(--lithos-accent) border border-(--lithos-border) rounded-full inline-block animate-pulse" />
                <h2 id="gallery" className="text-base font-black uppercase tracking-wider text-(--lithos-text)">
                  Gallery Explorer
                </h2>
              </div>
              <p className="text-xs font-mono font-bold text-(--lithos-text) opacity-60 mt-1">
                Click any card to copy its JSX tag.
              </p>
            </div>

            <Badge intent="accent" className="self-start md:self-auto">
              {displayedIcons.length} / {filteredIcons.length} ICONS
            </Badge>
          </div>

          {/* Explorer Controls: Search & Live Adjusters */}
          <div className="mt-6 flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search icons by name or tag (e.g. arrow, chevron, alert)..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-3.5 py-2 text-xs font-mono font-bold bg-(--lithos-bg) border-2 border-(--lithos-border) rounded-(--lithos-radius) text-(--lithos-text) placeholder:opacity-40 focus:outline-none focus:border-(--lithos-accent)"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch('')}
                  aria-label="Clear search query"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs font-black text-(--lithos-text) opacity-60 hover:opacity-100"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Quick Sizing and Stroke Controls */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-mono font-bold uppercase opacity-70">Size:</span>
                <div className="flex border-2 border-(--lithos-border) rounded-(--lithos-radius) overflow-hidden shadow-[2px_2px_0_0_var(--lithos-shadow)]">
                  {[16, 20, 24, 32].map((s, idx) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setPreviewSize(s)}
                      className={`px-2 py-1 text-[10px] font-mono font-bold transition-colors cursor-pointer ${
                        idx !== 0 ? 'border-l-2 border-(--lithos-border)' : ''
                      } ${
                        previewSize === s
                          ? 'bg-(--lithos-accent) text-(--lithos-accent-text)'
                          : 'bg-(--lithos-bg) text-(--lithos-text) hover:bg-(--lithos-surface)'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-mono font-bold uppercase opacity-70">Stroke:</span>
                <div className="flex border-2 border-(--lithos-border) rounded-(--lithos-radius) overflow-hidden shadow-[2px_2px_0_0_var(--lithos-shadow)]">
                  {[2, 3, 4].map((st, idx) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setPreviewStroke(st)}
                      className={`px-2 py-1 text-[10px] font-mono font-bold transition-colors cursor-pointer ${
                        idx !== 0 ? 'border-l-2 border-(--lithos-border)' : ''
                      } ${
                        previewStroke === st
                          ? 'bg-(--lithos-accent) text-(--lithos-accent-text)'
                          : 'bg-(--lithos-bg) text-(--lithos-text) hover:bg-(--lithos-surface)'
                      }`}
                    >
                      {st}px
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Grid of Icon Cards (Zero-Gap compliant) */}
          <div className="mt-6 flex flex-wrap -m-1.5">
            {displayedIcons.map(({ name, Component }) => {
              const isCopied = copiedIcon === name
              return (
                <div key={name} className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 p-1.5">
                  <button
                    type="button"
                    onClick={() => handleCopy(name)}
                    title={`Click to copy <${name} />`}
                    className="w-full group relative flex flex-col items-center justify-center p-3 border-2 border-(--lithos-border) bg-(--lithos-bg) hover:bg-(--lithos-surface) rounded-(--lithos-radius) shadow-[2px_2px_0_0_var(--lithos-shadow)] hover:shadow-[4px_4px_0_0_var(--lithos-shadow)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer min-h-[96px]"
                  >
                    {isCopied && (
                      <span className="absolute top-1.5 right-1.5 px-1.5 py-0.5 text-[9px] font-mono font-black uppercase bg-(--lithos-accent) text-(--lithos-accent-text) border border-(--lithos-border) rounded-(--lithos-radius) shadow-[1px_1px_0_0_var(--lithos-shadow)] z-10 animate-fade-in">
                        COPIED!
                      </span>
                    )}
                    <div className="flex items-center justify-center h-10 w-10 text-(--lithos-text) group-hover:text-(--lithos-accent) transition-colors">
                      <Component size={previewSize} strokeWidth={previewStroke} />
                    </div>
                    <span className="mt-2 text-[11px] font-mono font-bold text-center text-(--lithos-text) truncate w-full px-1">
                      {name}
                    </span>
                  </button>
                </div>
              )
            })}
          </div>

          {/* View More / Show Less Button using Lithos Button primitive */}
          {!isSearching && filteredIcons.length > 10 && (
            <div className="mt-8 flex justify-center">
              <Button
                variant="secondary"
                onClick={() => setIsExpanded(!isExpanded)}
                className="cursor-pointer text-xs font-mono font-bold uppercase tracking-wider px-5 py-2"
              >
                {isExpanded ? 'Show Less' : 'View More'}
              </Button>
            </div>
          )}

          {filteredIcons.length === 0 && (
            <div className="py-12 text-center text-sm font-mono font-bold text-(--lithos-text) opacity-60">
              No icons found matching "{search}".
            </div>
          )}
        </div>
      </section>

      {/* Code Examples */}
      <DocHeading id="examples">Examples</DocHeading>

      <DocExample
        id="usage"
        title="Usage"
        description={
          <>
            Import icon primitives directly and control dimensions with the <code>size</code> prop.
          </>
        }
      >
        <PreviewBlock code={usageCode} githubUrl={githubUrl}>
          <DefaultExample />
        </PreviewBlock>
      </DocExample>

      <DocExample
        id="with-buttons"
        title="With Button"
        description={
          <>
            Pairs with <code>Button</code> via <code>iconLeft</code> and <code>iconRight</code>, inheriting button
            states and colors.
          </>
        }
      >
        <PreviewBlock code={withButtonCode} githubUrl={githubUrl}>
          <WithButtonExample />
        </PreviewBlock>
      </DocExample>

      <DocExample
        id="strokes-and-sizes"
        title="Size & Stroke"
        description={
          <>
            Control stroke weight with <code>strokeWidth</code> and dimensions with <code>size</code>.
          </>
        }
      >
        <PreviewBlock code={strokeAndSizeCode} githubUrl={githubUrl}>
          <SizeAndStrokeExample />
        </PreviewBlock>
      </DocExample>

      <DocExample
        id="colors"
        title="Color & Token"
        description={
          <>
            Icons inherit <code>currentColor</code> by default, or accept custom colors and token classes.
          </>
        }
      >
        <PreviewBlock code={colorCode} githubUrl={githubUrl}>
          <ColorAndTokenExample />
        </PreviewBlock>
      </DocExample>

      {/* Anatomy */}
      <DocSection>
        <DocHeading id="anatomy">Anatomy</DocHeading>
        <CodeViewer language="tsx" code={`<IconArrowRight size={16} strokeWidth={2} />`} />
      </DocSection>

      {/* Props Reference */}
      <DocSection>
        <DocHeading id="props">API Reference</DocHeading>
        <PropsAccordion title="Icon Props" data={iconPropsData} />
      </DocSection>
    </div>
  )
}
