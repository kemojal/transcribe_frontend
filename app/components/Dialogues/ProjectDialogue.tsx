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

export const ProjectDialogue = ({ onAddProject }) => {
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [open, setOpen] = React.useState(false);

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

      console.log("Project created:", data);
      console.log("Project created:", data);
      onAddProject(data);
      // router.push(`/projects/${data.id}`);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-8 px-4 ">
        New Project
      </DialogTrigger>
      <DialogContent className="overflow-hidden py-8 px-4">
        <DialogHeader className="border-b-1 border-gray-200">
          <DialogTitle>New Project</DialogTitle>
          <DialogDescription>Give your project a name</DialogDescription>
        </DialogHeader>
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
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
              disabled={submitting}
            />
          </div>
          <Button type="submit" className="mt-4">
            {submitting ? " Creating Project..." : " Create Project"}
          </Button>
        </form>
        {submitting && (
          // <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-xl opacity-50">
          //   Submitting...
          // </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
