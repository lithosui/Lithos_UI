import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Marquee } from '../components/ui/Marquee'
import { DocsLayout } from './DocsLayout'
import { DOC_PAGES } from '../core/lithos.utils'
import { getUnreleasedComponentInfo } from '../core/unreleasedRegistry'
import { NotFound } from '../showroom/sections/NotFound'

export const DocsRoutes = () => {
  return (
    <DocsLayout>
      <Suspense fallback={null}>
        <Routes>
          {DOC_PAGES.map(({ path, loader }) => {
            const LazyComponent = lazy(loader)
            const unreleasedInfo = getUnreleasedComponentInfo(path)

            return (
              <Route
                key={path || 'index'}
                path={`${path ? `/${path}` : ''}`}
                element={
                  <>
                    {unreleasedInfo && (
                      <div className="mx-auto max-w-5xl px-6">
                        <Marquee variant="warning" className="mb-6">
                          <span className="font-mono font-black text-xs uppercase tracking-wider">
                            {unreleasedInfo.warningMessage}
                          </span>
                        </Marquee>
                      </div>
                    )}
                    <LazyComponent />
                  </>
                }
              />
            )
          })}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </DocsLayout>
  )
}
