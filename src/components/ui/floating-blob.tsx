"use client";

import { motion } from "framer-motion";

export function FloatingBlob() {
  return (
    <motion.div
      animate={{
        y: [0, -18, 8, 0],
        x: [0, 10, -8, 0],
        scale: [1, 1.03, 0.98, 1]
      }}
      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      className="relative mx-auto h-72 w-72 rounded-full bg-gradient-to-br from-brand-indigo via-brand-purple to-brand-cyan opacity-70 blur-2xl md:h-96 md:w-96"
    >
      <div className="absolute inset-6 rounded-full border border-white/20" />
    </motion.div>
  );
}
