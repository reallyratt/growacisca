import { motion, AnimatePresence } from 'motion/react';
import { Bell } from 'lucide-react';

interface NotificationsProps {
  notifications: { id: number; text: string }[];
}

export function Notifications({ notifications }: NotificationsProps) {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {notifications.map((n) => (
          <motion.div
            key={n.id}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9 }}
            className="bg-white/90 backdrop-blur-md shadow-lg rounded-2xl p-4 flex items-center gap-3 border border-pink-100 max-w-sm"
          >
            <div className="bg-pink-100 p-2 rounded-full">
              <Bell className="w-4 h-4 text-pink-500" />
            </div>
            <span className="text-sm font-medium text-gray-700">{n.text}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
