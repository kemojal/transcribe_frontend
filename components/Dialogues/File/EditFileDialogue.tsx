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

import { FilePenLine, Pen } from "lucide-react";

import { updateProject } from "@/lib/reducers/ProjectSlice";
import { ProjectProps } from "@/types/interfaces";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useToast } from "@/components/ui/use-toast";
import { DialogueBase } from "../DialogueBase";
import Loader from "@/components/Loader";
import { editFile } from "@/lib/reducers/fileSlice";

export const EditFileDialogue = ({ fileData }) => {
  
  const [name, setName] = useState(fileData?.name || "");
  const [submitting, setSubmitting] = useState(false);
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const dispatch = useAppDispatch();
  const { data: file, status, error } = useAppSelector((state) => state.files);

  const { toast } = useToast();


  const handleSubmit = async (e) => {
    e.preventDefault();
    handleEditFile(fileData?.id, fileData?.project_id, { name });
  };
  const handleEditFile = async (
    fileId: string,
    projectId: string,
    data: any
  ) => {
    setSubmitting(true);
    try {
      await dispatch(
        editFile({ projectId: projectId, fileId: fileId, data })
      ).unwrap();

      toast({
        title: "File updated successfully",
        // description: "Friday, February 10, 2023 at 5:57 PM",
      });
      // Optionally, you can show a success message here
    } catch (error) {
      console.error("Error editing file:", error);
      // Optionally, you can show an error message here
    } finally {
      setSubmitting(false);
      setOpen(false);
    }
  };
  return (
    <DialogueBase
      trigger={
        <div className="cursor-pointer gap-2 flex flex items-center justify-between">
          <span>
            <FilePenLine size={16} />
          </span>
          Edit
        </div>
      }
      triggerStyle=" px-0   transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 !bg-transparent cursor-pointer gap-2 flex flex items-center text-black "
      title="Edit File"
      description="Update your file name"
      open={open}
      setOpen={setOpen}
      footerButton={
        <>
          <Button
            type="submit"
            className="mt-4"
            disabled={submitting}
            onClick={handleSubmit}
          >
            {submitting ? "Updating file..." : "Update file"}
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
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
            disabled={submitting}
          />
        </div>
      </form>
      {submitting && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader />
        </div>
      )}
    </DialogueBase>
  );
};
