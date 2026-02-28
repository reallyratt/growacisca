import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, Shield, ArrowRight } from 'lucide-react';

interface TutorialModalProps {
  isOpen: boolean;
  onComplete: () => void;
}

export function TutorialModal({ isOpen, onComplete }: TutorialModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full flex flex-col gap-6"
        >
          <div className="flex items-center gap-4 text-pink-500 justify-center">
            <Sparkles className="w-8 h-8" />
            <h2 className="text-2xl font-bold text-center">Welcome!</h2>
            <Sparkles className="w-8 h-8" />
          </div>
          
          <p className="text-gray-600 text-center">
            Here's how to play and grow your connection:
          </p>

          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <div className="bg-pink-100 p-2 rounded-full mt-1">
                <Heart className="w-5 h-5 text-pink-500 fill-pink-500" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">1. Earn Affection</h3>
                <p className="text-sm text-gray-600">Tap the character to earn Affection. Buy Upgrades to earn even more automatically!</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-blue-100 p-2 rounded-full mt-1">
                <ArrowRight className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">2. Confess</h3>
                <p className="text-sm text-gray-600">Convert your Affection into Trust. But watch out for the tax! (Hint: Save up for bonuses!)</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-purple-100 p-2 rounded-full mt-1">
                <Shield className="w-5 h-5 text-purple-500 fill-purple-500" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">3. Level Up Bond</h3>
                <p className="text-sm text-gray-600">Use Trust to increase your Bond Level. This unlocks new forms and global multipliers!</p>
              </div>
            </div>
          </div>

          <button
            onClick={onComplete}
            className="w-full py-3 mt-2 rounded-xl bg-gradient-to-r from-pink-400 to-purple-500 text-white font-bold shadow-md hover:scale-105 transition-transform"
          >
            Got it! Let's play
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
