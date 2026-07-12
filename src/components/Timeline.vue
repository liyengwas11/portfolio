<script setup>
/**
 * Timeline.vue
 * ────────────────────────────────────────────────────────────────
 * Two layers sit behind the entries: a static faint line (the full-
 * height rail, always visible) and an accent-colored overlay line
 * that starts at scaleY(0) and is scrubbed up to scaleY(1) by
 * ScrollTrigger as the section scrolls past — literally "drawing"
 * itself downward in sync with scroll position (scrub, not once-off).
 * `transform-origin: top` is what makes it grow downward rather than
 * scaling from the center.
 */
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { timeline } from '../data/portfolio.js'
import { useScrollReveal } from '../composables/useScrollReveal.js'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref(null)
const railWrapRef = ref(null)
const railRef = ref(null)

useScrollReveal(sectionRef, '.reveal-item', { stagger: 0.15, y: 30 })

const prefersReducedMotion =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

onMounted(() => {
  if (!railRef.value || !railWrapRef.value || prefersReducedMotion) return

  gsap.to(railRef.value, {
    scaleY: 1,
    ease: 'none',
    scrollTrigger: {
      trigger: railWrapRef.value,
      start: 'top 75%',
      end: 'bottom 75%',
      scrub: 0.6 // ties progress directly to scroll position, not time
    }
  })
})
</script>

<template>
  <section id="timeline" ref="sectionRef" class="py-24 px-6 sm:px-8">
    <div class="max-w-4xl mx-auto">
      <div class="reveal-item mb-16">
        <span class="eyebrow">Career Timeline</span>
        <h2 class="section-heading">Where the work happened</h2>
      </div>

      <div ref="railWrapRef" class="relative ml-3 sm:ml-4">
        <!-- Static full-height rail, always visible -->
        <div class="absolute inset-y-0 left-0 w-px bg-white/10" aria-hidden="true" />
        <!-- Accent rail that draws downward as the section scrolls -->
        <div
          ref="railRef"
          class="absolute inset-y-0 left-0 w-px bg-accent origin-top scale-y-0"
          aria-hidden="true"
        />

        <ol class="relative">
          <li
            v-for="entry in timeline"
            :key="entry.title + entry.date"
            class="reveal-item relative pl-8 sm:pl-10 pb-14 last:pb-0"
          >
            <!-- Circular node, offset to straddle the rail -->
            <span
              class="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-midnight border-2 border-accent
                     shadow-[0_0_0_4px_rgb(var(--color-bg))]"
              aria-hidden="true"
            />

            <span class="font-mono text-xs text-accent-soft tracking-wide">{{ entry.date }}</span>
            <h3 class="text-xl font-display font-semibold text-ink mt-1">{{ entry.title }}</h3>
            <p class="text-sm text-ink-faint mb-4">{{ entry.org }}</p>

            <ul class="space-y-2">
              <li
                v-for="bullet in entry.bullets"
                :key="bullet"
                class="flex gap-3 text-ink-muted text-sm leading-relaxed"
              >
                <span class="mt-2 w-1 h-1 rounded-full bg-accent shrink-0" aria-hidden="true" />
                {{ bullet }}
              </li>
            </ul>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>
