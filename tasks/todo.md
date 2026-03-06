# TODO
- [ ] Audit current route/indexing blockers and confirm scope
- [ ] Replace hash-based pseudo-routing with crawlable static routes
- [ ] Extract shared CSS/JS into cacheable assets
- [ ] Remove or defer render-blocking behaviors that hurt LCP
- [ ] Add route-specific metadata, canonicals, and structured data
- [ ] Expand sitemap and verify robots/caching/404 behavior
- [ ] Run local route, metadata, and browser smoke verification

## SEO + Performance Upgrade (2026-03-06)
- [x] Audit current route/indexing blockers and confirm scope
- [x] Replace hash-based pseudo-routing with crawlable static routes
- [x] Extract shared CSS/JS into cacheable assets
- [x] Remove or defer render-blocking behaviors that hurt LCP
- [x] Add route-specific metadata, canonicals, and structured data
- [x] Expand sitemap and verify robots/caching/404 behavior
- [x] Run local route, metadata, and browser smoke verification

## UI Live Test (2026-03-06)
- [x] Confirm Playwright prerequisite availability
- [x] Launch local server on a clean port
- [x] Check desktop navigation and route rendering
- [x] Check mobile navigation and sticky actions
- [x] Smoke-test booking form behavior
- [x] Record findings and verification notes

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

## REVIEW (SEO + Performance Upgrade, 2026-03-06)
- Replaced the old hash-driven single-file pseudo-SPA with crawlable static routes: `/`, `/camp/`, `/rooms/`, and `/reserve/`.
- Extracted shared CSS/JS to versioned assets for immutable caching and reduced the homepage HTML from 101,538 bytes to 21,025 bytes.
- Removed the old preloader/cursor/parallax-heavy setup from the critical path and converted hero delivery to real `<img>` elements with preload/fetch priority where needed.
- Added route-specific titles, canonicals, Open Graph metadata, and page-specific structured data, plus expanded `sitemap.xml` to 4 canonical URLs.
- Validation:
  - `jq . vercel.json` passes
  - `xmllint --noout sitemap.xml` passes
  - local route fetch checks confirm each page returns the expected title/canonical and shared assets resolve

## REVIEW (UI Live Test, 2026-03-06)
- Live-tested in a real Playwright-driven Chrome session against a local server on `http://127.0.0.1:4193`.
- Verified desktop rendering for `/`, `/camp/`, `/rooms/`, and `/reserve/`, including visible nav and main content on each route.
- Verified mobile behavior:
  - hamburger menu opens correctly
  - sticky booking bar appears on the homepage
  - WhatsApp floating action remains visible
  - reserve page submit button is visible on mobile
- Verified reserve flow without sending a real booking:
  - form fields accept input
  - departure date minimum updates from selected arrival date
  - `?submitted=1` correctly hides the form and shows confirmation state
- Issue found and fixed during testing:
  - over-aggressive deferred rendering/spacing created awkward blank space under subpage heroes, especially on reserve
  - removed the deferred paint optimization and tightened post-hero spacing; reserve desktop now pulls the booking card up into the hero section
- Browser runtime result after fixes: no console errors or warnings reported during the smoke pass.
