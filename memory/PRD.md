# PRD — Sanidhya & Vasudha: Royal Wedding Invitation

## Original Problem Statement
Premium, cinematic, fully responsive interactive Indian wedding invitation website for Sanidhya & Vasudha. Burgundy/deep-wine/antique-gold/ivory candlelight & rose-petal royal theme; 3D envelope opening with wax seal; subtle VLSI motifs (gold PCB traces, heart-IC) that never dominate; single-page cinematic scroll, mobile-first, gentle animations. Expanded per family brief: Section 2 Reveal (shloka, names, "An Integrated Circuit of Love", signal-wave divider, silicon quote, heart-IC motif), Section 3 Formal Invitation (full traditional text with family names) behind a burgundy floral arch with click-transition, Section 5 Programme (3 functions with progressive glowing circuit traces + RSVP/Welcoming/Best Compliments columns), Section 10 cinematic ending (arch, lanterns, floor traces forming a glowing heart), floating music control (no forced autoplay, replaceable file), minimal mobile floating menu (Our Story/Invitation/Programme/Location/RSVP) + Back-to-Top after programme.

## Real Wedding Details (from family)
- Date: 10th December 2026, 5 PM onwards
- Venue: Hotel Green Palm, Pacific Mall, Kaushambi, Ghaziabad — https://www.google.com/travel/hotels/s/woACXFERDhtoYqFE9
- Blessed by: Late Raj Dulari Saxena & Late Narendra Bihari Lal Saxena
- Groom: Sanidhya (Son of Smt. Nidhi Saxena & Shri Sanjay Saxena)
- Bride: Vasudha (Daughter of Smt. Kusum Sharma & Shri Subhash Sharma)
- Programme: Lagun & Sangeet (9th Dec, 5 PM onwards, Dinner) · Haldi & Bhaat (10th Dec, 9 AM onwards, Lunch) · Nikrausi of Baraat (10th Dec, 5 PM)
- RSVP: Rachna+Saurav Saxena, Amita+Gaurav Saxena, Minakshi+Manu Dalela · Welcoming: Manika Dalela, Manya Dalela, Shaurya Saxena, Vaibhav Saxena · Best Compliments: Mr MB Saxena (BABA), Mrs Ratna Dalela (Nani)

## Architecture (frontend-only; FastAPI/Mongo template untouched)
- App.js: envelope→reveal state machine, Lenis smooth scroll + scrollTo helper, ErrorBoundary, grain/vignette, ambient petals, FloatingNav, MusicDock.
- RoyalEnvelopeHero: real Three.js burgundy craft-paper envelope, gold wax seal, hinged flap, ivory insert; closed → opening → open state machine. Open state holds for reading, with explicit Open invitation continuation and replay. Keyboard focus and reduced-motion support.
- components/envelope/EnvelopeCanvas.js: font-ready WebGL renderer, responsive camera, opening choreography, resource cleanup, no unnecessary static-state redraws, no-WebGL/context-loss fallback.
- components/envelope/createEnvelopeScene.js: layered paper meshes, lighting, shadows, hinge and gold seal. paperTextures.js: deterministic fibrous bitmap stock, gold floral/PCB motifs and inscriptions. EnvelopeFallback.js: readable HTML/CSS fallback.
- MainInvitation (S2): masked script-name reveal, subtitle, SignalWave divider, silicon quote, HeartChip, "Open the Invitation" bloom-transition CTA.
- FormalInvitation (S3): ivory card inside generated floral-arch PNG (transparency restored via local processing), PCB corners, full family text, date/venue.
- Programme (S5): glowing circuit frame + PcbCorners, 3 arch-top ivory cards (Music/Flame/custom Horse icons), gradient circuit connectors with glow nodes animating in-view, venue line.
- RsvpCards: three gold-framed ivory columns with HeartChip motifs.
- VenuePalace (Location): arch parallax imagery (decorative), real venue + maps link.
- EditorialFooter: marquee (real details), monogram, silicon line.
- EndingScene (S10): generated sunset-arch scene, floor circuit traces drawing into a glowing heart, staged fade-ins, HeartChip emblem.
- MusicDock: ♫ Play Music pill; soft fade-in attempt after envelope reveal (no forced autoplay); /music/wedding.mp3 → wedding.wav fallback (currently a synthesized tanpura-style instrumental placeholder — replace file to change).
- PetalCanvas: rose petals + gold bokeh canvas.

## Implemented (2026-10-03)
Sections 1/2/3/5/Location/RSVP/10, music dock, floating nav + back-to-top, all interactions listed in the brief (envelope, seal, card reveal, parallax, animated traces, nodes, petals, flicker, particles, fade-ups, scroll reveals, ending heart animation).

### 3D craft-paper opening update (2026-10-03)
- Latest exact request: "We want the fist envolope as a 3D in a craft paper texture. Then it should also open like this as shown in the Image, with Two Journey One Heart written on the Flap, with Sanidhya & Vasudha written inside the Envelope." User approved this focused update, preserving other sections.
- Added Three.js via yarn. Replaced prior flat/clipped envelope with actual hinged paper geometry, physical lighting/shadows, matte fibrous burgundy stock, antique-gold botanical details, subtle PCB corners, and a raised gold S & V seal. Existing photographic candlelit wooden background preserved.
- Exact inside-flap inscription: "Two Journey One Heart" (two lines, deliberately preserving singular Journey). Ivory card reads "Sanidhya & Vasudha" in script.
- Seal lifts, flap opens, insert rises in front of the opened hinge; scene remains open until user selects Open invitation. Close/replay allows another viewing. Correct scene date is 10 December 2026 (removed former February placeholder).
- Keyboard Enter/Space, focus handoff, reduced-motion instant reveal (without skipping requested text), responsive fitting and no-WebGL fallback verified.
- Fixed card/flap depth ordering, fallback inscription placement and mobile-name clipping. Fixed existing shared.js transformOrigin JSX warning; selected supported Three.js PCFShadowMap.
- VenuePalace's existing View Venue href already matches the requested exact link; no venue edits made.
- No API, backend, authentication, database, or existing music changes. Background audio remains a synthesized PLACEHOLDER / MOCKED track.

## Verification (2026-10-03)
- Production frontend build: PASS (yarn build).
- Independent frontend testing: /app/test_reports/iteration_1.json. Initial 88% report found hinge layering, fallback readability and JSX casing issues; all resolved and subsequently self-verified.
- Final fix verification: /app/test_reports/envelope_verification.md. Desktop 1920×800 and mobile 390×844 screenshots show full inscriptions, correctly layered insert and no horizontal overflow.
- Tested actual nonblank canvas and changing pixels during opening, repeated opening, double-click handling, keyboard, reduced motion, forced WebGL fallback, and continuation to existing sections. No uncaught page errors in final run.
- No login or credentials are required for this public invitation.

## Backlog
- P0: None known; user visual approval of updated opening pending.
- P1: Replace placeholder synth track with a real romantic instrumental (drop wedding.mp3 into public/music).
- P1: Photo gallery / couple section; Add-to-Calendar; countdown.
- P2: RSVP form → Mongo; share buttons; live map embed.
- P2 optional enhancement: subtle paper-opening sound, only after user approval and an appropriate licensed asset.

## Next Tasks
1. User reviews updated textured envelope, readable open state, and continuation.
2. Swap the placeholder music file for a user-selected licensed instrumental when supplied/requested.
3. RSVP form, couple gallery, Add-to-Calendar and countdown remain future work, not part of this completed envelope scope.
