import { type IconProps, iconDefaults } from './IconBase'

export const IconRadiusMd = ({
  size = iconDefaults.size,
  strokeWidth = iconDefaults.strokeWidth,
  color = 'currentColor',
  ...props
}: IconProps & { fill?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect
      x="3"
      y="3"
      width="18"
      height="18"
      rx="6"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill={props.fill || 'none'}
    />
  </svg>
)
