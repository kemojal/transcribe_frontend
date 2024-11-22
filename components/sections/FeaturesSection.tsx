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

import { motion } from "framer-motion";
import { Wand2, Sparkles, Clock, Zap, Layers, Lock } from "lucide-react";

const features = [
  {
    icon: Wand2,
    title: "AI-Powered Accuracy",
    description:
      "Industry-leading 99% accuracy powered by cutting-edge AI models",
    gradient: "from-blue-500 to-indigo-500",
  },
  {
    icon: Clock,
    title: "Real-Time Processing",
    description:
      "Lightning-fast transcription with real-time progress tracking",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Sparkles,
    title: "Smart Formatting",
    description: "Automatic punctuation, capitalization, and speaker detection",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    icon: Zap,
    title: "Instant Translation",
    description: "Translate transcriptions into 100+ languages instantly",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    icon: Layers,
    title: "Multi-Format Support",
    description: "Support for all major audio and video file formats",
    gradient: "from-rose-500 to-red-500",
  },
  {
    icon: Lock,
    title: "Enterprise Security",
    description: "Bank-grade encryption and data privacy compliance",
    gradient: "from-cyan-500 to-blue-500",
  },
];

const FeaturesSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section
      className="py-24 bg-gradient-to-b from-background to-background/80"
      id="features"
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Powerful Features for Professional Transcription
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the next generation of audio transcription with our
            advanced features designed for professionals.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />

              <div className="relative bg-background/50 backdrop-blur-sm border border-primary/10 p-8 rounded-3xl hover:border-primary/20 transition-colors duration-300">
                <div
                  className={`inline-flex p-3 rounded-2xl bg-gradient-to-r ${feature.gradient} mb-6`}
                >
                  <feature.icon className="w-6 h-6 text-white" />
                </div>

                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute -top-1/2 -right-1/2 w-full h-full bg-primary/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 8,
              delay: 4,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-secondary/10 rounded-full blur-3xl"
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
