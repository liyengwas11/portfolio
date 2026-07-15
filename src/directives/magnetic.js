import gsap from 'gsap'

/**
 * v-magnetic
 * ────────────────────────────────────────────────────────────────
 * Makes an element subtly follow the cursor while hovered, then
 * spring back to rest on mouseleave. `gsap.quickTo` is the key
 * piece here — it returns a function you can call repeatedly to
 * retarget an in-progress tween cheaply, which is exactly what a
 * continuous mousemove handler needs (creating a new tween every
 * frame would be wasteful and janky).
 *
 * Usage:
 *   <button v-magnetic>Hover me</button>
 *   <button v-magnetic="{ strength: 0.5 }">Stronger pull</button>
 *
 * Automatically disabled on touch devices (no `pointer: fine`),
 * since the effect only makes sense with a real cursor.
 */
function attach(el, strength) {
  const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3.out' })
  const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' })

  function onMove(e) {
    const rect = el.getBoundingClientRect()
    const relX = e.clientX - (rect.left + rect.width / 2)
    const relY = e.clientY - (rect.top + rect.height / 2)
    xTo(relX * strength)
    yTo(relY * strength)
  }

  function onLeave() {
    xTo(0)
    yTo(0)
  }

  el.addEventListener('mousemove', onMove)
  el.addEventListener('mouseleave', onLeave)

  return () => {
    el.removeEventListener('mousemove', onMove)
    el.removeEventListener('mouseleave', onLeave)
  }
}

export const magnetic = {
  mounted(el, binding) {
    if (!window.matchMedia('(pointer: fine)').matches) return
    const strength = binding.value?.strength ?? 0.35
    el.__magneticCleanup = attach(el, strength)
  },
  unmounted(el) {
    el.__magneticCleanup?.()
  }
}
