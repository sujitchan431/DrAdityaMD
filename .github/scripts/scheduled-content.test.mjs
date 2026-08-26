import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

import { compile } from "@mdx-js/mdx";
import matter from "gray-matter";
import remarkGfm from "remark-gfm";
import sharp from "sharp";

const root = process.cwd();
const scheduledDir = path.join(root, "src", "content", "blog-scheduled");
const liveDir = path.join(root, "src", "content", "blog");
const imageDir = path.join(root, "public", "images", "blog");
const expectedDates = Array.from({ length: 26 }, (_, index) => {
  const date = new Date(Date.UTC(2026, 7, 29 + index * 3));
  return date.toISOString().slice(0, 10);
});

function scheduledFiles() {
  return fs.readdirSync(scheduledDir).filter((file) => file.endsWith(".mdx")).sort();
}

function wordCount(content) {
  return (content.match(/\b[\p{L}\p{N}][\p{L}\p{N}'’-]*\b/gu) ?? []).length;
}

test("contains exactly 26 unique articles on the three-day schedule", () => {
  const files = scheduledFiles();
  const posts = files.map((file) => matter(fs.readFileSync(path.join(scheduledDir, file), "utf8")));
  const dates = posts.map(({ data }) => data.date).sort();

  assert.equal(files.length, 26);
  assert.deepEqual(dates, expectedDates);
  assert.equal(new Set(files).size, files.length);
  for (const file of files) {
    assert.ok(!fs.existsSync(path.join(liveDir, file)), `${file} duplicates a live slug`);
  }
});

test("every article meets the editorial and SEO structure", () => {
  for (const file of scheduledFiles()) {
    const { data, content } = matter(fs.readFileSync(path.join(scheduledDir, file), "utf8"));
    const words = wordCount(content);
    const questionHeadings = content.match(/^## .*\?$/gm) ?? [];

    assert.ok(words >= 800 && words <= 1100, `${file} has ${words} body words`);
    assert.equal(content.match(/^# /gm), null, `${file} must not add a second H1`);
    assert.ok(content.includes("| Situation | Sensible next step |"), `${file} needs its care table`);
    assert.ok(questionHeadings.length >= 6, `${file} needs question-led sections`);
    assert.match(content, /Navi Mumbai/i, `${file} needs useful local context`);
    assert.match(content, /## Reliable medical source/, `${file} needs an authoritative source`);
    assert.match(content, /Book an appointment/i, `${file} needs an appointment CTA`);
    assert.equal(data.author, "Dr. Aditya Davhale");
    assert.equal(data.faq?.length, 5, `${file} needs five FAQs`);
    assert.ok(data.title && data.metaTitle && data.description && data.excerpt);
    assert.ok(data.description.length <= 160, `${file} description is too long`);
    assert.ok(data.excerpt.length <= 156, `${file} excerpt is too long`);
    assert.ok(!/\s[a-zA-Z]{1,3}$/.test(data.excerpt), `${file} excerpt may end mid-sentence`);
    assert.match(data.image, /^\/images\/blog\/[a-z0-9-]+\.jpg$/);
  }
});

test("every article has a distinct 1200 by 630 cover image", async () => {
  const images = new Set();
  for (const file of scheduledFiles()) {
    const { data } = matter(fs.readFileSync(path.join(scheduledDir, file), "utf8"));
    const imagePath = path.join(root, "public", data.image);
    const metadata = await sharp(imagePath).metadata();

    assert.equal(metadata.width, 1200, `${data.image} has the wrong width`);
    assert.equal(metadata.height, 630, `${data.image} has the wrong height`);
    images.add(fs.readFileSync(imagePath).toString("base64"));
  }
  assert.equal(images.size, 26, "scheduled cover images must not be byte-for-byte duplicates");
});

test("scheduled images and article filenames stay paired", () => {
  for (const file of scheduledFiles()) {
    const slug = path.basename(file, ".mdx");
    assert.ok(fs.existsSync(path.join(imageDir, `${slug}.jpg`)), `${slug} has no image`);
  }
});

test("all scheduled article bodies compile as MDX", async () => {
  for (const file of scheduledFiles()) {
    const { content } = matter(fs.readFileSync(path.join(scheduledDir, file), "utf8"));
    await assert.doesNotReject(
      compile(content, { remarkPlugins: [remarkGfm] }),
      `${file} contains invalid MDX`,
    );
  }
});
