// "use client";
// import Image from "next/image";
// import { Button } from "../ui/button";
// import { useRouter } from "next/navigation";

// // components/HeroSection.tsx
// const HeroSection = () => {
//   const router = useRouter();
//   return (
//     <section className="flex flex-col space-y-12 items-center justify-center px-6 py-12 md:py-24 bg-gradient-to-b from-primary to-secondary text-white">
//       <div className="max-w-3xl flex flex-col items-center md:items-start text-center md:text-left">
//         <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
//           Transform Audio Into Text Seamlessly
//         </h1>
//         <p className="mb-8 text-lg md:text-xl max-w-2xl text-gray-200 ">
//           AI-powered transcription that automates your audio to text process
//           with over 99% accuracy. Save time, boost productivity, and unlock the
//           power of your spoken content.
//         </p>

//         <div className="flex flex-col md:flex-row items-center gap-4">
//           <Button
//             className=" text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:bg-accent-dark transition duration-300 transform hover:scale-105"
//             onClick={() => {
//               router.push("/register");
//             }}
//           >
//             Get Started
//           </Button>
//           <Button
//             className=" bg-accent border border-white text-primary font-semibold px-8 py-4 rounded-lg shadow-lg hover:bg-white hover:text-primary transition duration-300 transform hover:scale-105"
//             onClick={() => {
//               router.push("/login");
//             }}
//           >
//             Request Demo
//           </Button>
//         </div>
//       </div>
//       <div className="hidden md:flex flex-1 justify-center items-center mt-8 md:mt-0 w-full">
//         <div className="flex w-full max-w-5xl bg-red-5 p-6 bg-gray-50 rounded-2xl">
//           <Image
//             src="/_SAASBG.png" // Replace with your hero image
//             alt="Transcription Hero"
//             className="transform transition-transform duration-300 hover:scale-105 opacity-50"
//             width={1440}
//             height={776}
//           />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;

"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion"; // Importing Framer Motion
import CircleEffectEffect from "../CircleEffect";
import Header from "./Header";
import { BackgroundLines } from "@/effects/background-lines";

const HeroSection = () => {
  const router = useRouter();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        delay: 0.2,
        staggerChildren: 0.2,
      },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.1,
      transition: { duration: 0.3, type: "spring", stiffness: 200 },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1, ease: "easeInOut" },
    },
  };

  return (
    <motion.section
      className="w-full relative flex flex-col  items-center justify-center  pt-28 md:pb-24 bg-gradient-to-b from-primary to-[#1f1f2e] via-[#3d3d60] to-[#23222b] text-white relative overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="absolute inset-0 z-[-1] bg-opacity-60 pointer-events-none"></div>
      <CircleEffectEffect />
      <Header />

      {/* <BackgroundLines> */}

      <div className="flex flex-col flex-1 justify-center items-center mt-8 md:mt-0 w-full space-y-12">
        {/* Animated Text */}
        <motion.div className="max-w-3xl flex flex-col items-center md:items-start text-center md:text-left z-10 px-6">
          <motion.h1
            className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight tracking-tight text-white"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          >
            Transform Audio Into Text{" "}
            <span className="text-accent">Seamlessly</span>
          </motion.h1>
          <motion.p
            className="mb-8 text-lg md:text-xl max-w-2xl text-gray-300 leading-relaxed"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            AI-powered transcription that automates your audio-to-text process
            with over 99% accuracy. Save time, boost productivity, and unlock
            the power of your spoken content.
          </motion.p>

          {/* Animated Buttons */}
          <div className="flex flex-col md:flex-row items-center gap-6">
            <motion.div variants={buttonVariants} whileHover="hover">
              <Button
                className="bg-accent text-primary font-semibold px-8 py-4 rounded-full shadow-xl transition duration-300 hover:text-white"
                onClick={() => {
                  router.push("/register");
                }}
              >
                Get Started
              </Button>
            </motion.div>
            <motion.div variants={buttonVariants} whileHover="hover">
              <Button
                className="bg-transparent border border-white text-white font-semibold px-8 py-4 rounded-full shadow-xl hover:bg-white hover:text-primary hover:border-transparent transition duration-300"
                onClick={() => {
                  router.push("/login");
                }}
              >
                Request Demo
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Animated Image */}
        <motion.div
          className="hidden md:flex flex-1 justify-center items-center mt-12 md:mt-0 w-full"
          variants={imageVariants}
        >
          <div className="w-full max-w-5xl bg-opacity-90 rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/_SAASBG.png" // Replace with your hero image
              alt="Transcription Hero"
              className="object-cover w-full h-auto opacity-80 filter brightness-95"
              width={1440}
              height={776}
            />
          </div>
        </motion.div>
      </div>
      {/* </BackgroundLines> */}
    </motion.section>
  );
};

export default HeroSection;
