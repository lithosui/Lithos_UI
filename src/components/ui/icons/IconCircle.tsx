import { FiCircle } from "react-icons/fi";
import { type IconProps, iconDefaults } from './IconBase'

export const IconCircle = ({ size = iconDefaults.size, strokeWidth = iconDefaults.strokeWidth, ...props }: IconProps) => {
  return (
    <FiCircle
      size={size}
      strokeWidth={strokeWidth}
      {...props}
    />
  )
}
