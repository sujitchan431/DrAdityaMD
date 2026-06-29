# Blog SEO + AEO Playbook

How every blog post on dradityamd.com is written to (a) rank on Google **search**
and (b) get **cited by AI answer engines** (Google AI Overviews, ChatGPT, Perplexity,
Gemini). Follow this whether a human writes the post or the auto-generator does.

- **SEO** = be findable in the classic ten blue links.
- **AEO** (Answer Engine Optimization) = be the source an AI quotes when it answers a
  patient's question. AEO is how you reach patients who never click a link.

The pipeline already enforces most of this. The generator is
`.github/scripts/generate-blog.mjs`; schema lives in `src/components/schema/`.

---

## 1. One post = one keyword cluster

Each post targets **one primary keyword** plus a handful of **secondary / long-tail**
terms. Don't write "about diabetes" — write for `diabetic retinopathy symptoms` and
support it with `diabetes eye damage`, `prevent diabetic retinopathy`, etc.

The primary keyword MUST appear in:

- the `title` and `metaTitle`
- the `description` (meta description)
- the **first sentence** of the body
- at least one **H2**
- the URL slug (it already is — slug derives from the topic)

Add a local modifier where natural (`...in Navi Mumbai`, `...for Indians`) — local
intent converts into appointments. Keyword targets live in the `TOPIC_POOL` array in
the generator; add new clusters there.

## 2. Answer-first writing (this is the AEO unlock)

AI answer engines lift **self-contained, direct answers**. So:

- **Intro = the answer.** First paragraph (40–60 words) directly and completely
  answers the post's main question. No "In today's fast-paced world…" preamble.
- **"## Key Takeaways"** bullet box right after the intro (4–6 bullets).
- **H2s are real questions** people type/ask: *What causes…?*, *How do I…?*,
  *When should I see a doctor?* At least 4 question-style H2s per post.
- **FAQ block of 5 Q&As**, each answer answer-first and self-contained (40–60 words).
  This feeds `FAQPage` schema → rich results + AI citations.

If a snippet of the post can be quoted with zero surrounding context and still make
sense, it's AEO-ready.

## 3. Structure & depth

- **1500–1800 words** of genuinely useful content (thin posts don't rank).
- Short paragraphs (2–3 sentences), bullet lists, **at least one comparison table**.
- Bold the key terms. Use H3s under H2s.
- **Internal links** every post: `→ /services`, `→ /appointment`, and `→ /about`
  once. Never invent other internal URLs (broken links hurt). Internal links spread
  ranking authority and guide patients toward booking.

## 4. E-E-A-T (Experience, Expertise, Authority, Trust)

Health content is "Your Money or Your Life" — Google holds it to a higher bar.

- Write in **first person as Dr. Aditya Davhale** with real clinical voice
  ("In my clinic I often see…").
- Author is rendered as a **credentialed Person** in `ArticleSchema`
  (jobTitle, knowsAbout, links to `/about`) and the post is marked `reviewedBy`
  the same physician with a `lastReviewed` date.
- Medically accurate, evidence-based. **No fabricated studies or statistics.**
- Every post carries the `MedicalDisclaimer` + a real-contact CTA
  (book at `/appointment`, call/WhatsApp **+91 99606 28111**). No placeholder numbers,
  no domain other than `www.dradityamd.com`.

## 5. Structured data (handled in code — keep it true)

Injected automatically per post:

- `MedicalWebPage` + `Article` with `headline`, `datePublished`, `dateModified`,
  `lastReviewed`, `keywords`, `wordCount`, `author`, `reviewedBy`, `inLanguage: en-IN`.
- `speakable` selector on the H1 + first paragraph → eligible for voice / AI answers.
- `FAQPage` from the `faq` frontmatter.
- `BreadcrumbList` for the path.

Because dates and `wordCount` drive trust signals, keep `dateModified` /
`lastReviewed` current whenever a post is edited.

## 6. Frontmatter contract

```yaml
---
title: "Primary keyword + hook (≤60 chars)"
metaTitle: "SEO tab title, keyword near front (≤60 chars)"
date: "YYYY-MM-DD"
dateModified: "YYYY-MM-DD"
lastReviewed: "YYYY-MM-DD"
author: "Dr. Aditya Davhale"
excerpt: "120–155 char summary with primary keyword"
description: "150–160 char meta description, keyword + soft CTA"
keywords: ["primary", "secondary", "long-tail", "..."]
tags: ["tag1", "tag2", "tag3"]
image: "https://images.unsplash.com/...?w=1200&q=80"
faq:
  - question: "Natural search query?"
    answer: "Answer-first, self-contained, 40–60 words."
  # ...5 total
---
```

`metaTitle`, `description`, `keywords`, `dateModified`, `lastReviewed` are optional in
the parser and fall back safely — but **fill them for every new post**; that's where
the ranking lift is.

## 7. After publishing (do this to actually win)

Code gets you eligible; these get you ranked:

1. **Google Search Console** — submit the sitemap (`/sitemap.xml`) and "Request
   Indexing" for each new URL. Watch which queries bring impressions, then expand
   those posts.
2. **Internal links from older posts** — when a new post relates to an old one, add a
   link from the old post to the new one.
3. **Refresh quarterly** — update stats/advice and bump `dateModified` /
   `lastReviewed`. Freshness ranks.
4. **Google Business Profile** — link posts from your GBP; local + content compound
   for "physician near me" searches.
5. **Match search intent** — if a keyword's top results are listicles, write a
   listicle; if they're Q&A, lead with Q&A.

---

### Adding a new topic to the auto-generator

Edit `TOPIC_POOL` in `.github/scripts/generate-blog.mjs`:

```js
{
  topic: "plain-english topic that becomes the slug",
  primary: "head keyword to rank for",
  secondary: ["supporting term", "long-tail question", "local modifier"],
}
```

The generator picks the first topic without an existing post, builds the keyword-aware
AEO prompt, and writes the MDX. Backfilling old posts with `keywords` + `description`
+ answer-first intros is the highest-ROI cleanup when there's time.
