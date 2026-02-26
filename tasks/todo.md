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

## Image Optimization (2026-02-26)
- [x] Inventory image assets and in-page references
- [x] Convert homepage/camp/rooms image assets to WebP
- [x] Update HTML references to WebP in `index.html` and `villa concept 2.html`
- [x] Verify all referenced image files exist
- [x] Measure transfer-size reduction and estimate load-time improvement

## REVIEW (Image Optimization)
- Converted 7 photos from PNG/JPG to WebP (kept originals as backup files).
- Updated all image references in primary and secondary HTML files to `.webp`.
- Verified no remaining `.png`/`.jpg` references for these photos and all referenced files resolve on disk.
- Payload change for the converted photo set:
  - before: 34,961,317 bytes
  - after: 1,532,274 bytes
  - saved: 33,429,043 bytes (95.62% reduction)

## Verification Patch (2026-02-26)
- [x] Fix skip-link conflict with SPA hash routing
- [x] Make form success confirmation deterministic on return URL
- [x] Remove fragment URLs from sitemap
- [x] Align OG image dimensions with actual image asset
- [x] Re-verify sitemap validity and patched selectors/fields

## REVIEW (Verification Patch)
- `Skip to content` now uses a JS handler that focuses the active `<main>` without mutating URL hash, preventing SPA route resets.
- FormSubmit return URL now appends `?submitted=1#reserve`; confirmation logic checks `URLSearchParams(...).has('submitted')` with referrer fallback.
- Sitemap now lists only the canonical root URL (no fragment locations).
- Open Graph dimensions updated to match `fightersparring.webp` (`2752x1536`).
- Verification run: `xmllint --noout sitemap.xml` passes and target fields/selectors are present in `index.html`.

## Verification Follow-up (2026-02-26)
- [x] Fix reduced-motion gap in parallax JS guard
- [x] Ensure HTML revalidation cache header also applies to `/`
- [x] Validate JSON and run browser smoke check

## REVIEW (Verification Follow-up)
- `index.html` parallax initialization now requires both desktop pointer and no reduced-motion preference.
- `vercel.json` cache headers now target `/` directly in addition to `*.html`; extension patterns are escaped for clarity.
- Validation run: `jq . vercel.json` passes and Playwright smoke load reported no console errors.
