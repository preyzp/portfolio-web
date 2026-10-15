import { existsSync } from "node:fs";
import { join } from "node:path";

const resumeHref = "/resume/zakharias-priya-resume.pdf";

export function getResumeHref() {
  const filePath = join(process.cwd(), "public", "resume", "zakharias-priya-resume.pdf");
  return existsSync(filePath) ? resumeHref : null;
}
