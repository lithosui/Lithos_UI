/**
 * @fileoverview Lithos UI CommandInput component.
 * - Search text input field providing real-time query updates, combobox semantics, and an optional clear trigger button.
 */
import { type ChangeEvent } from 'react'
import { cn } from '../../../utils/cn'
import { IconSearch } from '../icons/IconSearch'
import { IconClose } from '../icons/IconClose'
import type { CommandInputProps } from './command.types'
import { useCommand } from './CommandContext'

/**
 * Text search input component for filtering command palette options.
 *
 * @param props - Input configuration properties including placeholders, icons, and clear triggers. - {@link CommandInputProps}
 * @returns Combobox wrapper input element.
 */
export const CommandInput = ({
  placeholder = 'Type a command or search...',
  value,
  onValueChange,
  icon,
  clearable = true,
  className,
  'aria-label': ariaLabel,
  ...rest
}: CommandInputProps) => {
  const { search, setSearch, listId, setIsOpen } = useCommand()
  const inputValue = value !== undefined ? value : search

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value
    setSearch(next)
    onValueChange?.(next)
    setIsOpen(true)
  }

  const handleClear = () => {
    setSearch('')
    onValueChange?.('')
  }

  return (
    <div
      data-slot="command-input-wrapper"
      className="relative flex items-center border-b-2 border-(--lithos-border) px-3 py-2 bg-(--lithos-surface)"
    >
      <span className="inline-flex shrink-0 mr-2 opacity-60 text-(--lithos-text)" aria-hidden="true">
        {icon || <IconSearch size={18} />}
      </span>
      <input
        data-slot="command-input"
        type="text"
        role="combobox"
        aria-label={ariaLabel || placeholder}
        aria-controls={listId}
        aria-expanded="true"
        aria-autocomplete="list"
        value={inputValue}
        onChange={handleChange}
        onFocus={() => setIsOpen(true)}
        onClick={() => setIsOpen(true)}
        placeholder={placeholder}
        className={cn(
          'w-full bg-transparent font-sans text-sm font-medium text-(--lithos-text) placeholder:text-(--lithos-text)/50 outline-none border-none p-0 focus:ring-0',
          className
        )}
        {...rest}
      />
      {clearable && Boolean(inputValue) && (
        <button
          type="button"
          data-slot="command-input-clear"
          aria-label="Clear search"
          onClick={handleClear}
          className="inline-flex shrink-0 items-center justify-center p-0.5 ml-1 text-(--lithos-text) opacity-50 hover:opacity-100 transition-opacity cursor-pointer focus:outline-none"
        >
          <IconClose size={16} />
        </button>
      )}
    </div>
  )
}
