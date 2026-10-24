import { IconSearch } from '../../../components/ui/icons/IconSearch'

export const SizeAndStrokeExample = () => {
  return (
    <div className="flex items-end space-x-6 text-(--lithos-text)">
      <IconSearch size={16} strokeWidth={2} />
      <IconSearch size={24} strokeWidth={3} />
      <IconSearch size={32} strokeWidth={4} />
      <IconSearch size={40} strokeWidth={5} />
    </div>
  )
}
