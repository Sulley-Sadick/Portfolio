-- Fires send-contact-email after every insert into contact_messages (async via pg_net).
--
-- One-time per project (Supabase SQL Editor), store the service role key in Vault:
--   select vault.create_secret('<YOUR_SERVICE_ROLE_KEY>', 'contact_webhook_service_role_key');
--
-- Edge function secrets (CLI): RESEND_API_KEY, optional RESEND_FROM, CONTACT_EMAIL_TO

create extension if not exists pg_net with schema extensions;

create or replace function public.trigger_send_contact_email()
returns trigger
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  service_role_key text;
begin
  select decrypted_secret
  into service_role_key
  from vault.decrypted_secrets
  where name = 'contact_webhook_service_role_key'
  limit 1;

  if service_role_key is null or service_role_key = '' then
    raise warning 'contact_webhook_service_role_key missing in Vault; email webhook skipped';
    return new;
  end if;

  perform net.http_post(
    url := 'https://wthxkamqpmgifpvlfmxf.supabase.co/functions/v1/send-contact-email',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'apikey', service_role_key,
      'Authorization', 'Bearer ' || service_role_key
    ),
    body := jsonb_build_object(
      'type', 'INSERT',
      'table', 'contact_messages',
      'schema', tg_table_schema,
      'record', to_jsonb(new),
      'old_record', null
    )
  );

  return new;
end;
$$;

drop trigger if exists on_contact_message_insert_send_email on public.contact_messages;

create trigger on_contact_message_insert_send_email
  after insert on public.contact_messages
  for each row
  execute function public.trigger_send_contact_email();
