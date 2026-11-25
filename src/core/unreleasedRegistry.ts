/**
 * @fileoverview Lithos UI Unreleased Components Registry.
 *
 * Tracks component slugs implemented in the repository and docs
 * that have not yet been published to the npm/pnpm package registry.
 * Used to display badges in navigation and alert tickers on documentation pages.
 */

export interface UnreleasedComponentEntry {
  slug: string
  badgeLabel: string
  warningMessage: string
}

export const DEFAULT_UNRELEASED_BADGE_LABEL = 'NEW'
export const DEFAULT_UNRELEASED_WARNING_MESSAGE =
  'UNRELEASED COMPONENT · DO NOT USE YET · THIS COMPONENT IS YET TO BE RELEASED ⚠'

const UNRELEASED_SLUGS = new Set(['slider', 'marquee', 'textarea'])

const normalizeSlug = (identifier?: string): string =>
  identifier ? identifier.toLowerCase().trim().replaceAll(' ', '-') : ''

/**
 * Checks whether a given component slug or name is currently unreleased on npm.
 */
export const isUnreleasedComponent = (identifier?: string): boolean => UNRELEASED_SLUGS.has(normalizeSlug(identifier))

/**
 * Retrieves unreleased metadata for a component if applicable.
 */
export const getUnreleasedComponentInfo = (identifier?: string): UnreleasedComponentEntry | undefined => {
  const slug = normalizeSlug(identifier)
  if (!UNRELEASED_SLUGS.has(slug)) return undefined

  return {
    slug,
    badgeLabel: DEFAULT_UNRELEASED_BADGE_LABEL,
    warningMessage: DEFAULT_UNRELEASED_WARNING_MESSAGE,
  }
}
