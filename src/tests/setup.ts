import '@testing-library/jest-dom/vitest'
import { toHaveNoViolations } from 'jest-axe'
import { expect } from 'vitest'

expect.extend(toHaveNoViolations)

import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

afterEach(() => {
  cleanup()
})

const ResizeObserverMock = class {
  observe() { }
  unobserve() { }
  disconnect() { }
}

window.ResizeObserver = ResizeObserverMock
