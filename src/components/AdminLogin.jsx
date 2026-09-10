import { useState } from "react";
import { FiLock, FiEye, FiEyeOff, FiAlertCircle, FiCheckCircle, FiServer, FiExternalLink } from "react-icons/fi";
import { FaFlagCheckered } from "react-icons/fa6";
import { usePortfolioStore } from "../stores/usePortfolioStore";

export default function AdminLogin({ onLoginSuccess }) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [accessGranted, setAccessGranted] = useState(false);
  const [showServerConfig, setShowServerConfig] = useState(false);

  const login = usePortfolioStore((s) => s.login);
  const apiTarget = usePortfolioStore((s) => s.apiTarget);
  const setApiTarget = usePortfolioStore((s) => s.setApiTarget);
  const setDemoMode = usePortfolioStore((s) => s.setDemoMode);

  const [customServer, setCustomServer] = useState(apiTarget);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password.trim()) {
      setError("Please enter your access key.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await login(password);
      setAccessGranted(true);
      setTimeout(() => {
        if (onLoginSuccess) onLoginSuccess();
      }, 700);
    } catch (err) {
      setError(err.message || "Access denied. Invalid pit wall security key.");
      setIsSubmitting(false);
    }
  };

  const handleDemoMode = () => {
    setDemoMode(true);
    setAccessGranted(true);
    setTimeout(() => {
      if (onLoginSuccess) onLoginSuccess();
    }, 400);
  };

  const handleSaveServer = () => {
    if (customServer.trim()) {
      setApiTarget(customServer.trim());
      setShowServerConfig(false);
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        {/* Header Badge */}
        <div className="admin-login-badge">
          <span className="pulse-dot" />
          <span>FIA Pit Wall Telemetry Control</span>
        </div>

        <h1 className="admin-login-title font-display">
          RACE DIRECTOR <span style={{ color: "#e10600" }}>TERMINAL</span>
        </h1>
        <p className="admin-login-subtitle">
          Standalone telemetry cockpit to configure identity, projects, experience, passions, and AI knowledge.
        </p>

        {/* Server Connection Badge */}
        <div style={{ marginBottom: "1.25rem", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(255, 255, 255, 0.04)", padding: "0.5rem 0.75rem", borderRadius: 8, fontSize: "0.78rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", overflow: "hidden" }}>
            <FiServer color="#00f0ff" />
            <span style={{ color: "#94a3b8" }}>Target Server:</span>
            <span style={{ color: "#f8fafc", fontFamily: "monospace", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
              {apiTarget}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setShowServerConfig(!showServerConfig)}
            style={{ background: "none", border: "none", color: "#00f0ff", cursor: "pointer", fontSize: "0.75rem", textDecoration: "underline" }}
          >
            {showServerConfig ? "Close" : "Change"}
          </button>
        </div>

        {showServerConfig && (
          <div style={{ marginBottom: "1.25rem", padding: "0.75rem", background: "rgba(0, 240, 255, 0.05)", border: "1px solid rgba(0, 240, 255, 0.2)", borderRadius: 8 }}>
            <label className="admin-label" style={{ fontSize: "0.75rem" }}>Backend URL (e.g. http://localhost:3000 or https://kshitizlo.vercel.app)</label>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <input
                type="text"
                className="admin-input admin-input-plain"
                style={{ fontSize: "0.82rem", padding: "0.4rem 0.6rem" }}
                value={customServer}
                onChange={(e) => setCustomServer(e.target.value)}
              />
              <button
                type="button"
                className="admin-btn admin-btn-secondary"
                style={{ padding: "0.4rem 0.8rem", fontSize: "0.78rem" }}
                onClick={handleSaveServer}
              >
                Apply
              </button>
            </div>
          </div>
        )}

        {error && (
          <div className="admin-error-banner" role="alert">
            <FiAlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        {accessGranted && (
          <div
            className="admin-error-banner"
            style={{
              background: "rgba(16, 185, 129, 0.15)",
              borderColor: "rgba(16, 185, 129, 0.4)",
              color: "#34d399",
            }}
          >
            <FiCheckCircle size={16} />
            <span>Clearance accepted. Initializing cockpit...</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="admin-form-group">
            <label className="admin-label" htmlFor="admin-key">
              Master Passkey (ADMIN_PASSWORD)
            </label>
            <div className="admin-input-wrapper">
              <FiLock className="admin-input-icon" />
              <input
                id="admin-key"
                type={showPassword ? "text" : "password"}
                className="admin-input"
                placeholder="Enter admin password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
                disabled={isSubmitting || accessGranted}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "1rem",
                  background: "none",
                  border: "none",
                  color: "#64748b",
                  cursor: "pointer",
                }}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="admin-btn admin-btn-primary"
            style={{ width: "100%", justifyContent: "center" }}
            disabled={isSubmitting || accessGranted}
          >
            {isSubmitting ? (
              <span>Verifying Telemetry...</span>
            ) : accessGranted ? (
              <span>Access Granted</span>
            ) : (
              <>
                <FaFlagCheckered />
                <span>Initialize Live Pit Wall</span>
              </>
            )}
          </button>
        </form>

        {/* Recruiter / Showcase Sandbox Option */}
        <div style={{ marginTop: "1rem", textAlign: "center" }}>
          <button
            type="button"
            className="admin-btn admin-btn-secondary"
            style={{ width: "100%", justifyContent: "center", fontSize: "0.82rem" }}
            onClick={handleDemoMode}
            disabled={isSubmitting || accessGranted}
          >
            Explore Showcase Demo (Sandbox Mode)
          </button>
          <span style={{ display: "block", marginTop: "0.35rem", fontSize: "0.72rem", color: "#64748b" }}>
            For recruiters &amp; reviewers: sandbox in-memory test without live database updates.
          </span>
        </div>

        <div className="admin-login-footer">
          <a href="https://kshitizlo.vercel.app" target="_blank" rel="noopener noreferrer" className="admin-login-backlink">
            <span>View Public Circuit Portfolio</span>
            <FiExternalLink size={13} />
          </a>
        </div>
      </div>
    </div>
  );
}
