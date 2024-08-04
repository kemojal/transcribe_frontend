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
import { Upload } from "lucide-react";
import { FileDropzone } from "../FileDropzone";

export const FileDialogue = () => {
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
      router.push(`/projects/${data.id}`);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
        <span>
          <Upload className="mr-2 h-4 w-4" />
        </span>
        Upload
      </DialogTrigger>
      <DialogContent className="overflow-hidden py-8 px-4">
        <DialogHeader className="border-b-1 border-gray-200">
          <DialogTitle>Upload audio </DialogTitle>
          <DialogDescription>
            Upload your content to edit in Riverside.
          </DialogDescription>
        </DialogHeader>

        <FileDropzone />
        {submitting && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-xl opacity-50">
            Submitting...
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
