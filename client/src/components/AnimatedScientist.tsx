import { useEffect, useState } from 'react';

export default function AnimatedScientist() {
  const [isHovered, setIsHovered] = useState(false);
  const [bobOffset, setBobOffset] = useState(0);

  // Gentle bobbing animation
  useEffect(() => {
    const interval = setInterval(() => {
      setBobOffset((prev) => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const bobY = Math.sin((bobOffset * Math.PI) / 180) * 5;

  return (
    <div
      className="fixed right-6 bottom-6 z-50 cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 to-lime-500/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* SVG Scientist */}
      <svg
        width="140"
        height="160"
        viewBox="0 0 140 160"
        className={`relative transition-transform duration-300 ${isHovered ? 'scale-110' : 'scale-100'}`}
        style={{ transform: `translateY(${bobY}px)` }}
      >
        {/* Head */}
        <circle cx="70" cy="40" r="22" fill="#e0e7ff" stroke="#818cf8" strokeWidth="2" />

        {/* Hair */}
        <path
          d="M 50 35 Q 50 15 70 15 Q 90 15 90 35"
          fill="#6366f1"
          stroke="#4f46e5"
          strokeWidth="2"
        />

        {/* Eyes */}
        <circle cx="62" cy="38" r="3" fill="#1e293b" />
        <circle cx="78" cy="38" r="3" fill="#1e293b" />

        {/* Smile */}
        <path
          d="M 62 45 Q 70 50 78 45"
          stroke="#1e293b"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />

        {/* Body - Lab Coat */}
        <rect x="48" y="65" width="44" height="50" rx="4" fill="#f0f9ff" stroke="#0ea5e9" strokeWidth="2" />

        {/* Lab Coat Buttons */}
        <circle cx="70" cy="75" r="2" fill="#0ea5e9" />
        <circle cx="70" cy="85" r="2" fill="#0ea5e9" />
        <circle cx="70" cy="95" r="2" fill="#0ea5e9" />

        {/* Left Arm */}
        <g>
          <line x1="48" y1="75" x2="30" y2="90" stroke="#e0e7ff" strokeWidth="5" strokeLinecap="round" />
          {/* Hand holding clipboard */}
          <rect x="20" y="85" width="15" height="20" rx="2" fill="#fbbf24" stroke="#f59e0b" strokeWidth="1" />
          <line x1="22" y1="90" x2="32" y2="90" stroke="#f59e0b" strokeWidth="1" />
          <line x1="22" y1="95" x2="32" y2="95" stroke="#f59e0b" strokeWidth="1" />
          <line x1="22" y1="100" x2="32" y2="100" stroke="#f59e0b" strokeWidth="1" />
        </g>

        {/* Right Arm */}
        <g>
          <line x1="92" y1="75" x2="110" y2="90" stroke="#e0e7ff" strokeWidth="5" strokeLinecap="round" />
          {/* Hand holding test tube */}
          <rect x="105" y="85" width="6" height="25" rx="3" fill="#fecaca" stroke="#ef4444" strokeWidth="1" />
          <circle cx="108" cy="82" r="4" fill="#ef4444" />
          <line x1="105" y1="105" x2="111" y2="105" stroke="#ef4444" strokeWidth="1" />
        </g>

        {/* Legs */}
        <line x1="60" y1="115" x2="55" y2="145" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />
        <line x1="80" y1="115" x2="85" y2="145" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />

        {/* Shoes */}
        <ellipse cx="55" cy="148" rx="6" ry="4" fill="#1e293b" />
        <ellipse cx="85" cy="148" rx="6" ry="4" fill="#1e293b" />

        {/* Glow animation on hover */}
        {isHovered && (
          <>
            <circle cx="70" cy="40" r="22" fill="none" stroke="#00f0ff" strokeWidth="1" opacity="0.5">
              <animate attributeName="r" from="22" to="28" dur="1s" repeatCount="indefinite" />
              <animate attributeName="opacity" from="0.8" to="0" dur="1s" repeatCount="indefinite" />
            </circle>
          </>
        )}
      </svg>

      {/* Tooltip on hover */}
      {isHovered && (
        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gradient-to-r from-slate-900/95 to-slate-800/95 border border-cyan-500/50 rounded-lg px-3 py-2 text-xs text-cyan-300 whitespace-nowrap backdrop-blur-sm shadow-lg">
          Click for tech updates!
          <div className="absolute left-full top-1/2 -translate-y-1/2 w-2 h-2 bg-cyan-500/50 transform rotate-45" />
        </div>
      )}
    </div>
  );
}
