import { useState, useRef, useEffect } from "react";
import { CalendarPlus, ChevronDown } from "lucide-react";

const LOCATION = "Hotel Green Palm, Pacific Mall, Kaushambi, Ghaziabad";

/* Times in UTC (IST = UTC+5:30) */
const EVENTS = [
  {
    key: "sangeet",
    label: "Lagun & Sangeet · 9 Dec",
    summary: "Sanidhya & Vasudha — Lagun & Sangeet",
    start: "20261209T113000Z",
    end: "20261209T163000Z",
    details: "Lagun & Sangeet Ceremony, 5:00 PM onwards, followed by Dinner.",
  },
  {
    key: "wedding",
    label: "Haldi, Bhaat & Baraat · 10 Dec",
    summary: "Sanidhya & Vasudha — Haldi, Bhaat & Baraat",
    start: "20261210T033000Z",
    end: "20261210T163000Z",
    details: "Haldi & Bhaat (9:00 AM onwards, Lunch) and Nikrausi of Baraat (5:00 PM).",
  },
];

const gcalUrl = (ev) =>
  `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(ev.summary)}&dates=${ev.start}/${ev.end}&details=${encodeURIComponent(ev.details)}&location=${encodeURIComponent(LOCATION)}`;

const buildIcs = () => {
  const stamp = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const vevents = EVENTS.map(
    (ev) =>
      `BEGIN:VEVENT\nUID:${ev.key}-sanidhya-vasudha@wedding\nDTSTAMP:${stamp}\nDTSTART:${ev.start}\nDTEND:${ev.end}\nSUMMARY:${ev.summary}\nDESCRIPTION:${ev.details}\nLOCATION:${LOCATION}\nEND:VEVENT`
  ).join("\n");
  return `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Sanidhya & Vasudha//Wedding//EN\nCALSCALE:GREGORIAN\n${vevents}\nEND:VCALENDAR`;
};

const downloadIcs = () => {
  const blob = new Blob([buildIcs()], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "sanidhya-vasudha-wedding.ics";
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
};

const AddToCalendar = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div className="relative inline-block" ref={ref} data-testid="add-to-calendar">
      <button
        type="button"
        data-testid="add-to-calendar-btn"
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-2.5 rounded-full border border-gold/60 bg-wine/60 px-6 py-3 text-champagne font-cormorant text-base tracking-[0.12em] uppercase transition-all duration-300 hover:border-gold hover:text-ivory hover:shadow-[0_0_24px_rgba(201,154,69,0.35)]"
        aria-haspopup="true"
        aria-expanded={open}
      >
        <CalendarPlus size={18} aria-hidden="true" />
        Add to Calendar
        <ChevronDown size={16} aria-hidden="true" className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div
          className="absolute left-1/2 -translate-x-1/2 mt-3 w-72 max-w-[86vw] z-20 rounded-xl border border-gold/40 bg-[#2a050c] shadow-[0_25px_60px_rgba(0,0,0,0.6)] p-2 text-left"
          data-testid="add-to-calendar-menu"
          role="menu"
        >
          <p className="font-cinzel text-[10px] uppercase tracking-[0.26em] text-champagne/70 px-3 pt-2 pb-1">Google Calendar</p>
          {EVENTS.map((ev) => (
            <a
              key={ev.key}
              href={gcalUrl(ev)}
              target="_blank"
              rel="noopener noreferrer"
              data-testid={`gcal-${ev.key}`}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2.5 font-cormorant text-ivory/90 text-base hover:bg-burgundy/60 transition-colors"
              role="menuitem"
            >
              {ev.label}
            </a>
          ))}
          <div className="gold-hairline w-full my-1.5 opacity-50" />
          <button
            type="button"
            data-testid="download-ics-btn"
            onClick={() => { downloadIcs(); setOpen(false); }}
            className="block w-full text-left rounded-lg px-3 py-2.5 font-cormorant text-ivory/90 text-base hover:bg-burgundy/60 transition-colors"
            role="menuitem"
          >
            Apple / Other (.ics) · Both days
          </button>
        </div>
      )}
    </div>
  );
};

export default AddToCalendar;
