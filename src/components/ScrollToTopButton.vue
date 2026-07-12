<script setup>
/**
 * ScrollToTopButton.vue
 * ────────────────────────────────────────────────────────────────
 * Fixed-position button that appears once the user has scrolled past
 * roughly one viewport height, and smooth-scrolls back to the top on
 * click. Visibility is plain Vue reactivity (`ref` + scroll listener);
 * the show/hide transition itself is GSAP-driven via Vue's <Transition>
 * JS hooks, matching the pattern used in ProjectModal.vue.
 *
 * Fixed positioning means this works identically at every breakpoint —
 * no responsive variants needed, just safe-area-aware spacing on mobile.
 */
import { ref, onMounted, onBeforeUnmount } from 'vue'
import gsap from 'gsap'

const visible = ref(false)
let ticking = false

function onScroll() {
  if (ticking) return
  ticking = true
  requestAnimationFrame(() => {
    visible.value = window.scrollY > window.innerHeight * 0.6
    ticking = false
  })
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function onEnter(el, done) {
  gsap.fromTo(
    el,
    { opacity: 0, scale: 0.6, y: 16 },
    { opacity: 1, scale: 1, y: 0, duration: 0.35, ease: 'back.out(1.7)', onComplete: done }
  )
}

function onLeave(el, done) {
  gsap.to(el, { opacity: 0, scale: 0.6, y: 16, duration: 0.25, ease: 'power2.in', onComplete: done })
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <Transition :css="false" @enter="onEnter" @leave="onLeave">
    <button
      v-if="visible"
      type="button"
      aria-label="Scroll back to top"
      class="fixed z-50 bottom-5 right-5 sm:bottom-8 sm:right-8 w-11 h-11 sm:w-12 sm:h-12 rounded-full
             bg-steel border border-accent/25 text-accent flex items-center justify-center
             shadow-glow-sm transition-colors duration-300 hover:bg-accent hover:text-midnight"
      v-magnetic="{ strength: 0.25 }"
      @click="scrollToTop"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4">
        <path d="M12 19V5M5 12l7-7 7 7" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>
  </Transition>
</template>
