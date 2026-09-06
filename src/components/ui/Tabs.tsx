/**
 * @fileoverview Lithos UI tabs component primitive.
 * - Context-driven architecture: manages active state across internal boundaries using React Context.
 * - Supports three visual variants: Default (brutalist block), Underline (clean bottom border), and Vertical (side-stacked list).
 * - Underline variant explicitly strips the base `.lithos-click` borders in favor of a minimal bottom stroke.
 * - Implements native WAI-ARIA roles (\`tablist\`, \`tab\`, \`tabpanel\`) out of the box.
 */
import { createContext, useContext, useState, type ComponentPropsWithRef, type ReactNode } from 'react'
import { cn } from '../../utils/cn'

interface TabsContextValue {
  value: string
  onValueChange: (value: string) => void
  variant?: 'default' | 'underline' | 'vertical'
}

const TabsContext = createContext<TabsContextValue | undefined>(undefined)

const useTabs = () => {
  const context = useContext(TabsContext)
  if (!context) {
    throw new Error('Tabs components must be used within a Tabs provider')
  }
  return context
}

export interface TabsProps extends Omit<ComponentPropsWithRef<'div'>, 'defaultValue' | 'value' | 'onChange'> {
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
  variant?: 'default' | 'underline' | 'vertical'
  children: ReactNode
}

export const Tabs = ({
  defaultValue,
  value: controlledValue,
  onValueChange,
  variant = 'default',
  className,
  children,
  ref,
  ...rest
}: TabsProps) => {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue || '')

  const isControlled = controlledValue !== undefined
  const value = isControlled ? controlledValue : uncontrolledValue

  const handleValueChange = (newValue: string) => {
    if (!isControlled) {
      setUncontrolledValue(newValue)
    }
    onValueChange?.(newValue)
  }

  return (
    <TabsContext.Provider value={{ value, onValueChange: handleValueChange, variant }}>
      <div
        className={cn('w-full', variant === 'vertical' && 'flex flex-col sm:flex-row', className)}
        data-state={value}
        {...rest}
      >
        {children}
      </div>
    </TabsContext.Provider>
  )
}

export type TabsListProps = ComponentPropsWithRef<'div'>

export const TabsList = ({ className, children, ref, ...rest }: TabsListProps) => {
  const { variant } = useTabs()

  return (
    <div
      ref={ref}
      role="tablist"
      className={cn(
        'flex',
        variant === 'vertical' && 'flex-col items-stretch [&>*:not(:first-child)]:mt-4 min-w-[150px]',
        variant === 'underline' && 'flex-row items-center w-full',
        variant === 'default' && 'flex-row flex-wrap items-center [&>*:not(:first-child)]:ml-4',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  )
}

export interface TabsTriggerProps extends Omit<ComponentPropsWithRef<'button'>, 'value'> {
  value: string
}

export const TabsTrigger = ({ value, className, children, ref, ...rest }: TabsTriggerProps) => {
  const { value: selectedValue, onValueChange, variant } = useTabs()
  const isSelected = selectedValue === value

  return (
    <button
      ref={ref}
      role="tab"
      type="button"
      aria-selected={isSelected}
      data-state={isSelected ? 'active' : 'inactive'}
      onClick={() => onValueChange(value)}
      className={cn(
        'lithos-click',
        'inline-flex items-center justify-center whitespace-nowrap text-sm font-bold transition-all',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-(--lithos-accent)',
        'disabled:pointer-events-none disabled:opacity-50',

        variant === 'underline' && [
          'border-0 border-b-4 border-transparent px-2 py-2',
          'shadow-none! bg-transparent! text-(--lithos-text)',
          'data-[state=active]:border-(--lithos-accent)',
        ],

        variant !== 'underline' && [
          'px-6 py-2.5 rounded-(--lithos-radius)',
          'bg-(--lithos-surface) text-(--lithos-text)',
          'data-[state=active]:bg-(--lithos-accent) data-[state=active]:text-(--lithos-accent-text)',
        ],
        className
      )}
      {...rest}
    >
      {children}
    </button>
  )
}

export interface TabsContentProps extends Omit<ComponentPropsWithRef<'div'>, 'value'> {
  value: string
}

export const TabsContent = ({ value, className, children, ref, ...rest }: TabsContentProps) => {
  const { value: selectedValue, variant } = useTabs()
  const isSelected = selectedValue === value

  if (!isSelected) return null

  return (
    <div
      ref={ref}
      role="tabpanel"
      data-state={isSelected ? 'active' : 'inactive'}
      className={cn(
        'border-2 border-(--lithos-border) bg-(--lithos-surface) p-6 text-(--lithos-text) rounded-(--lithos-radius)',
        'shadow-[8px_8px_0_0_var(--lithos-border)]',
        variant === 'vertical' ? 'mt-6 sm:mt-0 sm:ml-6 flex-1 w-full' : 'mt-6',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  )
}
