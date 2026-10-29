# TrueHerbs scheduled news publishing

Configured 2026-10-29 at Ivan's request.

## Destination and schedule

- Repository: Xxplosiive/trueherbs-preview, branch main.
- Public preview: https://xxplosiive.github.io/trueherbs-preview/trueherbs/
- Existing ChatGPT automation: 6ae2c2405f508191b82a8b0b6a35f070.
- One article per run, Monday / Wednesday / Friday mornings, Asia/Taipei.
- This automation is separate from the existing daily industry report.
- Publication is authorised for this preview site. Do not change the production domain, DNS or noindex configuration.

## Mandatory layout contract for every scheduled article

All Monday/Wednesday/Friday posts MUST use the same reusable site-wide typography, link styling and interaction contract as existing articles. Read the latest `/editorial-system-20261029.css` and `trueherbs/site.js` before each publication. The shared stylesheet is installed by site.js on each route. Do not bypass it, remove site.js from new pages, or invent a new visual design or article-specific font role. Existing article/news shells must preserve `trueherbs-page article-page design-b editorial-pilot-page`, `.pilot-detail-hero`, `.pilot-reading`, headings, lead, category/date labels, source references, related links, footer and responsive behaviour. The visual system specifies Noto Serif TC for all H1-H4 titles and Noto Sans TC for body, list items, metadata and controls. Continue using licensed, verified per-article glyph coverage if new text requires it; such font subsets MUST use the same Noto typeface, and MUST NOT redefine the typography hierarchy, colours, margins or link behaviour. The 2026-10-29 news-specific font file is for glyph coverage only, not a template for future font overrides.

Every new article must have exactly one meaningful H1, predictable H2 sections, H3 subheads if needed, a short summary, visible source links, consistent paragraph width and line spacing, and proper mobile stacking. All diagonal north-east/similar arrows (↗, ↖, ⇗, ➚, ⤴) are prohibited in visible links, buttons, card CTAs and source links. Replace them with normal descriptive link text; the shared styling provides contrasting hover, active and keyboard focus states. Keep actual destinations, back links and meaningful accessible labels. The global site.js removes legacy diagonal arrow decorations on previously exported pages; do not rely on JS cleanup to excuse inserting them in new HTML.

Before every commit, explicitly compare a new article with one previously published industry-insights article and one industry-news article for role-consistent H1/H2/H3, body typeface, 18px desktop/17px mobile reading copy, source labels, article cards, link feedback and mobile overflow. Recheck the shared stylesheet is present and loadable on the new route. Fail publication rather than silently shipping an incompatible new font or layout. This obligation applies to all future scheduled runs, not just this first update.

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

## Required editorial value: analyse before writing

Every article must earn its place through a specific, evidence-based business insight, not a rewritten press release. Before drafting, analyse the customer need and buying situation, paying customer, competing alternatives, and the causal path from the news to revenue, repeat visits, conversion, capacity utilisation or costs. Challenge the proposed opportunity with at least one counterargument. Reject weak topics rather than manufacture profit claims.

Translate the analysis into natural public-facing prose with:
- What actually happened and what is confirmed.
- The customer need or business problem it reveals.
- Who could benefit, who pays and why.
- A concrete way to improve profit, including added labour, acquisition cost, commissions, fulfilment cost and capacity constraints where relevant. Distinguish revenue from contribution and net profit.
- A small, low-cost test for a Taiwanese beauty or fitness business, with a measurable outcome and a stop/change condition.
- Evidence limits and when the idea may not fit.

Use hypothetical calculations only when they help and explicitly label all assumed values; never present them as actual brand results or guaranteed returns. Do not print internal framework labels such as JTBD, Jobs to Be Done, four forces or internal strategy vocabulary in public articles. Avoid emoji, formulaic praise and forced product promotion. Address readers as 您. Preserve Traditional Chinese and the site's calm professional voice.
