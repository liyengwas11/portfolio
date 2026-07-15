<script setup>
/**
 * ThemeSwitcher.vue
 * ────────────────────────────────────────────────────────────────
 * A single sun/moon button that flips `mode` between 'dark' and
 * 'light'. The underlying color-customization system (useTheme.js,
 * themeDefaults.js) is still fully intact — colors[mode] still holds
 * editable values and everything derives from them — this component
 * just no longer exposes a UI for picking them. To bring that back,
 * see the previous version of this file for the panel markup.
 */
import { useTheme } from '../composables/useTheme.js'

const { mode, toggleMode } = useTheme()
</script>

<template>
  <button
    type="button"
    class="w-9 h-9 rounded-lg flex items-center justify-center text-ink-muted
           transition-colors duration-300 hover:text-accent hover:bg-white/5"
    :aria-label="mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
    @click="toggleMode"
  >
    <svg v-if="mode === 'dark'" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" stroke-linecap="round" />
    </svg>
    <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  </button>
</template>
