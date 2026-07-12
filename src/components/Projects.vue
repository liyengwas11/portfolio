<script setup>
import { ref } from 'vue'
import { projects } from '../data/portfolio.js'
import { useScrollReveal } from '../composables/useScrollReveal.js'

const sectionRef = ref(null)
useScrollReveal(sectionRef, '.reveal-item', { stagger: 0.1 })

// Inline icon paths keyed by project.icon — same pattern as Skills.vue.
const icons = {
  home: 'M4 12l8-8 8 8M6 10v10h12V10',
  shirt: 'M8 4l4 2 4-2 4 4-3 3v11H7V11L4 8l4-4z',
  card: 'M3 7h18v10H3zM3 10h18',
  grid: 'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z',
  truck: 'M3 7h11v8H3zM14 10h4l3 3v2h-7zM7 19a2 2 0 100-4 2 2 0 000 4zM18 19a2 2 0 100-4 2 2 0 000 4z',
  leaf: 'M5 20C5 10 12 4 20 4c0 8-6 15-16 16zM5 20c2-4 5-7 9-9'
}

// Micro-hover for repo/live icon buttons — handled with a light GSAP
// tween on pointerenter/leave rather than CSS, per the brief's
// request for GSAP-driven micro-interactions on repository icons.
import gsap from 'gsap'
function hoverIn(e) {
  gsap.to(e.currentTarget, { scale: 1.12, duration: 0.25, ease: 'power2.out' })
}
function hoverOut(e) {
  gsap.to(e.currentTarget, { scale: 1, duration: 0.25, ease: 'power2.out' })
}
</script>

<template>
  <section id="projects" ref="sectionRef" class="py-24 px-6 sm:px-8">
    <div class="max-w-6xl mx-auto">
      <div class="reveal-item mb-14">
        <span class="eyebrow">Selected Work</span>
        <h2 class="section-heading">Platforms shipped end-to-end</h2>
      </div>

      <!-- Single column on mobile, balanced 2-col grid from md, tightened to
           keep card reading width sensible even on very wide monitors -->
      <div class="grid md:grid-cols-2 gap-6">
        <article
          v-for="project in projects"
          :key="project.name"
          class="reveal-item card-surface p-7 flex flex-col transition-all duration-300 hover:border-accent/30 hover:-translate-y-1"
        >
          <div class="flex items-start justify-between mb-5">
            <div class="w-11 h-11 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" class="text-accent">
                <path :d="icons[project.icon]" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>

            <div class="flex items-center gap-3">
              <a
                :href="project.links.live"
                target="_blank"
                rel="noopener noreferrer"
                class="text-ink-faint hover:text-accent transition-colors duration-300"
                aria-label="View live site"
                @pointerenter="hoverIn"
                @pointerleave="hoverOut"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M14 5h5v5M19 5l-9 9M6 5H5v14h14v-1" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </a>
              <a
                :href="project.links.repo"
                target="_blank"
                rel="noopener noreferrer"
                class="text-ink-faint hover:text-accent transition-colors duration-300"
                aria-label="View repository"
                @pointerenter="hoverIn"
                @pointerleave="hoverOut"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                  <path
                    d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.4c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 00-1.3-3.2 4.2 4.2 0 00-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 00-6.2 0C7.1 4 6 4.3 6 4.3a4.2 4.2 0 00-.1 3.2A4.6 4.6 0 004.6 10.7c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V22"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </a>
            </div>
          </div>

          <h3 class="text-lg font-display font-semibold text-ink mb-2">{{ project.name }}</h3>
          <p class="text-sm text-ink-muted leading-relaxed mb-5 flex-1">{{ project.description }}</p>

          <div class="flex flex-wrap gap-2">
            <span v-for="tech in project.stack" :key="tech" class="tag-badge">{{ tech }}</span>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
