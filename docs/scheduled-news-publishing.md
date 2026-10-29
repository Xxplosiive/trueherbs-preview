# TrueHerbs scheduled news publishing

Configured 2026-10-29 at Ivan's request.

## Destination and schedule

- Repository: Xxplosiive/trueherbs-preview, branch main.
- Public preview: https://xxplosiive.github.io/trueherbs-preview/trueherbs/
- Existing ChatGPT automation: 6ae2c2405f508191b82a8b0b6a35f070.
- One article per run, Monday / Wednesday / Friday mornings, Asia/Taipei.
- This automation is separate from the existing daily industry report.
- Publication is authorised for this preview site. Do not change the production domain, DNS or noindex configuration.

## Each run

1. Fetch the latest repository tree and any applicable AGENTS.md. Inspect current news pages and titles to avoid duplicate events.
2. Research a timely beauty or fitness industry development, using accessible primary sources. Verify the original publication date separately from event dates. If reliable news cannot be verified, report the gap instead of inventing it.
3. Write an original Traditional Chinese article useful to Taiwanese business owners: accurate headline, summary, clear sections, verified facts, explicitly identified business observations, practical next step and dated source links. Do not copy source articles, invent quotes, claim medical benefits or imply a physician reviewed the article.
4. Add the article at trueherbs/industry-news/<unique-english-slug>/index.html. Reuse the current site's article shell, CSS, accessible navigation and footer. Set title, description and social metadata to the new content. Preserve noindex,nofollow,noarchive and existing CSP. Do not carry over the template article's title, dates, sources, image caption or article-specific metadata.
5. Add a visible card/link to trueherbs/industry-news/index.html, including the right category filter option and updated article count. Preserve existing rows and links. Leave hidden homepage sections hidden.
6. New text must use the existing Noto fonts with actual glyph coverage; do not assume a page-specific font subset includes new characters. Use existing broad font coverage resources or generate a verified subset. Only use company-owned or licensed assets; illustrative images must be accurately labelled.
7. Validate generated HTML, one H1, source links, internal assets, category filtering, mobile layout and absence of leftover template claims. If a required check cannot be performed, report it accurately. Do not publish malformed pages.
8. Commit related changes together using the latest tree and a non-forced branch update. Re-read and rebase on concurrent changes; never overwrite unrelated work. Use the connected GitHub tools, not credentials in repository files.
9. Check GitHub Pages deployment for the exact new commit, then fetch the live article and listing to verify the title, sources and discoverable article link. A successful commit alone does not establish live publication.
10. Report the live article URL, commit, deployment status and any untested items. If permissions, connection, source checks or deployment block publication, report the actual blocker and retain the draft; never claim it went live.

## Current hosting limitations

The repository currently holds a static preview export rather than the complete original application source. Do not invent a build command or claim local Mac source is synchronised. Keep the preview's empty sitemap and noindex policy until separately authorised to change indexing. When the company supplies the canonical source/CMS, migrate this workflow so a later export does not overwrite published articles.

## First-run verification

Adding this runbook tests repository write access and the existing Pages deployment path. It does not demonstrate that a researched article has completed the entire scheduled publishing cycle. The first scheduled article must verify that cycle and report the result.
