import fs from "fs";
import path from "path";
import https from "https";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");
const SITE = "https://www.dradityamd.com";
const PHONE = "+91 99606 28111";

// Topic pool with explicit keyword targets.
// primary = the head term to rank for; secondary = supporting/long-tail terms
// (include local + question modifiers to win featured snippets / AI Overviews).
const TOPIC_POOL = [
  {
    topic: "managing fever at home: when to see a doctor",
    primary: "fever treatment at home",
    secondary: ["when to see a doctor for fever", "high fever in adults", "home remedies for fever India", "viral fever treatment"],
  },
  {
    topic: "iron deficiency anemia symptoms and treatment",
    primary: "iron deficiency anemia symptoms",
    secondary: ["low hemoglobin treatment", "iron rich foods India", "anemia in women", "ferritin levels normal range"],
  },
  {
    topic: "fatty liver disease: causes prevention and reversal",
    primary: "fatty liver treatment",
    secondary: ["how to reverse fatty liver", "fatty liver diet Indian", "grade 1 fatty liver", "non-alcoholic fatty liver disease"],
  },
  {
    topic: "vitamin D deficiency in India: causes signs and treatment",
    primary: "vitamin D deficiency symptoms",
    secondary: ["vitamin D rich foods India", "vitamin D normal range", "how to increase vitamin D", "vitamin D dosage"],
  },
  {
    topic: "managing stress for better heart health",
    primary: "stress and heart health",
    secondary: ["how stress affects the heart", "manage stress naturally", "stress hypertension", "heart attack prevention India"],
  },
  {
    topic: "high uric acid and gout: dietary guide for Indians",
    primary: "high uric acid diet",
    secondary: ["foods to avoid in high uric acid", "gout treatment India", "normal uric acid level", "uric acid symptoms"],
  },
  {
    topic: "kidney stones prevention diet and lifestyle tips",
    primary: "how to prevent kidney stones",
    secondary: ["kidney stone diet", "kidney stone symptoms", "water intake kidney stones", "foods that cause kidney stones"],
  },
  {
    topic: "irritable bowel syndrome symptoms management",
    primary: "IBS symptoms and treatment",
    secondary: ["irritable bowel syndrome diet", "IBS home remedies", "IBS triggers Indian food", "IBS vs IBD"],
  },
  {
    topic: "sleep and metabolic health connection",
    primary: "sleep and metabolism",
    secondary: ["lack of sleep weight gain", "sleep and diabetes", "how much sleep do adults need", "sleep hygiene tips"],
  },
  {
    topic: "understanding cholesterol numbers: LDL HDL triglycerides",
    primary: "cholesterol levels explained",
    secondary: ["normal LDL HDL levels", "how to lower cholesterol", "triglycerides high causes", "cholesterol test India"],
  },
  {
    topic: "PCOD vs PCOS explained in simple terms",
    primary: "PCOD vs PCOS difference",
    secondary: ["PCOS symptoms", "PCOD treatment India", "PCOS diet", "irregular periods causes"],
  },
  {
    topic: "intermittent fasting benefits and risks for Indians",
    primary: "intermittent fasting for Indians",
    secondary: ["intermittent fasting benefits", "16:8 fasting diet", "intermittent fasting weight loss", "is intermittent fasting safe"],
  },
  {
    topic: "food allergies vs food intolerance difference explained",
    primary: "food allergy vs intolerance",
    secondary: ["food intolerance symptoms", "lactose intolerance India", "food allergy testing", "gluten intolerance signs"],
  },
  {
    topic: "post-covid fatigue management tips",
    primary: "post covid fatigue treatment",
    secondary: ["long covid symptoms", "tiredness after covid", "post viral fatigue recovery", "covid weakness remedies"],
  },
  {
    topic: "dengue fever symptoms treatment and prevention",
    primary: "dengue fever symptoms",
    secondary: ["dengue treatment at home", "dengue platelet count", "dengue prevention tips", "dengue warning signs"],
  },
  {
    topic: "managing acidity and GERD with diet changes",
    primary: "acidity and GERD treatment",
    secondary: ["acid reflux home remedies", "GERD diet Indian", "heartburn causes", "foods to avoid in acidity"],
  },
  {
    topic: "blood pressure monitoring at home guide",
    primary: "how to check blood pressure at home",
    secondary: ["normal blood pressure range", "best time to measure BP", "home BP monitor accuracy", "high blood pressure symptoms"],
  },
  {
    topic: "importance of annual health checkup after 30",
    primary: "health checkup after 30",
    secondary: ["full body checkup India", "preventive health screening", "blood tests after 30", "annual health checkup list"],
  },
  {
    topic: "understanding your CBC blood test report",
    primary: "how to read CBC report",
    secondary: ["complete blood count explained", "CBC normal values", "low WBC count meaning", "hemoglobin levels chart"],
  },
  {
    topic: "diabetes and eye health: diabetic retinopathy explained",
    primary: "diabetic retinopathy symptoms",
    secondary: ["diabetes eye damage", "prevent diabetic retinopathy", "diabetes vision problems", "diabetic eye screening"],
  },
  {
    topic: "high blood pressure: causes symptoms and treatment",
    primary: "high blood pressure causes and treatment",
    secondary: ["hypertension symptoms", "how to lower blood pressure naturally", "high BP home remedies India", "stage 1 hypertension treatment"],
  },
  {
    topic: "type 2 diabetes diet plan for Indians",
    primary: "diabetes diet plan India",
    secondary: ["type 2 diabetes food list", "diabetes diet chart Indian", "foods to avoid in diabetes", "diabetes meal plan Indian"],
  },
  {
    topic: "asthma symptoms triggers and management",
    primary: "asthma symptoms and triggers",
    secondary: ["asthma treatment India", "how to control asthma", "asthma inhaler types", "winter asthma tips"],
  },
  {
    topic: "arthritis and joint pain management",
    primary: "arthritis joint pain relief",
    secondary: ["osteoarthritis treatment", "knee pain home remedies", "rheumatoid arthritis symptoms", "joint pain diet"],
  },
  {
    topic: "obesity and healthy weight management",
    primary: "obesity treatment and weight loss",
    secondary: ["how to lose weight safely", "BMI chart India", "obesity health risks", "weight loss diet plan Indian"],
  },
  {
    topic: "constipation causes and home remedies",
    primary: "constipation home remedies",
    secondary: ["chronic constipation causes", "foods for constipation", "constipation in adults", "is constipation dangerous"],
  },
  {
    topic: "gas and bloating home remedies",
    primary: "gas and bloating remedies",
    secondary: ["excessive gas causes", "bloating after eating", "gas problem home remedy India", "acidity vs gas"],
  },
  {
    topic: "hair fall causes and treatment",
    primary: "hair fall treatment",
    secondary: ["hair fall reasons male", "vitamin deficiency hair fall", "dandruff hair loss", "hair fall after covid"],
  },
  {
    topic: "skin allergies causes and treatment",
    primary: "skin allergy treatment",
    secondary: ["skin allergy symptoms", "itching home remedies", "hives causes", "contact dermatitis treatment"],
  },
  {
    topic: "typhoid fever symptoms and treatment",
    primary: "typhoid fever treatment",
    secondary: ["typhoid symptoms", "typhoid diet", "widal test explained", "typhoid fever prevention"],
  },
  {
    topic: "malaria symptoms prevention and treatment",
    primary: "malaria symptoms and prevention",
    secondary: ["malaria treatment", "malaria mosquito prevention", "dengue vs malaria", "malaria test"],
  },
  {
    topic: "urinary tract infection symptoms and treatment",
    primary: "UTI symptoms and treatment",
    secondary: ["urine infection home remedies", "UTI in women", "burning urination causes", "UTI prevention"],
  },
  {
    topic: "liver function test explained",
    primary: "liver function test explained",
    secondary: ["SGPT SGOT normal range", "high SGPT causes", "fatty liver blood test", "LFT test preparation"],
  },
  {
    topic: "kidney function test explained",
    primary: "kidney function test explained",
    secondary: ["creatinine normal range", "urea creatinine test", "eGFR explained", "kidney test India"],
  },
  {
    topic: "thyroid test report: TSH T3 T4 explained",
    primary: "thyroid test report explained",
    secondary: ["TSH normal range", "T3 T4 test", "hypothyroidism vs hyperthyroidism", "thyroid test fasting"],
  },
  {
    topic: "vitamin B12 deficiency symptoms and treatment",
    primary: "vitamin B12 deficiency symptoms",
    secondary: ["vitamin B12 foods vegetarian", "B12 deficiency causes", "B12 injection", "B12 normal range"],
  },
  {
    topic: "dehydration signs causes and prevention",
    primary: "dehydration symptoms and prevention",
    secondary: ["signs of dehydration", "dehydration treatment", "ORS for dehydration", "how much water per day"],
  },
  {
    topic: "heat stroke prevention tips for summer",
    primary: "heat stroke prevention",
    secondary: ["heat stroke symptoms", "heat exhaustion vs heat stroke", "summer health tips India", "heat wave safety"],
  },
  {
    topic: "monsoon diseases prevention tips",
    primary: "monsoon diseases prevention",
    secondary: ["monsoon health tips", "dengue malaria monsoon", "waterborne diseases monsoon", "monsoon immunity"],
  },
  {
    topic: "stomach ulcer symptoms diet and treatment",
    primary: "stomach ulcer treatment",
    secondary: ["stomach ulcer symptoms", "ulcer diet", "H pylori treatment", "acidity vs ulcer"],
  },
  {
    topic: "piles hemorrhoids symptoms and home remedies",
    primary: "piles home remedies",
    secondary: ["hemorrhoids treatment", "piles symptoms", "piles diet", "piles vs fissure"],
  },
  {
    topic: "snoring and sleep apnea",
    primary: "snoring and sleep apnea",
    secondary: ["sleep apnea symptoms", "snoring causes and treatment", "sleep apnea test", "snoring home remedies"],
  },
  {
    topic: "protein deficiency in vegetarian Indian diet",
    primary: "protein deficiency symptoms",
    secondary: ["protein rich vegetarian foods India", "daily protein requirement", "protein deficiency hair fall", "vegetarian protein sources"],
  },
  {
    topic: "calcium and vitamin D for bone health",
    primary: "calcium deficiency bone health",
    secondary: ["calcium rich foods India", "osteoporosis prevention", "vitamin D and calcium", "bone health after 40"],
  },
];

const UNSPLASH_IMAGES = [
  "photo-1559757175-5700dde675bc",
  "photo-1576091160550-2173dba999ef",
  "photo-1498837167922-ddd27525d352",
  "photo-1571019613454-1cb2f99b2d8b",
  "photo-1505751172876-fa1923c5c528",
  "photo-1490645935967-10de6ba17061",
  "photo-1559757148-5c350d0d3c56",
];

function getExistingSlugs() {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

function pickTopic(existingSlugs) {
  for (const entry of TOPIC_POOL) {
    const slug = topicToSlug(entry.topic);
    if (!existingSlugs.includes(slug)) return entry;
  }
  const now = new Date();
  const label = `health tips and wellness advice for ${now.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}`;
  return { topic: label, primary: label, secondary: ["preventive health India", "internal medicine Navi Mumbai"] };
}

function topicToSlug(topic) {
  return topic
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function randomImage() {
  const id = UNSPLASH_IMAGES[Math.floor(Math.random() * UNSPLASH_IMAGES.length)];
  return `https://images.unsplash.com/${id}?w=1200&q=80`;
}

function callDeepSeekAPI(prompt) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      model: "deepseek-chat",
      max_tokens: 6000,
      messages: [{ role: "user", content: prompt }],
    });

    const options = {
      hostname: "api.deepseek.com",
      path: "/v1/chat/completions",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
        "Content-Length": Buffer.byteLength(body),
      },
    };

    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try {
          const parsed = JSON.parse(data);
          if (parsed.error) reject(new Error(parsed.error.message));
          else resolve(parsed.choices[0].message.content);
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

function buildPrompt({ topic, primary, secondary }, today, image) {
  const keywordList = [primary, ...secondary];
  return `You are Dr. Aditya Davhale, MBBS MD DNB (Internal Medicine), Assistant Professor & Consultant Physician practicing in Navi Mumbai, India. Write a complete, SEO- and AEO-optimised medical blog post for your website ${SITE}.

Topic: "${topic}"
PRIMARY keyword (must rank for this): "${primary}"
SECONDARY / long-tail keywords to weave in naturally: ${secondary.map((k) => `"${k}"`).join(", ")}

GOAL: rank on Google AND get cited by AI answer engines (Google AI Overviews, ChatGPT, Perplexity). Write so a search engine can lift a direct answer and an AI can quote you.

Output ONLY a valid MDX file — no explanation, no code fences around the whole output. Start directly with the frontmatter dashes.

SEO + AEO requirements (follow ALL):
1. Put the PRIMARY keyword in: the title, the meta description, the first sentence of the body, and at least one H2. Use it naturally — never stuff.
2. ANSWER-FIRST INTRO: the very first paragraph (40-60 words) must directly and completely answer the main question of the topic, in plain language, so it can be used as a featured snippet / AI Overview. No long preamble.
3. Immediately after the intro add a "## Key Takeaways" section with 4-6 short bullet points summarising the article.
4. Use H2 headings phrased as REAL questions people ask Google (e.g. "What causes...?", "How do I...?", "When should I see a doctor?"). At least 4 question-style H2s. Use H3s for sub-points.
5. Keep paragraphs short (2-3 sentences). Use bullet lists and at least one comparison/markdown table where it helps. Bold the most important terms.
6. Length: 1500-1800 words of genuinely useful, evidence-based content. Indian context — Indian foods, Indian habits, Indian healthcare reality.
7. Add internal links naturally in the body using markdown: link the phrase "internal medicine services" to ${SITE}/services, and include a closing line linking "book an appointment" to ${SITE}/appointment. You may also link "Dr. Aditya Davhale" to ${SITE}/about once. Do NOT invent any other internal URLs.
8. Demonstrate first-hand clinical experience (E-E-A-T): use phrases like "In my clinic I often see..." where appropriate. Be medically accurate and cite general medical consensus (no fake studies or fake statistics).
9. End with a clear call-to-action. Use ONLY these real contact details — never invent placeholders: book online at ${SITE}/appointment, or call/WhatsApp ${PHONE}. Never use a phone number containing X's or any domain other than www.dradityamd.com.
10. Do NOT include an image tag in the body — the image is set in frontmatter.

FAQ block: write 5 question/answer pairs. Each question must be a natural search query. Each answer must be answer-first and self-contained (40-60 words) so it works as a rich result and an AI citation.

Use this EXACT frontmatter format (fill every field):
---
title: "TITLE (compelling, contains primary keyword, max 60 characters)"
metaTitle: "SEO TITLE for the browser tab (max 60 chars, primary keyword near the front)"
date: "${today}"
dateModified: "${today}"
lastReviewed: "${today}"
author: "Dr. Aditya Davhale"
excerpt: "1-2 sentence summary, 120-155 chars, includes primary keyword"
description: "Meta description for Google, 150-160 chars, primary keyword + soft CTA"
keywords: [${keywordList.map((k) => `"${k}"`).join(", ")}]
tags: ["tag1", "tag2", "tag3"]
image: "${image}"
faq:
  - question: "Q1 (natural search query)"
    answer: "A1 (answer-first, 40-60 words)"
  - question: "Q2"
    answer: "A2"
  - question: "Q3"
    answer: "A3"
  - question: "Q4"
    answer: "A4"
  - question: "Q5"
    answer: "A5"
---

[blog body here following all requirements above]`;
}

async function main() {
  const existingSlugs = getExistingSlugs();
  const entry = pickTopic(existingSlugs);
  const slug = topicToSlug(entry.topic);
  const today = new Date().toISOString().split("T")[0];
  const image = randomImage();

  console.log(`Generating blog post on: "${entry.topic}" (primary: "${entry.primary}") → ${slug}.mdx`);

  let mdxContent = await callDeepSeekAPI(buildPrompt(entry, today, image));
  // Escape raw '<' not followed by a tag/comment opener — MDX otherwise parses
  // "less than" comparisons like '<100' or '< 18.5' as broken JSX tags.
  mdxContent = mdxContent.replace(/<(?![a-zA-Z/!])/g, "&lt;");

  if (!mdxContent.trim().startsWith("---")) {
    throw new Error("Generated content does not start with frontmatter. Aborting.");
  }

  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (fs.existsSync(filePath)) {
    console.error(`File ${slug}.mdx already exists — duplicate slug. Failing loudly.`);
    process.exit(1);
  }

  fs.mkdirSync(BLOG_DIR, { recursive: true });
  fs.writeFileSync(filePath, mdxContent, "utf-8");
  console.log(`Written: src/content/blog/${slug}.mdx`);
}

main().catch((err) => {
  console.error("Blog generation failed:", err.message);
  process.exit(1);
});
