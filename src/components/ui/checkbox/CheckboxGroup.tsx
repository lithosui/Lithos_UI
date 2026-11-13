/**
 * @fileoverview Lithos UI CheckboxGroup container component.
 * - Acts as a context provider for multi-select checkboxes, handling state array updates and horizontal/vertical layouts.
 */
import { useId } from 'react'
import { cn } from '../../../utils/cn'
import type { CheckboxGroupProps } from './checkbox.types'
import { CheckboxGroupContext } from './useCheckboxGroup'

/**
 * Group container component managing multi-select checkbox state coordination.
 *
 * @param props - Group configuration properties including value array, change callback, and layout mode. - {@link CheckboxGroupProps}
 * @returns Checkbox group container element.
 */
export const CheckboxGroup = ({
  value,
  onChange,
  label,
  description,
  mode = 'vertical',
  disabled = false,
  name,
  className,
  children,
}: CheckboxGroupProps) => {
  const groupId = useId()
  const labelId = `${groupId}-label`

  const onToggleValue = (item: string) => {
    onChange(value.includes(item) ? value.filter((v) => v !== item) : [...value, item])
  }

  const isHorizontal = mode === 'horizontal'

  return (
    <div role="group" aria-labelledby={label ? labelId : undefined} className={cn('flex flex-col', className)}>
      {label && (
        <span id={labelId} className="mb-2 font-black uppercase tracking-tight text-sm">
          {label}
        </span>
      )}
      {description && <span className="mb-3 text-xs font-body opacity-70">{description}</span>}

      <div
        className={cn(
          'flex',
          isHorizontal ? 'flex-row flex-wrap [&>*:not(:first-child)]:ml-4' : 'flex-col [&>*:not(:first-child)]:mt-2'
        )}
      >
        <CheckboxGroupContext.Provider value={{ value, onToggleValue, disabled, name }}>
          {children}
        </CheckboxGroupContext.Provider>
      </div>
    </div>
  )
}
