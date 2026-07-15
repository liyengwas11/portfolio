/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        // Core brand palette — backed by CSS custom properties (set at
        // runtime by src/composables/useTheme.js) rather than static hex,
        // so dark/light mode and user-picked accent colors both flow
        // through automatically. The rgb(var(...) / <alpha-value>) pattern
        // is what lets opacity utilities like `bg-accent/10` keep working.
        midnight: {
          DEFAULT: 'rgb(var(--color-bg) / <alpha-value>)',
          light: 'rgb(var(--color-bg-light) / <alpha-value>)'
        },
        steel: {
          DEFAULT: 'rgb(var(--color-surface) / <alpha-value>)',
          light: 'rgb(var(--color-surface-light) / <alpha-value>)',
          dark: 'rgb(var(--color-surface-dark) / <alpha-value>)'
        },
        accent: {
          DEFAULT: 'rgb(var(--color-accent) / <alpha-value>)',
          soft: 'rgb(var(--color-accent-soft) / <alpha-value>)'
        },
        ink: {
          DEFAULT: 'rgb(var(--color-text) / <alpha-value>)',
          muted: 'rgb(var(--color-text-muted) / <alpha-value>)',
          faint: 'rgb(var(--color-text-faint) / <alpha-value>)'
        }
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      },
      boxShadow: {
        glow: '0 0 40px rgb(var(--color-accent) / 0.25)',
        'glow-sm': '0 0 18px rgb(var(--color-accent) / 0.3)'
      },
      backgroundImage: {
        'grid-fade': 'linear-gradient(to bottom, rgb(var(--color-bg) / 0), rgb(var(--color-bg) / 1))'
      }
    }
  },
  plugins: []
}
