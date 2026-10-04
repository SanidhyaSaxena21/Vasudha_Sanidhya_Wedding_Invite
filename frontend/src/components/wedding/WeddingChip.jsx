import React from "react";
import { GaneshaMark, HeartCircuit, LotusDivider } from "./ornaments";
import { ChipInterior } from "./ChipInterior";

const PIN_COUNT = 11;
const pins = Array.from({ length: PIN_COUNT });

const PinRow = ({ side }) => (
  <div className={`wc-pins wc-pins-${side}`} aria-hidden="true">
    {pins.map((_, i) => (
      <span key={i} className="wc-pin" style={{ "--pi": i }} />
    ))}
  </div>
);

// Page 1 — deep-burgundy IC package that opens like a jewellery box.
export const WeddingChip = ({ phase, reduced, onTap }) => {
  const opened = phase === "opening" || phase === "transition" || phase === "invitation" || phase === "done";
  const energized = phase === "signal" || opened;

  return (
    <div className={`wc-chip-wrap phase-${phase} ${energized ? "is-energized" : ""}`}>
      <button
        type="button"
        className="wc-chip-body"
        onClick={onTap}
        disabled={phase !== "idle"}
        aria-label="Open the wedding invitation"
        data-testid="wedding-chip-button"
      >
        <PinRow side="top" />
        <PinRow side="bottom" />
        <PinRow side="left" />
        <PinRow side="right" />

        <div className="wc-underglow" aria-hidden="true" />

        <div className={`wc-chip-3d ${reduced ? "is-reduced" : ""}`}>
          <ChipInterior open={opened} />

          <div className={`wc-lid ${opened ? "is-open" : ""}`}>
            <div className="wc-lid-face">
              <div className="wc-engrave-border" />
              <div className="wc-corner wc-corner-tl" />
              <div className="wc-corner wc-corner-tr" />
              <div className="wc-corner wc-corner-bl" />
              <div className="wc-corner wc-corner-br" />

              <GaneshaMark size={46} className="wc-ganesha" />

              <h1 className="wc-chip-title">
                <span>Two Hearts</span>
                <span>One Journey</span>
              </h1>

              <LotusDivider width={150} className="wc-chip-divider" />

              <HeartCircuit size={68} className="wc-chip-heart" />
            </div>
          </div>
        </div>
      </button>
    </div>
  );
};

export default WeddingChip;
