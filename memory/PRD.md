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

### Simple SVG Wedding-Chip symbol (2026-06 fork)
- Exact request: "Instead of this Image, use a simple good Chip symbol ... smooth [transition], and its side pins and heart should glow and then it should go to second page. Use this Github repo (Wedding_Invite_2) and copy the First transition semantics." User chose option B (heart + "Two Hearts / One Journey" engraved text).
- `WeddingIntro.js`: removed the raster `chip_element.png` image chip. Built a crisp CSS/SVG IC chip — burgundy engraved face with gold border + corner flourishes, 9 gold pins per side (all 4 sides), "Two Hearts / One Journey" (Cinzel), LotusDivider, and an inline `HeartCircuit` SVG with glow. Whole chip is the button.
- Transition semantics copied from the repo's theme kit: phases idle→signal→opening→transition→invitation. On tap pins light sequentially (55ms stagger `--pi`), underglow surges, heart powers/pulses, gold PCB traces (CircuitTrace) radiate out, then Framer push-in (scale→6, fade+brighten) morphs into Page 2 which emerges (scale 1.12→1). Reduced-motion fallback preserved.
- `App.css`: replaced `.chip-flat/.chip-face/.chip-heart-pulse` image rules with `.wedchip*` pin/face/heart glow styles. Verified desktop 1920×800 + mobile 390×844: idle, energized (pins+heart glow, traces radiate), push-in, and Page 2 reveal all correct.

### Venue photos, iPhone perf, RSVP email+export, standalone Countdown (2026-06 fork)
- Requests: remove Hindu-temple venue photos → use uploaded SK Klyde Grand Hotel & Banquets images (user kept the "Hotel Green Palm" TEXT/name as-is — venue photos now show SK Klyde Grand, a known cosmetic mismatch the user accepted); iPhone slow render fix; RSVP "invited with Family" + no guest count + email all responses to sanidhyasaxena99@gmail.com (subject `[Wedding Invite] Response - <Family Name>`); Excel export of responses; bold/glowing ending names + "9th & 10th December 2026"; make Countdown its OWN page (iPhone scroll lag) with a ">> Venue Details" advance to the Venue page.
- VenuePalace.js: local optimized images `/images/venue/venue-main.jpg` (hotel, 243KB) + `venue-court.jpg` (courtyard, 95KB); switched arch/portrait layout to landscape (aspect-4/3 main + 16/10 inset), `loading=lazy decoding=async`. Name/address/map link unchanged (Hotel Green Palm).
- iPhone perf: `.chip-scene` got `will-change/transform:translateZ(0)/backface-visibility`; removed `blur(2px)` from `.chip-bg` (expensive during the 7x scale); lazy-loaded ending bg.
- RsvpCards.js: removed guests input + state; label "Family Name"; added "You are cordially invited with Family"; POST now sends `{name, attending}` only (backend guests defaults to 1).
- Email: new `/app/backend/email_util.py` (Emergent-managed email, keyless — `EMERGENT_EMAIL_KEY`/`EMAIL_FROM_NAME`/`OWNER_EMAIL` in backend/.env; includes the required `_assert_safe_email` guardrail gate). `create_rsvp` awaits `email_rsvp(name, attending, when)` (failures caught, never break the save). Verified: POST 200, no email error in logs.
- Excel export: `GET /api/rsvp/export` → .xlsx via openpyxl (StreamingResponse). Admin page: removed Guests column + Total-Guests stat, added "Download Excel" button (`rsvp-export-btn`). Verified xlsx headers + content via curl.
- App.js: PAGE_COUNT 4→5. Pages: 0 Invitation · 1 Formal · 2 Programme · 3 **Countdown (standalone)** · 4 ScrollGroup (Venue+RSVP+Footer+Ending). Countdown.js takes `onNext`, replaced the scroll cue with a glowing `ChevronsRight` ">> Venue Details" advance.
- EndingScene.js: names + date now `text-foil` with layered gold glow text-shadow + a radial dark halo backdrop for contrast on burgundy; date is bold "9th & 10th December 2026".
- Verified full flow on 390×844: standalone countdown, >> to venue (SK Klyde Grand images), RSVP (no guests, family note), glowing ending, admin Download Excel.


- Exact requests: "make the transition also from the Tap to Begin link or The heart (Both the Places)"; "look at the github repo and create the exact same transition for the First page ... Glow, speed and everything"; "The third page (White Page) is not rendering in iphone, fix that"; "Real Wedding Music: replace placeholder" (user chose to UPLOAD their own track at the end — player already wired to `/music/wedding.mp3`).
- WeddingIntro.js: matched repo WeddingInvitation timings exactly — TIMINGS {signal:1000, opening:1300, transition:2200}; push-in scale 6→7, duration 2.0→2.2s, ease [0.6,0,0.2,1], brightness 1.4. Made "Tap to Begin" a real button (`onClick=begin`) so BOTH it and the chip start the opening; added `.chip-tap` button-reset + focus styles in App.css.
- App.js: re-added the repo's Page-2 emerge for the first reveal only — page-0 wrapper `initial scale 1.14 (reduced 1.02) → 1` over 2.2s, transformOrigin 50% 45%; added `useReducedMotion`.
- iPhone "white page not rendering" ROOT CAUSE (two bugs): (1) FormalInvitation/Programme used framer `whileInView` which is unreliable on iOS Safari when the element mounts under a transformed/animating ancestor behind the heart-transition overlay → stayed at opacity 0. Fixed by converting those always-in-view paged sections to animate-on-mount: added `mount` prop to shared `FadeUp`, applied to all FadeUps in both files, and switched the card/arch/EventCard/Connector motion blocks from whileInView→animate. (2) The new 2.2s page-0 transition was inherited as its EXIT, so navigating away left a ~2s blank gap after the 1.5s heart veil. Fixed with an explicit fast `exit={{opacity:0, transition:{duration:0.5}}}` on the page wrapper. Verified on 390×844: ivory card renders at opacity 1, back nav works.


- Page 2 (InvitationHero): names forced onto one line with the ampersand centered — `.inv-names` now `flex-wrap:nowrap; white-space:nowrap` with reduced clamp sizes (`.inv-names-sweep` 28→78px, `.inv-amp` 22→44px).
- Page 3 (FormalInvitation): the "Tap the heart for the Programme" advance control moved ONTO the ivory card (above date/venue) via a new `onPaper` variant of `AdvanceHeart` (dark-gold heart + `#8a5a1e` label); removed the hard-to-see heart that floated below the card. Fixed name "Smt. Kusum Sharma" → "Smt. Kusum Lata". Page advance already resets scroll to top (goTo).
- `PageFlow.AdvanceHeart`: added `onPaper` prop (stroke/trace + `.page-advance.on-paper` CSS for light backgrounds).
- Countdown: added a "Scroll down for the Venue" button cue (lucide `ChevronDown`, bouncing) that smooth-scrolls to `#location`.
- VenuePalace: replaced the royal-arch Unsplash images with ornate Hindu temple monuments (golden-hour temple main + gopuram inset); updated alt text.
- RsvpCards: replaced Accept/Decline with two playful accept options — "Joyfully Accept" and "Okay You win, I'm In" (new `choice` state; both set attending=true; `data-testid` rsvp-attend-yes / rsvp-attend-win).
- EndingScene: lifted "Sanidhya & Vasudha" + "December 2026" to the top of the scene (into the clouds) with strong text-shadow for visibility; closing floor-heart block moved to bottom via `justify-between`. Kept & between.
- Verified desktop 1920×800 + mobile 390×844 across all changed pages.

- Exact request: "Copy the exact same structure in the Repository. Once we click, it should ... show with a heart coming in between and then a clean transition into the next page background ... do not make it in the scroll format, in the Second page there is a heart at the end. Make it glow and ask the user to click that and then move to next page. But keep the First page transition same." User (Q1) confirmed a heart at the end of each page; flow: Invitation → (heart) Formal → (heart) Programme → (after Add-to-Calendar, a Countdown icon) → Countdown; "then keep it scroll". (Q3) add Back button. (Q4) per-page internal scroll on phone OK.
- `components/PageFlow.js` (new): `AdvanceHeart` (glowing pulsing HeartCircuit button + halo + label), `AdvanceCountdown` (glowing lucide `Timer` dial), `BackButton` (fixed top-left pill), and `HeartTransition` (full-screen burgundy veil with a gold heart growing/glowing in the center — the "heart coming in between").
- `App.js` rebuilt into a 4-page state machine (0 Invitation · 1 Formal · 2 Programme · 3 ScrollGroup). `goTo(next)` plays the HeartTransition veil (fade-in 0.5s), swaps the page at 650ms with scroll reset (Lenis + window), unlocks at 1500ms. `AnimatePresence mode="wait"` crossfades pages. Back button shown on pages >0. ScrollGroup = Countdown + VenuePalace + RsvpCards + EditorialFooter + EndingScene (normal Lenis scroll). Chip intro (Page 1) transition unchanged. Removed `FloatingNav` (scroll-anchor nav no longer valid in paged mode).
- Advance controls wired into `InvitationHero.js` (onNext, replaced old HeartChip+scroll-cue with AdvanceHeart), `FormalInvitation.js` (onNext + AdvanceHeart "Tap the heart for the Programme"), `Programme.js` (onNext + AdvanceCountdown after Add-to-Calendar). CSS for `.page-advance/.advance-heart/.advance-countdown/.page-back/.heart-transition` appended to `App.css` with reduced-motion fallback.
- Verified desktop 1920×800 + mobile 390×844: chip→invitation, each heart/countdown advance with the heart veil, formal/programme/countdown pages, and Back navigation (hidden on first page). Only horizontal-overflow offender is the pre-existing EditorialFooter marquee (intentional animated ticker), not a regression.



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

## Chip element swap + radial signals (2026-06 fork, update 3)
- User supplied a finished transparent chip PNG → saved as `/images/chip/chip_element.png` and used directly (no more canvas compositing). Fixes the "black strips" complaint: chip PNG is transparent, `.chip-scene`/`.chip-stage` backgrounds are transparent, and `.chip-quad` uses a warm gold drop-shadow (not a dark one).
- On tap, a new `RadialSignals` SVG bursts gold electronic signal lines OUTWARD from the chip centre in all 22 directions (PCB-style elbows, `sig-draw` + looping `sig-flow`), then the chip tears into 4 quadrants and Page 2 flows through.
- Verified: /app/test_reports/iteration_3.json — 100% frontend pass on desktop + mobile, no black strips, no console/image errors.

## Countdown added + transition reference pending (2026-06 fork, update 6)
- Added `Countdown.js` after the Programme section: live countdown to 10 Dec 2026 20:00 IST ("Until We Say Forever"), Days/Hours/Minutes/Seconds, gold+burgundy styling, PcbCorner accents. Verified ticking on mobile + desktop.
- BLOCKED: user asked to copy the transition + chip pins + heart glow from an external "chip-to-invitation" project shared only as a password-protected VS Code editor link (vscode-…/?folder=/app) — not accessible by agent tools. Current signal/glow transition kept in place until the user provides the reference code, a recording, or the live app URL.

## Reference push-in transition ported (2026-06 fork, update 7)
- User shared the external "chip-to-invitation" project's code (WeddingInvitation/WeddingChip/CircuitTrace/wedding.css). Ported its signature transition into our app, keeping all else the same.
- `WeddingIntro.js` rewritten to phases idle → signal → opening → transition → done. On tap: `CircuitTrace` (ported to `CircuitTrace.js`) gold traces energize/radiate outward, pins + heart glow (heart-power), chip brightens; then the whole `chip-scene` scales up (Framer scale 6) + fades (push-in, ease [0.6,0,0.2,1]) while Page 2 (`InvitationHero`) emerges scaling 1.12→1 (wrapper in App.js). Chime + mute + replay retained.
- Kept our chip art (`chip_element.png`, already has gold edge-pins + heart), our Page 2, countdown, RSVP, formal page. Verified mobile + desktop, page2 reveal PASS, no console errors.

## Next Tasks
- Couple gallery, music swap remain future work.

## Transition softened + contrast fixes (2026-06 fork, update 5)
- Transition: removed the dense PCB burst; now a heart glow + a few (8) slow PCB traces (`SimpleSignals`, `chip-signals--slow`) draw gently outward, then the chip zooms/fades and crossfades into Page 2 (~3s).
- Page 2 (`InvitationHero`) background simplified to a clean burgundy (`.inv-bg` brightness 0.62 + blur, darker tint) so content is the focus.
- Formal invitation (ivory section 3): SANIDHYA & VASUDHA now use `.text-foil-dark` (dark antique-gold gradient) for legibility on the light card.

## PCB-signal transition + chime + RSVP + calendar (2026-06 fork, update 4)
- Chip refined to the user-supplied transparent PNG (`chip_element.png`, subtle interior, same gold border + pins). Page 1 background subdued into a simple burgundy (darken+blur) with a thin gold border frame; consistent on mobile + desktop.
- NEW cinematic transition (`WeddingIntro.js`, replaces quadrant tear): phases closed→activating (chip scales ~1.035, heart powers on, pins brighten)→signaling (gold PCB `RadialSignals` draw outward in all directions + champagne pulses)→transforming (chip scales down+fades, Page-1 bg/tint/frame crossfade, Page 2 mounts beneath)→dissolving (signals blur+fade)→done. Easing cubic-bezier(0.22,1,0.36,1). Page 2's own circuit border/waveform/heart-chip draw in during the overlap = "powered by the signal". ~3s total.
- Ceremonial chime: `/music/chime.wav` (synthesised soft temple-bell) plays on tap; mute toggle (`chip-sound-toggle`, persisted in localStorage).
- Live RSVP: backend `POST/GET /api/rsvp` (Mongo `rsvps`; fields name/attending/guests; name min 2, guests 1–50). Real form in `RsvpCards.js` (accept/decline paths, success state). Private admin list at route `/rsvp-admin` (`RsvpAdmin.js`, no login) with summary counts + table.
- Add to Calendar (`AddToCalendar.js` in Programme): Google Calendar links for 9 Dec Sangeet & 10 Dec Haldi/Baraat + combined `.ics` download. Times stored UTC (IST−5:30).
- Verified: /app/test_reports/iteration_4.json — backend 5/5 pytest, frontend 100%, no console errors, desktop + mobile. Empty-name POST now returns 400; test seed rows cleaned.

## Page 1 flat signal-board redesign (2026-06 fork, update 5)
- Replaced the 3D jewellery-box chip intro with a flat velvet + antique-gold PCB landing page matching the user's uploaded design (`WeddingIntro.js`).
- New `components/wedding/SignalBoard.jsx`: symmetric gold circuit framing the centre, a heart woven into the lower circuit, connection pads, and title bus bars. On tap, bright champagne "signals" draw along every trace and GATHER UP to the "Two Hearts One Journey" title (`sb-draw` keyframe, pathLength-normalised stroke-draw; per-trace stagger). Then the whole scene scale-pushes + fades into the main invitation (phases idle→signal 1.8s→transition 1.9s→done).
- Ambiance background regenerated (`/images/chip/page1_velvet_bg.jpg`): blurred candles/lanterns/rose petals on burgundy velvet (user chose recreated imagery over the raw screenshot).
- Kept "Tap to Begin" + chime. CSS added to `wedding/wedding.css` (`.sb-*`), stage is a portrait-ratio centred column (fills width on mobile).
- Verified end-to-end via Playwright @390px: tap fires `is-live`, pulses animate toward the title, intro transitions to InvitationHero (Sanidhya & Vasudha).

## IC-chip page 1 + outward signals + rich desktop bg (2026-06 fork, update 6)
- Page 1 reworked into an imaginary IC "chip": a gold chip-box (border + 20 legs/pins) holds the title as "Two Hearts" / glowing **S&V monogram heart** / "One Journey". Ganesha sits above the chip.
- 20 wires now radiate OUTWARD from all four chip sides to edge pads. On tap, bright signals **flow outward** from the chip (`sb-draw`, box→edge). Idle **shimmer** (`sb-shimmer`, looping) + box breathe = "powered on" before tap.
- Heart glows continuously (`sb-heart-beat`), intensifies when live; "S&V" monogram centred inside it.
- Tablet/desktop no longer bland: full-screen **blurred backdrop** of the same velvet image behind a centred portrait **card** (sharp bg + gold border + shadow) via `.sb-backdrop` / `.sb-stage`. Mobile unchanged (card fills screen).
- Charge-up tone: synthesised rising sweep `/music/chargeup.wav` plays on tap (replaces chime).
- Ending page: names now render on three lines (Sanidhya / & / Vasudha), top-clip fixed.
- Verified via Playwright at mobile/tablet/desktop: outward flow, idle shimmer, transition to invitation, audio=chargeup.wav, no console errors.

## Full-bleed bg + heart tap + paged venue flow (2026-06 fork, update 7)
- Page-1 background now **full-bleed on every device** (fixes black letterbox borders). Portrait image `page1_velvet_bg.jpg` for portrait orientation, landscape `page1_velvet_bg_wide.jpg` for landscape (desktop/tablet-landscape) via `@media (orientation)`. Board sits in a transparent ratio-locked centred stage over the full-bleed bg.
- The **S&V heart is now tappable** (`data-testid="heart-tap-begin"`) and starts the same intro sequence as "Tap to Begin".
- Scroll group split into separate **fixed paged screens**: page 4 Venue, 5 RSVP, 6 Finale (Ending + Footer). PAGE_COUNT=7. Each advances via the glowing heart (Venue/RSVP got `AdvanceHeart`). Removed the venue scroll parallax (`useScroll/useTransform`) and set the main venue image to eager load — fixes the slow/janky scroll after the countdown.
- Verified via Playwright @390px + @1440: full-bleed bg (390x844, no bands), heart-tap → is-live, Countdown→Venue→RSVP→Finale navigation, RSVP POST success, back button, landscape bg on desktop, no console errors.



