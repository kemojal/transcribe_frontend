"use client";

import React, { useState, useCallback } from "react";
import debounce from "lodash/debounce";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Box, CirclePlus, PlusCircle } from "lucide-react";
import { DialogueBase } from "./DialogueBase";
import { BASEURL } from "@/constants";
import type { ProjectProps } from "@/types/interfaces";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

interface ProjectDialogueProps {
  onAddProject: (project: ProjectProps) => void;
  onClose: () => void;
  defaultOpen?: boolean;
}

export function ProjectDialogue({
  onAddProject,
  onClose,
  defaultOpen = false,
}: ProjectDialogueProps) {
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleSubmit = useCallback(
    debounce(async () => {
      if (!name.trim() || submitting) return;

      try {
        setSubmitting(true);
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          setSubmitting(false);
          return;
        }

        const response = await fetch(`${BASEURL}/projects`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name: name.trim() }),
        });

        if (!response.ok) throw new Error("Failed to create project");

        const data: ProjectProps = await response.json();
        onAddProject(data);
        setSuccess(true);

        // Animated success state
        await new Promise((resolve) => setTimeout(resolve, 1000));
        handleClose();
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      } finally {
        setSubmitting(false);
      }
    }, 300),
    [name, submitting, onAddProject, handleClose]
  );

  return (
    <DialogueBase
      title="Create a new Space"
      description="Give your space a name"
      open={defaultOpen}
      setOpen={(isOpen) => !isOpen && handleClose()}
      footerButton={
        <div className="flex justify-end space-x-1">
          <Button
            size="sm"
            variant="outline"
            className="rounded-full bg-background/50 backdrop-blur-sm border-border/50 hover:bg-background/80 transition-all duration-200"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={() => !submitting && handleSubmit()}
            className="w-full rounded-full bg-primary/90 text-primary-foreground hover:bg-primary text-sm shadow-lg hover:shadow-primary/20 transition-all duration-300"
            size="sm"
            disabled={!name.trim() || submitting}
          >
            {submitting ? (
              <motion.div
                className="flex items-center justify-center gap-2"
                initial={false}
                animate={submitting ? { opacity: 1 } : { opacity: 1 }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-2"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <CirclePlus size={14} className="text-current" />
                  </motion.div>
                  Creating space...
                </motion.div>
              </motion.div>
            ) : success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2"
              >
                <Box size={14} className="text-current" />
                Space created!
              </motion.div>
            ) : (
              "Create space"
            )}
          </Button>
        </div>
      }
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium">
            Space Name
          </Label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter space name"
            className="w-full bg-background/50 backdrop-blur-sm border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-all duration-200"
            disabled={submitting}
            autoFocus
          />
        </div>

        {/* Premium loading effect */}
        {submitting && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 -z-10"
          >
            <div className="absolute inset-0 rounded-full bg-primary/20 animate-pulse" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/10 to-primary/30 animate-pulse delay-75" />
          </motion.div>
        )}
      </motion.div>
      <div className="pt-6 space-y-3 bg-gray-50 rounded-2xl mt-4 p-2 text-muted-foreground opacity-80">
        <h2 className="font-semibold tracking-tight text-sm">Privacy</h2>
        <RadioGroup defaultValue="open" className="space-y-1 font-normal">
          <div className="flex items-center space-x-1">
            <RadioGroupItem value="open" id="open" disabled />
            <Label htmlFor="open" className="text-sm font-normal">
              <span className="font-semibold">Open</span> - Anyone at
              Kemo&apos;s Workspace can join
            </Label>
          </div>
          <div className="flex items-center space-x-1">
            <RadioGroupItem value="closed" id="closed" disabled />
            <Label htmlFor="closed" className="text-sm font-normal">
              <span className="font-semibold">Closed</span> - Only invited
              people can join
            </Label>
          </div>
        </RadioGroup>
      </div>
    </DialogueBase>
  );
}
