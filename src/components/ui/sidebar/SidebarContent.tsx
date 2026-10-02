import type { ElementType } from 'react'
import type { SidebarContentProps } from './sidebar.types'
import { useSidebar } from './useSidebar'
import { cn } from '../../../utils/cn'

const containersMap = {
  complementary: 'div',
  region: 'section',
  navigation: 'nav',
} as const

export const SidebarContent = <T extends ElementType = 'aside'>({
  collapsedWidth = 'w-16',
  expandedWidth = 'w-56',
  className,
  children,
  ...rest
}: SidebarContentProps<T>) => {
  const { role, mode, open } = useSidebar()

  const isPermanent = mode === 'permanent'
  const resolvedWidth = isPermanent
    ? expandedWidth // permanent always uses expandedWidth, no matter if it's closed
    : open
      ? expandedWidth
      : collapsedWidth
  const ResolvedContainer = (containersMap[role] ?? 'aside') as ElementType

  return (
    <ResolvedContainer
      className={cn(
        'relative flex flex-col h-full shrink-0 bg-(--lithos-surface) overflow-y-auto overflow-x-hidden',
        'transition-[width] duration-150 ease-out',
        resolvedWidth,
        className
      )}
      {...rest}
    >
      {children}
    </ResolvedContainer>
  )
}
