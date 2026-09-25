# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [0.1.2]

### Added (0.1.2)

- **Skeleton & SkeletonText:** Added loading placeholder components ([#320](https://github.com/lithosui/Lithos_UI/pull/320)).
  - Text, rectangular, rounded, and circular variants with customizable dimensions and neutral or accent tones.
  - Shimmer animation enabled by default, with pulse and disabled animation options, opt-in reduced-motion support, and forced-colors support.
  - Multi-line text placeholders with configurable line count and last-line width, hidden from assistive technology and marked inert.
  - Documentation with installation instructions, props tables, and animation, card, list, and avatar examples, plus component tests.
- **Zero-Dependency CLI Installer:** Introduced `lithos-ui init` and `lithos-ui add <component>`.
  - Scaffolds a lightweight `lithos.json` configuration file.
  - Automatically fetches raw components, blocks, and all transitive dependencies (including local files and SVG icons) directly from GitHub.
  - Implements an intelligent, regex-based import rewrite engine (via Node's native `path` module) that recalculates relative import paths on the fly to match the consumer's custom directory structure.
  - Automatically injects neo-brutalist variables from `tokens.css` into the consumer's global CSS file, ensuring a seamless theming setup out-of-the-box.
  - Evaluates NPM dependencies required by downloaded components and outputs terminal warnings for manual installation.
  - Added `src/cli/registry.ts` to act as the single source of truth for component dependencies. The documentation's `SetupGuide.tsx` now dynamically pulls from this registry to prevent drift.
- **Dropdown:** Added the dropdown primitive ([#315](https://github.com/lithosui/Lithos_UI/pull/315)).
- **useListKeyNavigation:** Added hook to manage keyboard events easily and allowing 2D navigation. Currently being used by the `Dropdown` and `Select` primitives. ([#315](https://github.com/lithosui/Lithos_UI/pull/315))
- Added lithos-ui CSS **z-index variables** ([#329](https://github.com/lithosui/Lithos_UI/pull/329)).
- **Drawer:** Added the drawer primitive ([#332](https://github.com/lithosui/Lithos_UI/pull/332)).
- **Command:** Introduced neo-brutalist Command palette and ⌘K menu primitive suite ([#331](https://github.com/lithosui/Lithos_UI/pull/331)).
  - Zero-dependency, accessible keyboard-driven command menu (`Command`, `CommandInput`, `CommandList`, `CommandEmpty`, `CommandLoading`, `CommandGroup`, `CommandItem`, `CommandItemDescription`, `CommandBadge`, `CommandShortcut`, `CommandSeparator`, `CommandFooter`, `CommandDialog`).
  - Real-time client-side substring and keyword fuzzy searching with auto-hiding empty groups.
  - Full keyboard navigation (`ArrowUp`, `ArrowDown`, `Home`, `End`, `Enter`, `Escape`) with disabled item skipping and auto-scroll into view.
  - Integrated with Lithos UI primitives: mechanical keycaps via `Kbd`, intent tags via `Badge`, clearable search via `IconClose`, and modal overlays via `Dialog`.
  - Added desktop-grade `CommandFooter` status bar with interactive keycap hints and dynamic match counter.
  - Zero-Gap Rule compliance across all subcomponents using explicit margin/padding calculations and no CSS `gap`.
  - Comprehensive documentation page with live interactive examples (Basic, Shortcuts & Badges, and Dialog modal) and full `propsData` tables.
  - Vitest test suite with 14 unit tests achieving 100% pass rate and `jest-axe` automated accessibility compliance.
- Added lithos-ui CSS **z-index variables** ([#329](https://github.com/lithosui/Lithos_UI/pull/329)).
- **Drawer:** Added the drawer primitive ([#332](https://github.com/lithosui/Lithos_UI/pull/332)).

### Changed (0.1.2)

- Improved DX by allowing the `role` prop to be passed directly to the Popover component, simplifying `Dropdown` and `Select` implementations ([#318](https://github.com/lithosui/Lithos_UI/pull/318)).
- Added `matchTriggerWidth` prop to the **Popover** primitive ([#327](https://github.com/lithosui/Lithos_UI/pull/327)).
- Added `transitionDuration` prop to the **PopoverContent** component ([#327](https://github.com/lithosui/Lithos_UI/pull/327)).
- **Kbd & KbdGroup:** Introduced keyboard keycap and shortcut group UI primitives ([#328](https://github.com/lithosui/Lithos_UI/pull/328)).
  - Semantic `<kbd>` component with tactical keycap proportions, calibrated vertical/horizontal centering, and 0px-blur brutalist hard-drop shadows.
  - Multiple size steps (`xs`, `sm`, `md`, `lg`) and visual style variants (`default`, `accent`, `outline`, `solid`, `subtle`, `inverse`).
  - Dynamic YIQ biological contrast engine integration for custom HEX background colors.
  - `KbdGroup` compound component adhering to the Zero-Gap Rule with explicit margin spacing and an `attached` mode for fused multi-key strips.
  - Comprehensive documentation page with interactive shortcut examples, 5-color custom palette row, and live `Ctrl + K` input focus integration.
  - Unit tests with 100% pass rate and `jest-axe` accessibility compliance.
  - Scoped the generic `kbd` selector in `src/tokens.css` to `kbd:not([data-slot="kbd"])` to avoid polluting the `Kbd` component styling ([#328](https://github.com/lithosui/Lithos_UI/pull/328)).
- Properly arranged the components and blocks ([#303](https://github.com/lithosui/Lithos_UI/pull/303)).
- Improved the hero title responsiveness ([#305](https://github.com/lithosui/Lithos_UI/pull/305)).
- The `PopoverContent` now passes the transition status as `data-status` ([#322](https://github.com/lithosui/Lithos_UI/pull/332)).

### Fixed (0.1.2)

- Fixed select scrollbar overflow ([#309](https://github.com/lithosui/Lithos_UI/pull/309)).
- Fixed breadcrumb primitive items wrap ([#304](https://github.com/lithosui/Lithos_UI/pull/304)).
- Fixed clipping of border radius on underline tabs ([#302](https://github.com/lithosui/Lithos_UI/pull/302)).
- Fixed invalid type usage on the `PreviewBlock` and the `deriveUsageCode` doc. utility ([#330](https://github.com/lithosui/Lithos_UI/pull/330)).

### Removed (0.1.2)

## [0.1.1]

### Added (0.1.1)

- Tooltip component ([#277](https://github.com/lithosui/Lithos_UI/pull/277)).

### Changed (0.1.1)

- Comprehensive manual audit and synchronization of component `propsData` documentation with source typings.

### Fixed (0.1.1)

- Fixes for v0.1.0 for the components were made.
- Make the icon inside the checkbox move along with the box ([#276](https://github.com/lithosui/Lithos_UI/pull/276)).

### Removed (0.1.1)

## [0.0.0]

### Added (0.0.0)

- Initial pre-1.0 release of Lithos UI as a copy-paste React template repository.
- Zero-Gap layout architecture across landing and docs surfaces using explicit margin/padding spacing.
- YIQ-based automated contrast engine (`getContrastText`) for accent/foreground token selection.
- Universal specificity override system via runtime style injection in `useTheme` (`!important` token rebinding for accent and selection).
- Global physics token utility (`.lithos-click`) for shared brutalist interaction states.
- Initial component set:
  - Blocks: `Hero`, `FeatureGrid`, `Pricing`, `Testimonials`, `FAQ`, `ThemeEngine`.
  - Layout: `Navbar`, `Footer`, `NotFound`, `ComingSoon`.
  - UI primitives: `CodeViewer`, `PreviewBlock`, `ToastProvider`, `Toggle`, `KineticGrid`.
- Documentation routes/pages for introduction, installation, and core primitives (`CodeViewer`, `PreviewBlock`, `Toast`, `Toggle`).
- GitHub Actions CI workflow to lint and build on pushes and pull requests to `main`.

### Changed (0.0.0)

### Fixed (0.0.0)

### Removed (0.0.0)
