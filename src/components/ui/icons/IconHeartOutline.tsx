import { IoHeartOutline } from 'react-icons/io5'
import { type IconProps, iconDefaults } from './IconBase'

export const IconHeartOutline = ({ size = iconDefaults.size, ...props }: IconProps) => {
  return <IoHeartOutline size={size} {...props} />
}
