"use client";
import { Boxes, Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center w-full h-full  opacity-90 flex flex-col gap-4 items-center justify-center space-y-4">
      {/* <div className="w-full flex flex-col space-y-4 items-center justify-center">
        <div className="w-20 h-20 bg-gray-50 rounded-full  flex items-center justify-center border-[3px] border-primary text-primary">
          <span>
            <Boxes className="w-8 h-8" />
          </span>
        </div>
        <p>Loading...</p>
      </div> */}
      <div className="loader" />
      <p className="text-muted-foreground">loading...</p>
    </div>
  );
  // const [progress, setProgress] = useState(0);

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setProgress((oldProgress) => {
  //       if (oldProgress === 1000) {
  //         clearInterval(timer);
  //         return 1000;
  //       }
  //       const diff = Math.random() * 10;
  //       return Math.min(oldProgress + diff, 1000);
  //     });
  //   }, 2000);

  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, []);

  // return (
  //   <div className="min-h-screen w-full bg-white to-pink-500 flex flex-col items-center justify-center text-primary">
  //     <div className="w-64 h-64 relative mb-1">
  //       <svg className="w-full h-full" viewBox="0 0 100 100">
  //         {/* <circle
  //           className="text-gray-300"
  //           strokeWidth="4"
  //           stroke="currentColor"
  //           fill="transparent"
  //           r="14"
  //           cx="50"
  //           cy="50"
  //         /> */}
  //         <circle
  //           className="text-white"
  //           strokeWidth="4"
  //           strokeDasharray={300}
  //           strokeDashoffset={300 - (progress / 100) * 300}
  //           strokeLinecap="round"
  //           stroke="currentColor"
  //           fill="transparent"
  //           r="12"
  //           cx="50"
  //           cy="50"
  //         />
  //       </svg>
  //       <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
  //         <Loader2 className="w-16 h-16 animate-spin" />
  //       </div>
  //     </div>
  //     <h1 className="text-4xl font-bold mb-4">Loading Your Experience</h1>
  //     <p className="text-xl mb-8">
  //       Please wait while we prepare something amazing for you
  //     </p>
  //     <div className="w-64 bg-white bg-opacity-20 rounded-full h-3 mb-4">
  //       <div
  //         className="bg-white h-3 rounded-full transition-all duration-500 ease-out"
  //         style={{ width: `${progress}%` }}
  //       ></div>
  //     </div>
  //     <p className="text-lg font-semibold">{Math.round(progress)}%</p>
  //   </div>
  // );
};

export default Loader;
