import { motion, AnimatePresence } from 'motion/react';
import { Coffee } from 'lucide-react';

interface OfflineModalProps {
  earnings: number;
  onDismiss: () => void;
}

export function OfflineModal({ earnings, onDismiss }: OfflineModalProps) {
  if (earnings <= 0) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full flex flex-col items-center text-center gap-6"
        >
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
            <Coffee className="w-8 h-8 text-orange-500" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800">Welcome Back!</h2>
          
          <p className="text-gray-600">
            While you were away, your auto-generation earned you:
          </p>
          
          <div className="text-4xl font-mono font-bold text-pink-500">
            +{Math.floor(earnings).toLocaleString()}
          </div>
          
          <button
            onClick={onDismiss}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-400 to-pink-500 text-white font-bold shadow-md hover:scale-105 transition-transform"
          >
            Awesome!
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
