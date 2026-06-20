# NoonOS — Charity Management Platform

A white-label, multi-tenant web app that combines a **ClickUp-style project/task manager** with a **CRM purpose-built for charities** (donors, donations, campaigns, grant pipelines, volunteers, analytics). Built on a real Supabase (Postgres) backend so it can grow into a production SaaS product sold to other charities.

**Brand:** "NoonOS" — the mark is built on the Arabic letter **Noon (ن)**: a gradient bowl with a gold dot. Neutral and sellable, with a quiet nod to the charity's heritage. Logo file: `assets/noonos-logo.svg`.

---

## What was built (live, not a mockup)

The front-end reads and writes live data from a dedicated Supabase project.

- **Backend:** Supabase project `charityos` (region `eu-central-1`). 16 related tables, row-level security enabled.
- **Front-end:** A single-file React app (`index.html`) with a refined, animated UI — gradient sidebar, glass header, hover-lift cards, animated charts and progress bars, slide-in drawers, and scale-in modals.
- **Demo tenant:** Faircharity e.V. — 5 members, 18 contacts, 6 campaigns, 30 donations, 2 pipelines, 19 tasks, volunteer shifts, custom-field values and saved views.

### Modules

Dashboard · **My Work** · Donors/CRM · Donations · Campaigns · Pipelines (kanban) · Tasks (board + list) · Volunteers · **Analytics** · Settings.

### New in this version (the 4 chosen add-ons + visual upgrade)

1. **Command palette (⌘K / Ctrl+K).** Global fuzzy search across donors, tasks and campaigns, plus quick-create commands (new donation/task/contact/campaign) and jump-to-view navigation, with arrow-key + Enter selection. A "New" quick-add menu is also in the top bar.
2. **My Work inbox + notifications.** A per-user home grouping assigned tasks into Overdue / Due today / This week / Later, with a notification bell that surfaces due and overdue items. A user switcher in the header lets you act as any team member (demo stand-in for auth).
3. **Custom fields + saved views.** Define per-tenant custom fields (text/number/select/date/boolean) in Settings; they render automatically in the contact drawer and add-contact form and persist to a `custom` JSONB column. Save filtered views (e.g. "Major donors", "Lapsed", "Due this week") as reusable chips in Donors and Tasks.
4. **CSV import/export + bulk actions.** Export the current donor view to CSV, import contacts by file or paste (with live preview), and select rows to bulk set status, add a tag, or delete.

Plus **deeper analytics**: revenue trend line, category donut, gift-size distribution, donor retention %, average gift, recurring share, new-vs-returning, month-over-month growth, top donors, and payment-method breakdown.

### Data model (tenant-isolated)

Every table carries `org_id` — the foundation of multi-tenancy.

| Domain | Tables |
|---|---|
| Tenancy & people | `organizations`, `members` |
| CRM | `contacts` (+ `custom` jsonb), `activities` |
| Fundraising | `campaigns`, `donations` |
| Pipelines | `pipelines`, `pipeline_stages`, `opportunities` |
| Project management | `spaces` → `lists` → `tasks` (+ `custom` jsonb), `task_statuses` |
| Programs | `volunteer_shifts` |
| Configurability | `custom_field_defs`, `saved_views` |

### Connection details

- **Project URL:** `https://mcgtpdfqrfljffzsqrno.supabase.co`
- **Publishable key:** `sb_publishable_ZLmBXoPiCacqk5slv30mUw_m12eBU-c`
- Embedded in `index.html`. Open the file in a browser, or host the folder on Netlify/Vercel.

> **Security note (demo vs. production):** the database uses permissive "demo mode" RLS (`using (true)`) so the app works without login. Before going live, replace with auth-scoped policies (`org_id in (select org_id from members where user_id = auth.uid())`). The publishable key is safe to ship; the service-role key was never used.

---

## The 10 flagship features (roadmap)

1. **Live Impact & Transparency Dashboard (public)** — per-campaign funds, allocation and date-stamped photo/video proof.
2. **Integrated donation checkout with a "100% policy" toggle** — donor covers fees; field already modelled.
3. **Smart recurring giving & retention engine** — dunning, upgrade nudges, lapsed win-back.
4. **Automated tax receipts (Zuwendungsbestätigung) + donor portal.**
5. **Grant & major-gift pipeline with deadline intelligence** — checklists, reminders, auto funder reports.
6. **Zakat / religious-giving assistant** — live Nisab, Hawl reminders, one-click pay links.
7. **AI donor insights & segmentation** — NL search, next-best-action, AI-drafted thank-yous and grant narratives.
8. **Campaign & program operations workspace** — dependencies, recurring tasks, Gantt, comments, attachments.
9. **Multi-channel supporter communications** — email + WhatsApp broadcasts logged to the contact timeline.
10. **Board-ready analytics & compliance reporting** — overhead %, LTV, retention cohorts, restricted funds, GDPR tooling.

---

## 5 platform features implemented now (your pre-build list)

1. Command palette (⌘K) + quick-add — **done**.
2. My Work inbox + notifications — **done**.
3. Custom fields + saved views — **done**.
4. CSV import/export + bulk actions — **done**.
5. Audit log + role-based permissions UI — *deferred to production (depends on auth).*

---

## Productizing: API & external-CRM integration

- **API is built-in.** Supabase auto-generates a REST + realtime API over every table with role-based access. NoonOS is API-first out of the box.
- **Integration layer = Edge Functions** (secrets never touch the client): Stripe/PayPal/Twingle webhooks → `donations`/`contacts`; outbound email/WhatsApp on events; nightly accounting export (DATEV/Lexoffice/QuickBooks).
- **External-CRM sync:** native two-way sync to HubSpot / Salesforce NPSP via Edge Functions keyed on email + `external_id`; plus a no-code Zapier/Make/n8n bridge. A per-tenant `integrations` table (provider, encrypted creds, field mappings) makes each connector configurable.
- **Multi-tenant SaaS:** `org_id` + RLS isolation, per-tenant branding/currency/modules, Stripe Billing for plans, self-serve sign-up that provisions a new `organization`, published OpenAPI spec.

---

## Path to production (checklist)

1. Replace demo RLS with Supabase Auth + `auth.uid()`-scoped policies; link `members.user_id` to `auth.users`.
2. Enforce the `role` field (owner/admin/manager/member/viewer) in policies; build the permissions UI.
3. Add an **audit log** table + triggers (feature deferred above).
4. Ship payments & webhooks (flagship #2), then tax receipts + donor portal (#4).
5. GDPR tooling (consent, export, erase).
6. Move from CDN React + in-browser Babel to a Vite/Next.js build; deploy to Netlify/Vercel with env vars.

---

## Files

- `index.html` — the working NoonOS web app (open in a browser).
- `assets/noonos-logo.svg` — the NoonOS logo (Noon mark + wordmark).
- `NOONOS-PRODUCT-SPEC.md` — this document.
