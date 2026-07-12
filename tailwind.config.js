/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        // Core brand palette — reference these instead of raw hex
        // anywhere in the app so the theme stays centrally editable.
        midnight: {
          DEFAULT: '#0f172a', // page background
          light: '#152238'
        },
        steel: {
          DEFAULT: '#1e293b', // card surfaces
          light: '#27374d',
          dark: '#172234'
        },
        accent: {
          DEFAULT: '#06b6d4', // electric cyan / neon teal — CTAs, hovers
          soft: '#22d3ee',
          dim: 'rgba(6, 182, 212, 0.15)'
        },
        ink: {
          DEFAULT: '#f1f5f9', // crisp slate white — primary text
          muted: '#94a3b8',   // secondary text
          faint: '#64748b'    // tertiary / captions
        }
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      },
      boxShadow: {
        glow: '0 0 40px rgba(6, 182, 212, 0.25)',
        'glow-sm': '0 0 18px rgba(6, 182, 212, 0.3)'
      },
      backgroundImage: {
        'grid-fade': 'linear-gradient(to bottom, rgba(15,23,42,0), rgba(15,23,42,1))'
      }
    }
  },
  plugins: []
}
