import React, { useState, useEffect } from 'react';

interface RoboticHeadProps {
  onHeadClick: () => void;
  isVisible: boolean;
}

export const RoboticHead: React.FC<RoboticHeadProps> = ({ onHeadClick, isVisible }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
    }
  }, [isVisible]);

  return (
    <>
      <style>{`
        @keyframes slideInFromRight {
          from {
            transform: translateX(120px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideOutToRight {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(120px);
            opacity: 0;
          }
        }

        @keyframes bobbing {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        .robotic-head-container {
          position: fixed;
          bottom: 30px;
          right: -60px;
          z-index: 40;
          animation: ${isAnimating && isVisible ? 'slideInFromRight' : 'slideOutToRight'} 0.6s ease-out forwards;
        }

        .robotic-head-button {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%);
          border: 3px solid #ff4500;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 24px rgba(255, 107, 53, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
          animation: bobbing 2.5s ease-in-out infinite;
          position: relative;
          overflow: hidden;
        }

        .robotic-head-button:hover {
          transform: scale(1.08);
          box-shadow: 0 12px 32px rgba(255, 107, 53, 0.6), inset 0 2px 4px rgba(255, 255, 255, 0.3);
        }

        .robotic-head-button:active {
          transform: scale(0.95);
        }

        .robotic-head-svg {
          width: 70px;
          height: 70px;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
        }

        .robotic-head-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 110%;
          height: 110%;
          background: radial-gradient(circle, rgba(255, 107, 53, 0.2) 0%, transparent 70%);
          border-radius: 50%;
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.5;
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            opacity: 0.8;
            transform: translate(-50%, -50%) scale(1.1);
          }
        }
      `}</style>

      <div className="robotic-head-container">
        <button
          onClick={onHeadClick}
          className="robotic-head-button"
          aria-label="Open tech updates and news"
          title="Click to see latest tech updates"
        >
          <div className="robotic-head-glow"></div>
          <svg
            className="robotic-head-svg"
            viewBox="0 0 100 120"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Head */}
            <rect x="15" y="20" width="70" height="65" rx="8" fill="#1a1a2e" stroke="#ff6b35" strokeWidth="2" />

            {/* Left Eye */}
            <circle cx="35" cy="40" r="8" fill="#00f0ff" opacity="0.9" />
            <circle cx="35" cy="40" r="5" fill="#ffffff" opacity="0.6" />
            <circle cx="36" cy="39" r="2" fill="#000000" />

            {/* Right Eye */}
            <circle cx="65" cy="40" r="8" fill="#00f0ff" opacity="0.9" />
            <circle cx="65" cy="40" r="5" fill="#ffffff" opacity="0.6" />
            <circle cx="66" cy="39" r="2" fill="#000000" />

            {/* Eye Glow */}
            <circle cx="35" cy="40" r="10" fill="none" stroke="#00f0ff" strokeWidth="1" opacity="0.5" />
            <circle cx="65" cy="40" r="10" fill="none" stroke="#00f0ff" strokeWidth="1" opacity="0.5" />

            {/* Mouth/Speaker */}
            <rect x="30" y="60" width="40" height="8" rx="4" fill="#b537f2" opacity="0.8" />
            <line x1="35" y1="60" x2="35" y2="68" stroke="#b537f2" strokeWidth="1" opacity="0.6" />
            <line x1="45" y1="60" x2="45" y2="68" stroke="#b537f2" strokeWidth="1" opacity="0.6" />
            <line x1="55" y1="60" x2="55" y2="68" stroke="#b537f2" strokeWidth="1" opacity="0.6" />
            <line x1="65" y1="60" x2="65" y2="68" stroke="#b537f2" strokeWidth="1" opacity="0.6" />

            {/* Antenna Left */}
            <line x1="30" y1="20" x2="25" y2="5" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round" />
            <circle cx="25" cy="5" r="3" fill="#39ff14" />

            {/* Antenna Right */}
            <line x1="70" y1="20" x2="75" y2="5" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round" />
            <circle cx="75" cy="5" r="3" fill="#39ff14" />

            {/* Neck */}
            <rect x="35" y="85" width="30" height="20" fill="#1a1a2e" stroke="#ff6b35" strokeWidth="1.5" />
            <line x1="40" y1="85" x2="40" y2="105" stroke="#ff6b35" strokeWidth="1" opacity="0.5" />
            <line x1="50" y1="85" x2="50" y2="105" stroke="#ff6b35" strokeWidth="1" opacity="0.5" />
            <line x1="60" y1="85" x2="60" y2="105" stroke="#ff6b35" strokeWidth="1" opacity="0.5" />
          </svg>
        </button>
      </div>
    </>
  );
};
