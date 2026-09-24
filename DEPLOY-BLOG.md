# Blog — managing posts

The bulk topic list / auto-generation pipeline has been removed. Posts are now
managed individually. Every post already published stays exactly as it is; the
blog reads the files in `content/blog/posts/` directly, so nothing on the live
site is affected by removing the queue.

## Where posts live

Each post is one JSON file in `content/blog/posts/<slug>.json` with per-language
`title`, `description`, `excerpt`, `body` (Markdown), a blog `category`, and
optional `slugs` (localized URLs), `ogImage`, `manual` flag. See
`tutap-arnavutluk.json` for a hand-written example.

## Add a post

**By hand (recommended for important/editorial posts):** copy an existing file,
edit the fields, keep `"status": "published"` and set `"manual": true` so the
maintenance scripts leave it alone. New posts appear on the site within ~30s.

**By generation (optional):** add one topic to the `topics` array in
`content/blog/queue.json`, e.g.
```json
{ "id": "my-topic-slug", "title": "Turkish working title", "category": "travel", "cover": "🏖️", "status": "pending" }
```
then:
```bash
node scripts/generate-post.mjs --id my-topic-slug
```
It writes one post (5 languages), publishes it, and adds localized slugs.

## Maintenance scripts

- `node scripts/add-slugs.mjs` — backfill localized URL slugs on posts missing them.
- `node scripts/retranslate.mjs <lang> [--only-failed] [--model <id>]` — re-do one
  language across posts (e.g. fix Albanian: `retranslate.mjs sq`; fix posts whose
  translation fell back to the source: `retranslate.mjs en --only-failed`).
- Settings (model per language, source language) live at the top of
  `content/blog/queue.json`.

## Deploy

```bash
cd /var/www/shqiperi.org && git checkout -- . && git pull && npm run build && pm2 restart shqiperi
```
Your generated post files on the server are untracked, so `git checkout -- .`
leaves them in place — it only resets tracked files to the pulled version.
