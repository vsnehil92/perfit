# Perfit Pipes & Fittings — Static Website

A plain HTML/CSS/JS static site for **Perfit Pipes & Fittings** (manufactured & marketed by
Ankur Plastic Industries, Ballia, Uttar Pradesh). No build tools or frameworks — open
`index.html` directly in a browser, or serve the folder with any static file server.

## Structure

```
index.html                          Home
about.html                          About / company profile
products.html                       All product categories overview
product-swr-pipes.html              SWR Pipes (Type A, 3m) + prices
product-swr-fittings.html           SWR Fittings (elbows, tees, couplers) + prices
product-agri-fittings.html          Agri Fittings (elbows, traps, reducers, etc.) + prices
product-agriculture-pipes.html      Agriculture PVC-U pressure pipes + size chart
product-commercial-pvc-pipes.html   Commercial black PVC pipes + size chart
price-list.html                     Consolidated price list (all categories) + PDF downloads
testimonials.html                   Customer testimonials (currently placeholder content)
gallery.html                        Photo carousel + grid — real dispatch/product photos
contact.html                        Address, phone, email, GSTIN, map, enquiry form
sitemap.html                        Links to every page

css/style.css                       All styling (palette, layout, components, carousel)
js/main.js                          Mobile nav toggle, active-link highlight, form handling, carousel
assets/perfit-price-list.pdf        Your original price list PDF (downloadable from the site)
assets/perfit-brochure.pdf          Your original product brochure PDF (downloadable from the site)
images/products/                    Drop category-specific product photos here (still placeholder)
images/gallery/                     12 real photos you supplied (perfit-pipes-01..12.jpg), resized/
                                     compressed for web with macOS `sips` (max 1920px, ~q72)
```

## Color palette

Taken from https://coolors.co/aebdcf-ffffff-ffffff-7891af-375d89 — defined as CSS variables
at the top of `css/style.css`:

- `--color-light: #aebdcf` — tinted section backgrounds
- `--color-white: #ffffff` — base background
- `--color-mid: #7891af` — accents / hover states
- `--color-dark: #375d89` — primary brand blue (header, buttons, links)
- `--color-dark-2` — a darker shade of the primary, derived for depth/hover (footer, hero gradient)

Change any of these once and the whole site updates.

## Real data already used

Product names, sizes and **prices** were pulled directly from the catalogue/price list PDFs
you provided (`PriceList.pdf`, `PERFIT.pdf`, effective 01/01/2026) — nothing there is placeholder.
Contact details (address, phone, email, GSTIN 09AAKFA0238Q1Z3) are the ones you gave me.
The homepage hero carousel, About page photos, and the whole Gallery page now use 12 real
dispatch/product photos you supplied (`images/gallery/perfit-pipes-01.jpg` … `-12.jpg`).
The header logo across all 13 pages is now your real `images/logo.png` — auto-trimmed from
`perfit-Logo-1.png` (whitespace cropped, background made transparent, resized to 900px wide).
The footer still uses the text-based "PERFIT" wordmark since the real logo has no dark-background
variant (its blue/red outline strokes would lose contrast on the dark navy footer).

## Carousel component

`css/style.css` (`.carousel`, `.carousel-track`, `.carousel-slide`, etc.) + `js/main.js`
(`[data-carousel]` init) implement a small dependency-free carousel: auto-advance (pauses on
hover), prev/next arrows, and dot navigation. It's used on:
- **Home** (`index.html`) hero — 5 of the photos, `data-autoplay="4500"`
- **Gallery** (`gallery.html`) — all 12 photos, `data-autoplay="5000"`, plus a static grid below

To reuse it elsewhere, copy the `<div class="carousel ..." data-carousel data-autoplay="...">`
block structure (track → slides with `<img>` + `.carousel-caption` → prev/next buttons →
empty `.carousel-dots` div) — the JS finds it automatically, no extra wiring needed.

## What's still placeholder — replace before going live

1. **Category-specific product photos** — the 5 `product-*.html` pages still show dashed
   `.ph-img` placeholders (e.g. "SWR PIPES PHOTO"). The 12 supplied photos are generic
   pipe/dispatch shots, not identifiable per product line, so they weren't used here to avoid
   mislabeling — drop category-specific photos into `images/products/` and replace those
   `<div class="ph-img">...</div>` blocks with `<img>` tags when you have them.
2. **Testimonials** — all entries on `testimonials.html` and the homepage preview are marked
   "Placeholder" — swap in real customer names/quotes (with permission) when available.
3. **Social links** — footer social icons (`#`) need real Facebook/Instagram/LinkedIn URLs.
4. **Contact form** — `contact.html` and the homepage enquiry form submit client-side only
   (see `js/main.js`) and show a "not connected yet" message. To make them actually send
   emails, either:
   - Use a form backend like [Formspree](https://formspree.io) or [Web3Forms](https://web3forms.com)
     — change the `<form>` tag to `action="https://formspree.io/f/yourid" method="POST"` and
     remove the `data-enquiry-form` JS interception, or
   - Wire it to a backend/serverless function of your choice.

## Running locally

Just open `index.html` in a browser — everything is self-contained (no external fonts, no
CDN dependencies, works fully offline). For a nicer local preview with working relative paths,
you can also run a simple server from this folder:

```
python3 -m http.server 8000
```

then visit `http://localhost:8000`.

## Deploying

This is a fully static site — it can be hosted as-is on Netlify, Vercel, GitHub Pages, or any
basic web host. No build step is required.
