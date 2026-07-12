<script setup>
/**
 * Projects.vue
 * ────────────────────────────────────────────────────────────────
 * Each card now shows an image thumbnail (project.images[0], or a
 * styled placeholder if none has been uploaded yet) instead of a
 * category icon. Clicking anywhere on the card — or the explicit
 * "View Screenshots" affordance — opens ProjectModal.vue with the
 * full 3-image gallery. `selectedProject` is the only piece of state
 * driving that: null = closed, a project object = open.
 */
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '../data/portfolio.js'
import { useScrollReveal } from '../composables/useScrollReveal.js'
import ProjectModal from './ProjectModal.vue'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref(null)
useScrollReveal(sectionRef, '.reveal-item', { stagger: 0.1 })

const prefersReducedMotion =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Clip-path wipe on each thumbnail, independent of the card's own
// fade/slide reveal above — this is what makes the image itself feel
// like it's being "revealed" rather than just fading into place.
onMounted(() => {
  if (!sectionRef.value || prefersReducedMotion) return
  const thumbs = sectionRef.value.querySelectorAll('.project-thumb')
  if (!thumbs.length) return

  gsap.set(thumbs, { clipPath: 'inset(0 0 0 100%)' })
  ScrollTrigger.batch(thumbs, {
    start: 'top 85%',
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, {
        clipPath: 'inset(0 0 0 0%)',
        duration: 0.9,
        ease: 'power3.inOut',
        stagger: 0.12
      })
  })
})

const selectedProject = ref(null)

function openProject(project) {
  selectedProject.value = project
}
function closeProject() {
  selectedProject.value = null
}

// Micro-hover for the repo/live icon buttons — GSAP-driven per the brief
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

      <!-- Single column on mobile, balanced 2-col grid from md -->
      <div class="grid md:grid-cols-2 gap-6">
        <article
          v-for="project in projects"
          :key="project.name"
          class="reveal-item card-surface overflow-hidden flex flex-col transition-all duration-300
                 hover:border-accent/30 hover:-translate-y-1 cursor-pointer group"
          @click="openProject(project)"
        >
          <!-- Thumbnail — .project-thumb is targeted by the clip-path reveal above -->
          <div class="project-thumb relative aspect-video bg-steel-dark overflow-hidden">
            <img
              v-if="project.images[0]"
              :src="project.images[0]"
              :alt="`${project.name} preview`"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div v-else class="w-full h-full flex items-center justify-center bg-gradient-to-br from-steel-light to-steel-dark">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="text-accent/40">
                <rect x="3" y="4" width="18" height="16" rx="2" />
                <circle cx="8.5" cy="9.5" r="1.5" />
                <path d="M21 15l-5-5-9 9" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>

            <!-- Hover overlay hinting the gallery is clickable -->
            <div class="absolute inset-0 bg-midnight/0 group-hover:bg-midnight/50 transition-colors duration-300
                        flex items-center justify-center">
              <span
                class="opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0
                       transition-all duration-300 text-xs font-mono tracking-wide text-ink
                       bg-midnight/80 border border-accent/30 px-3 py-1.5 rounded-full"
              >
                View screenshots
              </span>
            </div>

            <!-- Live/repo icon buttons, kept out of the click-to-open zone -->
            <div class="absolute top-3 right-3 flex items-center gap-2" @click.stop>
              <a
                :href="project.links.live"
                target="_blank"
                rel="noopener noreferrer"
                class="w-8 h-8 rounded-lg bg-midnight/70 backdrop-blur flex items-center justify-center text-ink-muted hover:text-accent transition-colors duration-300"
                aria-label="View live site"
                @pointerenter="hoverIn"
                @pointerleave="hoverOut"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M14 5h5v5M19 5l-9 9M6 5H5v14h14v-1" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </a>
              <a
                :href="project.links.repo"
                target="_blank"
                rel="noopener noreferrer"
                class="w-8 h-8 rounded-lg bg-midnight/70 backdrop-blur flex items-center justify-center text-ink-muted hover:text-accent transition-colors duration-300"
                aria-label="View repository"
                @pointerenter="hoverIn"
                @pointerleave="hoverOut"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                  <path
                    d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.4c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 00-1.3-3.2 4.2 4.2 0 00-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 00-6.2 0C7.1 4 6 4.3 6 4.3a4.2 4.2 0 00-.1 3.2A4.6 4.6 0 004.6 10.7c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V22"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </a>
            </div>
          </div>

          <!-- Copy -->
          <div class="p-7 flex flex-col flex-1">
            <h3 class="text-lg font-display font-semibold text-ink mb-2">{{ project.name }}</h3>
            <p class="text-sm text-ink-muted leading-relaxed mb-5 flex-1">{{ project.description }}</p>
            <div class="flex flex-wrap gap-2">
              <span v-for="tech in project.stack" :key="tech" class="tag-badge">{{ tech }}</span>
            </div>
          </div>
        </article>
      </div>
    </div>

    <ProjectModal :project="selectedProject" @close="closeProject" />
  </section>
</template>
