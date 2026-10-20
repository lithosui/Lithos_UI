# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [0.1.3]

### Added (0.1.3)

### Changed (0.1.3)

### Fixed (0.1.3)

### Removed (0.1.3)

## [0.1.2]

### Added (0.1.2)

- **Skeleton:** Added loading placeholder component suite ([#320](https://github.com/lithosui/Lithos_UI/pull/320)).
- **CLI Installer:** Introduced `lithos-ui init` and `lithos-ui add <component>` zero-dependency installer.
- **Dropdown:** Added the dropdown primitive ([#315](https://github.com/lithosui/Lithos_UI/pull/315)).
- **useListKeyNavigation:** Added hook for 2D keyboard navigation ([#315](https://github.com/lithosui/Lithos_UI/pull/315)).
- Added lithos-ui CSS **z-index variables** ([#329](https://github.com/lithosui/Lithos_UI/pull/329)).
- **Drawer:** Added the drawer primitive ([#332](https://github.com/lithosui/Lithos_UI/pull/332)).
- **Command:** Introduced neo-brutalist Command palette and ⌘K menu primitive suite ([#331](https://github.com/lithosui/Lithos_UI/pull/331)).
- **useMediaQuery:** Added hook to listen to media queries ([#332](https://github.com/lithosui/Lithos_UI/pull/332)).

### Changed (0.1.2)

- **Popover:** Added `role` and `matchTriggerWidth` props, simplifying `Dropdown` and `Select` implementations ([#318](https://github.com/lithosui/Lithos_UI/pull/318), [#327](https://github.com/lithosui/Lithos_UI/pull/327)).
- **PopoverContent:** Added `transitionDuration` prop and `data-status` attribute ([#327](https://github.com/lithosui/Lithos_UI/pull/327), [#322](https://github.com/lithosui/Lithos_UI/pull/332)).
- **Select / Dropdown:** Standardized the inner option item border radius to use the global `--lithos-radius` token.
- **Kbd:** Introduced keyboard keycap and shortcut group UI primitives ([#328](https://github.com/lithosui/Lithos_UI/pull/328)).
- Properly arranged the components and blocks ([#303](https://github.com/lithosui/Lithos_UI/pull/303)).
- Improved the hero title responsiveness ([#305](https://github.com/lithosui/Lithos_UI/pull/305)).

### Fixed (0.1.2)

- **Select:** Fixed empty scrollbar gap rendering issue by removing forced `scrollbar-gutter: stable`.
- Fixed select scrollbar overflow ([#309](https://github.com/lithosui/Lithos_UI/pull/309)).
- Fixed breadcrumb primitive items wrap ([#304](https://github.com/lithosui/Lithos_UI/pull/304)).
- Fixed clipping of border radius on underline tabs ([#302](https://github.com/lithosui/Lithos_UI/pull/302)).
- Fixed invalid type usage on the `PreviewBlock` and the `deriveUsageCode` doc. utility ([#330](https://github.com/lithosui/Lithos_UI/pull/330)).

### Removed (0.1.2)

## [0.1.1]

### Added (0.1.1)

- Tooltip component.

### Changed (0.1.1)

- Comprehensive manual audit and synchronization of component `propsData` documentation with source typings.

### Fixed (0.1.1)

- Fixes for v0.1.0 for the components were made.

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
