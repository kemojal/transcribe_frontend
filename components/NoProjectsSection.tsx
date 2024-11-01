import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ReactNode } from "react";
import { ProjectDialogue } from "./Dialogues/ProjectDialogue";

export default function NoProjectsSection({
  addProjectButton,
}: {
  onAddProject: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center  p-6 ">
      <div className="relative mb-10 w-72 min-h-[360px]">
        {/* Top right card */}
        <Card className="absolute left-0 top-0 w-52 h-60 bg-background shadow-xl rounded-3xl p-6 transition-transform transform hover:scale-105">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-primary/10" />
            <div className="h-3 w-28 bg-muted rounded-md" />
          </div>
          <div className="space-y-3">
            <div className="h-3 w-36 bg-muted rounded-md" />
            <div className="h-3 w-full bg-muted rounded-md" />
          </div>
          <div className="flex gap-3 mt-6">
            <div className="h-3 w-10 bg-muted rounded-md" />
            <div className="h-3 w-10 bg-muted rounded-md" />
            <div className="h-3 w-10 bg-muted rounded-md" />
          </div>
        </Card>

        {/* Bottom left card */}
        <Card className="absolute left-28 top-32 bottom-0 w-52 h-60 bg-background shadow-xl rounded-3xl p-6 transition-transform transform hover:scale-105">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-primary/10" />
            <div className="h-3 w-28 bg-muted rounded-md" />
          </div>
          <div className="space-y-3">
            <div className="h-3 w-36 bg-muted rounded-md" />
            <div className="h-3 w-full bg-muted rounded-md" />
          </div>
          <div className="flex gap-3 mt-6">
            <div className="h-3 w-10 bg-muted rounded-md" />
            <div className="h-3 w-10 bg-muted rounded-md" />
            <div className="h-3 w-10 bg-muted rounded-md" />
          </div>
        </Card>
      </div>

      {/* Title */}
      <h2 className="text-xl font-bold text-center mb-2 text-gray-800">
        Create space to start sharing files in this Space
      </h2>

      {/* Description */}
      <p className="text-muted-foreground text-center mb-6 max-w-lg text-sm">
        Add files directly here or from the My Library page to make the most of
        your Space.
      </p>

      {/* Button */}
      {/* <Button
        size="lg"
        className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 text-lg rounded-full transition-transform transform hover:scale-105"
      >
        <Plus className="w-5 h-5 mr-2" />
        Add Video
      </Button> */}
      {addProjectButton}
      {/* <ProjectDialogue addProjectButton={handleAddProject} /> */}
    </div>
  );
}
