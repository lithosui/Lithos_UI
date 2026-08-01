/// <reference types="vite/client" />

declare namespace React {
  namespace JSX {
    interface IntrinsicElements {
      ht: import('react').DetailedHTMLProps<import('react').HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}
