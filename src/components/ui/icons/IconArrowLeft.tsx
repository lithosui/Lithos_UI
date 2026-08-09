import { FiArrowLeft } from "react-icons/fi";
import { type IconProps, iconDefaults } from './IconBase'

export const IconArrowLeft = ({ size = iconDefaults.size, strokeWidth = iconDefaults.strokeWidth, ...props }: IconProps) => {
  return (
    <FiArrowLeft
      size={size}
      strokeWidth={strokeWidth}
      {...props}
    />
  )
}
