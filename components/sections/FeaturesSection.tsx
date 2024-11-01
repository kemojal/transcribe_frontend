// components/FeaturesSection.tsx
// import { Mic, Edit, Clock, Shield, FileAudio, Wand2 } from "lucide-react";

// const features = [
//   {
//     icon: Mic,
//     title: "Speech to Text",
//     description: "High-quality, real-time speech-to-text conversion.",
//   },
//   {
//     icon: Edit,
//     title: "Auto Edit",
//     description:
//       "Automatically clean up your transcription with smart editing tools.",
//   },
//   {
//     icon: Clock,
//     title: "Time Stamping",
//     description: "Precise timestamps for easier review and navigation.",
//   },
//   {
//     icon: Shield,
//     title: "Secure & Private",
//     description:
//       "Your data is encrypted and stored securely. We prioritize your privacy and adhere to strict security standards.",
//   },
//   {
//     icon: FileAudio,
//     title: "Multi-format Support",
//     description:
//       "Transcribe audio and video files in various formats, including MP3, WAV, MP4, and more.",
//   },
//   {
//     icon: Wand2,
//     title: "AI-Powered Accuracy",
//     description:
//       "Achieve up to 99% accuracy with our advanced machine learning algorithms and natural language processing.",
//   },
// ];

// const FeaturesSection = () => {
//   return (
//     <section className="py-16 bg-transparent">
//       <div className="max-w-6xl mx-auto px-6 flex flex-col items-center">
//         <h2 className="text-4xl font-bold text-center mb-12 text-white">
//           Key Features
//         </h2>
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl">
//           {features.map((feature, index) => (
//             <div
//               key={index}
//               className="flex flex-col items-center text-center bg-white ring-1 ring-primary/20 p-8 rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105"
//             >
//               <feature.icon className="h-12 w-12 text-primary mb-4 transition-transform duration-300 hover:scale-125" />
//               <h3 className="font-semibold mb-2 text-lg">{feature.title}</h3>
//               <p className="text-muted-foreground text-sm max-w-[220px] leading-6">
//                 {feature.description}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FeaturesSection;

"use client";
import { Mic, Edit, Clock, Shield, FileAudio, Wand2 } from "lucide-react";
import { motion } from "framer-motion";
import { EvervaultCard } from "@/effects/evervault-card";

// Define feature list
const features = [
  {
    icon: Mic,
    title: "Speech to Text",
    description: "High-quality, real-time speech-to-text conversion.",
  },
  {
    icon: Edit,
    title: "Auto Edit",
    description:
      "Automatically clean up your transcription with smart editing tools.",
  },
  {
    icon: Clock,
    title: "Time Stamping",
    description: "Precise timestamps for easier review and navigation.",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description:
      "Your data is encrypted and stored securely. We prioritize your privacy and adhere to strict security standards.",
  },
  {
    icon: FileAudio,
    title: "Multi-format Support",
    description:
      "Transcribe audio and video files in various formats, including MP3, WAV, MP4, and more.",
  },
  {
    icon: Wand2,
    title: "AI-Powered Accuracy",
    description:
      "Achieve up to 99% accuracy with our advanced machine learning algorithms and natural language processing.",
  },
];

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, type: "spring", stiffness: 50 },
  }),
};

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center">
        {/* Section Title */}
        <motion.h2
          className="text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          Key Features
        </motion.h2>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center bg-white/10 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 hover:scale-105 border border-primary/20 relative"
              custom={index}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
            >
              {/* <EvervaultCard text={feature.title} /> */}
              {/* Icon with subtle animation */}
              <motion.div whileHover={{ scale: 1.2 }} className="mb-4">
                <feature.icon className="h-12 w-12 text-primary transition-all duration-300" />
              </motion.div>

              {/* Feature Title */}
              <h3 className="text-lg font-semibold mb-2 text-gray-200">
                {feature.title}
              </h3>

              {/* Feature Description */}
              <p className="text-muted-foreground text-sm max-w-[220px] leading-6 text-gray-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
