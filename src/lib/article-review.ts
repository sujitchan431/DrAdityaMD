/** Only explicitly confirmed reviews may appear in visible content or schema. */
export function getVerifiedReview(data: Record<string, unknown>): { lastReviewed?: string; reviewedBy?: string } {
  if (data.reviewVerified !== true || typeof data.reviewedBy !== "string" || !data.reviewedBy.trim() || typeof data.lastReviewed !== "string") return {};
  const date = data.lastReviewed;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return {};
  const parsed = new Date(`${date}T00:00:00Z`);
  if (!Number.isFinite(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== date) return {};
  return { lastReviewed: date, reviewedBy: data.reviewedBy.trim() };
}
