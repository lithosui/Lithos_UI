/**
 * @fileoverview Lithos UI kinetic toggle.
 * - Zero-gap: fixed track and thumb dimensions make the motion arithmetic exact.
 * - Neo-brutalist physics: shadow steps move; the parent never translates.
 * - Binary contrast: thumb and track invert as one hard state change.
 */
import type { ComponentPropsWithRef } from 'react'
import { Button } from './Button'
import { cn, type LithosClass } from '../../utils/cn'

export interface ToggleProps extends Omit<ComponentPropsWithRef<'button'>, 'className'> {
  checked: boolean
  onToggle: () => void
  label?: string
  className?: LithosClass
}

export const Toggle = ({ checked, onToggle, label = 'Theme Changed', className, ...rest }: ToggleProps) => {
  // - Stationary shell: only the shadow changes, so surrounding layout never shifts.
  return (
    <Button
      onClick={onToggle}
      aria-pressed={checked}
      aria-label={label}
      className={cn('bg-white px-1 py-1 shadow-none active:translate-none rounded-(--lithos-radius)', className)}
      {...rest}
    >
      {/* Track math (reduced ~1/3): previously 80x40; now approx 24x13 with border/padding scaled down. */}
      <span
        className={`flex h-3 w-6 items-center border-2 border-black p-0.5 transition-colors duration-150 ease-out rounded-[inherit] ${
          checked ? 'bg-black' : 'bg-white'
        }`}
      >
        {/* Thumb math (reduced ~1/3): previously 24px -> now ~8px (h-2 w-2) */}
        <span
          className={`block h-2 w-2 border-2 transition-transform duration-150 ease-out rounded-[inherit] ${
            checked ? 'translate-x-2 border-white bg-white' : 'translate-x-0 border-black bg-black'
          }`}
        />
      </span>

      {/* Screen-reader label stays outside the visual math. */}
      <span className="sr-only">{label}</span>
    </Button>
  )
}
