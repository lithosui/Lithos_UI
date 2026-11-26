import { Button } from '../../../components/ui/Button'

const MOTION_ITEMS = [
  { label: 'Spring', className: 'lithos-spring' },
  { label: 'Pop', className: 'lithos-pop' },
  { label: 'Sink', className: 'lithos-sink' },
  { label: 'Lift', className: 'lithos-lift' },
  { label: 'Stamp', className: 'lithos-stamp' },
  { label: 'Flip', className: 'lithos-flip' },
  { label: 'Flat', className: 'lithos-flat' },
] as const

export const AnimationMotionsExample = () => (
  <div className="flex flex-wrap items-center">
    {MOTION_ITEMS.map(({ label, className }) => (
      <Button key={label} variant="secondary" className={`mr-3 mb-3 px-4 py-2 ${className}`}>
        {label}
      </Button>
    ))}
  </div>
)
