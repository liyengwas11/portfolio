<script setup>
/**
 * App.vue is a thin composition shell — it owns no animation logic
 * itself. Each section component is self-contained: it fetches its
 * own slice of data from src/data/portfolio.js and manages its own
 * GSAP timeline / ScrollTrigger instances.
 */
import Navbar from './components/Navbar.vue'
import Hero from './components/Hero.vue'
import Skills from './components/Skills.vue'
import Timeline from './components/Timeline.vue'
import Projects from './components/Projects.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <div class="min-h-screen bg-midnight selection:bg-accent/30 overflow-x-hidden">
    <!-- Ambient background grid, purely decorative, behind all content -->
    <div
      class="fixed inset-0 -z-10 opacity-[0.07]"
      style="background-image: linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px); background-size: 48px 48px;"
      aria-hidden="true"
    />

    <Navbar />
    <main>
      <Hero />
      <Skills />
      <Timeline />
      <Projects />
    </main>
    <Footer />
  </div>
</template>
