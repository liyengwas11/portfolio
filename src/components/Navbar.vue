<script setup>
/**
 * Navbar.vue
 * ────────────────────────────────────────────────────────────────
 * - Fixed + backdrop-blurred at all breakpoints.
 * - Desktop (md+): horizontal link row, shown via Tailwind's `hidden md:flex`.
 * - Mobile (<md): hamburger button toggles a slide-in drawer. The
 *   drawer's open/close state is plain Vue reactivity (`ref`); GSAP
 *   only handles the *entrance* animation of the bar itself on load
 *   and a lightweight fade/slide for the drawer panel.
 */
import { ref, onMounted, watch, nextTick } from 'vue'
import gsap from 'gsap'
import { navLinks, profile } from '../data/portfolio.js'

const isOpen = ref(false)
const navRef = ref(null)
const drawerRef = ref(null)

function closeDrawer() {
  isOpen.value = false
}

// Animate the drawer panel in/out whenever `isOpen` toggles.
// This is a reactive watcher, not a ScrollTrigger — it responds to
// user interaction rather than scroll position.
watch(isOpen, async (open) => {
  await nextTick()
  if (!drawerRef.value) return
  if (open) {
    gsap.fromTo(
      drawerRef.value,
      { x: '100%', opacity: 0 },
      { x: '0%', opacity: 1, duration: 0.45, ease: 'power3.out' }
    )
  }
})

// Page-load entrance: the navbar glides down from above.
// This kicks off the sequential hero timeline — Hero.vue starts
// its own animation shortly after this, creating the "step-by-step"
// load sequence described in the brief.
onMounted(() => {
  gsap.fromTo(
    navRef.value,
    { y: -80, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }
  )
})
</script>

<template>
  <header
    ref="navRef"
    class="fixed top-0 inset-x-0 z-50 bg-midnight/70 backdrop-blur-lg border-b border-white/5"
  >
    <nav class="max-w-6xl mx-auto px-6 sm:px-8 h-16 flex items-center justify-between">
      <!-- Brand mark -->
      <a href="#hero" class="font-display font-semibold text-lg text-ink tracking-tight">
        <span class="text-accent">&lt;/&gt;</span> {{ profile.name }}
      </a>

      <!-- Desktop link row: hidden on mobile, flex row from md breakpoint up -->
      <ul class="hidden md:flex items-center gap-8">
        <li v-for="link in navLinks" :key="link.href">
          <a
            :href="link.href"
            class="relative text-sm text-ink-muted font-medium transition-colors duration-300 hover:text-accent
                   after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-px after:bg-accent
                   after:transition-all after:duration-300 hover:after:w-full"
          >
            {{ link.label }}
          </a>
        </li>
      </ul>

      <a
        href="#footer"
        class="hidden md:inline-flex btn-primary !py-2 !px-5 text-sm"
      >
        Let's Talk
      </a>

      <!-- Hamburger — mobile only -->
      <button
        type="button"
        class="md:hidden relative w-9 h-9 flex flex-col items-center justify-center gap-1.5 group"
        :aria-expanded="isOpen"
        aria-label="Toggle navigation menu"
        @click="isOpen = !isOpen"
      >
        <span
          class="block h-0.5 w-6 bg-ink transition-all duration-300 origin-center"
          :class="isOpen ? 'rotate-45 translate-y-2' : ''"
        />
        <span
          class="block h-0.5 w-6 bg-ink transition-all duration-300"
          :class="isOpen ? 'opacity-0' : 'opacity-100'"
        />
        <span
          class="block h-0.5 w-6 bg-ink transition-all duration-300 origin-center"
          :class="isOpen ? '-rotate-45 -translate-y-2' : ''"
        />
      </button>
    </nav>

    <!-- Mobile drawer -->
    <div
      v-show="isOpen"
      ref="drawerRef"
      class="md:hidden fixed inset-0 top-16 bg-midnight/98 backdrop-blur-xl border-t border-white/5"
    >
      <ul class="flex flex-col items-center gap-2 py-10">
        <li v-for="link in navLinks" :key="link.href" class="w-full text-center">
          <a
            :href="link.href"
            class="block py-4 text-lg text-ink font-medium hover:text-accent hover:bg-white/5 transition-colors duration-300"
            @click="closeDrawer"
          >
            {{ link.label }}
          </a>
        </li>
        <li class="mt-4">
          <a href="#footer" class="btn-primary" @click="closeDrawer">Let's Talk</a>
        </li>
      </ul>
    </div>
  </header>
</template>
