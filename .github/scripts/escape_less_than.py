#!/usr/bin/env python3
"""Escape raw '<' that MDX would misparse as a JSX tag, across all blog posts.
Only touches '<' NOT followed by a letter, '/', or '!' (i.e. genuine less-than
comparisons like '<100', '< 18.5', '<= 7') — leaves real tags alone."""
import re, sys
from pathlib import Path

BLOG = Path("/root/DrAdityaMD/src/content/blog")
pat = re.compile(r"<(?![a-zA-Z/!])")

total = 0
for f in sorted(BLOG.glob("*.mdx")):
    txt = f.read_text(encoding="utf-8")
    new, n = pat.subn("&lt;", txt)
    if n:
        f.write_text(new, encoding="utf-8")
        print(f"{f.name}: {n} replacement(s)")
        total += n

print(f"\nTOTAL: {total} '<' escaped across files")
