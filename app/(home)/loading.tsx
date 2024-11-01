import React from "react";
import AudioLoader from "../../components/AudioLoader";

const LoadingPage = () => {
  return (
    <div className="fixed w-screen h-screen bg-white flex flex-col items-center justify-center z-50">
      <AudioLoader />
    </div>
  );
};

export default LoadingPage;
