/**
 * @fileoverview Lithos UI PropsTable component.
 * - Displays a standard table of component properties, types, defaults, and descriptions.
 * - Used exclusively in documentation; excluded from the public package.
 */
import { Accordion, type AccordionProps } from './Accordion'
import { cn } from '../../utils/cn'

export interface PropItem {
  name: string
  type: string
  defaultValue?: string
  required?: boolean
  description: string
}

export interface PropsTableProps {
  data: PropItem[]
  isHook?: boolean | undefined
}

export const PropsTable = ({ data, isHook }: PropsTableProps) => {
  return (
    <div className="overflow-x-auto my-2 rounded-(--lithos-radius)">
      <table className="w-full text-left border-collapse font-body text-sm">
        <thead>
          <tr className="border-b-2 border-(--lithos-border) bg-(--lithos-surface)">
            <th className="p-3 font-black uppercase text-xs">Prop</th>
            <th className="p-3 font-black uppercase text-xs">Type</th>
            <th className="p-3 font-black uppercase text-xs">Default</th>
            <th className="p-3 font-black uppercase text-xs">Description</th>
          </tr>
        </thead>
        <tbody>
          {data.map((prop) => (
            <tr key={prop.name} className="border-b border-(--lithos-border)/40">
              <td className="p-3 font-mono font-bold text-(--lithos-text) whitespace-nowrap">
                {prop.name}

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
              <td className="p-3 font-mono text-xs opacity-80 wrap-break-word max-w-55">{prop.type}</td>
              <td className="p-3 font-mono text-xs opacity-70 whitespace-nowrap">{prop.defaultValue || '—'}</td>
              <td className="p-3 opacity-90 min-w-50">{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export const PropsAccordion = ({
  title,
  data,
  className,
  defaultOpen = true,
  isHook,
  ...rest
}: AccordionProps & { data: PropItem[]; isHook?: boolean }) => {
  return (
    <Accordion title={title} className={cn('my-4', className)} defaultOpen={defaultOpen} {...rest}>
      <PropsTable data={data} isHook={isHook} />
    </Accordion>
  )
}
