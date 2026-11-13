# Editorial UI preview — internal review

Branch: `feature/editorial-ui-preview`. Based on production commit `6d66f222bbc27245360e5ce4bb6b3d5ac4dffeb7`.

## Scope
Home page rebuilt with a photographic hero, dark header, warm gold accents, large serif headings, maker story, collection, wedding package feature, process, testimonial and enquiry. Secondary pages keep their existing content with shared navigation, footer and visual theme. Existing prices, images, form consent and service loaders are preserved. No TABI branding, images or testimonial copy is included. Reference: https://tabicakes.co.uk/.

## Test steps
1. Open the Cloudflare branch preview. Confirm DESIGN PREVIEW appears at the top.
2. Check Home, Meet Janu, Gallery, Packages, Flavours and Enquire at desktop and phone widths.
3. Open/close the mobile menu using touch and keyboard, including Escape.
4. Review text, photograph crops, prices and package links; submit requested edits through chat.
5. Test first-visit cookie banner, reject, customise, saved choice and withdrawal. Optional enquiry form must remain blocked until allowed. Do not submit real enquiry data during tests.
6. Test gallery image opening/closing, brochure download and direct email/telephone alternatives.

## Isolation and release
Only this branch may be updated. Do not merge into main, change Cloudflare production branch, DNS or custom domains without explicit owner approval. Production remains unchanged. The preview is link-accessible, not password-protected; noindex headers/meta discourage indexing but are not access control. Do not put private customer data in it.

Before any future release, remove preview-only noindex headers/meta and preview notices on the release branch, reinstate production robots/sitemap settings, recheck SEO and consent, and ask the owner to approve the concrete preview. Never deploy this test branch directly to the production domain.

## Design guidance
Used the requested nextlevelbuilder/ui-ux-pro-max-skill guidance and design-system search. Applied its hierarchy, visible focus, contrast, touch-target, responsive and reduced-motion rules. Its generic pink soft-UI suggestion did not match the observed reference; chose a dark editorial design with warm gold and serif headings instead.

## Text and hero iteration
Aligned headings to warm ivory, body text to a lighter warm neutral and actions to gold; testimonial section now keeps the dark theme. Light consent panels retain dark text. Added three cake-photo hero slides with a crossfade, previous/next, pause/play, reduced-motion default pause, and pause on hover, focus and hidden tabs. Manual selection pauses autoplay. Images remain local. SVG arrows replace missing font glyphs.

## Soft backdrop iteration
Home story, kind-words and final enquiry now use low-opacity decorative wedding-cake photographs selected from the site's gallery. Hero slides use gallery wedding cakes too. Native anchor scrolling and lightweight section reveals provide motion without taking over mouse/touch scrolling; reduced-motion disables both. Removed the standalone tilted menuslb.webp photo from Menu, retaining its top photo strip and flavour content.
