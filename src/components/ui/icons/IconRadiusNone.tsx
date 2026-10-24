import { type IconProps, iconDefaults } from './IconBase'

export const IconRadiusNone = ({
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
      rx="0"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="square"
      strokeLinejoin="miter"
      fill={props.fill || 'none'}
    />
  </svg>
)
