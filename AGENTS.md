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

## Verification and publishing
Check local links and media, HTML structure, desktop/mobile layout where browser preview is available, image descriptions, and any updated price summaries. Use preview deployment before changing the live domain. Report whether work is local, committed, pushed, previewed, or live accurately.

## Recovery provenance
The initial website files are recovered from the published site using the Cloudflare deployment's 214-file inventory, not from original Git history. Cloudflare response transformations may be present in recovered HTML. Never claim this is a complete copy of unpublished source or old commit history.
