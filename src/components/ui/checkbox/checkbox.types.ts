/**
 * @fileoverview Lithos UI checkbox type definitions and interfaces.
 * - Defines structured option props, group context contracts, icon variants, and container layouts for checkbox primitives.
 */
import type { ComponentType, ReactNode } from 'react'
import type { HexColor, LithosElementProps } from '../../../core/types'
import type { LithosClass } from '../../../utils/cn'
import type { IconProps } from '../icons/IconBase'

/**
 * Context type contract for managing multi-select checkbox group states.
 */
export interface CheckboxGroupContextType {
  /** Array of currently selected values within the group. */
  value: string[]

  /** Callback triggered to toggle a specific item value. */
  onToggleValue: (value: string) => void

  /** Disables all nested checkboxes within the group. */
  disabled: boolean

  /** HTML input name shared across group checkboxes. */
  name?: string | undefined
}

/**
 * Props for the `Checkbox` and `PlainCheckbox` components.
 */
export interface CheckboxProps extends Omit<LithosElementProps<'input'>, 'type' | 'size' | 'value'> {
  /** Custom highlight color override for the checkbox box fill. */
  color?: HexColor | string | undefined

  /** Enables indeterminate state appearance. */
  indeterminate?: boolean | undefined

  /** Optional label node rendered next to the checkbox. */
  label?: ReactNode

  /** Optional explanatory description text rendered beneath the label. */
  description?: ReactNode

  /** Value payload identifier used within a `CheckboxGroup`. */
  value?: string | undefined
}

/**
 * Props for the `IconCheckbox` component.
 */
export interface IconCheckboxProps extends CheckboxProps {
  /** Custom icon component rendered when the checkbox is unchecked. */
  icon?: ComponentType<IconProps>

  /** Custom icon component rendered when the checkbox is checked. */
  checkedIcon?: ComponentType<IconProps>
}

/** Layout orientation mode for grouped checkboxes. */
export type CheckboxGroupMode = 'horizontal' | 'vertical'

/**
 * Props for the `CheckboxGroup` component.
 */
export interface CheckboxGroupProps {
  /** Array of currently selected string values. */
  value: string[]

  /** Callback function triggered when selection values change. */
  onChange: (value: string[]) => void

  /** Group legend or heading label node. */
  label?: ReactNode

  /** Optional description text displayed under the group label. */
  description?: ReactNode

  /** Layout orientation mode for grouped checkboxes. @default 'vertical' */
  mode?: CheckboxGroupMode | undefined

  /** Disables all nested checkboxes in the group. */
  disabled?: boolean | undefined

  /** HTML form input name attribute for the group. */
  name?: string | undefined

  /** Custom CSS class names applied to the group container. */
  className?: LithosClass

  /** Nested checkbox items. */
  children: ReactNode
}

/**
 * Props for the internal `BaseCheckbox` rendering primitive, extending standard `CheckboxProps`
 * with internal visibility toggles for the check icon.
 */
export interface BaseCheckboxProps extends CheckboxProps {
  /** Determines whether the check mark icon is rendered inside the box. */
  showCheck?: boolean
}
