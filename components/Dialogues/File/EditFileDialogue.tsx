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
import {motion } from "framer-motion";
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
      {fileData && (
        <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
          <div className="p-6 space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="file-card group relative overflow-hidden bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div className="p-4 space-y-3">
                {/* Header with File Name and Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0">
                      <FilePenLine size={20} className="text-indigo-600" />
                    </div>
                    <h3 className="text-base font-medium text-gray-900 truncate pr-4">
                      {fileData.name}
                    </h3>
                  </div>
                  
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleEditFile(fileData.id, fileData.project_id, { name })}
                      className="p-2 rounded-full hover:bg-indigo-50 transition-colors"
                    >
                      <Pen size={20} className="text-indigo-600" />
                    </motion.button>
                  </div>
                </div>

                {/* File Metadata */}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <FilePenLine size={16} className="text-gray-600" />
                    <span>{fileData.type}</span>
                  </div>
                  <div className="w-1 h-1 rounded-full bg-gray-300" />
                  <div className="flex items-center gap-2 text-gray-600">
                    <FilePenLine size={16} className="text-gray-600" />
                    <span>{fileData.size} bytes</span>
                  </div>
                </div>

                {/* Progress Bar (optional) */}
                <div className="relative h-1 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-500 to-indigo-600"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                  />
                </div>
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </motion.div>
          </div>
        </div>
      )}
    </DialogueBase>
  );
};

<style jsx>{`
  .custom-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: rgba(99, 102, 241, 0.3) transparent;
  }
  
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: rgba(99, 102, 241, 0.3);
    border-radius: 3px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background-color: rgba(99, 102, 241, 0.5);
  }

  .file-card {
    backdrop-filter: blur(8px);
    transition: all 0.2s ease-in-out;
  }

  .file-card:hover {
    transform: translateY(-2px);
  }
`}</style>
