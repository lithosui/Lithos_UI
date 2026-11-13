/**
 * @fileoverview Lithos UI standard Checkbox component.
 * - Renders a checked icon indicator inside the box when active.
 */
import type { CheckboxProps } from './checkbox.types'
import { BaseCheckbox } from './BaseCheckbox'

/**
 * Standard checkbox component featuring a visible check mark icon when selected.
 *
 * @param props - Checkbox configuration properties. - {@link CheckboxProps}
 * @returns Standard checkbox element.
 */
export const Checkbox = (props: CheckboxProps) => <BaseCheckbox showCheck {...props} />
