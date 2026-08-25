import { IoHeart } from 'react-icons/io5'
import { type IconProps, iconDefaults } from './IconBase'

export const IconHeart = ({ size = iconDefaults.size, ...props }: IconProps) => {
  return <IoHeart size={size} {...props} />
}
