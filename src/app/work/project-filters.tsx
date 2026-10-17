"use client";
import { useState } from "react";
import type { Project } from "@/lib/project-types";
import { ProjectCard } from "../project-card";

export function ProjectFilters({ projects }: { projects: Project[] }) {
  const [category, setCategory] = useState("All");
  const [platform, setPlatform] = useState("All");
  const visible = projects.filter(
    (project) =>
      (category === "All" || project.category === category) &&
      (platform === "All" || project.platform === platform),
  );
  return (
    <>
      <div className="work-filters wrap">
        <div
          role="group"
          aria-label="Filter by category"
          className="filter-group"
        >
          {["All", ...new Set(projects.map((p) => p.category))].map((value) => (
            <button
              type="button"
              key={value}
              aria-pressed={category === value}
              onClick={() => setCategory(value)}
            >
              {value}
            </button>
          ))}
        </div>
        <div
          role="group"
          aria-label="Filter by platform"
          className="filter-group"
        >
          <span>Platform</span>
          {[
            "All",
            ...new Set(projects.map((p) => p.platform).filter(Boolean)),
          ].map((value) => (
            <button
              type="button"
              key={value}
              aria-pressed={platform === value}
              onClick={() => setPlatform(value)}
            >
              {value}
            </button>
          ))}
        </div>
        <p role="status">
          {visible.length} {visible.length === 1 ? "project" : "projects"}
        </p>
      </div>
      <section className="portfolio-grid wrap" aria-label="Portfolio projects">
        {visible.map((project) => (
          <ProjectCard key={project.slug} project={project} headingLevel={2} />
        ))}
      </section>
      {visible.length === 0 && (
        <p className="wrap">
          No projects match these filters. Choose All to explore more work.
        </p>
      )}
    </>
  );
}
