import type { SidebarTriggerProps } from './sidebar.types'
import { useSidebar } from './useSidebar'
import { Button } from '../Button'
import { IconChevronLeft } from '../icons/IconChevronLeft'
import { IconSidebar } from '../icons/IconSidebar'

export const SidebarTrigger = ({ children, className, label, ...rest }: SidebarTriggerProps) => {
  const { mode, open, setOpen } = useSidebar()

  if (mode === 'permanent') return null

  return (
    <Button
      variant="text"
      onClick={() => setOpen(!open)}
      className={['active:translate-none transition-transform', className]}
      aria-label={label ?? (open ? 'Collapse sidebar' : 'Expand sidebar')}
      {...rest}
    >
      {children ?? (open ? <IconChevronLeft size={18} /> : <IconSidebar size={18} />)}
    </Button>
  )
}
