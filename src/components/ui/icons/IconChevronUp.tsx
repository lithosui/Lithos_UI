import { FiChevronUp } from 'react-icons/fi'
import { type IconProps, iconDefaults } from './IconBase'

export const IconChevronUp = ({
  size = iconDefaults.size,
  strokeWidth = iconDefaults.strokeWidth,
  ...props
}: IconProps) => {
  return (
    <FiChevronUp
      size={size}
      strokeWidth={strokeWidth}
      {...props}
    />
  )
}

IconChevronUp.displayName = 'IconChevronUp'
