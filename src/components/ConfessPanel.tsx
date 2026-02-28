import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

interface ConfessPanelProps {
  affection: number;
  currentTaxRate: number;
  bondLevel: number;
  onConfess: () => void;
}

export function ConfessPanel({ affection, currentTaxRate, bondLevel, onConfess }: ConfessPanelProps) {
  const taxPercent = Math.round(currentTaxRate * 100);
  let expectedTrust = affection * (1 - currentTaxRate);
  if (affection > 1000) expectedTrust *= 1.10;
  if (bondLevel >= 21) expectedTrust *= 1.10;

  return (
    <div className="flex flex-col gap-6">
      <p className="text-gray-600">
        Convert all your Affection into Trust. Trust is used to deepen your bond.
      </p>
      
      <div className="bg-pink-50 rounded-2xl p-5 flex flex-col gap-3 border border-pink-100">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500 font-medium">Current Tax:</span>
          <span className="font-mono font-bold text-red-500">{taxPercent}%</span>
        </div>
        {affection > 1000 && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-500 font-medium">Big Confession Bonus:</span>
            <span className="font-mono font-bold text-green-500">+10%</span>
          </div>
        )}
        {bondLevel >= 21 && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-500 font-medium">Form 3 Bonus:</span>
            <span className="font-mono font-bold text-green-500">+10%</span>
          </div>
        )}
        <div className="h-px bg-pink-200 my-2" />
        <div className="flex justify-between items-center">
          <span className="text-gray-700 font-bold">Expected Trust:</span>
          <span className="font-mono font-bold text-blue-600 text-2xl">
            +{Math.floor(expectedTrust).toLocaleString()}
          </span>
        </div>
      </div>

      <motion.button
        id="btn-confess"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onConfess}
        disabled={affection <= 0}
        className="w-full py-4 rounded-2xl bg-gradient-to-r from-pink-400 to-rose-500 text-white font-bold text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        <Heart className="w-6 h-6 fill-white" />
        Confess Feelings
      </motion.button>
    </div>
  );
}
