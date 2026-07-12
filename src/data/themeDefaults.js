/**
 * Default color values for each theme mode. These are the values
 * used the first time a visitor loads the site (before they've
 * customized anything) and the values restored by "Reset to defaults"
 * in the theme customizer panel.
 *
 * Only these five tokens are user-editable per mode. Everything else
 * (hover shades, subtle borders, glow shadows) is mathematically
 * derived from these in useTheme.js, so the whole site stays
 * visually coherent no matter what colors someone picks.
 */
export const DEFAULT_THEMES = {
  dark: {
    bg: '#0f172a', // page background — midnight
    surface: '#1e293b', // card background — steel gray
    text: '#f1f5f9', // primary text — crisp slate white
    textMuted: '#94a3b8', // secondary text
    accent: '#06b6d4' // electric cyan — CTAs, links, highlights
  },
  light: {
    bg: '#f8fafc',
    surface: '#ffffff',
    text: '#0f172a',
    textMuted: '#475569',
    accent: '#0891b2' // slightly deeper cyan for AA contrast on white
  }
}

export const THEME_FIELDS = [
  { key: 'bg', label: 'Background' },
  { key: 'surface', label: 'Card Surface' },
  { key: 'text', label: 'Primary Text' },
  { key: 'textMuted', label: 'Muted Text' },
  { key: 'accent', label: 'Accent' }
]
