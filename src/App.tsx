/**
 * @fileoverview Lithos UI - Root Application Shell
 *
 * Minimal architectural shell responsible for:
 * - Theme state management via useLithosTheme hook
 * - Dynamic theming class application
 * - Routing configuration via React Router
 * - Component composition (Showroom, NotFound routes)
 */

import { AlertDoc } from './docs/pages/Alert'
import { AvatarDoc } from './docs/pages/Avatar'
import { AccordionDoc } from './docs/pages/Accordion'
import { BadgeDoc } from './docs/pages/Badge'
import { BreadcrumbDoc } from './docs/pages/Breadcrumb'
import { BlockPreviewPage } from './pages/BlockPreviewPage'
import { BlockCategoryPage } from './pages/BlockCategoryPage'
import { BlocksIndex } from './pages/BlocksIndex'
import { TemplatesIndex } from './pages/TemplatesIndex'
import { TemplateCategoryPage } from './pages/TemplateCategoryPage'
import { TemplatePreviewPage } from './pages/TemplatePreviewPage'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { ButtonDoc } from './docs/pages/Button'
import { CalendarDoc } from './docs/pages/Calendar'
import { CardDoc } from './docs/pages/Card'
import { CarouselDoc } from './docs/pages/Carousel'
import { CheckboxDoc } from './docs/pages/Checkbox'
import { CommandDoc } from './docs/pages/Command'
import { ComingSoon } from './showroom/sections/ComingSoon'
import { ComponentsIndex } from './pages/ComponentsIndex'
import { DialogDoc } from './docs/pages/Dialog'
import { DropdownDoc } from './docs/pages/Dropdown'
import { DrawerDoc } from './docs/pages/Drawer'
import { DocsLayout } from './docs/DocsLayout'
import { Faq } from './pages/Faq'
import { InputDoc } from './docs/pages/Input'
import { Installation } from './docs/pages/Installation'
import { Introduction } from './docs/pages/Introduction'
import { KbdDoc } from './docs/pages/Kbd'
import { PopoverPage } from './docs/pages/Popover'
import { NotFound } from './showroom/sections/NotFound'
import { SelectDoc } from './docs/pages/Select'
import { SkeletonDoc } from './docs/pages/Skeleton'
import { Showroom } from './showroom/Index'
import { ToastDoc } from './docs/pages/Toast'
import { ToggleDoc } from './docs/pages/Toggle'
import { TabsDoc } from './docs/pages/Tabs'
import { ThemeBuilder } from './pages/ThemeBuilder'
import { TooltipDoc } from './docs/pages/Tooltip'
import { useEffect } from 'react'
import { useLithosTheme } from './core/useLithosTheme'

const ScrollToTop = () => {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const id = hash.replace('#', '')
        const element = document.getElementById(id)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 0)
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])

  return null
}

const renderDocRoutes = (isDarkMode: boolean, toggleObsidian: () => void) => {
  const docPages = [
    { path: '', component: Introduction },
    { path: 'alert', component: AlertDoc },
    { path: 'avatar', component: AvatarDoc },
    { path: 'accordion', component: AccordionDoc },
    { path: 'badge', component: BadgeDoc },
    { path: 'breadcrumb', component: BreadcrumbDoc },
    { path: 'button', component: ButtonDoc },
    { path: 'calendar', component: CalendarDoc },
    { path: 'card', component: CardDoc },
    { path: 'carousel', component: CarouselDoc },
    { path: 'input', component: InputDoc },
    { path: 'checkbox', component: CheckboxDoc },
    { path: 'command', component: CommandDoc },
    { path: 'dialog', component: DialogDoc },
    { path: 'dropdown', component: DropdownDoc },
    { path: 'drawer', component: DrawerDoc },
    { path: 'installation', component: Installation },
    { path: 'kbd', component: KbdDoc },
    { path: 'popover', component: PopoverPage },
    { path: 'select', component: SelectDoc },
    { path: 'skeleton', component: SkeletonDoc },
    { path: 'toast', component: ToastDoc },
    { path: 'toggle', component: ToggleDoc },
    { path: 'tabs', component: TabsDoc },
    { path: 'tooltip', component: TooltipDoc },
  ]

  return docPages.map(({ path, component: Component }) => (
    <Route
      key={path || 'index'}
      path={`/docs${path ? `/${path}` : ''}`}
      element={
        <DocsLayout isDarkMode={isDarkMode} toggleObsidian={toggleObsidian}>
          <Component />
        </DocsLayout>
      }
    />
  ))
}

/**
 * App Component - Orchestrates theme state, routing, and renders application UI.
 *
 * Routing structure:
 * - "/" → Showroom (main landing page)
 * - "*" → NotFound (catch-all for undefined routes)
 */
const App = () => {
  const { isDarkMode, toggleObsidian, accentColor, updateAccentColor, radius, updateRadius } = useLithosTheme()

  return (
    <div className="min-h-screen bg-(--lithos-bg) text-(--lithos-text)">
      {/* Theme hook is mounted at the app root so accent persistence applies on every route. */}
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route
            path="/"
            element={
              <Showroom
                isDarkMode={isDarkMode}
                toggleObsidian={toggleObsidian}
                accentColor={accentColor}
                updateAccentColor={updateAccentColor}
                radius={radius}
                updateRadius={updateRadius}
              />
            }
          />

          <Route path="/blocks" element={<BlocksIndex isDarkMode={isDarkMode} toggleObsidian={toggleObsidian} />} />
          <Route path="/blocks/preview/:slug" element={<BlockPreviewPage />} />
          <Route
            path="/blocks/:categorySlug"
            element={<BlockCategoryPage isDarkMode={isDarkMode} toggleObsidian={toggleObsidian} />}
          />
          <Route
            path="/coming-soon"
            element={
              <ComingSoon
                eyebrow="ACTIVE ENGINEERING ZONE"
                title="Work In Progress"
                description="Lithos UI is an open-source architecture, and developers are actively encouraged to contribute code to engineer this structural block."
                primaryAction={{ label: 'Go to Docs', to: '/docs' }}
                secondaryAction={{ label: 'Contribute Code', href: 'https://github.com/lithosui/Lithos_UI/issues' }}
              />
            }
          />
          <Route
            path="/components"
            element={<ComponentsIndex isDarkMode={isDarkMode} toggleObsidian={toggleObsidian} />}
          />

          {/* Completed Documentation Shells */}
          {renderDocRoutes(isDarkMode, toggleObsidian)}

          <Route path="/faq" element={<Faq isDarkMode={isDarkMode} toggleObsidian={toggleObsidian} />} />
          <Route path="/theme" element={<ThemeBuilder isDarkMode={isDarkMode} toggleObsidian={toggleObsidian} />} />
          <Route
            path="/templates"
            element={<TemplatesIndex isDarkMode={isDarkMode} toggleObsidian={toggleObsidian} />}
          />
          <Route path="/templates/preview/:slug" element={<TemplatePreviewPage />} />
          <Route
            path="/templates/:categorySlug"
            element={<TemplateCategoryPage isDarkMode={isDarkMode} toggleObsidian={toggleObsidian} />}
          />

          {/* Structural Failure Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export { App }
