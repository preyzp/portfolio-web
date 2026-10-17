import Link from "next/link";
import { getResumeHref } from "@/lib/resume";
import { pageMetadata } from "@/lib/seo";
import { PortfolioHeader } from "../portfolio-header";
import { SocialLinks } from "../social-links";
import { ContactForm } from "./contact-form";
import { ContactIcon } from "./contact-icons";
import "./contact.css";

export const metadata = pageMetadata(
  "Contact | Zakharias Priya — Product Designer / UI/UX Designer",
  "Get in touch with Zakharias Priya about product design roles, freelance projects, and collaborations in B2B SaaS, enterprise software, design systems, and digital products.",
  "/contact",
);

const contacts = [
  { icon: "mail", label: "Email", text: "priyazakharias@gmail.com", href: "mailto:priyazakharias@gmail.com" },
  { icon: "phone", label: "Phone", text: "+62 812-8010-7534", href: "tel:+6281280107534" },
  { icon: "message", label: "WhatsApp", text: "Start a conversation", href: "https://wa.me/6281280107534?text=Hi%20Zakharias%2C%20I%27d%20like%20to%20discuss%20a%20design%20opportunity%20with%20you." },
  { icon: "linkedin", label: "LinkedIn", text: "Connect on LinkedIn", href: "https://www.linkedin.com/in/zakharias-priya-7715b9208/" },
] as const;

export default function ContactPage() {
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <PortfolioHeader resumeHref={getResumeHref()} />
    <main id="main" className="wrap contact-page">
      <div className="contact-page-grid">
        <div className="contact-page-intro">
          <p className="eyebrow"><span className="eyebrow-line" /> Let’s start a conversation</p>
          <h1>Good design starts<br />with a <span>conversation.</span></h1>
          <p>Have a role, a project, or a challenge in mind? I’m open to product design opportunities, freelance projects, and thoughtful collaborations.</p>
          <p>Tell me a little about what you’re working on and how I can help.</p>
        </div>
        <ContactForm />
        <section className="contact-alternatives" aria-labelledby="contact-alternatives-heading">
          <h2 id="contact-alternatives-heading">Prefer to connect directly?</h2>
          <ul>{contacts.map(contact => {
            const external = contact.href.startsWith("https:");
            return <li key={contact.label}><a href={contact.href} {...(external ? { target: "_blank", rel: "noopener noreferrer", "aria-label": `${contact.label}: ${contact.text} (opens in a new tab)` } : {})}>
              <span className="contact-channel-icon"><ContactIcon name={contact.icon} /></span>
              <span className="contact-channel-copy"><span className="contact-channel-label">{contact.label}</span><span>{contact.text}</span></span>
              {external && <ContactIcon name="arrow" />}
            </a></li>;
          })}</ul>
        </section>
      </div>
    </main>
    <footer className="footer wrap"><Link className="footer-logo" href="/">ZP<span>.</span></Link><p>Thoughtful by design. Built with care.</p><SocialLinks /></footer>
  </>;
}
