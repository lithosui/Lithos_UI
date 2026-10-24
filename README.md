![Lithos UI logo](public/full_logo.webp)

**Build frontends that refuse to break.**

Lithos UI is a free, neo-brutalist React component library engineered with absolute structural integrity. It ditches fragile CSS gaps and soft shadows in favor of rigid grids, and high-contrast accessibility.

<p align="left">
  <a href="https://www.npmjs.com/package/lithos-ui"><img src="https://img.shields.io/npm/v/lithos-ui?style=flat-square&color=000000" alt="NPM Version" /></a>
  <a href="./LICENSE.md"><img src="https://img.shields.io/badge/license-MIT-000000?style=flat-square" alt="License" /></a>
  <a href="https://opencollective.com/lithos-ui"><img src="https://img.shields.io/opencollective/all/lithos-ui?label=financial%20contributors&color=00ff00&style=flat-square&logo=open-collective&logoColor=000000" alt="Open Collective Contributors" /></a>
</p>

## Core Architecture

### 1. YIQ Biological Contrast Engine

For accent colors, the dynamic theme engine does not rely on hardcoded contrast scales. Instead, it uses the **YIQ Luminance formula**—a mathematical calculation based on human optical sensitivity (heavily weighting the green spectrum).
When you inject a custom HEX code, the engine calculates the perceived biological brightness and automatically forces all nested typography and active UI elements to absolute `#000000` or `#FFFFFF` to ensure maximum WCAG compliance.

### 2. The Zero-Gap Policy

Modern web layouts often rely on the CSS `gap` property, which can cause unpredictable overflow and sub-pixel rendering issues on complex nested grids.
Lithos UI strictly enforces a **Zero-Gap Architecture**. All structural spacing is handled via a combination of explicit parent negative margins (e.g., `-m-4`) and direct child margins (`m-4`), guaranteeing that layouts snap cleanly across breakpoints without viewport bleed.

### 3. Universal Specificity Overrides

CSS specificity wars ruin dynamic themes. Lithos UI utilizes a Javascript-injected Universal Override block (`<style>`) targeting `*, :root, .dark, .obsidian` with `!important` flags. This guarantees that user-selected dynamic tokens completely overpower hardcoded Tailwind classes, ensuring instant, glitch-free repaints.

### 4. Global Physics Tokens

To prevent Tailwind class bloat ("DRY" architecture), Lithos UI packages its mechanical interactions into global CSS utility tokens. By applying the `.lithos-click` class to any button, the element instantly inherits the system's strict `2px` borders, brutalist `2px` shadows, and our signature zero-latency "Hard-Drop" click physics. No redundant transition or active states required.

## Components

[See the component tracker issue for all existing and planned components.](https://github.com/lithosui/Lithos_UI/issues/311)

---

## Installation

Lithos UI is a published NPM package. It will always remain **100% free and open-source**.

You can install it using your favorite package manager:

```bash
pnpm add lithos-ui
# or
npm install lithos-ui
# or
yarn add lithos-ui
# or
bun add lithos-ui
```

### Setup

1. Ensure your project is running **React** and **Tailwind CSS v4+**.
2. Import Tailwind and the global CSS tokens into your main CSS file (e.g., `index.css`):

```css
/* index.css */
@import 'tailwindcss';
@source "../node_modules/lithos-ui";
@import 'lithos-ui/tokens.css'; /* Must be imported second */
```

3. Start using the components:

```tsx
import { Button } from 'lithos-ui'

export default function App() {
  return <Button>Click me</Button>
}
```

## Versioning

Lithos UI is currently pre-1.0 (`0.x.y`). During this phase:

- `0.X.0` (minor) releases may include breaking changes.
- `0.x.X` (patch) releases are intended to be safe, non-breaking updates.

After `1.0.0`, Lithos UI will follow standard semantic versioning where breaking changes only ship in major versions.

See [CHANGELOG.md](./CHANGELOG.md) for release history.

## Global Design Tokens

The entire visual weight of the library is controlled by these 7 variables. Modify them in your `index.css` or manipulate them via Javascript for live-theming.

```css
:root {
  --lithos-bg: #ffffff; /* The deep background */
  --lithos-text: #000000; /* Primary typography */
  --lithos-border: #000000; /* Structural lines */
  --lithos-accent: #00ff00; /* The loud brand color */
  --lithos-accent-text: #000000; /* Auto-calculated by YIQ */
  --lithos-surface: #ffffff; /* Card backgrounds */
  --lithos-shadow: rgba(0, 0, 0, 1); /* Brutalist shadow offset */
}
```

_(Note: Interactive physics and structural weight are handled via the `@layer components` block in `tokens.css`, primarily through the `.lithos-click` token.)_

## Obsidian Mode (Dark Theme)

Lithos UI includes a native Dark Mode trigger. Simply apply the `.obsidian` class to the document body or top-level wrapper, and the global tokens will instantly invert, while respecting your primary `--lithos-accent` color.

## Sponsors & Financial Contributors

Lithos UI is an independent open-source project supported by our community and fiscal host [Open Source Collective](https://opencollective.com/lithos-ui).

If you or your team use Lithos UI to ship products, consider [becoming a financial contributor](https://opencollective.com/lithos-ui). Contributions directly fund our custom domain, hosting infrastructure, and ongoing development of brutalist primitives.

<p align="left">
  <a href="https://opencollective.com/lithos-ui">
    <img src="https://opencollective.com/lithos-ui/donate/button@2x.png?color=blue" width="220" alt="Donate to Lithos UI on Open Collective" />
  </a>
</p>

### Financial Contributors

<a href="https://opencollective.com/lithos-ui">
  <img src="https://opencollective.com/lithos-ui/backers.svg?width=890" alt="Lithos UI Financial Contributors" />
</a>

## License

Lithos UI is free for unlimited commercial and personal projects. See [LICENSE.md](./LICENSE.md) for full details.
