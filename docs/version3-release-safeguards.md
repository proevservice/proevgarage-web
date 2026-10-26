# Version 3 release safeguards

Status: PREVIEW ONLY. Do not merge PR #2 until the owner approves publication.

## Rollback
- Production baseline commit: 4bd10e398462b1028c5e079956a2d1033b3315f7
- Preserved branch: archive/version2-before-version3-2026-10-26
- Production origin: https://www.proevgarage.com
- Ad landing path remains /ev-repair.
- On a launch regression, restore the known-good Vercel production deployment after owner authorization. A branch backup alone does not restore Vercel environment variables or platform settings.

## Legacy URL decisions
- /blog/ev-ac-problems -> /problems/ac-not-cold (308)
- /blog/ev-battery-degradation-signs -> /problems/battery-soc (308)
- /blog/urgent-warning-signs -> /problems (308; consolidated symptoms)
- /blog/daily-charging-fact, /blog/newbie-mistakes and /blog/second-hand-ev-check remain real 404s with navigation. No equivalent approved content exists. The owner requested removal of legacy posts.
- Do not redirect removed pages indiscriminately to the homepage.
- Automated checks verify single-hop targets and preservation of UTM/GCLID query parameters.
- Guidance: https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes

## Tracking
- Keep the existing GTM loader and NEXT_PUBLIC_GTM_ID.
- Original nine landing CTA destinations, lead types, event names and click locations are covered by isolated browser checks.
- Do not count isolated tests as proof of receipt or attribution in Google Ads.
- Verify published GTM/GA4/Ads firing with Tag Assistant; resolve duplicate link-click/custom-event triggers before release.
- Do not change campaigns, budgets or bidding during the website rollout.

## Baseline and monitoring
Actual Ads, GA4 and Search Console metrics have NOT been retrieved. No baseline numbers are claimed.
Before launch, record the preceding 14 and 28 days: spend, clicks, impressions, CTR, CPC, conversions, conversion rate and cost per conversion (by campaign and conversion action), GA4 landing-page sessions and leads, Search Console organic clicks/impressions and indexed pages. Compare equivalent weekdays and separate major campaign changes.
At launch, record the production deployment ID, time in Asia/Bangkok and source commit.
After launch, check production robots/canonical/sitemap, old URL redirects, contact destinations, form/lead events, browser errors and 404s. Review Ads lead counts and cost per lead against the baseline daily during the first week.

## Facebook sync
Enabled with owner approval on 2026-10-26. Main commit 763501b507f6187148ff0157be541269ad845929 changes only .github/workflows/facebook-sync.yml; the production application remains Version 2.
- Cron: `17 */2 * * *` (UTC), every two hours. GitHub may delay scheduled runs.
- Checkout and push target are explicitly `codex/website-version3`; content is never pushed to main by this workflow.
- Manual apply test: https://github.com/proevservice/proevgarage-web/actions/runs/40333876947 — success; 20 tests passed, 3 work posts and 1 article synchronized.
- Tags select content: #ผลงานPROEV for work, #บทความ for articles. Edits and tag removal propagate on the next successful complete sync.
- The workflow does not merge or publish the Version 3 application.
- Existing Page credentials can still be revoked or lose data access; monitor failed Actions runs.
