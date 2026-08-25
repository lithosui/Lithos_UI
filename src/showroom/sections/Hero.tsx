/**
 * @fileoverview Lithos UI hero slab.
 * - Opens the page with a zero-gap vertical anchor and a heavy terminal-style showcase.
 * - Utilizes the KineticGrid to create an interactive tracking environment.
 * - Keeps the opening rhythm controlled by explicit spacing math and centered containment.
 */
import { useNavigate } from 'react-router-dom'
import { KineticGrid } from '../../components/ui/KineticGrid'
import { Button } from '../../components/ui/Button'
import { getContrastText } from '../../utils/yiq'
import type { HexColor } from '../../core/types'

interface HeroProps {
  accentColor: string
  updateAccentColor: (color: HexColor) => void
}

const Hero = ({ accentColor, updateAccentColor }: HeroProps) => {
  const fgColor = getContrastText(accentColor)
  const navigate = useNavigate()

  return (
    <section id="top" className="border-b-2 border-(--lithos-border) bg-(--lithos-bg)">
      {/* Deploying the tracking engine to the main landing viewport */}
      <KineticGrid baseOpacity="opacity-10" className="py-12 md:py-24 w-full">
        <div className="mx-auto max-w-7xl px-6 w-full flex flex-col lg:flex-row items-center lg:items-start lg:justify-between">
          {/* Left Column: Copy & CTAs */}
          <div className="w-full lg:w-[55%] text-center lg:text-left flex flex-col items-center lg:items-start">
            <p className="mb-4 text-sm font-bold uppercase tracking-widest text-(--lithos-text) opacity-60">
              MIT LICENSED · ZERO DEPENDENCIES ON GAP
            </p>

            <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter leading-none md:text-7xl lg:text-8xl text-(--lithos-text)">
              BUILD FRONTENDS THAT REFUSE TO BREAK
            </h1>

            <h2 className="mt-4 text-3xl sm:text-4xl font-display md:text-5xl italic font-medium text-(--lithos-accent)">
              Free Forever
            </h2>

            <p className="mt-6 text-xl sm:text-2xl font-normal leading-tight text-(--lithos-text) md:text-3xl font-body max-w-2xl mx-auto lg:mx-0">
              No layout shift. No unreadable text on a bad accent color. No CSS specificity fights. Four systems{' '}
              {
                // @ts-expect-error - Custom ht tag
                <ht>built into every component</ht>
              }
              , working automatically — so the UI you shipped is still standing next quarter.
            </p>

            <p className="mt-4 text-sm sm:text-base font-bold text-(--lithos-text) opacity-50">
              Zero-Gap · YIQ Contrast Engine · Specificity Overrides · Physics Tokens
            </p>

            <div className="mt-10 flex flex-col items-center lg:items-start sm:flex-row flex-wrap">
              <Button variant="primary" onClick={() => navigate('/docs')} className="mb-4 sm:mb-0 sm:mr-6 px-4 py-2">
                Documentation
              </Button>
              <Button
                variant="secondary"
                onClick={() => window.open('https://github.com/lithosui/Lithos_UI', '_blank')}
                className="mb-4 sm:mb-0 px-4 py-2"
              >
                GitHub
              </Button>
            </div>
          </div>

          {/* Right Column: Live Theme Panel */}
          <div className="w-full lg:w-[40%] mt-16 lg:mt-48 flex justify-center lg:justify-end">
            <div className="relative border-4 border-(--lithos-border) bg-(--lithos-surface) p-6 w-full max-w-sm shadow-[6px_6px_0px_0px_var(--lithos-shadow)] rounded-(--lithos-radius)">
              {/* Architectural tick-marks */}
              <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-(--lithos-accent)" />
              <div className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-(--lithos-accent)" />
              <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-(--lithos-accent)" />
              <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-(--lithos-accent)" />

              <div className="flex justify-between items-center mb-6 border-b-2 border-(--lithos-border) pb-4">
                <h3 className="text-sm font-black uppercase tracking-widest text-(--lithos-text)">Live Theme Engine</h3>
                <span className="font-mono text-xs font-bold bg-(--lithos-bg) px-2 py-1 border-2 border-(--lithos-border) text-(--lithos-text)">
                  {accentColor}
                </span>
              </div>

              {/* Swatch → dimension line → mini browser mock, as one connected diagram */}
              <div className="flex items-center space-x-3">
                {/* Custom color trigger */}
                <div
                  className="relative h-20 w-20 shrink-0 lithos-click rounded-(--lithos-radius) overflow-hidden"
                  style={{ backgroundColor: accentColor }}
                >
                  <input
                    type="color"
                    value={accentColor}
                    onChange={(e) => updateAccentColor(e.target.value as HexColor)}
                    className="absolute inset-0 h-full w-full opacity-0 cursor-pointer z-10"
                    aria-label="Choose custom theme color"
                  />
                </div>

                {/* Dimension-line annotation */}
                <div className="flex-1 flex flex-col items-center justify-center min-w-6">
                  <span className="text-[9px] font-black uppercase tracking-widest text-(--lithos-text) opacity-50 mb-1 whitespace-nowrap">
                    Site-Wide
                  </span>
                  <div className="w-full border-t-2 border-dashed border-(--lithos-border) relative h-0">
                    <span className="absolute right-0 -top-1.75 text-(--lithos-border) text-xs leading-none">▶</span>
                  </div>
                </div>

                {/* Mini live browser mock */}
                <div className="w-28 shrink-0 border-2 border-(--lithos-border) bg-(--lithos-bg) rounded-(--lithos-radius) overflow-hidden">
                  <div className="flex items-center space-x-1 px-2 py-1.5 border-b-2 border-(--lithos-border) bg-(--lithos-surface)">
                    <span className="w-1.5 h-1.5 bg-(--lithos-border)" />
                    <span className="w-1.5 h-1.5 bg-(--lithos-border)" />
                    <span className="w-1.5 h-1.5 bg-(--lithos-border)" />
                  </div>
                  <div className="h-5 flex items-center px-2" style={{ backgroundColor: accentColor }}>
                    <div className="w-8 h-1.5" style={{ backgroundColor: fgColor, opacity: 0.85 }} />
                  </div>
                  <div className="p-2.5 flex flex-col items-start">
                    <div className="w-3/4 h-1.5 bg-(--lithos-text) opacity-20 mb-1" />
                    <div className="w-1/2 h-1.5 bg-(--lithos-text) opacity-20 mb-3" />
                    <div
                      className="px-2 py-1 text-[9px] font-black uppercase tracking-tight border-2 border-(--lithos-border) rounded-(--lithos-radius)"
                      style={{ backgroundColor: accentColor, color: fgColor }}
                    >
                      Action
                    </div>
                  </div>
                </div>
              </div>

              <p className="mt-6 text-xs font-bold text-(--lithos-text) opacity-50 text-center uppercase tracking-widest">
                One color. Every token updates instantly — site-wide.
              </p>
            </div>
          </div>
        </div>
      </KineticGrid>
    </section>
  )
}

export { Hero }
