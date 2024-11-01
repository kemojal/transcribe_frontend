"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Box, CirclePlus, PlusCircle } from "lucide-react";
import { DialogueBase } from "./DialogueBase";
import { BASEURL } from "@/constants";
import type { ProjectProps } from "@/types/interfaces";

interface ProjectDialogueProps {
  onAddProject: (project: ProjectProps) => void;
}

export function ProjectDialogue({ onAddProject }: ProjectDialogueProps) {
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      setSubmitting(false);
      return;
    }

    try {
      const response = await fetch(`${BASEURL}/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data: ProjectProps = await response.json();
      onAddProject(data);
      setName("");
      setOpen(false);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <DialogueBase
      title="New Workspace"
      description="Give your workspace a name"
      trigger={
        <Button variant="default" className="bg-indigo-600 hover:bg-indigo-700">
          <PlusCircle className="w-4 h-4 mr-2" />
          New Workspace
        </Button>
      }
      open={open}
      setOpen={setOpen}
      footerButton={
        <Button
          type="submit"
          onClick={handleSubmit}
          className="w-full bg-indigo-600 hover:bg-indigo-700"
          disabled={!name.trim() || submitting}
        >
          {submitting ? "Creating Workspace..." : "Create Workspace"}
        </Button>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="w-full flex flex-col items-center">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center">
            <span>
              <Box size={30} strokeWidth={1} />
            </span>
          </div>
        </div>

        <div className="space-y-1 text-xs text-muted-foreground text-center">
          A workspace is a place where files can be stored. To create a new
          workspace, please enter a name.
        </div>
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <Input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full"
            required
            disabled={submitting}
          />
        </div>
      </form>
    </DialogueBase>
  );
}
