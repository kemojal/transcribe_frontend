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
import { bytesToMegabytes } from "@/utils";

export const FileDialogue = ({ id }) => {
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [open, setOpen] = React.useState(false);

  const [acceptedFiles, setAcceptedFiles] = useState<any[]>([]);

  const router = useRouter();

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    setSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }
      const response = await fetch(`${BASEURL}/projects/${id}/files`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload file");
      } else {
        setOpen(false);
      }

      console.log("responseXXX = ", response);

      const data = await response.json();
      console.log("File uploaded successfully:", data);
    } catch (error) {
      console.error("Error uploading file:", error);
    }

    setSubmitting(false);
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
            Upload your content to transcribe.
          </DialogDescription>
        </DialogHeader>

        {acceptedFiles && acceptedFiles.length > 0 ? (
          <div>
            <div className="flex items-center">
              {acceptedFiles.map((file) => (
                <div
                  key={file.name}
                  className="flex items-center gap-2 justify-between  w-full"
                >
                  <div className="flex items-center gap-2">
                    <span className=" ">{file.name}</span>
                    <span className="text-gray-500 bg-gray-100 px-2 py-1 rounded-md text-xs">
                      {bytesToMegabytes(file.size)} MB
                    </span>
                    <span className="text-gray-500 bg-gray-100 px-2 py-1 rounded-md text-xs">
                      {file.type}
                    </span>
                  </div>

                  <Button
                    onClick={() => {
                      handleUpload(acceptedFiles[0]);
                    }}
                  >
                    Upload
                  </Button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <FileDropzone setAcceptedFiles={setAcceptedFiles} />
        )}

        {submitting && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-xl opacity-50">
            Uploading... audio
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
