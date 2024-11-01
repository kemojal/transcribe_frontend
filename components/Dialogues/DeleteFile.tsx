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
import { Loader, Trash2 } from "lucide-react";

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
            <AlertDialogHeader className="w-full px-8 border-b-[0.5px] border-gray-100">
              <AlertDialogTitle>Delete forever ?</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogDescription className="w-full flex flex-col px-8">
              <div className="w-full flex flex-col items-center w-full">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center">
                  <span>
                    <Trash2 size={30} strokeWidth={1} />
                  </span>
                </div>
              </div>
              <p className="text-gray-500 text-sm py-4 text-center">
                <span className="text-red-500 font-italic max-w-[100px] overflow-hidden ellipsis">
                  "{file.name}"
                </span>{" "}
                will be deleted forever and you won't be able to recover it.
              </p>
            </AlertDialogDescription>

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
