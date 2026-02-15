import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, Download } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  onGenerateReport?: () => void;
}

type AnimationType = 'zoom' | 'slide-left' | 'slide-right' | 'slide-top' | 'bounce' | 'flip' | 'fade-scale';

const animationVariants: Record<AnimationType, any> = {
  zoom: {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0, opacity: 0 },
    transition: { type: 'spring', stiffness: 300, damping: 30 }
  },
  'slide-left': {
    initial: { x: -500, opacity: 0, rotate: -10 },
    animate: { x: 0, opacity: 1, rotate: 0 },
    exit: { x: -500, opacity: 0, rotate: -10 },
    transition: { type: 'spring', stiffness: 200, damping: 25 }
  },
  'slide-right': {
    initial: { x: 500, opacity: 0, rotate: 10 },
    animate: { x: 0, opacity: 1, rotate: 0 },
    exit: { x: 500, opacity: 0, rotate: 10 },
    transition: { type: 'spring', stiffness: 200, damping: 25 }
  },
  'slide-top': {
    initial: { y: -500, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -500, opacity: 0 },
    transition: { type: 'spring', stiffness: 250, damping: 28 }
  },
  bounce: {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0, opacity: 0 },
    transition: { type: 'bounce', stiffness: 500, damping: 40 }
  },
  flip: {
    initial: { rotateY: -90, opacity: 0 },
    animate: { rotateY: 0, opacity: 1 },
    exit: { rotateY: -90, opacity: 0 },
    transition: { type: 'spring', stiffness: 300, damping: 30 }
  },
  'fade-scale': {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 },
    transition: { duration: 0.4, ease: 'easeOut' }
  }
};

const backdropVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3 }
};

export function CalculatorModal({
  isOpen,
  onClose,
  title,
  children,
  onGenerateReport
}: CalculatorModalProps) {
  const [animationType, setAnimationType] = useState<AnimationType>('zoom');

  useEffect(() => {
    if (isOpen) {
      const animations: AnimationType[] = ['zoom', 'slide-left', 'slide-right', 'slide-top', 'bounce', 'flip', 'fade-scale'];
      const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
      setAnimationType(randomAnimation);
    }
  }, [isOpen]);

  const currentAnimation = animationVariants[animationType];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            variants={backdropVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-cyan-500/30 rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
            variants={currentAnimation}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{ perspective: 1000 }}
          >
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-slate-900 to-slate-800 border-b border-cyan-500/30 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-cyan-400">{title}</h2>
              <div className="flex gap-2">
                {onGenerateReport && (
                  <Button
                    onClick={onGenerateReport}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Generate Report
                  </Button>
                )}
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-slate-700 rounded-lg transition"
                >
                  <X className="w-5 h-5 text-slate-400 hover:text-white" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {children}
            </div>

            {/* Footer with gradient line */}
            <div className="border-t border-cyan-500/20 bg-gradient-to-r from-cyan-600/10 to-purple-600/10 p-4">
              <p className="text-xs text-slate-400 text-center">
                💡 Tip: Use the calculator above to solve real-world electronics problems
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
