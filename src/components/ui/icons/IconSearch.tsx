import { FiSearch } from 'react-icons/fi'
import { type IconProps, iconDefaults } from './IconBase'

export const IconSearch = ({
  size = iconDefaults.size,
  strokeWidth = iconDefaults.strokeWidth,
  ...props
}: IconProps) => {
  return <FiSearch size={size} strokeWidth={strokeWidth} {...props} />
}
