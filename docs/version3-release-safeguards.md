# Version 3 release safeguards

Status: RELEASED with owner approval. PR #2 merged on 2026-10-27 at 10:46:29 Asia/Bangkok.
- Release merge commit: 39e0b3fd156c8196f75c4973ebe39ca23a3f5424.
- Verified successful production deployment: dpl_dPXgSiWNyNg4wHHAbYfzosxcmCCq.
- Live: https://www.proevgarage.com.

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
- Production workflow now runs from main and checks out/pushes main.
- Version 3 workflow checks out and pushes `github.ref_name`, restricted to main and codex/website-version3. Scheduled main runs update main; manual preview runs update only preview. Cron remains every two hours.
- Verify a successful post-release main sync and the resulting Vercel production deployment; committing content alone is not proof it reached the live site.
- Manual apply test: https://github.com/proevservice/proevgarage-web/actions/runs/40333876947 — success; 20 tests passed, 3 work posts and 1 article synchronized.
- Tags select content: #ผลงานPROEV for work, #บทความ for articles. Edits and tag removal propagate on the next successful complete sync.
- The workflow does not merge application PRs; new content commits to main are handled by the existing Vercel Git deployment integration.
- Existing Page credentials can still be revoked or lose data access; monitor failed Actions runs.

## Release verification
- Connected Preview contact test: one click each for Facebook/phone/LINE produced exactly one successful corresponding Ads tag firing. Custom lead events fired no GTM tags. All three IDs/labels match active Google Ads actions; no campaign/budget/bidding or conversion settings were changed.
- Live checks: Version 3 homepage; /ev-repair canonical and index/follow; original nine CTA destinations/types/locations; GTM, GA4 and Ads scripts; public robots and sitemap; /blog/ev-ac-problems redirects to /problems/ac-not-cold preserving UTM/GCLID; removed /blog/newbie-mistakes renders the 404 experience.
- Post-release main Facebook run https://github.com/proevservice/proevgarage-web/actions/runs/40446116790 succeeded; 20 tests passed, work=3 and articles=1. Live work/blog show the corresponding 3 cases and 1 article. No content diff was produced in this run, so it did not create an additional deployment; verify a future changed-content commit through to its Vercel deployment.
- Full 14/28-day Ads/GA4/Search Console baselines were not captured; do not claim baseline comparisons or individual debug-click attribution. Existing rollback branch remains available.
