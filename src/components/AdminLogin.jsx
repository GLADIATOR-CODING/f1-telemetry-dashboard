import { useState, useEffect, useRef } from "react";
import { FiLock, FiEye, FiEyeOff, FiAlertCircle, FiCheckCircle, FiServer, FiExternalLink, FiShield } from "react-icons/fi";
import { FaFlagCheckered } from "react-icons/fa6";
import { usePortfolioStore } from "../stores/usePortfolioStore";

function TypingTitle({ text, highlight, speed = 60 }) {
  const [displayed, setDisplayed] = useState("");
  const full = text + highlight;
  useEffect(() => {
    let i = 0;
    setDisplayed("");
    const interval = setInterval(() => {
      if (i < full.length) {
        setDisplayed(full.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [full, speed]);

  const mainPart = displayed.slice(0, Math.min(displayed.length, text.length));
  const highlightPart = displayed.length > text.length ? displayed.slice(text.length) : "";

  return (
    <h1 className="admin-login-title font-display">
      {mainPart}
      {highlightPart && <span style={{ color: "var(--accent-f1)" }}>{highlightPart}</span>}
      <span style={{ animation: "cursorBlink 1s step-end infinite", marginLeft: 2 }}>_</span>
    </h1>
  );
}

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
  const passwordRef = useRef(null);

  useEffect(() => {
    if (passwordRef.current) passwordRef.current.focus();
  }, []);

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

  // Password strength visual (simple)
  const strengthLevel = password.length === 0 ? 0 : password.length < 6 ? 1 : password.length < 12 ? 2 : 3;
  const strengthColors = ["transparent", "#ef4444", "#f59e0b", "#00ff66"];
  const strengthLabels = ["", "WEAK", "MODERATE", "STRONG"];

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        {/* Header Badge */}
        <div className="admin-login-badge">
          <span className="pulse-dot" />
          <span>FIA Pit Wall Telemetry Control</span>
        </div>

        <TypingTitle text="RACE DIRECTOR " highlight="TERMINAL" speed={55} />
        <p className="admin-login-subtitle">
          Standalone telemetry cockpit to configure identity, projects, experience, passions, and AI knowledge.
        </p>

        {/* Server Connection Badge */}
        <div
          style={{
            marginBottom: "1.1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "rgba(255, 255, 255, 0.03)",
            padding: "0.45rem 0.7rem",
            borderRadius: "var(--radius-sm)",
            fontSize: "0.72rem",
            border: "1px solid var(--border-subtle)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", overflow: "hidden" }}>
            <FiServer color="var(--accent-cyan)" size={13} />
            <span style={{ color: "var(--text-muted)" }}>Target:</span>
            <span
              style={{
                color: "var(--text-primary)",
                fontFamily: "var(--font-mono)",
                fontSize: "0.68rem",
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
              }}
            >
              {apiTarget}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setShowServerConfig(!showServerConfig)}
            style={{
              background: "none",
              border: "none",
              color: "var(--accent-cyan)",
              cursor: "pointer",
              fontSize: "0.68rem",
              fontFamily: "var(--font-mono)",
              textDecoration: "none",
              opacity: 0.8,
            }}
          >
            {showServerConfig ? "Close" : "Change"}
          </button>
        </div>

        {showServerConfig && (
          <div
            style={{
              marginBottom: "1.1rem",
              padding: "0.7rem",
              background: "var(--accent-cyan-subtle)",
              border: "1px solid rgba(0, 240, 255, 0.15)",
              borderRadius: "var(--radius-sm)",
              animation: "panelSlideIn 0.2s var(--ease-snappy)",
            }}
          >
            <label className="admin-label" style={{ fontSize: "0.68rem" }}>
              Backend URL
            </label>
            <div style={{ display: "flex", gap: "0.4rem" }}>
              <input
                type="text"
                className="admin-input admin-input-plain"
                style={{ fontSize: "0.78rem", padding: "0.35rem 0.55rem" }}
                value={customServer}
                onChange={(e) => setCustomServer(e.target.value)}
              />
              <button
                type="button"
                className="admin-btn admin-btn-secondary"
                style={{ padding: "0.35rem 0.7rem", fontSize: "0.72rem" }}
                onClick={handleSaveServer}
              >
                Apply
              </button>
            </div>
          </div>
        )}

        {error && (
          <div className="admin-error-banner" role="alert">
            <FiAlertCircle size={14} />
            <span>{error}</span>
          </div>
        )}

        {accessGranted && (
          <div
            className="admin-error-banner"
            style={{
              background: "var(--accent-green-subtle)",
              borderColor: "rgba(0, 255, 102, 0.25)",
              color: "var(--accent-green)",
            }}
          >
            <FiCheckCircle size={14} />
            <span>Clearance accepted. Initializing cockpit...</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="admin-form-group">
            <label className="admin-label" htmlFor="admin-key">
              Master Passkey
            </label>
            <div className="admin-input-wrapper">
              <FiLock className="admin-input-icon" />
              <input
                id="admin-key"
                ref={passwordRef}
                type={showPassword ? "text" : "password"}
                className="admin-input"
                placeholder="Enter admin password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isSubmitting || accessGranted}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "0.75rem",
                  background: "none",
                  border: "none",
                  color: "var(--text-muted)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                }}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FiEyeOff size={15} /> : <FiEye size={15} />}
              </button>
            </div>

            {/* Password strength indicator */}
            {password.length > 0 && (
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.4rem" }}>
                <div
                  style={{
                    flex: 1,
                    height: 3,
                    background: "var(--bg-tertiary)",
                    borderRadius: 2,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${(strengthLevel / 3) * 100}%`,
                      height: "100%",
                      background: strengthColors[strengthLevel],
                      borderRadius: 2,
                      transition: "width 0.3s, background 0.3s",
                    }}
                  />
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6rem",
                    color: strengthColors[strengthLevel],
                    letterSpacing: "0.08em",
                  }}
                >
                  {strengthLabels[strengthLevel]}
                </span>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="admin-btn admin-btn-primary"
            style={{ width: "100%", justifyContent: "center", padding: "0.7rem" }}
            disabled={isSubmitting || accessGranted}
          >
            {isSubmitting ? (
              <span>Verifying Telemetry...</span>
            ) : accessGranted ? (
              <>
                <FiCheckCircle />
                <span>Access Granted</span>
              </>
            ) : (
              <>
                <FiShield size={15} />
                <span>Initialize Pit Wall</span>
              </>
            )}
          </button>
        </form>

        {/* Recruiter / Showcase Sandbox Option */}
        <div style={{ marginTop: "0.85rem", textAlign: "center" }}>
          <button
            type="button"
            className="admin-btn admin-btn-secondary"
            style={{ width: "100%", justifyContent: "center", fontSize: "0.75rem", padding: "0.6rem" }}
            onClick={handleDemoMode}
            disabled={isSubmitting || accessGranted}
          >
            Explore Showcase Demo (Sandbox Mode)
          </button>
          <span
            style={{
              display: "block",
              marginTop: "0.3rem",
              fontSize: "0.65rem",
              color: "var(--text-muted)",
              fontFamily: "var(--font-mono)",
            }}
          >
            For recruiters & reviewers — sandbox without live DB updates.
          </span>
        </div>

        <div className="admin-login-footer">
          <a
            href="https://kshitizlo.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="admin-login-backlink"
          >
            <span>View Public Circuit Portfolio</span>
            <FiExternalLink size={12} />
          </a>
        </div>
      </div>
    </div>
  );
}
