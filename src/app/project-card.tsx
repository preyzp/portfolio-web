import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/lib/project-types";

export function ProjectArtwork({ artwork }: { artwork: string }) {
  return <div className={`project-artwork portfolio-artwork artwork-${artwork}`} aria-hidden="true">
    <div className="art-window"><div className="art-topbar"><span /><span /><span /><i /></div><div className="art-content"><div className="art-sidebar"><b /><b /><b /><b /></div><div className="art-main"><div className="art-heading" /><div className="art-subheading" /><div className="art-panels"><div /><div /><div /></div><div className="art-table"><i /><i /><i /><i /></div></div></div></div>
    <span className="art-caption">PROJECT PREVIEW · PLACEHOLDER</span>
  </div>;
}

export function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  return <Link className="project-card portfolio-card" href={`/work/${project.slug}`}>
    {project.thumbnail ? <div className="project-thumbnail"><Image src={project.thumbnail} alt={`${project.title} design preview`} fill sizes="(max-width: 680px) calc(100vw - 40px), (max-width: 1200px) 50vw, 580px" style={{ objectFit: "contain" }} /></div> : <ProjectArtwork artwork={project.artwork} />}
    <div className="project-info"><span className="project-type">{project.category}{project.platform && ` · ${project.platform}`}</span><div className="project-title"><h3>{featured ? project.featuredTitle || project.title : project.title}</h3><span className="project-arrow rounded-full shrink-0 aspect-square" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M7 7h10v10" /></svg></span></div><p>{featured ? project.featuredSummary || project.summary : project.summary}</p><span className="project-status">{project.status}</span></div>
  </Link>;
}
