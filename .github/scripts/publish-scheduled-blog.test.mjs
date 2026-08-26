import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import { publishDuePosts, readPublicationDate } from "./publish-scheduled-blog.mjs";

function makeFixture(posts) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "dradityamd-publisher-"));
  const scheduledDir = path.join(root, "src", "content", "blog-scheduled");
  fs.mkdirSync(scheduledDir, { recursive: true });
  for (const [file, date] of posts) {
    fs.writeFileSync(
      path.join(scheduledDir, file),
      `---\ntitle: Test\ndate: ${date}\n---\n\nTest article.\n`,
    );
  }
  return root;
}

test("does nothing before the first publication date", () => {
  const root = makeFixture([["first.mdx", "2026-08-29"]]);
  const due = publishDuePosts({ root, today: "2026-08-28", log() {} });

  assert.deepEqual(due, []);
  assert.ok(fs.existsSync(path.join(root, "src/content/blog-scheduled/first.mdx")));
});

test("publishes only posts due on or before the supplied date", () => {
  const root = makeFixture([
    ["first.mdx", "2026-08-29"],
    ["second.mdx", "2026-09-01"],
  ]);
  const due = publishDuePosts({ root, today: "2026-08-29", log() {} });

  assert.deepEqual(due, [{ file: "first.mdx", date: "2026-08-29" }]);
  assert.ok(fs.existsSync(path.join(root, "src/content/blog/first.mdx")));
  assert.ok(fs.existsSync(path.join(root, "src/content/blog-scheduled/second.mdx")));
});

test("catches up all overdue posts in chronological order", () => {
  const root = makeFixture([
    ["later.mdx", "2026-09-04"],
    ["earlier.mdx", "2026-08-29"],
  ]);
  const due = publishDuePosts({ root, today: "2026-09-10", dryRun: true, log() {} });

  assert.deepEqual(due, [
    { file: "earlier.mdx", date: "2026-08-29" },
    { file: "later.mdx", date: "2026-09-04" },
  ]);
  assert.ok(fs.existsSync(path.join(root, "src/content/blog-scheduled/earlier.mdx")));
});

test("refuses to overwrite an existing live article", () => {
  const root = makeFixture([
    ["first.mdx", "2026-08-28"],
    ["duplicate.mdx", "2026-08-29"],
  ]);
  const liveDir = path.join(root, "src", "content", "blog");
  fs.mkdirSync(liveDir, { recursive: true });
  fs.writeFileSync(path.join(liveDir, "duplicate.mdx"), "existing");

  assert.throws(
    () => publishDuePosts({ root, today: "2026-08-29", log() {} }),
    /Refusing to overwrite existing live article/,
  );
  assert.ok(
    fs.existsSync(path.join(root, "src/content/blog-scheduled/first.mdx")),
    "preflight must prevent a partial publication",
  );
});

test("rejects malformed frontmatter dates", () => {
  const root = makeFixture([["invalid.mdx", "not-a-date"]]);
  const file = path.join(root, "src", "content", "blog-scheduled", "invalid.mdx");

  assert.throws(() => readPublicationDate(file), /no valid YYYY-MM-DD date/);
});
