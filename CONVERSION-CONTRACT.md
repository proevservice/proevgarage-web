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

The /ev-repair advertising landing route is retained. Its copy and diagnostic data attributes have changed; its nine CTA destinations, lead types, event names and click locations are preserved. src/lib/tracking.ts and src/components/GoogleTagManager.tsx are byte-identical to main. Its existing generate_lead_call, generate_lead_line, generate_lead_message and generate_lead_navigation dataLayer event names stay intact. Do not copy these custom events onto every new CTA: existing Google Ads conversion tags already use link-click triggers.

## Verification evidence — 2026-10-26 (Asia/Bangkok)
- Production Tag Assistant found GTM-P7WNQQNH, G-1LMMEQBSJY and AW-17771461581. Base Google tags and Conversion Linker each fired once per observed page load.
- Phone: owner confirmed three clicks; three gtm.linkClick events and three Call tag firings were observed. Each selected click event showed the Call tag successful. This round showed no extra Call tag firing relative to the reported clicks.
- LINE: owner confirmed one click in the connected debug window. One generate_lead_line and one gtm.linkClick event were observed. The LINE Ads tag fired once and showed successful on gtm.linkClick; no tags fired on generate_lead_line.
- Facebook: clicks were reported, but browser tab access was lost before results could be inspected. NOT verified.
- These are production Version 2 observations, not proof of Preview or Version 3 production behavior.
- Source comparison against main confirms identical tracking utility and GTM loader, identical landing LINKS values and nine matching conversion handlers; no preventDefault or stopPropagation was added to the landing page.
- The controllable website tab displayed Tag Assistant Not Connected while Tag Assistant reported a connected window. Do not count clicks from that disconnected tab as a failed conversion. Verify the website-side connected indicator before each test.

## Release gate still open
Successful tag execution is not proof of Google Ads receipt, counting or attribution. Facebook firing/deduplication and Google Ads diagnostics remain outstanding. Browser session loss is not evidence of a website code defect. Do not add duplicate tracking snippets or merge/publish based on source compatibility alone.
