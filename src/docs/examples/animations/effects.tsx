import { Button } from '../../../components/ui/Button'

const EFFECT_ITEMS = [
  { label: 'Gradient', className: 'lithos-gradient', variant: 'secondary' as const },
  { label: 'Glint', className: 'lithos-glint', variant: 'secondary' as const },
  { label: 'Stripes', className: 'lithos-stripes', variant: 'secondary' as const },
  { label: 'Dots', className: 'lithos-dots', variant: 'secondary' as const },
] as const

export const AnimationEffectsExample = () => (
  <div className="flex flex-wrap items-center">
    {EFFECT_ITEMS.map(({ label, className, variant }) => (
      <Button key={label} variant={variant} className={`mr-3 mb-3 px-4 py-2 ${className}`}>
        {label}
      </Button>
    ))}
  </div>
)
