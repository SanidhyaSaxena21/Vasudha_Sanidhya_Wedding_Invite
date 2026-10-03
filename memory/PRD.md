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
- RoyalEnvelopeHero: CSS/SVG envelope, wax-seal crack + sparkles, 3D flap, card slide + ivory-veil zoom; reduced-motion skip; keyboard.
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

## Backlog
- P1: Replace placeholder synth track with a real romantic instrumental (drop wedding.mp3 into public/music).
- P1: Photo gallery / couple section; Add-to-Calendar; countdown.
- P2: RSVP form → Mongo; share buttons; live map embed.

## Next Tasks
1. Swap the placeholder music file for a licensed instrumental.
2. Add RSVP form capturing attendance to the database.
3. Add couple photo gallery between Programme and Venue.
