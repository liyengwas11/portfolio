<script setup>
/**
 * ProjectModal.vue
 * ────────────────────────────────────────────────────────────────
 * Controlled by the parent (Projects.vue) via a `project` prop —
 * when it's non-null the modal is shown. Vue's <Transition> with
 * JS hooks (@enter/@leave) is used instead of CSS classes so GSAP
 * can drive the animation and reliably signal completion via `done()`.
 *
 * Gallery: up to 3 images per project. Empty strings in
 * `project.images` render the same "swap me" placeholder pattern
 * used in the Hero portrait, so the layout looks intentional even
 * before real screenshots are uploaded.
 */
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import gsap from 'gsap'

const props = defineProps({
  project: { type: Object, default: null }
})
const emit = defineEmits(['close'])

const activeIndex = ref(0)
const mainImageRef = ref(null)

// Reset to the first screenshot whenever a new project is opened
watch(
  () => props.project,
  () => {
    activeIndex.value = 0
  }
)

function go(index) {
  if (!props.project) return
  const total = props.project.images.length
  const next = (index + total) % total
  if (next === activeIndex.value) return
  activeIndex.value = next
  // Quick cross-fade + slight slide whenever the active screenshot changes
  if (mainImageRef.value) {
    gsap.fromTo(
      mainImageRef.value,
      { opacity: 0, x: 12 },
      { opacity: 1, x: 0, duration: 0.35, ease: 'power2.out' }
    )
  }
}

function next() {
  go(activeIndex.value + 1)
}
function prev() {
  go(activeIndex.value - 1)
}

function onKeydown(e) {
  if (!props.project) return
  if (e.key === 'Escape') emit('close')
  if (e.key === 'ArrowRight') next()
  if (e.key === 'ArrowLeft') prev()
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown))

/* ── Transition hooks: backdrop fades, panel scales up from center ── */
function onEnter(el, done) {
  const backdrop = el.querySelector('[data-modal-backdrop]')
  const panel = el.querySelector('[data-modal-panel]')
  gsap
    .timeline({ onComplete: done })
    .fromTo(backdrop, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: 'power1.out' })
    .fromTo(
      panel,
      { opacity: 0, scale: 0.92, y: 24 },
      { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'back.out(1.6)' },
      '-=0.15'
    )
}

function onLeave(el, done) {
  const backdrop = el.querySelector('[data-modal-backdrop]')
  const panel = el.querySelector('[data-modal-panel]')
  gsap
    .timeline({ onComplete: done })
    .to(panel, { opacity: 0, scale: 0.95, y: 12, duration: 0.25, ease: 'power2.in' })
    .to(backdrop, { opacity: 0, duration: 0.2, ease: 'power1.in' }, '-=0.15')
}
</script>

<template>
  <Transition :css="false" @enter="onEnter" @leave="onLeave">
    <div v-if="project" class="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-8">
      <!-- Backdrop -->
      <div
        data-modal-backdrop
        class="absolute inset-0 bg-midnight/90 backdrop-blur-sm"
        @click="emit('close')"
      />

      <!-- Panel -->
      <div
        data-modal-panel
        role="dialog"
        aria-modal="true"
        :aria-label="`${project.name} screenshots`"
        class="relative w-full max-w-3xl card-surface border-accent/20 overflow-hidden shadow-glow"
      >
        <button
          type="button"
          class="absolute top-4 right-4 z-10 w-9 h-9 rounded-lg bg-midnight/70 backdrop-blur flex items-center
                 justify-center text-ink-muted hover:text-accent transition-colors duration-300"
          aria-label="Close"
          @click="emit('close')"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M6 6l12 12M18 6L6 18" stroke-linecap="round" />
          </svg>
        </button>

        <!-- Main image stage -->
        <div class="relative aspect-video bg-steel-dark">
          <div ref="mainImageRef" class="absolute inset-0">
            <img
              v-if="project.images[activeIndex]"
              :src="project.images[activeIndex]"
              :alt="`${project.name} screenshot ${activeIndex + 1}`"
              class="w-full h-full object-cover"
            />
            <!-- Placeholder — same swap-friendly pattern as the Hero portrait -->
            <div v-else class="w-full h-full flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-steel-light to-steel-dark">
              <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="text-accent/40">
                <rect x="3" y="4" width="18" height="16" rx="2" />
                <circle cx="8.5" cy="9.5" r="1.5" />
                <path d="M21 15l-5-5-9 9" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <span class="text-xs font-mono text-ink-faint">
                Screenshot {{ activeIndex + 1 }} — add to project.images in portfolio.js
              </span>
            </div>
          </div>

          <!-- Prev / next arrows -->
          <button
            v-if="project.images.length > 1"
            type="button"
            class="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-midnight/70 backdrop-blur
                   flex items-center justify-center text-ink hover:text-accent hover:scale-110 transition-all duration-300"
            aria-label="Previous screenshot"
            @click="prev"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <path d="M15 6l-6 6 6 6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
          <button
            v-if="project.images.length > 1"
            type="button"
            class="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-midnight/70 backdrop-blur
                   flex items-center justify-center text-ink hover:text-accent hover:scale-110 transition-all duration-300"
            aria-label="Next screenshot"
            @click="next"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <path d="M9 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
        </div>

        <!-- Thumbnail strip + project info -->
        <div class="p-6">
          <div class="flex items-center gap-2 mb-5">
            <button
              v-for="(img, i) in project.images"
              :key="i"
              type="button"
              class="w-14 h-9 rounded-md overflow-hidden border-2 transition-all duration-300"
              :class="i === activeIndex ? 'border-accent' : 'border-white/10 opacity-60 hover:opacity-100'"
              :aria-label="`Show screenshot ${i + 1}`"
              @click="go(i)"
            >
              <img v-if="img" :src="img" class="w-full h-full object-cover" :alt="`Thumbnail ${i + 1}`" />
              <div v-else class="w-full h-full bg-steel-dark flex items-center justify-center">
                <span class="text-[9px] font-mono text-ink-faint">{{ i + 1 }}</span>
              </div>
            </button>
          </div>

          <h3 class="text-xl font-display font-semibold text-ink mb-2">{{ project.name }}</h3>
          <p class="text-sm text-ink-muted leading-relaxed mb-4">{{ project.description }}</p>

          <div class="flex flex-wrap gap-2 mb-5">
            <span v-for="tech in project.stack" :key="tech" class="tag-badge">{{ tech }}</span>
          </div>

          <div class="flex gap-3">
            <a :href="project.links.live" target="_blank" rel="noopener noreferrer" class="btn-primary !py-2 !px-5 text-sm">
              Live Site
            </a>
            <a :href="project.links.repo" target="_blank" rel="noopener noreferrer" class="btn-ghost !py-2 !px-5 text-sm">
              Repository
            </a>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>
