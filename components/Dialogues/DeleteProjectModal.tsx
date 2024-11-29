import React, { useState, useCallback } from "react";
import { DialogueBase } from "./DialogueBase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { BASEURL } from "@/constants";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { deleteProject, setCurrentProject } from "@/lib/reducers/ProjectSlice";
import { useRouter } from "next/navigation";

interface DeleteProjectModalProps {
  projectId: string;
}

export const DeleteProjectModal = ({ projectId }: DeleteProjectModalProps) => {
  const [open, setOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const router = useRouter();
  const { currentProject } = useAppSelector((state) => state.project);

  const resetState = useCallback(() => {
    setConfirmText("");
    setSubmitting(false);
    setOpen(false);
  }, []);

  const handleDelete = async (e: React.MouseEvent | React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (confirmText !== "Delete") {
      toast({
        title: "Error",
        description: "Please type 'Delete' to confirm",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast({
          title: "Error",
          description: "Authentication required",
          variant: "destructive",
        });
        resetState();
        return;
      }

      const response = await fetch(`${BASEURL}/projects/${projectId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete project");
      }

      const numericProjectId = parseInt(projectId, 10);
      dispatch(deleteProject(numericProjectId));

      if (currentProject && currentProject.id === numericProjectId) {
        dispatch(setCurrentProject(null));
        router.push("/projects");
      }

      resetState();

      toast({
        title: "Success",
        description: "Project has been permanently deleted",
        variant: "default",
      });
    } catch (error) {
      console.error("Delete operation failed:", error);
      toast({
        title: "Error",
        description: "Failed to delete project",
        variant: "destructive",
      });
      resetState();
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      resetState();
    }
    setOpen(newOpen);
  };

  return (
    <DialogueBase
      trigger={
        <div className="w-full flex items-center gap-2 px-3 py-2 text-sm transition-colors hover:bg-destructive/5 focus:bg-destructive/5 text-destructive">
          <Trash2 className="h-4 w-4" />
          Delete Project
        </div>
      }
      triggerStyle="text-destructive w-full text-left"
      title="Delete Project"
      description="Type 'Delete' to confirm. This action cannot be undone."
      open={open}
      setOpen={handleOpenChange}
    >
      <form onSubmit={handleDelete} className="space-y-6 p-1">
        <div className="space-y-2">
          <Input
            type="text"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            placeholder="Type 'Delete' to confirm"
            className="w-full transition-colors bg-background/50 border border-border/50 focus:border-destructive/50 focus:ring-1 focus:ring-destructive/20 rounded-md"
            required
            disabled={submitting}
          />
        </div>

        <div className="flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              resetState();
            }}
            disabled={submitting}
            className="bg-background/50 border-border/50 hover:bg-primary/5"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={submitting || confirmText !== "Delete"}
            className="bg-destructive/90 hover:bg-destructive text-destructive-foreground shadow-sm transition-all duration-200"
          >
            {submitting ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-background/50 border-t-destructive-foreground" />
                <span>Deleting...</span>
              </div>
            ) : (
              "Delete Project"
            )}
          </Button>
        </div>
      </form>
    </DialogueBase>
  );
};
