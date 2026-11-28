/**
 * @fileoverview Lithos UI PropsTable component.
 * - Displays a standard table of component properties, types, defaults, and descriptions.
 * - Used exclusively in documentation; excluded from the public package.
 */
import { Fragment, useId, useState, useEffect, useRef } from 'react'
import { Accordion, type AccordionProps } from './Accordion'
import { Badge } from './Badge'
import { cn } from '../../utils/cn'
import { IconChevronDown } from './icons/IconChevronDown'
import { CodeViewer } from './CodeViewer'
import { RouteLink } from '../site/RouteLink'
import { componentPages } from '../../core/lithos.utils'
import { IconExternalLink } from './icons/IconExternalLink'
import { colors } from '../../utils/colors'

/**
 * Represents a single property entry in a props table.
 * Used to document component or hook parameters.
 */
export interface PropItem {
  /** Name of the property. */
  name: string

  /** TypeScript type of the property as a string. */
  type: string

  /**
   * Optional type definition displayed in a code block.
   * string containing the TypeScript type definition.
   */
  typeDefinition?: string

  /**
   * Optional path to a component page whose API section should be linked.
   * The path must exist in `componentPages`.
   */
  definitionPath?: string | { path: string; label: string }

  /** Default value of the property, or `—` if not provided. */
  defaultValue?: string

  /** Whether the property is required. */
  required?: boolean

  /** Human-readable description of the property's purpose. */
  description: string
}

/** Props for the PropsTable component. */
export interface PropsTableProps {
  /** Array of property items to display in the table. */
  data: PropItem[]

  /**
   * If true, indicates the table documents a hook's return value,
   * hiding optional/required indicators.
   */
  isHook?: boolean | undefined
}

const sanitizePropName = (propName: string) => {
  // removes the "..." from prop names like "...props"
  const tempPropName = propName.startsWith('...') ? propName.replace('...', '') : propName

  let newName = ''

  for (const char of tempPropName) {
    // add a underscore before an uppercased leter
    if (char >= 'A' && char <= 'Z') {
      newName += `_${char.toLowerCase()}`
      continue
    }

    newName += char
  }

  return newName
}

const getExpandedPropNames = (data: PropItem[]) =>
  new Set(
    data
      .filter((prop) => prop.required)
      // remove the '...' from names like "...props"
      .map((prop) => sanitizePropName(prop.name))
  )

const getRequiredPropsSignature = (data: PropItem[]) => Array.from(getExpandedPropNames(data)).sort().join('|')

const resolveDefinitionPath = (definitionPath: PropItem['definitionPath']) => {
  if (!definitionPath) return null

  if (typeof definitionPath === 'object' && !('label' in definitionPath && 'path' in definitionPath)) {
    throw Error(
      `[LITHOS-UI]: Invalid definitionPath object ${JSON.stringify(definitionPath)}. Must contain "label" and "path" entries.`
    )
  }

  const path = typeof definitionPath === 'object' ? definitionPath.path : definitionPath
  const componentData = componentPages.find((component) => component.path === path)
  const label =
    typeof definitionPath === 'object' && 'label' in definitionPath ? definitionPath.label : componentData?.label

  if (!componentData) {
    throw Error(
      `[LITHOS-UI]: Invalid definitionPath string or object "path" entry: ${JSON.stringify(definitionPath)}. The string must match a valid path on the array "DOC_PAGES" at src/core/lithos.utils.ts`
    )
  }

  return {
    path,
    componentData,
    label,
  }
}

const isLithosType = (type: string) => {
  // put here every type we don't want to highlight
  const nonHighlightedTypes = new Set([
    'any',
    'bigint',
    'boolean',
    'boolean[]',
    'never',
    'null',
    'number',
    'number[]',
    'object',
    'string',
    'string[]',
    'symbol',
    'undefined',
    'unknown',
    'void',
    'Date',
    /^\(.*\) => void/, // void functions
    /^\[.*\]/, // inline arrays
  ])

  const alternatives = type.split('|').map((part) => part.trim())
  return !alternatives.every((part) => {
    // check if the type match
    const noHighlightType = nonHighlightedTypes.has(part)
    let noHighlightRegExpType

    // if the type doesn't match check using the regex values
    for (const typeOrRegex of nonHighlightedTypes.values()) {
      if (typeOrRegex instanceof RegExp && typeOrRegex.test(part)) {
        noHighlightRegExpType = true
      }
    }

    return noHighlightRegExpType ?? noHighlightType
  })
}

export const PropsTable = ({ data, isHook }: PropsTableProps) => {
  const tableId = useId()
  const [expandedProps, setExpandedProps] = useState(() => getExpandedPropNames(data))
  const lastRequiredSignature = useRef(getRequiredPropsSignature(data))

  useEffect(() => {
    const nextSignature = getRequiredPropsSignature(data)

    // Sync expanded props whenever the exact set of required props changes
    if (lastRequiredSignature.current !== nextSignature) {
      setExpandedProps(getExpandedPropNames(data))
      lastRequiredSignature.current = nextSignature
    }
  }, [data])

  const toggleProp = (name: string) => {
    setExpandedProps((current) => {
      const next = new Set(current)
      if (next.has(name)) next.delete(name)
      else next.add(name)
      return next
    })
  }

  return (
    <div className="overflow-x-auto my-2 rounded-(--lithos-radius) max-w-192">
      <table className="w-full table-fixed text-left border-collapse font-body text-sm">
        <thead>
          <tr className="border-b-2 border-(--lithos-border) bg-(--lithos-surface)">
            <th className="p-3 font-black uppercase text-xs">Prop</th>
            <th className="p-3 font-black uppercase text-xs">Type</th>
            <th className="p-3 font-black uppercase text-xs">Default</th>
          </tr>
        </thead>
        <tbody>
          {data.map((prop) => {
            const sanitizedName = sanitizePropName(prop.name)
            const isExpanded = expandedProps.has(sanitizedName)
            const detailsId = `${tableId}-prop-details-${sanitizedName}`
            const resolvedDefinition = resolveDefinitionPath(prop.definitionPath)
            const ariaLabel = `Toggle ${sanitizedName.replaceAll('_', ' ')} details`

            return (
              <Fragment key={sanitizedName}>
                <tr className="border-b border-(--lithos-border)/40">
                  <td className="p-3 font-mono font-bold text-(--lithos-text) whitespace-nowrap">
                    <button
                      type="button"
                      className="inline-flex min-h-10 cursor-pointer items-center text-left"
                      aria-expanded={isExpanded}
                      aria-controls={detailsId}
                      aria-label={ariaLabel}
                      onClick={() => toggleProp(sanitizedName)}
                    >
                      <IconChevronDown
                        size={20}
                        aria-hidden="true"
                        className={cn('mr-2 shrink-0 transition-transform', isExpanded && 'rotate-180')}
                      />
                      {prop.name}
                    </button>

                    {!isHook &&
                      (prop.required ? (
                        <span className="ml-1.5 text-xs font-bold text-red-500" title="Required">
                          *
                        </span>
                      ) : (
                        <span className="ml-1.5 text-[10px] font-normal opacity-70" title="Optional">
                          opt
                        </span>
                      ))}
                  </td>
                  <td
                    className={cn(
                      'p-3 font-mono text-xs wrap-break-word max-w-55',
                      !isLithosType(prop.type) ? 'opacity-80' : 'text-(--lithos-accent)'
                    )}
                  >
                    {prop.type}
                  </td>
                  <td className="p-3 font-mono text-xs opacity-70">{prop.defaultValue || '—'}</td>
                </tr>
                <tr hidden={!isExpanded}>
                  <td
                    id={detailsId}
                    colSpan={3}
                    className="p-4 border-b border-(--lithos-border)/40 overflow-hidden w-full"
                  >
                    <p className="m-0 opacity-90">{prop.description}</p>

                    {resolvedDefinition && (
                      <div className="mt-4 flex">
                        See the{' '}
                        <RouteLink
                          to={`${resolvedDefinition.componentData.to}#api`}
                          importRoute={resolvedDefinition.componentData.loader}
                          className="font-bold flex mx-1"
                          style={{ color: colors.info }}
                        >
                          {resolvedDefinition.label} <IconExternalLink className="ml-1" />
                        </RouteLink>
                        API
                      </div>
                    )}

                    {prop.typeDefinition && (
                      <div className="mt-4">
                        <span className="block mb-1 text-xs font-bold uppercase opacity-70">Type definition</span>
                        <CodeViewer
                          language="ts"
                          showLanguage
                          code={prop.typeDefinition}
                          embedded
                          className="w-full max-w-full [&_pre]:w-full [&_pre]:max-w-full [&_pre]:overflow-x-auto"
                        />
                      </div>
                    )}
                  </td>
                </tr>
              </Fragment>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export const PropsAccordion = ({
  title,
  data,
  className,
  isHook,
  ...rest
}: AccordionProps & { data: PropItem[]; isHook?: boolean }) => {
  const accordionProps = { defaultOpen: true, ...rest }
  const accordionTitle = isHook ? (
    <span className="inline-flex items-center">
      {title}
      <Badge className="ml-2" size="sm" intent="info">
        Hook
      </Badge>
    </span>
  ) : (
    title
  )

  return (
    <Accordion title={accordionTitle} className={cn('my-4', className)} {...accordionProps}>
      <PropsTable data={data} isHook={isHook} />
    </Accordion>
  )
}
