import { useEffect, useState, useCallback } from "react";

const API = process.env.REACT_APP_BACKEND_URL;
const TOKEN_KEY = "rsvp_admin_token";

const LoginGate = ({ onAuthed }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!password.trim() || busy) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`${API}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: password.trim() }),
      });
      if (!res.ok) throw new Error("bad");
      const data = await res.json();
      sessionStorage.setItem(TOKEN_KEY, data.token);
      onAuthed(data.token);
    } catch {
      setError("Incorrect password. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-wine text-ivory flex items-center justify-center px-6" data-testid="admin-login-gate">
      <form onSubmit={submit} className="w-full max-w-sm bg-burgundy/40 border border-gold/40 rounded-2xl px-7 py-10 text-center shadow-[0_25px_60px_rgba(0,0,0,0.5)]">
        <h1 className="font-cinzel text-2xl sm:text-3xl text-foil tracking-[0.1em]">Private Access</h1>
        <p className="font-cormorant text-ivory/70 mt-2">Sanidhya &amp; Vasudha · guest list</p>
        <div className="gold-hairline w-20 mx-auto my-6 opacity-80" />
        <label htmlFor="admin-pass" className="block font-cinzel text-xs uppercase tracking-[0.2em] text-champagne/80 mb-2 text-left">
          Password
        </label>
        <input
          id="admin-pass"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          data-testid="admin-password-input"
          placeholder="Enter admin password"
          autoFocus
          className="w-full rounded-lg border border-gold/50 bg-white/10 px-4 py-3 font-cormorant text-lg text-ivory placeholder:text-ivory/40 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/30"
        />
        {error && <p className="text-red-300 font-cormorant mt-3" data-testid="admin-login-error">{error}</p>}
        <button
          type="submit"
          disabled={busy}
          data-testid="admin-login-btn"
          className="w-full mt-6 font-cinzel text-xs uppercase tracking-[0.2em] text-wine bg-gold rounded-full px-5 py-4 hover:bg-champagne transition-colors disabled:opacity-50"
        >
          {busy ? "Unlocking…" : "Unlock"}
        </button>
      </form>
    </div>
  );
};

const RsvpAdmin = () => {
  const [token, setToken] = useState(() => sessionStorage.getItem(TOKEN_KEY) || "");
  const [rows, setRows] = useState(null);
  const [error, setError] = useState(null);

  const load = useCallback((t) => {
    setRows(null);
    setError(null);
    fetch(`${API}/api/rsvp`, { headers: { Authorization: `Bearer ${t}` } })
      .then((r) => {
        if (r.status === 401) {
          sessionStorage.removeItem(TOKEN_KEY);
          setToken("");
          throw new Error("auth");
        }
        if (!r.ok) throw new Error("Failed to load");
        return r.json();
      })
      .then(setRows)
      .catch((e) => { if (e.message !== "auth") setError("Could not load responses."); });
  }, []);

  useEffect(() => {
    if (token) load(token);
  }, [token, load]);

  const logout = () => {
    sessionStorage.removeItem(TOKEN_KEY);
    setToken("");
    setRows(null);
  };

  if (!token) return <LoginGate onAuthed={setToken} />;

  const attending = (rows || []).filter((r) => r.attending);
  const totalGuests = attending.reduce((sum, r) => sum + (Number(r.guests) || 1), 0);

  return (
    <div className="min-h-screen bg-wine text-ivory px-5 py-12 sm:px-10" data-testid="rsvp-admin-page">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-cinzel text-3xl sm:text-4xl text-foil tracking-[0.1em]">RSVP Responses</h1>
            <p className="font-cormorant text-ivory/70 mt-2">Sanidhya &amp; Vasudha · private guest list</p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={`${API}/api/rsvp/export?token=${encodeURIComponent(token)}`}
              data-testid="rsvp-export-btn"
              className="inline-flex items-center gap-2 font-cinzel text-xs uppercase tracking-[0.2em] text-wine bg-gold rounded-full px-5 py-3 hover:bg-champagne transition-colors"
            >
              Download Excel
            </a>
            <button
              type="button"
              onClick={logout}
              data-testid="admin-logout-btn"
              className="font-cinzel text-xs uppercase tracking-[0.2em] text-champagne border border-gold/40 rounded-full px-5 py-3 hover:bg-gold/10 transition-colors"
            >
              Lock
            </button>
          </div>
        </div>

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
                <p className="font-cinzel text-3xl text-champagne" data-testid="rsvp-guest-total">{totalGuests}</p>
                <p className="font-cormorant text-sm text-ivory/70 uppercase tracking-widest">Total Guests</p>
              </div>
            </div>

            <div className="mt-8 overflow-x-auto rounded-xl border border-gold/30">
              <table className="w-full text-left font-cormorant" data-testid="rsvp-table">
                <thead className="bg-burgundy/50 text-champagne">
                  <tr>
                    <th className="px-4 py-3 font-cinzel text-sm uppercase tracking-wider">Member Name</th>
                    <th className="px-4 py-3 font-cinzel text-sm uppercase tracking-wider">Guests</th>
                    <th className="px-4 py-3 font-cinzel text-sm uppercase tracking-wider">Attending</th>
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
                      <td className="px-4 py-3 text-ivory tabular-nums">{r.guests ?? 1}</td>
                      <td className="px-4 py-3">
                        <span className={r.attending ? "text-green-300" : "text-red-300"}>
                          {r.attending ? "Yes" : "No"}
                        </span>
                      </td>
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
