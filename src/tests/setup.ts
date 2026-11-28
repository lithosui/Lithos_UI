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
  observe() {}
  unobserve() {}
  disconnect() {}
}

window.ResizeObserver = ResizeObserverMock

import { vi } from 'vitest'

// Minimal mock to avoid ReferenceError and allow basic observation calls in tests
class MockIntersectionObserver {
  constructor(public callback: unknown) {}

  observe: IntersectionObserver['observe'] = () => {}
  unobserve: IntersectionObserver['unobserve'] = () => {}
  disconnect(): void {}
}

vi.stubGlobal('IntersectionObserver', MockIntersectionObserver)

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  },
})

Object.defineProperty(window, 'matchMedia', {
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  })),
})

window.HTMLElement.prototype.scrollIntoView = vi.fn()
