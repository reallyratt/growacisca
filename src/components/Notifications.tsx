import { motion, AnimatePresence } from 'motion/react';
import { Bell } from 'lucide-react';

interface NotificationsProps {
  notifications: { id: number; text: string }[];
}

export function Notifications({ notifications }: NotificationsProps) {
  return (
    <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 pointer-events-none w-full max-w-[90%] items-center">
      <AnimatePresence>
        {notifications.map((n) => (
          <motion.div
            key={n.id}
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="bg-gray-800/90 backdrop-blur-md shadow-lg rounded-full px-4 py-2 flex items-center gap-2 border border-gray-700"
          >
            <Bell className="w-3 h-3 text-pink-400" />
            <span className="text-xs font-medium text-white">{n.text}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
