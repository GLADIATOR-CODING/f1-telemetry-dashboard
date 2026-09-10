import { useState } from "react";
import { FiPlus, FiTrash2, FiBriefcase, FiBookOpen, FiArrowUp, FiArrowDown } from "react-icons/fi";

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

  const updateHighlight = (expIdx, hIdx, value) => {
    const exp = experience[expIdx];
    const updatedHighlights = [...(exp.highlights || [])];
    updatedHighlights[hIdx] = value;
    updateExperience(expIdx, "highlights", updatedHighlights);
  };

  const moveHighlight = (expIdx, hIdx, direction) => {
    const exp = experience[expIdx];
    const updatedHighlights = [...(exp.highlights || [])];
    const targetIdx = hIdx + direction;
    if (targetIdx < 0 || targetIdx >= updatedHighlights.length) return;
    const temp = updatedHighlights[hIdx];
    updatedHighlights[hIdx] = updatedHighlights[targetIdx];
    updatedHighlights[targetIdx] = temp;
    updateExperience(expIdx, "highlights", updatedHighlights);
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
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
              <label className="admin-label" style={{ margin: 0 }}>Key Highlights &amp; Metric Impact</label>
              <span style={{ fontSize: "0.75rem", color: "#64748b", fontFamily: "monospace" }}>
                {(exp.highlights || []).length} impact points
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "0.75rem" }}>
              {(exp.highlights || []).map((h, hIdx) => (
                <div
                  key={hIdx}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.6rem",
                    padding: "0.5rem 0.65rem",
                    background: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: 8,
                    transition: "border-color 0.2s ease",
                  }}
                >
                  <span style={{ color: "#e10600", fontSize: "1rem", marginTop: "0.35rem", userSelect: "none" }}>▸</span>
                  <textarea
                    className="admin-textarea"
                    rows={2}
                    style={{
                      flex: 1,
                      minHeight: "42px",
                      fontSize: "0.86rem",
                      lineHeight: 1.4,
                      padding: "0.45rem 0.65rem",
                      background: "rgba(0, 0, 0, 0.4)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: 6,
                      resize: "vertical",
                    }}
                    value={h}
                    onChange={(e) => updateHighlight(idx, hIdx, e.target.value)}
                    placeholder="Engineering achievement with quantifiable metric..."
                  />
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                    <button
                      type="button"
                      className="admin-btn admin-btn-secondary"
                      style={{ padding: "0.25rem 0.45rem", fontSize: "0.7rem" }}
                      disabled={hIdx === 0}
                      onClick={() => moveHighlight(idx, hIdx, -1)}
                      title="Move Up"
                    >
                      <FiArrowUp size={12} />
                    </button>
                    <button
                      type="button"
                      className="admin-btn admin-btn-secondary"
                      style={{ padding: "0.25rem 0.45rem", fontSize: "0.7rem" }}
                      disabled={hIdx === (exp.highlights || []).length - 1}
                      onClick={() => moveHighlight(idx, hIdx, 1)}
                      title="Move Down"
                    >
                      <FiArrowDown size={12} />
                    </button>
                    <button
                      type="button"
                      className="admin-btn admin-btn-danger"
                      style={{ padding: "0.25rem 0.45rem", fontSize: "0.7rem" }}
                      onClick={() => removeHighlight(idx, hIdx)}
                      title="Remove Point"
                    >
                      <FiTrash2 size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: "0.5rem" }}>
              <input
                type="text"
                className="admin-input admin-input-plain"
                placeholder="Add new metric or achievement (e.g. Reduced API latency by 35%)..."
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
                <FiPlus size={14} /> Add Bullet
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
