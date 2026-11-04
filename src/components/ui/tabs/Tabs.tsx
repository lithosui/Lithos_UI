/**
 * @fileoverview Lithos UI tabs component primitive.
 * - Context-driven architecture: manages active state across internal boundaries using React Context.
 * - Supports three visual variants: Default (brutalist block), Underline (clean bottom border), and Vertical (side-stacked list).
 * - Underline variant explicitly strips the base `.lithos-click` borders in favor of a minimal bottom stroke.
 * - Implements native WAI-ARIA roles (`tablist`, `tab`, `tabpanel`) out of the box.
 */

import { useState } from 'react'
import { cn } from '../../../utils/cn'
import { Button } from '../Button'
import { TabsContext, useTabs } from './useTabs'
import type { TabsProps, TabsListProps, TabsTriggerProps, TabsContentProps } from './tabs.types'

/**
 * Root Tabs component that provides state management and context for subcomponents.
 *
 * @param props - Tabs properties for controlled selection and visual variant. - {@link TabsProps}
 * @returns The rendered Tabs root wrapper.
 */
export const Tabs = ({
  defaultValue,
  value: controlledValue,
  onValueChange,
  variant = 'default',
  className,
  children,
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
        className={cn(
          'w-full',
          variant === 'vertical' && 'flex flex-col sm:flex-row space-y-6 sm:space-y-0 sm:space-x-6',
          className
        )}
        data-state={value}
        {...rest}
      >
        {children}
      </div>
    </TabsContext.Provider>
  )
}

/**
 * Container component for tab triggers.
 *
 * @param props - Tab list element properties and styling. - {@link TabsListProps}
 * @returns The rendered tab list container.
 */
export const TabsList = ({ className, children, ...rest }: TabsListProps) => {
  const { variant } = useTabs()

  return (
    <div
      role="tablist"
      className={cn(
        'flex',
        variant === 'vertical' && 'flex-col items-stretch [&>*:not(:first-child)]:mt-4 min-w-[150px]',
        variant === 'underline' && 'flex-row items-center w-full',
        variant === 'default' && 'flex-row flex-wrap items-center -m-1 [&>*]:m-1',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  )
}

/**
 * Button component that activates a specific tab panel.
 *
 * @param props - Tab trigger properties for its associated tab value and button attributes. - {@link TabsTriggerProps}
 * @returns The rendered tab trigger button.
 */
export const TabsTrigger = ({ value, className, children, ...rest }: TabsTriggerProps) => {
  const { value: selectedValue, onValueChange, variant } = useTabs()
  const isSelected = selectedValue === value

  return (
    <Button
      role="tab"
      aria-selected={isSelected}
      data-state={isSelected ? 'active' : 'inactive'}
      onClick={() => onValueChange(value)}
      className={cn(
        'whitespace-nowrap text-sm font-bold',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-(--lithos-accent)',
        'disabled:pointer-events-none disabled:opacity-50',

        variant === 'underline' && [
          'border-0 border-b-4 border-transparent px-2 py-2 active:translate-none',
          'shadow-none bg-transparent text-(--lithos-text)',
          'data-[state=active]:border-(--lithos-accent)',
          'rounded-none',
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
    </Button>
  )
}

/**
 * Panel component that renders content when its associated tab trigger is active.
 *
 * @param props - Tab panel properties for its associated value and content. - {@link TabsContentProps}
 * @returns The rendered tab content panel or null if inactive.
 */
export const TabsContent = ({ value, className, children, ...rest }: TabsContentProps) => {
  const { value: selectedValue, variant } = useTabs()
  const isSelected = selectedValue === value

  if (!isSelected) return null

  return (
    <div
      role="tabpanel"
      data-state={isSelected ? 'active' : 'inactive'}
      className={cn(
        'border-2 border-(--lithos-border) bg-(--lithos-surface) p-6 text-(--lithos-text) rounded-(--lithos-radius)',
        'shadow-[8px_8px_0_0_var(--lithos-border)]',
        variant === 'vertical' ? 'mt-0 flex-1 w-full' : 'mt-6',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  )
}
