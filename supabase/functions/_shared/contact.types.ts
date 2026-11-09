export type ContactMessageRecord = {
  id: number;
  name: string;
  contact: string;
  message: string;
};

export type ContactInsertWebhookPayload = {
  type: "INSERT";
  table: "contact_messages";
  schema: string;
  record: ContactMessageRecord;
  old_record: null;
};
