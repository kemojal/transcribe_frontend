import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BASEURL } from "@/constants";
import { Pen } from "lucide-react";
import { DialogueBase } from "./DialogueBase";
import { updateProject } from "@/lib/reducers/ProjectSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useToast } from "@/components/ui/use-toast";

interface EditProjectDialogueProps {
  projectId: string;
}

export const EditProjectDialogue = ({
  projectId,
}: EditProjectDialogueProps) => {
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [open, setOpen] = useState(false);

  const dispatch = useAppDispatch();
  const { projects } = useAppSelector((state) => state.project);
  const { toast } = useToast();

  useEffect(() => {
    if (!projectId || !open) return;

    const project = projects.find((p) => p.id === parseInt(projectId, 10));
    if (project) {
      setName(project.name);
    } else {
      console.log("Project not found:", { projectId, projects });
      toast({
        title: "Error",
        description: "Project not found",
        variant: "destructive",
      });
      setOpen(false);
    }
  }, [projectId, projects, open, toast]);

  const handleSubmit = async (e: React.FormEvent | React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!projectId) {
      toast({
        title: "Error",
        description: "Invalid project ID",
        variant: "destructive",
      });
      return;
    }

    if (!name.trim()) {
      toast({
        title: "Error",
        description: "Project name cannot be empty",
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
        setSubmitting(false);
        return;
      }

      const response = await fetch(`${BASEURL}/projects/${projectId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: name.trim() }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to update project");
      }

      const data = await response.json();
      dispatch(updateProject(data));

      toast({
        title: "Success",
        description: "Project updated successfully",
        variant: "default",
      });

      setTimeout(() => {
        setSubmitting(false);
        setOpen(false);
      }, 1000);
    } catch (error) {
      console.error("Update operation failed:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to update project",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <DialogueBase
      trigger={
        <div className="w-full flex items-center gap-2 px-3 py-2 text-sm transition-colors">
          <Pen className="h-4 w-4 text-muted-foreground" />
          Edit Project
        </div>
      }
      triggerStyle="w-full text-left flex items-center gap-2 text-sm transition-colors hover:bg-primary/5 cursor-pointer focus:bg-primary/5 focus:outline-none"
      title="Edit Project"
      description="Update your project name"
      open={open}
      setOpen={setOpen}
      footerButton={null}
    >
      <form onSubmit={handleSubmit} className="space-y-6 p-1">
        <div className="space-y-2">
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter project name"
            className="w-full transition-colors bg-background/50 border border-border/50 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 rounded-md"
            required
            disabled={submitting}
          />
        </div>

        <div className="flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(false);
            }}
            disabled={submitting}
            className="bg-background/50 border-border/50 hover:bg-primary/5"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={submitting || !name.trim()}
            className="bg-primary/90 hover:bg-primary text-primary-foreground shadow-sm transition-all duration-200"
          >
            {submitting ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-background/50 border-t-primary-foreground" />
                <span>Updating...</span>
              </div>
            ) : (
              "Update Project"
            )}
          </Button>
        </div>
      </form>
    </DialogueBase>
  );
};
