import type { ReactNode } from 'react'
import { type LithosClass, cn } from '../../utils/cn'

import { Typography } from '../../components/ui/Typography'

type ClassName = { className?: LithosClass }

interface DocCalloutProps extends ClassName {
  children: ReactNode
}

interface DocExampleProps extends ClassName {
  id: string
  title: string
  description: ReactNode
  children: ReactNode
}

interface DocHeaderProps extends ClassName {
  title: string
  description: ReactNode
}

interface DocHeadingProps extends ClassName {
  id?: string
  level?: 'h2' | 'h3' | 'h4'
  children: ReactNode
}

interface DocLeadTextProps extends ClassName {
  children: ReactNode
}

interface DocListProps extends ClassName {
  items?: ReactNode[]
  children?: ReactNode
}

interface DocSectionProps extends ClassName {
  children: ReactNode
}

export const DocCallout = ({ children, className }: DocCalloutProps) => {
  return (
    <div className={cn('border-l-4 border-(--lithos-accent) pl-6 py-2 mb-8 bg-(--lithos-surface) p-4', className)}>
      <div className="text-sm font-bold font-body opacity-80 text-(--lithos-text)">{children}</div>
    </div>
  )
}

export const DocExample = ({ id, title, description, children, className }: DocExampleProps) => {
  return (
    <section className={cn('mb-16', className)}>
      <DocHeading id={id} level="h3">
        {title}
      </DocHeading>
      <p className="text-base text-(--lithos-text) max-w-3xl font-body mb-4 opacity-80">{description}</p>
      <div className="mt-8">{children}</div>
    </section>
  )
}

export const DocHeader = ({ title, description, className }: DocHeaderProps) => {
  return (
    <header className={cn('mt-0', className)}>
      <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none text-(--lithos-text) mb-8">{title}</h1>
      <p className="mt-2 text-lg md:text-xl font-display opacity-70 text-(--lithos-text)">{description}</p>
      <hr className="border-t-2 border-(--lithos-border) mt-8 mb-8" />
    </header>
  )
}

export const DocHeading = ({ id, level = 'h2', children, className }: DocHeadingProps) => {
  const sharedClasses = 'font-black tracking-tight text-(--lithos-text)'

  if (level === 'h4')
    return (
      <h4 id={id} className={cn('mt-8 mb-4 text-lg ', sharedClasses, className)}>
        {children}
      </h4>
    )

  if (level === 'h3')
    return (
      <h3 id={id} className={cn('mt-8 mb-4 text-xl', sharedClasses, className)}>
        {children}
      </h3>
    )

  return (
    <h2 id={id} className={cn('mt-12 mb-4 text-2xl', sharedClasses, className)}>
      {children}
    </h2>
  )
}

export const DocLeadText = ({ children, className }: DocLeadTextProps) => {
  return <p className={cn('mb-8 text-lg md:text-xl text-(--lithos-text) max-w-3xl font-body', className)}>{children}</p>
}

export const DocList = ({ items, children, className }: DocListProps) => {
  return (
    <ul className={cn('list-disc pl-6 text-lg font-body text-(--lithos-text) space-y-2 mb-12', className)}>
      {items ? items.map((item, index) => <li key={index}>{item}</li>) : children}
    </ul>
  )
}

export const DocSection = ({ children, className }: DocSectionProps) => {
  return <section className={cn('mb-12', className)}>{children}</section>
}

export const Code = ({ text }: { text: string }) => <Typography variant="code">{text}</Typography>
