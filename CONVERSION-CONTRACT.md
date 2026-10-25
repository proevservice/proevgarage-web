# Conversion compatibility — Version 3

Observed in the production DOM and the existing Google Tag Manager workspace on 2026-10-25. No GTM tags, triggers, conversion labels, or settings were published or changed during this work.

## Existing measurement
- Live GTM container: GTM-P7WNQQNH (the other account container is not the one loaded by production).
- Google Ads base tag: AW-17771461581.
- GA4 Google tag: G-1LMMEQBSJY.
- Phone trigger: TechSol - Call 9114; Click URL contains tel:; tag TechSol - Call 82806.
- LINE trigger: TechSol - Line 32582; Click URL matches line.me|lin.ee; tag TechSol - Line 63118.
- Facebook trigger: TechSol - Facebook 23876; Click URL matches facebook.com|m.me; tag TechSol - Facebook 40263.
- Link triggers use Wait for Tags (2000 ms) and Check Validation.
- GTM workspace showed zero pending changes before inspection. Unsaved trigger editor state was discarded; nothing was saved or submitted.

## Website compatibility
Keep one shared GTM loader in RootLayout and its existing NEXT_PUBLIC_GTM_ID environment configuration. Do not add another direct Google Ads/GA4 snippet or parallel custom conversion events for the new contact buttons.

All Version 3 contact actions remain ordinary anchor links with the existing settings destinations:
- tel:098-9794116
- https://line.me/R/ti/p/@869msrge
- https://m.me/proevservice

No preventDefault, router interception, URL shortener, or delayed redirect is added to these external contact actions. The new buttons therefore remain eligible for the current Click URL rules regardless of styling.

The existing /ev-repair advertising landing page and src/lib/tracking.ts are retained without changes. Its existing generate_lead_call, generate_lead_line, generate_lead_message and generate_lead_navigation dataLayer event names stay intact. Do not copy these custom events onto every new CTA: existing Google Ads conversion tags already use link-click triggers.

## Verification boundary
Production script presence, GTM trigger rules, matching CTA destinations, the existing landing page source and preview rendering are checked. No live telephone/chat conversion was fired as a test. DOM compatibility is not proof of Google Ads attribution; validate actual tag firing and deduplication with Tag Assistant and conversion diagnostics before approving production rollout. Consent, ad blockers and campaign attribution can affect recorded results.
