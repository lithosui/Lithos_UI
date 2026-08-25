/**
 * @fileoverview Lithos UI documentation shell.
 * - Fixed-pane architecture: sidebars lock, main stage scrolls independently.
 * - Footer extracted to the bottom of the page, outside the grid.
 * - Root shell uses flexbox to push footer down when content is short.
 * - No gap utilities; spacing via px and py utilities on grid items.
 */

import { useLocation } from 'react-router-dom'
import { DocsNavbar as Navbar } from './layout/Navbar'
import { Sidebar } from './layout/Sidebar'
import { TableOfContents } from './layout/TableOfContents'
import { Footer } from '../showroom/sections/Footer'
import type { ReactNode } from 'react'
import type { TOCItem } from './types.ts'

const tocRegistry: Record<string, TOCItem[]> = {
  '/docs': [{ id: '#welcome-video', label: 'Intro To Lithos UI', level: 1 }],
  '/docs/installation': [
    { id: '#base-template', label: '1. The Base Template', level: 1 },
    { id: '#global-css', label: '2. Global CSS Configuration', level: 1 },
    { id: '#theming-configuration', label: '3. Theming & Configuration', level: 1 },
  ],
  '/docs/hero': [
    { id: '#examples', label: 'Examples', level: 1 },
    { id: '#default', label: 'Default', level: 2 },
  ],
  '/docs/code-viewer': [
    { id: '#examples', label: 'Examples', level: 1 },
    { id: '#default', label: 'Default', level: 2 },
  ],
  '/docs/preview-block': [
    { id: '#examples', label: 'Examples', level: 1 },
    { id: '#default', label: 'Default', level: 2 },
  ],
  '/docs/toast': [
    { id: '#installation', label: 'Installation', level: 1 },
    { id: '#examples', label: 'Examples', level: 1 },
    { id: '#default', label: 'Default', level: 2 },
    { id: '#custom-position', label: 'Custom position', level: 2 },
    { id: '#anatomy', label: 'Anatomy', level: 1 },
    { id: '#accessibility', label: 'Accessibility', level: 1 },
    { id: '#api', label: 'API Reference', level: 1 },
  ],
  '/docs/checkbox': [
    { id: '#installation', label: 'Installation', level: 1 },
    { id: '#examples', label: 'Examples', level: 1 },
    { id: '#single', label: 'Single checkbox', level: 2 },
    { id: '#plain', label: 'Plain checkbox', level: 2 },
    { id: '#icon', label: 'Icon checkbox', level: 2 },
    { id: '#custom-color', label: 'Custom color', level: 2 },
    { id: '#indeterminate', label: 'Indeterminate', level: 2 },
    { id: '#disabled', label: 'Disabled', level: 2 },
    { id: '#group', label: 'Checkbox group', level: 2 },
    { id: '#group-horizontal', label: 'Horizontal group', level: 2 },
    { id: '#anatomy', label: 'Anatomy', level: 1 },
    { id: '#accessibility', label: 'Accessibility', level: 1 },
    { id: '#api', label: 'API Reference', level: 1 },
  ],
  '/docs/dialog': [
    { id: '#installation', label: 'Installation', level: 1 },
    { id: '#examples', label: 'Examples', level: 1 },
    { id: '#default', label: 'Default', level: 2 },
    { id: '#sizes', label: 'Sizes', level: 2 },
    { id: '#scrollable', label: 'Scrollable', level: 2 },
    { id: '#no-close', label: 'No close icon', level: 2 },
    { id: '#custom-dialog', label: 'Custom Dialog', level: 2 },
    { id: '#anatomy', label: 'Anatomy', level: 1 },
    { id: '#accessibility', label: 'Accessibility', level: 1 },
    { id: '#api', label: 'API Reference', level: 1 },
  ],
  '/docs/popover': [
    { id: '#installation', label: 'Installation', level: 1 },
    { id: '#examples', label: 'Examples', level: 1 },
    { id: '#anatomy', label: 'Anatomy', level: 1 },
    { id: '#accessibility', label: 'Accessibility', level: 1 },
    { id: '#api-reference', label: 'API Reference', level: 1 },
  ],
  '/docs/toggle': [
    { id: '#installation', label: 'Installation', level: 1 },
    { id: '#examples', label: 'Examples', level: 1 },
    { id: '#default', label: 'Default', level: 2 },
    { id: '#accessibility', label: 'Accessibility', level: 1 },
    { id: '#api', label: 'API Reference', level: 1 },
  ],
  '/docs/button': [
    { id: '#installation', label: 'Installation', level: 1 },
    { id: '#examples', label: 'Examples', level: 1 },
    { id: '#button', label: 'Button', level: 1 },
    { id: '#default', label: 'Default', level: 2 },
    { id: '#secondary', label: 'Secondary', level: 2 },
    { id: '#accent', label: 'Accent', level: 2 },
    { id: '#text', label: 'Text', level: 2 },
    { id: '#solid', label: 'Solid', level: 2 },
    { id: '#with-icon', label: 'With Icon', level: 2 },
    { id: '#icon', label: 'Icon', level: 2 },
    { id: '#button-group', label: 'Button Group', level: 1 },
    { id: '#group-horizontal', label: 'Default', level: 2 },
    { id: '#group-vertical', label: 'Vertical', level: 2 },
    { id: '#group-attached', label: 'Attached', level: 2 },
    { id: '#anatomy', label: 'Anatomy', level: 1 },
    { id: '#accessibility', label: 'Accessibility', level: 1 },
    { id: '#api', label: 'API Reference', level: 1 },
  ],
  '/docs/card': [
    { id: '#installation', label: 'Installation', level: 1 },
    { id: '#examples', label: 'Examples', level: 1 },
    { id: '#default', label: 'Default', level: 2 },
    { id: '#accent', label: 'Accent', level: 2 },
    { id: '#solid', label: 'Solid', level: 2 },
    { id: '#spacing', label: 'Spacing', level: 2 },
    { id: '#image', label: 'Image', level: 2 },
    { id: '#anatomy', label: 'Anatomy', level: 1 },
    { id: '#accessibility', label: 'Accessibility', level: 1 },
    { id: '#api', label: 'API Reference', level: 1 },
  ],
  '/docs/badge': [
    { id: '#installation', label: 'Installation', level: 1 },
    { id: '#examples', label: 'Examples', level: 1 },
    { id: '#variants', label: 'Variants', level: 2 },
    { id: '#sizes', label: 'Sizes', level: 2 },
    { id: '#custom-color', label: 'Custom color', level: 2 },
    { id: '#accessibility', label: 'Accessibility', level: 1 },
    { id: '#api', label: 'API Reference', level: 1 },
  ],
  '/docs/breadcrumb': [
    { id: '#installation', label: 'Installation', level: 1 },
    { id: '#examples', label: 'Breadcrumb Types', level: 1 },
    { id: '#collapsible', label: '1. Collapsible', level: 2 },
    { id: '#icon-name', label: '2. Simple Icon + Name', level: 2 },
    { id: '#anatomy', label: 'Anatomy', level: 1 },
    { id: '#accessibility', label: 'Accessibility', level: 1 },
    { id: '#api', label: 'API Reference', level: 1 },
  ],
  '/docs/avatar': [
    { id: '#installation', label: 'Installation', level: 1 },
    { id: '#examples', label: 'Examples', level: 1 },
    { id: '#variants', label: 'States', level: 2 },
    { id: '#sizes', label: 'Sizes', level: 2 },
    { id: '#group', label: 'Group', level: 2 },
    { id: '#anatomy', label: 'Anatomy', level: 1 },
    { id: '#accessibility', label: 'Accessibility', level: 1 },
    { id: '#api', label: 'API Reference', level: 1 },
  ],
  '/docs/alert': [
    { id: '#installation', label: 'Installation', level: 1 },
    { id: '#examples', label: 'Examples', level: 1 },
    { id: '#filled', label: 'Filled', level: 2 },
    { id: '#outline', label: 'Outline', level: 2 },
    { id: '#sizes', label: 'Sizes', level: 2 },
    { id: '#no-title', label: 'No title', level: 2 },
    { id: '#actions', label: 'Actions', level: 2 },
    { id: '#custom-color', label: 'Custom color', level: 2 },
    { id: '#accessibility', label: 'Accessibility', level: 1 },
    { id: '#api', label: 'API Reference', level: 1 },
  ],
  '/docs/accordion': [
    { id: '#installation', label: 'Installation', level: 1 },
    { id: '#examples', label: 'Examples', level: 1 },
    { id: '#default', label: 'Default', level: 2 },
    { id: '#grouped-default', label: 'Grouped default', level: 2 },
    { id: '#grouped-multiple', label: 'Grouped multiple', level: 2 },
    { id: '#anatomy', label: 'Anatomy', level: 1 },
    { id: '#accessibility', label: 'Accessibility', level: 1 },
    { id: '#api', label: 'API Reference', level: 1 },
  ],
  '/docs/calendar': [
    { id: '#installation', label: 'Installation', level: 1 },
    { id: '#examples', label: 'Examples', level: 1 },
    { id: '#single', label: 'Single', level: 2 },
    { id: '#multiple', label: 'Multiple', level: 2 },
    { id: '#multicolor', label: 'Multicolor', level: 2 },
    { id: '#rainbow', label: 'Rainbow', level: 2 },
    { id: '#range', label: 'Range', level: 2 },
    { id: '#disabled-dates', label: 'Disabled dates', level: 2 },
    { id: '#bounded-years', label: 'Bounded years', level: 2 },
    { id: '#controlled', label: 'Controlled', level: 2 },
    { id: '#accessibility', label: 'Accessibility', level: 1 },
    { id: '#api', label: 'API Reference', level: 1 },
  ],
  '/docs/carousel': [
    { id: '#installation', label: 'Installation', level: 1 },
    { id: '#examples', label: 'Examples', level: 1 },
    { id: '#default', label: 'Default', level: 2 },
    { id: '#looping', label: 'Looping', level: 2 },
    { id: '#bottom-controls', label: 'Bottom controls', level: 2 },
    { id: '#numbers-selector', label: 'Numbers Selector', level: 2 },
    { id: '#no-current-slider', label: 'No current slider', level: 2 },
    { id: '#no-controls', label: 'No controls', level: 2 },
    { id: '#play-infinite', label: 'Play infinitely', level: 2 },
    { id: '#vertical-orientation', label: 'Vertical Orientation', level: 2 },
    { id: '#anatomy', label: 'Anatomy', level: 1 },
    { id: '#accessibility', label: 'Accessibility', level: 1 },
    { id: '#api', label: 'API Reference', level: 1 },
  ],
}

interface DocsLayoutProps {
  children: ReactNode
  isDarkMode: boolean
  toggleObsidian: () => void
}

export const DocsLayout = ({ children, isDarkMode, toggleObsidian }: DocsLayoutProps) => {
  const location = useLocation()
  const currentTOC = tocRegistry[location.pathname] ?? []

  return (
    <div className="min-h-screen flex flex-col bg-(--lithos-bg) text-(--lithos-text)">
      <Navbar isDarkMode={isDarkMode} onToggleObsidian={toggleObsidian} />

      <div className="flex-1 w-full max-w-screen-2xl mx-auto grid grid-cols-12 pt-24 items-start">
        <div className="hidden lg:block lg:col-span-2 sticky top-32">
          <div className="max-h-[calc(100vh-10rem)] pb-6 overflow-y-auto sidebar-scroll">
            <Sidebar />
          </div>
        </div>

        <main className="col-span-12 lg:col-span-10 xl:col-span-8 px-6 lg:px-12 py-12">{children}</main>

        <div className="hidden xl:block xl:col-span-2 sticky top-32">
          <div className="max-h-[calc(100vh-10rem)] pb-6 overflow-y-auto sidebar-scroll">
            <TableOfContents links={currentTOC} />
          </div>
        </div>
      </div>

      <div className="w-full">
        <Footer />
      </div>
    </div>
  )
}
