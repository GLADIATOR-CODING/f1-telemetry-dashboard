import { useState } from "react";
import { FiPlus, FiTrash2 } from "react-icons/fi";

/** SVG radial gauge for the OVR rating */
function OvrGauge({ value = 0, size = 140 }) {
  const radius = 54;
  const stroke = 8;
  const circumference = Math.PI * radius; // semicircle
  const fillPercent = Math.min(value / 99, 1);
  const dashOffset = circumference * (1 - fillPercent);

  // Color based on value
  const color =
    value >= 85 ? "#00ff66" : value >= 70 ? "#fbbf24" : value >= 50 ? "#f59e0b" : "#ef4444";

  return (
    <div className="admin-gauge-container">
      <svg
        width={size}
        height={size * 0.65}
        viewBox="0 0 140 90"
        className="admin-gauge-svg"
        style={{ filter: `drop-shadow(0 0 8px ${color}40)` }}
      >
        {/* Track */}
        <path
          d="M 15 80 A 54 54 0 0 1 125 80"
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={stroke}
          strokeLinecap="round"
        />
        {/* Fill */}
        <path
          d="M 15 80 A 54 54 0 0 1 125 80"
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          style={{ transition: "stroke-dashoffset 0.6s cubic-bezier(0.16, 1, 0.3, 1), stroke 0.3s" }}
        />
        {/* Value text */}
        <text x="70" y="72" textAnchor="middle" className="admin-gauge-value" style={{ fill: color }}>
          {value}
        </text>
        <text
          x="70"
          y="18"
          textAnchor="middle"
          style={{
            fill: "rgba(255,255,255,0.4)",
            fontSize: "8px",
            fontFamily: "var(--font-mono)",
            letterSpacing: "0.15em",
          }}
        >
          OVERALL
        </text>
      </svg>
    </div>
  );
}

/** Horizontal telemetry meter bar */
function MeterBar({ label, value = 0, color = "#00f0ff", max = 99 }) {
  const percent = Math.min((value / max) * 100, 100);
  return (
    <div style={{ marginBottom: "0.85rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.3rem" }}>
        <span className="admin-meter-label">{label}</span>
        <span className="admin-meter-value" style={{ color }}>{value}</span>
      </div>
      <div className="admin-meter-bar">
        <div className="admin-meter-track">
          <div
            className="admin-meter-fill"
            style={{
              width: `${percent}%`,
              background: `linear-gradient(90deg, ${color}80, ${color})`,
              boxShadow: `0 0 12px ${color}40`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default function IdentityTab({ identity = {}, onChange }) {
  const [newTag, setNewTag] = useState("");

  const updateField = (field, value) => {
    onChange({
      ...identity,
      [field]: value,
    });
  };

  const updateDriverRating = (attr, val) => {
    const current = identity.driverRatings || { exp: 70, cod: 75, sys: 85, pac: 86 };
    updateField("driverRatings", {
      ...current,
      [attr]: Math.max(0, Math.min(99, parseInt(val) || 0)),
    });
  };

  const handleBioChange = (idx, value) => {
    const updatedBio = [...(identity.bio || [])];
    updatedBio[idx] = value;
    updateField("bio", updatedBio);
  };

  const addBioParagraph = () => {
    updateField("bio", [...(identity.bio || []), ""]);
  };

  const removeBioParagraph = (idx) => {
    const updatedBio = (identity.bio || []).filter((_, i) => i !== idx);
    updateField("bio", updatedBio);
  };

  const addTechHighlight = () => {
    if (!newTag.trim()) return;
    const tag = newTag.trim().toUpperCase();
    if (!(identity.techHighlights || []).includes(tag)) {
      updateField("techHighlights", [...(identity.techHighlights || []), tag]);
    }
    setNewTag("");
  };

  const removeTechHighlight = (tagToRemove) => {
    updateField(
      "techHighlights",
      (identity.techHighlights || []).filter((t) => t !== tagToRemove)
    );
  };

  return (
    <div className="admin-tab-content">
      <div className="admin-section-header">
        <h2 className="admin-section-title">
          <span>DRIVER IDENTITY & TELEMETRY</span>
        </h2>
        <p className="admin-section-desc">
          Core driver profile displayed on the Starting Grid and Sector 1 (The Apex).
        </p>
      </div>

      {/* Main Identity Information */}
      <div className="admin-panel">
        <h3 className="admin-panel-title">Cockpit Profile</h3>
        <div className="admin-grid-2" style={{ position: "relative", zIndex: 1 }}>
          <div className="admin-form-group">
            <label className="admin-label">Driver / Full Name</label>
            <input
              type="text"
              className="admin-input admin-input-plain"
              value={identity.name || ""}
              onChange={(e) => updateField("name", e.target.value)}
              placeholder="e.g. Kshitiz"
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Primary Role Title</label>
            <input
              type="text"
              className="admin-input admin-input-plain"
              value={identity.role || ""}
              onChange={(e) => updateField("role", e.target.value)}
              placeholder="e.g. Full-Stack Developer"
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Role Subtitle / Suffix</label>
            <input
              type="text"
              className="admin-input admin-input-plain"
              value={identity.roleSub || ""}
              onChange={(e) => updateField("roleSub", e.target.value)}
              placeholder="e.g.  & Builder"
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Current Base Location</label>
            <input
              type="text"
              className="admin-input admin-input-plain"
              value={identity.location || ""}
              onChange={(e) => updateField("location", e.target.value)}
              placeholder="e.g. India (open to relocation)"
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Status Mode</label>
            <select
              className="admin-select"
              value={identity.status || "available"}
              onChange={(e) => updateField("status", e.target.value)}
            >
              <option value="available">Available (Green)</option>
              <option value="busy">In Cockpit / Busy (Amber)</option>
              <option value="offline">Pit Stop / Offline (Red)</option>
            </select>
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Status Badge Label</label>
            <input
              type="text"
              className="admin-input admin-input-plain"
              value={identity.statusLabel || ""}
              onChange={(e) => updateField("statusLabel", e.target.value)}
              placeholder="e.g. OPEN TO OPPORTUNITIES"
            />
          </div>
        </div>
      </div>

      {/* F1 Driver Supercard & Telemetry */}
      <div className="admin-panel">
        <h3 className="admin-panel-title">F1 Driver Supercard & Telemetry</h3>

        {/* Chassis & Identity Specs */}
        <div className="admin-grid-3" style={{ position: "relative", zIndex: 1 }}>
          <div className="admin-form-group">
            <label className="admin-label">Driver Car Number</label>
            <input
              type="text"
              className="admin-input admin-input-plain"
              value={identity.driverNumber || "18"}
              onChange={(e) => updateField("driverNumber", e.target.value)}
              placeholder="e.g. 18"
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Racing Team Name</label>
            <input
              type="text"
              className="admin-input admin-input-plain"
              value={identity.teamName || "GLADIATOR RACING"}
              onChange={(e) => updateField("teamName", e.target.value)}
              placeholder="e.g. GLADIATOR RACING"
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Driver ID Code</label>
            <input
              type="text"
              className="admin-input admin-input-plain"
              value={identity.driverId || "KSH-01"}
              onChange={(e) => updateField("driverId", e.target.value)}
              placeholder="e.g. KSH-01"
            />
          </div>
        </div>

        {/* Visual Presentation */}
        <div className="admin-grid-2" style={{ marginTop: "1rem", position: "relative", zIndex: 1 }}>
          <div className="admin-form-group">
            <label className="admin-label">Card Accent Color</label>
            <input
              type="text"
              className="admin-input admin-input-plain"
              value={identity.cardColor || "#e10600"}
              onChange={(e) => updateField("cardColor", e.target.value)}
              placeholder="e.g. #e10600"
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Driver Avatar / Portrait URL</label>
            <input
              type="text"
              className="admin-input admin-input-plain"
              value={identity.avatarUrl || "/images/f1-driver-card.png"}
              onChange={(e) => updateField("avatarUrl", e.target.value)}
              placeholder="e.g. /images/f1-driver-card.png"
            />
          </div>
        </div>

        {/* Telemetry Stats */}
        <div style={{ marginTop: "1.25rem", position: "relative", zIndex: 1 }}>
          <label className="admin-label" style={{ color: "var(--accent-f1)", fontWeight: 700, fontSize: "0.72rem" }}>
            Live Telemetry Stats (Driver Card)
          </label>
          <div className="admin-grid-4">
            <div className="admin-form-group">
              <label className="admin-label">Years Dev (EXP)</label>
              <input
                type="number"
                className="admin-input admin-input-plain"
                value={identity.yearsCoding ?? 1}
                onChange={(e) => updateField("yearsCoding", parseInt(e.target.value) || 0)}
                min={0}
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Prod Builds (APPS)</label>
              <input
                type="number"
                className="admin-input admin-input-plain"
                value={identity.projectsBuilt ?? 3}
                onChange={(e) => updateField("projectsBuilt", parseInt(e.target.value) || 0)}
                min={0}
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Git Commits (CODE)</label>
              <input
                type="number"
                className="admin-input admin-input-plain"
                value={identity.commits ?? 160}
                onChange={(e) => updateField("commits", parseInt(e.target.value) || 0)}
                min={0}
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Public Repos (REPO)</label>
              <input
                type="number"
                className="admin-input admin-input-plain"
                value={identity.repos ?? 17}
                onChange={(e) => updateField("repos", parseInt(e.target.value) || 0)}
                min={0}
              />
            </div>
          </div>
        </div>

        {/* Driver Ratings — Telemetry Gauges */}
        <div
          style={{
            marginTop: "1.5rem",
            padding: "1.25rem",
            background: "var(--accent-f1-subtle)",
            border: "1px solid rgba(225, 6, 0, 0.15)",
            borderRadius: "var(--radius-md)",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.25rem" }}>
            <div>
              <h4
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.75rem",
                  color: "var(--accent-f1)",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  margin: 0,
                }}
              >
                Official Driver Attributes (0 — 99)
              </h4>
              <p style={{ margin: "0.2rem 0 0", fontSize: "0.72rem", color: "var(--text-muted)" }}>
                Powers the F1 Driver Supercard rating
              </p>
            </div>
          </div>

          {/* OVR Gauge */}
          <div style={{ display: "flex", alignItems: "center", gap: "2rem", flexWrap: "wrap", marginBottom: "1.25rem" }}>
            <OvrGauge value={identity.overallRating ?? 80} />
            <div style={{ flex: 1, minWidth: 200 }}>
              <label className="admin-label">Overall Rating (OVR)</label>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <input
                  type="range"
                  min={0}
                  max={99}
                  value={identity.overallRating ?? 80}
                  onChange={(e) => updateField("overallRating", parseInt(e.target.value) || 0)}
                  style={{ flex: 1 }}
                />
                <input
                  type="number"
                  className="admin-input admin-input-plain"
                  style={{ width: 60, textAlign: "center", fontSize: "0.82rem", padding: "0.35rem" }}
                  min={0}
                  max={99}
                  value={identity.overallRating ?? 80}
                  onChange={(e) =>
                    updateField("overallRating", Math.min(99, Math.max(0, parseInt(e.target.value) || 0)))
                  }
                />
              </div>
            </div>
          </div>

          {/* Attribute Meters */}
          <div className="admin-grid-2">
            <div>
              <MeterBar
                label="EXP"
                value={identity.driverRatings?.exp ?? 70}
                color="#e10600"
              />
              <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                <input
                  type="range"
                  min={0}
                  max={99}
                  value={identity.driverRatings?.exp ?? 70}
                  onChange={(e) => updateDriverRating("exp", e.target.value)}
                  style={{ flex: 1 }}
                />
              </div>
            </div>

            <div>
              <MeterBar
                label="COD"
                value={identity.driverRatings?.cod ?? 75}
                color="#00f0ff"
              />
              <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                <input
                  type="range"
                  min={0}
                  max={99}
                  value={identity.driverRatings?.cod ?? 75}
                  onChange={(e) => updateDriverRating("cod", e.target.value)}
                  style={{ flex: 1 }}
                />
              </div>
            </div>

            <div>
              <MeterBar
                label="SYS"
                value={identity.driverRatings?.sys ?? 85}
                color="#a855f7"
              />
              <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                <input
                  type="range"
                  min={0}
                  max={99}
                  value={identity.driverRatings?.sys ?? 85}
                  onChange={(e) => updateDriverRating("sys", e.target.value)}
                  style={{ flex: 1 }}
                />
              </div>
            </div>

            <div>
              <MeterBar
                label="PAC"
                value={identity.driverRatings?.pac ?? 86}
                color="#00ff66"
              />
              <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                <input
                  type="range"
                  min={0}
                  max={99}
                  value={identity.driverRatings?.pac ?? 86}
                  onChange={(e) => updateDriverRating("pac", e.target.value)}
                  style={{ flex: 1 }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Biography Paragraphs */}
      <div className="admin-panel">
        <div className="admin-panel-title">
          <span>Biography Dossier</span>
          <button
            type="button"
            className="admin-btn admin-btn-secondary"
            style={{ padding: "0.35rem 0.65rem", fontSize: "0.7rem" }}
            onClick={addBioParagraph}
          >
            <FiPlus size={13} /> Add Paragraph
          </button>
        </div>

        <div style={{ position: "relative", zIndex: 1 }}>
          {(identity.bio || []).map((paragraph, idx) => (
            <div key={idx} className="admin-item-card" style={{ marginBottom: "0.6rem" }}>
              <div className="admin-item-header" style={{ marginBottom: "0.4rem" }}>
                <span className="admin-label" style={{ margin: 0 }}>
                  Paragraph #{idx + 1}
                </span>
                {(identity.bio || []).length > 1 && (
                  <button
                    type="button"
                    className="admin-btn admin-btn-danger"
                    style={{ padding: "0.2rem 0.4rem", fontSize: "0.65rem" }}
                    onClick={() => removeBioParagraph(idx)}
                    title="Remove paragraph"
                  >
                    <FiTrash2 size={12} />
                  </button>
                )}
              </div>
              <textarea
                className="admin-textarea"
                rows={3}
                value={paragraph}
                onChange={(e) => handleBioChange(idx, e.target.value)}
                placeholder="Write biography paragraph..."
              />
            </div>
          ))}
        </div>
      </div>

      {/* Apex Tech Highlights */}
      <div className="admin-panel">
        <h3 className="admin-panel-title">The Apex Header Tags</h3>
        <div className="admin-form-group" style={{ position: "relative", zIndex: 1 }}>
          <label className="admin-label">Add Tech Highlight (Shown on Sector 1)</label>
          <div style={{ display: "flex", gap: "0.4rem" }}>
            <input
              type="text"
              className="admin-input admin-input-plain"
              placeholder="e.g. WEBSOCKET"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addTechHighlight();
                }
              }}
            />
            <button
              type="button"
              className="admin-btn admin-btn-secondary"
              onClick={addTechHighlight}
            >
              Add
            </button>
          </div>
        </div>

        <div className="admin-tag-list" style={{ position: "relative", zIndex: 1 }}>
          {(identity.techHighlights || []).map((tag) => (
            <span key={tag} className="admin-tag-pill">
              <span>{tag}</span>
              <button
                type="button"
                onClick={() => removeTechHighlight(tag)}
                title="Remove tag"
              >
                &times;
              </button>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
