import { motion } from 'motion/react';
import { Heart, Disc, Flower, Sparkles, Lock } from 'lucide-react';

interface RightPanelProps {
  affection: number;
  upgrades: {
    kinderJoy: number;
    brunoMarsCd: number;
    lily: number;
    dateNight: boolean;
  };
  costs: {
    kinderJoy: number;
    brunoMarsCd: number;
    lily: number;
    dateNight: number;
  };
  onBuyUpgrade: (type: 'kinderJoy' | 'brunoMarsCd' | 'lily' | 'dateNight') => void;
}

export function RightPanel({ affection, upgrades, costs, onBuyUpgrade }: RightPanelProps) {
  const canBuyDateNight = upgrades.kinderJoy >= 5 && upgrades.brunoMarsCd >= 3;

  return (
    <div className="w-full lg:w-80 flex flex-col gap-4">
      <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-sm border border-pink-100 p-6 flex flex-col gap-4">
        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-yellow-500" />
          Upgrades
        </h2>

        {/* Kinder Joy */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onBuyUpgrade('kinderJoy')}
          disabled={affection < costs.kinderJoy}
          className="w-full p-4 rounded-xl bg-pink-50 border border-pink-200 flex items-center justify-between disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className="flex flex-col items-start">
            <span className="font-bold text-gray-800 flex items-center gap-2">
              <span className="text-xl">🍫</span> Kinder Joy
            </span>
            <span className="text-xs text-gray-500">+1 Affection/click</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="font-mono font-bold text-pink-600">{costs.kinderJoy}</span>
            <span className="text-xs text-gray-400">Owned: {upgrades.kinderJoy}</span>
          </div>
        </motion.button>

        {/* Bruno Mars CD */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onBuyUpgrade('brunoMarsCd')}
          disabled={affection < costs.brunoMarsCd}
          className="w-full p-4 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-between disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className="flex flex-col items-start">
            <span className="font-bold text-gray-800 flex items-center gap-2">
              <Disc className="w-5 h-5 text-blue-500" /> Bruno Mars CD
            </span>
            <span className="text-xs text-gray-500">+1 Affection/sec</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="font-mono font-bold text-blue-600">{costs.brunoMarsCd}</span>
            <span className="text-xs text-gray-400">Owned: {upgrades.brunoMarsCd}</span>
          </div>
        </motion.button>

        {/* Lily */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onBuyUpgrade('lily')}
          disabled={affection < costs.lily}
          className="w-full p-4 rounded-xl bg-green-50 border border-green-200 flex items-center justify-between disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className="flex flex-col items-start">
            <span className="font-bold text-gray-800 flex items-center gap-2">
              <Flower className="w-5 h-5 text-green-500" /> Lily
            </span>
            <span className="text-xs text-gray-500">-2% Trust Tax</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="font-mono font-bold text-green-600">{costs.lily}</span>
            <span className="text-xs text-gray-400">Owned: {upgrades.lily}</span>
          </div>
        </motion.button>

        {/* Date Night */}
        <div className="relative">
          {!canBuyDateNight && (
            <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-10 rounded-xl flex items-center justify-center">
              <div className="bg-gray-800 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">
                <Lock className="w-3 h-3" /> Requires 5 Eggs & 3 CDs
              </div>
            </div>
          )}
          <motion.button
            whileHover={canBuyDateNight && !upgrades.dateNight ? { scale: 1.02 } : {}}
            whileTap={canBuyDateNight && !upgrades.dateNight ? { scale: 0.98 } : {}}
            onClick={() => onBuyUpgrade('dateNight')}
            disabled={affection < costs.dateNight || upgrades.dateNight || !canBuyDateNight}
            className="w-full p-4 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-between disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="flex flex-col items-start">
              <span className="font-bold text-gray-800 flex items-center gap-2">
                <Heart className="w-5 h-5 text-purple-500 fill-purple-500" /> Date Night
              </span>
              <span className="text-xs text-gray-500">+25% Global Multiplier</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="font-mono font-bold text-purple-600">
                {upgrades.dateNight ? 'BOUGHT' : costs.dateNight}
              </span>
            </div>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
