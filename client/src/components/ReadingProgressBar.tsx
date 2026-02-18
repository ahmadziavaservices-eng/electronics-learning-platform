import { useEffect, useState } from 'react';

export default function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const scrollPercent = documentHeight > 0 ? (scrolled / documentHeight) * 100 : 0;
      setProgress(Math.min(scrollPercent, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-slate-900 to-slate-800 z-50">
      {/* Progress bar */}
      <div
        className="h-full bg-gradient-to-r from-cyan-500 via-lime-500 to-cyan-500 transition-all duration-300 ease-out shadow-lg shadow-cyan-500/50"
        style={{ width: `${progress}%` }}
      />

      {/* Glow effect */}
      <div
        className="absolute top-0 h-full w-8 bg-gradient-to-r from-transparent via-cyan-400 to-transparent blur-lg opacity-50 transition-all duration-300"
        style={{ left: `calc(${progress}% - 16px)` }}
      />
    </div>
  );
}
