import { IconHeart } from '../../../components/ui/icons/IconHeart'
import { IconCheck } from '../../../components/ui/icons/IconCheck'
import { IconAlertTriangle } from '../../../components/ui/icons/IconAlertTriangle'

export const ColorAndTokenExample = () => {
  return (
    <div className="flex items-center space-x-6">
      <IconHeart size={24} color="#ff007f" fill="#ff007f" />
      <IconCheck size={24} color="#059669" />
      <IconAlertTriangle size={24} className="text-(--lithos-accent)" />
    </div>
  )
}
