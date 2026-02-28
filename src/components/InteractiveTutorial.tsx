import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TabType } from './BottomNav';

interface InteractiveTutorialProps {
  step: number;
  activeTab: TabType;
  onAdvance: (step: number) => void;
}

export function InteractiveTutorial({ step, activeTab, onAdvance }: InteractiveTutorialProps) {
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    const updateRect = () => {
      let el: HTMLElement | null = null;
      if (step === 0) el = document.getElementById('center-stage');
      if (step === 1) el = document.getElementById('nav-confess');
      if (step === 2) el = document.getElementById('btn-confess');
      if (step === 3) el = document.getElementById('nav-bond');
      if (step === 4) el = document.getElementById('nav-upgrades');

      if (el) {
        setTargetRect(el.getBoundingClientRect());
      } else {
        setTargetRect(null);
      }
    };

    updateRect();
    window.addEventListener('resize', updateRect);
    // Poll for changes in case elements animate in
    const interval = setInterval(updateRect, 500);
    
    return () => {
      window.removeEventListener('resize', updateRect);
      clearInterval(interval);
    };
  }, [step, activeTab]);

  // Auto-advance logic based on user actions
  useEffect(() => {
    if (step === 1 && activeTab === 'confess') {
      onAdvance(2);
    }
    if (step === 3 && activeTab === 'bond') {
      onAdvance(4);
    }
  }, [step, activeTab, onAdvance]);

  if (step >= 5) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] pointer-events-none overflow-hidden">
        {/* Dark overlay with cutout */}
        {targetRect && (
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            <defs>
              <mask id="cutout-mask">
                <rect width="100%" height="100%" fill="white" />
                <motion.rect
                  initial={false}
                  animate={{
                    x: targetRect.x - 8,
                    y: targetRect.y - 8,
                    width: targetRect.width + 16,
                    height: targetRect.height + 16,
                  }}
                  transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                  rx="16"
                  fill="black"
                />
              </mask>
            </defs>
            <rect width="100%" height="100%" fill="rgba(0,0,0,0.6)" mask="url(#cutout-mask)" />
          </svg>
        )}

        {/* Tooltip */}
        {targetRect && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="absolute top-12 left-4 right-4 bg-white rounded-2xl p-6 shadow-2xl pointer-events-auto border-2 border-pink-400 z-50"
          >
            <div className="flex flex-col gap-3">
              <p className="text-gray-800 font-bold text-center text-lg">
                {step === 0 && "Tap Cisca to earn Affection! (Get 5 to continue)"}
                {step === 1 && "Great! Now open the Confess menu below."}
                {step === 2 && "Here you convert Affection to Trust. Try it when you have enough!"}
                {step === 3 && "Now open the Bond menu to see how to level up."}
                {step === 4 && "Finally, check out Upgrades to earn Affection automatically!"}
              </p>
              
              {(step === 2 || step === 4) && (
                <button
                  onClick={() => onAdvance(step + 1)}
                  className="w-full py-3 mt-2 bg-pink-500 text-white rounded-xl font-bold hover:bg-pink-600"
                >
                  {step === 4 ? "Finish Tutorial" : "Next"}
                </button>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </AnimatePresence>
  );
}
