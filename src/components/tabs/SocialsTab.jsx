import { FiPlus, FiTrash2, FiShare2, FiExternalLink } from "react-icons/fi";

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
            <span>PIT WALL COMMS & SOCIAL TELEMETRY</span>
          </h2>
          <p className="admin-section-desc">
            Manage communication channels — GitHub, LinkedIn, email, and resume links.
          </p>
        </div>
        <button type="button" className="admin-btn admin-btn-secondary" onClick={addSocial}>
          <FiPlus size={13} /> Add Link
        </button>
      </div>

      <div className="admin-grid-2">
        {socials.map((soc, idx) => (
          <div
            key={soc.id || idx}
            className="admin-panel"
            style={{
              borderLeft: "3px solid var(--accent-cyan)",
              paddingLeft: "calc(var(--space-6) + 3px)",
            }}
          >
            <div className="admin-item-header" style={{ marginBottom: "var(--space-3)", position: "relative", zIndex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
                <FiShare2 color="var(--accent-cyan)" size={15} />
                <h4 style={{ margin: 0, color: "#fff", fontSize: "0.92rem", fontWeight: 700 }}>{soc.label}</h4>
                {soc.href && soc.href !== "https://" && (
                  <a
                    href={soc.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--text-muted)", display: "flex", alignItems: "center" }}
                    title="Open link"
                  >
                    <FiExternalLink size={12} />
                  </a>
                )}
              </div>
              <button
                type="button"
                className="admin-btn admin-btn-danger"
                style={{ padding: "0.2rem 0.4rem", fontSize: "0.65rem" }}
                onClick={() => removeSocial(idx)}
                title="Remove"
              >
                <FiTrash2 size={12} />
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)", position: "relative", zIndex: 1 }}>
              <div className="admin-form-group" style={{ marginBottom: 0 }}>
                <label className="admin-label">Platform Name</label>
                <input
                  type="text"
                  className="admin-input admin-input-plain"
                  value={soc.label || ""}
                  onChange={(e) => updateSocial(idx, "label", e.target.value)}
                  placeholder="e.g. GitHub"
                />
              </div>

              <div className="admin-form-group" style={{ marginBottom: 0 }}>
                <label className="admin-label">Display Handle</label>
                <input
                  type="text"
                  className="admin-input admin-input-plain"
                  value={soc.username || ""}
                  onChange={(e) => updateSocial(idx, "username", e.target.value)}
                  placeholder="e.g. @kshitiz"
                />
              </div>

              <div className="admin-form-group" style={{ marginBottom: 0 }}>
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
