import type { IconBaseProps } from 'react-icons'

export interface IconProps extends IconBaseProps {
  size?: number | string
  strokeWidth?: number | string
  color?: string
}

export const iconDefaults = {
  size: 16,
  strokeWidth: 4,
}
