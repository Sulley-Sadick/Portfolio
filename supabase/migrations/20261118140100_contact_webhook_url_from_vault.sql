-- Parameterize the send-contact-email webhook URL via Vault instead of a hard-coded project ref.
--
-- One-time setup (SQL Editor), after vault-contact-email-bootstrap.sql:
--   select vault.create_secret(
--     'https://<PROJECT_REF>.supabase.co/functions/v1/send-contact-email',
--     'contact_webhook_url',
--     'Webhook URL for contact_messages insert → send-contact-email'
--   );
--
-- Requires vault secret: contact_webhook_service_role_key (see supabase/sql/vault-contact-email-bootstrap.sql)

create or replace function public.trigger_send_contact_email()
returns trigger
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  service_role_key text;
  webhook_url text;
begin
  select decrypted_secret
    into service_role_key
    from vault.decrypted_secrets
    where name = 'contact_webhook_service_role_key'
    limit 1;

  select decrypted_secret
    into webhook_url
    from vault.decrypted_secrets
    where name = 'contact_webhook_url'
    limit 1;

  if service_role_key is null or service_role_key = '' then
    raise warning 'contact_webhook_service_role_key missing in Vault; email webhook skipped';
    return new;
  end if;

  if webhook_url is null or webhook_url = '' then
    raise warning 'contact_webhook_url missing in Vault; email webhook skipped';
    return new;
  end if;

  perform net.http_post(
    url := webhook_url,
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
