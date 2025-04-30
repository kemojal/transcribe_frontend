"use client";

import { Project } from "@/types/interfaces";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, AudioLinesIcon } from "lucide-react";
import { formatDate } from "@/utils";

interface ProjectCardProps {
  project: Project;
  isSelected: boolean;
  onSelect: () => void;
}

export const ProjectCard = ({
  project,
  isSelected,
  onSelect,
}: ProjectCardProps) => {
  return (
    <Card
      className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
        isSelected ? "border-primary" : "border-border/50"
      }`}
      onClick={onSelect}
    >
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">{project.name}</CardTitle>
          <AudioLinesIcon className="h-5 w-5 text-muted-foreground" />
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <CalendarIcon className="h-4 w-4" />
          <span>{formatDate(project.created_at)}</span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          {project.description || "No description provided"}
        </p>
        <div className="flex items-center space-x-2">
          <Badge
            variant={project.status === "active" ? "default" : "secondary"}
          >
            {project.status}
          </Badge>
          <Badge variant="outline">ID: {project.id}</Badge>
        </div>
      </CardContent>
    </Card>
  );
};
