# eesa hafejee — portfolio

Minimal static portfolio (inspired by [rootkid.me](https://rootkid.me/)) with one
Vercel serverless function that proxies the live vtrl user count.

## Structure

- `index.html` / `works.html` / `contact.html` / `works/vtrl.html` — static pages
- `css/style.css` — single stylesheet, dark mode via `prefers-color-scheme`
- `js/count.js` — fetches `/api/user-count`, animates the number on the vtrl page
- `api/user-count.js` — Vercel function; calls `https://vtrl.cc/api/userCount`
  with a Bearer token from the `VTRL_STATS_TOKEN` env var (never shipped to the client)

## Local dev

```sh
echo 'VTRL_STATS_TOKEN=<your stats JWT>' > .env   # gitignored
npx vercel dev
```

Without the token / function (static pages only): `npx serve .` — the count
falls back to "—".

## Deploy

```sh
npx vercel                       # link + deploy
npx vercel env add VTRL_STATS_TOKEN production
npx vercel --prod
```

## Editing content

- Bio: `index.html`
- Contact handles: `contact.html`
- Profile picture: replace `pfp.webp` (used in nav + favicon)
- New project: add a `<li>` in `works.html` + a page under `works/`
