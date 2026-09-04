export type CarouselDirection = 'forwards' | 'backwards'
export type ScrollFuncProp = CarouselDirection | number
export type ScrollFunc = (direction: ScrollFuncProp) => void
export type SliderSelector = 'dots' | 'numbers'
export type CarouselMode = 'horizontal' | 'vertical'
export type CarouselControlsPosition = 'top' | 'bottom'
