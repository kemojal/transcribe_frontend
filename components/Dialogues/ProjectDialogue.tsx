"use client";

import React, { useState, useCallback } from "react";
import debounce from "lodash/debounce";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Box, CirclePlus, PlusCircle } from "lucide-react";
import { DialogueBase } from "./DialogueBase";
import { BASEURL } from "@/constants";
import type { Project } from "@/lib/store/types";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

interface ProjectDialogueProps {
  onAddProject: (project: Project) => void;
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

        const data: Project = await response.json();
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
      trigger={
        <Button
          variant="outline"
          className="w-full rounded-full bg-background/50 backdrop-blur-sm border-border/50 hover:bg-background/80 transition-all duration-200"
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Create New Space
        </Button>
      }
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
              >
                <span className="animate-spin">⏳</span>
                <span>Creating...</span>
              </motion.div>
            ) : (
              "Create Space"
            )}
          </Button>
        </div>
      }
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Space Name</Label>
          <Input
            id="name"
            placeholder="Enter space name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full"
          />
        </div>
      </div>
    </DialogueBase>
  );
}
