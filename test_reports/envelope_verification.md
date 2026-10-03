# 3D envelope — final fix verification

Date: 2026-10-03
Preview: https://diya-lit-vows.preview.emergentagent.com
Scope: frontend envelope redesign; no backend/auth changes.

## Independent test report follow-up
Initial report: iteration_1.json. No application files were modified by the testing agent.

1. **Card hidden by opened flap: RESOLVED.** Flap hinge Z now moves from 0.27 closed to 0.02 open, behind the insert at Z 0.085. Desktop and mobile screenshots show card top and gold border above the pocket in front of the opened flap.
2. **React transform-origin warning: RESOLVED.** Corrected shared.js JSX attribute to transformOrigin. Warning absent after continuation.
3. **Fallback inscription readability: RESOLVED.** Open flap uses a dedicated upright shape and positioned inscription. Responsive fallback dimensions prevent control overlaps. Mobile names and seal typography reduced to avoid clipping/wrapping.
4. **Three.js deprecated shadow type: RESOLVED.** Uses PCFShadowMap, supported by installed Three.js 0.186.1.

## Verified checks
- PASS: yarn build after final changes.
- PASS: live Three.js canvas ready; independent tester verified pixel variation across closed, mid-opening and open states.
- PASS: exact Two Journey One Heart and Sanidhya & Vasudha inscriptions.
- PASS: full 3D and fallback layouts at 1920x800 and 390x844; overflow offenders [] at both sizes.
- PASS: desktop/mobile opening, replay, repeated opening, and continuation.
- PASS: Enter/Space keyboard opening; focus moves to continuation for keyboard users.
- PASS: reduced motion shows readable open state without full animation.
- PASS: forced no-WebGL fallback open, replay, reduced motion and continuation.
- PASS: venue-map-link retains https://www.google.com/travel/hotels/s/woACXFERDhtoYqFE9.
- PASS: no uncaught JavaScript page errors in final check.

Verification logs:
- /root/.emergent/automation_output/20261003_133729/console_20261003_133729.log
- /root/.emergent/automation_output/20261003_133901/console_20261003_133901.log

Browser GPU readback/performance notices and an existing Framer Motion scroll-container advisory are non-blocking; no failing user flows observed. Forced WebGL unavailability deliberately exercises fallback.

Existing synthesized wedding.wav music remains PLACEHOLDER / MOCKED and was not replaced.