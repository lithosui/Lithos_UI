import { Button } from '../../../components/ui/Button'

export const AnimationCombinedExample = () => (
  <div className="flex flex-wrap items-center">
    <Button variant="primary" className="mr-3 mb-3 px-4 py-2 lithos-sink lithos-glint">
      Sink + Glint
    </Button>
    <Button variant="secondary" className="mr-3 mb-3 px-4 py-2 lithos-stamp lithos-stripes">
      Stamp + Stripes
    </Button>
    <Button variant="secondary" className="mr-3 mb-3 px-4 py-2 lithos-flip lithos-dots">
      Flip + Dots
    </Button>
    <Button variant="primary" className="mr-3 mb-3 px-4 py-2 lithos-spring lithos-gradient">
      Spring + Gradient
    </Button>
  </div>
)
