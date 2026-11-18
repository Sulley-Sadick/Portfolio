/** Ensures env social URLs open off-site (adds https:// when the secret omits the scheme). */
export function externalUrl(value: string | undefined): string {
  const trimmed = (value ?? "").trim();
  if (!trimmed) return "";
  if (/^(https?:|mailto:|tel:)/i.test(trimmed)) return trimmed;
  return `https://${trimmed.replace(/^\/+/, "")}`;
}
