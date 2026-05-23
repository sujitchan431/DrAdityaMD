import fs from "fs";
import path from "path";
import https from "https";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

// Topics pool — rotates based on existing slugs so no repeats
const TOPIC_POOL = [
  "managing fever at home: when to see a doctor",
  "iron deficiency anemia symptoms and treatment",
  "fatty liver disease: causes prevention and reversal",
  "vitamin D deficiency in India: causes signs and treatment",
  "managing stress for better heart health",
  "high uric acid and gout: dietary guide for Indians",
  "kidney stones prevention diet and lifestyle tips",
  "irritable bowel syndrome symptoms management",
  "sleep and metabolic health connection",
  "understanding cholesterol numbers: LDL HDL triglycerides",
  "PCOD vs PCOS explained in simple terms",
  "intermittent fasting benefits and risks for Indians",
  "food allergies vs food intolerance difference explained",
  "post-covid fatigue management tips",
  "dengue fever symptoms treatment and prevention",
  "managing acidity and GERD with diet changes",
  "blood pressure monitoring at home guide",
  "importance of annual health checkup after 30",
  "understanding your CBC blood test report",
  "diabetes and eye health: diabetic retinopathy explained",
];

// Unsplash photo IDs by topic category
const UNSPLASH_IMAGES = [
  "photo-1559757175-5700dde675bc", // medical test
  "photo-1576091160550-2173dba999ef", // doctor
  "photo-1498837167922-ddd27525d352", // healthy food
  "photo-1571019613454-1cb2f99b2d8b", // exercise
  "photo-1505751172876-fa1923c5c528", // medical records
  "photo-1490645935967-10de6ba17061", // nutrition
  "photo-1559757148-5c350d0d3c56", // clinical
];

function getExistingSlugs() {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

function pickTopic(existingSlugs) {
  for (const topic of TOPIC_POOL) {
    const slug = topicToSlug(topic);
    if (!existingSlugs.includes(slug)) return topic;
  }
  // All exhausted — generate timestamp-based topic
  const now = new Date();
  return `health tips for ${now.toLocaleDateString("en-IN", { month: "long" })} ${now.getFullYear()}`;
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

function callClaudeAPI(prompt) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      model: "claude-opus-4-5",
      max_tokens: 4096,
      messages: [{ role: "user", content: prompt }],
    });

    const options = {
      hostname: "api.anthropic.com",
      path: "/v1/messages",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
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
          else resolve(parsed.content[0].text);
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

async function main() {
  const existingSlugs = getExistingSlugs();
  const topic = pickTopic(existingSlugs);
  const slug = topicToSlug(topic);
  const today = new Date().toISOString().split("T")[0];
  const image = randomImage();

  console.log(`Generating blog post on: "${topic}" → ${slug}.mdx`);

  const prompt = `You are Dr. Aditya Davhale, MBBS MD DNB (Internal Medicine), a Consultant General Physician and Internal Medicine Specialist practicing in Navi Mumbai, India. Write a complete SEO-optimised medical blog post for your website dradityadavhale.com.

Topic: "${topic}"

Output ONLY a valid MDX file — no explanation, no markdown fences around the whole output. Start directly with the frontmatter dashes.

Requirements:
- Title: compelling, SEO-friendly, max 65 characters
- Excerpt: 1-2 sentences, 120-155 characters, includes primary keyword
- Tags: 3 relevant tags (lowercase, hyphens, e.g. "diabetes", "preventive-healthcare")
- FAQ: 3 question-answer pairs relevant to the topic (for schema markup)
- Body: 900-1200 words
- Use H2 and H3 headings
- Write in first-person as Dr. Aditya Davhale
- Tailor advice for Indian patients (Indian food examples, Indian context)
- Medically accurate, evidence-based, practical
- Natural keyword usage — no keyword stuffing
- End with a clear call-to-action to book an appointment
- Do NOT include an image tag in the body — the image is set in frontmatter

Use this exact frontmatter format:
---
title: "TITLE HERE"
date: "${today}"
author: "Dr. Aditya Davhale"
excerpt: "EXCERPT HERE"
tags: ["tag1", "tag2", "tag3"]
image: "${image}"
faq:
  - question: "Q1"
    answer: "A1"
  - question: "Q2"
    answer: "A2"
  - question: "Q3"
    answer: "A3"
---

[blog body here]`;

  const mdxContent = await callClaudeAPI(prompt);

  // Validate output starts with frontmatter
  if (!mdxContent.trim().startsWith("---")) {
    throw new Error("Generated content does not start with frontmatter. Aborting.");
  }

  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);

  if (fs.existsSync(filePath)) {
    console.log(`File ${slug}.mdx already exists. Skipping.`);
    return;
  }

  fs.mkdirSync(BLOG_DIR, { recursive: true });
  fs.writeFileSync(filePath, mdxContent, "utf-8");
  console.log(`Written: src/content/blog/${slug}.mdx`);
}

main().catch((err) => {
  console.error("Blog generation failed:", err.message);
  process.exit(1);
});
