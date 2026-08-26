# Lithos UI

![Lithos UI logo](src/assets/lithos-logo.webp)

**Build frontends that refuse to break.**

Lithos UI is a free, neo-brutalist React component library engineered with absolute structural integrity. It ditches fragile CSS gaps and soft shadows in favor of hard math, rigid grids, and high-contrast accessibility.

## Core Architecture

### 1. The Zero-Gap Policy

Modern web layouts often rely on the CSS `gap` property, which can cause unpredictable overflow and sub-pixel rendering issues on complex nested grids.
Lithos UI strictly enforces a **Zero-Gap Architecture**. All structural spacing is handled via a combination of explicit parent negative margins (e.g., `-m-4`) and direct child margins (`m-4`), guaranteeing that layouts snap cleanly across breakpoints without viewport bleed.

### 2. YIQ Biological Contrast Engine

For accent colors, the dynamic theme engine does not rely on hardcoded contrast scales. Instead, it uses the **YIQ Luminance formula**—a mathematical calculation based on human optical sensitivity (heavily weighting the green spectrum).
When you inject a custom HEX code, the engine calculates the perceived biological brightness and automatically forces all nested typography and active UI elements to absolute `#000000` or `#FFFFFF` to ensure maximum WCAG compliance.

### 3. Universal Specificity Overrides

CSS specificity wars ruin dynamic themes. Lithos UI utilizes a Javascript-injected Universal Override block (`<style>`) targeting `*, :root, .dark, .obsidian` with `!important` flags. This guarantees that user-selected dynamic tokens completely overpower hardcoded Tailwind classes, ensuring instant, glitch-free repaints.

### 4. Global Physics Tokens

To prevent Tailwind class bloat ("DRY" architecture), Lithos UI packages its mechanical interactions into global CSS utility tokens. By applying the `.lithos-click` class to any button, the element instantly inherits the system's strict `2px` borders, brutalist `2px` shadows, and our signature zero-latency "Hard-Drop" click physics. No redundant transition or active states required.

## Components

| Component             | Status | Docs                                     |
| --------------------- | ------ | ---------------------------------------- |
| Accordion             | Stable | [Link](/src/docs/pages/Accordion.tsx)    |
| Alert                 | Stable | [Link](/src/docs/pages/Alert.tsx)        |
| Avatar                | Stable | [Link](/src/docs/pages/Avatar.tsx)       |
| Badge                 | Stable | [Link](/src/docs/pages/Badge.tsx)        |
| Breadcrumb            | Stable | [Link](/src/docs/pages/Breadcrumb.tsx)   |
| Button                | Stable | [Link](/src/docs/pages/Button.tsx)       |
| Calendar              | Stable | [Link](/src/docs/pages/Calendar.tsx)     |
| Card                  | Stable | [Link](/src/docs/pages/Card.tsx)         |
| Carousel              | Stable | [Link](/src/docs/pages/Carousel.tsx)     |
| Checkbox              | Stable | [Link](/src/docs/pages/Checkbox.tsx)     |
| CodeViewer            | Stable | [Link](/src/docs/pages/CodeViewer.tsx)   |
| Dialog                | Stable | [Link](/src/docs/pages/Dialog.tsx)       |
| Popover               | Stable | [Link](/src/docs/pages/Popover.tsx)      |
| PreviewBlock          | Stable | [Link](/src/docs/pages/PreviewBlock.tsx) |
| Toast (ToastProvider) | Stable | [Link](/src/docs/pages/Toast.tsx)        |
| Toggle                | Stable | [Link](/src/docs/pages/Toggle.tsx)       |

### Blocks

| Block Category | Status | Variants | Docs                                        |
| -------------- | ------ | -------- | ------------------------------------------- |
| FAQ            | Stable | 1        | [Link](/src/components/blocks/FAQ)          |
| Feature Grids  | Stable | 1        | [Link](/src/components/blocks/FeatureGrid)  |
| Footers        | Stable | 2        | [Link](/src/components/blocks/Footer)       |
| Hero Sections  | Stable | 2        | [Link](/src/components/blocks/Hero)         |
| Navbars        | Stable | 1        | [Link](/src/components/blocks/Navbar)       |
| Pricing Tables | Stable | 1        | [Link](/src/components/blocks/Pricing)      |
| Testimonials   | Stable | 1        | [Link](/src/components/blocks/Testimonials) |

---

## Installation

Lithos UI is currently a **Code Ownership Kit**. You copy the raw blocks into your project so you retain absolute control over the markup. It will eventually become a published **NPM package**, but it will always remain **100% free and open-source**.

As we continue to grow, more ready-made components, layout blocks, and dynamic features will be added to the library.

**Starting a new project?**
Click the Fork button at the top of the repository to instantly generate a fresh React app with the global design tokens and Theme Engine pre-configured.

**Adding to an existing project?**

1. Ensure your project is running **React** and **Tailwind CSS v4+**.
2. Copy the `index.css` global tokens into your main stylesheet.
3. Drop the components from the `/components` folder into your standard architecture.

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

_(Note: Interactive physics and structural weight are handled via the `@layer utilities` block in `index.css`, primarily through the `.lithos-click` token.)_

## Obsidian Mode (Dark Theme)

Lithos UI includes a native Dark Mode trigger. Simply apply the `.obsidian` class to the document body or top-level wrapper, and the global tokens will instantly invert, while respecting your primary `--lithos-accent` color.

### License

Lithos UI is free for unlimited commercial and personal projects. See LICENSE.md for full details.
