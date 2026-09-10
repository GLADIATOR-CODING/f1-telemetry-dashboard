import { FiFilm, FiTv, FiHeadphones, FiGlobe, FiZap } from "react-icons/fi";
import { FaFlagCheckered } from "react-icons/fa6";

/**
 * PassionIcon — Sleek F1-grade SVG icon renderer for Paddock dossiers.
 */
export default function PassionIcon({ passion, className = "", size = 18 }) {
  const iconStr = String(passion?.icon || "");
  const idStr = String(passion?.id || "");
  const catStr = String(passion?.category || "");
  const key = `${iconStr} ${idStr} ${catStr}`.toLowerCase();

  let Icon = FiZap;

  if (key.includes("movie") || key.includes("cinema") || key.includes("film") || key.includes("🎬")) {
    Icon = FiFilm;
  } else if (key.includes("tv") || key.includes("series") || key.includes("show") || key.includes("📺")) {
    Icon = FiTv;
  } else if (
    key.includes("sport") ||
    key.includes("athletic") ||
    key.includes("motor") ||
    key.includes("race") ||
    key.includes("racing") ||
    key.includes("f1") ||
    key.includes("⚽") ||
    key.includes("🏎")
  ) {
    Icon = FaFlagCheckered;
  } else if (key.includes("music") || key.includes("sound") || key.includes("playlist") || key.includes("🎵")) {
    Icon = FiHeadphones;
  } else if (key.includes("bucket") || key.includes("dream") || key.includes("globe") || key.includes("🌍")) {
    Icon = FiGlobe;
  }

  const iconColor = passion?.color ? passion.color : "var(--accent-f1, #e10600)";

  return (
    <span
      className={`passion-icon-wrapper ${className}`}
      style={{ color: iconColor, display: "inline-flex", alignItems: "center" }}
      aria-hidden="true"
    >
      <Icon size={size} />
    </span>
  );
}
