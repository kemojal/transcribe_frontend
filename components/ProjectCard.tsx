import { Project } from "@/lib/store/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, FileText } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  isSelected: boolean;
}

export const ProjectCard = ({ project, isSelected }: ProjectCardProps) => {
  return (
    <Card
      className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
        isSelected ? "border-primary" : ""
      }`}
    >
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{project.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {new Date(project.createdAt).toLocaleDateString()}
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {project.status}
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            <FileText className="w-3 h-3" />
            {project.id}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};
