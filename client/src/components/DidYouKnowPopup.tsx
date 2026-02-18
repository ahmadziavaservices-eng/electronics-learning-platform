import { useEffect, useState } from 'react';
import { X, Lightbulb } from 'lucide-react';
import { getRandomUpdate } from '@/lib/githubTrending';
import type { TechUpdate } from '@/lib/githubTrending';

interface DidYouKnowPopupProps {
  section: string;
  onClose?: () => void;
}

export default function DidYouKnowPopup({ section, onClose }: DidYouKnowPopupProps) {
  const [update, setUpdate] = useState<TechUpdate | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Get random update for this section
    const newUpdate = getRandomUpdate(section);
    setUpdate(newUpdate);

    // Show popup after 3-5 seconds
    const delay = Math.random() * 2000 + 3000;
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    // Auto-hide after 8 seconds
    const hideTimer = setTimeout(() => {
      handleClose();
    }, delay + 8000);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, [section]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false);
      onClose?.();
    }, 300);
  };

  if (!isVisible || !update) return null;

  return (
    <div
      className={`fixed bottom-24 right-8 max-w-xs transition-all duration-300 z-40 ${
        isClosing ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'
      }`}
    >
      {/* Glass morphism background */}
      <div className="relative bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-md border border-cyan-500/30 rounded-lg p-3 shadow-2xl hover:border-cyan-500/50 transition-all">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-lime-500/10 rounded-lg opacity-0 hover:opacity-100 transition-opacity" />

        {/* Content */}
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
              <span className="text-xs font-bold text-cyan-300">Did You Know?</span>
            </div>
            <button
              onClick={handleClose}
              className="text-slate-400 hover:text-cyan-400 transition-colors flex-shrink-0"
            >
              <X className="w-3 h-3" />
            </button>
          </div>

          {/* Update Title */}
          <h4 className="text-xs font-semibold text-slate-100 mb-1 leading-tight">
            {update.title}
          </h4>

          {/* Update Description */}
          <p className="text-xs text-slate-300 leading-relaxed mb-2">
            {update.description}
          </p>

          {/* Category Badge */}
          <div className="flex items-center justify-between">
            <span className="text-xs px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded border border-cyan-500/30">
              {update.category}
            </span>
            <span className="text-xs text-slate-500">Just now</span>
          </div>
        </div>

        {/* Animated border */}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/0 via-cyan-500/20 to-lime-500/0 opacity-0 hover:opacity-100 transition-opacity pointer-events-none" />
      </div>

      {/* Pointer */}
      <div className="absolute right-4 -bottom-1 w-2 h-2 bg-cyan-500/30 transform rotate-45" />
    </div>
  );
}
