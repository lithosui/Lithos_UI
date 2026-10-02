import type { SidebarItemProps } from './sidebar.types'
import { useSidebar } from './useSidebar'
import { cn } from '../../../utils/cn'
import { Button } from '../Button'

export const SidebarItem = ({ icon, children, active, onClick, className, ...rest }: SidebarItemProps) => {
  const { mode, open } = useSidebar()
  const isCollapsed = mode === 'mini' && !open

  return (
    <Button
      onClick={onClick}
      variant={active ? 'primary' : 'text'}
      title={isCollapsed && typeof children === 'string' ? children : undefined}
      {...rest}
      className={cn('flex items-center w-full space-x-3 active:translate-none shadow-none justify-start', className)}
    >
      {icon && <span className="text-xl shrink-0 flex items-center justify-center w-6">{icon}</span>}
      {!isCollapsed && <span className="truncate text-left flex-1 leading-snug">{children}</span>}
    </Button>
  )
}
