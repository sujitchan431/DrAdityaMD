import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { createHash } from "node:crypto";

export function todayInNaviMumbai() {
  if (process.env.PUBLISH_DATE) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(process.env.PUBLISH_DATE)) {
      throw new Error("PUBLISH_DATE must use YYYY-MM-DD format.");
    }
    return process.env.PUBLISH_DATE;
  }

  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const value = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  return `${value.year}-${value.month}-${value.day}`;
}

export function readPublicationDate(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const frontmatter = content.match(/^---\s*\r?\n([\s\S]*?)\r?\n---/);
  if (!frontmatter) throw new Error(`${filePath} has no valid frontmatter.`);

  const date = frontmatter[1].match(/^date:\s*["']?(\d{4}-\d{2}-\d{2})["']?\s*$/m)?.[1];
  if (!date) throw new Error(`${filePath} has no valid YYYY-MM-DD date.`);
  return date;
}

export function publishDuePosts({
  root = process.cwd(),
  today = todayInNaviMumbai(),
  dryRun = process.env.DRY_RUN === "1",
  log = console.log,
} = {}) {
  const scheduledDir = path.join(root, "src", "content", "blog-scheduled");
  const scheduledImageDir = path.join(root, "src", "content", "blog-scheduled-images");
  const liveDir = path.join(root, "src", "content", "blog");
  const liveImageDir = path.join(root, "public", "images", "blog");
  const manifestPath = path.join(root, ".github", "blog-schedule.json");

  if (!fs.existsSync(manifestPath)) {
    log(`No schedule manifest found. Nothing to publish on ${today}.`);
    return [];
  }

  const schedule = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  if (!Array.isArray(schedule)) throw new Error("Blog schedule manifest must be an array.");
  const slugs = new Set();
  for (const entry of schedule) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(entry.slug ?? "")) {
      throw new Error(`Invalid scheduled slug: ${entry.slug}`);
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(entry.date ?? "")) {
      throw new Error(`Invalid scheduled date for ${entry.slug}.`);
    }
    if (!/^[a-f0-9]{64}$/.test(entry.sha256 ?? "")) {
      throw new Error(`Invalid release digest for ${entry.slug}.`);
    }
    if (entry.status !== "scheduled") {
      throw new Error(`Invalid release status for ${entry.slug}.`);
    }
    if (slugs.has(entry.slug)) throw new Error(`Duplicate scheduled slug: ${entry.slug}`);
    slugs.add(entry.slug);
  }

  const due = schedule
    .filter(({ status }) => status === "scheduled")
    .map(({ slug, date, sha256 }) => ({ file: `${slug}.mdx`, image: `${slug}.jpg`, date, sha256 }))
    .filter(({ file, date }) => {
      const source = path.join(scheduledDir, file);
      const live = path.join(liveDir, file);
      if (!fs.existsSync(source) && !fs.existsSync(live)) {
        throw new Error(`Scheduled article is missing from both draft and live folders: ${file}`);
      }
      return date <= today && fs.existsSync(source);
    })
    .sort((a, b) => a.date.localeCompare(b.date) || a.file.localeCompare(b.file));

  if (due.length === 0) {
    log(`No articles are due on ${today}.`);
    return [];
  }

  for (const { file, image, date, sha256 } of due) {
    const source = path.join(scheduledDir, file);
    const imageSource = path.join(scheduledImageDir, image);
    const destination = path.join(liveDir, file);
    const imageDestination = path.join(liveImageDir, image);
    if (readPublicationDate(source) !== date) {
      throw new Error(`${file} date does not match the schedule manifest.`);
    }
    const actualDigest = createHash("sha256").update(fs.readFileSync(source)).digest("hex");
    if (!sha256 || actualDigest !== sha256) {
      throw new Error(`${file} changed after it was added to the release manifest.`);
    }
    if (!fs.existsSync(imageSource)) {
      throw new Error(`Scheduled image is missing: ${imageSource}`);
    }
    if (fs.existsSync(destination) || fs.existsSync(imageDestination)) {
      throw new Error(`Refusing to overwrite existing live article: ${destination}`);
    }
  }

  fs.mkdirSync(liveDir, { recursive: true });
  fs.mkdirSync(liveImageDir, { recursive: true });
  for (const { file, image, date } of due) {
    const source = path.join(scheduledDir, file);
    const imageSource = path.join(scheduledImageDir, image);
    const destination = path.join(liveDir, file);
    const imageDestination = path.join(liveImageDir, image);

    if (dryRun) {
      log(`[dry-run] ${date}: ${file}`);
    } else {
      fs.renameSync(imageSource, imageDestination);
      try {
        fs.renameSync(source, destination);
      } catch (error) {
        fs.renameSync(imageDestination, imageSource);
        throw error;
      }
      log(`Published ${date}: ${file}`);
    }
  }

  return due;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  publishDuePosts();
}
