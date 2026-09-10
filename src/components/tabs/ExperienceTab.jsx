import { useState } from "react";
import { FiPlus, FiTrash2, FiBriefcase, FiBookOpen } from "react-icons/fi";

export default function ExperienceTab({ experience = [], education = [], onChangeExperience, onChangeEducation }) {
  const [newHighlightInputs, setNewHighlightInputs] = useState({});

  // Experience Handlers
  const addExperience = () => {
    const newExp = {
      id: `exp-${Date.now()}`,
      company: "Company Name",
      role: "Software Engineer",
      period: "2025 — Present",
      highlights: [
        "Architected scalable backend microservices reducing latency",
        "Engineered real-time features supporting high user concurrency"
      ]
    };
    onChangeExperience([newExp, ...experience]);
  };

  const updateExperience = (idx, field, value) => {
    const updated = [...experience];
    updated[idx] = { ...updated[idx], [field]: value };
    onChangeExperience(updated);
  };

  const removeExperience = (idx) => {
    if (window.confirm("Remove this experience record?")) {
      onChangeExperience(experience.filter((_, i) => i !== idx));
    }
  };

  const addHighlight = (expIdx) => {
    const text = newHighlightInputs[expIdx] || "";
    if (!text.trim()) return;
    const exp = experience[expIdx];
    const updatedHighlights = [...(exp.highlights || []), text.trim()];
    updateExperience(expIdx, "highlights", updatedHighlights);
    setNewHighlightInputs({ ...newHighlightInputs, [expIdx]: "" });
  };

  const removeHighlight = (expIdx, hIdx) => {
    const exp = experience[expIdx];
    const updatedHighlights = (exp.highlights || []).filter((_, i) => i !== hIdx);
    updateExperience(expIdx, "highlights", updatedHighlights);
  };

  // Education Handlers
  const addEducation = () => {
    const newEdu = {
      id: `edu-${Date.now()}`,
      institution: "University / Institute",
      degree: "B.Tech in Computer Science",
      period: "2022 — 2026",
      details: "Algorithms, distributed systems, web architectures.",
      gpa: "8.5 / 10"
    };
    onChangeEducation([...education, newEdu]);
  };

  const updateEducation = (idx, field, value) => {
    const updated = [...education];
    updated[idx] = { ...updated[idx], [field]: value };
    onChangeEducation(updated);
  };

  const removeEducation = (idx) => {
    if (window.confirm("Remove this education entry?")) {
      onChangeEducation(education.filter((_, i) => i !== idx));
    }
  };

  return (
    <div className="admin-tab-content">
      <div className="admin-section-header">
        <h2 className="admin-section-title">
          <span>PARC FERMÉ: CAREER &amp; EDUCATION</span>
        </h2>
        <p className="admin-section-desc">
          Manage your career chronology, internship stints, accomplishments, and degree details displayed in Sector 4.
        </p>
      </div>

      {/* Experience Section */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#fff", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <FiBriefcase color="#00f0ff" /> Professional Experience
        </h3>
        <button type="button" className="admin-btn admin-btn-secondary" onClick={addExperience}>
          <FiPlus /> Add Position
        </button>
      </div>

      {experience.map((exp, idx) => (
        <div key={exp.id || idx} className="admin-panel">
          <div className="admin-item-header">
            <div>
              <h4 style={{ margin: 0, fontSize: "1.1rem", color: "#fff" }}>
                {exp.role} <span style={{ color: "#00f0ff" }}>@ {exp.company}</span>
              </h4>
              <span style={{ fontSize: "0.8rem", color: "#94a3b8", fontFamily: "monospace" }}>
                {exp.period}
              </span>
            </div>
            <button
              type="button"
              className="admin-btn admin-btn-danger"
              style={{ padding: "0.35rem 0.6rem" }}
              onClick={() => removeExperience(idx)}
              title="Remove Position"
            >
              <FiTrash2 size={14} />
            </button>
          </div>

          <div className="admin-grid-3">
            <div className="admin-form-group">
              <label className="admin-label">Role Title</label>
              <input
                type="text"
                className="admin-input admin-input-plain"
                value={exp.role || ""}
                onChange={(e) => updateExperience(idx, "role", e.target.value)}
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Company / Organization</label>
              <input
                type="text"
                className="admin-input admin-input-plain"
                value={exp.company || ""}
                onChange={(e) => updateExperience(idx, "company", e.target.value)}
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Tenure / Period</label>
              <input
                type="text"
                className="admin-input admin-input-plain"
                value={exp.period || ""}
                placeholder="e.g. May 2025 — Aug 2025"
                onChange={(e) => updateExperience(idx, "period", e.target.value)}
              />
            </div>
          </div>

          {/* Highlights */}
          <div className="admin-form-group">
            <label className="admin-label">Key Highlights &amp; Metric Impact</label>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 0.75rem" }}>
              {(exp.highlights || []).map((h, hIdx) => (
                <li
                  key={hIdx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    marginBottom: "0.4rem",
                    padding: "0.4rem 0.6rem",
                    background: "rgba(255, 255, 255, 0.03)",
                    borderRadius: 6,
                    fontSize: "0.88rem",
                  }}
                >
                  <span style={{ color: "#e10600" }}>▸</span>
                  <span style={{ flex: 1 }}>{h}</span>
                  <button
                    type="button"
                    style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer" }}
                    onClick={() => removeHighlight(idx, hIdx)}
                    title="Remove bullet point"
                  >
                    <FiTrash2 size={13} />
                  </button>
                </li>
              ))}
            </ul>

            <div style={{ display: "flex", gap: "0.5rem" }}>
              <input
                type="text"
                className="admin-input admin-input-plain"
                placeholder="Add bullet point achievement (e.g. Reduced API latency by 35%)..."
                value={newHighlightInputs[idx] || ""}
                onChange={(e) => setNewHighlightInputs({ ...newHighlightInputs, [idx]: e.target.value })}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addHighlight(idx);
                  }
                }}
              />
              <button
                type="button"
                className="admin-btn admin-btn-secondary"
                onClick={() => addHighlight(idx)}
              >
                Add Bullet
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Education Section */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "2.5rem 0 1rem" }}>
        <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#fff", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <FiBookOpen color="#ffb800" /> Academic Credentials
        </h3>
        <button type="button" className="admin-btn admin-btn-secondary" onClick={addEducation}>
          <FiPlus /> Add Degree
        </button>
      </div>

      {education.map((edu, idx) => (
        <div key={edu.id || idx} className="admin-panel">
          <div className="admin-item-header">
            <div>
              <h4 style={{ margin: 0, fontSize: "1.1rem", color: "#fff" }}>
                {edu.degree} <span style={{ color: "#ffb800" }}>— {edu.institution}</span>
              </h4>
              <span style={{ fontSize: "0.8rem", color: "#94a3b8", fontFamily: "monospace" }}>
                {edu.period} • GPA: {edu.gpa}
              </span>
            </div>
            <button
              type="button"
              className="admin-btn admin-btn-danger"
              style={{ padding: "0.35rem 0.6rem" }}
              onClick={() => removeEducation(idx)}
            >
              <FiTrash2 size={14} />
            </button>
          </div>

          <div className="admin-grid-2">
            <div className="admin-form-group">
              <label className="admin-label">Institution Name</label>
              <input
                type="text"
                className="admin-input admin-input-plain"
                value={edu.institution || ""}
                onChange={(e) => updateEducation(idx, "institution", e.target.value)}
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Degree / Branch</label>
              <input
                type="text"
                className="admin-input admin-input-plain"
                value={edu.degree || ""}
                onChange={(e) => updateEducation(idx, "degree", e.target.value)}
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Period / Graduating Class</label>
              <input
                type="text"
                className="admin-input admin-input-plain"
                value={edu.period || ""}
                onChange={(e) => updateEducation(idx, "period", e.target.value)}
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-label">GPA / Score</label>
              <input
                type="text"
                className="admin-input admin-input-plain"
                value={edu.gpa || ""}
                placeholder="e.g. 8.5 / 10"
                onChange={(e) => updateEducation(idx, "gpa", e.target.value)}
              />
            </div>
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Curriculum / Key Focus</label>
            <input
              type="text"
              className="admin-input admin-input-plain"
              value={edu.details || ""}
              placeholder="e.g. Focus on algorithms, systems design, and AI/ML fundamentals."
              onChange={(e) => updateEducation(idx, "details", e.target.value)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
