<script setup>
/**
 * CustomCursor.vue
 * ────────────────────────────────────────────────────────────────
 * Mounted once at the App root. Two elements: a small dot that
 * tracks the cursor almost instantly, and a larger ring that trails
 * slightly behind (different quickTo durations create the lag) and
 * scales up over anything clickable. `mix-blend-mode: difference`
 * on the ring means it stays visible over both dark and light
 * surfaces without needing to know the current theme colors.
 *
 * Auto-disabled on touch devices via the `pointer: fine` media
 * query — a synthetic cursor makes no sense without a real one.
 */
import { ref, onMounted, onBeforeUnmount } from 'vue'
import gsap from 'gsap'

const dotRef = ref(null)
const ringRef = ref(null)
const enabled = ref(false)

let moveDot, moveRing, onOver, onOut, onMove

onMounted(() => {
  const hasFinePointer = window.matchMedia('(pointer: fine)').matches
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  enabled.value = hasFinePointer && !prefersReducedMotion
  if (!enabled.value) return

  // Only now — after we know the replacement is actually rendering —
  // do we tell CSS it's safe to hide the native cursor.
  document.documentElement.classList.add('has-custom-cursor')

  const dotX = gsap.quickTo(dotRef.value, 'x', { duration: 0.08, ease: 'power3.out' })
  const dotY = gsap.quickTo(dotRef.value, 'y', { duration: 0.08, ease: 'power3.out' })
  const ringX = gsap.quickTo(ringRef.value, 'x', { duration: 0.35, ease: 'power3.out' })
  const ringY = gsap.quickTo(ringRef.value, 'y', { duration: 0.35, ease: 'power3.out' })

  onMove = (e) => {
    dotX(e.clientX)
    dotY(e.clientY)
    ringX(e.clientX)
    ringY(e.clientY)
  }

  onOver = (e) => {
    if (e.target.closest('a, button, input, textarea, [data-cursor-hover]')) {
      gsap.to(ringRef.value, { scale: 1.8, duration: 0.3, ease: 'power2.out' })
    }
  }
  onOut = (e) => {
    if (e.target.closest('a, button, input, textarea, [data-cursor-hover]')) {
      gsap.to(ringRef.value, { scale: 1, duration: 0.3, ease: 'power2.out' })
    }
  }

  window.addEventListener('mousemove', onMove)
  document.addEventListener('mouseover', onOver)
  document.addEventListener('mouseout', onOut)
})

onBeforeUnmount(() => {
  document.documentElement.classList.remove('has-custom-cursor')
  window.removeEventListener('mousemove', onMove)
  document.removeEventListener('mouseover', onOver)
  document.removeEventListener('mouseout', onOut)
})
</script>

<template>
  <div aria-hidden="true">
    <div
      ref="dotRef"
      class="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-accent pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2 opacity-0"
      :class="{ '!opacity-100': enabled }"
    />
    <div
      ref="ringRef"
      class="fixed top-0 left-0 w-8 h-8 rounded-full border border-accent/60 pointer-events-none z-[100]
             -translate-x-1/2 -translate-y-1/2 mix-blend-difference opacity-0"
      :class="{ '!opacity-100': enabled }"
    />
  </div>
</template>
