import type {
  ContactInsertWebhookPayload,
  ContactMessageRecord,
} from "./contact.types.ts";

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object";
}

function parseContactRecord(value: unknown): ContactMessageRecord | null {
  if (!isRecord(value)) return null;

  const { id, name, contact, message } = value;

  if (
    typeof name !== "string" ||
    typeof contact !== "string" ||
    typeof message !== "string"
  ) {
    return null;
  }

  if (!name.trim() || !contact.trim() || !message.trim()) return null;

  const rowId =
    typeof id === "number"
      ? id
      : typeof id === "string" && id.trim() !== ""
        ? Number(id)
        : NaN;

  if (!Number.isFinite(rowId)) return null;

  return { id: rowId, name, contact, message };
}

export function parseContactInsertWebhook(
  body: unknown,
): ContactInsertWebhookPayload | null {
  if (!isRecord(body)) return null;
  if (body.type !== "INSERT" || body.table !== "contact_messages") return null;

  const record = parseContactRecord(body.record);
  if (!record) return null;

  const schema = typeof body.schema === "string" ? body.schema : "public";

  return {
    type: "INSERT",
    table: "contact_messages",
    schema,
    record,
    old_record: null,
  };
}
