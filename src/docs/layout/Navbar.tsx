import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useToast } from '../../core/hooks/useToast'
import { Button } from '../../components/ui/Button'
import { Toggle } from '../../components/ui/Toggle'
import { IconMenu } from '../../components/ui/icons/IconMenu'
import { IconClose } from '../../components/ui/icons/IconClose'

interface DocsNavbarProps {
  isDarkMode?: boolean
  onToggleObsidian?: () => void
}

const mainLinks = [
  { label: 'Components', to: '/components' },
  { label: 'Blocks', to: '/blocks' },
  { label: 'Templates', to: '/templates' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Docs', to: '/docs' },
]

const groupedLinks = [
  {
    category: 'Getting Started',
    links: [
      { label: 'Introduction', href: '/docs' },
      { label: 'Installation', href: '/docs/installation' },
    ],
  },
  {
    category: 'Components',
    links: [
      { label: 'Accordion', href: '/docs/accordion' },
      { label: 'Alert', href: '/docs/alert' },
      { label: 'Avatar', href: '/docs/avatar' },
      { label: 'Badge', href: '/docs/badge' },
      { label: 'Breadcrumb', href: '/docs/breadcrumb' },
      { label: 'Button', href: '/docs/button' },
      { label: 'Calendar', href: '/docs/calendar' },
      { label: 'Card', href: '/docs/card' },
      { label: 'Carousel', href: '/docs/carousel' },
      { label: 'Input', href: '/docs/input' },
      { label: 'Checkbox', href: '/docs/checkbox' },
      { label: 'Dialog', href: '/docs/dialog' },
      { label: 'Popover', href: '/docs/popover' },
      { label: 'Select', href: '/docs/select' },
      { label: 'Toast', href: '/docs/toast' },
      { label: 'Toggle', href: '/docs/toggle' },
    ],
  },
]

export const DocsNavbar = ({ isDarkMode = false, onToggleObsidian }: DocsNavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [expandedCategory, setExpandedCategory] = useState<string | null>('Getting Started')
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
    <header
      className="fixed top-0 z-50 w-full border-b-2 border-(--lithos-border) bg-(--lithos-surface)"
      style={{ paddingRight: 'var(--removed-scrollbar-width, 0px)' }}
    >
      <div className="mx-auto flex max-w-screen-2xl items-center justify-between px-6 py-5">
        <div className="flex items-center justify-start lg:w-1/3">
          <Button variant="primary" onClick={() => navigate('/')}>
            Lithos UI
          </Button>
        </div>

        {/* - Center lane for main wayfinding */}
        <nav className="hidden items-center justify-center lg:flex lg:w-1/3">
          {mainLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="mx-4 font-black uppercase tracking-tighter leading-none text-(--lithos-text) transition-all duration-150 ease-out hover:text-(--lithos-accent) cursor-pointer"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* - Desktop GitHub CTA (Hidden on mobile) */}
        <div className="hidden lg:flex items-center justify-end lg:w-1/3">
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
            <ActionToggle className="w-6 h-6" />
          </Button>
        </div>
      </div>

      {/* - Full-Screen Scrollable Mobile Accordion Overlay */}
      {isMenuOpen && (
        <nav className="fixed inset-0 z-[-1] pt-32 pb-12 px-6 bg-(--lithos-surface) overflow-y-auto flex flex-col justify-start lg:hidden">
          {/* Main Top-level Links */}
          <div className="mb-8 border-b-2 border-(--lithos-border) pb-4">
            {mainLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => setIsMenuOpen(false)}
                className="block w-full text-left text-4xl sm:text-5xl font-black uppercase tracking-tighter text-(--lithos-text) opacity-80 hover:opacity-100 hover:text-(--lithos-text) hover:translate-x-2 mb-6 cursor-pointer transition-all duration-150"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Grouped Accordion Links */}
          <div className="flex-1">
            {groupedLinks.map((group) => (
              <div key={group.category} className="mb-8">
                <button
                  onClick={() => setExpandedCategory(expandedCategory === group.category ? null : group.category)}
                  className="flex w-full items-center justify-between border-b-2 border-(--lithos-border) pb-2 mb-4 text-left text-3xl sm:text-4xl font-black uppercase tracking-tighter text-(--lithos-text) cursor-pointer"
                >
                  {group.category}
                  <span className="text-3xl text-(--lithos-accent)">
                    {expandedCategory === group.category ? '-' : '+'}
                  </span>
                </button>

                {/* Accordion Content */}
                {expandedCategory === group.category && (
                  <div className="pl-2 flex flex-col mt-4">
                    {group.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="block w-full text-left text-xl sm:text-2xl font-bold uppercase tracking-tight text-(--lithos-text) opacity-80 hover:opacity-100 hover:text-(--lithos-text) hover:translate-x-2 mb-4 cursor-pointer transition-all duration-150"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Menu GitHub CTA */}
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
    </header>
  )
}
