"use client";

import { useEffect, useState } from "react";
import { useProjects } from "@/lib/hooks/useProjects";
import { useUI } from "@/lib/hooks/useUI";
import Loader from "@/components/Loader";
import { ProjectCard } from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Project } from "@/types/interfaces";

const ProjectList = () => {
  const { projects, isLoading, error } = useProjects();
  const { addNotification } = useUI();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    if (error) {
      addNotification({
        id: Date.now().toString(),
        type: "error",
        message: "Failed to load projects",
        duration: 5000,
      });
    }
  }, [error, addNotification]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Projects</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {projects?.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            isSelected={selectedProject?.id === project.id}
            onSelect={() => setSelectedProject(project)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectList;
