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
            <span>THE PADDOCK: PASSIONS &amp; PERSONALITY</span>
          </h2>
          <p className="admin-section-desc">
            The cinema, music, athletics, and hot takes that fuel your engineering mindset.
          </p>
        </div>
        <button type="button" className="admin-btn admin-btn-primary" onClick={addPassion}>
          <FiPlus /> Add Dossier
        </button>
      </div>

      {passions.map((passion, idx) => (
        <div key={passion.id || idx} className="admin-panel">
          <div className="admin-item-header">
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <PassionIcon passion={passion} size={22} />
              <div>
                <h3 style={{ margin: 0, fontSize: "1.15rem", color: "#fff", fontWeight: 700 }}>
                  {passion.title}
                </h3>
                <span className="admin-tag-pill" style={{ color: "#ffb800" }}>
                  {passion.category}
                </span>
              </div>
            </div>

            <button
              type="button"
              className="admin-btn admin-btn-danger"
              style={{ padding: "0.35rem 0.6rem" }}
              onClick={() => removePassion(idx)}
              title="Remove dossier"
            >
              <FiTrash2 size={14} />
            </button>
          </div>

          <div className="admin-grid-3">
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
              <label className="admin-label">Emoji / Icon</label>
              <input
                type="text"
                className="admin-input admin-input-plain"
                value={passion.icon || ""}
                onChange={(e) => updatePassion(idx, "icon", e.target.value)}
              />
            </div>
          </div>

          {/* Hot Take */}
          <div className="admin-form-group">
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
          <div className="admin-form-group">
            <label className="admin-label">Dossier Favorites &amp; Records</label>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "0.5rem", marginBottom: "0.75rem" }}>
              {(passion.items || []).map((item, itemIdx) => (
                <div
                  key={itemIdx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0.4rem 0.6rem",
                    background: "rgba(255, 255, 255, 0.04)",
                    borderRadius: 6,
                    fontSize: "0.82rem",
                  }}
                >
                  <div>
                    <span style={{ color: "#94a3b8", fontFamily: "monospace" }}>{item.label}: </span>
                    <strong style={{ color: "#fff" }}>{item.value}</strong>
                  </div>
                  <button
                    type="button"
                    style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer" }}
                    onClick={() => removeItem(idx, itemIdx)}
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              <input
                type="text"
                style={{ flex: 1, minWidth: 120 }}
                className="admin-input admin-input-plain"
                placeholder="Label (e.g. GOAT, All-Time, Track)"
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
                style={{ flex: 2, minWidth: 160 }}
                className="admin-input admin-input-plain"
                placeholder="Value (e.g. Breaking Bad, Interstellar)"
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
                Add Item
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
