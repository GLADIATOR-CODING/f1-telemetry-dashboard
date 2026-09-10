import { useState } from "react";
import { FiPlus, FiTrash2 } from "react-icons/fi";

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
          <span>DRIVER IDENTITY &amp; TELEMETRY</span>
        </h2>
        <p className="admin-section-desc">
          Core driver profile displayed on the Starting Grid (t=0) and Sector 1 (The Apex).
        </p>
      </div>

      {/* Main Identity Information */}
      <div className="admin-panel">
        <h3 className="admin-panel-title">Cockpit Profile</h3>
        <div className="admin-grid-2">
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

      {/* Official F1 Driver Supercard & Live Telemetry */}
      <div className="admin-panel">
        <h3 className="admin-panel-title">F1 Driver Supercard &amp; Telemetry</h3>

        {/* Chassis & Identity Specs */}
        <div className="admin-grid-3">
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
        <div className="admin-grid-2" style={{ marginTop: "1rem" }}>
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

        {/* Telemetry Metrics on Card */}
        <h4 className="admin-label" style={{ marginTop: "1.25rem", marginBottom: "0.5rem", color: "var(--accent-f1, #e10600)", fontWeight: 700 }}>
          Live Telemetry Stats (Driver Card Columns)
        </h4>
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

        {/* Driver Ratings & OVR Attributes */}
        <div style={{ marginTop: "1.5rem", padding: "1rem", background: "rgba(225, 6, 0, 0.04)", border: "1px solid rgba(225, 6, 0, 0.2)", borderRadius: 8 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <div>
              <h4 className="admin-label" style={{ margin: 0, color: "#e10600", fontSize: "0.95rem", fontWeight: 800 }}>
                Official Driver Attributes (0 — 99)
              </h4>
              <p style={{ margin: "0.2rem 0 0", fontSize: "0.78rem", color: "#94a3b8" }}>
                Powers the F1 Driver Supercard badge rating on Sector 1 and Paddock
              </p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ fontSize: "0.75rem", color: "#94a3b8", fontFamily: "monospace" }}>OVERALL (OVR):</span>
              <span style={{ fontSize: "1.25rem", fontWeight: 900, color: "#fbbf24", background: "rgba(251, 191, 36, 0.15)", padding: "0.2rem 0.6rem", borderRadius: 6, border: "1px solid rgba(251, 191, 36, 0.4)" }}>
                {identity.overallRating ?? 80}
              </span>
            </div>
          </div>

          <div className="admin-grid-2" style={{ marginBottom: "1rem" }}>
            <div className="admin-form-group">
              <label className="admin-label">Overall Rating (OVR: 0 — 99)</label>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <input
                  type="range"
                  min={0}
                  max={99}
                  style={{ flex: 1, accentColor: "#fbbf24" }}
                  value={identity.overallRating ?? 80}
                  onChange={(e) => updateField("overallRating", parseInt(e.target.value) || 0)}
                />
                <input
                  type="number"
                  className="admin-input admin-input-plain"
                  style={{ width: 70, textAlign: "center" }}
                  min={0}
                  max={99}
                  value={identity.overallRating ?? 80}
                  onChange={(e) => updateField("overallRating", Math.min(99, Math.max(0, parseInt(e.target.value) || 0)))}
                />
              </div>
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Experience Rating (EXP: 0 — 99)</label>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <input
                  type="range"
                  min={0}
                  max={99}
                  style={{ flex: 1, accentColor: "#e10600" }}
                  value={identity.driverRatings?.exp ?? 70}
                  onChange={(e) => updateDriverRating("exp", e.target.value)}
                />
                <input
                  type="number"
                  className="admin-input admin-input-plain"
                  style={{ width: 70, textAlign: "center" }}
                  min={0}
                  max={99}
                  value={identity.driverRatings?.exp ?? 70}
                  onChange={(e) => updateDriverRating("exp", e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="admin-grid-3">
            <div className="admin-form-group">
              <label className="admin-label">Coding Skill (COD: 0 — 99)</label>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <input
                  type="range"
                  min={0}
                  max={99}
                  style={{ flex: 1, accentColor: "#00f0ff" }}
                  value={identity.driverRatings?.cod ?? 75}
                  onChange={(e) => updateDriverRating("cod", e.target.value)}
                />
                <span style={{ fontSize: "0.88rem", fontWeight: 700, color: "#00f0ff", minWidth: 28, textAlign: "right" }}>
                  {identity.driverRatings?.cod ?? 75}
                </span>
              </div>
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Systems Arch (SYS: 0 — 99)</label>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <input
                  type="range"
                  min={0}
                  max={99}
                  style={{ flex: 1, accentColor: "#a855f7" }}
                  value={identity.driverRatings?.sys ?? 85}
                  onChange={(e) => updateDriverRating("sys", e.target.value)}
                />
                <span style={{ fontSize: "0.88rem", fontWeight: 700, color: "#a855f7", minWidth: 28, textAlign: "right" }}>
                  {identity.driverRatings?.sys ?? 85}
                </span>
              </div>
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Execution Pace (PAC: 0 — 99)</label>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <input
                  type="range"
                  min={0}
                  max={99}
                  style={{ flex: 1, accentColor: "#22c55e" }}
                  value={identity.driverRatings?.pac ?? 86}
                  onChange={(e) => updateDriverRating("pac", e.target.value)}
                />
                <span style={{ fontSize: "0.88rem", fontWeight: 700, color: "#22c55e", minWidth: 28, textAlign: "right" }}>
                  {identity.driverRatings?.pac ?? 86}
                </span>
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
            style={{ padding: "0.4rem 0.8rem", fontSize: "0.75rem" }}
            onClick={addBioParagraph}
          >
            <FiPlus /> Add Paragraph
          </button>
        </div>

        {(identity.bio || []).map((paragraph, idx) => (
          <div key={idx} className="admin-item-card" style={{ marginBottom: "0.75rem" }}>
            <div className="admin-item-header" style={{ marginBottom: "0.5rem" }}>
              <span className="admin-label" style={{ margin: 0 }}>
                Paragraph #{idx + 1}
              </span>
              {(identity.bio || []).length > 1 && (
                <button
                  type="button"
                  className="admin-btn admin-btn-danger"
                  style={{ padding: "0.25rem 0.5rem", fontSize: "0.7rem" }}
                  onClick={() => removeBioParagraph(idx)}
                  title="Remove paragraph"
                >
                  <FiTrash2 />
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

      {/* Apex Tech Highlights */}
      <div className="admin-panel">
        <h3 className="admin-panel-title">The Apex Header Tags</h3>
        <div className="admin-form-group">
          <label className="admin-label">Add Tech Highlight (Shown on Sector 1)</label>
          <div style={{ display: "flex", gap: "0.5rem" }}>
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

        <div className="admin-tag-list">
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
