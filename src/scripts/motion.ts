import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function animateCounters() {
  document.querySelectorAll<HTMLElement>('[data-counter-text]').forEach((el) => {
    const raw = el.getAttribute('data-counter-text') ?? '';
    const match = raw.match(/^(\D*)(\d+(?:\.\d+)?)(\D*)$/);
    if (!match) return;
    const [, prefix, numStr, suffix] = match;
    const target = parseFloat(numStr);
    const obj = { val: 0 };
    el.textContent = `${prefix}0${suffix}`;
    ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          val: target,
          duration: 1.4,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = `${prefix}${Math.round(obj.val)}${suffix}`;
          },
        });
      },
    });
  });
}

function animateReveals() {
  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 32 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
      },
    );
  });
}

function animateHeroEntrance() {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.9 } });
  tl.fromTo('[data-hero-eyebrow]', { opacity: 0, y: 16 }, { opacity: 1, y: 0 })
    .fromTo('[data-hero-title]', { opacity: 0, y: 24 }, { opacity: 1, y: 0 }, '-=0.6')
    .fromTo('[data-hero-sub]', { opacity: 0, y: 16 }, { opacity: 1, y: 0 }, '-=0.6')
    .fromTo('[data-hero-cta]', { opacity: 0, y: 16 }, { opacity: 1, y: 0, stagger: 0.1 }, '-=0.5')
    .fromTo('[data-hero-stat]', { opacity: 0, y: 16 }, { opacity: 1, y: 0, stagger: 0.1 }, '-=0.4');
}

function setupMagneticButtons() {
  document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((btn) => {
    const strength = 0.3;
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(btn, { x: x * strength, y: y * strength, duration: 0.3, ease: 'power2.out' });
    });
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
    });
  });
}

function setupGlowParallax() {
  const glow = document.querySelector<HTMLElement>('[data-glow-wrapper]');
  if (!glow) return;
  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 50;
    const y = (e.clientY / window.innerHeight - 0.5) * 50;
    gsap.to(glow, { x, y, duration: 0.6, ease: 'power2.out' });
  });
}

function setupCustomCursor() {
  if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;
  const cursor = document.createElement('div');
  cursor.className = 'cursor-dot';
  document.body.appendChild(cursor);
  window.addEventListener('mousemove', (e) => {
    gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.15, ease: 'power2.out' });
  });
  document.querySelectorAll('a, button').forEach((el) => {
    el.addEventListener('mouseenter', () => cursor.classList.add('cursor-dot--hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-dot--hover'));
  });
}

function setupNavShadow() {
  const nav = document.querySelector<HTMLElement>('[data-site-nav]');
  if (!nav) return;
  const onScroll = () => {
    nav.classList.toggle('shadow-lg', window.scrollY > 20);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

if (prefersReducedMotion) {
  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
    el.style.opacity = '1';
  });
  document.querySelectorAll<HTMLElement>('[data-counter-text]').forEach((el) => {
    el.textContent = el.getAttribute('data-counter-text');
  });
  setupNavShadow();
} else {
  animateReveals();
  animateHeroEntrance();
  animateCounters();
  setupMagneticButtons();
  setupGlowParallax();
  setupCustomCursor();
  setupNavShadow();
}
