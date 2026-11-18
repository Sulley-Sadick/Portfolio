-- Run once in Supabase Dashboard → SQL Editor (production).
-- Replace placeholders with Project Settings → API values.

-- Service role key used by the DB trigger to call send-contact-email.
select vault.create_secret(
  '<YOUR_SERVICE_ROLE_KEY>',
  'contact_webhook_service_role_key',
  'Service role key for contact_messages insert → send-contact-email webhook'
);

-- Full Edge Function URL for this project (no trailing slash issues — use the exact functions URL).
select vault.create_secret(
  'https://<PROJECT_REF>.supabase.co/functions/v1/send-contact-email',
  'contact_webhook_url',
  'Webhook URL for contact_messages insert → send-contact-email'
);
