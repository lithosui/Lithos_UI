/**
 * @fileoverview Lithos UI accordion primitive.
 * - Dual-mode state architecture: works seamlessly as an uncontrolled/standalone item via local state, or co-op inside `AccordionGroup` via Context API.
 * - Dynamic shadow offset shifts from 2px to 4px on open state to retain hard geometry.
 */
import { useId, createContext, useContext, useState, forwardRef, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { Button } from "./Button";
import { cn } from "../../utils/cn";
import { IconChevronUp } from "./icons/IconChevronUp";

interface AccordionContextType {
  toggleItem: (item: string) => void
  isItemOpen: (value: string) => boolean
}

const AccordionContext = createContext<AccordionContextType | null>(null)

export interface AccordionProps extends Omit<ComponentPropsWithoutRef<'div'>, 'title'> {
  defaultOpen?: boolean | undefined
  title: ReactNode
  classes?: {
    container?: string
    header?: string
    content?: string
  }
  open?: boolean
  value?: string
}

export interface AccordionGroupProps extends ComponentPropsWithoutRef<'div'> {
  allowMultiple?: boolean
  defaultActive?: string | string[]
}

export const AccordionGroup = forwardRef<HTMLDivElement, AccordionGroupProps>(
  ({ allowMultiple = false, children, defaultActive, className }, ref) => {
    const [activedValues, setActivedValues] = useState<string | string[]>(() => {
      if (allowMultiple) {
        if (Array.isArray(defaultActive)) return defaultActive

        return defaultActive ? [defaultActive] : []
      }

      return typeof defaultActive === 'string' ? defaultActive : ''
    })

    const toggleItem = (value: string) => {
      setActivedValues(current => {
        if (allowMultiple) {
          const list = Array.isArray(current) ? current : []

          return list.includes(value)
            ? list.filter(item => item !== value)
            : [...list, value]
        }

        return current === value ? '' : value
      })
    }

    const isItemOpen = (value: string) => {
      if (allowMultiple) {
        return Array.isArray(activedValues) && activedValues.includes(value)
      }

      return activedValues === value
    }

    const containerClass = cn(
      'flex flex-col items-center',
      className
    )

    return (
      <AccordionContext.Provider value={{ toggleItem, isItemOpen }}>
        <div ref={ref} className={containerClass}>
          {children}
        </div>
      </AccordionContext.Provider>
    )
  }
)

AccordionGroup.displayName = 'AccordionGroup'

const defaultClasses = {
  container: 'w-full self-start border-2 border-(--lithos-border) duration-75 ease-out transition-shadow shadow-[2px_2px_0_0_var(--lithos-shadow)]',
  content: 'p-4 min-h-0 overflow-hidden font-body',
  header: 'justify-between text-lg text-start p-3'
}

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  ({ defaultOpen = false, open, children, title, value, classes = {} }, ref) => {
    const context = useContext(AccordionContext)

    // local state fallback if Accordion is used standalone without group
    const [isOpenLocal, setIsOpenLocal] = useState(defaultOpen)

    // if is not controlled externally via the open prop, use the Context or the local state
    const isOpen = open !== undefined ? open : (context && value ? context.isItemOpen(value) : isOpenLocal)
    const isGrouped = !!context

    const handleToggle = () => {
      if (context && value) {
        context.toggleItem(value)
        return
      }

      setIsOpenLocal(!isOpenLocal)
    }

    const label = isOpen ? 'Collapse' : 'Expand'
    const iconRotation = !isOpen ? 'rotate-180' : 'rotate-0'

    const containerClass = cn(
      defaultClasses.container,
      isOpen && 'shadow-[4px_4px_0_0_var(--lithos-shadow)] h-auto',
      isGrouped && 'mt-4',
      classes.container
    )

    const generatedId = useId()
    const itemId = value || generatedId
    const buttonId = `accordion-button-${itemId}`
    const contentId = `accordion-content-${itemId}`

    return (
      <div className={containerClass} ref={ref}>
        <h3 className='m-0 p-0 antialiased'>
          <Button className={cn(defaultClasses.header, classes.header, 'translate-x-0 translate-y-0 active:translate-x-0 active:translate-y-0')} id={buttonId} aria-expanded={isOpen} aria-controls={contentId} onClick={handleToggle} intent='text' fullWidth>
            <span>
              {title}
            </span>
            <div className='ml-2 w-4 min-w-4'>
              <IconChevronUp className={`max-w-full h-auto ${iconRotation}`} title={label} />
            </div>
          </Button>
        </h3>

        <div className={cn('grid transition-[grid-template-rows] duration-75 ease-out', isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}>
          <div className='min-h-0 overflow-hidden'>
            <div className={cn(defaultClasses.content, classes.content)} aria-hidden={!isOpen} id={contentId} role='region' aria-labelledby={buttonId}>
              {children}
            </div>
          </div>
        </div>
      </div>
    )
  }
)

Accordion.displayName = 'Accordion'
