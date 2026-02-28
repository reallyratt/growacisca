import { motion, AnimatePresence } from 'motion/react';
import { Heart, Star } from 'lucide-react';

interface LevelUpModalProps {
  level: number | null;
  onDismiss: () => void;
}

const LEVEL_MESSAGES: Record<number, string> = {
  1: "Why'd u do this?",
  2: "You're still clicking?",
  3: "I guess this is kinda nice...",
  4: "You're pretty persistent, huh?",
  5: "Okay, maybe I like the attention a little.",
  6: "Don't think this means we're besties yet.",
  7: "Wow, you're really dedicated.",
  8: "I'm starting to get used to you being around.",
  9: "You always know how to make me smile.",
  10: "Form 1 complete! I feel a bit different...",
  11: "New form, new me! Thanks for sticking around.",
  12: "You're actually pretty sweet.",
  13: "I look forward to this every day.",
  14: "You're my favorite distraction.",
  15: "I think I'm really starting to trust you.",
  16: "You make everything feel a little brighter.",
  17: "I'm glad you're here.",
  18: "You're really special to me, you know?",
  19: "I don't say it enough, but thank you.",
  20: "Form 2 complete! My heart feels so full!",
  21: "Whoa, this new form is amazing! Let's keep going!",
  22: "I feel like we can take on anything together.",
  23: "You're the best thing that's happened to me lately.",
  24: "I'm so lucky to have you.",
  25: "My trust in you is absolute.",
  26: "We've come so far together.",
  27: "I'll always be here for you, too.",
  28: "You mean the world to me.",
  29: "Just one more level... I'm so excited!",
  30: "Max Bond Reached! You're my everything! ❤️",
};

export function LevelUpModal({ level, onDismiss }: LevelUpModalProps) {
  if (level === null) return null;

  const message = LEVEL_MESSAGES[level] || "Our bond grows stronger!";

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full flex flex-col items-center text-center gap-6 border-4 border-pink-200 relative overflow-hidden"
        >
          {/* Decorative background elements */}
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-pink-100 rounded-full blur-2xl opacity-50" />
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-purple-100 rounded-full blur-2xl opacity-50" />

          <div className="relative z-10 w-20 h-20 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
            <Star className="w-10 h-10 text-white fill-white animate-pulse" />
          </div>
          
          <div className="relative z-10 flex flex-col gap-2">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
              Level Up!
            </h2>
            <p className="text-lg font-bold text-gray-700">
              Bond Level {level}
            </p>
          </div>
          
          <div className="relative z-10 bg-pink-50 border border-pink-100 p-4 rounded-2xl w-full">
            <p className="text-gray-800 font-medium italic">
              "{message}"
            </p>
          </div>
          
          <button
            onClick={onDismiss}
            className="relative z-10 w-full py-3 rounded-xl bg-gradient-to-r from-pink-400 to-purple-500 text-white font-bold shadow-md hover:scale-105 transition-transform flex items-center justify-center gap-2"
          >
            <Heart className="w-5 h-5 fill-white" />
            Continue
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
