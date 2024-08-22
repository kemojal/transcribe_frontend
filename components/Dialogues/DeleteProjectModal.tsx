"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { BASEURL } from "@/constants";
import { Trash2 } from "lucide-react";
import { DialogueBase } from "./DialogueBase";

import { deleteProject } from "@/lib/reducers/ProjectSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

export const DeleteProjectModal = ({ item }) => {
  const [open, setOpen] = useState(false);
  const [confirmationText, setConfirmationText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const dispatch = useAppDispatch();
  const { projects, isLoading, error } = useAppSelector(
    (state) => state.project
  );

  const handleDelete = async () => {
    setSubmitting(true);

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      const response = await fetch(`${BASEURL}/projects/${item.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setSubmitting(false);
      setOpen(false);

      dispatch(deleteProject(item.id));
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      setSubmitting(false);
    }
  };

  return (
    // <Dialog open={open} onOpenChange={setOpen}>
    //   <DialogTrigger
    //     asChild
    //     onClick={(e) => {
    //       e.preventDefault();
    //       e.stopPropagation();
    //       setOpen(true);
    //     }}
    //   >
    //     <span className="w-6 h-6 flex items-center justify-center text-gray-500 mr-2 rounded-xl bg-gray-100">
    //       <Trash2 className="h-3 w-3" />
    //     </span>
    //     Delete Project
    //   </DialogTrigger>
    //   <DialogContent>
    //     <DialogHeader>
    //       <DialogTitle>Delete Project</DialogTitle>
    //       <p className="text-sm text-gray-600">
    //         Type <strong>Delete {item.name}</strong> to confirm.
    //       </p>
    //     </DialogHeader>
    //     <div className="mt-4">
    //       <Input
    //         type="text"
    //         placeholder={`Delete ${item.name}`}
    //         value={confirmationText}
    //         onChange={(e) => setConfirmationText(e.target.value)}
    //         disabled={submitting}
    //         required
    //       />
    //     </div>
    //     <div className="mt-6 flex justify-end space-x-4">
    //       <Button
    //         variant="outline"
    //         onClick={() => setOpen(false)}
    //         disabled={submitting}
    //       >
    //         Cancel
    //       </Button>
    //       <Button
    //         variant="destructive"
    //         onClick={handleDelete}
    //         disabled={confirmationText !== `Delete ${item.name}` || submitting}
    //       >
    //         {submitting ? "Deleting..." : "Delete"}
    //       </Button>
    //     </div>
    //   </DialogContent>
    // </Dialog>
    <DialogueBase
      trigger={
        <span className="w-6 h-6 flex items-center justify-center text-gray-500 mr-2 rounded-xl bg-gray-100">
          <Trash2 className="h-3 w-3" />
        </span>
      }
      title="Delete Project"
      description={`Type "Delete ${item.name}" to confirm.`}
      open={open}
      setOpen={setOpen}
      footerButton={
        <div className="mt-6 flex justify-end space-x-4">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={submitting}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={confirmationText !== `Delete ${item.name}` || submitting}
          >
            {submitting ? "Deleting..." : "Delete"}
          </Button>
        </div>
      }
    >
      <div className="mt-4">
        <Input
          type="text"
          placeholder={`Delete ${item.name}`}
          value={confirmationText}
          onChange={(e) => setConfirmationText(e.target.value)}
          disabled={submitting}
          required
        />
      </div>
      {/* <div className="mt-6 flex justify-end space-x-4">
        <Button
          variant="outline"
          onClick={() => setOpen(false)}
          disabled={submitting}
        >
          Cancel
        </Button>
        <Button
          variant="destructive"
          onClick={handleDelete}
          disabled={confirmationText !== `Delete ${item.name}` || submitting}
        >
          {submitting ? "Deleting..." : "Delete"}
        </Button>
      </div> */}
    </DialogueBase>
  );
};
