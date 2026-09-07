import assert from "node:assert/strict";
import test from "node:test";
import { getVerifiedReview } from "../../src/lib/article-review.ts";

test("publication and modification dates never imply medical review", () => {
  assert.deepEqual(getVerifiedReview({ date: "2026-09-07", dateModified: "2026-09-07", author: "A doctor" }), {});
});
test("a generated review date without explicit confirmation is omitted", () => {
  assert.deepEqual(getVerifiedReview({ lastReviewed: "2026-09-07", reviewedBy: "A doctor" }), {});
  assert.deepEqual(getVerifiedReview({ lastReviewed: "2026-09-07", reviewedBy: "A doctor", reviewVerified: "true" }), {});
});
test("a verified review requires a reviewer and real calendar date", () => {
  for (const lastReviewed of ["2026-02-30", "not-a-date", "2026-13-01"]) {
    assert.deepEqual(getVerifiedReview({ reviewVerified: true, reviewedBy: "A doctor", lastReviewed }), {});
  }
  assert.deepEqual(getVerifiedReview({ reviewVerified: true, reviewedBy: " ", lastReviewed: "2026-09-07" }), {});
});
test("explicit verified review metadata is preserved", () => {
  assert.deepEqual(getVerifiedReview({ reviewVerified: true, reviewedBy: " A doctor ", lastReviewed: "2026-09-07" }), { reviewedBy: "A doctor", lastReviewed: "2026-09-07" });
});
