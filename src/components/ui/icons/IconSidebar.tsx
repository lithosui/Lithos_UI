import { FiSidebar } from 'react-icons/fi'
import { type IconProps, iconDefaults } from './IconBase'

export const IconSidebar = ({
  size = iconDefaults.size,
  strokeWidth = iconDefaults.strokeWidth,
  ...props
}: IconProps) => {
  return <FiSidebar size={size} strokeWidth={strokeWidth} {...props} />
}
