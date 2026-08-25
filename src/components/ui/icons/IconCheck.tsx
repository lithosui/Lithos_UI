import { FiCheck } from 'react-icons/fi'
import { type IconProps, iconDefaults } from './IconBase'

export const IconCheck = ({
  size = iconDefaults.size,
  strokeWidth = iconDefaults.strokeWidth,
  ...props
}: IconProps) => {
  return <FiCheck size={size} strokeWidth={strokeWidth} {...props} />
}
