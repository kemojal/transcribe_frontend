import { ProjectProps } from "@/types/interfaces";

export type Project = ProjectProps;

export interface ProjectFilters {
  search: string;
  status: "all" | "active" | "inactive" | "archived";
  sortBy: "createdAt" | "name" | "status";
  sortOrder: "asc" | "desc";
}

export interface PaginationState {
  page: number;
  limit: number;
  total: number;
}

export interface ProjectState {
  projects: Project[];
  currentProject: Project | null;
  isLoading: boolean;
  error: string | null;
  filters: ProjectFilters;
  pagination: PaginationState;
}
