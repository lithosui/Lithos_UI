/**
 * @fileoverview Lithos UI IconCheckbox toggle component.
 * - Replaces the standard square box with an icon pair (outline for unchecked, filled for checked) designed for favorite/like controls.
 */
import { useEffect, useId, useRef, useContext, type ChangeEvent, type CSSProperties } from 'react'
import { cn } from '../../../utils/cn'
import { IconHeart } from '../icons/IconHeart'
import { IconHeartOutline } from '../icons/IconHeartOutline'
import { IconMinus } from '../icons/IconMinus'
import type { IconCheckboxProps } from './checkbox.types'
import { CheckboxGroupContext } from './useCheckboxGroup'

/**
 * Icon toggle checkbox component swapping visual icon states for like/favorite interactions.
 *
 * @param props - Icon checkbox configuration properties including custom icon components. - {@link IconCheckboxProps}
 * @returns Icon toggle container element.
 */
export const IconCheckbox = ({
  color,
  indeterminate = false,
  label,
  description,
  disabled,
  checked,
  defaultChecked,
  onChange,
  value,
  id,
  name,
  className,
  style,
  ref,
  icon: Icon = IconHeartOutline,
  checkedIcon: CheckedIcon = IconHeart,
  ...rest
}: IconCheckboxProps) => {
  const group = useContext(CheckboxGroupContext)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const generatedId = useId()
  const inputId = id ?? generatedId

  const isGroupItem = group !== null && value !== undefined

  const resolvedDisabled = disabled ?? group?.disabled ?? false
  const resolvedName = name ?? group?.name

  useEffect(() => {
    if (inputRef.current) inputRef.current.indeterminate = indeterminate
  }, [indeterminate])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (isGroupItem) group!.onToggleValue(value!)
    onChange?.(event)
  }

  const fillColor = color || 'var(--lithos-accent)'
  const colorVars = { '--cb-color': fillColor } as CSSProperties

  const iconClasses = 'w-5 h-5 transition-opacity duration-75'
  const outlineClasses = cn(iconClasses, 'opacity-100 peer-checked:opacity-0')
  const filledClasses = cn(
    iconClasses,
    'absolute inset-0 opacity-0 peer-checked:opacity-100 peer-indeterminate:opacity-0'
  )
  const minusClasses = cn(
    iconClasses,
    'absolute inset-0 opacity-0 peer-indeterminate:opacity-100 p-0.5 rounded-full bg-(--lithos-surface)'
  )

  return (
    <label
      htmlFor={inputId}
      className={cn(
        'inline-flex items-start',
        resolvedDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
        className
      )}
      style={style}
    >
      <span className="relative inline-flex shrink-0 w-5 h-5" style={colorVars}>
        <input
          ref={(node: HTMLInputElement | null) => {
            inputRef.current = node
            if (typeof ref === 'function') ref(node)
            else if (ref) ref.current = node
          }}
          type="checkbox"
          id={inputId}
          checked={isGroupItem ? group.value.includes(value) : checked}
          defaultChecked={isGroupItem ? undefined : defaultChecked}
          onChange={handleChange}
          disabled={resolvedDisabled}
          value={value}
          name={resolvedName}
          className="peer sr-only"
          {...rest}
        />
        <Icon aria-hidden="true" className={outlineClasses} style={{ color: 'var(--lithos-border)' }} />
        <CheckedIcon aria-hidden="true" className={filledClasses} style={{ color: 'var(--cb-color)' }} />
        <IconMinus aria-hidden="true" className={minusClasses} style={{ color: 'var(--lithos-text)' }} />
      </span>

      {(label || description) && (
        <span className="flex flex-col ml-2">
          {label && <span className="font-bold font-body leading-tight text-base">{label}</span>}
          {description && <span className="text-xs font-body opacity-70 leading-tight mt-0.5">{description}</span>}
        </span>
      )}
    </label>
  )
}
