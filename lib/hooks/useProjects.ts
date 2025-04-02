import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "./useAppState";
import { api } from "../store/api";
import {
  setCurrentProject,
  setFilters,
  setPagination,
  clearFilters,
  setError,
  setLoading,
} from "../store/slices/projectSlice";
import { useRouter } from "next/router";

export const useProjects = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const projects = useAppSelector((state) => state.projects);

  const fetchProjects = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      await dispatch(api.endpoints.getProjects.initiate()).unwrap();
    } catch (error) {
      dispatch(
        setError(
          error instanceof Error ? error.message : "Failed to fetch projects"
        )
      );
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  const fetchProject = useCallback(
    async (projectId: string) => {
      try {
        dispatch(setLoading(true));
        const result = await dispatch(
          api.endpoints.getProject.initiate(projectId)
        ).unwrap();
        dispatch(setCurrentProject(result));
        return result;
      } catch (error) {
        dispatch(
          setError(
            error instanceof Error ? error.message : "Failed to fetch project"
          )
        );
        throw error;
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch]
  );

  const createProject = useCallback(
    async (projectData: Partial<(typeof projects.projects)[0]>) => {
      try {
        dispatch(setLoading(true));
        const result = await dispatch(
          api.endpoints.createProject.initiate(projectData)
        ).unwrap();
        dispatch(setCurrentProject(result));
        router.push(`/projects/${result.id}`);
        return result;
      } catch (error) {
        dispatch(
          setError(
            error instanceof Error ? error.message : "Failed to create project"
          )
        );
        throw error;
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch, router]
  );

  const updateProject = useCallback(
    async (
      projectId: string,
      projectData: Partial<(typeof projects.projects)[0]>
    ) => {
      try {
        dispatch(setLoading(true));
        const result = await dispatch(
          api.endpoints.updateProject.initiate({
            id: projectId,
            data: projectData,
          })
        ).unwrap();
        dispatch(setCurrentProject(result));
        return result;
      } catch (error) {
        dispatch(
          setError(
            error instanceof Error ? error.message : "Failed to update project"
          )
        );
        throw error;
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch]
  );

  const deleteProject = useCallback(
    async (projectId: string) => {
      try {
        await dispatch(
          api.endpoints.deleteProject.initiate(projectId)
        ).unwrap();
        dispatch(setCurrentProject(null));
        router.push("/projects");
      } catch (error) {
        dispatch(
          setError(
            error instanceof Error ? error.message : "Failed to delete project"
          )
        );
        throw error;
      }
    },
    [dispatch, router]
  );

  const updateFilters = useCallback(
    (filters: Partial<typeof projects.filters>) => {
      dispatch(setFilters(filters));
    },
    [dispatch]
  );

  const updatePagination = useCallback(
    (pagination: Partial<typeof projects.pagination>) => {
      dispatch(setPagination(pagination));
    },
    [dispatch]
  );

  const resetFilters = useCallback(() => {
    dispatch(clearFilters());
  }, [dispatch]);

  return {
    projects: projects.projects,
    currentProject: projects.currentProject,
    isLoading: projects.isLoading,
    error: projects.error,
    filters: projects.filters,
    pagination: projects.pagination,
    fetchProjects,
    fetchProject,
    createProject,
    updateProject,
    deleteProject,
    updateFilters,
    updatePagination,
    resetFilters,
  };
};
