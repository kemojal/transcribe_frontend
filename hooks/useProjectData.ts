import { ProjectDataProps } from "@/types/interfaces";
import { fetchProjectData } from "@/utils";
import { useQuery } from "@tanstack/react-query";

export const useProjectData = (id: string) => {
  return useQuery<ProjectDataProps, Error>({
    queryKey: ["project", id],
    queryFn: () => fetchProjectData(id),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
  });
};
