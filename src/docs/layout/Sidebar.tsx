import { Link, useLocation } from 'react-router-dom'

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
          <Link to="/docs/accordion" className={getLinkClass('/docs/accordion')}>
            Accordion
          </Link>
          <Link to="/docs/alert" className={getLinkClass('/docs/alert')}>
            Alert
          </Link>
          <Link to="/docs/avatar" className={getLinkClass('/docs/avatar')}>
            Avatar
          </Link>
          <Link to="/docs/badge" className={getLinkClass('/docs/badge')}>
            Badge
          </Link>
          <Link to="/docs/breadcrumb" className={getLinkClass('/docs/breadcrumb')}>
            Breadcrumb
          </Link>
          <Link to="/docs/button" className={getLinkClass('/docs/button')}>
            Button
          </Link>
          <Link to="/docs/calendar" className={getLinkClass('/docs/calendar')}>
            Calendar
          </Link>
          <Link to="/docs/card" className={getLinkClass('/docs/card')}>
            Card
          </Link>
          <Link to="/docs/carousel" className={getLinkClass('/docs/carousel')}>
            Carousel
          </Link>
          <Link to="/docs/checkbox" className={getLinkClass('/docs/checkbox')}>
            Checkbox
          </Link>
          <Link to="/docs/dialog" className={getLinkClass('/docs/dialog')}>
            Dialog
          </Link>
          <Link to="/docs/popover" className={getLinkClass('/docs/popover')}>
            Popover
          </Link>
          <Link to="/docs/toast" className={getLinkClass('/docs/toast')}>
            Toast
          </Link>
          <Link to="/docs/toggle" className={getLinkClass('/docs/toggle')}>
            Toggle
          </Link>
        </nav>
      </div>
    </aside>
  )
}
