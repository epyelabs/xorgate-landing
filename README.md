# xorgate-landing

Marketing site for the Xorgate platform, served at `www.xorgate.io`
(dev: `www-dev.xorgate.io`). Plan and design system live in
`xorgate/plans/xorgate-landing-page/` (read `STATUS.md` there first).

Next.js (App Router, `output: "export"`, fully static) + Tailwind v4 +
shadcn/ui, sharing design tokens, font, and components with `xorgate-web`.

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export to out/
npm run typecheck
npm run format
```

Optional `.env` (defaults are the production origins):

```
NEXT_PUBLIC_SITE_URL=https://www.xorgate.io
NEXT_PUBLIC_CONSOLE_URL=https://console.xorgate.io
NEXT_PUBLIC_DOCS_URL=https://docs.xorgate.io
```

## Deploy

GitHub Actions sync `out/` to S3 (CloudFront invalidation is manual):

- push to `main` -> `www-dev.xorgate.io` (`.github/workflows/deploy-dev.yml`)
- publish a release -> `www.xorgate.io` (`.github/workflows/deploy-prod.yml`)

Buckets, CloudFront, and DNS are managed outside this repo. The one-time IAM +
GitHub setup is documented in `deploy-prod.yml`'s header

## Conventions

- Design tokens in `app/global.css` mirror `xorgate-web/src/index.css`; the
  `--brand*` tokens (orange `#FF4500` scale) are landing-only.
- Every page section uses `Section` / `SectionHeading` from
  `components/section.tsx`. One type scale, one accent; see
  `plans/xorgate-landing-page/design.md`.
- Copy must respect the claims guardrails in
  `plans/xorgate-landing-page/content.md`.
