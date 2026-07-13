/**
 * v-spotlight
 * ────────────────────────────────────────────────────────────────
 * Tracks the cursor position relative to the element and writes it
 * into two CSS custom properties (--spot-x, --spot-y). Pair with the
 * `.spotlight-card` class in style.css, which uses those variables
 * to position a radial-gradient glow on ::before. Kept as a tiny
 * directive rather than baked into one component so it's reusable
 * anywhere a "spotlight hover" card is useful later (Projects,
 * Timeline entries, etc).
 */
function attach(el) {
  function onMove(e) {
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--spot-x', `${e.clientX - rect.left}px`)
    el.style.setProperty('--spot-y', `${e.clientY - rect.top}px`)
  }
  el.addEventListener('mousemove', onMove)
  return () => el.removeEventListener('mousemove', onMove)
}

export const spotlight = {
  mounted(el) {
    if (!window.matchMedia('(pointer: fine)').matches) return
    el.__spotlightCleanup = attach(el)
  },
  unmounted(el) {
    el.__spotlightCleanup?.()
  }
}
