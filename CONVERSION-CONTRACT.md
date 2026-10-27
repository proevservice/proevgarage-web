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
- Facebook: earlier production clicks were not inspectable after browser session loss. See the successful Preview test below.
- These are production Version 2 observations, not proof of Preview or Version 3 production behavior.
- Source comparison against main confirms identical tracking utility and GTM loader, identical landing LINKS values and nine matching conversion handlers; no preventDefault or stopPropagation was added to the landing page.
- The controllable website tab displayed Tag Assistant Not Connected while Tag Assistant reported a connected window. Do not count clicks from that disconnected tab as a failed conversion. Verify the website-side connected indicator before each test.

## Google Ads account observation — 2026-10-27 (Asia/Bangkok)
Read-only inspection of the account's All conversions table, date range 27 September–26 October 2026:
- TechSol - Facebook 59474: website, active, primary, count one, 30-day click window; All conversions 263.50.
- TechSol - Line 52820: website, active, secondary, count one, 30-day click window; All conversions 264.99.
- TechSol - Call 1563: website, active, primary, count one, 30-day click window; All conversions 262.49.
These action names differ from the GTM tag names. On 2026-10-27, the Facebook action's Google Tag Manager installation panel showed conversion ID 17771461581 and label pPgsCNC1yekbEM33i5pC, matching the previously inspected GTM Facebook tag. Facebook mapping is confirmed; Call and LINE labels still need matching. Historical counts do not prove receipt or attribution of an individual debug click. Fractional counts are reported as displayed; Facebook details show data-driven attribution over Google paid channels; Call and LINE attribution settings have not been inspected. No conversion, campaign, budget or bidding settings were changed.
Earlier Facebook testing was interrupted by tool session resets; the subsequent Preview test below provides one-click evidence.

## Preview environment correction — 2026-10-27 (Asia/Bangkok)
- Vercel originally had NEXT_PUBLIC_GTM_ID scoped only to Production. Added a separate Preview config value GTM-P7WNQQNH; the existing Production variable was left unchanged.
- Owner completed Vercel reauthentication. Preview redeployment dpl_EwYNdnpVWDPLQJd6xdMLsGhrL6GK reached Ready, from source 892ea64313e96c00dca62cc7c0c4f21b506bfc89.
- Verified the branch Preview /ev-repair DOM contains one GTM loader for GTM-P7WNQQNH and Google tag scripts for G-1LMMEQBSJY and AW-17771461581.
- Tag Assistant connected to the Preview and showed Conversion Linker and both Google tags each firing once on the observed page load. Contact conversion tests were subsequently completed in the connected Preview session; see below.
- The connected popup is not exposed as a controllable browser tab. Do not substitute clicks in an unrelated tab as proof of debug results.
- SiteFrame now explicitly restores legacyHeader/legacyFooter on /ev-repair and /ev-repair/; the repaired Preview visibly renders these components.

## Connected Preview contact test — 2026-10-27, approximately 10:40 Asia/Bangkok
Owner confirmed one click each on Facebook, phone and LINE in the connected Preview window. Tag Assistant showed:
- Event 6 generate_lead_message: no GTM tags fired. Event 7 gtm.linkClick: Facebook 40263 successful.
- Event 8 generate_lead_call: no GTM tags fired. Event 9 gtm.linkClick: Call 82806 successful.
- Event 11 generate_lead_line: no GTM tags fired. Event 12 gtm.linkClick: Line 63118 successful.
- Session summary: one firing each for Facebook, Call and Line; one each for Conversion Linker and both base Google tags. No duplicate Ads firing observed for these three clicks.
- Conversion ID 17771461581; Call label mJOYCJv4yukbEM33i5pC; LINE label Rbw6CPrWyukbEM33i5pC; Facebook label pPgsCNC1yekbEM33i5pC.
- Google Ads LINE installation instructions matched the tested LINE ID/label exactly; Facebook ID/label matched in the previous inspection.

## Remaining verification boundary
Successful debug execution and active historical Ads actions do not prove attribution of these particular test clicks. Preserve campaign settings and LINE's existing secondary status. Check the final production deployment, then monitor real attributed lead counts. Before publishing, check CI for the current head and retain the Version 2 rollback branch.
