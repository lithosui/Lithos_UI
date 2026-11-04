/**
 * @fileoverview Lithos UI BaseCheckbox internal rendering primitive.
 * - Manages native input state binding, indeterminate refs, label layouts, and check/minus indicators.
 */
import { useEffect, useId, useRef, useContext, type ChangeEvent, type CSSProperties } from 'react'
import { getContrastText } from '../../../utils/yiq'
import { cn } from '../../../utils/cn'
import { IconCheck } from '../icons/IconCheck'
import { IconMinus } from '../icons/IconMinus'
import type { BaseCheckboxProps } from './checkbox.types'
import { CheckboxGroupContext } from './useCheckboxGroup'

/**
 * Internal base component rendering the standard checkbox box, label, and interactive states.
 *
 * @param props - Base checkbox properties including showCheck toggle and styling configuration. - {@link BaseCheckboxProps}
 * @returns Checkbox container label element.
 */
export const BaseCheckbox = ({
  showCheck = false,
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
  ...rest
}: BaseCheckboxProps) => {
  const group = useContext(CheckboxGroupContext)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const generatedId = useId()
  const inputId = id ?? generatedId

  const isGroupItem = group !== null && value !== undefined

  const isDisabled = disabled ?? group?.disabled ?? false
  const resolvedName = name ?? group?.name

  useEffect(() => {
    if (inputRef.current) inputRef.current.indeterminate = indeterminate
  }, [indeterminate])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (isGroupItem) group!.onToggleValue(value!)
    onChange?.(event)
  }

  const boxColor = color || 'var(--lithos-accent)'
  const contrastColor = color ? getContrastText(color) : 'var(--lithos-accent-text)'

  const colorVars = {
    '--cb-color': boxColor,
    '--cb-contrast': contrastColor,
  } as CSSProperties

  const boxClasses = cn(
    'inline-block shrink-0 w-5 h-5 border-2 border-(--lithos-border) rounded-(--lithos-radius) transition-[box-shadow,transform,background-color] duration-75',
    'shadow-[2px_2px_0px_0px_var(--lithos-shadow)] peer-active:shadow-none peer-active:translate-x-0.5 peer-active:translate-y-0.5',
    'peer-focus-visible:ring-2 peer-focus-visible:ring-(--lithos-text) peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-(--lithos-bg)',
    'bg-(--lithos-surface) peer-checked:bg-[var(--cb-color)] peer-indeterminate:bg-[var(--cb-color)]'
  )

  const iconColorStyle = { color: 'var(--cb-contrast)' }
  const iconActiveTranslate = 'peer-active:translate-x-[calc(-50%+2px)] peer-active:translate-y-[calc(-45%+2px)]'

  const checkClasses = cn(
    'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[45%] w-3 h-3 transition-opacity duration-75',
    'opacity-0 peer-checked:opacity-100 peer-indeterminate:opacity-0',
    iconActiveTranslate
  )
  const minusClasses = cn(
    'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 transition-opacity duration-75',
    'opacity-0 peer-indeterminate:opacity-100',
    iconActiveTranslate
  )

  return (
    <label
      htmlFor={inputId}
      className={cn(
        'inline-flex items-start',
        isDisabled ? 'opacity-50 pointer-events-none select-none' : 'cursor-pointer',
        className
      )}
      style={style}
    >
      <span className="relative inline-flex shrink-0" style={colorVars}>
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
          disabled={isDisabled}
          value={value}
          name={resolvedName}
          className="peer sr-only"
          {...rest}
        />
        <span aria-hidden="true" className={boxClasses} />
        {showCheck && <IconCheck aria-hidden="true" className={checkClasses} style={iconColorStyle} />}
        <IconMinus aria-hidden="true" className={minusClasses} style={iconColorStyle} />
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
