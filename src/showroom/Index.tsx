import { Navbar } from './sections/Navbar'
import { Hero } from './sections/Hero'
import { QuickstartCLI } from './sections/QuickstartCLI'
import { FeatureGrid } from './sections/FeatureGrid'
import { ComponentPlayground } from './sections/ComponentPlayground'
import { BlocksShowcase } from './sections/BlocksShowcase'
import { StatsStrip } from './sections/StatsStrip'
import { CallToAction } from './sections/CallToAction'
import { Footer } from './sections/Footer'

/**
 * Showroom Component - Landing Page UI Composition
 *
 * Neo-brutalist zero-gap architectural layout:
 * - pt-24 (main): offsets fixed 96px Navbar.
 * - Slabs stack seamlessly with alternating surface contrast and 2px hard dividers.
 */
export const Showroom = () => {
  return (
    <>
      <Navbar />

      <main className="pt-24">
        {/* Viewport Hero Anchor */}
        <Hero />

        {/* Quickstart Terminal & Zero Lock-in CLI */}
        <QuickstartCLI />

        {/* Four Architectural Pillars */}
        <FeatureGrid />

        {/* Live Interactive Bento Component Playground */}
        <ComponentPlayground />

        {/* Pre-composed Blocks & Templates Gallery */}
        <BlocksShowcase />

        {/* Stats Strip & Free Forever Open Source Manifesto */}
        <StatsStrip />

        {/* Production Readiness Call to Action */}
        <CallToAction />
      </main>

      {/* Heavy Closing Slab */}
      <Footer />
    </>
  )
}
