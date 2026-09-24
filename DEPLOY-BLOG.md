# Blog — autonomous multilingual content

A self-running blog with 16 categories. Topics come from
`content/blog/topics.tr.txt`; a script writes each one as a warm, human,
5-language article and **publishes it automatically** (no approval step).

## Categories

travel · real-estate · cars · immigration · business · legal · money · living ·
food · family · luxury · weddings · digital · practical · diaspora · answers

Each post lives at `/blog/post/<slug>`, each category at `/blog/<category>`, and
the index at `/blog`.

## How it works

```
topics.tr.txt  ──seed──▶  queue.json  ──generate──▶  content/blog/posts/*.json  ──▶  live at /blog
```

1. **Seed the queue** (already done, 389 topics):
   ```bash
   node scripts/seed-queue.mjs
   ```
   Re-run any time after editing `topics.tr.txt`; it keeps the status of posts
   already generated, so nothing is regenerated.

2. **See what's pending** and pick a topic:
   ```bash
   node scripts/list-topics.mjs                  # next 25 pending
   node scripts/list-topics.mjs --category cars  # pending in one category
   node scripts/list-topics.mjs --all            # everything pending
   ```

3. **Generate + publish ONE post** (the manual, one-by-one workflow):
   ```bash
   node scripts/generate-post.mjs            # the next pending topic
   node scripts/generate-post.mjs --id <id>  # a specific topic from the list
   ```
   Each run writes one post, publishes it, and marks that topic done. Repeat
   whenever you want another.

   > The old batch runner `scripts/run-queue.mjs` (auto-generate the whole
   > queue) still exists but is **not used** in the manual workflow. Don't start
   > it, and make sure no old background run is going: `pkill -f run-queue.mjs`.

## Writing rules (baked into the generator)

- Canonical article written in Turkish, then translated to EN, SQ, IT, AR.
- Warm, human, conversational voice. **No em dashes** (stripped automatically).
- Albania is always presented as safe, friendly and welcoming. No crime, theft,
  insecurity or scam language, cautionary topics are reframed as positive,
  practical tips.
- Every article ends with the category's free concierge CTA.

## Settings

Top of `content/blog/queue.json`:

- `model` (default `claude-sonnet-5`) — for cheaper/faster bulk runs switch to
  `claude-haiku-4-5-20251001` (about 10x cheaper).
- `sourceLang` (default `tr`), `wordTarget` (default `1200`).
- `schedule.days` / `hour` — only used if you drive it by cron.

## Cost

Roughly $0.10–0.20 per article on Sonnet (5 languages), a few cents on Haiku.
The full 389-topic queue is a one-time batch; budget accordingly, or run it in
chunks with `--max`.

## Schedule on the VPS (optional, for a steady drip instead of a bulk run)

```bash
crontab -e
```
```
0 9 * * 1-5 cd /var/www/shqiperi.org && /usr/bin/node scripts/generate-post.mjs >> /var/log/shqiperi-blog.log 2>&1
```
(Weekdays at 09:00, one post per day. Find node with `which node`.)

## Deploy

```bash
cd /var/www/shqiperi.org && git pull && npm ci && npm run build && pm2 restart shqiperi
```

Posts generated on the server appear within ~5 minutes (ISR), no rebuild needed.
Commit `content/blog/posts/` back to the repo if you want them in git too.
