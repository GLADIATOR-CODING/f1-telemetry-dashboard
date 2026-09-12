import { useState } from "react";
import { FiPlus, FiTrash2, FiAward, FiCpu } from "react-icons/fi";

const SKILL_CATEGORIES = [
  { key: "languages", label: "Programming Languages", color: "#00f0ff" },
  { key: "frameworks", label: "Frameworks & Libraries", color: "#a855f7" },
  { key: "tools", label: "Developer Tools & Platforms", color: "#ffaa00" },
  { key: "concepts", label: "Engineering Concepts", color: "#e10600" },
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
          <span>TECHNICAL TELEMETRY: SKILLS & CERTS</span>
        </h2>
        <p className="admin-section-desc">
          Configure technical capabilities used by AI queries and rendered in dossiers.
        </p>
      </div>

      {/* Skills Grid */}
      <div className="admin-grid-2">
        {SKILL_CATEGORIES.map((cat) => (
          <div
            key={cat.key}
            className="admin-panel admin-skill-panel"
            data-category={cat.key}
            style={{ borderTop: `2px solid ${cat.color}` }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-4)", position: "relative", zIndex: 1 }}>
              <h3
                style={{
                  fontSize: "0.88rem",
                  fontWeight: 700,
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--space-2)",
                  fontFamily: "var(--font-display)",
                  margin: 0,
                }}
              >
                <FiCpu color={cat.color} size={15} /> {cat.label}
              </h3>
              <span className="admin-skill-count">
                {(skills[cat.key] || []).length}
              </span>
            </div>

            <div style={{ display: "flex", gap: "0.4rem", marginBottom: "var(--space-3)", position: "relative", zIndex: 1 }}>
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

            <div className="admin-tag-list" style={{ position: "relative", zIndex: 1 }}>
              {(skills[cat.key] || []).map((skill) => (
                <span
                  key={skill}
                  className="admin-tag-pill"
                  style={{ borderColor: `${cat.color}30` }}
                >
                  <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: cat.color,
                        flexShrink: 0,
                      }}
                    />
                    {skill}
                  </span>
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
      <div className="admin-panel" style={{ marginTop: "var(--space-5)" }}>
        <div className="admin-panel-title">
          <span style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
            <FiAward color="var(--accent-amber)" size={15} /> Industry Certifications & Badges
          </span>
          <button
            type="button"
            className="admin-btn admin-btn-secondary"
            style={{ padding: "0.3rem 0.6rem", fontSize: "0.7rem" }}
            onClick={addCertification}
          >
            <FiPlus size={12} /> Add Cert
          </button>
        </div>

        <div style={{ position: "relative", zIndex: 1 }}>
          {certifications.length === 0 ? (
            <p style={{ color: "var(--text-muted)", fontSize: "0.82rem" }}>No certifications recorded yet.</p>
          ) : (
            certifications.map((cert, idx) => (
              <div key={idx} className="admin-cert-card">
                <div className="admin-cert-icon">
                  <FiAward size={18} />
                </div>
                <div style={{ flex: 2, minWidth: 180 }}>
                  <label className="admin-label" style={{ fontSize: "0.62rem" }}>Title</label>
                  <input
                    type="text"
                    className="admin-input admin-input-plain"
                    value={cert.name || ""}
                    onChange={(e) => updateCert(idx, "name", e.target.value)}
                    placeholder="e.g. AWS Cloud Practitioner"
                    style={{ fontSize: "0.82rem", padding: "0.4rem 0.6rem" }}
                  />
                </div>

                <div style={{ flex: 2, minWidth: 140 }}>
                  <label className="admin-label" style={{ fontSize: "0.62rem" }}>Issuer</label>
                  <input
                    type="text"
                    className="admin-input admin-input-plain"
                    value={cert.issuer || ""}
                    onChange={(e) => updateCert(idx, "issuer", e.target.value)}
                    placeholder="e.g. Amazon Web Services"
                    style={{ fontSize: "0.82rem", padding: "0.4rem 0.6rem" }}
                  />
                </div>

                <div style={{ flex: 1, minWidth: 80 }}>
                  <label className="admin-label" style={{ fontSize: "0.62rem" }}>Year</label>
                  <input
                    type="text"
                    className="admin-input admin-input-plain"
                    value={cert.year || ""}
                    onChange={(e) => updateCert(idx, "year", e.target.value)}
                    placeholder="2025"
                    style={{ fontSize: "0.82rem", padding: "0.4rem 0.6rem" }}
                  />
                </div>

                <button
                  type="button"
                  className="admin-btn admin-btn-danger"
                  style={{ padding: "0.4rem", alignSelf: "flex-end", marginBottom: "0.15rem" }}
                  onClick={() => removeCert(idx)}
                >
                  <FiTrash2 size={13} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
