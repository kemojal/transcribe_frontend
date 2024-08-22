"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { BASEURL } from "@/constants";
import Loader from "../Loader";
import { Plus } from "lucide-react";
import { DialogueBase } from "./DialogueBase";

export const ProjectDialogue = ({ onAddProject }) => {
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [isButtonActive, setIsButtonActive] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
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

      const data = await response.json();
      setSubmitting(false);
      setName("");
      setOpen(false);

      setIsButtonActive(false);

      console.log("Project created:", data);
      console.log("Project created:", data);
      onAddProject(data);
      // router.push(`/projects/${data.id}`);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setName(value);
    setIsButtonActive(value.trim() !== ""); // Enable button if input is not empty
  };

  return (
    <DialogueBase
      title="New Project"
      description="Give your project a name"
      trigger={
        <>
          <span>
            <Plus className="w-4 h-4 mr-2" />
          </span>
          New Project
        </>
      }
      triggerStyle="px-4 h-8 border-[1.5px] border-black bg-transparent text-black"
      open={open}
      setOpen={setOpen}
      footerButton={
        <>
          <Button
            type="submit"
            onClick={handleSubmit}
            className="mt-4"
            disabled={!isButtonActive || submitting}
          >
            {submitting ? " Creating Project..." : " Create Project"}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="p-2 space-y-4">
        <div className="mb-4">
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
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
            disabled={submitting}
          />
        </div>
      </form>
      {submitting && (
        // <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-xl opacity-50">
        //   Submitting...
        // </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader />
        </div>
      )}
    </DialogueBase>
  );
};
