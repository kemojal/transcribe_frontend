"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
export const AudioPulse = ({ isPlaying }) => {
  const [levels, setLevels] = useState(Array(40).fill(0.3));

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        // setTime((prevTime) => prevTime + 1);
        setLevels((prevLevels) =>
          prevLevels.map(() => Math.random() * 0.8 + 0.2)
        );
      }, 100);
    } else {
      setLevels(Array(20).fill(0.3));
    }
    return () => clearInterval(interval);
  }, [isPlaying]);
  return (
    <div className="bg-white flex items-center justify-center p-3 rounded-xl">
      <motion.div
        className="flex space-x-1 h-5 w-72 rounded-full overflow-hidden items-center justify-center"
        initial={{ scaleX: 0.8 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {levels.map((level, index) => (
          <motion.div
            key={index}
            className="w-[1px] rounded-full"
            style={{
              height: "100%",
              backgroundColor: isPlaying
                ? `hsl(${index * 18}, 100%, 50%)`
                : "rgb(75, 85, 99)",
            }}
            initial={{ scaleY: 0.3 }}
            animate={{ scaleY: level }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          />
        ))}
      </motion.div>
    </div>
  );
};
