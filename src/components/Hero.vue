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
import { SplitText } from 'gsap/SplitText'
import { profile } from '../data/portfolio.js'

gsap.registerPlugin(SplitText)

const badgeRef = ref(null)
const headlineRef = ref(null)
const subtextRef = ref(null)
const ctaRef = ref(null)
const portraitRef = ref(null)

const prefersReducedMotion =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

onMounted(() => {
  if (prefersReducedMotion) return // elements are visible by default; skip motion only

  // SplitText breaks each headline line into individually animatable
  // pieces. Line 1 splits into words (reads naturally staggering in),
  // line 2 (the shorter accent line) splits into characters for a
  // punchier cascade. The `.overflow-hidden` wrapper on each line in
  // the template is what makes this read as "sliding out from under
  // a mask" rather than just fading in place.
  const line1 = new SplitText(headlineRef.value.querySelector('.line-1'), { type: 'words' })
  const line2 = new SplitText(headlineRef.value.querySelector('.line-2'), { type: 'chars' })

  const tl = gsap.timeline({
    defaults: { ease: 'power3.out', duration: 0.8 },
    delay: 0.3 // lets the Navbar's own entrance animation lead slightly
  })

  tl.from(badgeRef.value, { y: 20, opacity: 0 })
    .from(
      line1.words,
      { y: '110%', opacity: 0, stagger: 0.06, duration: 0.7 },
      '-=0.4' // overlap slightly with the previous tween for fluidity
    )
    .from(
      line2.chars,
      { y: '110%', opacity: 0, stagger: 0.025, duration: 0.5 },
      '-=0.45'
    )
    .from(subtextRef.value, { y: 20, opacity: 0 }, '-=0.4')
    .from(ctaRef.value.children, { y: 20, opacity: 0, stagger: 0.1 }, '-=0.5')
    .from(
      portraitRef.value,
      { scale: 0.9, opacity: 0, duration: 1 },
      '-=0.9' // portrait glides in roughly alongside the text block
    )
})
</script>

<template>
  <section id="hero" class="relative min-h-screen flex items-center pt-28 pb-20 px-6 sm:px-8">
    <div class="max-w-6xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center w-full">
      <!-- ─── Text column ─── -->
      <div>
        <div ref="badgeRef"
          class="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-accent/25 bg-accent/10">
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
            <span class="relative inline-flex rounded-full h-2 w-2 bg-accent" />
          </span>
          <span class="text-xs font-mono text-accent-soft tracking-wide">
            {{ profile.availability }}
          </span>
        </div>

        <h1 ref="headlineRef" class="section-heading text-4xl sm:text-5xl lg:text-6xl leading-[1.08] mb-6">
          <span class="block overflow-hidden"><span class="line-1 block">{{ profile.role }}</span></span>
          <span class="block overflow-hidden"><span class="line-2 block text-accent">Frontend · Backend ·
              API's</span></span>
        </h1>

        <p ref="subtextRef" class="text-lg text-ink-muted max-w-xl mb-10 leading-relaxed">
          {{ profile.summary }}
        </p>

        <div ref="ctaRef" class="flex flex-wrap items-center gap-4">
          <a href="#projects" class="btn-primary" v-magnetic>
            View Projects
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </a>
          <a href="#contact" class="btn-ghost" v-magnetic>Get in Touch</a>
        </div>
      </div>
      <div ref="portraitRef" class="relative mx-auto w-full max-w-sm">
        <!-- Abstract glow wrapper -->
        <div
          class="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-accent/30 via-accent/5 to-transparent blur-2xl"
          aria-hidden="true" />
        <!-- Modern rounded frame -->
        <div class="relative aspect-square rounded-[2rem] border border-accent/20 bg-steel overflow-hidden shadow-glow">

          <img src="/public/images/liyengwas.png" alt="Portrait of Liyengwas" class="w-full h-full object-cover" />

        </div>
      </div>
    </div>
  </section>
</template>
