/**
 * @fileoverview Lithos UI DropdownTrigger primitive.
 * - Re-exports `PopoverTrigger` to attach reference listeners and aria attributes.
 * - Acts as the entry point element that toggles or opens the main dropdown.
 */
import { PopoverTrigger } from '../popover/PopoverTrigger'
import type { PopoverTriggerProps } from '../popover/popover.types'

/**
 * Trigger element component wrapper for activating the dropdown menu.
 *
 * @param props - Popover trigger configuration properties. - {@link PopoverTriggerProps}
 * @returns Trigger element wrapper.
 */
export const DropdownTrigger = (props: PopoverTriggerProps) => <PopoverTrigger {...props} />
