import { useMemo } from 'react'
import type { SidebarProps } from './sidebar.types'
import { cn } from '../../../utils/cn'
import { SidebarContext } from './useSidebar'

export const Sidebar = ({
  open = true,
  setOpen = () => {},
  mode = 'permanent',
  role = 'complementary',
  children,
  className,
  ...rest
}: SidebarProps) => {
  const value = useMemo(
    () => ({
      mode,
      open,
      role,
      setOpen,
    }),
    [mode, open, role, setOpen]
  )

  return (
    <SidebarContext.Provider value={value}>
      <div className={cn('h-full shrink-0 bg-(--lithos-surface)', className)} {...rest}>
        {children}
      </div>
    </SidebarContext.Provider>
  )
}
