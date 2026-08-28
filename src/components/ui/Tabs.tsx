/**
 * @fileoverview Lithos UI tabs primitive.
 * - Compound component architecture: Tabs, TabsList, TabsTrigger, TabsContent.
 * - Brutalist design: hard borders, solid shadows, z-index stacking to overlap borders.
 */
import { createContext, useContext, useState, type ComponentPropsWithRef } from 'react'
import { cn } from '../../utils/cn'
import { colors } from '../../utils/colors'
import { getContrastText } from '../../utils/yiq'

export type TabsVariant = 'outlined' | 'icon' | 'line'
export type TabsIntent = 'default' | 'success' | 'error' | 'warning' | 'info' | 'accent'
export type TabsOrientation = 'horizontal' | 'vertical'

interface TabsContextType {
  value: string
  onValueChange: (value: string) => void
  variant: TabsVariant
  intent: TabsIntent
  orientation: TabsOrientation
}

const TabsContext = createContext<TabsContextType | null>(null)

export interface TabsProps extends Omit<ComponentPropsWithRef<'div'>, 'defaultValue'> {
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
  variant?: TabsVariant
  intent?: TabsIntent
  orientation?: TabsOrientation
}

export const Tabs = ({
  defaultValue = '',
  value,
  onValueChange,
  variant = 'outlined',
  intent = 'accent',
  orientation = 'horizontal',
  children,
  className,
  ref,
  ...rest
}: TabsProps) => {
  const [localValue, setLocalValue] = useState(defaultValue)

  const currentValue = value !== undefined ? value : localValue

  const handleValueChange = (newValue: string) => {
    if (value === undefined) {
      setLocalValue(newValue)
    }
    onValueChange?.(newValue)
  }

  return (
    <TabsContext.Provider
      value={{ value: currentValue, onValueChange: handleValueChange, variant, intent, orientation }}
    >
      <div
        ref={ref}
        className={cn('w-full flex', orientation === 'horizontal' ? 'flex-col' : 'flex-row gap-6', className)}
        {...rest}
      >
        {children}
      </div>
    </TabsContext.Provider>
  )
}

export type TabsListProps = ComponentPropsWithRef<'div'>

export const TabsList = ({ className, children, ref, ...rest }: TabsListProps) => {
  const context = useContext(TabsContext)
  if (!context) throw new Error('TabsList must be used within a Tabs component')

  const { variant, orientation } = context

  const variantClasses = {
    outlined:
      'inline-flex p-1 gap-1 border-2 border-(--lithos-border) rounded-(--lithos-radius) bg-(--lithos-bg) shadow-[4px_4px_0_0_var(--lithos-shadow)] mb-6',
    icon: 'inline-flex p-1 gap-1 border-2 border-(--lithos-border) rounded-(--lithos-radius) bg-(--lithos-bg) mb-6',
    line: cn('flex', orientation === 'horizontal' ? 'flex-row flex-wrap gap-4 mb-4' : 'flex-col gap-4 mr-4'),
  }

  return (
    <div
      ref={ref}
      className={cn(variantClasses[variant], className)}
      role="tablist"
      aria-orientation={orientation}
      {...rest}
    >
      {children}
    </div>
  )
}

export interface TabsTriggerProps extends ComponentPropsWithRef<'button'> {
  value: string
}

export const TabsTrigger = ({ value, className, children, ref, ...rest }: TabsTriggerProps) => {
  const context = useContext(TabsContext)

  if (!context) {
    throw new Error('TabsTrigger must be used within a Tabs component')
  }

  const isSelected = context.value === value
  const { variant, intent, orientation } = context

  const isAccent = intent === 'accent'
  const isDefault = intent === 'default'
  const baseColor = isAccent || isDefault ? '' : colors[intent as keyof typeof colors]

  const tabColor = isAccent ? 'var(--lithos-accent)' : isDefault ? 'var(--lithos-text)' : baseColor
  const tabTextColor = isAccent
    ? 'var(--lithos-accent-text)'
    : isDefault
      ? 'var(--lithos-bg)'
      : getContrastText(baseColor)

  const iconActiveStyle = isSelected ? { backgroundColor: tabColor, color: tabTextColor } : {}
  const lineActiveStyle = isSelected ? { borderColor: tabColor, color: tabColor } : {}
  const activeStyle =
    variant === 'icon' || variant === 'outlined' ? iconActiveStyle : variant === 'line' ? lineActiveStyle : {}

  const triggerVariantClasses = {
    outlined: cn(
      'px-4 py-2 font-black tracking-tighter leading-none border-2 cursor-pointer transition-all duration-75 rounded-[calc(var(--lithos-radius)-4px)] flex items-center justify-center gap-2',
      isSelected
        ? 'border-(--lithos-border) shadow-none'
        : 'border-transparent text-(--lithos-text) opacity-70 hover:opacity-100 hover:bg-(--lithos-surface)'
    ),
    icon: cn(
      'px-4 py-2 font-black tracking-tighter leading-none border-2 cursor-pointer transition-all duration-75 rounded-[calc(var(--lithos-radius)-4px)] flex items-center justify-center gap-2',
      isSelected
        ? 'border-(--lithos-border) shadow-[2px_2px_0_0_var(--lithos-shadow)] -translate-y-[1px] -translate-x-[1px]'
        : 'border-transparent text-(--lithos-text) opacity-70 hover:opacity-100 hover:bg-(--lithos-surface)'
    ),
    line: cn(
      'pb-2 font-black tracking-tighter leading-none cursor-pointer transition-all duration-75 bg-transparent outline-none flex items-center justify-center gap-2',
      orientation === 'horizontal' ? 'border-b-4' : 'border-r-4 pr-2 pb-0 justify-end',
      isSelected ? '' : 'border-transparent text-(--lithos-text) opacity-60 hover:opacity-100'
    ),
  }

  return (
    <button
      ref={ref}
      type="button"
      role="tab"
      aria-selected={isSelected}
      onClick={() => context.onValueChange(value)}
      className={cn(triggerVariantClasses[variant], className)}
      style={{ ...activeStyle, ...rest.style }}
      {...rest}
    >
      {children}
    </button>
  )
}

export interface TabsContentProps extends ComponentPropsWithRef<'div'> {
  value: string
}

export const TabsContent = ({ value, className, children, ref, ...rest }: TabsContentProps) => {
  const context = useContext(TabsContext)

  if (!context) {
    throw new Error('TabsContent must be used within a Tabs component')
  }

  const isSelected = context.value === value

  if (!isSelected) {
    return null
  }

  const contentVariantClasses = {
    outlined:
      'p-4 border-2 border-(--lithos-border) shadow-[4px_4px_0_0_var(--lithos-shadow)] rounded-(--lithos-radius) bg-(--lithos-surface) relative z-0 flex-1',
    icon: 'p-4 border-2 border-(--lithos-border) shadow-[4px_4px_0_0_var(--lithos-shadow)] rounded-(--lithos-radius) bg-(--lithos-surface) relative z-0 flex-1',
    line: 'pt-2 font-body text-(--lithos-text) relative z-0 flex-1',
  }

  return (
    <div ref={ref} role="tabpanel" className={cn(contentVariantClasses[context.variant], className)} {...rest}>
      {children}
    </div>
  )
}
