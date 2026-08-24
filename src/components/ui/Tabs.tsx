/**
 * @fileoverview Lithos UI tabs primitive.
 * - Compound component architecture: Tabs, TabsList, TabsTrigger, TabsContent.
 * - Brutalist design: hard borders, solid shadows, z-index stacking to overlap borders.
 */
import { createContext, useContext, useState, type ComponentPropsWithRef } from 'react'
import { cn } from '../../utils/cn'
import { colors } from '../../utils/colors'
import { getContrastText } from '../../utils/yiq'

export type TabsVariant = 'outlined' | 'filled' | 'text'
export type TabsIntent = 'default' | 'success' | 'error' | 'warning' | 'info' | 'accent'

interface TabsContextType {
  value: string
  onValueChange: (value: string) => void
  variant: TabsVariant
  intent: TabsIntent
}

const TabsContext = createContext<TabsContextType | null>(null)

export interface TabsProps extends Omit<ComponentPropsWithRef<'div'>, 'defaultValue'> {
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
  variant?: TabsVariant
  intent?: TabsIntent
}

export const Tabs = ({ defaultValue = '', value, onValueChange, variant = 'outlined', intent = 'accent', children, className, ref, ...rest }: TabsProps) => {
  const [localValue, setLocalValue] = useState(defaultValue)

  const currentValue = value !== undefined ? value : localValue

  const handleValueChange = (newValue: string) => {
    if (value === undefined) {
      setLocalValue(newValue)
    }
    onValueChange?.(newValue)
  }

  return (
    <TabsContext.Provider value={{ value: currentValue, onValueChange: handleValueChange, variant, intent }}>
      <div ref={ref} className={cn('w-full', className)} {...rest}>
        {children}
      </div>
    </TabsContext.Provider>
  )
}

export interface TabsListProps extends ComponentPropsWithRef<'div'> {}

export const TabsList = ({ className, children, ref, ...rest }: TabsListProps) => {
  const context = useContext(TabsContext)
  if (!context) throw new Error('TabsList must be used within a Tabs component')

  const variantClasses = {
    outlined: 'flex flex-wrap -mb-0.5 z-10 relative',
    filled: 'flex flex-wrap gap-3 mb-6',
    text: 'flex flex-wrap border-b-4 border-(--lithos-border) mb-4',
  }

  return (
    <div ref={ref} className={cn(variantClasses[context.variant], className)} role="tablist" {...rest}>
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
  const { variant, intent } = context

  const isAccent = intent === 'accent'
  const isDefault = intent === 'default'
  const baseColor = isAccent || isDefault ? '' : colors[intent as keyof typeof colors]
  
  const tabColor = isAccent ? 'var(--lithos-accent)' : isDefault ? 'var(--lithos-text)' : baseColor
  const tabTextColor = isAccent ? 'var(--lithos-accent-text)' : isDefault ? 'var(--lithos-bg)' : getContrastText(baseColor)

  const filledActiveStyle = isSelected ? { backgroundColor: tabColor, color: tabTextColor } : {}
  const textActiveStyle = isSelected ? { borderColor: tabColor, color: tabColor } : {}
  const activeStyle = variant === 'filled' ? filledActiveStyle : variant === 'text' ? textActiveStyle : {}

  const triggerVariantClasses = {
    outlined: cn(
      'px-4 py-2 font-black tracking-tighter leading-none border-2 border-(--lithos-border) cursor-pointer transition-all duration-75',
      'rounded-t-(--lithos-radius)',
      isSelected
        ? 'bg-(--lithos-surface) text-(--lithos-text) border-b-transparent z-10 shadow-[2px_2px_0_0_var(--lithos-shadow)]'
        : 'bg-(--lithos-bg) text-(--lithos-text) border-b-(--lithos-border) opacity-70 hover:opacity-100 hover:bg-(--lithos-surface) z-0 shadow-none',
      'mr-1 last:mr-0'
    ),
    filled: cn(
      'px-5 py-2.5 font-black tracking-tighter leading-none border-2 border-(--lithos-border) cursor-pointer transition-all duration-75 rounded-full',
      isSelected
        ? 'shadow-none translate-y-[2px] translate-x-[2px]'
        : 'bg-(--lithos-bg) text-(--lithos-text) shadow-[2px_2px_0_0_var(--lithos-shadow)] hover:shadow-[4px_4px_0_0_var(--lithos-shadow)] hover:-translate-y-0.5 hover:-translate-x-0.5'
    ),
    text: cn(
      'px-4 py-3 font-black tracking-tighter leading-none cursor-pointer transition-all duration-75 border-b-4 translate-y-[4px] bg-transparent outline-none mr-2 last:mr-0',
      isSelected
        ? ''
        : 'border-transparent text-(--lithos-text) opacity-60 hover:opacity-100 hover:border-(--lithos-border)'
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
    outlined: 'p-4 border-2 border-(--lithos-border) shadow-[4px_4px_0_0_var(--lithos-shadow)] rounded-(--lithos-radius) rounded-tl-none bg-(--lithos-surface) relative z-0',
    filled: 'p-4 border-2 border-(--lithos-border) shadow-[4px_4px_0_0_var(--lithos-shadow)] rounded-(--lithos-radius) bg-(--lithos-surface) relative z-0',
    text: 'pt-2 font-body text-(--lithos-text) relative z-0',
  }

  return (
    <div
      ref={ref}
      role="tabpanel"
      className={cn(contentVariantClasses[context.variant], className)}
      {...rest}
    >
      {children}
    </div>
  )
}
