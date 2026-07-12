<script setup>
/**
 * Contact.vue
 * ────────────────────────────────────────────────────────────────
 * Static sites can't run their own mail server, so this form POSTs
 * to Formspree (https://formspree.io) — a free service that forwards
 * submissions straight to an email inbox you choose. No backend code
 * needed on your side.
 *
 * Setup (2 minutes):
 *   1. Create a free account at formspree.io
 *   2. Create a new form, pointed at whatever email should receive
 *      submissions
 *   3. Copy the endpoint it gives you (looks like
 *      https://formspree.io/f/abcdwxyz) into `formEndpoint` in
 *      src/data/portfolio.js
 *
 * Prefer EmailJS instead? Swap the fetch() call below for the
 * EmailJS SDK's emailjs.send() — the rest of the component (state,
 * validation, animations) stays the same either way.
 */
import { ref } from 'vue'
import gsap from 'gsap'
import { profile } from '../data/portfolio.js'
import { useScrollReveal } from '../composables/useScrollReveal.js'

const sectionRef = ref(null)
useScrollReveal(sectionRef, '.reveal-item', { stagger: 0.12 })

const form = ref({ name: '', email: '', message: '' })
// idle | sending | success | error
const status = ref('idle')
const feedbackRef = ref(null)

async function handleSubmit() {
  status.value = 'sending'

  const isPlaceholder = profile.formEndpoint.includes('YOUR_FORM_ID')
  if (isPlaceholder) {
    // Dev-time guard so the form doesn't fail silently before setup.
    console.warn(
      '[Contact.vue] formEndpoint is still the placeholder — set a real Formspree endpoint in src/data/portfolio.js'
    )
    status.value = 'error'
    animateFeedback()
    return
  }

  try {
    const res = await fetch(profile.formEndpoint, {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value)
    })

    if (res.ok) {
      status.value = 'success'
      form.value = { name: '', email: '', message: '' }
    } else {
      status.value = 'error'
    }
  } catch {
    status.value = 'error'
  }

  animateFeedback()
}

function animateFeedback() {
  requestAnimationFrame(() => {
    if (feedbackRef.value) {
      gsap.fromTo(
        feedbackRef.value,
        { opacity: 0, y: -8 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
      )
    }
  })
}
</script>

<template>
  <section id="contact" ref="sectionRef" class="py-24 px-6 sm:px-8">
    <div class="max-w-2xl mx-auto">
      <div class="reveal-item text-center mb-12">
        <span class="eyebrow">Get In Touch</span>
        <h2 class="section-heading">Let's build something together</h2>
        <p class="text-ink-muted mt-4">
          Have a project in mind, or just want to talk shop about M-Pesa integrations? Drop a message below.
        </p>
      </div>

      <form class="reveal-item card-surface p-7 sm:p-10 space-y-5" @submit.prevent="handleSubmit">
        <div class="grid sm:grid-cols-2 gap-5">
          <div>
            <label for="contact-name" class="block text-sm text-ink-muted mb-2">Name</label>
            <input
              id="contact-name"
              v-model="form.name"
              type="text"
              required
              placeholder="Your name"
              class="w-full bg-midnight border border-white/10 rounded-lg px-4 py-3 text-ink text-sm
                     placeholder:text-ink-faint focus:border-accent focus:outline-none transition-colors duration-300"
            />
          </div>
          <div>
            <label for="contact-email" class="block text-sm text-ink-muted mb-2">Email</label>
            <input
              id="contact-email"
              v-model="form.email"
              type="email"
              required
              placeholder="you@example.com"
              class="w-full bg-midnight border border-white/10 rounded-lg px-4 py-3 text-ink text-sm
                     placeholder:text-ink-faint focus:border-accent focus:outline-none transition-colors duration-300"
            />
          </div>
        </div>

        <div>
          <label for="contact-message" class="block text-sm text-ink-muted mb-2">Message</label>
          <textarea
            id="contact-message"
            v-model="form.message"
            required
            rows="5"
            placeholder="Tell me a bit about what you're building..."
            class="w-full bg-midnight border border-white/10 rounded-lg px-4 py-3 text-ink text-sm resize-none
                   placeholder:text-ink-faint focus:border-accent focus:outline-none transition-colors duration-300"
          />
        </div>

        <button type="submit" class="btn-primary w-full justify-center" :disabled="status === 'sending'" v-magnetic="{ strength: 0.15 }">
          <span v-if="status === 'sending'">Sending…</span>
          <span v-else>Send Message</span>
        </button>

        <!-- Feedback states -->
        <p
          v-if="status === 'success'"
          ref="feedbackRef"
          class="flex items-center gap-2 text-sm text-accent-soft"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M5 12l5 5L20 7" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          Thanks — your message is on its way. I'll get back to you soon.
        </p>
        <p
          v-else-if="status === 'error'"
          ref="feedbackRef"
          class="text-sm text-red-400"
        >
          Something went wrong sending that. Please email me directly at
          <a :href="`mailto:${profile.email}`" class="underline hover:text-accent">{{ profile.email }}</a>.
        </p>
      </form>
    </div>
  </section>
</template>
