import { FiMinus } from 'react-icons/fi'
import { type IconProps, iconDefaults } from './IconBase'

export const IconMinus = ({
  size = iconDefaults.size,
  strokeWidth = iconDefaults.strokeWidth,
  ...props
}: IconProps) => {
  return <FiMinus size={size} strokeWidth={strokeWidth} {...props} />
}
