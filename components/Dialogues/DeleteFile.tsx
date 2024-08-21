"use client";
import { FC, useState } from "react";
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
import { Loader } from "lucide-react";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  file: any;
  deleteCompleted: boolean;
}

const DeleteConfirmModal: FC<DeleteConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  file,
  deleteCompleted,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        {deleteCompleted ? (
          <AlertDialogHeader>
            <AlertDialogTitle>
              "{file.name} deleted successfully"
            </AlertDialogTitle>
          </AlertDialogHeader>
        ) : (
          <>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete forever ?</AlertDialogTitle>
            </AlertDialogHeader>
            <p className="text-gray-500 text-sm">
              <span className="">"{file.name}"</span> will be deleted forever
              and you won't be able to recover it.
            </p>
            <AlertDialogFooter>
              <AlertDialogCancel
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onClose();
                }}
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onConfirm();
                  setIsDeleting(true);
                }}
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                {isDeleting ? (
                  <>
                    <Loader className="animate-spin" size={16} />
                    Deleting...
                  </>
                ) : (
                  "Delete forever"
                )}
              </AlertDialogAction>

              {/* <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Delete
          </Button> */}
            </AlertDialogFooter>
          </>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteConfirmModal;
