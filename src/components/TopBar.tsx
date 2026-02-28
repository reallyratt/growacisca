import { Heart, Shield } from 'lucide-react';
import { motion } from 'motion/react';

interface TopBarProps {
  affection: number;
  trust: number;
  bondLevel: number;
  bondLevelCost: number;
}

export function TopBar({ affection, trust, bondLevel, bondLevelCost }: TopBarProps) {
  const progress = bondLevel >= 30 ? 100 : Math.min(100, (trust / bondLevelCost) * 100);

  return (
    <div className="w-full bg-white/80 backdrop-blur-md rounded-2xl shadow-sm border border-pink-100 p-3 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <Heart className="w-6 h-6 text-pink-500 fill-pink-500" />
          </motion.div>
          <div className="flex flex-col">
            <span className="text-[10px] text-pink-400 font-bold uppercase tracking-wider leading-none">Affection</span>
            <span className="text-lg font-bold text-pink-600 font-mono leading-none mt-1">
              {Math.floor(affection).toLocaleString()}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-blue-400 fill-blue-400" />
          <div className="flex flex-col text-right">
            <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider leading-none">Trust</span>
            <span className="text-lg font-bold text-blue-600 font-mono leading-none mt-1">
              {Math.floor(trust).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full">
        <div className="flex justify-between w-full mb-1">
          <span className="text-xs font-bold text-purple-600">Bond Level {bondLevel}</span>
          <span className="text-[10px] text-purple-400 font-mono">
            {bondLevel >= 30 ? 'MAX' : `${Math.floor(trust)} / ${bondLevelCost}`}
          </span>
        </div>
        <div className="w-full h-2 bg-purple-100 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-purple-400 to-pink-400"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
    </div>
  );
}
