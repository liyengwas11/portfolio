<script setup>
import { ref } from 'vue'
import { profile, philosophy } from '../data/portfolio.js'
import { useScrollReveal } from '../composables/useScrollReveal.js'

const sectionRef = ref(null)
useScrollReveal(sectionRef, '.reveal-item', { stagger: 0.1 })

const year = new Date().getFullYear()

const socialIcons = {
  github: 'M12 2a10 10 0 00-3.16 19.5c.5.1.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.1.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.6 9.6 0 015 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.75c0 .27.18.58.69.48A10 10 0 0012 2z',
  linkedin: 'M6.94 5a2 2 0 11-4-.02 2 2 0 014 .02zM3.5 8.5h3.9V21H3.5zM10.5 8.5h3.7v1.7h.05c.52-.96 1.78-2 3.66-2 3.9 0 4.62 2.5 4.62 5.8V21h-3.9v-6.1c0-1.46-.03-3.34-2.04-3.34-2.05 0-2.37 1.6-2.37 3.24V21h-3.9z',
  twitter: 'M22 5.9c-.7.3-1.5.5-2.3.6.8-.5 1.5-1.3 1.8-2.3-.8.5-1.6.8-2.6 1a4 4 0 00-6.9 3.7A11.5 11.5 0 013 4.6a4 4 0 001.3 5.4c-.6 0-1.2-.2-1.7-.5v.1a4 4 0 003.3 4 4 4 0 01-1.8.1 4 4 0 003.8 2.8A8.1 8.1 0 012 18.4a11.5 11.5 0 006.3 1.9c7.5 0 11.7-6.4 11.7-11.9v-.5c.8-.6 1.5-1.3 2-2z'
}
</script>

<template>
  <footer id="footer" ref="sectionRef" class="border-t border-white/5 pt-20 pb-10 px-6 sm:px-8">
    <div class="max-w-6xl mx-auto">
      <div class="reveal-item text-center max-w-2xl mx-auto mb-14">
        <p class="font-display text-xl sm:text-2xl text-ink leading-relaxed italic">
          {{ philosophy }}
        </p>
      </div>

      <div class="reveal-item flex flex-col sm:flex-row items-center justify-between gap-8 pt-10 border-t border-white/5">
        <div class="text-center sm:text-left">
          <p class="font-display font-semibold text-ink">{{ profile.name }}</p>
          <p class="text-sm text-ink-faint">{{ profile.location }} · Open to remote collaboration</p>
          <a :href="`mailto:${profile.email}`" class="text-sm text-accent hover:text-accent-soft transition-colors duration-300">
            {{ profile.email }}
          </a>
        </div>

        <div class="flex items-center gap-4">
          <a
            v-for="(url, key) in profile.socials"
            :key="key"
            :href="url"
            target="_blank"
            rel="noopener noreferrer"
            class="w-10 h-10 rounded-lg border border-white/10 flex items-center justify-center text-ink-muted
                   transition-all duration-300 hover:border-accent hover:text-accent hover:-translate-y-0.5"
            :aria-label="key"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path :d="socialIcons[key]" />
            </svg>
          </a>
        </div>
      </div>

      <p class="text-center text-xs text-ink-faint mt-10">
        © {{ year }} {{ profile.name }}. Built with Vue 3, GSAP & Tailwind CSS.
      </p>
    </div>
  </footer>
</template>
