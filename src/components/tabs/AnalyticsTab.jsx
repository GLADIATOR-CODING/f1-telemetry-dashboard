import { FiBarChart2, FiActivity, FiGlobe, FiClock } from "react-icons/fi";

function TelemetryLineChart({ color = "var(--accent-cyan)", data = [] }) {
  // Simple SVG sparkline generator
  const max = Math.max(...data, 100);
  const points = data.map((val, idx) => {
    const x = (idx / (data.length - 1)) * 300;
    const y = 80 - (val / max) * 60; // 80 is the bottom, 20 is the top padding
    return `${x},${y}`;
  }).join(" ");

  return (
    <div style={{ position: "relative", height: "100px", width: "100%", marginTop: "1rem" }}>
      <svg viewBox="0 0 300 100" preserveAspectRatio="none" style={{ width: "100%", height: "100%", overflow: "visible" }}>
        {/* Grid lines */}
        <line x1="0" y1="20" x2="300" y2="20" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="0" y1="50" x2="300" y2="50" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="0" y1="80" x2="300" y2="80" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="4 4" />
        
        {/* Chart Line */}
        <polyline
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points}
          style={{ filter: `drop-shadow(0 0 6px ${color}80)` }}
        />
        
        {/* Fill underneath */}
        <polygon
          fill={`url(#gradient-${color.replace(/[^\w\d]/g, "")})`}
          points={`0,100 ${points} 300,100`}
          opacity="0.3"
        />
        
        <defs>
          <linearGradient id={`gradient-${color.replace(/[^\w\d]/g, "")}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.8" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function StatBox({ label, value, trend, icon: Icon, color = "var(--accent-f1)" }) {
  const isPositive = trend && trend.startsWith("+");
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-sm)",
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        position: "relative",
        overflow: "hidden"
      }}
    >
      <div style={{ position: "absolute", top: -10, right: -10, opacity: 0.1, color }}>
        <Icon size={64} />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--text-muted)" }}>
        <Icon size={14} color={color} />
        <span style={{ fontSize: "0.7rem", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
          {label}
        </span>
      </div>
      <div style={{ fontSize: "1.5rem", fontFamily: "var(--font-telemetry)", fontWeight: 700, color: "#fff" }}>
        {value}
      </div>
      {trend && (
        <div style={{ fontSize: "0.7rem", fontFamily: "var(--font-mono)", color: isPositive ? "var(--accent-green)" : "var(--accent-f1)" }}>
          {trend} this week
        </div>
      )}
    </div>
  );
}

export default function AnalyticsTab() {
  // Mock data for the charts to simulate website performance telemetry
  const trafficData = [45, 60, 55, 80, 120, 150, 130, 160, 210, 190, 250, 300, 280, 310];
  const responseTimeData = [120, 110, 105, 95, 90, 85, 80, 82, 75, 70, 65, 60, 55, 52];

  return (
    <div className="admin-tab-content">
      <div className="admin-section-header">
        <h2 className="admin-section-title">
          <span>RACE ENGINEER ANALYTICS</span>
        </h2>
        <p className="admin-section-desc">
          Live telemetry, performance metrics, and visitor analytics from the pit wall.
        </p>
      </div>

      <div className="admin-grid-3">
        {/* Avatar / Race Engineer Panel */}
        <div className="admin-panel" style={{ padding: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <div style={{ position: "relative", height: "180px", background: "#0a0b10", borderBottom: "1px solid var(--border-subtle)" }}>
            <img 
              src="/images/pixel-race-engineer.jpg" 
              alt="Pixel Race Engineer" 
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "top",
                filter: "contrast(1.1) brightness(0.9)",
              }}
            />
            {/* Scanline effect over image */}
            <div style={{
              position: "absolute",
              inset: 0,
              background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)",
              pointerEvents: "none"
            }} />
            {/* Glitch/HUD overlay */}
            <div style={{
              position: "absolute",
              bottom: 10,
              left: 10,
              background: "rgba(0,0,0,0.6)",
              padding: "0.2rem 0.5rem",
              borderRadius: "2px",
              borderLeft: "2px solid var(--accent-cyan)",
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              color: "var(--accent-cyan)",
              letterSpacing: "0.1em"
            }}>
              LIVE FEED // CAM 04
            </div>
          </div>
          <div style={{ padding: "1rem", position: "relative", zIndex: 1 }}>
            <h3 style={{ margin: 0, fontSize: "0.9rem", color: "#fff", fontFamily: "var(--font-display)", display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent-green)", boxShadow: "0 0 8px var(--accent-green)" }} />
              RACE ENGINEER STATUS
            </h3>
            <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: "0.5rem", lineHeight: 1.5 }}>
              AI Model: Gemini 1.5 Flash<br/>
              Status: Operational & Monitoring<br/>
              System Load: Nominal (14%)
            </p>
          </div>
        </div>

        {/* Key Metrics */}
        <div style={{ gridColumn: "span 2", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-4)" }}>
          <StatBox label="Total Visitors" value="12,450" trend="+14%" icon={FiActivity} color="var(--accent-cyan)" />
          <StatBox label="Avg Load Time" value="45ms" trend="-12ms" icon={FiClock} color="var(--accent-green)" />
          <StatBox label="Active Sessions" value="24" trend="+3" icon={FiGlobe} color="var(--accent-amber)" />
          <StatBox label="API Requests" value="4.2M" trend="+2%" icon={FiBarChart2} color="var(--accent-purple)" />
        </div>
      </div>

      {/* Main Charts */}
      <div className="admin-panel" style={{ marginTop: "var(--space-5)" }}>
        <h3 className="admin-panel-title">
          <span>Traffic Telemetry (7 Days)</span>
          <span style={{ fontSize: "0.65rem", color: "var(--accent-cyan)", background: "var(--accent-cyan-subtle)", padding: "0.2rem 0.5rem", borderRadius: "var(--radius-sm)" }}>LIVE</span>
        </h3>
        <TelemetryLineChart color="var(--accent-cyan)" data={trafficData} />
      </div>

      <div className="admin-panel">
        <h3 className="admin-panel-title">
          <span>Server Response Time (ms)</span>
          <span style={{ fontSize: "0.65rem", color: "var(--accent-green)", background: "var(--accent-green-subtle)", padding: "0.2rem 0.5rem", borderRadius: "var(--radius-sm)" }}>OPTIMAL</span>
        </h3>
        <TelemetryLineChart color="var(--accent-green)" data={responseTimeData} />
      </div>
    </div>
  );
}
