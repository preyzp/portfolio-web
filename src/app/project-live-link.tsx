import { getValidLiveUrl } from "@/lib/project-url";

export function ProjectLiveLink({ liveUrl }: { liveUrl?: string }) {
  const href = getValidLiveUrl(liveUrl);
  if (!href) return null;
  return <a className="button button-dark" href={href} target="_blank" rel="noopener noreferrer">Visit Live Website <span aria-hidden="true">↗</span></a>;
}
