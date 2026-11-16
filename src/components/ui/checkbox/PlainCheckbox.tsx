/**
 * @fileoverview Lithos UI PlainCheckbox component.
 * - Renders a flat filled box without any internal check icon.
 */
import type { CheckboxProps } from './checkbox.types'
import { BaseCheckbox } from './BaseCheckbox'

/**
 * Plain checkbox component rendering a solid fill box without an internal check icon.
 *
 * @param props - Checkbox configuration properties. - {@link CheckboxProps}
 * @returns Plain checkbox element.
 */
export const PlainCheckbox = (props: CheckboxProps) => <BaseCheckbox {...props} />
