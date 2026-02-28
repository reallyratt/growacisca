import { motion } from 'motion/react';
import { Heart, Disc, Flower, Lock } from 'lucide-react';

interface UpgradesPanelProps {
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

export function UpgradesPanel({ affection, upgrades, costs, onBuyUpgrade }: UpgradesPanelProps) {
  const canBuyDateNight = upgrades.kinderJoy >= 5 && upgrades.brunoMarsCd >= 3;

  return (
    <div className="flex flex-col gap-4 pb-10">
      <p className="text-gray-600 mb-2">
        Buy upgrades to increase your Affection generation.
      </p>

      {/* Kinder Joy */}
      <motion.button
        id="btn-upgrade-kinderJoy"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onBuyUpgrade('kinderJoy')}
        disabled={affection < costs.kinderJoy}
        className="w-full p-5 rounded-2xl bg-pink-50 border border-pink-200 flex items-center justify-between disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
      >
        <div className="flex flex-col items-start gap-1">
          <span className="font-bold text-gray-800 text-lg flex items-center gap-2">
            <span className="text-2xl">🍫</span> Kinder Joy
          </span>
          <span className="text-sm text-gray-500 font-medium">+1 Affection/click</span>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="font-mono font-bold text-pink-600 text-xl">{costs.kinderJoy}</span>
          <span className="text-xs text-gray-400 font-medium bg-white px-2 py-1 rounded-full border border-pink-100">Owned: {upgrades.kinderJoy}</span>
        </div>
      </motion.button>

      {/* Bruno Mars CD */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onBuyUpgrade('brunoMarsCd')}
        disabled={affection < costs.brunoMarsCd}
        className="w-full p-5 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-between disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
      >
        <div className="flex flex-col items-start gap-1">
          <span className="font-bold text-gray-800 text-lg flex items-center gap-2">
            <Disc className="w-6 h-6 text-blue-500" /> Bruno Mars CD
          </span>
          <span className="text-sm text-gray-500 font-medium">+1 Affection/sec</span>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="font-mono font-bold text-blue-600 text-xl">{costs.brunoMarsCd}</span>
          <span className="text-xs text-gray-400 font-medium bg-white px-2 py-1 rounded-full border border-blue-100">Owned: {upgrades.brunoMarsCd}</span>
        </div>
      </motion.button>

      {/* Lily */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onBuyUpgrade('lily')}
        disabled={affection < costs.lily}
        className="w-full p-5 rounded-2xl bg-green-50 border border-green-200 flex items-center justify-between disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
      >
        <div className="flex flex-col items-start gap-1">
          <span className="font-bold text-gray-800 text-lg flex items-center gap-2">
            <Flower className="w-6 h-6 text-green-500" /> Lily
          </span>
          <span className="text-sm text-gray-500 font-medium">-2% Trust Tax</span>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="font-mono font-bold text-green-600 text-xl">{costs.lily}</span>
          <span className="text-xs text-gray-400 font-medium bg-white px-2 py-1 rounded-full border border-green-100">Owned: {upgrades.lily}</span>
        </div>
      </motion.button>

      {/* Date Night */}
      <div className="relative mt-2">
        {!canBuyDateNight && (
          <div className="absolute inset-0 bg-white/70 backdrop-blur-sm z-10 rounded-2xl flex items-center justify-center border border-gray-200">
            <div className="bg-gray-800 text-white text-sm px-4 py-2 rounded-full flex items-center gap-2 font-medium shadow-lg">
              <Lock className="w-4 h-4" /> Requires 5 Chocolates & 3 CDs
            </div>
          </div>
        )}
        <motion.button
          whileHover={canBuyDateNight && !upgrades.dateNight ? { scale: 1.02 } : {}}
          whileTap={canBuyDateNight && !upgrades.dateNight ? { scale: 0.98 } : {}}
          onClick={() => onBuyUpgrade('dateNight')}
          disabled={affection < costs.dateNight || upgrades.dateNight || !canBuyDateNight}
          className="w-full p-5 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-between disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
        >
          <div className="flex flex-col items-start gap-1">
            <span className="font-bold text-gray-800 text-lg flex items-center gap-2">
              <Heart className="w-6 h-6 text-purple-500 fill-purple-500" /> Date Night
            </span>
            <span className="text-sm text-gray-500 font-medium">+25% Global Multiplier</span>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="font-mono font-bold text-purple-600 text-xl">
              {upgrades.dateNight ? 'BOUGHT' : costs.dateNight}
            </span>
          </div>
        </motion.button>
      </div>
    </div>
  );
}
