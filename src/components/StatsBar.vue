<script setup>
/**
 * StatsBar.vue
 * ────────────────────────────────────────────────────────────────
 * Counts each stat up from 0 to its real value once the strip enters
 * the viewport. Rather than tweening the DOM text directly (GSAP
 * can't tween strings), we tween a plain JS number object and write
 * the rounded value into the element on every `onUpdate` tick.
 */
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { stats } from '../data/portfolio.js'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref(null)
const prefersReducedMotion =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

function animateCounters() {
  const numberEls = sectionRef.value.querySelectorAll('.stat-number')
  numberEls.forEach((el) => {
    const target = Number(el.dataset.value)
    if (prefersReducedMotion) {
      el.textContent = target
      return
    }
    const counter = { val: 0 }
    gsap.to(counter, {
      val: target,
      duration: 1.6,
      ease: 'power2.out',
      onUpdate: () => {
        el.textContent = Math.round(counter.val)
      }
    })
  })
}

onMounted(() => {
  if (!sectionRef.value) return
  ScrollTrigger.create({
    trigger: sectionRef.value,
    start: 'top 82%',
    once: true,
    onEnter: animateCounters
  })
})
</script>

<template>
  <section ref="sectionRef" class="py-14 px-6 sm:px-8 border-y border-white/5">
    <div class="max-w-5xl mx-auto grid grid-cols-3 gap-6 sm:gap-10 text-center">
      <div v-for="stat in stats" :key="stat.label">
        <p class="font-display text-3xl sm:text-5xl font-semibold text-accent tabular-nums">
          <span class="stat-number" :data-value="stat.value">0</span>{{ stat.suffix }}
        </p>
        <p class="text-xs sm:text-sm text-ink-muted mt-2">{{ stat.label }}</p>
      </div>
    </div>
  </section>
</template>
