# Contact form backend

## Flow

1. Browser validates with Zod (`src/features/contact/contact.validator.ts`).
2. `submitContactMessage` calls Edge Function `submit-contact`.
3. Function re-validates, enforces length + rate limits, inserts via **service role**.
4. DB trigger posts to `send-contact-email` (Vault URL + service role key).
5. Resend delivers to `CONTACT_EMAIL_TO`.

## Security controls

| Control | Where |
|---------|--------|
| RLS enabled; no anon/authenticated policies | `20261118140000_contact_messages_schema_and_rls.sql` |
| Direct table grants revoked from `anon` / `authenticated` | same migration |
| Field length limits | client + Edge Zod schemas |
| Rate limit (5 / 15 min / IP hash) | `submit-contact` |
| Honeypot field with HTML `name="honeypot"` | `useForm` register + ContactSection |
| Webhook URL not hard-coded | Vault `contact_webhook_url` |
| Inbox address required | `CONTACT_EMAIL_TO` secret |

## Deploy checklist

```bash
# 1. Vault secrets (SQL Editor) — see supabase/sql/vault-contact-email-bootstrap.sql
# 2. Edge secrets
supabase secrets set RESEND_API_KEY=...
supabase secrets set RESEND_FROM="Sulley Sadick <contact@sulleysadick.dev>"
supabase secrets set CONTACT_EMAIL_TO=you@example.com
# 3. Functions + migrations
pnpm supabase:deploy-contact
```
