import { type IconProps, iconDefaults } from './IconBase'

export const IconRadiusLg = ({
  size = iconDefaults.size,
  strokeWidth = iconDefaults.strokeWidth,
  color = 'currentColor',
  ...props
}: IconProps & { fill?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="12" cy="12" r="9" stroke={color} strokeWidth={strokeWidth} fill={props.fill || 'none'} />
  </svg>
)
