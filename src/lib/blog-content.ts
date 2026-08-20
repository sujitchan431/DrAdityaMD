import GithubSlugger from "github-slugger";

export interface BlogHeading {
  id: string;
  text: string;
  level: number;
}

function cleanHeadingText(text: string): string {
  return text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*_`~]/g, "")
    .replace(/<[^>]+>/g, "")
    .trim();
}

function words(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]+/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

function isTitleLikeHeading(heading: string, title: string): boolean {
  const headingWords = new Set(words(heading));
  const titleWords = words(title).filter(
    (word) => !["a", "an", "and", "by", "for", "in", "of", "the", "to"].includes(word)
  );
  const wordsToMatch = titleWords.slice(0, Math.min(4, titleWords.length));

  return (
    wordsToMatch.length >= 3 &&
    wordsToMatch.every((word) => headingWords.has(word))
  );
}

export function stripDuplicateTitleHeading(content: string, title: string): string {
  const match = content.match(/^\s*(#{1,2})\s+(.+?)(?:\r?\n|$)/);
  if (!match) return content;

  const level = match[1].length;
  const headingText = cleanHeadingText(match[2]);

  if (level === 1 || (level === 2 && isTitleLikeHeading(headingText, title))) {
    return content.slice(match[0].length).replace(/^\s*\r?\n/, "");
  }

  return content;
}

export function extractHeadings(content: string): BlogHeading[] {
  const slugger = new GithubSlugger();
  const headings: BlogHeading[] = [];
  const regex = /^(#{2,3})\s+(.+)$/gm;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(content)) !== null) {
    const text = cleanHeadingText(match[2]);
    if (!text) continue;

    headings.push({
      id: slugger.slug(text),
      text,
      level: match[1].length,
    });
  }

  return headings;
}
