# Guides / Blog — automated content

A self-running guides section. You keep a queue of topics; a script writes each
one as a **multilingual draft**, you approve it, and it goes live — no rebuild.

## The flow

```
queue.json (your topics)
      │  scripts/generate-guide.mjs   (cron: Mon & Thu 09:00)
      ▼
content/guides/posts/<slug>.json   status: "draft"   ← not public yet
      │  scripts/publish-guide.mjs <slug>   (you approve)
      ▼
status: "published"   → live at /guides/<slug>
```

- **Languages:** each article is written in English, then translated to
  Albanian, Italian, Turkish and Arabic.
- **Concierge CTA:** every article automatically ends with the tailored free-help
  card for its category (car rental → "see available cars", etc.).
- New posts appear within a few minutes (ISR) — **no `npm run build` needed**.

## 1. Add topics

Edit [`content/guides/queue.json`](content/guides/queue.json). Add objects to
`topics` (put in as many as you like — e.g. your 20):

```json
{
  "id": "best-beaches-in-albania",
  "title": "The 12 Best Beaches in Albania",
  "keywords": "best beaches Albania, Ksamil, Gjipe, Dhermi, Albania beach guide",
  "category": "tour-guides",
  "cover": "🏖️",
  "status": "pending"
}
```

- `id` → becomes the URL slug (`/guides/best-beaches-in-albania`).
- `category` (optional) → drives the concierge CTA. Use a directory category id:
  `rent-car`, `rent-home`, `rent-villa`, `buy-property`, `tour-guides`,
  `boat-yacht`, `taxi-transfers`, `rent-helicopter`, `lawyer`, `accountants`,
  `banks`, `invest`.
- `cover` → an emoji shown as the icon.

Schedule + model live at the top of the file (`schedule.days`: 0=Sun … 6=Sat;
default `[1,4]` = Mon & Thu; `model` default `claude-sonnet-5`; `wordTarget`).

## 2. Generate (what cron runs)

```bash
node scripts/generate-guide.mjs           # next pending topic → draft
node scripts/generate-guide.mjs --id best-beaches-in-albania   # a specific one
node scripts/generate-guide.mjs --force   # overwrite an existing file
```

Needs `ANTHROPIC_API_KEY` (read from the environment or `.env.local`).

## 3. Review & publish (your approval)

```bash
node scripts/publish-guide.mjs --list     # see all posts + status
node scripts/publish-guide.mjs best-beaches-in-albania      # make it public
node scripts/publish-guide.mjs best-beaches-in-albania --unpublish   # revert
```

To read a draft before publishing, open its file in
`content/guides/posts/<slug>.json`, or temporarily publish it and check
`/guides/<slug>`.

## 4. Schedule it on the VPS (cron)

SSH in, then edit the crontab:

```bash
crontab -e
```

Add (Mon & Thu at 09:00 — runs the generator, logs output):

```
0 9 * * 1,4 cd /var/www/shqiperi.org && /usr/bin/node scripts/generate-guide.mjs >> /var/log/shqiperi-guides.log 2>&1
```

Find your node path with `which node` if it isn't `/usr/bin/node` (nvm installs
live under `~/.nvm/versions/node/<ver>/bin/node`).

This generates a **draft** on schedule; you still publish manually (your choice
in setup). To fully automate publishing instead, append to the same command:
`&& /usr/bin/node scripts/publish-guide.mjs $(node -e "…")` — or just tell me and
I'll switch the generator to publish directly.

## Deploy

Content lives in the repo, so the normal deploy picks it up:

```bash
cd /var/www/shqiperi.org && git pull && npm ci && npm run build && pm2 restart shqiperi
```

Drafts/published posts created **on the server** by cron are written to
`content/guides/posts/` there. Commit them back (or just let them live on the
server) — they're served either way.
```
