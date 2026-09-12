import { useState, useEffect } from "react";

const TAB_MESSAGES = {
  identity: "Driver telemetry looks solid. OVR is holding steady.",
  projects: "Garage bays open. Awaiting aerodynamic upgrades.",
  experience: "Parc fermé data loaded. That was a strong stint.",
  skills: "Monitoring core temps. CPU and frameworks optimal.",
  passions: "Off-track vitals are green. Driver is in the zone.",
  ai: "Radio check. Gemini comms are loud and clear.",
  socials: "Broadcasting coordinates to the global paddock.",
  analytics: "Sector 1 is purple. Traffic metrics are flying.",
};

const FAMOUS_QUOTES = [
  "We are checking...",
  "Leave me alone, I know what I'm doing.",
  "Valtteri, it's James.",
  "You will not have the drink.",
  "Stop inventing, stop inventing!",
  "Box, box, box.",
  "Bwoah.",
  "Multi 21, Seb, Multi 21.",
  "It's called a motor race, OK? We went car racing.",
  "Smooooooth operator.",
  "GP2 engine, GP2... aarrgh!"
];

const TYPING_QUOTES = [
  "Analyzing keystrokes...",
  "Input sequence detected.",
  "Writing telemetry...",
  "Syntax is looking clean.",
  "I'm keeping an eye on this.",
];

export default function MiniRaceEngineer({ activeTab }) {
  const [message, setMessage] = useState("");
  const [displayedMessage, setDisplayedMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Coordinates for silky smooth tracking
  const [position, setPosition] = useState({ top: 0, left: 0 }); 
  const [eyeExpression, setEyeExpression] = useState("idle"); 

  // Set initial home position on mount (bottom right corner)
  useEffect(() => {
    const setHome = () => {
      setPosition({ 
        top: window.innerHeight - 130, 
        left: window.innerWidth - 130 
      });
    };
    setHome();
    window.addEventListener("resize", setHome);
    return () => window.removeEventListener("resize", setHome);
  }, []);

  // Initialization sequence
  useEffect(() => {
    setMessage("AI Pit Droid online. Systems nominal.");
    setDisplayedMessage("");
    setIsTyping(true);
    const initTimer = setTimeout(() => {
      setIsInitialized(true);
    }, 4000);
    return () => clearTimeout(initTimer);
  }, []);

  // Tab change triggers new message
  useEffect(() => {
    if (!isInitialized) return;
    const targetMsg = TAB_MESSAGES[activeTab] || "Awaiting instructions, Race Control.";
    setMessage(targetMsg);
    setDisplayedMessage("");
    setIsTyping(true);
    setEyeExpression("scanning");
    setTimeout(() => setEyeExpression("idle"), 2000);
  }, [activeTab, isInitialized]); 

  // Random quotes (every 25 seconds)
  useEffect(() => {
    if (!isInitialized) return;
    const interval = setInterval(() => {
      if (Math.random() > 0.5 && !isTyping && eyeExpression === "idle") {
        const randomQuote = FAMOUS_QUOTES[Math.floor(Math.random() * FAMOUS_QUOTES.length)];
        setMessage(`[RADIO]: "${randomQuote}"`);
        setDisplayedMessage("");
        setIsTyping(true);
        
        // Pick a random expression when talking
        const expressions = ["happy", "surprised", "love", "thinking"];
        const randExpr = expressions[Math.floor(Math.random() * expressions.length)];
        setEyeExpression(randExpr);
        setTimeout(() => setEyeExpression("idle"), 3000);
      }
    }, 25000);
    return () => clearInterval(interval);
  }, [isInitialized, isTyping, eyeExpression]);

  // Global Typing Detection Listener - The droid flies over to look!
  useEffect(() => {
    let typingTimeout;
    let currentInput = null;

    const handleKeyDown = (e) => {
      const tagName = e.target.tagName.toLowerCase();
      if (tagName === 'input' || tagName === 'textarea') {
        
        // FIX LAG: Only calculate bounding rect if the input field changed
        // getBoundingClientRect is extremely expensive and causes lag if called on every keystroke
        if (currentInput !== e.target) {
          currentInput = e.target;
          const rect = e.target.getBoundingClientRect();
          let targetLeft = rect.right + 20; // Fly to the right side of the input
          let targetTop = rect.top - 30;    // Hover slightly above it

          // Boundary checks so it doesn't fly off screen
          if (targetLeft > window.innerWidth - 120) {
             targetLeft = rect.left - 100; // Flip to left side if not enough room
          }
          if (targetTop < 80) {
             targetTop = rect.bottom + 20; // Go below if hitting the top roof
          }

          setPosition({ top: targetTop, left: targetLeft });
        }

        setEyeExpression('typing');
        
        // Sometimes it says something while watching you type
        if (!isTyping && Math.random() > 0.95) {
          const tQuote = TYPING_QUOTES[Math.floor(Math.random() * TYPING_QUOTES.length)];
          setMessage(`[RADIO]: "${tQuote}"`);
          setDisplayedMessage("");
          setIsTyping(true);
        }

        // Debounce to return home when typing stops
        clearTimeout(typingTimeout);
        typingTimeout = setTimeout(() => {
          // Give a happy squint when done typing
          setEyeExpression('happy');
          currentInput = null; // reset input tracking
          
          // Fly back home
          setPosition({ 
            top: window.innerHeight - 130, 
            left: window.innerWidth - 130 
          });

          // Return eyes to idle
          setTimeout(() => {
            setEyeExpression((prev) => prev === 'happy' ? 'idle' : prev);
          }, 2000);
        }, 1500); 
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(typingTimeout);
    };
  }, [isTyping]);

  // Hover triggers a quote and a surprised look
  const handleHover = () => {
    setEyeExpression('surprised');
    setTimeout(() => {
      setEyeExpression(prev => prev === 'surprised' ? 'idle' : prev);
    }, 2000);

    if (isTyping) return;
    const randomQuote = FAMOUS_QUOTES[Math.floor(Math.random() * FAMOUS_QUOTES.length)];
    setMessage(`[RADIO]: "${randomQuote}"`);
    setDisplayedMessage("");
    setIsTyping(true);
  };

  // Typing effect for the speech bubble
  useEffect(() => {
    if (!isTyping) return;
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedMessage(message.substring(0, i + 1));
      i++;
      if (i >= message.length) {
        setIsTyping(false);
        clearInterval(interval);
        
        setTimeout(() => {
          setDisplayedMessage("");
        }, 6000);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [message, isTyping]);

  // Render dynamic SVG eyes based on expression state
  const renderEyes = () => {
    switch (eyeExpression) {
      case 'typing':
        // Focused, angled down/left towards the keyboard
        return (
          <g filter="drop-shadow(0 0 6px var(--accent-cyan))" className="eyes-transition">
            <ellipse cx="33" cy="63" rx="6" ry="2.5" fill="var(--accent-cyan)" transform="rotate(15 33 63)" />
            <ellipse cx="67" cy="63" rx="6" ry="2.5" fill="var(--accent-cyan)" transform="rotate(-15 67 63)" />
          </g>
        );
      case 'happy':
        // Happy ^ ^ squint
        return (
          <g filter="drop-shadow(0 0 6px var(--accent-cyan))" className="eyes-transition">
            <path d="M 30 63 Q 35 56 40 63" fill="none" stroke="var(--accent-cyan)" strokeWidth="3" strokeLinecap="round" />
            <path d="M 60 63 Q 65 56 70 63" fill="none" stroke="var(--accent-cyan)" strokeWidth="3" strokeLinecap="round" />
          </g>
        );
      case 'surprised':
        // Big O_O circles
        return (
          <g filter="drop-shadow(0 0 8px #fff)" className="eyes-transition">
            <circle cx="35" cy="62" r="6" fill="#fff" />
            <circle cx="65" cy="62" r="6" fill="#fff" />
          </g>
        );
      case 'thinking':
        // Thinking / Loading expression (One big, one small)
        return (
          <g filter="drop-shadow(0 0 6px var(--accent-cyan))" className="eyes-transition">
            <circle cx="35" cy="62" r="4" fill="var(--accent-cyan)" />
            <ellipse cx="65" cy="62" rx="4" ry="1.5" fill="var(--accent-cyan)" />
          </g>
        );
      case 'love':
        // Heart eyes ♥ ♥
        return (
          <g filter="drop-shadow(0 0 6px #ff1e1e)" className="eyes-transition" fill="#ff1e1e">
            <path d="M 35 65 L 31 61 A 3 3 0 0 1 35 58 A 3 3 0 0 1 39 61 Z" />
            <path d="M 65 65 L 61 61 A 3 3 0 0 1 65 58 A 3 3 0 0 1 69 61 Z" />
          </g>
        );
      case 'scanning':
        // Cylon scanning visor
        return (
          <g className="cylon-scanner">
            <ellipse cx="50" cy="62" rx="15" ry="4" fill="url(#eyeScanner)" />
            <circle cx="50" cy="62" r="3" fill="#ffffff" />
          </g>
        );
      case 'angry':
        // Angry \ / angled eyes
        return (
          <g filter="drop-shadow(0 0 6px #ff1e1e)" className="eyes-transition">
            <ellipse cx="33" cy="63" rx="6" ry="2" fill="#ff1e1e" transform="rotate(25 33 63)" />
            <ellipse cx="67" cy="63" rx="6" ry="2" fill="#ff1e1e" transform="rotate(-25 67 63)" />
          </g>
        );
      case 'idle':
      default:
        // Normal oval blinking eyes
        return (
          <g filter="drop-shadow(0 0 5px var(--accent-cyan))" className="eyes-idle">
            <ellipse cx="35" cy="62" rx="3.5" ry="6" fill="var(--accent-cyan)" />
            <ellipse cx="65" cy="62" rx="3.5" ry="6" fill="var(--accent-cyan)" />
          </g>
        );
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: position.top,
        left: position.left,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pointerEvents: "auto", 
        // Silky smooth CSS interpolation for gliding across the screen
        transition: "top 1.2s cubic-bezier(0.25, 1, 0.5, 1), left 1.2s cubic-bezier(0.25, 1, 0.5, 1)", 
      }}
      onMouseEnter={handleHover}
    >
      {/* Speech Bubble */}
      <div
        style={{
          background: "rgba(10, 11, 16, 0.95)",
          border: "1px solid var(--accent-cyan)",
          borderRadius: "var(--radius-md)",
          padding: "0.8rem 1.2rem",
          marginBottom: "1rem",
          width: "200px", /* Slightly narrower */
          boxSizing: "border-box",
          wordWrap: "break-word",
          fontFamily: "var(--font-mono)",
          fontSize: "0.75rem",
          color: "var(--accent-cyan)",
          lineHeight: 1.5,
          boxShadow: "0 0 20px rgba(0, 240, 255, 0.2)",
          position: "absolute",
          bottom: "100%",
          right: "-10px", /* Pin to the right side so it extends leftward and avoids screen edge */
          opacity: displayedMessage ? 1 : 0,
          transition: "opacity 0.3s",
          textAlign: "center",
          pointerEvents: "none",
        }}
      >
        {displayedMessage}
        {isTyping && <span style={{ animation: "pulse 1s infinite" }}>_</span>}
        
        {/* Bubble Tail */}
        <div
          style={{
            position: "absolute",
            bottom: "-6px",
            right: "40px", /* Move tail to align with mascot head */
            transform: "rotate(45deg)",
            width: "12px",
            height: "12px",
            background: "rgba(10, 11, 16, 0.95)",
            borderRight: "1px solid var(--accent-cyan)",
            borderBottom: "1px solid var(--accent-cyan)",
          }}
        />
      </div>

      {/* Floating Telemetry Droid Mascot */}
      <div
        style={{
          width: "90px",
          height: "90px",
          animation: "droneFloat 4s ease-in-out infinite",
          filter: "drop-shadow(0 20px 25px rgba(0,0,0,0.9))",
          cursor: "crosshair",
        }}
      >
        <svg viewBox="0 0 100 115" width="100%" height="100%">
          <defs>
            <linearGradient id="helmetGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ff1e1e" />
              <stop offset="60%" stopColor="#b30000" />
              <stop offset="100%" stopColor="#4a0000" />
            </linearGradient>
            
            <linearGradient id="visorGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#222" />
              <stop offset="40%" stopColor="#0a0b10" />
              <stop offset="100%" stopColor="#000" />
            </linearGradient>

            <linearGradient id="earMuffGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#333" />
              <stop offset="100%" stopColor="#111" />
            </linearGradient>

            {/* LED Screen Pattern for the Visor */}
            <pattern id="ledGrid" width="4" height="4" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="#000" opacity="0.6"/>
            </pattern>

            {/* Booster Gradients */}
            <radialGradient id="outerFlame" cx="50%" cy="0%" r="100%">
              <stop offset="0%" stopColor="rgba(0, 240, 255, 0.9)" />
              <stop offset="70%" stopColor="rgba(0, 150, 255, 0.5)" />
              <stop offset="100%" stopColor="rgba(0, 50, 255, 0)" />
            </radialGradient>
            
            <radialGradient id="innerFlame" cx="50%" cy="0%" r="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="60%" stopColor="var(--accent-cyan)" />
              <stop offset="100%" stopColor="rgba(0, 240, 255, 0)" />
            </radialGradient>
            
            <radialGradient id="eyeScanner" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="30%" stopColor="var(--accent-cyan)" />
              <stop offset="100%" stopColor="rgba(0, 240, 255, 0)" />
            </radialGradient>
          </defs>

          {/* Detailed Booster/Exhaust Assembly */}
          <g className="droid-booster-system">
            <path d="M 32 88 Q 50 115 68 88 Z" fill="url(#outerFlame)" className="flame-outer" />
            <path d="M 38 88 Q 50 105 62 88 Z" fill="url(#innerFlame)" className="flame-inner" />
            <ellipse cx="50" cy="88" rx="14" ry="4" fill="#ffffff" opacity="0.9" className="flame-core" />
            
            <path d="M 38 80 L 62 80 L 68 88 L 32 88 Z" fill="#111" stroke="#333" strokeWidth="2" />
            <line x1="45" y1="80" x2="45" y2="88" stroke="#333" strokeWidth="1" />
            <line x1="55" y1="80" x2="55" y2="88" stroke="#333" strokeWidth="1" />
          </g>

          {/* Main Helmet Dome */}
          <path d="M 20 50 Q 20 15 50 15 Q 80 15 80 50 L 75 80 Q 50 90 25 80 Z" fill="url(#helmetGrad)" />
          
          <path d="M 48 10 Q 50 5 52 10 L 52 40 L 48 40 Z" fill="#fff" opacity="0.8" />
          <path d="M 50 10 L 50 40" stroke="#b30000" strokeWidth="1" />

          {/* Visor Screen Base */}
          <path d="M 18 45 Q 50 65 82 45 L 75 70 Q 50 85 25 70 Z" fill="url(#visorGrad)" stroke="#111" strokeWidth="2" />
          
          {/* LED Grid Overlay (Sphere Effect) */}
          <path d="M 18 45 Q 50 65 82 45 L 75 70 Q 50 85 25 70 Z" fill="url(#ledGrid)" />

          {/* Visor Glare/Reflection */}
          <path d="M 22 48 Q 50 62 78 48 Q 50 55 22 48" fill="#ffffff" opacity="0.15" />
          <path d="M 25 65 L 35 55 L 40 58 L 28 68 Z" fill="#ffffff" opacity="0.05" />

          {/* Dynamic Sphere LED Eyes */}
          <g className="sphere-eyes">
            {renderEyes()}
          </g>

          {/* Carbon Fiber Mouthpiece/Vent */}
          <path d="M 40 75 L 60 75 L 55 82 L 45 82 Z" fill="#0a0b10" stroke="#222" strokeWidth="1" />
          <line x1="43" y1="78" x2="57" y2="78" stroke="#333" strokeWidth="1" />
          <line x1="45" y1="80" x2="55" y2="80" stroke="#333" strokeWidth="1" />

          {/* Side Earmuffs / Comms Units */}
          <rect x="10" y="40" width="12" height="30" rx="4" fill="url(#earMuffGrad)" stroke="#111" strokeWidth="1" />
          <rect x="78" y="40" width="12" height="30" rx="4" fill="url(#earMuffGrad)" stroke="#111" strokeWidth="1" />
          <circle cx="16" cy="55" r="4" fill="var(--accent-f1)" />
          <circle cx="84" cy="55" r="4" fill="var(--accent-f1)" />
          
          <line x1="84" y1="40" x2="95" y2="20" stroke="#555" strokeWidth="2" />
          <line x1="81" y1="40" x2="87" y2="40" stroke="#222" strokeWidth="3" />
          <circle cx="95" cy="20" r="4" fill="var(--accent-cyan)" className="antenna-blink" />
          <circle cx="95" cy="20" r="2" fill="#fff" />
        </svg>
      </div>

      <style>{`
        @keyframes droneFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        /* Sphere Eye Animations */
        .eyes-idle {
          animation: sphereBlink 4s infinite;
          transform-origin: 50% 62px;
        }
        @keyframes sphereBlink {
          0%, 96%, 100% { transform: scaleY(1); }
          98% { transform: scaleY(0.1); }
        }
        .eyes-transition {
          animation: popIn 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        @keyframes popIn {
          0% { transform: scale(0.8); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        
        .cylon-scanner {
          animation: scanVisor 2s ease-in-out infinite alternate;
        }
        @keyframes scanVisor {
          0% { transform: translateX(-18px); }
          100% { transform: translateX(18px); }
        }

        /* High Fidelity Booster Animations */
        .flame-outer {
          animation: thrustOuter 0.15s infinite alternate;
          transform-origin: 50% 88px;
        }
        .flame-inner {
          animation: thrustInner 0.1s infinite alternate;
          transform-origin: 50% 88px;
        }
        .flame-core {
          animation: thrustCore 0.05s infinite alternate;
          transform-origin: 50% 88px;
        }
        
        @keyframes thrustOuter {
          0% { transform: scaleY(0.9) scaleX(0.95); opacity: 0.7; }
          100% { transform: scaleY(1.2) scaleX(1.05); opacity: 1; }
        }
        @keyframes thrustInner {
          0% { transform: scaleY(0.8); opacity: 0.8; }
          100% { transform: scaleY(1.3); opacity: 1; }
        }
        @keyframes thrustCore {
          0% { transform: scaleY(0.7); opacity: 0.9; }
          100% { transform: scaleY(1.1); opacity: 1; }
        }
        
        .antenna-blink {
          animation: blinkAntenna 1.5s infinite;
        }
        @keyframes blinkAntenna {
          0%, 100% { opacity: 1; filter: drop-shadow(0 0 5px var(--accent-cyan)); }
          50% { opacity: 0.4; filter: none; }
        }
      `}</style>
    </div>
  );
}
