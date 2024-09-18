'use client'

import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <motion.div
        className="w-16 h-16 flex items-center justify-center relative"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
      >
        <motion.div
          className="absolute w-10 h-10 bg-transparent border-4 border-indigo-600 border-solid"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1.2, opacity: 1 }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{
            clipPath: "polygon(50% 0%, 75% 100%, 25% 100%)", // Shape for cross
          }}
        />
        <motion.div
          className="absolute w-6 h-6 bg-indigo-600"
          initial={{ scale: 1 }}
          animate={{ scale: 1.5 }}
          transition={{ repeat: Infinity, repeatType: "mirror", duration: 1 }}
          style={{ clipPath: "polygon(50% 0%, 75% 100%, 25% 100%)" }}
        />
      </motion.div>
    </div>
  );
};

export default Loading;
