/**
 * @fileoverview Lithos UI select type definitions.
 * - Defines option structures, event payloads, and context shapes for single and multi-selection modes.
 * - Exports public component props interfaces for consumer typing.
 */
import type { ReactNode, MouseEvent, KeyboardEvent, RefObject } from 'react'
import type { LithosClass } from '../../../utils/cn'
import type { LithosElementProps } from '../../../core/types'

/** Utility function type for registering element references by index. */
export type RegisterElementProps = (index: number, node: HTMLElement | null) => void

/** Props configuration interface for the `SelectContent` component. */
export interface SelectContentProps extends LithosElementProps<'div'> {
  /** Enables keyboard navigation wrapping loops from last to first item and vice versa. */
  loop?: boolean

  /** Threshold item count or boolean toggle enabling virtualized scrolling lists. */
  virtualizeThreshold?: number | boolean

  /** Estimated pixel height per virtualized item row. */
  estimateSize?: number

  /** Extra buffer item count rendered outside the visible virtualized viewport. */
  overscan?: number
}

/** Props configuration interface for the `SelectTrigger` component. */
export interface SelectTriggerProps extends LithosElementProps<'button'> {
  /** Controlled open state override for the trigger button. */
  open?: boolean

  /** Accessible label string for screen reader announcements. */
  label?: string | undefined

  /** Placeholder text string displayed when no option is selected. */
  placeholder?: string | undefined
}

/** Props configuration interface for the `SelectItem` component. */
export interface SelectItemProps extends LithosElementProps<'li'> {
  /** Unique string value identifier associated with the option item. */
  value: string

  /** Disables interaction and selection states for this item. */
  disabled?: boolean

  /** Explicit numerical index position in the option list. */
  index?: number
}

/** Option data structure definition for data-driven select rendering. */
export interface SelectOption {
  /** Text label displayed for the option. */
  label: string

  /** Unique string value identifier for the option. */
  value: string

  /** Disables interaction for this specific option. */
  disabled?: boolean

  /** Optional icon element rendered alongside the option label. */
  icon?: ReactNode
}

/** Event handler callback signature for selecting option values. */
export type HandleSelectType = <T extends HTMLElement = HTMLElement>(
  value: string,
  e: MouseEvent<T> | KeyboardEvent<T>
) => void

/** Context value contract shared across select subcomponents. */
export interface SelectContextType {
  /** Currently selected value string or array of strings. */
  selectedValue: string | string[]

  /** Callback handler triggered to select an option value. */
  handleSelect: HandleSelectType

  /**
   * Indicates whether the select dropdown popover is currently open.
   * @default false
   */
  open: boolean

  /** Setter function to update the open visibility state of the popover. */
  setOpen: (open: boolean) => void

  /** Index position of the currently focused active item in the list. */
  activeIndex: number | null

  /** Setter function to update the active item index. */
  setActiveIndex: (index: number | null) => void

  /** Mutable reference array tracking DOM elements of select items. */
  elementsRef: RefObject<Array<HTMLElement | null>>

  /** Mutable reference array tracking option text labels for typeahead search. */
  labelsRef: RefObject<Array<string | null>>

  /**
   * Enables multi-selection mode when true.
   * @default false
   */
  multiple?: boolean

  /** Index position of the currently selected item. */
  selectedIndex: number | null

  /** Setter function to update the selected index. */
  setSelectedIndex: (index: number | null) => void

  /** Function to register DOM element references by index. */
  registerElement: RegisterElementProps

  /** Optional array of data-driven select options. */
  options?: SelectOption[] | undefined
}

/** Event handler callback type for selection changes. */
export type SelectOnChangeEvent<V = string, T extends HTMLElement = HTMLElement> = (
  value: V,
  event: MouseEvent<T> | KeyboardEvent<T>
) => void

// 'Select an option...'

/** Props configuration interface for the root `Select` component, supporting single and multi-select overloads. */
export type SelectProps = {
  /** Optional array of data-driven select options to render automatically. */
  options?: SelectOption[]

  /**
   * Placeholder text string displayed when no option is selected.
   * @default 'Select an option...'
   */
  placeholder?: string

  /** Custom CSS classes applied to the root select container. */
  className?: LithosClass

  /** Disables interaction for the entire select component. */
  disabled?: boolean

  /** Child nodes for custom composite subcomponent layouts. */
  children?: ReactNode

  /** Accessible label string. */
  label?: string
} & (
  | {
      /** Enforces single-selection mode. */
      multiple?: false

      /** Controlled selected value string. */
      value?: string

      /** Uncontrolled initial default selected value string. */
      defaultValue?: string

      /** Callback function triggered when the selection changes. */
      onChange?: SelectOnChangeEvent
    }
  | {
      /** Enables multi-selection mode. */
      multiple: true

      /** Controlled selected value array of strings. */
      value?: string[]

      /** Uncontrolled initial default selected value array of strings. */
      defaultValue?: string[]

      /** Callback function triggered when selections change. */
      onChange?: SelectOnChangeEvent<string[]>
    }
)
