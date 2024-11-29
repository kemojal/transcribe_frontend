"use client";

import { motion } from "framer-motion";
import { Plus, Wand2, FileAudio, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProjectDialogue } from "./Dialogues/ProjectDialogue";

export default function NoProjectsSection() {
  const features = [
    {
      icon: FileAudio,
      title: "Upload Audio",
      description: "Support for various audio formats",
    },
    {
      icon: Wand2,
      title: "AI Transcription",
      description: "Powered by advanced AI models",
    },
    {
      icon: Users,
      title: "Collaborate",
      description: "Share and work together",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-12 px-4"
    >
      {/* Floating Cards Animation */}
      <div className="relative mb-16 w-80 h-80">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: -5 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="absolute left-0 top-0"
        >
          <Card className="w-56 h-64 bg-background/50 backdrop-blur-sm border border-border/50 shadow-lg rounded-2xl p-6 hover:shadow-xl transition-all duration-300">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <FileAudio className="w-6 h-6 text-primary/60" />
              </div>
              <div className="space-y-2">
                <div className="h-3 w-32 bg-muted rounded-md" />
                <div className="h-3 w-full bg-muted rounded-md" />
                <div className="h-3 w-24 bg-muted rounded-md" />
              </div>
              <div className="pt-4 flex gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/10" />
                <div className="h-8 w-8 rounded-full bg-primary/10" />
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
          animate={{ opacity: 1, scale: 1, rotate: 5 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="absolute right-0 top-16"
        >
          <Card className="w-56 h-64 bg-background/50 backdrop-blur-sm border border-border/50 shadow-lg rounded-2xl p-6 hover:shadow-xl transition-all duration-300">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                <Wand2 className="w-6 h-6 text-secondary/60" />
              </div>
              <div className="space-y-2">
                <div className="h-3 w-36 bg-muted rounded-md" />
                <div className="h-3 w-full bg-muted rounded-md" />
                <div className="h-3 w-28 bg-muted rounded-md" />
              </div>
              <div className="pt-4 flex gap-2">
                <div className="h-8 w-8 rounded-full bg-secondary/10" />
                <div className="h-8 w-8 rounded-full bg-secondary/10" />
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Content Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="text-center space-y-6 max-w-lg mx-auto"
      >
        <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
          Create Your First Space
        </h2>
        <p className="text-muted-foreground">
          Start organizing your audio files and collaborate with your team.
          Upload, transcribe, and share with ease.
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              className="flex flex-col items-center text-center p-4"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-primary/60" />
              </div>
              <h3 className="font-medium mb-1">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Create Space Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          <Button
            size="lg"
            className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 text-lg rounded-full transition-transform transform hover:scale-105"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create Space
          </Button>
          <ProjectDialogue />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
