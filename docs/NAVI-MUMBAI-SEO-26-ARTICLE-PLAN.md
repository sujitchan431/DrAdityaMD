# Navi Mumbai SEO plan: 26 scheduled medical articles

## Objective

Publish a medically responsible internal-medicine content cluster for people searching in Navi Mumbai and nearby nodes. The goal is to answer real health questions, demonstrate clinical relevance, and earn qualified consultations. Publishing volume alone does not guarantee rankings.

Three previously missed dates are backfilled separately:

- 7 August 2026: arthritis and joint pain management
- 10 August 2026: obesity and healthy weight management
- 14 August 2026: constipation causes and safe home remedies

Their original publication dates are retained, while `dateModified` and `lastReviewed` record when the backfill was prepared.

## Publishing system

- The 26 future articles are stored in `src/content/blog-scheduled`, outside the public blog collection. Their future cover images stay in `src/content/blog-scheduled-images`, outside the public web root.
- `.github/blog-schedule.json` is the release allowlist. It fixes each slug, date, status, and article digest; the publisher rejects content changed without an explicit manifest update.
- GitHub Actions runs daily at 11:00 UTC (4:30 PM IST).
- On or after a post's publication date, the publisher moves it into `src/content/blog`, commits that change to `master`, and lets the existing deployment process publish it.
- If a scheduled run is delayed or missed, the next run catches up every overdue post in chronological order.
- Before and after moving due content, GitHub Actions runs the schedule tests and MDX/image checks; it also runs a full production build before committing to `master`.
- A day with no due post exits successfully without an empty commit.
- The schedule begins on 29 August 2026 and publishes every three days through 12 November 2026: 26 posts over the next 78 days.
- The publisher has no AI API or paid-service dependency. All copy and images are already in the repository.

## Editorial standard

- Each article contains 800-1,100 words in the body, excluding metadata.
- Each targets one primary search intent to avoid competing pages.
- Each includes an answer-first introduction, key takeaways, question-led sections, a useful table, warning signs, five FAQs, an authoritative source, and an appointment CTA.
- Navi Mumbai is mentioned only where it adds practical context, such as monsoon conditions, commuting, apartment living, food habits, or access to care.
- Medical claims must remain conservative and must not replace individual diagnosis or treatment.
- Do not invent patient stories, surveys, outcomes, review counts, or local statistics. A case study needs documented consent and anonymisation. A survey needs a real sample, method, dates, and limitations.
- After publication, add relevant internal links from older articles where they genuinely help the reader.

## 78-day schedule

| Date | Article topic | Primary keyword | Authentic Navi Mumbai angle |
|---|---|---|---|
| 29 Aug 2026 | Gas and bloating: causes and when to seek care | gas and bloating remedies | Meal timing, commuting, and urgent abdominal warning signs |
| 1 Sep 2026 | Hair fall: common causes and medical evaluation | hair fall treatment | Diet, stress, monsoon scalp concerns, and useful blood tests |
| 4 Sep 2026 | Skin allergies: causes and treatment | skin allergy treatment | Humidity, sweat, household products, and red flags |
| 7 Sep 2026 | Typhoid fever: symptoms, testing, and treatment | typhoid fever treatment | Food and water safety without unsupported local case numbers |
| 10 Sep 2026 | Malaria: symptoms, prevention, and treatment | malaria symptoms and prevention | Monsoon mosquito control around homes and water collection points |
| 13 Sep 2026 | UTI symptoms and treatment | UTI symptoms and treatment | When recurrent urinary symptoms need medical assessment |
| 16 Sep 2026 | Liver function test explained | liver function test explained | Fatty liver, medicines, alcohol history, and interpreting results together |
| 19 Sep 2026 | Kidney function test explained | kidney function test explained | Creatinine and eGFR with diabetes, hypertension, and dehydration |
| 22 Sep 2026 | Thyroid report: TSH, T3, and T4 explained | thyroid test report explained | Practical test preparation and follow-up |
| 25 Sep 2026 | Vitamin B12 deficiency symptoms and treatment | vitamin B12 deficiency symptoms | Vegetarian diets, metformin, anaemia, and nerve symptoms |
| 28 Sep 2026 | Dehydration signs, causes, and prevention | dehydration symptoms and prevention | Heat, humidity, commuting, exercise, and safe ORS use |
| 1 Oct 2026 | Heat stroke prevention tips | heat stroke prevention | Outdoor work and travel, with emergency warning signs |
| 4 Oct 2026 | Monsoon diseases prevention guide | monsoon diseases prevention | Mosquito control, food safety, diarrhoeal illness, and water storage |
| 7 Oct 2026 | Stomach ulcer symptoms, diet, and treatment | stomach ulcer treatment | Distinguishing ulcer symptoms from acidity and avoiding unsafe NSAID use |
| 10 Oct 2026 | Piles and haemorrhoids: symptoms and care | piles home remedies | Constipation, prolonged sitting, bleeding red flags, and examination |
| 13 Oct 2026 | Snoring and sleep apnoea | snoring and sleep apnea | Sleep quality, obesity, shift work, and sleep-study indications |
| 16 Oct 2026 | Protein deficiency in a vegetarian Indian diet | protein deficiency symptoms | Affordable dal, beans, dairy, eggs, soy, and balanced meals |
| 19 Oct 2026 | Calcium and vitamin D for bone health | calcium and vitamin D bone health | Indoor work, safe sunlight, fall prevention, and supplement safety |
| 22 Oct 2026 | Prediabetes and HbA1c explained | prediabetes HbA1c | Early risk assessment and practical Indian meal changes |
| 25 Oct 2026 | Metabolic syndrome explained | metabolic syndrome symptoms | Linking waist size, blood pressure, glucose, and lipids |
| 28 Oct 2026 | Chronic cough: common causes and warning signs | chronic cough causes | Pollution, reflux, asthma, infection, and when imaging may be needed |
| 31 Oct 2026 | Seasonal allergic rhinitis management | allergic rhinitis treatment | Humidity, dust, indoor triggers, and safe medicine use |
| 3 Nov 2026 | Menopause symptoms and healthy ageing | menopause symptoms treatment | Sleep, weight, blood pressure, bone health, and consultations |
| 6 Nov 2026 | Chronic kidney disease early warning signs | chronic kidney disease symptoms | Diabetes and hypertension screening without fear-based diagnosis |
| 9 Nov 2026 | Heart palpitations: causes and red flags | heart palpitations causes | Caffeine, anxiety, thyroid, anaemia, rhythm problems, and urgent symptoms |
| 12 Nov 2026 | Fatigue evaluation: when tiredness needs a check-up | fatigue causes and treatment | Sleep, anaemia, thyroid, diabetes, infection, and post-viral symptoms |

## Local SEO work that must run alongside publishing

Google says local results are mainly influenced by relevance, distance, and prominence. The articles strengthen relevance, but they cannot independently guarantee a top-three Maps or organic result.

1. Fully complete and regularly update the Google Business Profile: exact name, primary category, services, phone, address or service area, hours, appointment URL, and current photos.
2. Keep website and Business Profile details consistent. Avoid thin doorway pages for every Navi Mumbai node; make a location page only when it contains distinct clinic, access, service, and patient-useful information.
3. Ask real patients for honest reviews after care without incentives, scripts, or selectively asking only satisfied patients. Protect patient privacy in every reply.
4. Add original clinic, doctor, service, and area photographs with useful filenames and alt text. Do not use stock imagery as evidence of local activity.
5. Submit and monitor the sitemap in Google Search Console. Track indexing, impressions, calls, appointment clicks, and queries by page.
6. Earn credible local references through hospital affiliations, professional associations, health-education events, local organisations, and publications. Do not buy bulk links.
7. Strengthen conversion and trust with visible credentials, author and reviewer details, medical disclaimers, contact information, appointment flow, page speed, mobile usability, and accessible tables.
8. Review medical content quarterly, update only when something material changes, and record the reviewer and source date.

## 90-day measurement

- Non-branded impressions and clicks for Navi Mumbai searches
- Search Console position by article and query cluster
- Business Profile calls, website clicks, direction requests, and messages
- Appointment completion rate, not traffic alone
- Genuine review volume and sentiment
- Indexed pages, crawl errors, Core Web Vitals, and internal-link coverage

Top-three placement is not guaranteed by 26 articles. The decisive signals also include medical usefulness, genuine reputation, proximity to each searcher, technical reliability, local citations, reviews, and whether visitors trust and choose the practice.
