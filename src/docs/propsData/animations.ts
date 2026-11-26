import type { PropItem } from '../../components/ui/PropsTable'

export const animationMotionData: PropItem[] = [
  {
    name: '.lithos-spring',
    type: "'spring'",
    defaultValue: 'Default (.lithos-click)',
    required: false,
    description: 'Elastic overshoot recoil curve (350ms) with subtle scale pop on hover and press.',
  },
  {
    name: '.lithos-pop',
    type: "'pop'",
    required: false,
    description: 'Expands the hard offset shadow from 2px to 4px on hover and presses flush on active.',
  },
  {
    name: '.lithos-sink',
    type: "'sink'",
    required: false,
    description: 'Rests with a 4px offset shadow and glides flush into the slot on hover until only borders show.',
  },
  {
    name: '.lithos-lift',
    type: "'lift'",
    required: false,
    description: 'Elevates up-left away from the shadow on hover while expanding the offset.',
  },
  {
    name: '.lithos-stamp',
    type: "'stamp'",
    required: false,
    description: 'Tilts -1.5deg on hover and stamps straight and flush on active press.',
  },
  {
    name: '.lithos-flip',
    type: "'flip'",
    required: false,
    description: 'Swings the 4px offset shadow to the opposite bottom corner on hover.',
  },
  {
    name: '.lithos-flat',
    type: "'flat'",
    required: false,
    description: 'Removes shadow and translation movement for stationary controls.',
  },
]

export const animationEffectData: PropItem[] = [
  {
    name: 'none',
    type: "'none'",
    defaultValue: 'Default',
    required: false,
    description: 'No surface gradient or pattern overlay.',
  },
  {
    name: '.lithos-gradient',
    type: "'gradient'",
    required: false,
    description: 'Continuous kinetic gradient shift layered with contrast-safe theme tokens.',
  },
  {
    name: '.lithos-glint',
    type: "'glint'",
    required: false,
    description: 'Diagonal specular sheen passing across the surface on hover (450ms).',
  },
  {
    name: '.lithos-stripes',
    type: "'stripes'",
    required: false,
    description: 'Seamless diagonal repeating bands that scroll continuously while hovered.',
  },
  {
    name: '.lithos-dots',
    type: "'dots'",
    required: false,
    description: 'Dot-matrix grid pattern that shifts and scales smoothly on hover.',
  },
]

export const animationThemeApiData: PropItem[] = [
  {
    name: 'motion',
    type: "'spring' | 'pop' | 'sink' | 'lift' | 'stamp' | 'flip' | 'flat'",
    defaultValue: "'spring'",
    required: false,
    description: 'Active global click/hover physics preset read from ThemeProvider.',
  },
  {
    name: 'updateMotion',
    type: '(motion: LithosMotion) => void',
    required: false,
    description: 'Updates the global motion preset, persisting to localStorage and syncing data-lithos-motion.',
  },
  {
    name: 'effect',
    type: "'none' | 'gradient' | 'glint' | 'stripes' | 'dots'",
    defaultValue: "'none'",
    required: false,
    description: 'Active global surface effect preset read from ThemeProvider.',
  },
  {
    name: 'updateEffect',
    type: '(effect: LithosEffect) => void',
    required: false,
    description: 'Updates the global surface effect, persisting to localStorage and syncing data-lithos-effect.',
  },
]
