import { Heart, Shield, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export type TabType = 'none' | 'confess' | 'bond' | 'upgrades';

interface BottomNavProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export function BottomNav({ activeTab, setActiveTab }: BottomNavProps) {
  const tabs = [
    { id: 'confess', icon: Heart, label: 'Confess', color: 'text-pink-500', bg: 'bg-pink-100' },
    { id: 'bond', icon: Shield, label: 'Bond', color: 'text-purple-500', bg: 'bg-purple-100' },
    { id: 'upgrades', icon: Sparkles, label: 'Upgrades', color: 'text-yellow-500', bg: 'bg-yellow-100' },
  ] as const;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-pink-100 pb-safe z-40 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
      <div className="max-w-md mx-auto flex justify-around items-center p-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(isActive ? 'none' : tab.id)}
              className="relative flex flex-col items-center justify-center w-20 h-16 rounded-2xl transition-all duration-200"
              id={`nav-${tab.id}`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className={`absolute inset-0 ${tab.bg} rounded-2xl -z-10`}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <Icon className={`w-6 h-6 ${isActive ? tab.color : 'text-gray-400'}`} />
              <span className={`text-xs mt-1 font-bold ${isActive ? tab.color : 'text-gray-400'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
