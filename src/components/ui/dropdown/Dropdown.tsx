/**
 * @fileoverview Lithos UI Dropdown root primitive.
 * - Wraps the low-level `Popover` provider to manage open state and floating context.
 * - Serves as the top-level container for all dropdown subcomponents.
 * - Exports `menuItemClass` to enforce consistent interactive styles across items and sub menu triggers.
 */
import { useMemo, type ReactNode } from 'react'
import { Popover } from '../Popover'
import { DropdownContext } from './useDropdown'
import { usePopoverContext } from '../popover/usePopover'
import type { DropdownProps } from './dropdown.types'

const DropdownRoot = ({ placement = 'bottom-end', ...props }: DropdownProps) => (
  <Popover {...props} placement={placement} role="menu" />
)

const DropdownProvider = ({ children }: { children: ReactNode }) => {
  const { open, setOpen, refs } = usePopoverContext()

  const value = useMemo(
    () => ({
      open,
      close: () => setOpen(false),
      toggle: () => setOpen(!open),
      triggerRef: refs.reference,
    }),
    [open, refs.reference, setOpen]
  )

  return <DropdownContext.Provider value={value}>{children}</DropdownContext.Provider>
}

/**
 * Root container component for dropdown menus, establishing popover positioning and menu contexts.
 *
 * @param props - Dropdown configuration properties and child menu components. - {@link DropdownProps}
 * @returns Dropdown root wrapper element.
 */
export const Dropdown = ({ children, ...props }: DropdownProps) => (
  <DropdownRoot {...props}>
    <DropdownProvider>{children}</DropdownProvider>
  </DropdownRoot>
)

/** Standardized CSS class string enforcing consistent interactive hover, focus, and disabled states across menu items. */
export const menuItemClass =
  'w-full justify-start text-start select-none rounded-(--lithos-radius) relative text-sm hover:bg-(--lithos-accent)/10 focus:bg-(--lithos-accent)/10 outline-none active:translate-none disabled:pointer-events-none disabled:opacity-50'
