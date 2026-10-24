/**
 * @fileoverview Lithos UI token laboratory.
 * - Rebinds accent and contrast tokens at the cascade root so the whole system moves together.
 * - Uses YIQ contrast selection to keep the swatches legible across bright and dark colors.
 * - Treats the palette as a physical control board with hard tiles and explicit offsets.
 */
import type { HexColor } from '../../core/types'
import { Button } from '../../components/ui/Button'
import { IconRadiusNone } from '../../components/ui/icons/IconRadiusNone'
import { IconRadiusSm } from '../../components/ui/icons/IconRadiusSm'
import { IconRadiusMd } from '../../components/ui/icons/IconRadiusMd'
import { IconRadiusLg } from '../../components/ui/icons/IconRadiusLg'
import { useTheme } from '../../core/hooks/useTheme'

interface ThemeColor {
  name: string
  hex: string
}

const themes: ThemeColor[] = [
  { name: 'Cyan', hex: '#00FFFF' },
  { name: 'Purple', hex: '#800080' },
  { name: 'Yellow', hex: '#FFFF00' },
  { name: 'Orange', hex: '#FF4500' },
  { name: 'Pink', hex: '#FFC0CB' },
]

const radii = [
  { label: 'None', value: 0, Icon: IconRadiusNone },
  { label: 'Sm', value: 8, Icon: IconRadiusSm },
  { label: 'Md', value: 16, Icon: IconRadiusMd },
  { label: 'Lg', value: 48, Icon: IconRadiusLg },
]

const ThemeEngine = () => {
  const { accentColor, updateAccentColor, radius, updateRadius } = useTheme()

  const handleThemeChange = (hex: string) => {
    updateAccentColor(hex as HexColor)
  }

  const handleReset = () => {
    updateAccentColor('#00FF00' as HexColor)
    updateRadius(0)
  }

  // - 8px border + 8px shadow keep the control board heavy and explicit.
  return (
    <section id="theme-engine" className="bg-(--lithos-surface) py-12 md:py-24">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h2 className="text-4xl font-black uppercase tracking-tighter leading-none text-(--lithos-text) md:text-5xl">
          Dynamic Theme Engine
        </h2>
        <p className="mt-4 text-lg font-bold leading-none text-(--lithos-text)">
          Test drive the global design tokens. One variable changes everything.
        </p>

        <div className="mt-12 w-full border-2 border-(--lithos-border) bg-(--lithos-bg) p-6 sm:p-10 shadow-[6px_6px_0px_0px_var(--lithos-shadow)] mb-12 rounded-(--lithos-radius)">
          <div className="flex flex-wrap justify-center -m-2 sm:-m-4">
            {themes.map((theme) => {
              const isActive = accentColor === theme.hex

              return (
                // - Each swatch is a 64/96px tile with a hard edge; active state only changes shadow depth.
                <Button
                  key={theme.hex}
                  onClick={() => handleThemeChange(theme.hex)}
                  aria-label={`Activate ${theme.name} theme`}
                  title={theme.name}
                  className={`m-2 h-16 w-[calc(50%-1rem)] sm:m-4 sm:h-24 sm:w-24 shrink-0 ${isActive ? '!border-4 !border-(--lithos-text)' : ''}`}
                  style={{
                    backgroundColor: theme.hex,
                    color: 'transparent',
                  }}
                >
                  <span className="sr-only">{theme.name}</span>
                </Button>
              )
            })}

            {/* - Custom picker keeps the tile geometry fixed while the input floats invisibly on top. */}
            <div
              className={`relative m-2 h-16 w-[calc(50%-1rem)] sm:m-4 sm:h-24 sm:w-24 shrink-0 bg-(--lithos-surface) lithos-click group rounded-(--lithos-radius) overflow-hidden ${!themes.some((t) => t.hex === accentColor) ? '!border-4 !border-(--lithos-text)' : ''}`}
              style={{
                backgroundColor: !themes.some((t) => t.hex === accentColor) ? accentColor : 'var(--lithos-surface)',
              }}
            >
              <input
                type="color"
                value={accentColor}
                onChange={(e) => handleThemeChange(e.target.value)}
                className="absolute inset-0 h-full w-full opacity-0 cursor-pointer z-10"
                aria-label="Choose custom theme color"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <div
                  className="h-6 w-6 sm:h-8 sm:w-8 rounded-full border-[3px] sm:border-2 border-black"
                  style={{
                    background: 'conic-gradient(red, yellow, lime, aqua, blue, magenta, red)',
                  }}
                />
                <span
                  className={`mt-2 text-xs font-black uppercase tracking-tighter ${!themes.some((t) => t.hex === accentColor) ? 'text-(--lithos-accent-text)' : 'text-(--lithos-text)'}`}
                >
                  Custom
                </span>
              </div>
            </div>
          </div>

          {/* - Radius Control Row */}
          <div className="mb-8 mt-12 flex items-center justify-between border-t-2 border-(--lithos-border) pt-12">
            <span className="text-sm font-black uppercase tracking-widest text-(--lithos-text) opacity-60">Radius</span>
            <div className="flex items-center space-x-4 sm:space-x-6">
              {radii.map((r) => {
                const isActive = radius === r.value
                const Icon = r.Icon
                return (
                  <button
                    key={r.label}
                    type="button"
                    onClick={() => updateRadius(r.value)}
                    aria-label={`Set border radius to ${r.label}`}
                    title={r.label}
                    className="focus:outline-none transition-transform active:scale-95 cursor-pointer"
                  >
                    <Icon
                      size={28}
                      strokeWidth={isActive ? 3 : 2}
                      className={`transition-colors ${isActive ? 'text-(--lithos-text)' : 'text-(--lithos-text) opacity-30 hover:opacity-60'}`}
                      fill={isActive ? 'var(--lithos-accent)' : 'transparent'}
                    />
                  </button>
                )
              })}
            </div>
          </div>

          {/* - Reset sits below a hard divider so the board reads as one rooted module. */}
          <div className="mt-10 sm:mt-12 flex w-full justify-center border-t-2 border-(--lithos-border) pt-10 sm:pt-12">
            <Button onClick={handleReset} variant="secondary" className="text-sm sm:text-base">
              Reset to Default Theme
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export { ThemeEngine }
