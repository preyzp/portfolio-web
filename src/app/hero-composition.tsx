import "./hero-composition.css";

/** Decorative sample interfaces, deliberately separate from real project results. */
export function HeroComposition() {
  return (
    <div className="hero-ui-composition" aria-hidden="true">
      <div className="hero-ui-dashboard">
        <div className="hero-ui-topbar">
          <span className="hero-ui-appMark"><i /><i /><i /><i /></span>
          <span>Workspace</span>
          <span className="hero-ui-sample">UI study</span>
        </div>
        <div className="hero-ui-body">
          <div className="hero-ui-sidebar">
            <span className="hero-ui-activeNav" /><span /><span /><span />
          </div>
          <div className="hero-ui-content">
            <div className="hero-ui-heading">Overview <span>Sample data</span></div>
            <div className="hero-ui-summaries">
              <div><i /><b /><span /></div>
              <div><i /><b /><span /></div>
              <div><i /><b /><span /></div>
            </div>
            <div className="hero-ui-chart">
              <span>Activity preview</span>
              <svg viewBox="0 0 240 64" fill="none" preserveAspectRatio="none">
                <path className="hero-ui-grid" d="M0 12H240M0 36H240M0 60H240" />
                <path className="hero-ui-plot" d="M2 49C19 49 20 28 40 33S65 53 83 36S109 18 127 26S153 40 171 22S204 35 238 8" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className={`hero-ui-floating hero-ui-palette`}>
        <span className="hero-ui-label">Color tokens</span>
        <div className="hero-ui-swatches"><i /><i /><i /><i /></div>
        <span className="hero-ui-caption">A considered foundation</span>
      </div>
      <div className={`hero-ui-floating hero-ui-component`}>
        <span className="hero-ui-componentIcon">✦</span>
        <div><span className="hero-ui-label">Component library</span><span className="hero-ui-caption">Built with consistency</span></div>
        <span className="hero-ui-componentCheck">✓</span>
      </div>
    </div>
  );
}
