# Portafolio Carlos Sierra Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a single-page Astro + Tailwind portfolio site for Carlos Sierra with real project case studies backed by his actual PDFs, in an ASRV-inspired dark/technical style.

**Architecture:** A static Astro site with one page (`src/pages/index.astro`) composed of section components (`Marquee`, `Hero`, `Work`, `Disciplines`, `Profile`, `Contact`, `Footer`), all reading from two typed data modules (`src/data/projects.ts`, `src/data/profile.ts`). The 8 source PDFs are copied into `public/docs/`, and a cover thumbnail is generated for each of the 4 projects into `public/images/`. No backend, no CMS.

**Tech Stack:** Astro (minimal template, TypeScript strict), Tailwind CSS v3 via `@astrojs/tailwind`, Vitest for data/asset validation, macOS `qlmanage` for PDF thumbnail generation.

**Spec:** `docs/superpowers/specs/2026-09-20-portafolio-carlos-sierra-design.md`

## Global Constraints

- Palette (exact hex, dark theme only — no light mode in v1): `bg #0B0C0E`, `surface #141619`, `fg #F3F4F6`, `muted #8B9096`, `line #24272C`, `accent #2E6BFF`.
- Typography: headings in Space Grotesk, body in Inter, loaded from Google Fonts with `display=swap`.
- Stack: Astro + Tailwind CSS, no backend, no CMS.
- PDF display pattern: cover thumbnail (first page of the PDF) + a "Ver PDF completo ↗" link that opens the original PDF in a new tab. No embedded iframes, no full-page image galleries.
- Contact LinkedIn is a placeholder (`#`) until Carlos provides the real link.
- Respect `prefers-reduced-motion` (disable/shorten animations).
- Every page must ship `<title>`, meta description, and Open Graph tags.
- Mobile-first responsive layout.

---

### Task 1: Project scaffold, Tailwind, design tokens, base Layout

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json` (via CLI scaffold)
- Create: `tailwind.config.mjs`
- Create: `src/styles/global.css`
- Create: `src/layouts/Layout.astro`
- Create: `src/pages/index.astro` (placeholder)

**Interfaces:**
- Produces: `Layout.astro` accepting `Props { title: string; description: string }`, rendering `<slot />` inside `<body class="bg-bg text-fg font-sans antialiased">`. Later tasks import this as `import Layout from '../layouts/Layout.astro'`.
- Produces: Tailwind theme colors `bg`, `surface`, `fg`, `muted`, `line`, `accent` and font families `font-sans` (Inter), `font-display` (Space Grotesk), usable as Tailwind utility classes in every later component.

- [ ] **Step 1: Scaffold the Astro project**

```bash
cd ~/Desktop/portafolio-carlos-sierra
npm create astro@latest . -- --template minimal --typescript strict --install --no-git
```

If the CLI prompts interactively instead of honoring the flags, answer exactly: template "Empty" (minimal), TypeScript "Strict", install dependencies "Yes", initialize a new git repository "No" (one already exists here).

- [ ] **Step 2: Add the Tailwind integration**

```bash
npx astro add tailwind -y
```

Open the generated `astro.config.mjs` and make sure it disables Tailwind's auto-injected base styles (we provide our own `global.css`):

```js
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind({ applyBaseStyles: false })],
});
```

- [ ] **Step 3: Write the design tokens**

Replace the generated `tailwind.config.mjs` with:

```js
import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        bg: '#0B0C0E',
        surface: '#141619',
        fg: '#F3F4F6',
        muted: '#8B9096',
        line: '#24272C',
        accent: '#2E6BFF',
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        display: ['"Space Grotesk"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
```

Create `src/styles/global.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }
}

:focus-visible {
  outline: 2px solid #2E6BFF;
  outline-offset: 2px;
}
```

- [ ] **Step 4: Write the base Layout**

Create `src/layouts/Layout.astro`:

```astro
---
import '../styles/global.css';

export interface Props {
  title: string;
  description: string;
}
const { title, description } = Astro.props;
---
<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta property="og:type" content="website" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap"
      rel="stylesheet"
    />
  </head>
  <body class="bg-bg text-fg font-sans antialiased">
    <slot />
  </body>
</html>
```

- [ ] **Step 5: Write the placeholder page**

Replace `src/pages/index.astro` with:

```astro
---
import Layout from '../layouts/Layout.astro';
---
<Layout
  title="Carlos Sierra — Marketing & Growth"
  description="Portafolio de Carlos Sierra: growth marketing, contenido y gestión de marca. Casos reales de ZEIFIR, Vintage y más."
>
  <main class="mx-auto max-w-5xl px-6 py-24">
    <p>Portafolio en construcción.</p>
  </main>
</Layout>
```

- [ ] **Step 6: Verify the build**

```bash
npm run build
grep -q "Carlos Sierra — Marketing &amp; Growth" dist/index.html && grep -q "Portafolio en construcción" dist/index.html && echo "BUILD OK"
```

Expected output: `BUILD OK`. If the title grep fails, check whether Astro escaped the `&` differently and match what `dist/index.html` actually contains.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "Scaffold Astro + Tailwind with design tokens and base layout"
```

---

### Task 2: Copy source PDFs and generate project cover thumbnails

**Files:**
- Create: `tests/assets.test.ts`
- Create: `public/docs/zeifir-catalogo.pdf`, `public/docs/zeifir-contenido-tiktok.pdf`, `public/docs/zeifir-posts-productos.pdf`, `public/docs/vintage-plan-de-negocio.pdf`, `public/docs/vintage-carta.pdf`, `public/docs/estrategia-comercial-barrington.pdf`, `public/docs/gringos-reclutamiento.pdf`, `public/docs/marca-personal-contenido.pdf`
- Create: `public/images/prj-01-cover.png`, `public/images/prj-02-cover.png`, `public/images/prj-03-cover.png`, `public/images/prj-04-cover.png`

**Interfaces:**
- Produces: the exact public paths `/docs/<file>.pdf` and `/images/prj-0X-cover.png` listed above — Task 3's data files reference these paths verbatim.

- [ ] **Step 1: Install Vitest**

```bash
npm install -D vitest
```

Add to `package.json` `"scripts"`:

```json
"test": "vitest run"
```

- [ ] **Step 2: Write the failing asset-existence test**

Create `tests/assets.test.ts`:

```ts
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const root = process.cwd();

const expectedDocs = [
  'zeifir-catalogo.pdf',
  'zeifir-contenido-tiktok.pdf',
  'zeifir-posts-productos.pdf',
  'vintage-plan-de-negocio.pdf',
  'vintage-carta.pdf',
  'estrategia-comercial-barrington.pdf',
  'gringos-reclutamiento.pdf',
  'marca-personal-contenido.pdf',
];

const expectedCovers = [
  'prj-01-cover.png',
  'prj-02-cover.png',
  'prj-03-cover.png',
  'prj-04-cover.png',
];

describe('portfolio assets', () => {
  it.each(expectedDocs)('public/docs/%s exists', (file) => {
    expect(existsSync(join(root, 'public/docs', file))).toBe(true);
  });

  it.each(expectedCovers)('public/images/%s exists', (file) => {
    expect(existsSync(join(root, 'public/images', file))).toBe(true);
  });
});
```

- [ ] **Step 3: Run the test to verify it fails**

```bash
npx vitest run tests/assets.test.ts
```

Expected: 12 failing assertions (none of the files exist yet).

- [ ] **Step 4: Copy the source PDFs**

```bash
cd ~/Desktop/portafolio-carlos-sierra
mkdir -p public/docs public/images

cp ~/Downloads/ZEIFIR_Catalogo.pdf public/docs/zeifir-catalogo.pdf
cp ~/Downloads/videos_ZEIFIR.pdf public/docs/zeifir-contenido-tiktok.pdf
cp ~/Downloads/Posts_Productos.pdf public/docs/zeifir-posts-productos.pdf
cp ~/Downloads/Vintage.pdf public/docs/vintage-plan-de-negocio.pdf
cp ~/Downloads/Carta_Vintage.pdf public/docs/vintage-carta.pdf
cp ~/Downloads/Estrategia_Fontenla.pdf public/docs/estrategia-comercial-barrington.pdf
cp ~/Downloads/"GIC_Banner_vaga_Peru_logo_Gringos_negro.pdf" public/docs/gringos-reclutamiento.pdf
cp ~/Downloads/"Marca Personal - Contenido.pdf" public/docs/marca-personal-contenido.pdf
```

- [ ] **Step 5: Generate the cover thumbnails**

```bash
qlmanage -t -s 1600 -o public/images ~/Downloads/ZEIFIR_Catalogo.pdf
mv "public/images/ZEIFIR_Catalogo.pdf.png" public/images/prj-01-cover.png

qlmanage -t -s 1600 -o public/images ~/Downloads/Vintage.pdf
mv "public/images/Vintage.pdf.png" public/images/prj-02-cover.png

qlmanage -t -s 1600 -o public/images ~/Downloads/Estrategia_Fontenla.pdf
mv "public/images/Estrategia_Fontenla.pdf.png" public/images/prj-03-cover.png

qlmanage -t -s 1600 -o public/images ~/Downloads/"GIC_Banner_vaga_Peru_logo_Gringos_negro.pdf"
mv "public/images/GIC_Banner_vaga_Peru_logo_Gringos_negro.pdf.png" public/images/prj-04-cover.png
```

- [ ] **Step 6: Run the test to verify it passes**

```bash
npx vitest run tests/assets.test.ts
```

Expected: 12/12 passing.

- [ ] **Step 7: Commit**

```bash
git add public/docs public/images tests package.json package-lock.json
git commit -m "Add source PDFs and generated project cover thumbnails"
```

---

### Task 3: Content data modules (profile, projects) with validation tests

**Files:**
- Create: `src/data/projects.ts`
- Create: `src/data/profile.ts`
- Create: `src/data/content.test.ts`

**Interfaces:**
- Consumes: the exact `/docs/*.pdf` and `/images/prj-0X-cover.png` paths produced by Task 2.
- Produces: `export const projects: Project[]` from `src/data/projects.ts` with shape `{ code, title, year, summary, metric, tags: string[], coverImage, assets: { label, href }[] }`. Produces `export const profile` from `src/data/profile.ts` with shape `{ name, role, location, headline, bio, scoreboard: { value, label }[], disciplines: { title, description }[], ficha: { label, value }[], contentEvidence: { label, href }, contact: { email, phone, linkedin } }`. Later tasks import these exact names and fields.

- [ ] **Step 1: Write the failing content tests**

Create `src/data/content.test.ts`:

```ts
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { projects } from './projects';
import { profile } from './profile';

const publicDir = join(process.cwd(), 'public');

describe('projects data', () => {
  it('has exactly 4 projects with unique codes', () => {
    expect(projects).toHaveLength(4);
    expect(new Set(projects.map((p) => p.code)).size).toBe(4);
  });

  it.each(projects.map((p) => [p.code, p] as const))(
    '%s has required non-empty fields',
    (_code, project) => {
      expect(project.title.length).toBeGreaterThan(0);
      expect(project.summary.length).toBeGreaterThan(0);
      expect(project.metric.length).toBeGreaterThan(0);
      expect(project.tags.length).toBeGreaterThan(0);
      expect(project.assets.length).toBeGreaterThan(0);
    },
  );

  it.each(projects.map((p) => [p.code, p] as const))(
    '%s coverImage and assets resolve to real files',
    (_code, project) => {
      expect(existsSync(join(publicDir, project.coverImage))).toBe(true);
      for (const asset of project.assets) {
        expect(existsSync(join(publicDir, asset.href))).toBe(true);
      }
    },
  );
});

describe('profile data', () => {
  it('has 3 scoreboard metrics and 4 disciplines', () => {
    expect(profile.scoreboard).toHaveLength(3);
    expect(profile.disciplines).toHaveLength(4);
  });

  it('content evidence PDF exists', () => {
    expect(existsSync(join(publicDir, profile.contentEvidence.href))).toBe(true);
  });

  it('has a valid contact email', () => {
    expect(profile.contact.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  });
});
```

- [ ] **Step 2: Run the tests to verify they fail**

```bash
npx vitest run src/data/content.test.ts
```

Expected: FAIL — `Cannot find module './projects'` (files don't exist yet).

- [ ] **Step 3: Write `src/data/projects.ts`**

```ts
export interface ProjectAsset {
  label: string;
  href: string;
}

export interface Project {
  code: string;
  title: string;
  year: string;
  summary: string;
  metric: string;
  tags: string[];
  coverImage: string;
  assets: ProjectAsset[];
}

export const projects: Project[] = [
  {
    code: 'PRJ-01',
    title: 'ZEIFIR — Lanzamiento de marca de perfumería',
    year: '2025',
    summary:
      'Fundación y lanzamiento de una marca de perfumería: pricing, inventarios de importación, calendario de contenido en TikTok y piezas de campaña.',
    metric: '88% margen bruto sostenido',
    tags: ['Estrategia de marca', 'Growth', 'Pricing', 'Contenido'],
    coverImage: '/images/prj-01-cover.png',
    assets: [
      { label: 'Catálogo ZEIFIR', href: '/docs/zeifir-catalogo.pdf' },
      { label: 'Calendario de contenido TikTok', href: '/docs/zeifir-contenido-tiktok.pdf' },
      { label: 'Piezas de campaña', href: '/docs/zeifir-posts-productos.pdf' },
    ],
  },
  {
    code: 'PRJ-02',
    title: 'VINTAGE — Estrategia de marca y carta',
    year: '2026',
    summary:
      'Plan de negocio y posicionamiento premium para una discoteca (NSE A/B, Andahuaylas): estrategia de zonificación de densidad y una carta diseñada con ingeniería de precios.',
    metric: 'Posicionamiento premium NSE A/B',
    tags: ['Posicionamiento', 'Pricing psicológico', 'Menú'],
    coverImage: '/images/prj-02-cover.png',
    assets: [
      { label: 'Plan de negocio', href: '/docs/vintage-plan-de-negocio.pdf' },
      { label: 'Carta de cócteles', href: '/docs/vintage-carta.pdf' },
    ],
  },
  {
    code: 'PRJ-03',
    title: 'Estrategia Comercial — Sastrería Barrington',
    year: '2026',
    summary:
      'Objetivos comerciales y segmentación de clientes para una sastrería: crecimiento en ventas, utilidad neta, ticket promedio y reducción del costo de adquisición.',
    metric: '+30% ventas objetivo · -40% CAC objetivo',
    tags: ['Estrategia comercial', 'Segmentación', 'KPIs'],
    coverImage: '/images/prj-03-cover.png',
    assets: [
      { label: 'Estrategia comercial completa', href: '/docs/estrategia-comercial-barrington.pdf' },
    ],
  },
  {
    code: 'PRJ-04',
    title: 'Gringos Instalações — Pieza de reclutamiento',
    year: '2026',
    summary:
      'Diseño de flyer de convocatoria laboral para una empresa de estructuras metálicas en Brasil.',
    metric: 'Pieza de reclutamiento',
    tags: ['Diseño gráfico', 'Reclutamiento', 'Brand piece'],
    coverImage: '/images/prj-04-cover.png',
    assets: [{ label: 'Flyer de convocatoria', href: '/docs/gringos-reclutamiento.pdf' }],
  },
];
```

- [ ] **Step 4: Write `src/data/profile.ts`**

```ts
export interface ScoreboardMetric {
  value: string;
  label: string;
}

export interface Discipline {
  title: string;
  description: string;
}

export interface FichaItem {
  label: string;
  value: string;
}

export const profile = {
  name: 'Carlos Sierra',
  role: 'Marketing & Growth',
  location: 'Lima, Perú',
  headline: 'Construyo marcas y las hago crecer con datos.',
  bio: 'Egresado de Administración y Negocios del Deporte (UPC). Combina la disciplina del deporte competitivo (selección de atletismo y fútbol) con analítica y creatividad para lanzar marcas, producir contenido y convertirlo en ventas.',
  scoreboard: [
    { value: '+88%', label: 'Margen bruto sostenido (ZEIFIR)' },
    { value: '+95%', label: 'Crecimiento de facturación mensual (HS Europa Sport)' },
    { value: '+25%', label: 'Sobre el récord anual de ventas en 60 días' },
  ] as ScoreboardMetric[],
  disciplines: [
    {
      title: 'Growth marketing',
      description: 'Crecimiento orgánico y contenido para vender sin depender de pauta masiva.',
    },
    {
      title: 'Creación de contenido',
      description: 'Piezas gráficas y audiovisuales con Canva, DaVinci Resolve y CapCut.',
    },
    {
      title: 'Analítica y datos',
      description: 'Métricas e indicadores con modelado financiero en Excel y Power BI.',
    },
    {
      title: 'Gestión de marca',
      description: 'Posicionamiento, propuesta de valor y estructura de precios.',
    },
  ] as Discipline[],
  ficha: [
    { label: 'Formación', value: 'Administración y Negocios del Deporte — UPC' },
    {
      label: 'Especializaciones',
      value: 'Marketing Deportivo · Marketing Estratégico · Analítica Digital',
    },
    { label: 'Herramientas', value: 'Excel · Power BI · Canva · DaVinci Resolve · CapCut' },
    { label: 'Idiomas', value: 'Español · Inglés (avanzado) · Francés (básico)' },
    { label: 'Deporte', value: 'Selección de atletismo UPC · Fútbol distrital' },
  ] as FichaItem[],
  contentEvidence: {
    label: 'Ver seguimiento de contenido',
    href: '/docs/marca-personal-contenido.pdf',
  },
  contact: {
    email: 'jsq2908@gmail.com',
    phone: '963 507 814',
    linkedin: '#',
  },
};
```

- [ ] **Step 5: Run the tests to verify they pass**

```bash
npx vitest run src/data/content.test.ts
```

Expected: all tests PASS.

- [ ] **Step 6: Commit**

```bash
git add src/data
git commit -m "Add profile and project content data with validation tests"
```

---

### Task 4: Marquee + Hero sections

**Files:**
- Create: `src/components/Marquee.astro`
- Create: `src/components/Hero.astro`
- Modify: `tailwind.config.mjs` (add marquee keyframes/animation)
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: `profile` from `../data/profile` (Task 3).
- Produces: `<Marquee />` and `<Hero />` components with no props, used by `index.astro`.

- [ ] **Step 1: Verify the headline is absent (pre-check)**

```bash
npm run build
grep -q "Construyo marcas y las hago crecer con datos" dist/index.html || echo "NOT FOUND (expected before this task)"
```

Expected: `NOT FOUND (expected before this task)`.

- [ ] **Step 2: Add marquee animation to Tailwind config**

In `tailwind.config.mjs`, inside `theme.extend`, add:

```js
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 20s linear infinite',
      },
```

- [ ] **Step 3: Write `src/components/Marquee.astro`**

```astro
---
const phrase = 'MARKETING · GROWTH · CONTENIDO';
---
<div class="overflow-hidden border-y border-line py-2" aria-hidden="true">
  <div class="flex w-max animate-marquee gap-8 whitespace-nowrap font-display text-sm uppercase tracking-widest text-muted motion-reduce:animate-none">
    {Array.from({ length: 8 }).map(() => (
      <span>{phrase}</span>
    ))}
  </div>
</div>
```

- [ ] **Step 4: Write `src/components/Hero.astro`**

```astro
---
import { profile } from '../data/profile';
---
<section class="mx-auto flex max-w-5xl flex-col gap-10 px-6 py-24 md:py-32">
  <div class="flex flex-col gap-4">
    <p class="font-display text-sm uppercase tracking-widest text-accent">
      {profile.role} · {profile.location}
    </p>
    <h1 class="font-display text-4xl font-semibold leading-tight md:text-6xl">{profile.name}</h1>
    <p class="max-w-2xl text-lg text-muted md:text-xl">{profile.headline}</p>
  </div>
  <div class="flex flex-wrap gap-4">
    <a
      href="#trabajo"
      class="rounded-full bg-accent px-6 py-3 font-medium text-fg transition-colors hover:bg-accent/80"
    >
      Ver trabajo
    </a>
    <a
      href="#contacto"
      class="rounded-full border border-line px-6 py-3 font-medium text-fg transition-colors hover:border-accent"
    >
      Contacto
    </a>
  </div>
  <dl class="grid grid-cols-1 gap-6 border-t border-line pt-8 sm:grid-cols-3">
    {profile.scoreboard.map((metric) => (
      <div>
        <dt class="font-display text-3xl font-semibold text-accent">{metric.value}</dt>
        <dd class="mt-1 text-sm text-muted">{metric.label}</dd>
      </div>
    ))}
  </dl>
</section>
```

- [ ] **Step 5: Wire into `src/pages/index.astro`**

```astro
---
import Layout from '../layouts/Layout.astro';
import Marquee from '../components/Marquee.astro';
import Hero from '../components/Hero.astro';
---
<Layout
  title="Carlos Sierra — Marketing & Growth"
  description="Portafolio de Carlos Sierra: growth marketing, contenido y gestión de marca. Casos reales de ZEIFIR, Vintage y más."
>
  <Marquee />
  <Hero />
</Layout>
```

- [ ] **Step 6: Verify the build now contains the hero content**

```bash
npm run build
grep -q "Construyo marcas y las hago crecer con datos" dist/index.html && grep -q "MARKETING · GROWTH · CONTENIDO" dist/index.html && echo "BUILD OK"
```

Expected: `BUILD OK`.

- [ ] **Step 7: Commit**

```bash
git add src/components/Marquee.astro src/components/Hero.astro tailwind.config.mjs src/pages/index.astro
git commit -m "Add marquee and hero sections"
```

---

### Task 5: Work section (project cards)

**Files:**
- Create: `src/components/ProjectCard.astro`
- Create: `src/components/Work.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: `Project` type and `projects` array from `../data/projects` (Task 3).
- Produces: `<Work />` (no props) rendering one `<ProjectCard project={...} />` per project, used by `index.astro`.

- [ ] **Step 1: Verify project codes are absent (pre-check)**

```bash
npm run build
grep -q "PRJ-01" dist/index.html || echo "NOT FOUND (expected before this task)"
```

Expected: `NOT FOUND (expected before this task)`.

- [ ] **Step 2: Write `src/components/ProjectCard.astro`**

```astro
---
import type { Project } from '../data/projects';

interface Props {
  project: Project;
}
const { project } = Astro.props;
---
<article class="group flex flex-col gap-4 border border-line bg-surface p-6">
  <div class="flex items-center justify-between font-display text-xs uppercase tracking-widest text-muted">
    <span>{project.code}</span>
    <span>{project.year}</span>
  </div>
  <img
    src={project.coverImage}
    alt={`Portada de ${project.title}`}
    class="aspect-[4/3] w-full object-cover grayscale transition-all duration-300 group-hover:grayscale-0"
    loading="lazy"
  />
  <h3 class="font-display text-xl font-semibold">{project.title}</h3>
  <p class="text-sm text-muted">{project.summary}</p>
  <p class="font-display text-sm font-medium text-accent">{project.metric}</p>
  <ul class="flex flex-wrap gap-2">
    {project.tags.map((tag) => (
      <li class="rounded-full border border-line px-3 py-1 text-xs text-muted">{tag}</li>
    ))}
  </ul>
  <div class="mt-auto flex flex-wrap gap-3 pt-4">
    {project.assets.map((asset) => (
      <a
        href={asset.href}
        target="_blank"
        rel="noopener noreferrer"
        class="text-sm font-medium text-fg underline decoration-accent decoration-2 underline-offset-4 hover:text-accent"
      >
        {project.assets.length > 1 ? asset.label : 'Ver PDF completo'} ↗
      </a>
    ))}
  </div>
</article>
```

- [ ] **Step 3: Write `src/components/Work.astro`**

```astro
---
import { projects } from '../data/projects';
import ProjectCard from './ProjectCard.astro';
---
<section id="trabajo" class="mx-auto max-w-5xl px-6 py-24">
  <h2 class="font-display text-sm uppercase tracking-widest text-muted">Trabajo</h2>
  <div class="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
    {projects.map((project) => (
      <ProjectCard project={project} />
    ))}
  </div>
</section>
```

- [ ] **Step 4: Wire into `src/pages/index.astro`**

Add the import and element:

```astro
import Work from '../components/Work.astro';
```

```astro
  <Hero />
  <Work />
```

- [ ] **Step 5: Verify the build now contains the projects**

```bash
npm run build
grep -q "PRJ-01" dist/index.html && grep -q "PRJ-04" dist/index.html && grep -q "/docs/zeifir-catalogo.pdf" dist/index.html && echo "BUILD OK"
```

Expected: `BUILD OK`.

- [ ] **Step 6: Commit**

```bash
git add src/components/ProjectCard.astro src/components/Work.astro src/pages/index.astro
git commit -m "Add work section with project cards"
```

---

### Task 6: Disciplines + Profile sections

**Files:**
- Create: `src/components/Disciplines.astro`
- Create: `src/components/Profile.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: `profile` from `../data/profile` (Task 3), specifically `profile.disciplines`, `profile.bio`, `profile.ficha`, `profile.contentEvidence`.
- Produces: `<Disciplines />` and `<Profile />` (no props), used by `index.astro`.

- [ ] **Step 1: Verify discipline content is absent (pre-check)**

```bash
npm run build
grep -q "Growth marketing" dist/index.html || echo "NOT FOUND (expected before this task)"
```

Expected: `NOT FOUND (expected before this task)`.

- [ ] **Step 2: Write `src/components/Disciplines.astro`**

```astro
---
import { profile } from '../data/profile';
---
<section class="mx-auto max-w-5xl px-6 py-24">
  <h2 class="font-display text-sm uppercase tracking-widest text-muted">Lo que hago</h2>
  <div class="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
    {profile.disciplines.map((discipline) => (
      <div class="border-t border-line pt-4">
        <h3 class="font-display text-lg font-semibold">{discipline.title}</h3>
        <p class="mt-2 text-sm text-muted">{discipline.description}</p>
      </div>
    ))}
  </div>
</section>
```

- [ ] **Step 3: Write `src/components/Profile.astro`**

```astro
---
import { profile } from '../data/profile';
---
<section id="perfil" class="mx-auto max-w-5xl px-6 py-24">
  <h2 class="font-display text-sm uppercase tracking-widest text-muted">Perfil</h2>
  <p class="mt-6 max-w-2xl text-lg text-fg">{profile.bio}</p>
  <dl class="mt-10 grid grid-cols-1 gap-6 border-t border-line pt-8 sm:grid-cols-2">
    {profile.ficha.map((item) => (
      <div>
        <dt class="font-display text-xs uppercase tracking-widest text-muted">{item.label}</dt>
        <dd class="mt-1 text-fg">{item.value}</dd>
      </div>
    ))}
  </dl>
  <a
    href={profile.contentEvidence.href}
    target="_blank"
    rel="noopener noreferrer"
    class="mt-8 inline-block text-sm font-medium text-fg underline decoration-accent decoration-2 underline-offset-4 hover:text-accent"
  >
    {profile.contentEvidence.label} ↓
  </a>
</section>
```

- [ ] **Step 4: Wire into `src/pages/index.astro`**

Add the imports and elements:

```astro
import Disciplines from '../components/Disciplines.astro';
import Profile from '../components/Profile.astro';
```

```astro
  <Work />
  <Disciplines />
  <Profile />
```

- [ ] **Step 5: Verify the build now contains disciplines and profile**

```bash
npm run build
grep -q "Growth marketing" dist/index.html && grep -q "Formación" dist/index.html && grep -q "/docs/marca-personal-contenido.pdf" dist/index.html && echo "BUILD OK"
```

Expected: `BUILD OK`.

- [ ] **Step 6: Commit**

```bash
git add src/components/Disciplines.astro src/components/Profile.astro src/pages/index.astro
git commit -m "Add disciplines and profile sections"
```

---

### Task 7: Contact + Footer sections

**Files:**
- Create: `src/components/Contact.astro`
- Create: `src/components/Footer.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: `profile.contact` and `profile.name` from `../data/profile` (Task 3).
- Produces: `<Contact />` and `<Footer />` (no props), used by `index.astro`. This completes the page assembly.

- [ ] **Step 1: Verify contact info is absent (pre-check)**

```bash
npm run build
grep -q "jsq2908@gmail.com" dist/index.html || echo "NOT FOUND (expected before this task)"
```

Expected: `NOT FOUND (expected before this task)`.

- [ ] **Step 2: Write `src/components/Contact.astro`**

```astro
---
import { profile } from '../data/profile';
---
<section id="contacto" class="mx-auto max-w-5xl px-6 py-24">
  <h2 class="font-display text-sm uppercase tracking-widest text-muted">Contacto</h2>
  <div class="mt-8 flex flex-col gap-4 text-lg">
    <a href={`mailto:${profile.contact.email}`} class="w-fit hover:text-accent">
      {profile.contact.email}
    </a>
    <a href={`tel:${profile.contact.phone.replace(/\s/g, '')}`} class="w-fit hover:text-accent">
      {profile.contact.phone}
    </a>
    <a href={profile.contact.linkedin} class="w-fit hover:text-accent">LinkedIn</a>
  </div>
</section>
```

- [ ] **Step 3: Write `src/components/Footer.astro`**

```astro
---
import { profile } from '../data/profile';
const year = new Date().getFullYear();
---
<footer class="border-t border-line px-6 py-8 text-center text-xs text-muted">
  © {year} {profile.name}. Todos los derechos reservados.
</footer>
```

- [ ] **Step 4: Wire into `src/pages/index.astro`**

Add the imports and elements:

```astro
import Contact from '../components/Contact.astro';
import Footer from '../components/Footer.astro';
```

```astro
  <Profile />
  <Contact />
  <Footer />
```

- [ ] **Step 5: Verify the full page**

```bash
npm run build
grep -q "jsq2908@gmail.com" dist/index.html && grep -q "mailto:jsq2908@gmail.com" dist/index.html && grep -q "Todos los derechos reservados" dist/index.html && echo "BUILD OK"
```

Expected: `BUILD OK`.

- [ ] **Step 6: Commit**

```bash
git add src/components/Contact.astro src/components/Footer.astro src/pages/index.astro
git commit -m "Add contact and footer sections, completing page assembly"
```

---

### Task 8: Manual QA and production verification

**Files:**
- No new files — verification only. Fix in place any file from Tasks 1–7 if a check below fails.

**Interfaces:** None — this task consumes the finished page from Tasks 1–7 and produces no new interface.

- [ ] **Step 1: Full production build and automated tests**

```bash
npm run build
npm run test
```

Expected: build exits 0 with no errors, and all Vitest tests (asset + content validation) pass.

- [ ] **Step 2: Start the dev server**

```bash
npm run dev
```

Leave it running and open `http://localhost:4321` in a browser.

- [ ] **Step 3: Golden-path check at desktop width**

Confirm: marquee text loops continuously; hero shows name/headline/CTAs/scoreboard; each of the 4 project cards shows its cover thumbnail and correct "Ver PDF completo ↗" (or per-asset) links; clicking a link opens the real PDF in a new tab; disciplines, profile ficha, and the content-evidence download link render; contact section has working `mailto:`/`tel:` links; footer shows the current year.

- [ ] **Step 4: Mobile-width check**

Resize the browser (or use devtools responsive mode) to 400px wide. Confirm: no horizontal scroll on the page body; text and buttons remain readable and tappable; project cards stack to one column.

- [ ] **Step 5: Accessibility checks**

Tab through the page with the keyboard only — confirm every link/button shows a visible focus outline (the `:focus-visible` accent outline from Task 1). In devtools, enable "Emulate CSS prefers-reduced-motion: reduce" and confirm the marquee stops animating.

- [ ] **Step 6: Stop the dev server and commit any fixes**

```bash
# Ctrl+C in the terminal running `npm run dev`
git add -A
git commit -m "Fix issues found during manual QA" # only if Steps 3-5 required changes
```

If no fixes were needed, skip the commit — the site is done.
