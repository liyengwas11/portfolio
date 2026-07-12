<script setup>
import { ref } from 'vue'
import { about, profile } from '../data/portfolio.js'
import { useScrollReveal } from '../composables/useScrollReveal.js'

const sectionRef = ref(null)
useScrollReveal(sectionRef, '.reveal-item', { stagger: 0.12 })
</script>

<template>
  <section id="about" ref="sectionRef" class="py-24 px-6 sm:px-8">
    <div class="max-w-5xl mx-auto grid lg:grid-cols-[1.3fr_0.7fr] gap-14">
      <!-- Copy column — dummy text, meant to be rewritten -->
      <div>
        <div class="reveal-item mb-8">
          <span class="eyebrow">About Me</span>
          <h2 class="section-heading">A bit of context on {{ profile.name }}</h2>
        </div>

        <div class="reveal-item space-y-5">
          <p
            v-for="(paragraph, i) in about.paragraphs"
            :key="i"
            class="text-ink-muted leading-relaxed"
          >
            {{ paragraph }}
          </p>
        </div>
      </div>

      <!-- Highlights column -->
      <div class="reveal-item card-surface p-7 h-fit">
        <h3 class="text-sm font-mono text-accent uppercase tracking-wide mb-5">What I focus on</h3>
        <ul class="space-y-4">
          <li
            v-for="point in about.highlights"
            :key="point"
            class="flex gap-3 text-sm text-ink-muted leading-relaxed"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" class="text-accent shrink-0 mt-0.5">
              <path d="M5 12l5 5L20 7" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            {{ point }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
