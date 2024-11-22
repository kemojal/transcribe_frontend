import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash, Loader2 } from "lucide-react";
import { useState } from "react";

const DeleteButton = ({ selectedFile, onDeleteTranscription }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [open, setOpen] = useState(false);

  const handleDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDeleting(true);
    try {
      await onDeleteTranscription(selectedFile);
      // Wait for 1 second before closing the dialog
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } finally {
      setIsDeleting(false);
      setOpen(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="w-8 h-8 border-gray-100 hover:bg-gray-100 transition-colors"
        >
          <span>
            <Trash size={14} />
          </span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-[425px] p-4">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete transcription?</AlertDialogTitle>
          <AlertDialogDescription className="py-2">
            This will permanently delete the
            transcription for "{selectedFile?.name}".
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            {isDeleting ? (
              <div className="flex items-center gap-2">
                <Loader2 size={14} className="animate-spin" />
                Deleting...
              </div>
            ) : (
              "Delete"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteButton;
