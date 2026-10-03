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

## Wedding Chip opening rebuild — First 2 screens (2026-06 fork)
- Exact request: "Build the first two screens only... Page 1 — Interactive Wedding Chip Opening; Page 2 — Sanidhya & Vasudha / Integrated Circuit of Love. Create the exact same first 2 pages" (user provided two reference images). Rest of site kept unchanged.
- User choices: Three.js for a true 3D lid; NO tap sound; build from the uploaded reference images.
- Page 1 (`WeddingIntro.js` + `chip/ChipCanvas.js`): replaced the old 3D envelope intro. A burgundy VLSI "Wedding Chip" renders in Three.js over a generated candlelit burgundy-velvet ambiance background (`/images/chip/page1_bg.jpg`). Chip body = burgundy box, gold perimeter pins, engraved top face (generated `chip_face.jpg` + crisp "Two Hearts / One Journey" text composited via CanvasTexture), Ganesha + heart-circuit baked into face art. Idle: breathing underglow. Phase machine: closed → activating (gold SVG signal traces light up from edges toward chip) → opening (lid hinges up revealing glowing silicon die `chip_die.jpg` with heart) → morphing (camera pushes into die + radial gold→burgundy morph veil) → done → onComplete reveals Page 2. "Tap to Begin" lotus divider caption; dev replay button; reduced-motion + non-WebGL fallback (image crossfade).
- Page 2 (`InvitationHero.js`): replaced `MainInvitation` as the first scroll section (keeps id="story"). Generated burgundy invitation background (`/images/chip/page2_bg.jpg`) with lotus/damask/lanterns, an animated gold circuit border that draws in then energizes, a soft radial backdrop for legibility. Sequentially revealed (Framer Motion, slow): Ganesha (`ganesha.png`) → "|| Shree Ganeshaay Namah ||" → "Sanidhya & Vasudha" (Cormorant SC gold with left→right light sweep) → "An Integrated Circuit of Love" → self-drawing SignalWave → silicon quote → glowing HeartChip → scroll cue.
- Fonts added: Cinzel Decorative, Cormorant SC (index.html + tailwind `decorative`/`cormorantsc`).
- Assets generated (Gemini Nano Banana) in `/app/frontend/public/images/chip/`: page1_bg, page2_bg, chip_face, chip_die, ganesha(png, bg stripped).
- Old `RoyalEnvelopeHero.js` and `MainInvitation.js` remain in repo but are no longer imported.

## Verification (2026-06 fork)
- Independent frontend testing: /app/test_reports/iteration_2.json — 100% pass, 0 console/WebGL errors on desktop 1920×800 and mobile 390×844. Full tap→open→morph→reveal flow, all Page 2 testids, replay reset, and downstream sections verified.
- Both reference images matched closely in self-review screenshots.

## Backlog
- P1: Replace placeholder synth music track with a real romantic instrumental (drop wedding.mp3 into public/music).
- P1: Photo gallery / couple section; Add-to-Calendar; countdown.
- P2: RSVP form → Mongo; share buttons; live map embed.
- P2 optional: subtle ceremonial power-on chime on chip tap (user declined for now).

## Flat-chip + quadrant-tear redesign (2026-06 fork, update 2)
- User follow-up: "Keep this as the Background for the first Page" (uploaded a new clean burgundy-velvet image → now `/images/chip/page1_bg.jpg`), "make the Chip Flat and not lying on the Floor", and "For Transition... Tear the Chip in 4 quadrants, and in between make the 2nd page flow through".
- Replaced the Three.js angled 3D chip/lid with a FLAT, face-on chip in `WeddingIntro.js`: a single canvas composite (engraved `chip_face.jpg` + gold perimeter pins + crisp "Two Hearts / One Journey") rendered as 4 quadrant tiles (CSS `background-position` 0/100%). Idle gentle float + breathing underglow; `chip-flat`/`chip-quad`/`chip-crack` classes.
- Phase machine: closed → activating (signal traces light) → tearing (4 quadrants slide/rotate/scale outward + fade, a gold cross-crack flashes, Page-1 velvet bg + tint + traces fade to 0) → done. On tear start `onReveal()` mounts Page 2 beneath the fixed intro so it is revealed through the widening gap; on finish `onComplete()` removes the intro.
- App.js now tracks `revealed` (Page 2 mounted) and `introGone` (intro removed); scroll locked until `introGone`. `.chip-scene` background is transparent so Page 2 shows through during the tear.
- Three.js chip (`chip/ChipCanvas.js`) is no longer imported (kept in repo, unused).
- Verified on desktop 1920×800 and mobile 390×844: idle, mid-tear with Page 2 flowing through, and fully-revealed Page 2 all render; no console errors.

## Next Tasks

