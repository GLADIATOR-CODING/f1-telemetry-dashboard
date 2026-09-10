import { FiPlus, FiTrash2, FiShare2 } from "react-icons/fi";

export default function SocialsTab({ socials = [], onChange }) {
  const updateSocial = (idx, field, value) => {
    const updated = [...socials];
    updated[idx] = { ...updated[idx], [field]: value };
    onChange(updated);
  };

  const addSocial = () => {
    const newSocial = {
      id: `social-${Date.now()}`,
      label: "Platform",
      username: "@handle",
      href: "https://",
      color: "var(--accent-cyan)",
    };
    onChange([...socials, newSocial]);
  };

  const removeSocial = (idx) => {
    if (window.confirm("Remove this communication link?")) {
      onChange(socials.filter((_, i) => i !== idx));
    }
  };

  return (
    <div className="admin-tab-content">
      <div className="admin-section-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h2 className="admin-section-title">
            <span>PIT WALL COMMS &amp; SOCIAL TELEMETRY</span>
          </h2>
          <p className="admin-section-desc">
            Manage your outgoing communication channels, GitHub, LinkedIn, email, and resume download link in the Finish line sector.
          </p>
        </div>
        <button type="button" className="admin-btn admin-btn-secondary" onClick={addSocial}>
          <FiPlus /> Add Comms Link
        </button>
      </div>

      <div className="admin-panel">
        {socials.map((soc, idx) => (
          <div key={soc.id || idx} className="admin-item-card">
            <div className="admin-item-header" style={{ marginBottom: "0.75rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <FiShare2 color="#00f0ff" />
                <h4 style={{ margin: 0, color: "#fff", fontSize: "1rem" }}>{soc.label}</h4>
              </div>
              <button
                type="button"
                className="admin-btn admin-btn-danger"
                style={{ padding: "0.25rem 0.5rem", fontSize: "0.7rem" }}
                onClick={() => removeSocial(idx)}
                title="Remove link"
              >
                <FiTrash2 />
              </button>
            </div>

            <div className="admin-grid-3">
              <div className="admin-form-group">
                <label className="admin-label">Platform Name</label>
                <input
                  type="text"
                  className="admin-input admin-input-plain"
                  value={soc.label || ""}
                  onChange={(e) => updateSocial(idx, "label", e.target.value)}
                  placeholder="e.g. GitHub"
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Display Handle / Text</label>
                <input
                  type="text"
                  className="admin-input admin-input-plain"
                  value={soc.username || ""}
                  onChange={(e) => updateSocial(idx, "username", e.target.value)}
                  placeholder="e.g. @kshitiz"
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Destination URL</label>
                <input
                  type="text"
                  className="admin-input admin-input-plain"
                  value={soc.href || ""}
                  onChange={(e) => updateSocial(idx, "href", e.target.value)}
                  placeholder="e.g. https://github.com/..."
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
