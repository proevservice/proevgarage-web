# Facebook work import: owner-selected posts

Only posts containing the full hashtag #?????PROEV are imported. Untagged posts are never selected by keywords or AI.

- Add the hashtag to any old or new Page post to add it to the website.
- Edit that same Facebook post to update the website text and main image. Stable post IDs prevent duplicates.
- Remove the hashtag, or delete the original post, to remove its imported work page and downloaded main image after a complete sync. The website index and sitemap read the remaining work files. Search engines may retain older results until they recrawl.
- Tag matching ignores English letter case but rejects suffixes such as PROEVextra. Use the exact hashtag without spaces.
- The sync reads all available post pages, so edits to older posts are picked up. A pagination or image-download failure stops the sync before changing published files.
- Only the main image is supported; full albums and video hosting are not imported.

## Activation status
The Page API was tested in the browser. The local workflow is not deployed or enabled in GitHub yet, and the production website has not changed.

App ID: 1899374998140445
Page ID: 726316847241779

Configure repository secrets FACEBOOK_PAGE_ID and FACEBOOK_PAGE_ACCESS_TOKEN (Page token, not User token). Set FACEBOOK_GRAPH_VERSION to the app-supported API version. After reviewing a manual import and connecting deployment, set FACEBOOK_SYNC_ENABLED=true. The workflow runs every two hours; GitHub scheduling can be delayed. The website reflects changes only after a successful deployment.

Never paste a token in chat, source code, or a browser-facing environment variable.

Tests: node --test scripts/facebook-tag.test.mjs scripts/facebook-sync-lifecycle.test.mjs scripts/sync-facebook.test.mjs
