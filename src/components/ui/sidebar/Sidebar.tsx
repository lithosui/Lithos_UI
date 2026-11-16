/**
 * @fileoverview Lithos UI Sidebar root primitive.
 * - Provides layout context (`mode`, `open`, `role`, `setOpen`) across subcomponents using React Context API.
 * - Enforces stable reference memoization via `useMemo` to prevent unnecessary sub-tree re-renders.
 */
import { useMemo, useState, useCallback } from 'react'
import type { SidebarProps, SidebarSetOpen } from './sidebar.types'
import { cn } from '../../../utils/cn'
import { SidebarContext } from './useSidebar'

/**
 * Root context provider container for the Lithos UI sidebar system.
 * Manages open/collapsed states, breakpoints, sizing, and gesture responsiveness.
 *
 * @param props - Configuration options including mode, placement, breakpoints, and children. - {@link SidebarProps}
 * @returns Sidebar context provider wrapper wrapping the sidebar tree.
 */
export const Sidebar = ({
  open: openProp,
  defaultOpen = true,
  setOpen: setOpenProp,
  mode = 'permanent',
  role = 'complementary',
  placement = 'left',
  breakpoints = [64, 128, 224],
  children,
  className,
  ...rest
}: SidebarProps) => {
  const isControlled = openProp !== undefined

  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen)
  const open = isControlled ? openProp : uncontrolledOpen

  const setOpen = useCallback<SidebarSetOpen>(
    (value) => {
      const nextOpen = typeof value === 'function' ? value(open) : value

      if (!isControlled) setUncontrolledOpen(nextOpen)

      setOpenProp?.(nextOpen)
    },
    [isControlled, open, setOpenProp]
  )

  const sortedBreakpoints = useMemo(() => [...breakpoints].sort((a, b) => a - b), [breakpoints])

  const [activeWidth, setActiveWidth] = useState(() => {
    const minWidth = sortedBreakpoints[0] ?? 64
    const maxWidth = sortedBreakpoints[sortedBreakpoints.length - 1] ?? 224

    return open ? maxWidth : minWidth
  })

  const [isDragging, setIsDragging] = useState(false)

  // derivated breakpoint active index calc
  const activeBreakpointIndex = useMemo(() => {
    if (!open) return -1

    const index = sortedBreakpoints.indexOf(activeWidth)
    return index !== -1 ? index : sortedBreakpoints.length - 1
  }, [open, activeWidth, sortedBreakpoints])

  const value = useMemo(
    () => ({
      mode,
      open,
      role,
      setOpen,
      placement,
      breakpoints: sortedBreakpoints,
      activeWidth,
      setActiveWidth,
      activeBreakpointIndex,
      currentBreakpoint: open ? activeWidth : null,
      isDragging,
      setIsDragging,
    }),
    [mode, open, role, setOpen, placement, sortedBreakpoints, activeWidth, activeBreakpointIndex, isDragging]
  )

  return (
    <SidebarContext.Provider value={value}>
      <div className={cn('h-full shrink-0 bg-(--lithos-surface)', className)} {...rest}>
        {children}
      </div>
    </SidebarContext.Provider>
  )
}
