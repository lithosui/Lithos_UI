import { Select, SelectTrigger, SelectItem, SelectContent, useSelect } from '../../../components/ui/Select'
import { cn } from '../../../utils/cn'
import { IconChevronDown } from '../../../components/ui/icons/IconChevronDown'

const FRAMEWORK_OPTIONS = [
  { value: 'react', label: 'React', color: 'bg-cyan-400', downloads: '20M/week' },
  { value: 'preact', label: 'Preact', color: 'bg-purple-500', downloads: '1.2M/week' },
  { value: 'vue', label: 'Vue.js', color: 'bg-emerald-500', downloads: '4M/week' },
  { value: 'svelte', label: 'Svelte', color: 'bg-orange-500', downloads: '800K/week' },
]

const CustomSelectLayout = () => {
  const { selectedValue } = useSelect()
  const currentOption = FRAMEWORK_OPTIONS.find((option) => option.value === selectedValue)

  return (
    <>
      <SelectTrigger className="w-full justify-between">
        <span className="flex items-center space-x-2 truncate min-w-0">
          {currentOption && <span className={cn('size-2 rounded-full shrink-0', currentOption.color)} />}
          <span className="truncate min-w-0 font-medium leading-[1.15]">
            {currentOption ? currentOption.label : 'Select a framework...'}
          </span>
        </span>
        <IconChevronDown className="ml-2 size-4 shrink-0 opacity-60" />
      </SelectTrigger>
      <SelectContent>
        {FRAMEWORK_OPTIONS.map((option, index) => (
          <SelectItem key={option.value} value={option.value} index={index}>
            <div className="flex items-center justify-between w-full space-x-4">
              <span className="flex items-center space-x-2 min-w-0">
                <span className={cn('size-2 rounded-full shrink-0', option.color)} />
                <span className="truncate">{option.label}</span>
              </span>
              <span className="text-xs opacity-60 font-mono shrink-0">{option.downloads}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </>
  )
}

export const CustomSelectExample = () => (
  <Select>
    <CustomSelectLayout />
  </Select>
)
