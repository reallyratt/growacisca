import { motion, AnimatePresence } from 'motion/react';
import { AlertCircle } from 'lucide-react';

interface EventModalProps {
  isOpen: boolean;
  onResolve: (correct: boolean) => void;
}

export function EventModal({ isOpen, onResolve }: EventModalProps) {
  if (!isOpen) return null;

  const options = [
    { text: "You're doing great, take a deep breath.", correct: true },
    { text: "Just stop thinking about it.", correct: false },
    { text: "It's not a big deal.", correct: false },
  ];

  // Shuffle options
  const shuffledOptions = [...options].sort(() => Math.random() - 0.5);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full flex flex-col gap-6"
        >
          <div className="flex items-center gap-4 text-purple-600">
            <AlertCircle className="w-8 h-8" />
            <h2 className="text-2xl font-bold">Overthinking Moment</h2>
          </div>
          
          <p className="text-gray-600">
            Cisca is overthinking right now. What should you say?
          </p>

          <div className="flex flex-col gap-3">
            {shuffledOptions.map((opt, i) => (
              <button
                key={i}
                onClick={() => onResolve(opt.correct)}
                className="w-full p-4 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-200 text-left text-gray-800 font-medium transition-colors"
              >
                "{opt.text}"
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
