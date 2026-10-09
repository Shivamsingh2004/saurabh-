import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { initMotion } from './motion.js'
import { profile as p, about, topSkills, expertise, tech, openLine, experience, education } from './data.js'

const links = [['home','Home'],['about','About'],['expertise','Expertise'],['experience','Experience'],['education','Education'],['contact','Contact']]

const In = (props) => (<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true" {...props}><path d="M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 9.75h4v11H3zm7 0h3.8v1.6h.06c.53-1 1.84-2.05 3.8-2.05 4.06 0 4.8 2.67 4.8 6.14v5.31h-4v-4.7c0-1.12-.02-2.56-1.56-2.56-1.56 0-1.8 1.22-1.8 2.48v4.78h-4z"/></svg>)
const Mail = () => (<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="1"/><path d="M3 7l9 6 9-6"/></svg>)
const Phone = () => (<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"/></svg>)

export default function App() {
  const [solid, setSolid] = useState(false)
  useEffect(() => {
    const on = () => setSolid(window.scrollY > 40)
    on(); window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  const root = useRef(null)
  useLayoutEffect(() => initMotion(root.current), [])

  return (
    <div ref={root}>
      <div className="progress" aria-hidden="true" />
      <header className={'nav' + (solid ? ' solid' : '')}>
        <a className="brand" href="#home" aria-label="Home">SS</a>
        <nav aria-label="Primary">
          {links.map(([id, label]) => <a key={id} href={'#' + id} className={id === 'expertise' ? 'hide-sm' : undefined}>{label}</a>)}
        </nav>
      </header>

      <main>
        <section id="home" className="hero">
          <div className="hero-bg" aria-hidden="true" />
          <p className="side-label" aria-hidden="true">Portfolio</p>
          <h1 className="hero-name" aria-label={p.name}>{[p.first, p.last].map(w => <span className="row" key={w} aria-hidden="true">{[...w].map((c, i) => <i key={i}>{c}</i>)}</span>)}</h1>
          <img className="hero-photo" src="/img/hero.webp" alt={p.name} width="1000" height="1554" fetchpriority="high" />
          <div className="hero-copy">
            <p className="tagline">{p.headline}</p>
            <p>{p.intro}</p>
            <a className="more" href="#about">Learn more <i aria-hidden="true" /></a>
          </div>
        </section>

        <section id="about" className="about dots-r">
          <p className="rail"><b />About</p>
          <div className="about-text">
            <h2>About {p.first}</h2>
            {about.map((t, i) => <p key={i}>{t}</p>)}
            <p className="skills"><strong>Top skills:</strong> {topSkills.join(', ')}</p>
          </div>
          <div className="about-card">
            <a className="follow" href={p.linkedin} target="_blank" rel="noreferrer"><In /> Connect on LinkedIn</a>
            <div className="socials">
              <a href={p.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><In /></a>
              <a href={'mailto:' + p.email} aria-label="Email"><Mail /></a>
              <a href={'tel:' + p.phone.replace(/-/g, '')} aria-label="Call"><Phone /></a>
            </div>
            <img src="/img/about.webp" alt={p.name + ' portrait'} width="900" height="1376" loading="lazy" />
            <span className="sign" aria-hidden="true">{p.name}</span>
          </div>
        </section>

        <section id="expertise" className="expertise">
          <div className="career-photo"><img src="/img/career.webp" alt="" width="1000" height="1470" loading="lazy" /></div>
          <div className="career-body">
            <blockquote><span aria-hidden="true">“</span>Aligning the right talent, quickly.</blockquote>
            <h2 className="spaced">Expertise</h2>
            <ul className="areas">{expertise.map(e => <li key={e}>{e}</li>)}</ul>
            <h3 className="spaced small">Technology coverage</h3>
            <ul className="tags">{tech.map(t => <li key={t}>{t}</li>)}</ul>
            <p className="open">{openLine}</p>
          </div>
        </section>

        <section id="experience" className="experience dots-l">
          <p className="rail"><b />Experience</p>
          <div className="exp-wrap">
            <h2 className="spaced">Experience</h2>
            <ol className="timeline">
              <span className="tl-line" aria-hidden="true" />
              {experience.map((e, i) => (
                <li key={i}>
                  <time>{e.when}<small>{e.len}</small></time>
                  <div>
                    <h3>{e.role}</h3>
                    <p className="co">{e.co}{e.loc ? ' · ' + e.loc : ''}</p>
                    {e.points && (
                      <details><summary>Highlights</summary>
                        <ul>{e.points.map(x => <li key={x}>{x}</li>)}</ul>
                      </details>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="education" className="edu-sec dots-r">
          <p className="rail"><b />Education</p>
          <h2 className="spaced">Education</h2>
          <ul className="edu-grid">{education.map(e => (
            <li className="edu-card" key={e.school}><em>{e.yr}</em><strong>{e.deg}</strong><span>{e.school}</span></li>
          ))}</ul>
        </section>

        <section id="contact" className="contact">
          <div className="reach">
            <h2 className="spaced">Contact</h2>
            <p className="big">Let’s talk about your next hire.</p>
            <a href={'mailto:' + p.email}>{p.email}</a>
            <a href={'tel:' + p.phone.replace(/-/g, '')}>{p.phone}</a>
            <a href={p.linkedin} target="_blank" rel="noreferrer">linkedin.com/in/sauurabhsrivvastava</a>
            <p className="where">{p.location} · {p.reach}</p>
          </div>
        </section>
      </main>
      <footer className="foot">
        <a className="brand" href="#home" aria-label="Back to top">SS</a>
        <nav aria-label="Footer">{links.map(([id, label]) => <a key={id} href={'#' + id}>{label}</a>)}</nav>
        <div className="foot-social">
          <a href={p.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><In /></a>
          <a href={'mailto:' + p.email} aria-label="Email"><Mail /></a>
          <a href={'tel:' + p.phone.replace(/-/g, '')} aria-label="Call"><Phone /></a>
        </div>
        <p>© {new Date().getFullYear()} {p.name}. All rights reserved.</p>
      </footer>
    </div>
  )
}
