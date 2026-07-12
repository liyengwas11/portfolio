/**
 * ────────────────────────────────────────────────────────────────
 * SINGLE SOURCE OF TRUTH FOR PORTFOLIO CONTENT
 * ────────────────────────────────────────────────────────────────
 * Every section in the app reads from this file. To customize the
 * site (swap projects, update your bio, add a job) — edit here only.
 * No component template should ever hardcode copy.
 *
 * Fields marked "EDIT ME" are placeholders you should fill in with
 * exact details (links, dates, contact info) before deploying.
 */

export const profile = {
  name: 'Liyengwas',
  role: 'Senior Full-Stack Developer & Founder',
  location: 'Nairobi, Kenya',
  tagline: 'Building payment-grade platforms for the East African market.',
  summary:
    'Senior full-stack developer and founder specializing in Laravel, Vue.js, Inertia.js, Flutter, and MySQL. I design and ship production platforms end-to-end — from M-Pesa Daraja and multi-channel African payment integrations to mobile apps and admin dashboards — for clients and my own ventures across Kenya.',
  availability: 'Available for select freelance & consulting engagements',
  email: 'hello@example.com', // EDIT ME
  socials: {
    github: 'https://github.com/yourhandle', // EDIT ME
    linkedin: 'https://linkedin.com/in/yourhandle', // EDIT ME
    twitter: 'https://x.com/yourhandle' // EDIT ME
  },
  resumeUrl: '#' // EDIT ME — link to a hosted PDF resume
}

export const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#timeline' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#footer' }
]

/**
 * Skills grouped into categories. Each category renders as its own
 * card in the Skills Matrix grid (see components/Skills.vue).
 */
export const skillCategories = [
  {
    title: 'Languages & Frameworks',
    icon: 'code',
    skills: ['PHP', 'Laravel', 'Vue.js 3', 'Inertia.js', 'Flutter', 'Dart', 'JavaScript (ES6+)', 'TypeScript', 'Tailwind CSS']
  },
  {
    title: 'DevOps & Cloud',
    icon: 'cloud',
    skills: ['Linux / XAMPP', 'CI/CD Pipelines', 'Nginx', 'Git & GitHub', 'DigitalOcean', 'Docker (basics)']
  },
  {
    title: 'Database & Schema Design',
    icon: 'database',
    skills: ['MySQL', 'Eloquent ORM', 'Query Optimization', 'Polymorphic Relations', 'UUID Architecture']
  },
  {
    title: 'Enterprise & Payment Integrations',
    icon: 'link',
    skills: ['M-Pesa Daraja API', 'STK Push', 'Airtel Money', 'T-Kash', 'USSD Gateways', 'Card & Bank EFT', 'REST API Design', 'OAuth / Laravel Passport']
  }
]

/**
 * Career / engagement timeline, most recent first.
 * `bullets` are the accomplishment list shown under each entry.
 * EDIT ME: confirm exact date ranges before publishing.
 */
export const timeline = [
  {
    date: '2024 — Present',
    title: 'Founder & Lead Engineer',
    org: 'Independent Practice — Nairobi, Kenya',
    bullets: [
      'Architected a multi-channel Laravel payment gateway spanning M-Pesa STK Push, Airtel Money, T-Kash, USSD, cards, and bank EFT with a 7-day rolling payout cycle.',
      'Founded SheFixes, a women-led home services platform, designing the Flutter mobile app, Laravel API, and Vue/Inertia admin dashboard across a 5-phase, 24-week build.',
      'Built MajiChic Couture, a WooCommerce fashion storefront, handling product taxonomy, SEO architecture, and category strategy end-to-end.'
    ]
  },
  {
    date: '2022 — 2024',
    title: 'Senior Full-Stack Consultant',
    org: 'Freelance — Kenyan SME & Fintech Clients',
    bullets: [
      'Delivered full UX/e-commerce audits and technical SEO implementations (JSON-LD, sitemaps, reusable SEO components) for Laravel/Inertia/Vue storefronts.',
      'Led a brand and technical redesign for Crescent Sacco, a Shariah-compliant financial cooperative, including critical permalink and routing fixes.',
      'Resolved production-grade Laravel issues spanning Spatie Media Library, Eloquent query chains, and Passport OAuth grant configuration.'
    ]
  },
  {
    date: '2020 — 2022',
    title: 'Full-Stack Developer',
    org: 'Contract Engineering — Field Service & Logistics',
    bullets: [
      'Built a geofenced field service application using the Haversine formula for real-time technician distance calculations.',
      'Implemented reactive, persistent UI components (Vuexy-based dashboards) with localStorage-backed state.',
      'Developed Mkulima Mfalme, an agri-focused platform, as part of an early full-stack product portfolio.'
    ]
  }
]

/**
 * Featured project showcase. `icon` maps to a small inline SVG
 * in components/Projects.vue — swap freely.
 */
export const projects = [
  {
    name: 'Zazu Deliveries',
    icon: 'truck',
    description:
      'A delivery logistics platform focused on real-time dispatch and tracking, built for reliability across the East African last-mile delivery context.', // EDIT ME — refine description
    stack: ['Laravel', 'Vue.js', 'MySQL'],
    links: {
      live: '#', // EDIT ME
      repo: '#' // EDIT ME
    }
  },
  {
    name: 'Zazu Fieldsales',
    icon: 'truck',
    description:
      'A delivery logistics platform focused on real-time dispatch and tracking, built for reliability across the East African last-mile delivery context.', // EDIT ME — refine description
    stack: ['Laravel', 'Vue.js', 'MySQL'],
    links: {
      live: '#', // EDIT ME
      repo: '#' // EDIT ME
    }
  },
  {
    name: 'Zazu Wholesale',
    icon: 'truck',
    description:
      'A delivery logistics platform focused on real-time dispatch and tracking, built for reliability across the East African last-mile delivery context.', // EDIT ME — refine description
    stack: ['Laravel', 'Vue.js', 'MySQL'],
    links: {
      live: '#', // EDIT ME
      repo: '#' // EDIT ME
    }
  },
  {
    name: 'Zazu Hub',
    icon: 'truck',
    description:
      'A delivery logistics platform focused on real-time dispatch and tracking, built for reliability across the East African last-mile delivery context.', // EDIT ME — refine description
    stack: ['Laravel', 'Vue.js', 'MySQL'],
    links: {
      live: '#', // EDIT ME
      repo: '#' // EDIT ME
    }
  },
  {
    name: 'Zazu Construction',
    icon: 'truck',
    description:
      'A delivery logistics platform focused on real-time dispatch and tracking, built for reliability across the East African last-mile delivery context.', // EDIT ME — refine description
    stack: ['Laravel', 'Vue.js', 'MySQL'],
    links: {
      live: '#', // EDIT ME
      repo: '#' // EDIT ME
    }
  },
  {
    name: 'Zazu Artisans',
    icon: 'truck',
    description:
      'A delivery logistics platform focused on real-time dispatch and tracking, built for reliability across the East African last-mile delivery context.', // EDIT ME — refine description
    stack: ['Laravel', 'Vue.js', 'MySQL'],
    links: {
      live: '#', // EDIT ME
      repo: '#' // EDIT ME
    }
  },
  {
    name: 'Zazu WHMS',
    icon: 'truck',
    description:
      'A delivery logistics platform focused on real-time dispatch and tracking, built for reliability across the East African last-mile delivery context.', // EDIT ME — refine description
    stack: ['Laravel', 'Vue.js', 'MySQL'],
    links: {
      live: '#', // EDIT ME
      repo: '#' // EDIT ME
    }
  },
  {
    name: 'Glowandhome',
    icon: 'home',
    description:
      'A women-led home services marketplace connecting verified technicians with clients. Features M-Pesa escrow payments, police-vetted onboarding, and a Flutter mobile experience backed by a Laravel API.',
    stack: ['Flutter', 'Laravel', 'MySQL', 'Vue.js', 'M-Pesa Daraja'],
    links: {
      live: '#', // EDIT ME
      repo: '#' // EDIT ME
    }
  },
  {
    name: 'MajiChic Couture',
    icon: 'shirt',
    description:
      'A fashion e-commerce storefront for the Kenyan market covering swimwear, resortwear, sleepwear, and accessories, with SEO-optimized taxonomy and a streamlined WooCommerce build.',
    stack: ['WooCommerce', 'WordPress', 'Rank Math', 'SEO'],
    links: {
      live: '#', // EDIT ME
      repo: '#' // EDIT ME
    }
  },
  {
    name: 'Tonny Green Solutions',
    icon: 'card',
    description:
      'A unified Laravel payment gateway abstracting M-Pesa, Airtel Money, T-Kash, USSD, cards, and bank EFT behind a shared driver contract, with integer-cent storage and UUID-based ledgering.',
    stack: ['Laravel', 'MySQL', 'M-Pesa API', 'REST'],
    links: {
      live: '#', // EDIT ME
      repo: '#' // EDIT ME
    }
  },
  {
    name: 'STMS',
    icon: 'grid',
    description:
      'A structured service/technician management system built to coordinate scheduling, verification, and workflow tracking across distributed field teams.', // EDIT ME — refine description
    stack: ['Laravel', 'Vue.js', 'Inertia.js', 'MySQL'],
    links: {
      live: '#', // EDIT ME
      repo: '#' // EDIT ME
    }
  },
  {
    name: 'Mkulima Mfalme',
    icon: 'leaf',
    description:
      'An agriculture-focused platform connecting farmers with buyers and resources, part of an early full-stack product portfolio.', // EDIT ME — refine description
    stack: ['Laravel', 'Vue.js', 'MySQL'],
    links: {
      live: '#', // EDIT ME
      repo: '#' // EDIT ME
    }
  }
]

export const philosophy =
  '"Software for the East African market has to earn trust in the payment flow first — everything else is downstream of that."'
