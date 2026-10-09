import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
gsap.registerPlugin(ScrollTrigger)

// Smooth scroll (Lenis) wired into GSAP's ticker + ScrollTrigger.
export function initMotion(root) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce) return () => {}
  const lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.95 })
  lenis.on('scroll', ScrollTrigger.update)
  const tick = (t) => lenis.raf(t * 1000)
  gsap.ticker.add(tick); gsap.ticker.lagSmoothing(0)

  const onClick = (e) => {
    const a = e.target.closest('a[href^="#"]'); if (!a) return
    const el = document.querySelector(a.getAttribute('href')); if (!el) return
    e.preventDefault(); lenis.scrollTo(el, { offset: a.getAttribute('href') === '#home' ? 0 : -50, duration: 1.3 })
  }
  document.addEventListener('click', onClick)

  const ctx = gsap.context(() => {
    const q = (s) => gsap.utils.toArray(s)
    const reveal = (targets, trigger, vars = {}) => gsap.from(targets, {
      y: 46, autoAlpha: 0, duration: 0.9, ease: 'power3.out', stagger: 0.12,
      scrollTrigger: { trigger, start: 'top 80%' }, ...vars })

    // progress bar
    gsap.to('.progress', { scaleX: 1, ease: 'none', scrollTrigger: { scrub: 0.3, start: 0, end: 'max' } })

    // hero intro: one orchestrated sequence
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
    tl.from('.hero-bg', { clipPath: 'inset(0 100% 0 0)', duration: 0.9, ease: 'power3.inOut' })
      .from('.hero-name i', { yPercent: 115, duration: 1.1, stagger: 0.035 }, '-=0.3')
      .from('.hero-photo', { yPercent: 12, autoAlpha: 0, duration: 1.2 }, '-=0.9')
      .from('.hero-copy > *', { y: 30, autoAlpha: 0, duration: 0.8, stagger: 0.12 }, '-=0.6')
      .from('.nav, .side-label', { autoAlpha: 0, y: -14, duration: 0.7 }, '-=0.6')
    // hero parallax (depth between name and photo)
    gsap.to('.hero-name', { yPercent: -18, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } })
    gsap.to('.hero-photo', { yPercent: 6, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } })

    // about
    reveal('.about-text > *', '.about')
    gsap.from('.about-card', { clipPath: 'inset(100% 0 0 0)', duration: 1.2, ease: 'power3.inOut', scrollTrigger: { trigger: '.about-card', start: 'top 80%' } })
    gsap.from('.about-card .follow, .socials a', { x: -24, autoAlpha: 0, stagger: 0.1, duration: 0.6, delay: 0.7, scrollTrigger: { trigger: '.about-card', start: 'top 80%' } })
    gsap.from('.sign', { clipPath: 'inset(0 100% 0 0)', duration: 1.6, ease: 'power2.inOut', scrollTrigger: { trigger: '.about-card', start: 'top 55%' } })

    // expertise
    gsap.from('.career-photo img', { yPercent: 14, autoAlpha: 0, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: '.expertise', start: 'top 70%' } })
    reveal('.expertise blockquote', '.expertise', { stagger: 0 })
    reveal('.areas li', '.areas', { y: 0, x: -34, stagger: 0.08 })
    reveal('.tags li', '.tags', { y: 14, scale: 0.9, stagger: 0.04, duration: 0.5 })
    reveal('.open', '.open')

    // experience: line draws as you scroll, rows slide in
    gsap.from('.tl-line', { scaleY: 0, transformOrigin: 'top', ease: 'none', scrollTrigger: { trigger: '.timeline', start: 'top 70%', end: 'bottom 80%', scrub: true } })
    q('.timeline > li').forEach((li) => gsap.from(li, { x: 40, autoAlpha: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: li, start: 'top 88%' } }))
    reveal('.exp-wrap > h2', '.exp-wrap', { stagger: 0 })

    // education
    reveal('.edu-sec h2', '.edu-sec', { stagger: 0 })
    reveal('.edu-card', '.edu-grid', { stagger: 0.14 })

    // contact
    reveal('.reach > *', '.contact', { stagger: 0.1 })
    reveal('.foot > *', '.foot', { y: 20, stagger: 0.08, scrollTrigger: { trigger: '.foot', start: 'top 98%' } })
  }, root)

  const refresh = () => ScrollTrigger.refresh()
  window.addEventListener('load', refresh)
  return () => {
    window.removeEventListener('load', refresh); document.removeEventListener('click', onClick)
    ctx.revert(); gsap.ticker.remove(tick); lenis.destroy()
  }
}
