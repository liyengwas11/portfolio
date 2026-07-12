<script setup>
/**
 * Hero.vue
 * ────────────────────────────────────────────────────────────────
 * Page-load choreography lives here as a single GSAP timeline
 * (`tl`), sequencing: eyebrow badge -> headline words -> subtext ->
 * CTAs -> portrait. Using one timeline (rather than independent
 * tweens) is what makes the sequence feel directed instead of
 * scattered — each `tl.from(...)` call without an explicit position
 * argument automatically queues after the previous one.
 */
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import { profile } from '../data/portfolio.js'

const badgeRef = ref(null)
const headlineRef = ref(null)
const subtextRef = ref(null)
const ctaRef = ref(null)
const portraitRef = ref(null)

const prefersReducedMotion =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

onMounted(() => {
  if (prefersReducedMotion) return // elements are visible by default; skip motion only

  const tl = gsap.timeline({
    defaults: { ease: 'power3.out', duration: 0.8 },
    delay: 0.3 // lets the Navbar's own entrance animation lead slightly
  })

  tl.from(badgeRef.value, { y: 20, opacity: 0 })
    .from(
      headlineRef.value.querySelectorAll('.headline-line'),
      { y: 40, opacity: 0, stagger: 0.15 },
      '-=0.4' // overlap slightly with the previous tween for fluidity
    )
    .from(subtextRef.value, { y: 20, opacity: 0 }, '-=0.5')
    .from(ctaRef.value.children, { y: 20, opacity: 0, stagger: 0.1 }, '-=0.5')
    .from(
      portraitRef.value,
      { scale: 0.9, opacity: 0, duration: 1 },
      '-=0.9' // portrait glides in roughly alongside the text block
    )
})
</script>

<template>
  <section
    id="hero"
    class="relative min-h-screen flex items-center pt-28 pb-20 px-6 sm:px-8"
  >
    <div class="max-w-6xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center w-full">
      <!-- ─── Text column ─── -->
      <div>
        <div
          ref="badgeRef"
          class="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-accent/25 bg-accent/10"
        >
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
            <span class="relative inline-flex rounded-full h-2 w-2 bg-accent" />
          </span>
          <span class="text-xs font-mono text-accent-soft tracking-wide">
            {{ profile.availability }}
          </span>
        </div>

        <h1 ref="headlineRef" class="section-heading text-4xl sm:text-5xl lg:text-6xl leading-[1.08] mb-6">
          <span class="headline-line block">{{ profile.role }}</span>
          <span class="headline-line block text-accent">Laravel · Vue · Flutter</span>
        </h1>

        <p ref="subtextRef" class="text-lg text-ink-muted max-w-xl mb-10 leading-relaxed">
          {{ profile.summary }}
        </p>

        <div ref="ctaRef" class="flex flex-wrap items-center gap-4">
          <a href="#projects" class="btn-primary">
            View Projects
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </a>
          <a href="#footer" class="btn-ghost">Get in Touch</a>
        </div>
      </div>

      <!-- ─── Portrait column ───
           Structure: outer glow wrapper -> rounded frame -> image slot.
           Swap the placeholder <div> below for a real <img> tag:
             <img src="/my-photo.jpg" alt="Liyengwas portrait"
                  class="w-full h-full object-cover" />
           The aspect-square + rounded-[2rem] on the frame keep the
           layout ratio stable regardless of what's inside it. -->
      <div ref="portraitRef" class="relative mx-auto w-full max-w-sm">
        <!-- Abstract glow wrapper -->
        <div
          class="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-accent/30 via-accent/5 to-transparent blur-2xl"
          aria-hidden="true"
        />
        <!-- Modern rounded frame -->
        <div class="relative aspect-square rounded-[2rem] border border-accent/20 bg-steel overflow-hidden shadow-glow">
          <!--
            STRUCTURAL PLACEHOLDER — replace this whole <div> with:
            <img src="/my-photo.jpg" alt="Portrait of Liyengwas" class="w-full h-full object-cover" />
          -->
          <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-steel-light to-steel-dark">
            <svg viewBox="0 0 200 200" class="w-2/3 h-2/3 text-accent/40" fill="none" stroke="currentColor" stroke-width="1.5">
              <circle cx="100" cy="72" r="34" />
              <path d="M40 176c8-38 40-58 60-58s52 20 60 58" stroke-linecap="round" />
              <rect x="8" y="8" width="184" height="184" rx="24" stroke-dasharray="4 6" opacity="0.5" />
            </svg>
          </div>
          <!-- Corner tag reinforcing the "swap me" affordance during dev -->
          <span class="absolute bottom-3 right-3 text-[10px] font-mono text-ink-faint bg-midnight/80 px-2 py-1 rounded">
            replace with my-photo.jpg
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
