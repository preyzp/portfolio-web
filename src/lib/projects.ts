import { readdirSync, readFileSync, existsSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { cache } from "react";
import type { Project } from "./project-types";
import { getValidLiveUrl } from "./project-url";

// Drafts are available only to detail routes during local development.
const loadProjects = cache((includeDrafts = false): Project[] => {
  const directory = path.join(process.cwd(), "content/projects");
  const projects = readdirSync(directory).filter((file) => file.endsWith(".md")).sort().flatMap((file) => {
    const { data, content } = matter(readFileSync(path.join(directory, file), "utf8"));
    if (data.published !== true && !(includeDrafts && process.env.NODE_ENV === "development")) return [];
    const slug = data.slug;
    if (typeof slug !== "string" || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || file !== `${slug}.md`) throw new Error(`Invalid project slug: ${file}`);
    const string = (key: string, required = false): string => {
      const value = data[key];
      if (typeof value === "string" && value.trim()) return value;
      if (required) throw new Error(`Missing ${key}: ${file}`);
      return "";
    };
    const image = (src: string) => {
      if (!src.startsWith(`/images/portfolio/${slug}/`) || src.includes("..") || !src.endsWith(".webp") || !existsSync(path.join(process.cwd(), "public", src))) throw new Error(`Invalid or missing image: ${src}`);
      return src;
    };
    const cover = string("cover"); const thumbnail = string("thumbnail");
    if (cover) image(cover);
    if (thumbnail) image(thumbnail);
    for (const match of content.matchAll(/!\[[^\]]*\]\(([^\s)]+)\)/g)) image(match[1]);
    const liveUrl = getValidLiveUrl(data.liveUrl);
    const techStack = Array.isArray(data.techStack) ? data.techStack.filter((item): item is string => typeof item === "string" && !!item.trim()) : [];
    return [{ slug, content, liveUrl, techStack, title: string("title", true), category: string("category", true), summary: string("summary", true), platform: string("platform"), industry: string("industry"), role: string("role"), status: string("status") || "Case study", cover, thumbnail, artwork: string("artwork"), featured: data.featured === true, featuredOrder: typeof data.featuredOrder === "number" ? data.featuredOrder : 100, order: typeof data.order === "number" ? data.order : 100, featuredTitle: string("featuredTitle"), featuredSummary: string("featuredSummary") }];
  });
  if (new Set(projects.map((project) => project.slug)).size !== projects.length) throw new Error("Duplicate project slugs");
  return projects.sort((a, b) => a.order - b.order || a.slug.localeCompare(b.slug));
});

// Listings (and any sitemap consumer) always receive published projects only.
export const getProjects = cache(() => loadProjects());

export function getProjectRouteParams() {
  return loadProjects(process.env.NODE_ENV === "development").map(({ slug }) => ({ slug }));
}

export function getProject(slug: string) {
  return loadProjects(process.env.NODE_ENV === "development").find((project) => project.slug === slug);
}
