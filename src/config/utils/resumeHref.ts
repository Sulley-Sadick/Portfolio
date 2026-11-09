import { publicAssetPath } from "../../shared/utils/publicAssetPath";

const DEFAULT_RESUME_FILE = "resume/Sulley-Sadick-Resume.pdf";

/** Resume PDF href for the current deploy base (avoids /Portfolio/Portfolio/...). */
export function resolveResumeHref(envValue: string | undefined): string {
  const trimmed = (envValue ?? "").trim();
  if (/^https?:/i.test(trimmed)) return trimmed;
  if (!trimmed) return publicAssetPath(DEFAULT_RESUME_FILE);

  let path = trimmed.replace(/^\/+/, "");
  const baseSegment = import.meta.env.BASE_URL.replace(/^\/+|\/+$/g, "");
  if (
    baseSegment &&
    path.toLowerCase().startsWith(`${baseSegment.toLowerCase()}/`)
  ) {
    path = path.slice(baseSegment.length + 1);
  }
  if (path.toLowerCase().startsWith("portfolio/")) {
    path = path.slice("portfolio/".length);
  }

  return publicAssetPath(path);
}
