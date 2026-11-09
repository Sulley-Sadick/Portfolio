-- Run once in Supabase Dashboard → SQL Editor (production).
-- Replace the placeholder with Project Settings → API → service_role (secret).

select vault.create_secret(
  '<YOUR_SERVICE_ROLE_KEY>',
  'contact_webhook_service_role_key',
  'Service role key for contact_messages insert → send-contact-email webhook'
);
