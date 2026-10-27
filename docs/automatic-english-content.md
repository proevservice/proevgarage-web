# Automatic English Facebook content
The existing two-hour Facebook workflow imports selected work and articles first, then translates only new or changed source bodies. Translations are stored in content/translations/en, committed alongside Thai content, and deployed through the existing main/Vercel integration.

## Configuration
Add OPENAI_API_KEY as a GitHub Actions repository secret. Never expose it as a NEXT_PUBLIC variable or add it to source control. The workflow sends only the public source title, summary and post body to https://api.openai.com/v1/responses. It does not send photos, page access tokens or website visitor data. API usage is billed separately by the provider.
Optional repository variable OPENAI_TRANSLATION_MODEL defaults to gpt-4.1-mini. TRANSLATION_MAX_POSTS_PER_RUN is fixed to 10 in the workflow. There are no automatic HTTP retries within a run; failed items retry in the next scheduled run.

## Content lifecycle
- A source-body hash identifies the exact version translated.
- Unchanged posts use cached translations without API calls.
- Existing reviewed translations are seeded and reused.
- A changed body cannot show a previous translation as current.
- Failed translations do not stop the Thai content commit. The existing English pending notice is used until a successful retry.
- Removing the selection tag or deleting a post removes the corresponding cache after a complete successful source scan.
- A post in both collections is translated once and retained until neither collection contains it.
- Structured results are checked for fields, size, remaining Thai prose, altered URLs and newly introduced figures. Output is rendered as plain text.
- Automatic translation can still contain language errors; these checks are not a human factual review.
- Without a configured API key, the system reports pending translation and makes no paid requests.

## Validation
Run node --test scripts/translate-facebook.test.mjs plus the existing Facebook importer tests. The automated QA workflow runs these without external API calls. A live provider check must be completed after the secret is configured before claiming automatic translation is operational.
