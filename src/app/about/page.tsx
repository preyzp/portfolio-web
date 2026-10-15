import Link from "next/link";
import { getResumeHref } from "@/lib/resume";
import { PortfolioHeader } from "../portfolio-header";
import { Portrait } from "../portrait";
import { SocialLinks } from "../social-links";

export const metadata = { title: "About — Zakharias Priya", description: "Product designer and web developer working across digital products, design systems, and websites." };

export default function AboutPage() {
  return <><a className="skip-link" href="#main">Skip to content</a><PortfolioHeader resumeHref={getResumeHref()} /><main id="main" className="wrap about-page">
    <section className="about-introduction" aria-labelledby="about-heading">
      <div className="about-copy"><p className="eyebrow">A little about me</p><h1 id="about-heading">Curiosity in the details.<br /><span>Clarity in the outcome.</span></h1><p>I’m Zakharias, a product designer shaping intuitive digital products, useful design systems, and considered websites.</p><p>I turn complex challenges into clear, meaningful digital experiences. My work spans enterprise SaaS, design systems, mobile apps, and independent web projects.</p><Link className="text-link" href="/#contact">Get in touch <span aria-hidden="true">↗</span></Link></div>
      <Portrait />
    </section>
  </main><footer className="footer wrap"><Link className="footer-logo" href="/">ZP<span>.</span></Link><p>Thoughtful by design. Built with care.</p><SocialLinks /></footer></>;
}
