/**
 * @fileoverview Lithos UI popover root container primitive.
 * - Instantiates the popover state via `usePopover` and exposes it down the tree through Context.
 * - Accepts both controlled and uncontrolled open options alongside positioning configurations.
 */
import { usePopover, PopoverContext } from './usePopover'
import type { PopoverProps } from './popover.types'

/**
 * Root container component for popovers, instantiating floating context state and managing modal options.
 *
 * @param props - Popover options and child elements. - {@link PopoverProps}
 * @returns Popover context provider element.
 */
export const Popover = ({ children, modal = false, ...restOptions }: PopoverProps) => {
  const popover = usePopover({ modal, ...restOptions })
  return <PopoverContext.Provider value={popover}>{children}</PopoverContext.Provider>
}
