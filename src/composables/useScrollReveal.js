import { onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * useScrollReveal
 * ────────────────────────────────────────────────────────────────
 * A small reusable Composition API helper that wires up a
 * "slide up + fade in" ScrollTrigger animation for any group of
 * elements inside a container.
 *
 * Usage inside a component's <script setup>:
 *
 *   const sectionRef = ref(null)
 *   useScrollReveal(sectionRef, '.reveal-item', { stagger: 0.15 })
 *
 * Then mark up the elements you want animated with class="reveal-item".
 *
 * Respects prefers-reduced-motion by skipping the animated state
 * entirely (elements are simply visible, no motion).
 *
 * @param {import('vue').Ref} containerRef - ref to the wrapping DOM element
 * @param {string} selector - CSS selector (scoped to containerRef) for items to animate
 * @param {object} options - GSAP tween overrides (stagger, y offset, duration, start)
 */
export function useScrollReveal(containerRef, selector = '.reveal-item', options = {}) {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  onMounted(() => {
    if (!containerRef.value) return

    const items = containerRef.value.querySelectorAll(selector)
    if (!items.length) return

    if (prefersReducedMotion) {
      gsap.set(items, { opacity: 1, y: 0 })
      return
    }

    gsap.set(items, { opacity: 0, y: options.y ?? 40 })

    ScrollTrigger.batch(items, {
      start: options.start ?? 'top 85%',
      once: true,
      onEnter: (batch) =>
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          duration: options.duration ?? 0.8,
          ease: 'power3.out',
          stagger: options.stagger ?? 0.12
        })
    })
  })
}
