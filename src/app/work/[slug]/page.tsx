import Link from "next/link";
import { ProjectImage } from "../../project-image";
import ReactMarkdown from "react-markdown";
import { notFound } from "next/navigation";
import { getProject, getProjects, getProjectRouteParams } from "@/lib/projects";
import { getResumeHref } from "@/lib/resume";
import { PortfolioHeader } from "../../portfolio-header";
import { ProjectArtwork } from "../../project-card";
import { ProjectLiveLink } from "../../project-live-link";
import { SocialLinks } from "../../social-links";

export const dynamicParams = false;
export function generateStaticParams() { return getProjectRouteParams(); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  return { title: `${project.title} — Zakharias Priya`, description: project.summary };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  const isDraftPreview = process.env.NODE_ENV === "development" && !getProjects().some(({ slug }) => slug === project.slug);
  return <><a className="skip-link" href="#main">Skip to content</a><PortfolioHeader resumeHref={getResumeHref()} /><main id="main" className="wrap case-study">
    <header className="portfolio-intro"><Link className="text-link" href="/work">← All work</Link><p className="eyebrow">{project.category}{project.platform && ` · ${project.platform}`}</p><h1>{project.title}</h1><p className="portfolio-lede">{project.summary}</p><p className="project-status">{project.status}</p><dl className="project-facts">{[["Role", project.role], ["Platform", project.platform], ["Industry", project.industry]].filter(([, value]) => value).map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></header>
    {project.techStack && project.techStack.length > 0 && <dl className="project-facts"><div><dt>Technology stack</dt><dd>{project.techStack.join(", ")}</dd></div></dl>}
    {project.liveUrl && <p><ProjectLiveLink liveUrl={project.liveUrl} /></p>}
    {isDraftPreview && <p className="project-status" role="status">Draft Preview</p>}
    {project.cover ? <ProjectImage src={project.cover} alt={`${project.title} cover`} preload /> : <ProjectArtwork artwork={project.artwork} />}
    <article className="markdown"><ReactMarkdown skipHtml components={{
      h1: ({ children }) => <h2>{children}</h2>,
      img: ({ src, alt }) => typeof src === "string" && src.startsWith(`/images/portfolio/${project.slug}/`) && !src.includes("..") ? <ProjectImage src={src} alt={alt || "Project design screen"} /> : null,
    }}>{project.content}</ReactMarkdown></article>
    <nav className="case-navigation" aria-label="Case study navigation"><Link className="text-link" href="/work">← Back to all work</Link><a className="text-link" href="mailto:priyazakharias@gmail.com">Discuss a project ↗</a></nav>
  </main><footer className="footer wrap"><Link className="footer-logo" href="/">ZP<span>.</span></Link><p>© {new Date().getFullYear()} Zakharias Priya</p><SocialLinks /></footer></>;
}
