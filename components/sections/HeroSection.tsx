'use client';

import Image from "next/image";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Wand2 } from "lucide-react";

const HeroSection = () => {
  const router = useRouter();

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
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-24 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 2, delay: 1, repeat: Infinity, repeatType: "reverse" }}
          className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-secondary rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col space-y-8"
        >
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20">
              <Wand2 className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">AI-Powered Transcription</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Transform Audio Into Text Seamlessly
            </h1>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-xl text-muted-foreground leading-relaxed"
          >
            Experience industry-leading accuracy with our AI-powered transcription. 
            Save time, boost productivity, and unlock the power of your spoken content 
            with over 99% accuracy.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              size="lg"
              className="group relative overflow-hidden px-8 py-6"
              onClick={() => router.push("/register")}
            >
              <span className="relative z-10">Get Started Free</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              />
              <ArrowRight className="w-5 h-5 ml-2 inline-block group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="group px-8 py-6 border-2 hover:bg-primary/5"
              onClick={() => router.push("/login")}
            >
              Watch Demo
              <motion.span
                className="ml-2"
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
              >
                ▶
              </motion.span>
            </Button>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex items-center gap-4 text-muted-foreground"
          >
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-background bg-primary/10"
                />
              ))}
            </div>
            <p className="text-sm">
              Trusted by <span className="font-bold text-primary">10,000+</span> professionals
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative"
        >
          <div className="relative aspect-square max-w-xl mx-auto">
            <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/demo-screenshot.png"
                alt="Transcription Interface"
                fill
                className="object-cover"
                priority
              />
            </div>
            
            {/* Floating Elements */}
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="absolute -top-8 -right-8 p-4 bg-background/80 backdrop-blur-sm rounded-xl shadow-lg border border-primary/10"
            >
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                <span className="text-sm font-medium">99% Accuracy</span>
              </div>
            </motion.div>

            <motion.div
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 4,
                delay: 1,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="absolute -bottom-8 -left-8 p-4 bg-background/80 backdrop-blur-sm rounded-xl shadow-lg border border-primary/10"
            >
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-blue-400 animate-pulse" />
                <span className="text-sm font-medium">Real-time Processing</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
