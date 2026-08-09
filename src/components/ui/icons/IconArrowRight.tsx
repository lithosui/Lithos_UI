import { FiArrowRight } from "react-icons/fi";
import { type IconProps, iconDefaults } from './IconBase'

export const IconArrowRight = ({ size = iconDefaults.size, strokeWidth = iconDefaults.strokeWidth, ...props }: IconProps) => {
  return (
    <FiArrowRight
      size={size}
      strokeWidth={strokeWidth}
      {...props}
    />
  )
}
