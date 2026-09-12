import { useState } from "react";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import PassionIcon from "../PassionIcon";

export default function PassionsTab({ passions = [], onChange }) {
  const [newItemInputs, setNewItemInputs] = useState({});

  const updatePassion = (idx, field, value) => {
    const updated = [...passions];
    updated[idx] = { ...updated[idx], [field]: value };
    onChange(updated);
  };

  const addPassion = () => {
    const newPassion = {
      id: `passion-${Date.now()}`,
      category: "INTEREST",
      icon: "racing",
      title: "New Passion Dossier",
      items: [
        { label: "Highlight", value: "Exciting pursuit" },
      ],
      hotTake: "Every millisecond counts.",
      color: "var(--accent-f1, #e10600)",
      rotation: 1,
    };
    onChange([...passions, newPassion]);
  };

  const removePassion = (idx) => {
    if (window.confirm("Remove this passion dossier?")) {
      onChange(passions.filter((_, i) => i !== idx));
    }
  };

  const addItem = (passionIdx) => {
    const raw = newItemInputs[passionIdx] || { label: "", value: "" };
    if (!raw.label.trim() || !raw.value.trim()) return;

    const passion = passions[passionIdx];
    const updatedItems = [...(passion.items || []), { label: raw.label.trim(), value: raw.value.trim() }];
    updatePassion(passionIdx, "items", updatedItems);
    setNewItemInputs({ ...newItemInputs, [passionIdx]: { label: "", value: "" } });
  };

  const removeItem = (passionIdx, itemIdx) => {
    const passion = passions[passionIdx];
    const updatedItems = (passion.items || []).filter((_, i) => i !== itemIdx);
    updatePassion(passionIdx, "items", updatedItems);
  };

  return (
    <div className="admin-tab-content">
      <div className="admin-section-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h2 className="admin-section-title">
            <span>THE PADDOCK: PASSIONS & PERSONALITY</span>
          </h2>
          <p className="admin-section-desc">
            Cinema, music, athletics, and hot takes that fuel your engineering mindset.
          </p>
        </div>
        <button type="button" className="admin-btn admin-btn-primary" onClick={addPassion}>
          <FiPlus size={14} /> Add Dossier
        </button>
      </div>

      {passions.map((passion, idx) => {
        const passionColor = passion.color || "var(--accent-f1)";
        const colorPreview = passionColor.startsWith("var(") ? "#e10600" : passionColor;

        return (
          <div
            key={passion.id || idx}
            className="admin-panel"
            style={{ borderLeft: `3px solid ${colorPreview}`, paddingLeft: "calc(var(--space-6) + 3px)" }}
          >
            <div className="admin-item-header" style={{ position: "relative", zIndex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
                <PassionIcon passion={passion} size={20} />
                <div>
                  <h3 style={{ margin: 0, fontSize: "1rem", color: "#fff", fontWeight: 700 }}>
                    {passion.title}
                  </h3>
                  <span
                    className="admin-tag-pill"
                    style={{
                      color: "var(--accent-amber)",
                      borderColor: "rgba(255, 170, 0, 0.2)",
                      marginTop: "0.2rem",
                      display: "inline-flex",
                    }}
                  >
                    {passion.category}
                  </span>
                </div>
              </div>

              <button
                type="button"
                className="admin-btn admin-btn-danger"
                style={{ padding: "0.25rem 0.45rem" }}
                onClick={() => removePassion(idx)}
                title="Remove"
              >
                <FiTrash2 size={13} />
              </button>
            </div>

            <div className="admin-grid-3" style={{ position: "relative", zIndex: 1 }}>
              <div className="admin-form-group">
                <label className="admin-label">Title</label>
                <input
                  type="text"
                  className="admin-input admin-input-plain"
                  value={passion.title || ""}
                  onChange={(e) => updatePassion(idx, "title", e.target.value)}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Category</label>
                <input
                  type="text"
                  className="admin-input admin-input-plain"
                  value={passion.category || ""}
                  onChange={(e) => updatePassion(idx, "category", e.target.value)}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Emoji / Icon Key</label>
                <input
                  type="text"
                  className="admin-input admin-input-plain"
                  value={passion.icon || ""}
                  onChange={(e) => updatePassion(idx, "icon", e.target.value)}
                />
              </div>
            </div>

            {/* Hot Take */}
            <div className="admin-form-group" style={{ position: "relative", zIndex: 1 }}>
              <label className="admin-label">Driver Hot Take / Perspective</label>
              <textarea
                className="admin-textarea"
                rows={2}
                value={passion.hotTake || ""}
                onChange={(e) => updatePassion(idx, "hotTake", e.target.value)}
                placeholder="e.g. Interstellar isn't just a movie — it's a spiritual experience..."
              />
            </div>

            {/* Items / Favorites List */}
            <div className="admin-form-group" style={{ position: "relative", zIndex: 1 }}>
              <label className="admin-label">Dossier Favorites & Records</label>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "0.35rem", marginBottom: "0.6rem" }}>
                {(passion.items || []).map((item, itemIdx) => (
                  <div
                    key={itemIdx}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "0.3rem 0.5rem",
                      background: "rgba(255, 255, 255, 0.03)",
                      border: "1px solid var(--border-subtle)",
                      borderRadius: "var(--radius-sm)",
                      fontSize: "0.78rem",
                    }}
                  >
                    <div>
                      <span style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)", fontSize: "0.68rem" }}>{item.label}: </span>
                      <strong style={{ color: "#fff" }}>{item.value}</strong>
                    </div>
                    <button
                      type="button"
                      style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", fontSize: "0.85rem" }}
                      onClick={() => removeItem(idx, itemIdx)}
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap" }}>
                <input
                  type="text"
                  style={{ flex: 1, minWidth: 100 }}
                  className="admin-input admin-input-plain"
                  placeholder="Label (e.g. GOAT)"
                  value={newItemInputs[idx]?.label || ""}
                  onChange={(e) =>
                    setNewItemInputs({
                      ...newItemInputs,
                      [idx]: { ...(newItemInputs[idx] || {}), label: e.target.value },
                    })
                  }
                />
                <input
                  type="text"
                  style={{ flex: 2, minWidth: 140 }}
                  className="admin-input admin-input-plain"
                  placeholder="Value (e.g. Interstellar)"
                  value={newItemInputs[idx]?.value || ""}
                  onChange={(e) =>
                    setNewItemInputs({
                      ...newItemInputs,
                      [idx]: { ...(newItemInputs[idx] || {}), value: e.target.value },
                    })
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addItem(idx);
                    }
                  }}
                />
                <button
                  type="button"
                  className="admin-btn admin-btn-secondary"
                  onClick={() => addItem(idx)}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
