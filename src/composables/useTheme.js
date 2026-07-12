import { reactive, ref, watch } from 'vue'
import { DEFAULT_THEMES } from '../data/themeDefaults.js'

const STORAGE_KEY = 'portfolio-theme-v1'

/* ── Small color-math helpers (no dependency needed for this) ───── */

function hexToRgb(hex) {
  const clean = hex.replace('#', '')
  const full = clean.length === 3 ? clean.split('').map((c) => c + c).join('') : clean
  const num = parseInt(full, 16)
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255]
}

function rgbTriplet([r, g, b]) {
  return `${r} ${g} ${b}`
}

/** Mix a hex color toward white ("lighten") or black ("darken") by 0–1 amount */
function shade(hex, amount, towards = 255) {
  const [r, g, b] = hexToRgb(hex)
  const mix = (c) => Math.round(c + (towards - c) * amount)
  return [mix(r), mix(g), mix(b)]
}

/** Mix two hex colors together by a 0–1 ratio (used for the "faint" text shade) */
function mixHex(hexA, hexB, ratio) {
  const [r1, g1, b1] = hexToRgb(hexA)
  const [r2, g2, b2] = hexToRgb(hexB)
  const mix = (a, b) => Math.round(a + (b - a) * ratio)
  return [mix(r1, r2), mix(g1, g2), mix(b1, b2)]
}

/* ── Reactive state (module-scoped singleton — shared across every
   component that imports useTheme, so the Navbar toggle and the
   customizer panel always agree on the current state) ───────────── */

const mode = ref('dark')
const colors = reactive({
  dark: { ...DEFAULT_THEMES.dark },
  light: { ...DEFAULT_THEMES.light }
})

function applyTheme() {
  const c = colors[mode.value]
  const root = document.documentElement.style

  root.setProperty('--color-bg', rgbTriplet(hexToRgb(c.bg)))
  root.setProperty('--color-bg-light', rgbTriplet(shade(c.bg, 0.06, 255)))
  root.setProperty('--color-surface', rgbTriplet(hexToRgb(c.surface)))
  root.setProperty('--color-surface-light', rgbTriplet(shade(c.surface, 0.08, 255)))
  root.setProperty('--color-surface-dark', rgbTriplet(shade(c.surface, 0.1, 0)))
  root.setProperty('--color-text', rgbTriplet(hexToRgb(c.text)))
  root.setProperty('--color-text-muted', rgbTriplet(hexToRgb(c.textMuted)))
  root.setProperty('--color-text-faint', rgbTriplet(mixHex(c.textMuted, c.bg, 0.35)))
  root.setProperty('--color-accent', rgbTriplet(hexToRgb(c.accent)))
  root.setProperty('--color-accent-soft', rgbTriplet(shade(c.accent, 0.18, 255)))

  document.documentElement.style.colorScheme = mode.value
  document.documentElement.setAttribute('data-theme', mode.value)
}

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ mode: mode.value, colors }))
  } catch {
    // localStorage can throw in private-browsing/sandboxed contexts — theme
    // still works for the session, it just won't persist across reloads.
  }
}

function loadPersisted() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (parsed.mode) mode.value = parsed.mode
      if (parsed.colors?.dark) Object.assign(colors.dark, parsed.colors.dark)
      if (parsed.colors?.light) Object.assign(colors.light, parsed.colors.light)
      return
    }
  } catch {
    // fall through to system-preference default below
  }
  // No saved preference yet — respect the OS/browser color-scheme setting
  if (window.matchMedia?.('(prefers-color-scheme: light)').matches) {
    mode.value = 'light'
  }
}

let initialized = false
function initTheme() {
  if (initialized) return
  initialized = true
  loadPersisted()
  applyTheme()
  watch([mode, colors], () => {
    applyTheme()
    persist()
  }, { deep: true })
}

function toggleMode() {
  mode.value = mode.value === 'dark' ? 'light' : 'dark'
}

function setColor(themeMode, key, hexValue) {
  colors[themeMode][key] = hexValue
}

function resetMode(themeMode) {
  Object.assign(colors[themeMode], DEFAULT_THEMES[themeMode])
}

export function useTheme() {
  initTheme()
  return { mode, colors, toggleMode, setColor, resetMode }
}
