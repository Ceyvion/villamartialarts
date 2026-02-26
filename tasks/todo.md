# TODO
- [x] Confirm root-cause for Vercel 404 in this repo
- [x] Re-implement fix manually by adding a root entrypoint
- [x] Verify root page serves locally
- [x] Document review and deployment notes

## SEO Sprint
- [x] Research competitors and local search landscape around Toul Tom Poung / Chamkar Mon
- [x] Create keyword-by-area target map
- [x] Implement on-page SEO upgrades in `index.html`
- [x] Add technical SEO baseline files (`robots.txt`)
- [x] Verify rendering and deploy readiness

## SEO Round 2 (2026-02-26)
- [x] Deepen competitor analysis for Phnom Penh martial arts + stay intent
- [x] Remove visible keyword-strategy hints from landing-page copy
- [x] Improve on-page SEO elements (metadata, structured data, semantic/internal links)
- [x] Re-verify rendered content and document outcomes

# REVIEW
- Root cause: tracked `HEAD` had no `index.html` (only `IMG_9760.PNG` and `villa concept 2.html`), so Vercel had no default route target for `/` and returned `404: NOT_FOUND`.
- Fix applied: manually re-implemented by copying `villa concept 2.html` to root `index.html`.
- Verification: served locally with `python3 -m http.server` and confirmed `/` returns `HTTP/1.0 200 OK` plus `<!DOCTYPE html>`.
- Deployment note: redeploy this commit in Vercel. If 404 persists, verify Vercel Project `Root Directory` is `/` (repo root).
- SEO update: homepage now targets Toul Tom Poung / Chamkar Mon / BKK1 search intent with location-specific content, local FAQ, richer metadata, and Hostel + FAQ structured data.
- SEO verification: confirmed updated title, description, Phnom Penh location section, and FAQ section are present in served HTML.

## REVIEW (SEO Round 2)
- Competitor deep-dive added to `tasks/seo-keyword-map.md` with content/SEO gaps from Kingdom Fight Gym, Spartans Boxing Club, KIRI Jiu Jitsu, and Hostelworld listing patterns.
- Front-end keyword hint copy removed from location cards; replaced with user-facing neighborhood/access guidance.
- Technical SEO upgrades applied in `index.html`:
  - canonical + favicon + richer Open Graph tags
  - expanded structured data (`Hostel`, `SportsActivityLocation`, existing `FAQPage`)
  - crawl-friendly internal links now include `href` values alongside JS navigation
  - hash-aware navigation for direct URL access (`#home`, `#camp`, `#rooms`, `#reserve`)
  - no-JS fallback improved by default-visible page content and non-blocking preloader behavior
- Verification:
  - local server checks confirm updated headings/metadata and removal of old keyword-hint phrases
  - Playwright render pass confirms updated copy is visible and no console errors remain
