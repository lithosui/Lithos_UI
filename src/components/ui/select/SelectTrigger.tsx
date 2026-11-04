/**
 * @fileoverview Lithos UI select trigger component.
 * - Acts as the interactive anchor button that toggles the select dropdown popover.
 * - Syncs visual active/pressed states with select context and popover open state.
 * - Wraps Lithos UI Button component to maintain design system consistency.
 */
import { PopoverTrigger } from '../popover/PopoverTrigger'
import { usePopoverContext } from '../popover/usePopover'
import { Button } from '../Button'
import { useSelect } from './useSelect'
import type { SelectTriggerProps } from './select.types'

/**
 * Anchor trigger button component opening and closing the select dropdown popover.
 *
 * @param props - Trigger properties including placeholder texts, labels, and custom classes. - {@link SelectTriggerProps}
 * @returns Trigger button element wrapper.
 */
export const SelectTrigger = ({
  children,
  open: openProp,
  className,
  label,
  'aria-label': ariaLabel,
  placeholder,
  ...rest
}: SelectTriggerProps) => {
  const { open: contextOpen } = useSelect()
  const { labelId } = usePopoverContext()

  const isOpen = openProp ?? contextOpen
  const computedAriaLabel = label || ariaLabel || placeholder

  return (
    <PopoverTrigger asChild>
      <Button
        id={labelId}
        variant="secondary"
        className={['justify-start', isOpen && 'hover:shadow-[2px_2px_0_0_var(--lithos-shadow)]', className]}
        aria-label={computedAriaLabel}
        {...rest}
      >
        {children}
      </Button>
    </PopoverTrigger>
  )
}
