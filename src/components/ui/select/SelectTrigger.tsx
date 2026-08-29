/**
 * @fileoverview Lithos UI select trigger component.
 * - Acts as the interactive anchor button that toggles the select dropdown popover.
 * - Syncs visual active/pressed states with select context and popover open state.
 * - Wraps Lithos UI Button component to maintain design system consistency.
 */
import type { ComponentPropsWithRef } from 'react'
import { PopoverTrigger } from '../Popover'
import { Button } from '../Button'
import { useSelect } from './useSelect'

interface SelectTriggerProps extends ComponentPropsWithRef<'button'> {
  open?: boolean
}

export const SelectTrigger = ({ children, open: openProp, className, ...rest }: SelectTriggerProps) => {
  const { open: contextOpen } = useSelect()

  const isOpen = openProp ?? contextOpen

  return (
    <PopoverTrigger asChild>
      <Button
        variant="secondary"
        className={[
          'justify-start',
          isOpen && 'shadow-[0px_0px_0_0_var(--lithos-shadow)] shadow-none translate-x-0.5 translate-y-0.5',
          className,
        ]}
        {...rest}
      >
        {children}
      </Button>
    </PopoverTrigger>
  )
}
