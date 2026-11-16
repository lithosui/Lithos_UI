/**
 * @fileoverview Lithos UI root Command palette component.
 * - Manages centralized state for search query, active keyboard focus, item registration, and outside-click dismissal.
 * - Handles keyboard navigation dispatchers (ArrowUp, ArrowDown, Home, End, Enter).
 */
import { useState, useId, useCallback, useMemo, useRef, useEffect, type KeyboardEvent } from 'react'
import { cn } from '../../../utils/cn'
import type { CommandProps, CommandItemMeta, CommandContextValue } from './command.types'
import { CommandContext } from './CommandContext'

/**
 * Root container component for the command palette suite, establishing context state and keyboard navigation logic.
 *
 * @param props - Command container properties including controlled value, filtering functions, and children. - {@link CommandProps}
 * @returns Command container application element.
 */
export const Command = ({
  value: controlledValue,
  onValueChange,
  filter,
  requireSearch = false,
  className,
  children,
  ...rest
}: CommandProps) => {
  const [uncontrolledSearch, setUncontrolledSearch] = useState('')
  const search = controlledValue !== undefined ? controlledValue : uncontrolledSearch
  const listId = useId()
  const [isOpen, setIsOpen] = useState(false)

  const setSearch = useCallback(
    (newSearch: string) => {
      if (controlledValue === undefined) {
        setUncontrolledSearch(newSearch)
      }
      onValueChange?.(newSearch)
    },
    [controlledValue, onValueChange]
  )

  const [items, setItems] = useState<Map<string, CommandItemMeta>>(new Map())
  const [activeId, setActiveId] = useState<string | null>(null)

  const registerItem = useCallback((meta: CommandItemMeta) => {
    setItems((prev) => {
      const next = new Map(prev)
      next.set(meta.id, meta)
      return next
    })

    return () => {
      setItems((prev) => {
        const next = new Map(prev)
        next.delete(meta.id)
        return next
      })
    }
  }, [])

  const defaultFilter = useCallback((itemValue: string, query: string, keywords?: string[]) => {
    if (!query.trim()) return true

    const q = query.toLowerCase().trim()

    if (itemValue.toLowerCase().includes(q)) return true
    if (keywords && keywords.some((k) => k.toLowerCase().includes(q))) return true

    return false
  }, [])

  const filterItem = useCallback(
    (itemValue: string, keywords?: string[]) => {
      if (filter) return filter(itemValue, search, keywords)
      return defaultFilter(itemValue, search, keywords)
    },
    [filter, search, defaultFilter]
  )

  const visibleItems = useMemo(() => {
    const list: CommandItemMeta[] = []

    items.forEach((item) => {
      if (filterItem(item.value, item.keywords)) {
        list.push(item)
      }
    })

    return list
  }, [items, filterItem])

  const visibleItemsCount = visibleItems.length

  const effectiveActiveId = useMemo(() => {
    if (visibleItems.length === 0) return null

    const currentActive = visibleItems.find((item) => item.id === activeId)
    if (currentActive && !currentActive.disabled) return currentActive.id

    const firstEnabled = visibleItems.find((item) => !item.disabled)
    return firstEnabled ? firstEnabled.id : null
  }, [visibleItems, activeId])

  const isGroupVisible = useCallback(
    (groupId: string) => {
      if (!search.trim()) return true

      let hasVisible = false
      items.forEach((item) => {
        if (item.groupId === groupId && filterItem(item.value, item.keywords)) {
          hasVisible = true
        }
      })

      return hasVisible
    },
    [items, filterItem, search]
  )

  const contextValue = useMemo<CommandContextValue>(
    () => ({
      search,
      setSearch,
      activeId: effectiveActiveId,
      setActiveId,
      registerItem,
      filterItem,
      listId,
      items,
      visibleItemsCount,
      isGroupVisible,
      requireSearch,
      isOpen,
      setIsOpen,
    }),
    [
      search,
      setSearch,
      effectiveActiveId,
      registerItem,
      filterItem,
      listId,
      items,
      visibleItemsCount,
      isGroupVisible,
      requireSearch,
      isOpen,
    ]
  )

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (visibleItems.length === 0) return

    const enabledItems = visibleItems.filter((i) => !i.disabled)
    if (enabledItems.length === 0) return

    const currentIndex = enabledItems.findIndex((i) => i.id === effectiveActiveId)

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      const nextIndex = currentIndex < enabledItems.length - 1 ? currentIndex + 1 : 0
      const nextItem = enabledItems[nextIndex]
      if (nextItem) setActiveId(nextItem.id)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const prevIndex = currentIndex > 0 ? currentIndex - 1 : enabledItems.length - 1
      const prevItem = enabledItems[prevIndex]
      if (prevItem) setActiveId(prevItem.id)
    } else if (e.key === 'Home') {
      e.preventDefault()
      const first = enabledItems[0]
      if (first) setActiveId(first.id)
    } else if (e.key === 'End') {
      e.preventDefault()
      const last = enabledItems[enabledItems.length - 1]
      if (last) setActiveId(last.id)
    } else if (e.key === 'Enter') {
      const target = e.target as HTMLElement | null
      if (target?.closest('button')) return

      const active = enabledItems.find((i) => i.id === effectiveActiveId)
      if (active?.onSelect) {
        e.preventDefault()
        active.onSelect()
      }
    }
  }

  const classes = cn(
    'flex flex-col w-full overflow-hidden border-2 border-(--lithos-border) bg-(--lithos-surface) text-(--lithos-text) rounded-(--lithos-radius) shadow-[4px_4px_0_0_var(--lithos-shadow)]',
    className
  )

  const commandRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (commandRef.current && !commandRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <CommandContext.Provider value={contextValue}>
      <div
        ref={commandRef}
        data-slot="command"
        role="application"
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        className={classes}
        {...rest}
      >
        {children}
      </div>
    </CommandContext.Provider>
  )
}
