import { useState, useRef, useEffect, type ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTheme } from '../../core/hooks/useTheme'
import { Button } from './Button'
import { IconRadius } from './icons/IconRadius'
import { IconSettings } from './icons/IconSettings'
import { IconClose } from './icons/IconClose'
import { IconMoon } from './icons/IconMoon'
import { IconSun } from './icons/IconSun'
import { IconArrowRight } from './icons/IconArrowRight'
import type { HexColor } from '../../core/types'
import type { LithosEffect, LithosMotion } from '../../core/ThemeProviderContext'

const ARTISTIC_PALETTES = [
  { label: 'Lime', hex: '#00ff00' },
  { label: 'Orange', hex: '#ff5500' },
  { label: 'Violet', hex: '#7928ca' },
  { label: 'Yellow', hex: '#ffe600' },
  { label: 'Cyan', hex: '#00f0ff' },
  { label: 'Magenta', hex: '#ff007f' },
  { label: 'Red', hex: '#ef4444' },
  { label: 'Blue', hex: '#2563eb' },
  { label: 'Amber', hex: '#f59e0b' },
  { label: 'Beige', hex: '#e8d5b5' },
  { label: 'Brown', hex: '#78350f' },
  { label: 'Lavender', hex: '#a78bfa' },
  { label: 'Teal', hex: '#0d9488' },
] as const

const RADII = [
  { label: 'None', value: 0, variant: 'none' },
  { label: 'Sm', value: 8, variant: 'sm' },
  { label: 'Md', value: 16, variant: 'md' },
  { label: 'Lg', value: 24, variant: 'lg' },
] as const

const MOTIONS: readonly { label: string; value: LithosMotion }[] = [
  { label: 'Spring', value: 'spring' },
  { label: 'Pop', value: 'pop' },
  { label: 'Sink', value: 'sink' },
  { label: 'Lift', value: 'lift' },
  { label: 'Stamp', value: 'stamp' },
  { label: 'Flip', value: 'flip' },
  { label: 'Flat', value: 'flat' },
]

const EFFECTS: readonly { label: string; value: LithosEffect }[] = [
  { label: 'None', value: 'none' },
  { label: 'Gradient', value: 'gradient' },
  { label: 'Glint', value: 'glint' },
  { label: 'Stripes', value: 'stripes' },
  { label: 'Dots', value: 'dots' },
]

interface SegmentedOption<T extends string | number> {
  value: T
  label: string
  ariaLabel: string
  title?: string
  content: ReactNode
}

const SegmentedSection = <T extends string | number>({
  heading,
  badge,
  value,
  options,
  rowSizes,
  onSelect,
}: {
  heading: string
  badge: string
  value: T
  options: readonly SegmentedOption<T>[]
  rowSizes?: readonly number[]
  onSelect: (value: T) => void
}) => {
  const rows: SegmentedOption<T>[][] = []
  if (rowSizes?.length) {
    let cursor = 0
    for (const size of rowSizes) {
      rows.push(options.slice(cursor, cursor + size))
      cursor += size
    }
  } else {
    rows.push([...options])
  }

  return (
    <div className="px-3.5 py-2.5 border-t-2 border-(--lithos-border) bg-(--lithos-surface)">
      <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-wider text-(--lithos-text) opacity-70 mb-2">
        <span>{heading}</span>
        <span className="font-mono text-[9px] uppercase">{badge}</span>
      </div>

      <div className="w-full border-2 border-(--lithos-border) rounded-(--lithos-radius) overflow-hidden shadow-[2px_2px_0px_0px_var(--lithos-shadow)]">
        {rows.map((row, rowIdx) => (
          <div key={rowIdx} className={`flex w-full ${rowIdx !== 0 ? 'border-t-2 border-(--lithos-border)' : ''}`}>
            {row.map((option, colIdx) => {
              const isSelected = value === option.value
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => onSelect(option.value)}
                  aria-label={option.ariaLabel}
                  title={option.title}
                  className={`flex-1 h-8 flex items-center justify-center text-[11px] font-bold font-mono transition-colors cursor-pointer ${
                    colIdx !== 0 ? 'border-l-2 border-(--lithos-border)' : ''
                  } ${
                    isSelected
                      ? 'bg-(--lithos-accent) text-(--lithos-accent-text)'
                      : 'bg-(--lithos-bg) text-(--lithos-text) hover:bg-(--lithos-surface)'
                  }`}
                >
                  {option.content}
                </button>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

export const MiniThemeEngine = () => {
  const [isOpen, setIsOpen] = useState(false)
  const {
    accentColor,
    radius,
    isDarkMode,
    motion,
    effect,
    updateAccentColor,
    updateRadius,
    updateMotion,
    updateEffect,
    toggleObsidian,
  } = useTheme()
  const location = useLocation()
  const navigate = useNavigate()

  const panelRef = useRef<HTMLDivElement>(null)
  const triggerContainerRef = useRef<HTMLDivElement>(null)

  // Close when clicking outside panel and trigger button
  useEffect(() => {
    if (!isOpen) return undefined

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node | null
      if (!target) return

      if (
        panelRef.current &&
        !panelRef.current.contains(target) &&
        triggerContainerRef.current &&
        !triggerContainerRef.current.contains(target)
      ) {
        setIsOpen(false)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    window.addEventListener('pointerdown', handlePointerDown)
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  // Hide the floating widget if user is already inside the full Theme Studio
  if (location.pathname === '/theme') {
    return null
  }

  const isPaletteSelected = (hex: string) => {
    return accentColor.toLowerCase() === hex.toLowerCase()
  }

  const handleOpenFullBuilder = () => {
    setIsOpen(false)
    navigate('/theme')
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Popover Panel */}
      {isOpen && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label="Theme Engine"
          className="absolute bottom-16 right-0 w-72 max-h-[calc(100vh-6.5rem)] overflow-y-auto bg-(--lithos-surface) text-(--lithos-text) border-2 border-(--lithos-border) shadow-[6px_6px_0px_0px_var(--lithos-shadow)] flex flex-col animate-[brutalist-pop_0.12s_ease-out] rounded-(--lithos-radius)"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-3.5 py-2.5 border-b-2 border-(--lithos-border) bg-(--lithos-surface)">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 bg-(--lithos-accent) border border-(--lithos-border) rounded-(--lithos-radius) inline-block animate-pulse" />
              <h3 className="font-mono font-black text-xs tracking-wider uppercase text-(--lithos-text)">
                THEME ENGINE
              </h3>
            </div>

            <div className="flex items-center space-x-1.5">
              <button
                type="button"
                onClick={toggleObsidian}
                className="p-1 hover:bg-(--lithos-surface-hover) cursor-pointer transition-colors rounded-(--lithos-radius)"
                aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                title={isDarkMode ? 'Light Mode' : 'Dark Mode (Obsidian)'}
              >
                {isDarkMode ? <IconSun size={16} /> : <IconMoon size={16} />}
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-(--lithos-surface-hover) cursor-pointer transition-colors rounded-(--lithos-radius)"
                aria-label="Close theme engine"
              >
                <IconClose size={16} />
              </button>
            </div>
          </div>

          {/* Color Palettes List */}
          <div className="p-2 flex flex-col">
            <div className="flex items-center justify-between px-2 pt-1 pb-1.5 text-[10px] font-black uppercase tracking-wider text-(--lithos-text) opacity-70">
              <span>Palette</span>
              <span className="font-mono text-[9px]">{accentColor.toUpperCase()}</span>
            </div>

            <div className="flex flex-col space-y-1 max-h-40 overflow-y-auto pr-1">
              {ARTISTIC_PALETTES.map((palette) => {
                const selected = isPaletteSelected(palette.hex)
                return (
                  <button
                    key={palette.hex}
                    type="button"
                    onClick={() => updateAccentColor(palette.hex as HexColor)}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 cursor-pointer transition-all duration-75 text-left rounded-(--lithos-radius) border-2 shrink-0 ${
                      selected
                        ? 'border-(--lithos-border) bg-(--lithos-surface-hover) shadow-[2px_2px_0px_0px_var(--lithos-shadow)] font-bold'
                        : 'border-transparent hover:bg-(--lithos-surface-hover)'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      {/* Single color box swatch */}
                      <span
                        className="w-5 h-5 rounded-(--lithos-radius) border-2 border-(--lithos-border) shrink-0 shadow-[1px_1px_0px_0px_var(--lithos-shadow)]"
                        style={{ backgroundColor: palette.hex }}
                      />
                      <span className="text-sm text-(--lithos-text)">{palette.label}</span>
                    </div>

                    <span className="font-mono text-[11px] opacity-50 uppercase text-(--lithos-text)">
                      {palette.hex}
                    </span>
                  </button>
                )
              })}

              {/* Custom Color Trigger */}
              <label className="w-full flex items-center justify-between px-2.5 py-1.5 cursor-pointer transition-all duration-75 text-left rounded-(--lithos-radius) border-2 border-transparent hover:bg-(--lithos-surface-hover) relative shrink-0">
                <div className="flex items-center space-x-3">
                  <span className="w-5 h-5 rounded-(--lithos-radius) border-2 border-(--lithos-border) shrink-0 shadow-[1px_1px_0px_0px_var(--lithos-shadow)] bg-(--lithos-bg) flex items-center justify-center text-xs font-black text-(--lithos-text)">
                    +
                  </span>
                  <span className="text-sm text-(--lithos-text)">Custom</span>
                </div>
                <span className="font-mono text-[11px] opacity-50 uppercase text-(--lithos-text)">Picker</span>
                <input
                  type="color"
                  value={accentColor}
                  onChange={(e) => updateAccentColor(e.target.value as HexColor)}
                  className="absolute inset-0 h-full w-full opacity-0 cursor-pointer"
                  aria-label="Choose custom theme color"
                />
              </label>
            </div>
          </div>

          <SegmentedSection
            heading="Radius"
            badge={`${radius}PX`}
            value={radius}
            onSelect={updateRadius}
            options={RADII.map((r) => ({
              value: r.value,
              label: r.label,
              ariaLabel: `Set border radius to ${r.label}`,
              title: `${r.label} (${r.value}px)`,
              content: <IconRadius variant={r.variant} size={14} />,
            }))}
          />

          <SegmentedSection
            heading="Motion"
            badge={motion}
            value={motion}
            rowSizes={[4, 3]}
            onSelect={updateMotion}
            options={MOTIONS.map((item) => ({
              value: item.value,
              label: item.label,
              ariaLabel: `Set click motion to ${item.label}`,
              content: item.label,
            }))}
          />

          <SegmentedSection
            heading="Effect"
            badge={effect}
            value={effect}
            rowSizes={[3, 2]}
            onSelect={updateEffect}
            options={EFFECTS.map((item) => ({
              value: item.value,
              label: item.label,
              ariaLabel: `Set surface effect to ${item.label}`,
              content: item.label,
            }))}
          />

          {/* Bottom Action: Open Full Theme Builder via Lithos UI Button primitive */}
          <div className="p-3 border-t-2 border-(--lithos-border) bg-(--lithos-surface)">
            <Button
              variant="primary"
              fullWidth
              onClick={handleOpenFullBuilder}
              iconRight={<IconArrowRight size={14} />}
              className="py-2.5 text-xs font-black uppercase tracking-wider flex items-center justify-center"
            >
              Open Full Theme Builder
            </Button>
          </div>
        </div>
      )}

      {/* Floating Trigger Settings Button via Lithos UI Button primitive */}
      <div ref={triggerContainerRef}>
        <Button
          variant="primary"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle theme engine"
          aria-expanded={isOpen}
          className="w-12 h-12 p-0 flex items-center justify-center"
        >
          <IconSettings size={22} />
        </Button>
      </div>
    </div>
  )
}
