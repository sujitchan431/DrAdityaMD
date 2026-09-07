# Recording a medical review

Publication, automatic generation, and release approval do not establish medical review. The site displays a reviewer and review date only when all three frontmatter fields are present:

```yaml
reviewVerified: true
reviewedBy: "Name of the clinician who actually reviewed the article"
lastReviewed: "YYYY-MM-DD"
```

Use the actual completed review date and clinician's name. Do not mark generated articles as reviewed automatically. Without confirmed metadata, the site retains author and publication information but omits medical review claims from both the page and structured data.

For articles governed by `.github/blog-schedule.json`, content changes also require updating the release digest after the revised content is approved. Do not edit the manifest merely to bypass a failing integrity check. MDX files use LF line endings so Windows checkouts preserve approved hashes.

Newsletter signup has been removed because it had no subscription backend. Add it back only with a working subscription provider and an accurate confirmation flow. Social profile links may be restored when the actual profile URLs are available.
