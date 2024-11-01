"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  FileIcon,
  CalendarIcon,
  HashIcon,
  GlobeIcon,
  FileEditIcon,
  Trash2Icon,
} from "lucide-react";
import Link from "next/link";

interface FileDetailSheetProps {
  isOpen: boolean;
  onClose: () => void;
  file: any;
  onEdit: (fileId: string, projectId: string, data: any) => void;
  onDelete: () => void;
}

export default function FileDetailSheet({
  isOpen,
  onClose,
  file,
  onEdit,
  onDelete,
}: FileDetailSheetProps) {
  const [editMode, setEditMode] = useState(false);
  const [editedFile, setEditedFile] = useState(file);

  const handleEdit = () => {
    onEdit(file.id, file.project_id, editedFile);
    setEditMode(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const MotionButton = motion(Button);

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-[600px] p-0 bg-white  m-2  h-[calc(100vh-16px)] overflow-x-hidden overflow-y-auto shadow-sm w-[370px] max-w-[373px] sm:max-w-[400px] shadow-xl rounded-2xl">
        <ScrollArea className="h-full">
          <div className="space-y-4">
            <div className="flex items-center justify-between px-4 pt-10">
              <h2 className=" font-bold text-gray-400">File Details</h2>
              <AnimatePresence mode="wait">
                {editMode ? (
                  <motion.div
                    key="edit-actions"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-x-2 text-sm p-1 h-8"
                  >
                    <MotionButton
                      variant="outline"
                      size={"sm"}
                      onClick={() => setEditMode(false)}
                      whileHover={{ scale: 1.05 }}
                      className="space-x-2 text-sm h-8"
                    >
                      Cancel
                    </MotionButton>
                    <MotionButton
                      size={"sm"}
                      onClick={handleEdit}
                      whileHover={{ scale: 1.05 }}
                      className="text-sm  h-8"
                    >
                      Save
                    </MotionButton>
                  </motion.div>
                ) : (
                  <motion.div
                    key="view-actions"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-x-2 text-sm h-8"
                  >
                    <MotionButton
                      variant="outline"
                      onClick={() => setEditMode(true)}
                      whileHover={{ scale: 1.05 }}
                      className="space-x-2 text-sm h-8"
                    >
                      <FileEditIcon className="w-4 h-4 mr-2" />
                      Edit
                    </MotionButton>
                    <MotionButton
                      variant="destructive"
                      onClick={onDelete}
                      whileHover={{ scale: 1.05 }}
                      className="space-x-2 text-sm h-8"
                    >
                      <Trash2Icon className="w-4 h-4 mr-2" />
                      Delete
                    </MotionButton>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Separator className="bg-gray-100" />

            <div className="flex flex-col px-2">
              <div className="space-y-4">
                <div>
                  {editMode ? (
                    <Input
                      id="name"
                      value={editedFile.name}
                      onChange={(e) =>
                        setEditedFile({ ...editedFile, name: e.target.value })
                      }
                      className="mt-1 bg-gray-800 border-gray-700 text-white"
                    />
                  ) : (
                    <p className="mt-1 text-sm font-semibold">{file.name}</p>
                  )}
                </div>
                <div className="flex flex-wrap gap-1">
                  <div className="w-full">
                    <audio src={file.path} controls className="w-full"></audio>
                  </div>
                </div>
              </div>
              <div className="space-y-4 px-2 py-4">
                <div className="flex items-center space-x-2">
                  <GlobeIcon className="w-5 h-5 text-gray-400" />
                  <div className="flex items-center gap-1">
                    <Label className="text-gray-400">Project ID</Label>
                    <p className="text-sm text-gray-300">{file.project_id}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <CalendarIcon className="w-5 h-5 text-gray-400" />
                  <div className="flex items-center gap-1">
                    <Label className="text-gray-400">Created At</Label>
                    <p className="text-sm text-gray-300">
                      {formatDate(file.created_at)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <CalendarIcon className="w-5 h-5 text-gray-400" />
                  <div className="flex items-center gap-1">
                    <Label className="text-gray-400">Updated At</Label>
                    <p className="text-sm text-gray-300">
                      {file.updated_at ? formatDate(file.updated_at) : "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="bg-gray-100" />

            <div>
              <h3 className=" font-semibold mb-4 px-4 text-gray-400">
                Transcriptions
              </h3>
              <div className="space-y-4 px-2">
                {file.transcriptions.map((transcription: any) => (
                  <motion.div
                    key={transcription.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-gray-50 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      {/* <span className="text-sm font-medium text-gray-400">
                        ID: {transcription.id}
                      </span> */}
                      <span className="text-sm font-medium text-gray-400">
                        language: {transcription.language || "N/A"}
                      </span>
                    </div>
                    <details>
                      <summary className="cursor-pointer text-gray-400 hover:text-gray-300 transition-colors">
                        view transcription
                      </summary>
                      <pre className="mt-2 text-xs whitespace-pre-wrap  p-2 rounded-xl bg-gray-100">
                        {transcription.transcription_text}
                      </pre>
                    </details>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
