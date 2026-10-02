/**
 * @fileoverview Lithos UI PreviewBlock component.
 * - Displays a preview block with tabs for interactive preview and raw code.
 * - Resolves example code imports and usage blocks dynamically.
 * - Excluded from the public package as it's meant for docs tooling.
 */
import { useState, type ReactNode } from 'react'
import { cn, type LithosClass } from '../../utils/cn'
import { CodeViewer } from './CodeViewer'
import { Button } from './Button'
import { IconMonitor } from './icons/IconMonitor'
import { IconTablet } from './icons/IconTablet'
import { IconSmartphone } from './icons/IconSmartphone'
import { IconExternalLink } from './icons/IconExternalLink'
import { IconCode } from './icons/IconCode'
import { IconDownload } from './icons/IconDownload'
import { useInstallPreference } from '../../core/useInstallPreference'
import { deriveUsageCode, type ManualPath } from '../../docs/utils/deriveUsageCode'
import { getCliCommand } from '../../docs/utils/cliCommand'

type AvailableTabs = 'preview' | 'code'
type Breakpoint = 'mobile' | 'tablet' | 'desktop'

export interface PreviewBlockProps {
  code:
    | string
    | {
        body: string
        componentNames: string[]
        manualPath: ManualPath
      }
  githubUrl?: string
  language?: string
  height?: string
  noPadding?: boolean
  slug?: string
  previewBaseUrl?: string
  installGuide?: ReactNode
  children: ReactNode
  className?: LithosClass
}

// 1. Decoupled, floating tab classes relying purely on the primitive
const inactiveBtnClass =
  'lithos-click bg-(--lithos-surface) text-(--lithos-text) hover:bg-(--lithos-accent) hover:text-(--lithos-accent-text)'
const activeBtnClass = 'lithos-click bg-(--lithos-accent) text-(--lithos-accent-text)'

export const PreviewBlock = ({
  children,
  code,
  githubUrl,
  language = 'tsx',
  height,
  noPadding,
  slug,
  previewBaseUrl = '/blocks/preview',
  installGuide,
  className,
}: PreviewBlockProps) => {
  const [activeTab, setActiveTab] = useState<AvailableTabs>('preview')
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('desktop')
  const [showInstall, setShowInstall] = useState(false)
  const { installTab, packageManager } = useInstallPreference()

  const resolvedCode = typeof code === 'string' ? code : deriveUsageCode(code, installTab)
  const cliCommand = slug ? getCliCommand(packageManager, slug) : undefined

  const getIframeWidth = () => {
    if (breakpoint === 'mobile') return '375px'
    if (breakpoint === 'tablet') return '768px'
    return '100%'
  }

  return (
    <div
      className={cn(
        'mb-8 border-2 border-(--lithos-border) bg-(--lithos-bg) overflow-hidden transform-[translateZ(0)] rounded-(--lithos-radius)',
        className
      )}
    >
      {/* 2. Control Bar inside container */}
      <div className="flex flex-wrap items-center justify-between p-4 border-b-2 border-(--lithos-border) bg-(--lithos-surface)">
        <div className="flex flex-wrap items-center">
          <div className="flex items-center mr-4">
            <Button
              onClick={() => setActiveTab('preview')}
              className={cn('mr-4', activeTab !== 'preview' && inactiveBtnClass)}
            >
              Preview
            </Button>
            <Button onClick={() => setActiveTab('code')} className={activeTab !== 'code' ? inactiveBtnClass : ''}>
              Code
            </Button>
          </div>

          {slug && activeTab === 'preview' && (
            <div className="hidden md:flex items-center space-x-2 border-l-2 border-(--lithos-border) pl-4">
              <Button
                aria-label="Mobile"
                onClick={() => setBreakpoint('mobile')}
                className={breakpoint === 'mobile' ? activeBtnClass : inactiveBtnClass}
              >
                <IconSmartphone />
              </Button>
              <Button
                aria-label="Tablet"
                onClick={() => setBreakpoint('tablet')}
                className={breakpoint === 'tablet' ? activeBtnClass : inactiveBtnClass}
              >
                <IconTablet />
              </Button>
              <Button
                aria-label="Desktop"
                onClick={() => setBreakpoint('desktop')}
                className={breakpoint === 'desktop' ? activeBtnClass : inactiveBtnClass}
              >
                <IconMonitor />
              </Button>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-4">
          {installGuide && (
            <Button
              aria-label="Install"
              onClick={() => setShowInstall(!showInstall)}
              className={showInstall ? activeBtnClass : inactiveBtnClass}
            >
              <IconDownload />
            </Button>
          )}
          {slug && (
            <Button
              variant="secondary"
              onClick={() => window.open(`${previewBaseUrl}/${slug}`, '_blank')}
              aria-label="Open"
              className="inline-flex items-center justify-center hover:bg-(--lithos-accent) hover:text-(--lithos-accent-text)"
            >
              <IconExternalLink />
            </Button>
          )}
          {githubUrl ? (
            <Button
              variant="secondary"
              onClick={() => window.open(githubUrl, '_blank')}
              aria-label="Source"
              className="inline-flex items-center justify-center hover:bg-(--lithos-accent) hover:text-(--lithos-accent-text)"
            >
              <IconCode />
            </Button>
          ) : null}
        </div>
      </div>

      {/* Expandable Install Guide Panel */}
      {showInstall && installGuide && (
        <div className="border-b-2 border-(--lithos-border) bg-(--lithos-bg)">{installGuide}</div>
      )}

      {/* 3. Main Content Pane */}
      <div className="w-full bg-(--lithos-bg)" style={height ? { height: height } : undefined}>
        {activeTab === 'preview' ? (
          slug ? (
            <div className={cn('flex items-center justify-center w-full h-full', !noPadding && 'p-4 md:p-6')}>
              <div style={{ width: getIframeWidth() }} className="h-full transition-all duration-300">
                <iframe src={`${previewBaseUrl}/${slug}`} className="w-full h-full border-0" title="Block preview" />
              </div>
            </div>
          ) : (
            <div className={cn('flex min-h-48 items-center justify-center w-full h-full', !noPadding && 'p-4 md:p-6')}>
              {children}
            </div>
          )
        ) : (
          <div className="h-full w-full overflow-y-auto">
            <CodeViewer code={resolvedCode} language={language} embedded cliCommand={cliCommand ?? ''} />
          </div>
        )}
      </div>
    </div>
  )
}
