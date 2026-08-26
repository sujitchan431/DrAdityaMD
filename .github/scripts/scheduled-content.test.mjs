import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

import { compile } from "@mdx-js/mdx";
import matter from "gray-matter";
import remarkGfm from "remark-gfm";
import sharp from "sharp";

const root = process.cwd();
const scheduledDir = path.join(root, "src", "content", "blog-scheduled");
const scheduledImageDir = path.join(root, "src", "content", "blog-scheduled-images");
const liveDir = path.join(root, "src", "content", "blog");
const liveImageDir = path.join(root, "public", "images", "blog");
const schedule = JSON.parse(fs.readFileSync(path.join(root, ".github", "blog-schedule.json"), "utf8"));
const expectedDates = Array.from({ length: 26 }, (_, index) => {
  const date = new Date(Date.UTC(2026, 7, 29 + index * 3));
  return date.toISOString().slice(0, 10);
});

function articlePath(slug) {
  const scheduled = path.join(scheduledDir, `${slug}.mdx`);
  const live = path.join(liveDir, `${slug}.mdx`);
  const matches = [scheduled, live].filter(fs.existsSync);
  assert.equal(matches.length, 1, `${slug} must exist in exactly one article location`);
  return matches[0];
}

function imagePath(slug) {
  const scheduled = path.join(scheduledImageDir, `${slug}.jpg`);
  const live = path.join(liveImageDir, `${slug}.jpg`);
  const matches = [scheduled, live].filter(fs.existsSync);
  assert.equal(matches.length, 1, `${slug} must exist in exactly one image location`);
  return matches[0];
}

function wordCount(content) {
  return (content.match(/\b[\p{L}\p{N}][\p{L}\p{N}'’-]*\b/gu) ?? []).length;
}

test("manifest retains all 26 unique posts across the three-day schedule", () => {
  assert.equal(schedule.length, 26);
  assert.equal(new Set(schedule.map(({ slug }) => slug)).size, 26);
  assert.deepEqual(schedule.map(({ date }) => date).sort(), expectedDates);
  for (const entry of schedule) {
    assert.equal(entry.status, "scheduled");
    assert.match(entry.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.match(entry.sha256, /^[a-f0-9]{64}$/);
    const file = articlePath(entry.slug);
    const digest = createHash("sha256").update(fs.readFileSync(file)).digest("hex");
    assert.equal(entry.sha256, digest, `${entry.slug} differs from its release digest`);
    imagePath(entry.slug);
  }
});

test("every article meets the editorial and SEO structure", () => {
  for (const { slug, date } of schedule) {
    const { data, content } = matter(fs.readFileSync(articlePath(slug), "utf8"));
    const words = wordCount(content);
    const questionHeadings = content.match(/^## .*\?$/gm) ?? [];

    assert.equal(data.date, date, `${slug} date differs from manifest`);
    assert.ok(words >= 800 && words <= 1100, `${slug} has ${words} body words`);
    assert.equal(content.match(/^# /gm), null, `${slug} must not add a second H1`);
    assert.ok(content.includes("| Situation | Sensible next step |"), `${slug} needs its care table`);
    assert.ok(questionHeadings.length >= 6, `${slug} needs question-led sections`);
    assert.match(content, /Navi Mumbai/i, `${slug} needs useful local context`);
    assert.match(content, /## Reliable medical source/, `${slug} needs an authoritative source`);
    assert.match(content, /Book an appointment/i, `${slug} needs an appointment CTA`);
    assert.equal(data.author, "Dr. Aditya Davhale");
    assert.equal(data.faq?.length, 5, `${slug} needs five FAQs`);
    assert.ok(data.title && data.metaTitle && data.description && data.excerpt);
    assert.ok(data.description.length <= 160, `${slug} description is too long`);
    assert.ok(data.excerpt.length >= 90 && data.excerpt.length <= 160, `${slug} excerpt length is invalid`);
    assert.match(data.excerpt, /[.!?]$/, `${slug} excerpt must be a complete sentence`);
    assert.match(data.image, new RegExp(`^/images/blog/${slug}\\.jpg$`));
  }
});

test("every article has a distinct 1200 by 630 cover image", async () => {
  const images = new Set();
  for (const { slug } of schedule) {
    const file = imagePath(slug);
    const metadata = await sharp(file).metadata();
    assert.equal(metadata.width, 1200, `${slug} image has the wrong width`);
    assert.equal(metadata.height, 630, `${slug} image has the wrong height`);
    images.add(fs.readFileSync(file).toString("base64"));
  }
  assert.equal(images.size, 26, "scheduled cover images must not be byte-for-byte duplicates");
});

test("all article bodies compile as MDX", async () => {
  for (const { slug } of schedule) {
    const { content } = matter(fs.readFileSync(articlePath(slug), "utf8"));
    await assert.doesNotReject(
      compile(content, { remarkPlugins: [remarkGfm] }),
      `${slug} contains invalid MDX`,
    );
  }
});
