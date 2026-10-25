# UI Context

Before building any UI spec, **view the screenshots in `context/design-reference/`**. This file describes them in words. They are a reference for look, structure, and feel only. Do not copy the template's text, logo, or photos.

## The Feel In One Paragraph

Dark, confident, and photo-led. The interface itself is almost colorless: pure black, charcoal, white, and one off-white "paper" tone. **The photography carries the color and the emotion**, so the UI steps back and lets the work speak. Typography is bold, uppercase, and widely spaced. Corners are square. Everything feels like a classic, independent barbershop that takes its craft seriously: heritage, precision, and quiet confidence. It is premium through restraint, not decoration: no gold, no gradients, no glow, no glassmorphism, no rounded bubbly cards.

## What The Reference Shows

**Hero (`01`, `05`).** A full-bleed black screen with a dark, moody image behind it (in the reference, two crossed straight razors fading into black). The studio wordmark sits centered near the top in a large, bold white serif in capitals. Below it, a circular white crest logo. Below that, a single **BOOK NOW** button: charcoal fill, thin gray border, bold condensed uppercase white text with wide letter spacing, square corners. A thin vertical rail of social icons (stacked, white) sits on the far left of the desktop layout with a rotated "OUR SOCIALS" label under it. Nothing else competes with the wordmark and the button.

**Navigation (`01` to `05`).** A **floating bar**, not a full-width header. It is centered at the top, narrower than the screen, dark charcoal and slightly translucent, with a thin bright white line along its top edge. Links are tiny, bold, uppercase, with very wide letter spacing (about 0.3em), evenly spaced. The current page or section is underlined. It stays on screen while scrolling and sits over photos.

**Service panels (`02`, `05`).** Tall, full-bleed photo panels, two side by side on desktop, stacked on mobile. Each panel is one large photo with a soft dark overlay. Centered over the photo: a bold uppercase white title ("HAIRCUTS"), a one-line subtitle, and an outlined **SEE MORE** button (transparent fill, thin white border, condensed uppercase text). On desktop the second panel starts lower than the first, so the pair feels staggered, with black behind. On mobile the panels run edge to edge with no side margins.

**About block (`03`).** The one light section. An off-white background with a very subtle speckled paper texture. A cutout product photo (a barber chair in the reference) on the left, and on the right: a big, heavy, black, uppercase headline, a short black rule, a bold subheading in sentence case, a few short paragraphs of small body text, and a solid dark button (charcoal fill, gray border) with condensed uppercase text. On mobile the photo stacks above the text.

**Gallery mosaic (`03`, `04`).** A tight mosaic of photos separated by **thin black gutters** (about 8 to 14px) on a black background. Tiles vary in width and height: tall portraits beside wide landscapes, and one tile can be a mini collage of several small photos. Nothing is rounded. Photos have a warm, slightly grainy, filmic look. The gallery should feel like a wall of work, not a uniform grid.

**Mobile (`05`).** One column. Wordmark centered at the top, crest below it, BOOK NOW below that, then full-bleed panels, one after another. Large text, large buttons, almost no chrome.

## Mobile First

- Design every screen at **375px width first**, then scale up. Most users are on phones.
- **Booking must be reachable without scrolling**, on every public page, with one thumb. On mobile the Book button is always visible in the top bar (top right). On desktop it sits at the right end of the floating nav bar.
- The home page is a single long page of sections. The nav links scroll to those sections (Services, Gallery, About, Contact). **Book** goes to its own `/book` page.
- Tap targets are at least 44×44px. Body text is at least 16px on mobile. Form inputs are at least 16px so iOS does not zoom.
- Keep pages light: `next/image`, responsive sizes, lazy loading below the fold. Photos are heavy, so this is the main performance risk. Compress at upload and serve modern formats.
- Check at 360px, 390px, 768px, and 1280px.

## Color Tokens

All colors are CSS custom properties in `globals.css`, mapped to Tailwind via `@theme inline`. No hardcoded hex values and no raw palette classes in components.

| Role                  | CSS Variable        | Value      | Notes                                         |
| --------------------- | ------------------- | ---------- | --------------------------------------------- |
| Page background       | `--bg-base`         | `#000000`  | Pure black, as in the hero and gutters        |
| Surface               | `--bg-surface`      | `#111111`  | Cards and form panels on black                |
| Bar / elevated        | `--bg-bar`          | `#161616`  | Floating nav bar (use at about 90% opacity)   |
| Button fill           | `--bg-button`       | `#1c1c1c`  | Solid buttons                                 |
| Paper (light section) | `--bg-paper`        | `#f4f3f0`  | About block, admin background                 |
| Border                | `--border-default`  | `#3a3a3a`  | Thin panel and input borders                  |
| Button border         | `--border-button`   | `#5b5b5b`  | Gray border on solid buttons                  |
| Strong border         | `--border-strong`   | `#ffffff`  | Outlined buttons, nav top line, focus ring    |
| Text on dark          | `--text-on-dark`    | `#ffffff`  | Headings and primary text on black            |
| Muted text on dark    | `--text-muted-dark` | `#a6a6a6`  | Secondary copy on black                       |
| Text on paper         | `--text-on-paper`   | `#0b0b0b`  | Text on the light section                     |
| Muted text on paper   | `--text-muted-paper`| `#55555a`  | Secondary copy on paper                       |
| Error                 | `--state-error`     | `#e5484d`  | Used sparingly                                |
| Success               | `--state-success`   | `#3fb97a`  | Used sparingly                                |
| Warning               | `--state-warning`   | `#d9a43b`  | Used sparingly                                |

**There is no brand accent color.** Selection and emphasis use inversion: a selected option becomes **white fill with black text**. Focus rings are 2px white (or black on paper) with an offset. If the developer later wants an accent (for example the teal from the studio's van and Instagram), it is added as one token and used only for small functional highlights. Do not add one on your own.

Tailwind names map to the variables, for example `bg-base`, `bg-surface`, `bg-bar`, `bg-button`, `bg-paper`, `border-line`, `border-button`, `text-on-dark`, `text-muted-dark`, `text-on-paper`.

## Photo Treatment

- Photos carry the color. Keep them slightly warm, filmic, and a little grainy where possible.
- Text over photos always gets a dark overlay (a flat 35 to 50 percent black layer or a bottom-weighted gradient) so it meets contrast requirements.
- Never stretch or squash images. Use `object-cover` with a deliberate focal point.
- Until real photos exist, use neutral dark placeholders. Do not use stock photos of other businesses.

## Typography

| Role                     | Font        | Usage                                                                |
| ------------------------ | ----------- | -------------------------------------------------------------------- |
| Display serif            | Noto Serif (bold 700) | Wordmark and the hero name, uppercase, slightly tracked   |
| Headings and body        | Open Sans   | Section headlines (extra bold, uppercase), panel titles, body, forms |
| Buttons, labels, prices  | Oswald      | Condensed uppercase with wide tracking (about 0.15em)                |

Load with `next/font/google` and expose as CSS variables. Nav links: Open Sans bold, 12 to 13px, uppercase, tracking about 0.3em. Section headlines: large, heavy, uppercase, tight leading. Booking IDs are shown in Oswald with wide tracking, large.

## Shape, Borders, and Spacing

- **Square corners everywhere.** `rounded-none` is the default. No pill buttons, no rounded cards. (This replaces the rounded radius scale from the earlier template.)
- Thin 1 to 2px borders, not shadows. No drop shadows on dark surfaces.
- Generous vertical space between sections. Content width up to about 1200px on desktop, but photo panels and the mosaic run full-bleed.
- Dividers are short and bold (like the short black rule under the About headline) rather than long hairlines.

## Buttons

- **Solid**: `bg-button`, `border-button` (2px), white Oswald uppercase text with wide tracking, square. Hover: border turns white and the fill lightens slightly.
- **Outline**: transparent fill, 1px white border, white Oswald uppercase text. Hover: fills white with black text.
- **Primary booking button** is the solid style, always the most visible element in its area.
- Pressed state: slight shift down, never a bounce.
- These are app-level wrapper components in `components/brand/`. Never edit `components/ui/` shadcn files.

## Motion And Animation

Motion should feel slow, smooth, and expensive, never busy. CSS and the Intersection Observer first. Ask before adding an animation library (if approved, use the small `motion` package, loaded only where needed).

- **Page load**: the hero fades in over about 800ms: wordmark first, crest second, button last, each offset by about 150ms.
- **Scroll reveal**: sections and panels fade up by about 24px as they enter the viewport, once only. Gallery tiles reveal with a short stagger.
- **Panel hover (desktop)**: the photo slowly scales to about 1.04 over 600ms while the overlay darkens a little. On mobile, no hover effects.
- **Nav**: the floating bar fades slightly more opaque after scrolling, with the active section underlined.
- **Buttons**: smooth 200ms border and fill transitions.
- **Gallery viewer**: fade in with a gentle scale from 0.98 to 1.
- **Booking flow**: steps slide horizontally by a small amount with a fade, and the sticky summary bar updates without jumping.
- Everything respects `prefers-reduced-motion` by turning transforms and parallax off, keeping simple fades only.
- No autoplay video, no parallax-heavy effects, no scroll-jacking, and nothing that delays reaching Book.
- Animate only `opacity` and `transform` so mobile stays smooth.

## Page Descriptions

### Home (single page)
1. **Hero**: as described above. Book Now, plus Call and Directions as secondary actions that are visible without scrolling on a phone.
2. **Services**: category panels (see Service panels). Each leads to the full `/services` page at that category.
3. **Offers** (only when active): a compact horizontal strip or small panels in the same style.
4. **About**: the paper block with the studio's story.
5. **Gallery**: the black mosaic, with a See More button to `/gallery`.
6. **Location and contact**: black section. Address, opening hours, large Call button, Directions button, a map link. Optional "Chat on WhatsApp" link.
7. **Footer**: wordmark, quick links, socials, copyright. Black, small spaced uppercase links.

### Services page (`/services`)
Black page. Each category has a heading and a list of service cards. A service card is a wide, square-cornered row or tile: a small photo, the service name in Open Sans bold, duration and price in Oswald, a "Deposit required" label when relevant, and a solid Book button that opens `/book` with that service preselected.

### Gallery page (`/gallery`)
The mosaic at full size on black with the full-screen viewer (swipe on touch, arrows on desktop, close with a clear button).

### Booking page (`/book`)
A dark, focused page with the same floating bar. No account and no login.
- A thin stepper in small spaced uppercase: SERVICE, STAFF, TIME, YOUR DETAILS, CONFIRM.
- One decision per screen on mobile. Services and staff appear as photo tiles with a name and (for services) duration and price; the selected tile inverts to white with black text.
- Time slots are square outlined chips grouped by day part; the selected chip inverts.
- The details step has two large fields: name and phone number.
- A sticky bottom summary bar shows the selection, the price, whether a deposit is due, and the main solid button (BOOK, or PAY DEPOSIT).
- Errors appear inline in plain, friendly language.

### Confirmation page (`/booking/[token]`)
Black, centered. The crest, a large "BOOKING CONFIRMED" line in serif, the booking ID very large in Oswald with wide tracking, a short summary (service, staff, date and time, deposit status), then Call and Directions buttons. A line reminds the customer to show the booking ID at the studio.

### Admin (different on purpose)
The admin is a **tool, not a showcase**, and it is used at the counter on a phone, tablet, or laptop. It keeps the same fonts, square corners, thin borders, and charcoal buttons, but on the **paper** background with black text for readability and printing.
- Large touch targets, one clear primary action per screen, and plain labels.
- A persistent **"Find booking by ID"** field at the top of every admin screen.
- Data shown as cards on mobile and tables on larger screens.
- Bottom tab bar on mobile; left sidebar on desktop.
- The POS screen is the simplest in the app: big inputs, a clear total, one dominant button.
- Receipts are black and white only, narrow, print-ready.
- No decorative animation in the admin. Only quick state transitions (saving, saved, error).

## Component Library

shadcn/ui is the base for behavior and accessibility (sheet, dialog, inputs). Components live in `components/ui/` and are never edited. Brand styling is applied through wrapper components in `components/brand/` and through the tokens above, so the shadcn defaults never show through.

## Icons

Lucide React, stroke only. Social icons in the rail may use filled brand glyphs for recognition. Sizes: `h-4 w-4` inline, `h-5 w-5` in buttons, `h-8 w-8` in empty states.

## States

Every data-driven screen has designed loading (dark skeleton blocks, no spinners over photos), empty, and error states. Missing images show a neutral dark placeholder, never a broken icon.

## Craft Guidance For The Agent

- If your environment has a frontend or design skill available (for example Anthropic's `frontend-design` skill), use it for craft and polish, but **this file and the reference screenshots win** whenever they disagree. Do not drift toward generic "modern SaaS" styling.
- When unsure about a visual decision, choose the quieter, darker, more restrained option.
- Do not add decoration the references do not show (gradients, glows, gold, icons in circles, emoji, rounded cards).
- If a screen has no reference (booking, admin), extend the same language: black, square, thin borders, uppercase tracking, photo-led.
