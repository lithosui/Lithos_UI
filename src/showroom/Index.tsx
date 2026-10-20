import { Navbar } from './sections/Navbar'
import { Hero } from './sections/Hero'
import { FeatureGrid } from './sections/FeatureGrid'
import { ThemeEngine } from './sections/ThemeEngine'
import { Footer } from './sections/Footer'

/**
 * Showroom Component - Landing Page UI Composition
 *
 * Isolates the landing page structure (Navbar, sections, Footer) from root App logic.
 * Accepts theme state and toggle function as props for downstream consumption.
 */

export const Showroom = () => {
  /**
   * ZERO-GAP SPACING MATH:
   * - pt-24 (main): padding-top: 6rem = 96px
   *   Accounts for fixed Navbar height (~96px) to prevent content overlap.
   *   Navbar height MUST equal pt-24 value for perfect zero-gap alignment.
   *
   * - Wrapper div mt-24: margin-top: 6rem = 96px
   *   Creates uniform inter-section spacing (96px between major blocks).
   *   This is the Lithos spacing unit. Do NOT mix with gap utilities.
   */
  return (
    <>
      <Navbar />

      <main className="pt-24">
        <Hero />
        {/* All sections: mt-24 = 96px margin for zero-gap layout */}
        <div className="mt-24">
          <ThemeEngine />
        </div>
        <div className="mt-24">
          <FeatureGrid />
        </div>
        {/* TODO: Future stats strip section goes here.
            - Real GitHub star count (fetched, not hardcoded)
            - Component count
            - Block count
            - "Free. No tiers. No Pro plan."
        */}
      </main>

      <div className="mt-24">
        <Footer />
      </div>
    </>
  )
}
