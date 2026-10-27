# Facebook-selected articles
- Only Page posts with the exact #บทความ tag appear under /blog. Work selection remains #ผลงานPROEV.
- One post can be in both collections. Removing one tag removes only that collection entry. Shared photos stay until no selected collection needs them.
- Full source text, all gallery photos, created/updated dates, video source links and Facebook permalink are preserved. Import must finish pagination and media fetch before replacing or removing entries.
- Old six Markdown articles and their CMS collection are removed. Old article URLs return 404 and disappear from the sitemap, without unrelated redirects.
- Metadata and BlogPosting schema use the imported source. No new editorial copy, invented author qualifications, ratings or review claims.
- Scheduled automation still depends on existing FACEBOOK_SYNC_ENABLED and valid Meta Page credentials. This change does not claim a working long-lived token or enable the schedule.
- A one-off preview import is attempted on this branch when importer code changes and credentials are present. Missing credentials are reported as a skipped import, not a successful live sync.
