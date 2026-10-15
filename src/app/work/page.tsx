import Link from "next/link";
import { getProjects } from "@/lib/projects";
import { getResumeHref } from "@/lib/resume";
import { PortfolioHeader } from "../portfolio-header";
import { ProjectFilters } from "./project-filters";
import { SocialLinks } from "../social-links";

export const metadata = { title: "Work — Zakharias Priya", description: "Product design, design systems, and website projects by Zakharias Priya." };

export default function WorkPage() {
  const projects = getProjects();
  return <><a className="skip-link" href="#main">Skip to content</a><PortfolioHeader resumeHref={getResumeHref()} /><main id="main" className="portfolio-page">
    <section className="portfolio-intro wrap"><p className="eyebrow">Product design · Design systems · Web</p><h1>Selected work<span className="period">.</span></h1><p className="portfolio-lede">A selection of digital products, design systems, and websites I’ve helped design and build.</p></section>
    <ProjectFilters projects={projects.map((project) => ({ ...project, content: "" }))} />
    <p className="portfolio-disclaimer wrap">Projects marked Preview use placeholder artwork; details and publication permissions are being verified.</p>
    <section className="portfolio-contact wrap"><div><p className="eyebrow">Have a project or opportunity?</p><h2>Let’s make something thoughtful.</h2></div><a className="button button-dark" href="mailto:priyazakharias@gmail.com">Get in touch ↗</a></section>
  </main><footer className="footer wrap"><Link className="footer-logo" href="/">ZP<span>.</span></Link><p>Thoughtful by design. Built with care.</p><SocialLinks /><span>© {new Date().getFullYear()} Zakharias Priya</span></footer></>;
}
