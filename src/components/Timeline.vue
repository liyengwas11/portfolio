<script setup>
import { ref } from 'vue'
import { timeline } from '../data/portfolio.js'
import { useScrollReveal } from '../composables/useScrollReveal.js'

const sectionRef = ref(null)
useScrollReveal(sectionRef, '.reveal-item', { stagger: 0.15, y: 30 })
</script>

<template>
  <section id="timeline" ref="sectionRef" class="py-24 px-6 sm:px-8">
    <div class="max-w-4xl mx-auto">
      <div class="reveal-item mb-16">
        <span class="eyebrow">Career Timeline</span>
        <h2 class="section-heading">Where the work happened</h2>
      </div>

      <!-- Vertical rail: absolute-positioned line running down the left
           (mobile) — nodes sit on top of it via the circular markers. -->
      <ol class="relative border-l border-white/10 ml-3 sm:ml-4">
        <li
          v-for="entry in timeline"
          :key="entry.title + entry.date"
          class="reveal-item relative pl-8 sm:pl-10 pb-14 last:pb-0"
        >
          <!-- Circular node, offset to straddle the rail -->
          <span
            class="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-midnight border-2 border-accent
                   shadow-[0_0_0_4px_rgba(15,23,42,1)]"
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
  </section>
</template>
