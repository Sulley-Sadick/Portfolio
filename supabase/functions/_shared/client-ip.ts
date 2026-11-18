const IP_HEADERS = [
  "cf-connecting-ip",
  "x-real-ip",
  "x-forwarded-for",
] as const;

function firstForwardedIp(value: string): string {
  return value.split(",")[0]?.trim() ?? "";
}

/** Best-effort client IP from common proxy headers. */
export function readClientIp(req: Request): string | null {
  for (const header of IP_HEADERS) {
    const raw = req.headers.get(header)?.trim();
    if (!raw) continue;

    const ip = header === "x-forwarded-for" ? firstForwardedIp(raw) : raw;
    if (ip) return ip;
  }

  return null;
}

/** SHA-256 hex digest — store this instead of the raw IP. */
export async function hashClientIp(ip: string): Promise<string> {
  const bytes = new TextEncoder().encode(ip.trim().toLowerCase());
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(digest)]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}
