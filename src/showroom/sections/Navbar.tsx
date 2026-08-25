/**
 * @fileoverview Lithos UI top rail.
 * - Holds the brand, primary anchors, and mobile escape hatch in one fixed slab.
 * - Uses hard borders and a pinned edge to keep the header visually immovable.
 * - Preserves the page rhythm by reserving a predictable top strip for navigation.
 */

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useToast } from '../../core/hooks/useToast'
import { Button } from '../../components/ui/Button'
import { Toggle } from '../../components/ui/Toggle'
import { IconMenu } from '../../components/ui/icons/IconMenu'
import { IconClose } from '../../components/ui/icons/IconClose'

interface NavbarProps {
  isDarkMode?: boolean
  onToggleObsidian?: () => void
}

const links = [
  { label: 'Components', to: '/components' },
  { label: 'Blocks', to: '/blocks' },
  { label: 'Templates', to: '/templates' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Docs', to: '/docs' },
]

const Navbar = ({ isDarkMode = false, onToggleObsidian }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { addToast } = useToast()
  const navigate = useNavigate()

  const handleToggleObsidian = () => {
    const nextMode = !isDarkMode

    onToggleObsidian?.()

    addToast({
      title: 'THEME CHANGED',
      message: nextMode ? 'Obsidian Mode Activated.' : 'Light Mode Activated.',
      intent: 'default',
      color: nextMode ? '#000000' : '#FFFFFF',
    })
  }

  const ActionToggle = isMenuOpen ? IconClose : IconMenu

  return (
    <>
      <header
        className="fixed top-0 z-50 w-full border-b-2 border-(--lithos-border) bg-(--lithos-surface)"
        style={{ paddingRight: 'var(--removed-scrollbar-width, 0px)' }}
      >
        {/* - Fixed rail: the 4px bottom border marks the top boundary of the app. */}
        {/* - 24px vertical padding gives the bar enough mass to read as a slab, not a strip. */}
        <div className="mx-auto flex max-w-screen-2xl items-center justify-between px-6 py-5">
          {/* - Brand block flex-1 balances the center lane. */}
          <div className="flex items-center justify-start lg:flex-1">
            <Button variant="primary" onClick={() => navigate('/')}>
              Lithos UI
            </Button>
          </div>

          {/* - Center lane is reserved for wayfinding and sized exactly to its content. */}
          <nav className="hidden items-center justify-center lg:flex lg:flex-none">
            {links.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="mx-4 font-black uppercase tracking-tighter leading-none text-(--lithos-text) transition-all duration-150 ease-out hover:text-(--lithos-accent) cursor-pointer"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* - Action block balances the brand block and keeps the header geometry stable. */}
          <div className="hidden items-center justify-end lg:flex lg:flex-1">
            <div className="mr-4 flex items-center">
              <Toggle checked={isDarkMode} onToggle={handleToggleObsidian} label="Toggle Obsidian Mode" />
            </div>
            <Button variant="primary" onClick={() => window.open('https://github.com/lithosui/Lithos_UI', '_blank')}>
              GitHub
            </Button>
          </div>

          {/* - Mobile Action Toggle (Hamburger / X) */}
          <div className="flex lg:hidden items-center">
            <Button
              variant="primary"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <ActionToggle className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </header>

      {/* - Full-Screen Mobile Overlay */}
      {isMenuOpen && (
        <nav className="fixed inset-0 z-40 pt-32 pb-6 px-6 bg-(--lithos-surface) overflow-y-auto flex flex-col justify-start lg:hidden">
          {links.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              onClick={() => {
                setIsMenuOpen(false)
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="block w-full text-left text-4xl sm:text-5xl font-black uppercase tracking-tighter text-(--lithos-text) opacity-80 hover:opacity-100 hover:text-(--lithos-text) hover:translate-x-2 mb-8 cursor-pointer transition-all duration-150"
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-auto flex items-center justify-between">
            <Button
              variant="primary"
              onClick={() => {
                setIsMenuOpen(false)
                window.open('https://github.com/lithosui/Lithos_UI', '_blank')
              }}
            >
              GitHub
            </Button>
            <div className="flex items-center">
              <Toggle checked={isDarkMode} onToggle={handleToggleObsidian} label="Toggle Obsidian Mode" />
            </div>
          </div>
        </nav>
      )}
    </>
  )
}

export { Navbar }
