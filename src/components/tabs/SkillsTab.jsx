import { useState } from "react";
import { FiPlus, FiTrash2, FiAward, FiCpu } from "react-icons/fi";

const SKILL_CATEGORIES = [
  { key: "languages", label: "Programming Languages", color: "#00f0ff" },
  { key: "frameworks", label: "Frameworks & Libraries", color: "#a855f7" },
  { key: "tools", label: "Developer Tools & Platforms", color: "#ffb800" },
  { key: "concepts", label: "Engineering Concepts & Systems", color: "#e10600" },
];

export default function SkillsTab({
  skills = {},
  certifications = [],
  onChangeSkills,
  onChangeCertifications,
}) {
  const [skillInputs, setSkillInputs] = useState({});

  const addSkill = (category) => {
    const val = (skillInputs[category] || "").trim();
    if (!val) return;
    const currentList = skills[category] || [];
    if (!currentList.includes(val)) {
      onChangeSkills({
        ...skills,
        [category]: [...currentList, val],
      });
    }
    setSkillInputs({ ...skillInputs, [category]: "" });
  };

  const removeSkill = (category, itemToRemove) => {
    const currentList = skills[category] || [];
    onChangeSkills({
      ...skills,
      [category]: currentList.filter((item) => item !== itemToRemove),
    });
  };

  const addCertification = () => {
    const newCert = {
      name: "New Certificate",
      issuer: "Credential Authority",
      year: new Date().getFullYear().toString(),
    };
    onChangeCertifications([...certifications, newCert]);
  };

  const updateCert = (idx, field, value) => {
    const updated = [...certifications];
    updated[idx] = { ...updated[idx], [field]: value };
    onChangeCertifications(updated);
  };

  const removeCert = (idx) => {
    onChangeCertifications(certifications.filter((_, i) => i !== idx));
  };

  return (
    <div className="admin-tab-content">
      <div className="admin-section-header">
        <h2 className="admin-section-title">
          <span>TECHNICAL TELEMETRY: SKILLS &amp; CERTS</span>
        </h2>
        <p className="admin-section-desc">
          Configure technical capabilities displayed in Parc Fermé, used by AI answering technical queries, and rendered in dossiers.
        </p>
      </div>

      {/* Skills Grids */}
      <div className="admin-grid-2">
        {SKILL_CATEGORIES.map((cat) => (
          <div key={cat.key} className="admin-panel">
            <h3
              style={{
                fontSize: "1.05rem",
                fontWeight: 700,
                color: "#fff",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "1rem",
              }}
            >
              <FiCpu color={cat.color} /> {cat.label}
            </h3>

            <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
              <input
                type="text"
                className="admin-input admin-input-plain"
                placeholder={`Add to ${cat.label}...`}
                value={skillInputs[cat.key] || ""}
                onChange={(e) =>
                  setSkillInputs({ ...skillInputs, [cat.key]: e.target.value })
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addSkill(cat.key);
                  }
                }}
              />
              <button
                type="button"
                className="admin-btn admin-btn-secondary"
                onClick={() => addSkill(cat.key)}
              >
                Add
              </button>
            </div>

            <div className="admin-tag-list">
              {(skills[cat.key] || []).map((skill) => (
                <span key={skill} className="admin-tag-pill">
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => removeSkill(cat.key, skill)}
                    title={`Remove ${skill}`}
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Certifications Section */}
      <div className="admin-panel" style={{ marginTop: "1.5rem" }}>
        <div className="admin-panel-title">
          <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <FiAward color="#ffb800" /> Industry Certifications &amp; Badges
          </span>
          <button
            type="button"
            className="admin-btn admin-btn-secondary"
            style={{ padding: "0.4rem 0.8rem", fontSize: "0.75rem" }}
            onClick={addCertification}
          >
            <FiPlus /> Add Certification
          </button>
        </div>

        {certifications.length === 0 ? (
          <p style={{ color: "#64748b", fontSize: "0.88rem" }}>No certifications recorded yet.</p>
        ) : (
          certifications.map((cert, idx) => (
            <div
              key={idx}
              className="admin-item-card"
              style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}
            >
              <div style={{ flex: 2, minWidth: 200 }}>
                <label className="admin-label">Certification Title</label>
                <input
                  type="text"
                  className="admin-input admin-input-plain"
                  value={cert.name || ""}
                  onChange={(e) => updateCert(idx, "name", e.target.value)}
                  placeholder="e.g. AWS Cloud Practitioner"
                />
              </div>

              <div style={{ flex: 2, minWidth: 160 }}>
                <label className="admin-label">Issuing Authority</label>
                <input
                  type="text"
                  className="admin-input admin-input-plain"
                  value={cert.issuer || ""}
                  onChange={(e) => updateCert(idx, "issuer", e.target.value)}
                  placeholder="e.g. Amazon Web Services"
                />
              </div>

              <div style={{ flex: 1, minWidth: 100 }}>
                <label className="admin-label">Year</label>
                <input
                  type="text"
                  className="admin-input admin-input-plain"
                  value={cert.year || ""}
                  onChange={(e) => updateCert(idx, "year", e.target.value)}
                  placeholder="2025"
                />
              </div>

              <div style={{ alignSelf: "flex-end", marginBottom: "0.25rem" }}>
                <button
                  type="button"
                  className="admin-btn admin-btn-danger"
                  style={{ padding: "0.5rem 0.75rem" }}
                  onClick={() => removeCert(idx)}
                  title="Remove Certification"
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
