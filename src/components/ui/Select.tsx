/**
 * @fileoverview Lithos UI select primitive root.
 * - Manages single and multi-selection modes with controlled and uncontrolled state patterns.
 * - Supports automatic data-driven option rendering or flexible sub-component composition via Context API.
 * - Integrates popover positioning and overlay controls for accessible dropdown behaviors.
 */
import { useState, useRef, type MouseEvent, type KeyboardEvent, type ReactNode } from 'react'
import { cn, type LithosClass } from '../../utils/cn'
import { Popover } from './Popover'
import { IconChevronDown } from './icons/IconChevronDown'
import { SelectTrigger } from './select/SelectTrigger'
import { SelectContext, useSelect } from './select/useSelect'
import { SelectItem } from './select/SelectItem'
import { SelectContent } from './select/SelectContent'

export type SelectOnChangeEvent<T = string> = (
  value: T,
  event: MouseEvent<HTMLLIElement> | KeyboardEvent<HTMLLIElement>
) => void

export interface SelectOption {
  label: string
  value: string
  disabled?: boolean
  icon?: ReactNode
}

export type SelectProps = {
  options?: SelectOption[]
  placeholder?: string
  className?: LithosClass
  disabled?: boolean
  children?: ReactNode
} & (
  | {
      multiple?: false
      value?: string
      defaultValue?: string
      onChange?: SelectOnChangeEvent
    }
  | {
      multiple: true
      value?: string[]
      defaultValue?: string[]
      onChange?: SelectOnChangeEvent<string[]>
    }
)

const Select = ({
  options,
  value: controlledValue,
  defaultValue,
  onChange,
  placeholder = 'Select an option...',
  className,
  disabled = false,
  children,
  multiple = false,
}: SelectProps) => {
  const [uncontrolledValue, setUncontrolledValue] = useState<string | string[]>(defaultValue ?? (multiple ? [] : ''))
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const elementsRef = useRef<Array<HTMLElement | null>>([])

  const selectedValue = controlledValue ?? uncontrolledValue

  const handleSelect: SelectOnChangeEvent = (optionValue, e) => {
    if (multiple) {
      const currentValues = Array.isArray(selectedValue) ? selectedValue : []
      const exists = currentValues.includes(optionValue)

      const nextValues = exists ? currentValues.filter((val) => val !== optionValue) : [...currentValues, optionValue]

      if (controlledValue === undefined) setUncontrolledValue(nextValues)
      ;(onChange as SelectOnChangeEvent<string[]>)?.(nextValues, e)
    } else {
      if (controlledValue === undefined) setUncontrolledValue(optionValue)

      ;(onChange as SelectOnChangeEvent<string>)?.(optionValue, e)
      setOpen(false)
    }
  }

  const renderTriggerContent = () => {
    if (multiple) {
      const selectedArray = Array.isArray(selectedValue) ? selectedValue : []

      if (selectedArray.length === 0) return placeholder

      const matchedLabels = options?.filter((opt) => selectedArray.includes(opt.value)).map((opt) => opt.label)

      return matchedLabels?.length ? matchedLabels.join(', ') : placeholder
    }

    const selectedOption = options?.find((opt) => opt.value === selectedValue)

    return (
      <span className="flex items-center space-x-2 truncate min-w-0">
        {selectedOption?.icon && <span className="shrink-0">{selectedOption.icon}</span>}
        <span className="truncate min-w-0">{selectedOption ? selectedOption.label : placeholder}</span>
      </span>
    )
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <SelectContext.Provider
        value={{
          open,
          setOpen,
          selectedValue,
          handleSelect,
          activeIndex,
          setActiveIndex,
          elementsRef,
          multiple,
        }}
      >
        {/* 'children' is passed as custom layout */}
        {children ? (
          children
        ) : (
          /* default layout, simple Select usage */
          <>
            <SelectTrigger disabled={disabled} className={cn('w-full justify-between', className)}>
              <span className="truncate min-w-0">{renderTriggerContent()}</span>
              <IconChevronDown className="ml-2 shrink-0 opacity-60" />
            </SelectTrigger>

            <SelectContent>
              {options?.map((opt) => (
                <SelectItem key={opt.value} value={opt.value} disabled={!!opt.disabled}>
                  {opt.icon && <span className="mr-2 shrink-0">{opt.icon}</span>}
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </>
        )}
      </SelectContext.Provider>
    </Popover>
  )
}

export {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,

  /* eslint-disable-next-line react-refresh/only-export-components */
  useSelect,
}
