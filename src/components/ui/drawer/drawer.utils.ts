import type { DrawerPlacement, DrawerTransformOrigin, DrawerTransition, DrawerTransitionDuration } from './drawer.types'
import { cn } from '../../../utils/cn'

const placementClasses: Record<DrawerPlacement, string> = {
  left: 'top-0 left-0 h-full w-[80vw] max-w-[280px] sm:max-w-xs',
  right: 'top-0 right-0 h-full w-[80vw] max-w-[280px] sm:max-w-xs',
  top: 'top-0 left-0 w-full h-full max-h-[60vh]',
  bottom: 'bottom-0 left-0 w-full h-full max-h-[60vh]',
}

const slideOffscreenClasses: Record<DrawerPlacement, string> = {
  left: '-translate-x-full',
  right: 'translate-x-full',
  top: '-translate-y-full',
  bottom: 'translate-y-full',
}

const placementBorder: Record<DrawerPlacement, string> = {
  right: 'border-l-4',
  left: 'border-r-4',
  top: 'border-b-4',
  bottom: 'border-t-4',
}

const placementRadiusClasses: Record<DrawerPlacement, string> = {
  right: 'rounded-l-(--lithos-radius)',
  left: 'rounded-r-(--lithos-radius)',
  top: 'rounded-b-(--lithos-radius)',
  bottom: 'rounded-t-(--lithos-radius)',
}

const originClasses: Record<DrawerTransformOrigin, string> = {
  center: 'origin-center',
  top: 'origin-top',
  bottom: 'origin-bottom',
  left: 'origin-left',
  right: 'origin-right',
  'top-left': 'origin-top-left',
  'top-right': 'origin-top-right',
  'bottom-left': 'origin-bottom-left',
  'bottom-right': 'origin-bottom-right',
}

export const getDrawerClasses = (
  transition: DrawerTransition,
  placement: DrawerPlacement,
  transformOrigin?: DrawerTransformOrigin
) => {
  // cn automatically separates them
  const sharedClass = cn(placementClasses[placement], placementBorder[placement], placementRadiusClasses[placement])

  if (transition === 'fade') return cn(sharedClass, 'opacity-0 data-[status=open]:opacity-100')

  if (transition === 'zoom') {
    const defaultOrigin = originClasses[transformOrigin ?? placement]

    return cn(
      sharedClass,
      defaultOrigin,
      'opacity-0 scale-75 data-[status=open]:opacity-100 data-[status=open]:scale-100'
    )
  }

  // slide animation
  return cn(
    sharedClass,
    slideOffscreenClasses[placement],
    'data-[status=open]:translate-x-0 data-[status=open]:translate-y-0'
  )
}

export const getDuration = (transitionDuration: DrawerTransitionDuration, open: boolean) => {
  if (typeof transitionDuration === 'number') return transitionDuration

  if (transitionDuration) {
    return open ? transitionDuration.enter : transitionDuration.exit
  }

  return open ? 150 : 200
}
