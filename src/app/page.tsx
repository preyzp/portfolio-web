import Link from "next/link";
import { getProjects } from "@/lib/projects";
import { ProjectCard } from "./project-card";
import { PortfolioHeader } from "./portfolio-header";
import { getResumeHref } from "../lib/resume";
import { SocialLinks } from "./social-links";
import { Portrait } from "./portrait";

const expertise = [
  { number: "01", title: "Product Design", description: "Making complex workflows easier to understand and use." },
  { number: "02", title: "Design Systems", description: "Building consistent, scalable foundations for digital products." },
  { number: "03", title: "Web Development", description: "Bringing thoughtful visual direction to life on the web." },
];

export default function Home() {
  const projects = getProjects().filter((project) => project.featured).sort((a, b) => a.featuredOrder - b.featuredOrder);
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <PortfolioHeader resumeHref={getResumeHref()} />
      <main id="main">
        <section className="hero wrap" aria-labelledby="hero-title">
          <div className="hero-copy pb-6 max-[680px]:pb-8">
            <p className="eyebrow"><span className="eyebrow-line" /> Product designer &amp; web developer <span className="eyebrow-dot">·</span> Indonesia</p>
            <h1 id="hero-title">Designing thoughtful <span>digital experiences.</span></h1>
            <p className="hero-description">I’m Zakharias, a product designer shaping intuitive digital products, useful design systems, and considered websites.</p>
            <div className="hero-actions"><a className="button button-dark" href="#work">Explore my work <span aria-hidden="true">↘</span></a><a className="button button-light" href="#contact">Get in touch <span aria-hidden="true">↗</span></a></div>
          </div>
          <div className="hero-note" aria-label="Based in Indonesia, working across design and development"><span className="note-mark">Z<span>P</span>.</span><span className="note-rule" /><span className="note-caption">Independent practice<br />Design · Build · Refine</span></div>
          <div className="hero-bottom"><span>Selected work, 2021—2025</span><a href="#work">Scroll to explore <span aria-hidden="true">↓</span></a></div>
        </section>

        <section className="section wrap work-section" id="work" aria-labelledby="work-title">
          <div className="section-heading"><div><p className="eyebrow">A few things I’ve worked on</p><h2 id="work-title">Selected work<span className="period">.</span></h2></div><p className="section-intro">A selection of digital products, design systems, and websites I’ve helped design and build.</p></div>
          <div className="project-grid">{projects.map((project) => <ProjectCard project={project} featured key={project.slug} />)}</div>
          <p><Link className="text-link" href="/work">View all work <span aria-hidden="true">↗</span></Link></p>
          <p className="work-disclaimer">Preview artwork is placeholder. Project details and publication permissions are being verified.</p>
        </section>

        <section className="section expertise-section" id="expertise" aria-labelledby="expertise-title"><div className="wrap">
          <div className="section-heading"><div><p className="eyebrow">How I can help</p><h2 id="expertise-title">Design thinking<br />meets execution<span className="period">.</span></h2></div><p className="section-intro">From the first sketch to the final detail, I work across the full shape of a digital experience.</p></div>
          <div className="expertise-list">{expertise.map((item) => <article className="expertise-item" key={item.number}><span className="expertise-number">{item.number}</span><h3>{item.title}</h3><p>{item.description}</p><span className="expertise-symbol" aria-hidden="true">↗</span></article>)}</div>
        </div></section>

        <section className="section about-section wrap" id="about" aria-labelledby="about-title">
          <div className="about-aside"><p className="eyebrow">A little about me</p><span className="about-index">01 / 03</span></div>
          <div className="about-copy"><h2 id="about-title">Curiosity in the details.<br /><span>Clarity in the outcome.</span></h2><p>I turn complex challenges into clear, meaningful digital experiences. My work spans enterprise SaaS, design systems, mobile apps, and independent web projects.</p><a className="text-link" href="#contact">More about my approach <span aria-hidden="true">↗</span></a></div>
          <div className="about-visual"><Portrait small /><div className="about-signature" aria-hidden="true">ZP<span>.</span></div></div>
        </section>

        <section className="studio-section wrap" aria-labelledby="studio-title"><div className="studio-number">02 <span>/ Independent studio</span></div><div className="studio-content"><p className="eyebrow">A small independent practice</p><h2 id="studio-title">Good work,<br />made with <span>intention.</span></h2><p>TednCo is an independent web studio crafting modern, functional websites for creatives, businesses, and personal brands.</p><a className="text-link" href="#contact">Ask about a website project <span aria-hidden="true">↗</span></a></div><div className="studio-wordmark" aria-label="TednCo">Tedn<span>&</span>Co<span className="period">.</span></div></section>

        <section className="contact-section" id="contact" aria-labelledby="contact-title"><div className="wrap contact-inner"><p className="eyebrow">03 / Start a conversation</p><h2 id="contact-title">Have something<br />in mind<span className="period">?</span></h2><div className="contact-bottom"><p>Open to product design opportunities and freelance web projects. Let’s create something meaningful.</p><a className="button button-white" href="mailto:priyazakharias@gmail.com">Get in touch <span aria-hidden="true">↗</span></a></div><a className="contact-email" href="mailto:priyazakharias@gmail.com">priyazakharias@gmail.com</a></div></section>
      </main>
      <footer className="footer wrap"><a className="footer-logo" href="#main" aria-label="Zakharias Priya, back to top">ZP<span>.</span></a><p>Thoughtful by design. Built with care.</p><SocialLinks /><div className="footer-right"><span>© {new Date().getFullYear()} Zakharias Priya</span><a href="#main">Back to top ↑</a></div></footer>
    </>
  );
}
