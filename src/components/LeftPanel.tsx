import { motion } from 'motion/react';
import { Heart, Shield, ArrowRight } from 'lucide-react';

interface LeftPanelProps {
  affection: number;
  trust: number;
  bondLevel: number;
  bondLevelCost: number;
  currentTaxRate: number;
  onConfess: () => void;
  onLevelUpBond: () => void;
}

export function LeftPanel({
  affection,
  trust,
  bondLevel,
  bondLevelCost,
  currentTaxRate,
  onConfess,
  onLevelUpBond,
}: LeftPanelProps) {
  const taxPercent = Math.round(currentTaxRate * 100);
  let expectedTrust = affection * (1 - currentTaxRate);
  if (affection > 1000) expectedTrust *= 1.10;
  if (bondLevel >= 21) expectedTrust *= 1.10;

  const canLevelUp = trust >= bondLevelCost && bondLevel < 30;

  return (
    <div className="w-full lg:w-80 flex flex-col gap-4">
      {/* Conversion Panel */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-sm border border-pink-100 p-6 flex flex-col gap-4">
        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <Heart className="w-5 h-5 text-pink-500" />
          Confess Feelings
        </h2>
        <p className="text-sm text-gray-600">
          Convert all your Affection into Trust.
        </p>
        
        <div className="bg-pink-50 rounded-xl p-4 flex flex-col gap-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Current Tax:</span>
            <span className="font-mono font-bold text-red-500">{taxPercent}%</span>
          </div>
          {affection > 1000 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Big Confession Bonus:</span>
              <span className="font-mono font-bold text-green-500">+10%</span>
            </div>
          )}
          {bondLevel >= 21 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Form 3 Bonus:</span>
              <span className="font-mono font-bold text-green-500">+10%</span>
            </div>
          )}
          <div className="h-px bg-pink-200 my-1" />
          <div className="flex justify-between items-center">
            <span className="text-sm font-bold text-gray-700">Expected Trust:</span>
            <span className="font-mono font-bold text-blue-600 text-lg">
              +{Math.floor(expectedTrust).toLocaleString()}
            </span>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onConfess}
          disabled={affection <= 0}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-400 to-rose-400 text-white font-bold shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <Heart className="w-5 h-5 fill-white" />
          Confess
        </motion.button>
      </div>

      {/* Bond Level Panel */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-sm border border-purple-100 p-6 flex flex-col gap-4">
        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <Shield className="w-5 h-5 text-purple-500" />
          Deepen Bond
        </h2>
        <p className="text-sm text-gray-600">
          Increase Bond Level to unlock new forms and global multipliers.
        </p>

        <div className="bg-purple-50 rounded-xl p-4 flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-bold text-gray-700">Cost:</span>
            <span className="font-mono font-bold text-blue-600">
              {bondLevel >= 30 ? 'MAX' : `${Math.floor(bondLevelCost).toLocaleString()} Trust`}
            </span>
          </div>
        </div>

        <motion.button
          whileHover={canLevelUp ? { scale: 1.02 } : {}}
          whileTap={canLevelUp ? { scale: 0.98 } : {}}
          onClick={onLevelUpBond}
          disabled={!canLevelUp}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-400 to-indigo-400 text-white font-bold shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          Level Up Bond
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
}
