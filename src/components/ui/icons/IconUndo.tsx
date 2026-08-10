import { FiCornerUpLeft } from 'react-icons/fi'
import { type IconProps, iconDefaults } from './IconBase'

export const IconUndo = ({ size = iconDefaults.size, strokeWidth = iconDefaults.strokeWidth, ...props }: IconProps) => {
  return (
    <FiCornerUpLeft
      size={size}
      strokeWidth={strokeWidth}
      {...props}
    />
  )
}

IconUndo.displayName = 'IconUndo'
