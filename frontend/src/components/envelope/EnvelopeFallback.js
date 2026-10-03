export const EnvelopeFallback = ({ open }) => (
  <div className={`env-fallback ${open ? "is-open" : ""}`} data-testid="envelope-fallback" aria-hidden="true">
    <div className="env-fallback-lid"><p>Two Journey<br />One Heart</p></div>
    <div className="env-fallback-card"><span>Sanidhya</span><i>&amp;</i><span>Vasudha</span></div>
    <div className="env-fallback-pocket" />
    <div className="env-fallback-seal">S &amp; V</div>
  </div>
);