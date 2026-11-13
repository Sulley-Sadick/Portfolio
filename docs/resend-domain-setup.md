# Resend + `sulleysadick.dev` (contact form email)

Contact notifications use [Resend](https://resend.com) from the `send-contact-email` Supabase Edge Function. The default sender is **`Sulley Sadick <contact@sulleysadick.dev>`** once your domain is verified in Resend.

---

## 1. Add your domain in Resend

1. Sign in at [resend.com](https://resend.com) → **Domains** → **Add domain**
2. Enter **`sulleysadick.dev`** (apex domain is fine; you can send from `contact@sulleysadick.dev`)
3. Resend shows **DNS records** (usually **DKIM** + **SPF**; sometimes a verification TXT)

## 2. Add DNS records in Namecheap

1. Namecheap → **Domain List** → **sulleysadick.dev** → **Advanced DNS**
2. **Do not remove** your GitHub Pages **A** / **CNAME** records
3. **Add** each record Resend gives you (type, host, value) — often:
   - **TXT** or **CNAME** on `resend._domainkey` (DKIM)
   - **TXT** or **MX** for SPF (follow Resend’s exact host names; copy from the dashboard)
4. Save and wait for DNS propagation (minutes to a few hours)

## 3. Verify in Resend

1. Back in Resend → your domain → **Verify**
2. Status should become **Verified** when DNS is correct
3. If it fails, use Resend’s DNS checker and compare host/value with Namecheap (no typos; host is often a subdomain, not `@`)

## 4. Configure Supabase Edge Function secrets

From the project root (Supabase CLI logged in and linked to your project):

```bash
supabase secrets set RESEND_API_KEY=re_xxxxxxxx
supabase secrets set RESEND_FROM="Sulley Sadick <contact@sulleysadick.dev>"
supabase secrets set CONTACT_EMAIL_TO=your-inbox@example.com
```

Redeploy the function after changing secrets:

```bash
pnpm run supabase:deploy-contact
```

| Secret | Purpose |
|--------|---------|
| `RESEND_API_KEY` | API key from Resend → **API Keys** |
| `RESEND_FROM` | Must use an address on a **verified** domain |
| `CONTACT_EMAIL_TO` | Where portfolio contact submissions are delivered |

Until the domain is verified, Resend may reject mail from `@sulleysadick.dev`. For testing only, you can temporarily use `onboarding@resend.dev` in `RESEND_FROM` (Resend sandbox).

## 5. Confirm the integration works

1. Open **https://sulleysadick.dev/contact** and submit the form
2. **Supabase** → **Table Editor** → `contact_messages` — new row should appear
3. **Resend** → **Emails** — delivery log should show **Sent** (or an error with a reason)
4. Check **CONTACT_EMAIL_TO** inbox (and spam)

If email fails but the row saves, check **Supabase** → **Edge Functions** → `send-contact-email` → **Logs**.

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Domain not verified | Wait for DNS; re-check Resend records in Namecheap |
| `403` / domain not verified from Resend | Do not use `@sulleysadick.dev` until Resend shows Verified |
| No email, row exists | Vault key + `send-contact-email` trigger; see migration comment in `supabase/migrations/` |
| Still `onboarding@resend.dev` in logs | Run `supabase secrets set RESEND_FROM=...` and redeploy functions |
