<script setup>
import { ref } from 'vue'
import { skillCategories } from '../data/portfolio.js'
import { useScrollReveal } from '../composables/useScrollReveal.js'

const sectionRef = ref(null)

// All elements carrying the `.reveal-item` class inside sectionRef
// (the heading + each category card) slide up and fade in as the
// section scrolls into view. See composables/useScrollReveal.js.
useScrollReveal(sectionRef, '.reveal-item', { stagger: 0.12 })

// Minimal inline icon set — avoids pulling in an icon library for
// four glyphs. Swap for @heroicons/vue or similar if the project grows.
const icons = {
  code: 'M8 9l-4 3 4 3M16 9l4 3-4 3M13 5l-2 14',
  cloud: 'M6 18a4 4 0 010-8 5 5 0 019.6-1.5A4.5 4.5 0 0118 18H6z',
  database: 'M12 5c4.4 0 8-1.3 8-3s-3.6-3-8-3-8 1.3-8 3 3.6 3 8 3zM4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6',
  link: 'M9 17H7a5 5 0 010-10h2m6 10h2a5 5 0 000-10h-2M8 12h8'
}
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
          class="reveal-item card-surface p-6 transition-colors duration-300 hover:border-accent/30"
        >
          <div class="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center mb-5">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="text-accent">
              <path :d="icons[category.icon]" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
          <h3 class="text-ink font-display font-semibold mb-4">{{ category.title }}</h3>
          <div class="flex flex-wrap gap-2">
            <span v-for="skill in category.skills" :key="skill" class="tag-badge">
              {{ skill }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
