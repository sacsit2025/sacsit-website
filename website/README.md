# sacsit.com

The website of **SACS-IT** for **SOP**, the SCADA Open Platform.

```bash
npm ci
npm run dev        # http://localhost:3000
npm run build && npm start
```

No secret is needed to run or to build. With no environment set, the forms tell the visitor to write
to info@sacsit.com instead of accepting a message nobody would receive; `.env.example` names every
variable the live site uses.

## How it is put together

| Where | What |
|---|---|
| `content/pages/*.spec.json` | the copy of each page - one file per page |
| `content/home.ts` | the home page's copy (its bands are bespoke) |
| `content/menu.ts`, `content/routes.ts` | the menu, and the twelve routes |
| `components/sections/` | one component per section type: the renderer of a page file |
| `components/home/` | the home page's bands |
| `components/forms/` | the contact form and the document request |
| `app/` | the routes, and the stylesheet (`design.css` the design system, `interaction.css` the states) |
| `lib/` | the content types, the inline-markup parser, the image helpers, the mail and sheet plumbing |
| `public/assets/` | every image the site serves, with its measured size in `lib/asset-manifest.json` |

Next.js 16 (App Router), React 19, next-intl (English live, the structure for more), Tailwind v4 tokens.
No CMS and no database: a wording change is an edit in `content/` and a deploy.

## Checks

```bash
npm run typecheck
npm run build && npm run gate:links     # every internal link and image resolves
npm run build && npm start & npm run check:chrome
```
