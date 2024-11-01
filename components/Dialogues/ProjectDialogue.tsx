"use client";

import React, { useState } from "react";
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
      title="Create a new Space"
      description="Give your workspace a name"
      trigger={
        <Button
          variant="default"
          className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 w-full"
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          New Space
        </Button>
      }
      open={open}
      setOpen={setOpen}
      footerButton={
        <div className="flex justify-end space-x-1">
          <Button
            size="sm"
            variant={"outline"}
            type="button"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={handleSubmit}
            className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90 text-sm rounded-2xl"
            size="sm"
            disabled={!name.trim() || submitting}
          >
            {submitting ? "Creating space..." : "Create space"}
          </Button>
        </div>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
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
