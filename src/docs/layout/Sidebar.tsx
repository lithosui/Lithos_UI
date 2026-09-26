import { Link, useLocation } from 'react-router-dom'

// The component name should match the route in App.tsx
// to create spaced component labels use a - between the words.
// e.g: navigation-menu name will use the label "Navigation Menu"
const components = [
  'accordion',
  'alert',
  'avatar',
  'badge',
  'breadcrumb',
  'button',
  'calendar',
  'card',
  'carousel',
  'checkbox',
  'command',
  'dialog',
  'dropdown',
  'drawer',
  'input',
  'kbd',
  'popover',
  'select',
  'skeleton',
  'tabs',
  'toast',
  'toggle',
  'tooltip',
]

export const Sidebar = () => {
  const location = useLocation()

  const getLinkClass = (path: string) => {
    const isActive = location.pathname === path
    const baseClass =
      'inline-block w-fit px-3 py-1.5 text-xs font-bold transition-all duration-150 ease-out border-2 rounded-(--lithos-radius)'

    return isActive
      ? `${baseClass} border-(--lithos-border) bg-(--lithos-accent) text-(--lithos-accent-text) shadow-[4px_4px_0_0_var(--lithos-border)]`
      : `${baseClass} border-transparent text-(--lithos-text) hover:bg-[color-mix(in_srgb,var(--lithos-text)_5%,transparent)] hover:text-(--lithos-text)`
  }

  return (
    <aside className="py-8 pr-6">
      {/* Getting Started Category */}
      <div className="mb-8">
        <h3 className="text-xs font-black opacity-50 mb-3 px-4 uppercase">Getting Started</h3>
        <nav className="flex flex-col items-start pl-4 space-y-1">
          <Link to="/docs" className={getLinkClass('/docs')}>
            Introduction
          </Link>
          <Link to="/docs/installation" className={getLinkClass('/docs/installation')}>
            Installation
          </Link>
        </nav>
      </div>

      {/* Atomic Components Category */}
      <div>
        <h3 className="text-xs font-black opacity-50 mb-3 px-4 uppercase">Components</h3>
        <nav className="flex flex-col items-start pl-4 space-y-1">
          {components.map((component) => {
            const words = component.replaceAll('-', ' ').split(' ')

            let label = ''

            if (words.length === 1) {
              const wordChars = words[0]?.split('')

              // single component name. e.g: 'calendar'
              if (wordChars?.[0]) {
                label = wordChars[0].toUpperCase() + wordChars.slice(1).join('')
              }
            } else if (words.length > 1) {
              // spaced component name. e.g: 'dropdown-menu'
              // should return 'Dropdown Menu'

              const wordsLength = words.length
              for (let i = 0; i < wordsLength; i++) {
                const wordChars = words[i]?.split('')

                if (wordChars?.[0]) {
                  label += wordChars[0].toUpperCase() + wordChars.slice(1).join('')

                  if (i < wordsLength) {
                    label += ' '
                  }
                }
              }
            }

            const link = `/docs/${component}`

            return (
              <Link key={link} to={link} className={getLinkClass(link)}>
                {label}
              </Link>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}
