import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart } from 'lucide-react';

interface CenterStageProps {
  bondLevel: number;
  onClick: () => void;
  clickPower: number;
}

interface FloatingHeart {
  id: number;
  x: number;
  y: number;
  value: number;
}

export function CenterStage({ bondLevel, onClick, clickPower }: CenterStageProps) {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleInteraction = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault(); // Prevent double firing on touch devices
    onClick();
    
    let cx = window.innerWidth / 2;
    let cy = window.innerHeight / 2;

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Random position around the center (radius between 60 and 120)
      const angle = Math.random() * Math.PI * 2;
      const radius = 60 + Math.random() * 60;
      
      cx = centerX + Math.cos(angle) * radius;
      cy = centerY + Math.sin(angle) * radius;
    }

    const newHeart: FloatingHeart = {
      id: Date.now() + Math.random(),
      x: cx,
      y: cy,
      value: clickPower,
    };

    setHearts(prev => [...prev, newHeart]);

    setTimeout(() => {
      setHearts(prev => prev.filter(h => h.id !== newHeart.id));
    }, 1000);
  }, [onClick, clickPower]);

  // Determine form based on bond level
  const form = bondLevel >= 21 ? 3 : bondLevel >= 11 ? 2 : 1;

  return (
    <div 
      id="center-stage"
      ref={containerRef}
      className="relative flex-1 flex items-center justify-center min-h-[400px] cursor-pointer select-none overflow-hidden"
      onClick={handleInteraction}
      onTouchStart={handleInteraction}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-pink-50/50 to-purple-50/50 rounded-3xl -z-10" />
      
      {/* Human Character Sprite */}
      <motion.div
        className="relative w-48 h-80 flex flex-col items-center justify-end pb-4"
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: form === 3 ? 2 : 3,
          ease: "easeInOut"
        }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Hair Back */}
        <div className={`absolute top-4 w-32 ${form === 3 ? 'h-48 bg-purple-900' : 'h-40 bg-amber-900'} rounded-t-full rounded-b-3xl`} />

        {/* Head */}
        <div className="relative w-24 h-24 bg-[#ffe0bd] rounded-full z-20 shadow-sm flex flex-col items-center justify-center">
          {/* Hair Front / Bangs */}
          <div className={`absolute -top-2 -left-2 w-28 h-12 ${form === 3 ? 'bg-purple-900' : 'bg-amber-900'} rounded-t-full`} />
          <div className={`absolute top-0 left-0 w-12 h-10 ${form === 3 ? 'bg-purple-900' : 'bg-amber-900'} rounded-br-full`} />
          <div className={`absolute top-0 right-0 w-12 h-10 ${form === 3 ? 'bg-purple-900' : 'bg-amber-900'} rounded-bl-full`} />
          
          {/* Form 2 Accessory */}
          {form === 2 && <div className="absolute -top-4 right-2 text-3xl z-30">🎀</div>}
          
          {/* Form 3 Accessory */}
          {form === 3 && <div className="absolute -top-8 text-4xl z-30 animate-bounce">👑</div>}

          {/* Face Details */}
          {form === 1 && (
            <>
              <div className="absolute top-12 left-5 w-3 h-3 bg-gray-800 rounded-full animate-pulse" />
              <div className="absolute top-12 right-5 w-3 h-3 bg-gray-800 rounded-full animate-pulse" />
              <div className="absolute top-14 left-2 w-4 h-2 bg-pink-300 rounded-full blur-[1px] opacity-80" />
              <div className="absolute top-14 right-2 w-4 h-2 bg-pink-300 rounded-full blur-[1px] opacity-80" />
              <div className="absolute top-16 left-1/2 -translate-x-1/2 w-3 h-1.5 border-b-2 border-gray-800 rounded-full" />
            </>
          )}

          {form === 2 && (
            <>
              <div className="absolute top-11 left-5 w-3 h-4 bg-gray-800 rounded-full overflow-hidden">
                <div className="absolute top-0.5 right-0.5 w-1 h-1 bg-white rounded-full" />
              </div>
              <div className="absolute top-11 right-5 w-3 h-4 bg-gray-800 rounded-full overflow-hidden">
                <div className="absolute top-0.5 right-0.5 w-1 h-1 bg-white rounded-full" />
              </div>
              <div className="absolute top-14 left-2 w-5 h-2 bg-pink-300 rounded-full blur-[1px] opacity-60" />
              <div className="absolute top-14 right-2 w-5 h-2 bg-pink-300 rounded-full blur-[1px] opacity-60" />
              <div className="absolute top-16 left-1/2 -translate-x-1/2 w-4 h-2 border-b-2 border-gray-800 rounded-full" />
            </>
          )}

          {form === 3 && (
            <>
              <div className="absolute top-11 left-4 w-4 h-5 bg-gray-800 rounded-full overflow-hidden">
                <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-white rounded-full" />
                <div className="absolute bottom-0.5 left-0.5 w-1 h-1 bg-white rounded-full" />
              </div>
              <div className="absolute top-11 right-4 w-4 h-5 bg-gray-800 rounded-full overflow-hidden">
                <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-white rounded-full" />
                <div className="absolute bottom-0.5 left-0.5 w-1 h-1 bg-white rounded-full" />
              </div>
              <div className="absolute top-15 left-1 w-6 h-3 bg-pink-400 rounded-full blur-[2px] opacity-80" />
              <div className="absolute top-15 right-1 w-6 h-3 bg-pink-400 rounded-full blur-[2px] opacity-80" />
              <div className="absolute top-17 left-1/2 -translate-x-1/2 w-6 h-4 bg-pink-500 rounded-b-full border-2 border-gray-800 overflow-hidden">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-2 bg-red-400 rounded-t-full" />
              </div>
            </>
          )}
        </div>

        {/* Neck */}
        <div className="w-4 h-4 bg-[#e6c4a0] -mt-1 z-10" />

        {/* Body / Clothes */}
        <div className="relative w-20 h-28 z-10 flex flex-col items-center">
          {/* Arms */}
          <div className="absolute top-2 -left-4 w-6 h-20 bg-[#ffe0bd] rounded-full origin-top transform rotate-12 z-0" />
          <div className="absolute top-2 -right-4 w-6 h-20 bg-[#ffe0bd] rounded-full origin-top transform -rotate-12 z-0" />
          
          {/* Sleeves */}
          {form === 1 && (
            <>
              <div className="absolute top-1 -left-5 w-8 h-8 bg-blue-400 rounded-full z-10" />
              <div className="absolute top-1 -right-5 w-8 h-8 bg-blue-400 rounded-full z-10" />
            </>
          )}
          {form === 2 && (
            <>
              <div className="absolute top-0 -left-6 w-10 h-10 bg-pink-300 rounded-full z-10" />
              <div className="absolute top-0 -right-6 w-10 h-10 bg-pink-300 rounded-full z-10" />
            </>
          )}
          {form === 3 && (
            <>
              <div className="absolute top-0 -left-8 w-12 h-12 bg-purple-400 rounded-full z-10 shadow-lg" />
              <div className="absolute top-0 -right-8 w-12 h-12 bg-purple-400 rounded-full z-10 shadow-lg" />
            </>
          )}

          {/* Torso */}
          {form === 1 && (
            <div className="w-full h-full flex flex-col items-center z-20">
              <div className="w-full h-14 bg-blue-400 rounded-t-2xl shadow-sm" />
              <div className="w-[110%] h-14 bg-indigo-600 rounded-b-xl shadow-inner" />
            </div>
          )}
          {form === 2 && (
            <div className="w-full h-full flex flex-col items-center z-20">
              <div className="w-full h-12 bg-pink-400 rounded-t-2xl" />
              <div className="w-24 h-16 bg-pink-300 rounded-b-3xl shadow-md" />
              {/* Belt */}
              <div className="absolute top-10 w-full h-2 bg-white opacity-50" />
            </div>
          )}
          {form === 3 && (
            <div className="w-full h-full flex flex-col items-center z-20">
              <div className="w-full h-14 bg-purple-600 rounded-t-2xl" />
              <div className="w-28 h-20 bg-purple-500 rounded-b-full shadow-lg border-b-4 border-yellow-400" />
              {/* Gold accents */}
              <div className="absolute top-12 w-full h-3 bg-yellow-400 shadow-sm" />
              <div className="absolute top-2 w-4 h-4 bg-yellow-300 rounded-full rotate-45" />
            </div>
          )}
        </div>

        {/* Legs */}
        <div className="flex gap-4 -mt-4 z-0">
          <div className="w-5 h-22 bg-[#ffe0bd] rounded-b-full flex flex-col justify-end items-center pb-0">
            {/* Shoes */}
            {form === 1 && <div className="w-7 h-5 bg-gray-700 rounded-t-xl rounded-b-sm" />}
            {form === 2 && <div className="w-7 h-5 bg-pink-500 rounded-t-xl rounded-b-sm" />}
            {form === 3 && <div className="w-7 h-6 bg-purple-800 rounded-t-xl rounded-b-sm" />}
          </div>
          <div className="w-5 h-22 bg-[#ffe0bd] rounded-b-full flex flex-col justify-end items-center pb-0">
            {/* Shoes */}
            {form === 1 && <div className="w-7 h-5 bg-gray-700 rounded-t-xl rounded-b-sm" />}
            {form === 2 && <div className="w-7 h-5 bg-pink-500 rounded-t-xl rounded-b-sm" />}
            {form === 3 && <div className="w-7 h-6 bg-purple-800 rounded-t-xl rounded-b-sm" />}
          </div>
        </div>

        {/* Form 3 Glow/Hearts */}
        {form === 3 && (
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-purple-300 opacity-50 pointer-events-none"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        )}
      </motion.div>

      {/* Floating Hearts */}
      <AnimatePresence>
        {hearts.map(heart => (
          <motion.div
            key={heart.id}
            initial={{ opacity: 1, y: heart.y - 20, x: heart.x - 20, scale: 0.5 }}
            animate={{ opacity: 0, y: heart.y - 120, scale: 1.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="fixed top-0 left-0 pointer-events-none z-50 flex flex-col items-center"
          >
            <Heart className="w-8 h-8 text-pink-500 fill-pink-500" />
            <span className="text-pink-600 font-bold font-mono text-lg drop-shadow-md">
              +{Math.floor(heart.value)}
            </span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
