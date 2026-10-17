import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/projects";
import { siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/about", "/work", "/contact", ...getProjects().map(({ slug }) => `/work/${slug}`)]
    .map((pathname) => ({ url: new URL(pathname, siteUrl).href }));
}
