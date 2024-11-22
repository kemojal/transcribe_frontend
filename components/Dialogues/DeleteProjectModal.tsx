import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import { DialogueBase } from "./DialogueBase";

import { deleteProject } from "@/lib/reducers/ProjectSlice";
import { useAppDispatch } from "@/lib/hooks";
import { BASEURL } from "@/constants";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "../ui/toast";

export const DeleteProjectModal = ({ item }) => {
  const [open, setOpen] = useState(false);
  const [confirmationText, setConfirmationText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useAppDispatch();

  const inputRef = useRef(null);
  const { toast } = useToast();


  const handleDelete = async () => {
    setSubmitting(true);

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      setSubmitting(false); // Make sure to reset submitting state
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

      toast({
        variant: "destructive",
        title: "Deleted successfully",
        description: `${item.name} is permanently deleted successfully`,
        // action: <ToastAction altText="undo">Undo</ToastAction>,
      });

      setTimeout(() => {
        setSubmitting(false);
        setOpen(false);
      }, 1000);

      dispatch(deleteProject(item.id));
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      setSubmitting(false);
    }
  };

  return (
    <DialogueBase
      trigger={
        <>
          <span className="w-6 h-6 flex items-center justify-center text-gray-500 mr-2 rounded-xl bg-gray-100">
            <Trash2 className="h-3 w-3" />
          </span>
          Delete
        </>
      }
      title="Delete Workspace"
      triggerStyle="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 !bg-transparent text-gray-500 "
      description={`Type "Delete ${item.name}" to confirm.`}
      open={open}
      setOpen={setOpen}
      footerButton={
        <div className="mt-6 flex justify-end space-x-4">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={submitting}
            type="button"
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            // disabled={confirmationText !== `Delete ${item.name}` || submitting}
          >
            {submitting ? "Deleting..." : "Delete"}

            {}
          </Button>
        </div>
      }
    >
      <div className="mt-4">
        <Input
          type="text"
          placeholder={`Delete ${item.name}`}
          value={confirmationText}
          ref={inputRef}
          onChange={(e) => {
            console.log(e.target.value);
            setConfirmationText(e.target.value);
          }}
          disabled={submitting}
          required
        />
      </div>
    </DialogueBase>
  );
};
