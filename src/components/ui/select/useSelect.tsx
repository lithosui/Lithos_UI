/**
 * @fileoverview Lithos UI select context hook.
 * - Exposes select state, value handlers, and list navigation refs to composite subcomponents.
 * - Guarantees safe usage by asserting context existence inside consumer components.
 */
import { useContext, createContext, type MouseEvent, type KeyboardEvent, type RefObject } from 'react'

export interface SelectContextType {
  selectedValue: string | string[]
  handleSelect: (value: string, e: MouseEvent<HTMLLIElement> | KeyboardEvent<HTMLLIElement>) => void
  open: boolean
  setOpen: (open: boolean) => void
  activeIndex: number | null
  setActiveIndex: (index: number | null) => void
  elementsRef: RefObject<Array<HTMLElement | null>>
  multiple?: boolean
}

export const SelectContext = createContext<SelectContextType | null>(null)

export const useSelect = () => {
  const context = useContext(SelectContext)

  if (!context) throw new Error('Select subcomponents must be used within <Select>')

  return context
}
