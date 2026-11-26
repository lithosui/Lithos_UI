import { Button } from '../../../components/ui/Button'
import { useTheme } from '../../../core/hooks/useTheme'
import type { LithosEffect, LithosMotion } from '../../../core/ThemeProviderContext'

const MOTIONS: readonly LithosMotion[] = ['spring', 'pop', 'sink', 'lift', 'stamp', 'flip', 'flat']
const EFFECTS: readonly LithosEffect[] = ['none', 'gradient', 'glint', 'stripes', 'dots']

export const AnimationThemeControlExample = () => {
  const { motion, effect, updateMotion, updateEffect } = useTheme()

  return (
    <div className="space-y-4">
      <div>
        <div className="flex flex-wrap items-center">
          {MOTIONS.map((item) => (
            <Button
              key={item}
              variant={motion === item ? 'primary' : 'secondary'}
              onClick={() => updateMotion(item)}
              className="mr-2 mb-2 px-3 py-1.5 text-xs uppercase"
            >
              {item}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <div className="flex flex-wrap items-center">
          {EFFECTS.map((item) => (
            <Button
              key={item}
              variant={effect === item ? 'primary' : 'secondary'}
              onClick={() => updateEffect(item)}
              className="mr-2 mb-2 px-3 py-1.5 text-xs uppercase"
            >
              {item}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
