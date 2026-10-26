# Version 3 search and answer readiness
Retains the approved Version 3 visual design, services/repair-gallery structure, lead URLs, GTM loader, tracking utility and advertising landing.

## Implemented
- Canonical business identity with AutoRepair, correct local imagery, address, phone, map, hours and service catalogue. No invented ratings, prices, new branch, qualifications or coordinates.
- Visible home location/hours/service facts and brand navigation; service answers generated from the same content as FAQ structured data.
- Service, article, repair case and breadcrumb relationships linking to the same business ID; article service links and case-to-service links.
- Canonical www URLs and share metadata on detail pages, valid local article thumbnails.
- robots.txt permits public search crawling on production, including OAI-SearchBot. Review routes remain excluded. Preview remains noindex and disallows all crawling.
- Existing sitemap remains the canonical public page inventory, with original source dates. No synthetic last-modified timestamps.

## Validation
The SEO workflow builds both production and preview, then checks every sitemap page: response, unique title, canonical, index guard, business facts, visible FAQ agreement, JSON-LD relationships, source cases and schema image availability. Existing content/browser workflows remain.

## Production follow-up
This branch is a review preview. Publishing to www.proevgarage.com is required before discovery changes take effect. After release: submit/inspect sitemap in Search Console, verify representative live pages, check business address/hours against current Google Business Profile, and validate real conversion firing with Tag Assistant. Do not publish a future workshop location until the owner confirms it is open and its public details are correct.

SEO and readable factual content improve eligibility; no promise of ranking, rich-result presentation or AI recommendation. FAQ markup is descriptive, not a guarantee of Google FAQ rich results. No llms.txt or bot-targeted keyword stuffing added.
Sources: https://developers.google.com/search/docs/fundamentals/ai-optimization-guide and https://developers.openai.com/api/docs/bots
