import { Flower2, Music, Flame, Sparkles } from "lucide-react";
import { FadeUp, SectionHeading } from "./shared";

const ROSE_IMG =
  "https://images.unsplash.com/photo-1676223564136-10e385c01793?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600";

/* PLACEHOLDER SCHEDULE — replace dates, times and venues with the real ones */
const EVENTS = [
  {
    id: "mehndi",
    icon: Flower2,
    name: "Mehndi",
    when: "Thursday, 12 February 2026",
    time: "4:00 PM onwards",
    where: "The Bride's Residence",
    note: "Henna, laughter and family rituals",
  },
  {
    id: "sangeet",
    icon: Music,
    name: "Sangeet",
    when: "Friday, 13 February 2026",
    time: "7:00 PM onwards",
    where: "Sunset Lawns, The Palace",
    note: "An evening of music and dance",
  },
  {
    id: "wedding",
    icon: Flame,
    name: "Vivah · Pheras",
    when: "Saturday, 14 February 2026",
    time: "8:00 PM · Shubh Muhurat",
    where: "Shiva Mandap, The Palace",
    note: "The sacred ceremony of seven vows",
  },
  {
    id: "reception",
    icon: Sparkles,
    name: "Reception",
    when: "Sunday, 15 February 2026",
    time: "7:00 PM onwards",
    where: "Grand Durbar Hall, The Palace",
    note: "Dinner, celebrations and blessings",
  },
];

const EventCard = ({ event, i }) => {
  const Icon = event.icon;
  const left = i % 2 === 0;
  return (
    <div
      className={`relative pl-14 md:pl-0 md:w-1/2 ${
        left ? "md:pr-14" : "md:ml-auto md:pl-14"
      } mb-12 md:mb-4`}
      data-testid={`event-card-${event.id}`}
    >
      {/* timeline node */}
      <span
        className={`absolute top-9 left-5 md:left-auto w-3 h-3 rotate-45 bg-gold shadow-[0_0_14px_rgba(201,154,69,0.8)] ${
          left ? "md:right-0 md:translate-x-1/2" : "md:left-0 md:-translate-x-1/2"
        } -translate-x-1/2 md:translate-y-0`}
      />
      <FadeUp delay={0.08} className="[perspective:1px]">
        <div className="relative bg-ivory text-wine rounded-t-[120px] rounded-b-xl px-7 pt-14 pb-9 text-center shadow-[0_25px_60px_rgba(0,0,0,0.45)] border border-gold/30">
          <div className="absolute inset-2.5 border border-gold/30 rounded-t-[108px] rounded-b-lg pointer-events-none" />
          <span className="absolute -top-1 left-1/2 -translate-x-1/2 flex items-center justify-center w-14 h-14 rounded-full bg-wine border border-gold/50 shadow-[0_0_24px_rgba(201,154,69,0.4)]">
            <Icon className="w-6 h-6 text-champagne" strokeWidth={1.5} />
          </span>
          <p className="font-cormorant text-[11px] uppercase tracking-[0.32em] text-burgundy/70 mt-2">{event.note}</p>
          <h3 className="font-cinzel text-2xl sm:text-[1.7rem] mt-2" style={{ color: "#4a0612" }}>
            {event.name}
          </h3>
          <div className="gold-hairline w-24 mx-auto my-4 opacity-80" />
          <p className="font-cormorant font-medium text-base sm:text-lg" style={{ color: "#3d040e" }}>
            {event.when}
          </p>
          <p className="font-cormorant text-sm sm:text-base mt-1" style={{ color: "#6b3a1a" }}>
            {event.time}
          </p>
          <p className="font-cormorant italic text-sm sm:text-base mt-3 text-burgundy/80">{event.where}</p>
        </div>
      </FadeUp>
    </div>
  );
};

const EventsTimeline = () => (
  <section className="relative py-24 sm:py-32 overflow-hidden" data-testid="events-section">
    <img src={ROSE_IMG} alt="" draggable="false" className="absolute inset-0 w-full h-full object-cover opacity-[0.12]" />
    <div className="absolute inset-0 bg-gradient-to-b from-wine via-burgundy/40 to-wine" />

    <div className="relative">
      <SectionHeading
        eyebrow="The Celebrations"
        title="Four Days of Joy"
        sub="From the first brush of henna to the final dance — every moment woven with love"
      />

      <div className="relative max-w-5xl mx-auto mt-16 px-6 sm:px-10">
        {/* rail */}
        <span className="absolute left-5 sm:left-8 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/60 to-transparent" />
        <div className="md:space-y-6">
          {EVENTS.map((e, i) => (
            <EventCard key={e.id} event={e} i={i} />
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default EventsTimeline;
