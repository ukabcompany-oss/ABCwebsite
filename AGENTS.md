# A Baker's Confession website

## Project
Repository: ukabcompany-oss/ABCwebsite. Cloudflare Pages project: abcwebsite, connected to main with automatic deployments enabled. Preview/production hostname: https://abcwebsite-e11.pages.dev/. Custom domains: abakersconfession.co.uk and www.abakersconfession.co.uk (activation requested 2026-11-12; verify current status before claiming they are active). The previous project a-bakers-confession is retained as a recovery reference and must not receive new edits.

## Editing through chat
The owner can request changes in plain English and attach photos. Handle changes by editing the repository; never put a public, unauthenticated content-editing endpoint on the website.

- Packages: package.html; package summaries and starting prices also appear on index.html. Keep relevant summaries consistent.
- Menu: menu.html. It contains flavour categories, descriptions, and photographs.
- Photos: images/ and its subfolders. Store new photos here, use descriptive filenames and alt text, and update the relevant HTML references.
- Package brochure: packages/pdf/Wedding-Package-2025.pdf. Flag when a requested package change also requires a brochure update; do not silently leave conflicting prices.
- Shared styles: style/. Navigation scripts: js/nav.js.

Support adding, modifying, reordering, and removing menu items, package entries, descriptions, prices, and photo references. For a photo removal, first remove its page reference; delete the file only if no other page uses it. Keep changes recoverable in Git history. Clarify ambiguous item names or unspecified prices. Do not invent allergen, dietary, availability, delivery, ingredient, or pricing claims.

Preserve the branding and responsive layout. Keep public content in the HTML so crawlers can read it without running JavaScript. Avoid unnecessary frameworks or paid services.

## Cookie consent
All public HTML pages load js/cookie-consent.js and style/cookie-consent.css. Optional service loaders live only in that script. Do not add direct Google Tag Manager, MailerLite, Cloudflare browser analytics, or third-party video/form scripts to page HTML. Do not restore the GTM noscript iframe: it bypasses consent. Tally and YouTube iframes must use data-consent-src (no src before opt-in), a data-consent-category of forms or media, and an accessible placeholder with a direct contact alternative. Use the same pattern for new optional embeds. The existing GTM container loads only when both analytics and marketing are allowed because its internal tag inventory has not been audited.

Keep cookie-declaration.html and the service descriptions up to date. Increment the consent VERSION if purposes or services change materially. Cookie settings must remain available on every page; reject and accept must be equally easy. Test first visit, reject, category-only selection, accept, persistence and withdrawal/reload before publishing changes. This custom mechanism is not a certified CMP or an automated cookie scanner.

## Verification and publishing
Check local links and media, HTML structure, desktop/mobile layout where browser preview is available, image descriptions, and any updated price summaries. Use preview deployment before changing the live domain. Report whether work is local, committed, pushed, previewed, or live accurately.

## Recovery provenance
The initial website files are recovered from the published site using the Cloudflare deployment's 214-file inventory, not from original Git history. Cloudflare response transformations may be present in recovered HTML. Never claim this is a complete copy of unpublished source or old commit history.
