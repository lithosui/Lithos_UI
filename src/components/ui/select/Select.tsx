/**
 * @fileoverview Lithos UI select primitive root.
 * - Manages single and multi-selection modes with controlled and uncontrolled state patterns.
 * - Supports automatic data-driven option rendering or flexible sub-component composition via Context API.
 * - Integrates popover positioning and overlay controls for accessible dropdown behaviors.
 */
import { useState, useRef, useMemo } from 'react'
import { cn } from '../../../utils/cn'
import { Popover } from '../popover/Popover'
import { IconChevronDown } from '../icons/IconChevronDown'
import { SelectTrigger } from './SelectTrigger'
import { SelectContext } from './useSelect'
import { SelectItem } from './SelectItem'
import { SelectContent } from './SelectContent'
import { useFloating, useListNavigation, useTypeahead } from '@floating-ui/react'
import type { RegisterElementProps, SelectOption, SelectOnChangeEvent, SelectProps } from './select.types'

const getOptionIndex = (options: SelectOption[] | undefined, val: string | number | undefined | null) => {
  if (val === undefined || val === null || val === '') return null

  const strVal = String(val)
  const index = options?.findIndex((opt) => String(opt.value) === strVal)

  if (index === undefined) return null

  return index !== -1 ? index : null
}

/**
 * Root select component managing single and multi-selection states, popover positioning, and automatic or composite option rendering.
 *
 * @param props - Select configuration properties including options, values, modes, and event handlers. - {@link SelectProps}
 * @returns Select popover container provider element.
 */
export const Select = ({
  options,
  value: controlledValue,
  defaultValue,
  onChange,
  placeholder = 'Select an option...',
  className,
  disabled = false,
  children,
  multiple = false,
  label = undefined,
  emptyMessage = 'No options available',
}: SelectProps) => {
  const [uncontrolledValue, setUncontrolledValue] = useState<string | string[]>(() => {
    if (Array.isArray(defaultValue)) return defaultValue
    if (defaultValue) return defaultValue

    return multiple ? [] : ''
  })
  const [open, setOpen] = useState(false)
  const elementsRef = useRef<Array<HTMLElement | null>>([])

  const selectedValue =
    controlledValue === undefined
      ? uncontrolledValue
      : Array.isArray(controlledValue)
        ? controlledValue
        : controlledValue

  const targetValue = Array.isArray(selectedValue) ? selectedValue.at(-1) : selectedValue

  const initialCalculatedIndex = getOptionIndex(options, targetValue)

  const [activeIndex, setActiveIndex] = useState<number | null>(initialCalculatedIndex)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(initialCalculatedIndex)

  const optionsLabels = useMemo(() => options?.map((opt) => opt.label) ?? [], [options])
  const labelsRef = useRef(optionsLabels)
  labelsRef.current = optionsLabels

  const { context } = useFloating()

  const listNav = useListNavigation(context, {
    listRef: elementsRef,
    activeIndex,
    selectedIndex,
    scrollItemIntoView: false,
  })

  const typeahead = useTypeahead(context, {
    listRef: labelsRef,
    activeIndex,
    selectedIndex,
    onMatch: open ? setActiveIndex : setSelectedIndex,
  })

  const handleSelect: SelectOnChangeEvent<string> = (optionValue, e) => {
    const strValue = optionValue

    if (multiple) {
      const currentValues = Array.isArray(selectedValue) ? selectedValue : []
      const exists = currentValues.includes(strValue)

      const nextValues = exists ? currentValues.filter((val) => val !== strValue) : [...currentValues, strValue]

      if (controlledValue === undefined) setUncontrolledValue(nextValues)
      ;(onChange as SelectOnChangeEvent<string[]>)?.(nextValues, e)

      const lastOption = nextValues.at(-1)
      const nextIndex = getOptionIndex(options, lastOption)

      setActiveIndex(nextIndex)
      setSelectedIndex(nextIndex)
    } else {
      if (controlledValue === undefined) setUncontrolledValue(optionValue)

      ;(onChange as SelectOnChangeEvent<string>)?.(optionValue, e)
      setOpen(false)

      const targetIndex = getOptionIndex(options, strValue)
      setActiveIndex(targetIndex)
      setSelectedIndex(targetIndex)
    }
  }

  const selectedOption = useMemo(() => {
    if (multiple) return null
    return options?.find((opt) => opt.value === selectedValue)
  }, [options, selectedValue, multiple])

  const renderTriggerContent = () => {
    if (multiple) {
      const selectedArray = Array.isArray(selectedValue) ? selectedValue : []

      if (selectedArray.length === 0) return placeholder

      const matchedLabels = options?.filter((opt) => selectedArray.includes(opt.value))?.map((opt) => opt.label)

      return matchedLabels?.length ? matchedLabels.join(', ') : placeholder
    }

    return (
      <span className="flex items-baseline space-x-2 min-w-0">
        {selectedOption?.icon ? (
          <>
            {selectedOption?.icon && <span className="shrink-0">{selectedOption.icon}</span>}
            <span>{selectedOption ? selectedOption.label : placeholder}</span>
          </>
        ) : selectedOption ? (
          selectedOption.label
        ) : (
          placeholder
        )}
      </span>
    )
  }

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen && options?.length) {
      const currentTarget = Array.isArray(selectedValue) ? selectedValue.at(-1) : selectedValue
      const index = getOptionIndex(options, currentTarget) ?? 0

      setActiveIndex(index)
      setSelectedIndex(index)
    }

    setOpen(isOpen)
  }

  const registerElement: RegisterElementProps = (index, node) => {
    if (index !== null && index !== undefined) {
      elementsRef.current[index] = node
    }
  }

  const interactions = useMemo(() => [listNav, typeahead], [listNav, typeahead])

  return (
    <Popover open={open} onOpenChange={handleOpenChange} role="select" interactions={interactions}>
      <SelectContext.Provider
        value={{
          open,
          setOpen,
          selectedValue,
          handleSelect,
          activeIndex,
          setActiveIndex,
          elementsRef,
          labelsRef,
          multiple,
          selectedIndex,
          setSelectedIndex,
          registerElement,
          options,
          emptyMessage,
        }}
      >
        {children ? (
          children
        ) : (
          <>
            <SelectTrigger
              disabled={disabled}
              className={cn('w-full justify-between', className)}
              label={label}
              placeholder={typeof placeholder === 'string' ? placeholder : undefined}
            >
              <span className="min-w-0 truncate leading-[1.15]">{renderTriggerContent()}</span>
              <IconChevronDown className="ml-2 shrink-0 opacity-60" />
            </SelectTrigger>

            <SelectContent emptyMessage={emptyMessage}>
              {options?.map((opt, i) => (
                <SelectItem key={opt.value} value={opt.value} index={i} disabled={!!opt.disabled}>
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
