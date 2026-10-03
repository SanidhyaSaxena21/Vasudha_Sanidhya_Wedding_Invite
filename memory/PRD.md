# PRD — Sanidhya & Vasudha: Royal Wedding Invitation

## Original Problem Statement
Build a premium, cinematic, fully responsive interactive Indian wedding invitation website for Sanidhya & Vasudha. Luxurious burgundy/deep-wine/antique-gold/ivory, candlelight & rose-petal theme, royal envelope experience (wax seal → flap → ivory card zoom → site reveal), subtle VLSI/circuit motifs (gold PCB traces, heart-shaped IC symbol) that never dominate, single-page cinematic scroll, mobile-first, Cormorant Garamond/Cinzel + script font, gentle animations only. (User's build prompt was truncated at the envelope sequence; full cinematic opening chosen via clarification.)

## User Choices (clarified)
- Wedding details: elegant placeholders (clearly marked, replaceable)
- Music: none (silent)
- Sections: minimal — invitation card, events timeline, venue only

## Architecture
- Frontend only (React 19 + CRA/craco, Tailwind, framer-motion 11, lenis 1.3). No backend routes added; FastAPI/Mongo template untouched (health endpoint intact).
- `App.js` — phase state (envelope → reveal), Lenis smooth scroll after reveal, ErrorBoundary, film-grain + vignette overlays, ambient petal layer.
- `components/RoyalEnvelopeHero.js` — CSS/SVG-built envelope: velvet body, gold double frame, PcbCorner traces, flap 3D rotateX two-face, wax seal (S&V, crack path, sparkle burst), state-machine choreography (idle→seal→flap→card→zoom→done), reduced-motion skip, keyboard support.
- `components/PetalCanvas.js` — canvas rose petals + twinkling gold bokeh (26/20 envelope, 12/12 ambient, DPR-aware, reduced-motion static).
- `components/MainInvitation.js` — shloka, masked line-by-line script names (Great Vibes gold foil), parallax watermark heart-circuit, ivory veil transition.
- `components/EventsTimeline.js` — Mehndi/Sangeet/Vivah·Pheras/Reception, center rail + diamond nodes, arch-top ivory cards (arched like palace windows).
- `components/VenuePalace.js` — arch-masked palace photo w/ parallax, secondary dome photo, placeholder address, Maps link, dress code.
- `components/EditorialFooter.js` — slow 46s marquee, heart-circuit monogram, "a little bit of silicon" line.
- `components/shared.js` — EASE curve, FadeUp, SectionHeading, GoldRule, HeartCircuit, PcbCorner, CornerFlourish SVGs.
- `public/favicon.svg` — heart-circuit mark; index.html — fonts (Cinzel/Cormorant Garamond/Great Vibes), OG meta, theme-color.

## Personas
- Wedding guest (mobile, primary): opens WhatsApp link, taps seal, scrolls events/venue.
- Couple/family (editor): replaces placeholder dates/venue in one constants block per component.

## Core Requirements (static)
Palette #4A0612/#25040A/#C99A45/#E1BF78/#F7EBD5/#FFF4DF · envelope opening choreography · single-page scroll · subtle VLSI motifs · mobile-first · no music · placeholders clearly marked.

## Implemented (2026-10-03)
- Envelope scene + full opening choreography ✔
- Hero invitation w/ masked reveal + parallax ✔
- Events timeline (4 events, placeholders) ✔
- Venue palace section w/ parallax + maps link ✔
- Marquee + footer monogram ✔
- Ambient petals/bokeh, grain, vignette, Lenis scroll ✔
- Favicon, meta, reduced-motion, keyboard, testids ✔

## Backlog
- P0: Replace placeholder dates/venue (constants at top of MainInvitation/EventsTimeline/VenuePalace/EditorialFooter).
- P1: RSVP form (backend + Mongo), Add-to-Calendar buttons, countdown timer.
- P1: Background shehnai track w/ mute toggle.
- P2: Couple photo gallery, dress-code detail page, share-to-WhatsApp button, live map embed.

## Next Tasks
1. Swap placeholder details with real ones (user provides).
2. Add RSVP form capturing guest name + attendance to Mongo.
3. Add countdown to wedding muhurat on hero.
4. Add photo gallery of the couple.
