"use client";

import { motion, AnimatePresence } from "framer-motion";

interface TypingIndicatorProps {
  users: Array<{ userId: string; userName: string }>;
  isVisible: boolean;
}

export default function TypingIndicator({ users, isVisible }: TypingIndicatorProps) {
  if (!isVisible || users.length === 0) return null;

  const userNames = users.map(u => u.userName).join(", ");

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.8 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="flex items-center gap-2 p-3 bg-gray-700 rounded-2xl max-w-[70%]"
        >
          <div className="flex gap-1">
            <motion.div
              className="w-2 h-2 bg-gray-400 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
            />
            <motion.div
              className="w-2 h-2 bg-gray-400 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
            />
            <motion.div
              className="w-2 h-2 bg-gray-400 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
            />
          </div>
          <span className="text-sm text-gray-300">
            {userNames} печатает{users.length > 1 ? 'ют' : ''}...
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
