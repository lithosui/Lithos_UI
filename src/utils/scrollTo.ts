interface ScrollToProps {
  element: HTMLElement
  vertical?: boolean | undefined
  amount: number
}

export const scrollTo = ({ element, vertical = false, amount }: ScrollToProps) =>
  'scrollTo' in element && element.scrollTo({ [vertical ? 'top' : 'left']: amount, behavior: 'instant' })
