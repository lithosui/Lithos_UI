import { FiAlertTriangle } from 'react-icons/fi'
import { type IconProps, iconDefaults } from './IconBase'

export const IconAlertTriangle = ({
  size = iconDefaults.size,
  strokeWidth = iconDefaults.strokeWidth,
  ...props
}: IconProps) => {
  return <FiAlertTriangle size={size} strokeWidth={strokeWidth} {...props} />
}
