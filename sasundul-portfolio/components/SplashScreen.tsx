import React from 'react';
import { motion } from 'framer-motion';

export const SplashScreen: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-wa-dark"
    >
      <div className="relative flex flex-col items-center">
        {/* Animated Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-8xl font-display font-bold text-wa-green tracking-tighter"
        >
          SW
          <span className="text-white">.</span>
        </motion.div>
        
        {/* Loading Bar */}
        <div className="mt-8 h-1 w-32 bg-wa-card rounded-full overflow-hidden">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="h-full bg-wa-green"
          />
        </div>
      </div>
    </motion.div>
  );
};