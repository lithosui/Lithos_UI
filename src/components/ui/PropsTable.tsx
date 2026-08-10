import { Accordion, type AccordionProps } from "./Accordion"

export interface PropItem {
  name: string
  type: string
  defaultValue?: string
  required?: boolean
  description: string
}

export interface PropsTableProps {
  data: PropItem[]
}

export const PropsTable = ({ data }: PropsTableProps) => {
  return (
    <div className='overflow-x-auto my-2'>
      <table className='w-full text-left border-collapse font-body text-sm'>
        <thead>
          <tr className='border-b-2 border-(--lithos-border) bg-(--lithos-surface)'>
            <th className='p-3 font-black uppercase text-xs'>Prop</th>
            <th className='p-3 font-black uppercase text-xs'>Type</th>
            <th className='p-3 font-black uppercase text-xs'>Default</th>
            <th className='p-3 font-black uppercase text-xs'>Description</th>
          </tr>
        </thead>
        <tbody>
          {data.map((prop) => (
            <tr key={prop.name} className='border-b border-(--lithos-border)/40'>
              <td className='p-3 font-mono font-bold text-(--lithos-text) whitespace-nowrap'>
                {prop.name}
                {prop.required ? (
                  <span className='ml-1.5 text-xs font-bold text-red-500' title='Required'>
                    *
                  </span>
                ) : (
                  <span className='ml-1.5 text-[10px] font-normal opacity-70' title='Optional'>
                    opt
                  </span>
                )}
              </td>
              <td className='p-3 font-mono text-xs opacity-80 break-words max-w-[220px]'>{prop.type}</td>
              <td className='p-3 font-mono text-xs opacity-70 whitespace-nowrap'>{prop.defaultValue || '—'}</td>
              <td className='p-3 opacity-90 min-w-[200px]'>{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export const PropsAccordion = ({ title, data, className, defaultOpen = true, ...rest }: AccordionProps & { data: PropItem[] }) => {
  return (
    <Accordion title={title} classes={{ container: 'my-4' }} className={className} defaultOpen={defaultOpen} {...rest}>
      <PropsTable data={data} />
    </Accordion>
  )
}
