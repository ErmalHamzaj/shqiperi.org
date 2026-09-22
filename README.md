# Shqipëri 🇦🇱

**Everything about Albania and Albanians** — a search portal that answers with a
clear overview grounded in live sources, plus latest Albanian news, a company &
contacts directory, and a smart disambiguation flow.

- 🔎 **Answers** — direct, sourced answers, not just a list of links
- 📰 **Live news** — latest headlines scraped from Albanian & international outlets
- 🏢 **Directory** — companies & contacts for rentals, property, investment, business
- 🧭 **Disambiguation** — broad queries ("rent in Albania") offer specific choices
- 🇦🇱 **Albania-first** — specialized in Albania, Kosovo, the diaspora, and Albanian culture
- 🗣️ **Bilingual** — Albanian (Shqip) ↔ English toggle
- ⚡ **Streaming** — answers stream in as they're generated

## Tech stack

- [Next.js 14](https://nextjs.org) (App Router) + React + TypeScript
- [Tailwind CSS](https://tailwindcss.com)
- [Claude API](https://docs.anthropic.com) with the built-in web search tool

## Getting started

```bash
npm install
cp .env.example .env.local      # then add your ANTHROPIC_API_KEY
npm run dev                     # http://localhost:3000
```

Get a key at [console.anthropic.com](https://console.anthropic.com/). Without a
key the app still runs — search returns a demo message so you can preview the UI.

## The pieces

### Search answers — `app/api/search/route.ts`

Sends the query to Claude with the `web_search` tool and a system prompt that
keeps answers focused on Albania (news, business, investing, property, rentals,
tourism, history, culture). Text streams to the client over SSE; sources are
extracted from the search results. The answer never refers to itself as an AI.

### 📰 News — `app/api/news/route.ts`

Scrapes latest headlines from:

| Language | Source           | URL                                    |
| -------- | ---------------- | -------------------------------------- |
| Albanian | Euronews Albania | `https://euronews.al/`                 |
| English  | Euronews         | `https://www.euronews.com/tag/albania` |

Results are cached ~15 min. To change or add sources, edit the `SOURCES` map in
that file (each needs an `origin` and a `match` regex for its article URLs).

### 🏢 Company directory — `lib/directory.ts`  ← **add your contacts here**

Each category (car rental, homes, villas, land, helicopter charter, buy property,
invest, investment centers, businesses) has a `companies` array. Add your
collected contacts like this:

```ts
{
  id: "rent-car",
  name: { sq: "Makina me qira", en: "Car rental" },
  match: /.../,
  companies: [
    {
      name: "Auto Rent Tirana",
      city: "Tiranë",
      phone: "+355 69 000 0000",
      email: "info@example.com",
      website: "https://example.com",
      note: { sq: "Makina me qira 24/7", en: "Car rental 24/7" },
    },
  ],
},
```

When a search matches a category, its companies render below the answer. Empty
categories show a "get listed" invite.

### 🧭 Disambiguation — `lib/refine.ts`

Broad queries offer specific follow-ups. e.g. **"rent in Albania"** →
_Rent a car? a home? an apartment? a villa? land? a helicopter?_ Edit the
`GROUPS` array to add topics or options.

## Configuration

| Variable            | Default            | Description                    |
| ------------------- | ------------------ | ------------------------------ |
| `ANTHROPIC_API_KEY` | —                       | Required for real answers            |
| `SHQIPERI_MODEL`    | `claude-haiku-4-5-…`    | Model (Haiku = cheap/fast default)   |

## Deploy

Deploys cleanly to [Vercel](https://vercel.com): import the repo, set
`ANTHROPIC_API_KEY`, and point `shqiperi.org` at it.

## Project structure

```
app/
  page.tsx             home (search + topics + latest news)
  search/page.tsx      results (disambiguation + overview + directory + news + sources)
  api/search/route.ts  answers (Claude + web search, streamed)
  api/news/route.ts    news scraper (TRT Balkan / Euronews)
components/             Logo, SearchBox, LangToggle, NewsList, LanguageProvider
lib/
  i18n.ts              SQ/EN dictionary
  refine.ts            disambiguation groups
  directory.ts         company & contacts directory  ← add contacts here
  markdown.ts          safe Markdown → HTML
public/
  Albanian_eagle.png   logo eagle
  icon.svg             favicon (flag)
```
