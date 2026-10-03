import { useEffect, useState } from "react";

const API = process.env.REACT_APP_BACKEND_URL;

const RsvpAdmin = () => {
  const [rows, setRows] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API}/api/rsvp`)
      .then((r) => { if (!r.ok) throw new Error("Failed to load"); return r.json(); })
      .then(setRows)
      .catch(() => setError("Could not load responses."));
  }, []);

  const attending = (rows || []).filter((r) => r.attending);
  const totalGuests = attending.reduce((s, r) => s + (r.guests || 0), 0);

  return (
    <div className="min-h-screen bg-wine text-ivory px-5 py-12 sm:px-10" data-testid="rsvp-admin-page">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-cinzel text-3xl sm:text-4xl text-foil tracking-[0.1em]">RSVP Responses</h1>
        <p className="font-cormorant text-ivory/70 mt-2">Sanidhya &amp; Vasudha · private guest list</p>

        {error && <p className="mt-8 text-red-300 font-cormorant" data-testid="rsvp-admin-error">{error}</p>}

        {rows && (
          <>
            <div className="flex flex-wrap gap-4 mt-8">
              <div className="rounded-xl border border-gold/40 bg-burgundy/40 px-6 py-4">
                <p className="font-cinzel text-3xl text-champagne" data-testid="rsvp-total">{rows.length}</p>
                <p className="font-cormorant text-sm text-ivory/70 uppercase tracking-widest">Responses</p>
              </div>
              <div className="rounded-xl border border-gold/40 bg-burgundy/40 px-6 py-4">
                <p className="font-cinzel text-3xl text-champagne" data-testid="rsvp-attending">{attending.length}</p>
                <p className="font-cormorant text-sm text-ivory/70 uppercase tracking-widest">Attending</p>
              </div>
              <div className="rounded-xl border border-gold/40 bg-burgundy/40 px-6 py-4">
                <p className="font-cinzel text-3xl text-champagne" data-testid="rsvp-guest-count">{totalGuests}</p>
                <p className="font-cormorant text-sm text-ivory/70 uppercase tracking-widest">Total Guests</p>
              </div>
            </div>

            <div className="mt-8 overflow-x-auto rounded-xl border border-gold/30">
              <table className="w-full text-left font-cormorant" data-testid="rsvp-table">
                <thead className="bg-burgundy/50 text-champagne">
                  <tr>
                    <th className="px-4 py-3 font-cinzel text-sm uppercase tracking-wider">Name</th>
                    <th className="px-4 py-3 font-cinzel text-sm uppercase tracking-wider">Attending</th>
                    <th className="px-4 py-3 font-cinzel text-sm uppercase tracking-wider">Guests</th>
                    <th className="px-4 py-3 font-cinzel text-sm uppercase tracking-wider">When</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.length === 0 && (
                    <tr><td colSpan="4" className="px-4 py-6 text-ivory/60 italic">No responses yet.</td></tr>
                  )}
                  {rows.map((r) => (
                    <tr key={r.id} className="border-t border-gold/15">
                      <td className="px-4 py-3 text-ivory">{r.name}</td>
                      <td className="px-4 py-3">
                        <span className={r.attending ? "text-green-300" : "text-red-300"}>
                          {r.attending ? "Yes" : "No"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-ivory/90">{r.guests}</td>
                      <td className="px-4 py-3 text-ivory/60 text-sm">
                        {r.created_at ? new Date(r.created_at).toLocaleString() : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {!rows && !error && <p className="mt-8 font-cormorant text-ivory/60" data-testid="rsvp-admin-loading">Loading…</p>}
      </div>
    </div>
  );
};

export default RsvpAdmin;
