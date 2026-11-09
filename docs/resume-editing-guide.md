# Resume editing guide

Source file: [`resume.md`](./resume.md)

## Before you send to a client

1. Fill in **email, phone, and LinkedIn** in the header (keep them in sync with `.env` / GitHub Actions secrets).
2. Complete the **Education** section—remove the HTML comment and placeholders.
3. Export to PDF (see below).
4. Save as `public/resume/Sulley-Sadick-Resume.pdf`.
5. Set `VITE_RESUME_LINK` to `/Portfolio/resume/Sulley-Sadick-Resume.pdf` locally and in GitHub **Actions secrets**, then redeploy.

## Export to PDF

- **Word / Google Docs:** Paste from `resume.md`, fix headings, then File → Download as PDF.
- **VS Code:** Install a Markdown PDF extension, open `resume.md`, export.
- **CLI (this repo):** `pnpm run resume:pdf` → writes `public/resume/Sulley-Sadick-Resume.pdf`

## Quarterly updates

Add roles, clients, or new projects under **Experience & training** and **Projects**; trim bullets so the exported resume stays one page.
