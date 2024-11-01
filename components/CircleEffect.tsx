import React from "react";

const CircleEffectEffect = () => {
  return (
    <div
      className="
        w-[min(1440px,100%)] 
        absolute 
        aspect-[1] 
        top-[max(-720px,-50vw)] 
        right-[max(-720px,-50vw)] 
        rounded-full 
        bg-[#fafafa] 
        filter 
        blur-[4px] 
        shadow-[inset_0_0_100px_-30px_#fafafa,inset_0_0_30vw_30vw_#6d77ff,0_0_120px_80px_#6d8fff]
      "
    >
      {/* Your content goes here */}
    </div>
  );
};

export default CircleEffectEffect;
