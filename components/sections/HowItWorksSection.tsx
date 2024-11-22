"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Upload, Cpu, FileText, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Upload Your Audio",
    description:
      "Drag and drop your audio or video files. We support all major formats.",
    color: "from-blue-500 to-indigo-500",
  },
  {
    icon: Cpu,
    title: "AI Processing",
    description:
      "Our advanced AI models process your audio with industry-leading accuracy.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: FileText,
    title: "Review & Edit",
    description:
      "Review the transcription in our intuitive editor with real-time collaboration.",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: CheckCircle,
    title: "Export & Share",
    description: "Export in multiple formats or share directly with your team.",
    color: "from-emerald-500 to-teal-500",
  },
];

const HowItWorksSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.8, 1, 1, 0.8]
  );

  return (
    <section
      ref={containerRef}
      className="py-24 relative overflow-hidden"
      id="how-it-works"
    >
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />
      </div>

      <motion.div style={{ opacity, scale }} className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
          >
            How It Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Transform your audio into text in four simple steps with our
            advanced AI technology.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative group"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/4 right-0 w-full h-[2px] bg-gradient-to-r from-primary/20 to-secondary/20 transform translate-x-1/2">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                    className="h-full bg-gradient-to-r from-primary to-secondary origin-left"
                  />
                </div>
              )}

              <div className="relative bg-background/50 backdrop-blur-sm border border-primary/10 p-8 rounded-3xl group-hover:border-primary/20 transition-all duration-300">
                {/* Step Number */}
                <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-background flex items-center justify-center border border-primary/20 text-sm font-semibold">
                  {index + 1}
                </div>

                {/* Icon */}
                <div
                  className={`inline-flex p-3 rounded-2xl bg-gradient-to-r ${step.color} mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <step.icon className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>

                {/* Hover Effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Decorative Elements */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute top-1/2 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            delay: 4,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"
        />
      </motion.div>
    </section>
  );
};

export default HowItWorksSection;
