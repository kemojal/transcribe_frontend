import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BsCheckCircle } from "react-icons/bs";

// CSS for background animation
const backgroundStyles = `
@keyframes gradientAnimation {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
.animated-background {
  background: linear-gradient(120deg, #ff7e5f, #feb47b, #86a8e7, #91eac9);
  background-size: 300% 300%;
  animation: gradientAnimation 8s ease infinite;
}
`;

const AudioUploader = ({ isSubmitting }: { isSubmitting: boolean }) => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);

  useEffect(() => {
    if (isSubmitting) {
      setUploadProgress(0);
      setUploadComplete(false);
      let progress = 0;

      const uploadInterval = setInterval(() => {
        progress += 10;
        setUploadProgress(progress);

        if (progress >= 100) {
          clearInterval(uploadInterval);
          setUploadComplete(true);
        }
      }, 300);
    }
  }, [isSubmitting]);

  return (
    <>
      <style>{backgroundStyles}</style> {/* Inject animated background CSS */}
      <div className="relative flex flex-col items-center justify-center h-screen animated-background text-white w-full">
        {/* Add floating particles */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full opacity-20"
              initial={{ opacity: 0, y: -50 }}
              animate={{
                opacity: [0, 1, 0],
                y: [
                  Math.random() * -50,
                  Math.random() * 50,
                  Math.random() * 100,
                ],
                x: [Math.random() * -100, Math.random() * 100],
              }}
              transition={{
                duration: Math.random() * 4 + 4,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
        <div className="z-10 w-full h-full bg-blue-500 flex flex-col items-center justify-end">
          {!uploadComplete ? (
            <motion.div
              className="relative flex flex-col items-center p-8 w-full rounded-lg shadow-xl z-10 flex flex-col items-center justify-center"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Uploading Animation */}
              <div className="w-full">
                <div className="flex items-center justify-between mb-2">
                  <span>Uploading...</span>
                  <span>{uploadProgress}%</span>
                </div>

                <motion.div
                  className="h-6 bg-blue-500 rounded-xl"
                  initial={{ width: "0%" }}
                  animate={{ width: `${uploadProgress}%` }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />

                <motion.div
                  className="mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                >
                  {/* Simulated Soundwave Animation */}
                  <svg
                    className="w-full h-12 text-green-500"
                    viewBox="0 0 100 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect x="5" width="10" height="10" rx="5">
                      <animate
                        attributeName="height"
                        values="10;3;10"
                        dur="0.3s"
                        repeatCount="indefinite"
                      />
                    </rect>
                    <rect x="25" width="10" height="10" rx="5">
                      <animate
                        attributeName="height"
                        values="3;10;3"
                        dur="0.5s"
                        repeatCount="indefinite"
                      />
                    </rect>
                    <rect x="45" width="10" height="10" rx="5">
                      <animate
                        attributeName="height"
                        values="10;3;10"
                        dur="0.3s"
                        repeatCount="indefinite"
                      />
                    </rect>
                    <rect x="65" width="10" height="10" rx="5">
                      <animate
                        attributeName="height"
                        values="3;10;3"
                        dur="0.5s"
                        repeatCount="indefinite"
                      />
                    </rect>
                    <rect x="85" width="10" height="10" rx="5">
                      <animate
                        attributeName="height"
                        values="10;3;10"
                        dur="0.3s"
                        repeatCount="indefinite"
                      />
                    </rect>
                  </svg>
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              className="p-8 bg-green-600 rounded-lg shadow-lg w-full full mx-2"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Completion Animation */}
              <BsCheckCircle size={100} className="text-white mb-4" />
              <p className="text-xl font-semibold">Upload Complete!</p>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default AudioUploader;
