import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

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
  const liveDir = path.join(root, "src", "content", "blog");

  if (!fs.existsSync(scheduledDir)) {
    log(`No scheduled directory found. Nothing to publish on ${today}.`);
    return [];
  }

  const due = fs
    .readdirSync(scheduledDir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => ({
      file,
      date: readPublicationDate(path.join(scheduledDir, file)),
    }))
    .filter(({ date }) => date <= today)
    .sort((a, b) => a.date.localeCompare(b.date) || a.file.localeCompare(b.file));

  if (due.length === 0) {
    log(`No articles are due on ${today}.`);
    return [];
  }

  for (const { file } of due) {
    const destination = path.join(liveDir, file);
    if (fs.existsSync(destination)) {
      throw new Error(`Refusing to overwrite existing live article: ${destination}`);
    }
  }

  fs.mkdirSync(liveDir, { recursive: true });
  for (const { file, date } of due) {
    const source = path.join(scheduledDir, file);
    const destination = path.join(liveDir, file);

    if (dryRun) {
      log(`[dry-run] ${date}: ${file}`);
    } else {
      fs.renameSync(source, destination);
      log(`Published ${date}: ${file}`);
    }
  }

  return due;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  publishDuePosts();
}
