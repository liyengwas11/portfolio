# Liyengwas — Portfolio

Production-ready personal portfolio built with **Vue 3 (Composition API)**,
**GSAP + ScrollTrigger**, and **Tailwind CSS**.

## Quick start

```bash
npm install
npm run dev       # local dev server at http://localhost:5173
npm run build      # production build -> dist/
npm run preview    # preview the production build locally
```

## Project structure

```
src/
  data/portfolio.js       # ← EDIT THIS to change all site content
  composables/
    useScrollReveal.js    # reusable GSAP ScrollTrigger reveal helper
  components/
    Navbar.vue             # sticky nav + mobile hamburger drawer
    Hero.vue                # sequential load timeline + portrait
    Skills.vue               # skills matrix grid
    Timeline.vue              # career timeline
    Projects.vue               # project showcase grid
    Footer.vue                  # philosophy quote + socials
  App.vue
  main.js
  style.css                # Tailwind layers + shared utility classes
tailwind.config.js         # palette, fonts, shadows — theme lives here
```

## Customizing content

Everything text-based (name, bio, skills, timeline entries, projects,
social links, email) lives in **`src/data/portfolio.js`**. Fields marked
`// EDIT ME` are placeholders — fill in real URLs, dates, and contact
details before deploying.

## Swapping in your real photo

In `src/components/Hero.vue`, find the block commented
`STRUCTURAL PLACEHOLDER` and replace the placeholder `<div>` with:

```html
<img src="/my-photo.jpg" alt="Portrait of Liyengwas" class="w-full h-full object-cover" />
```

Drop `my-photo.jpg` into the `public/` folder (create it if it doesn't
exist) — the frame's aspect ratio and rounding are already set up to
contain any image cleanly.

## Animation notes

- **Page load**: `Hero.vue` runs a single GSAP timeline that sequences
  the badge → headline → subtext → CTAs → portrait. `Navbar.vue` animates
  independently on mount, slightly ahead of the Hero timeline.
- **Scroll reveals**: `useScrollReveal.js` wraps `ScrollTrigger.batch()`
  and is reused by Skills, Timeline, Projects, and Footer — just add the
  `reveal-item` class to any element you want to animate in on scroll.
- **Reduced motion**: both the composable and the Hero timeline check
  `prefers-reduced-motion` and skip animation (content is simply shown)
  when the user has that OS-level preference set.

## Deploying

The build output in `dist/` is static — deploy it to Vercel, Netlify,
GitHub Pages, or any static host. No server-side code is involved.
