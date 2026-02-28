import { motion } from 'motion/react';
import { Shield, ArrowRight } from 'lucide-react';

interface BondPanelProps {
  trust: number;
  bondLevel: number;
  bondLevelCost: number;
  onLevelUpBond: () => void;
}

export function BondPanel({ trust, bondLevel, bondLevelCost, onLevelUpBond }: BondPanelProps) {
  const canLevelUp = trust >= bondLevelCost && bondLevel < 30;

  return (
    <div className="flex flex-col gap-6">
      <p className="text-gray-600">
        Increase Bond Level to unlock new forms and global multipliers.
      </p>

      <div className="bg-purple-50 rounded-2xl p-5 flex flex-col gap-4 border border-purple-100">
        <div className="flex justify-between items-center">
          <span className="text-gray-700 font-bold">Current Level:</span>
          <span className="font-mono font-bold text-purple-600 text-xl">{bondLevel}</span>
        </div>
        <div className="h-px bg-purple-200" />
        <div className="flex justify-between items-center">
          <span className="text-gray-700 font-bold">Cost to Level Up:</span>
          <span className="font-mono font-bold text-blue-600 text-xl">
            {bondLevel >= 30 ? 'MAX' : `${Math.floor(bondLevelCost).toLocaleString()} Trust`}
          </span>
        </div>
      </div>

      <motion.button
        id="btn-bond"
        whileHover={canLevelUp ? { scale: 1.02 } : {}}
        whileTap={canLevelUp ? { scale: 0.98 } : {}}
        onClick={onLevelUpBond}
        disabled={!canLevelUp}
        className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-400 to-indigo-500 text-white font-bold text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        Level Up Bond
        <ArrowRight className="w-6 h-6" />
      </motion.button>
    </div>
  );
}
