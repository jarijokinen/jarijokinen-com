---
title: Markdown table without header
excerpt: Markdown doesn't support tables without header, but sometimes you need a table without the extra line at the top.
description: Markdown doesn't support tables without header, but sometimes you need a table without the extra line at the top.
created_at: 2026-09-27
---

Markdown doesn't support tables without headers, but sometimes you need a table
without the extra line at the top.

And sometimes you want to hide the THEAD row only when the TH cells are empty.

## How to hide a table header in Markdown tables?

The easiest way to hide a table header in Markdown tables is to use CSS:

```markdown
<style>thead { display: none; }</style>

|            |         |
|------------|---------|
| first row  | of data |
| second row | of data |
```

It depends on your system if you can use per-page inline styles within the
Markdown file itself, as in the example above. If it doesn't work, or if you
want to make these styles global, you have to put the CSS outside the Markdown
file.

## How to hide a Markdown table header only when it's empty?

You can hide a Markdown table header only when it's empty using the CSS :has()
and :empty pseudo-classes:

```css
thead:has(> tr > th:empty) {
  display: none;
}
```

I like this solution better, as it can usually be added to the site-wide global
styles without issues. Even when you're not using Markdown at all, there aren't
many use cases where you need to display empty table header rows.
