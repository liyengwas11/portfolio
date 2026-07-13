<script setup>
/**
 * Skills.vue
 * ────────────────────────────────────────────────────────────────
 * Three upgrades layered on top of the original tag-badge grid:
 *  1. `.spotlight-card` + `v-spotlight` — cursor-follow glow per card.
 *  2. Each skill row gets a small type-based icon (see `skillIcons`
 *     below) rather than the previous single icon per category.
 *  3. Each skill gets an animated proficiency bar, filled from 0 to
 *     `skill.level` once its card scrolls into view.
 *
 * Note on icons: these are simple hand-drawn glyphs grouped by *kind*
 * of technology (language, mobile, database, etc.) rather than exact
 * brand logos — keeps the visual language consistent with the rest
 * of the site's monochrome/accent icon style. Swap `skillIcons` for
 * real brand marks (e.g. from the Simple Icons or Devicon sets) if
 * you'd prefer literal logos; only this one object needs to change.
 */
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { skillCategories } from '../data/portfolio.js'
import { useScrollReveal } from '../composables/useScrollReveal.js'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref(null)
useScrollReveal(sectionRef, '.reveal-item', { stagger: 0.12 })

const prefersReducedMotion =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Category header icons (unchanged from before)
const categoryIcons = {
  code: 'M8 9l-4 3 4 3M16 9l4 3-4 3M13 5l-2 14',
  cloud: 'M6 18a4 4 0 010-8 5 5 0 019.6-1.5A4.5 4.5 0 0118 18H6z',
  database: 'M12 5c4.4 0 8-1.3 8-3s-3.6-3-8-3-8 1.3-8 3 3.6 3 8 3zM4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6',
  link: 'M9 17H7a5 5 0 010-10h2m6 10h2a5 5 0 000-10h-2M8 12h8'
}

// Small per-skill glyphs, grouped by kind of technology
const skillIcons = {
  code: 'M8 9l-4 3 4 3M16 9l4 3-4 3M13 5l-2 14',
  mobile: 'M8 3h8a1 1 0 011 1v16a1 1 0 01-1 1H8a1 1 0 01-1-1V4a1 1 0 011-1zM11 18h2',
  layers: 'M12 3l9 5-9 5-9-5 9-5zM3 13l9 5 9-5M3 17l9 5 9-5',
  terminal: 'M4 5h16v14H4zM7 9l3 3-3 3M13 16h4',
  server: 'M4 4h16v5H4zM4 15h16v5H4zM7.5 6.5h.01M7.5 17.5h.01',
  gitBranch: 'M6 3v9M6 18a2 2 0 100-4 2 2 0 000 4zM6 12a3 3 0 003 3h3a3 3 0 003-3V9M15 9a2 2 0 100-4 2 2 0 000 4z',
  cloud: 'M6 18a4 4 0 010-8 5 5 0 019.6-1.5A4.5 4.5 0 0118 18H6z',
  container: 'M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3zM12 3v9M4 7.5l8 4.5 8-4.5',
  database: 'M12 5c4.4 0 8-1.3 8-3s-3.6-3-8-3-8 1.3-8 3 3.6 3 8 3zM4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6',
  link: 'M9 17H7a5 5 0 010-10h2m6 10h2a5 5 0 000-10h-2M8 12h8'
}

const skillIconMap = {
  PHP: 'code',
  Laravel: 'code',
  'Vue.js 3': 'code',
  'Inertia.js': 'code',
  'JavaScript (ES6+)': 'code',
  TypeScript: 'code',
  Flutter: 'mobile',
  Dart: 'mobile',
  'Tailwind CSS': 'layers',
  'Linux / XAMPP': 'terminal',
  'CI/CD Pipelines': 'terminal',
  Nginx: 'server',
  'Git & GitHub': 'gitBranch',
  DigitalOcean: 'cloud',
  'Docker (basics)': 'container',
  MySQL: 'database',
  'Eloquent ORM': 'database',
  'Query Optimization': 'database',
  'Polymorphic Relations': 'database',
  'UUID Architecture': 'database',
  'M-Pesa Daraja API': 'link',
  'STK Push': 'link',
  'Airtel Money': 'link',
  'T-Kash': 'link',
  'USSD Gateways': 'link',
  'Card & Bank EFT': 'link',
  'REST API Design': 'link',
  'OAuth / Laravel Passport': 'link'
}

function iconFor(name) {
  return skillIcons[skillIconMap[name] || 'code']
}

// Animate each proficiency bar's width from 0 to its data-level once
// its card scrolls into view — same "batch" pattern as elsewhere.
onMounted(() => {
  if (!sectionRef.value) return
  const bars = sectionRef.value.querySelectorAll('.skill-bar-fill')
  if (!bars.length) return

  if (prefersReducedMotion) {
    bars.forEach((bar) => {
      bar.style.width = `${bar.dataset.level}%`
    })
    return
  }

  gsap.set(bars, { width: '0%' })
  ScrollTrigger.batch(bars, {
    start: 'top 92%',
    once: true,
    onEnter: (batch) =>
      batch.forEach((bar, i) => {
        gsap.to(bar, {
          width: `${bar.dataset.level}%`,
          duration: 1,
          delay: i * 0.04,
          ease: 'power3.out'
        })
      })
  })
})
</script>

<template>
  <section id="skills" ref="sectionRef" class="py-24 px-6 sm:px-8">
    <div class="max-w-6xl mx-auto">
      <div class="reveal-item mb-14">
        <span class="eyebrow">Technical Skills</span>
        <h2 class="section-heading">The stack behind every build</h2>
      </div>

      <!-- Stacked single column on mobile, balanced 2/4-col grid on wider screens -->
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="category in skillCategories"
          :key="category.title"
          v-spotlight
          class="reveal-item spotlight-card card-surface p-6 transition-colors duration-300 hover:border-accent/30"
        >
          <div class="flex items-center gap-3 mb-6">
            <div class="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="text-accent">
                <path :d="categoryIcons[category.icon]" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
            <h3 class="text-ink font-display font-semibold text-sm sm:text-base">{{ category.title }}</h3>
          </div>

          <ul class="space-y-4">
            <li v-for="skill in category.skills" :key="skill.name">
              <div class="flex items-center gap-2 mb-1.5">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="text-accent/70 shrink-0">
                  <path :d="iconFor(skill.name)" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <span class="text-xs sm:text-sm text-ink-muted leading-tight">{{ skill.name }}</span>
              </div>
              <div class="h-1.5 rounded-full bg-white/5 overflow-hidden">
                <div
                  class="skill-bar-fill h-full rounded-full bg-gradient-to-r from-accent/60 to-accent"
                  :data-level="skill.level"
                  style="width: 0%"
                />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
