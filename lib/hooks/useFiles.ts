import { useCallback, useRef } from "react";
import { useAppDispatch, useAppSelector } from "./useAppState";
import { api } from "../store/api";
import {
  setCurrentFile,
  setFilters,
  setPagination,
  setUploadProgress,
  setMetadata,
  clearFilters,
  setError,
  setLoading,
} from "../store/slices/fileSlice";
import { useCurrentProject } from "./useAppState";

export const useFiles = () => {
  const dispatch = useAppDispatch();
  const currentProject = useCurrentProject();
  const files = useAppSelector((state) => state.files);
  const uploadProgress = useAppSelector((state) => state.files.uploadProgress);
  const uploadController = useRef<AbortController | null>(null);

  const fetchFiles = useCallback(async () => {
    if (!currentProject?.id) return;

    try {
      dispatch(setLoading(true));
      const result = await dispatch(
        api.endpoints.getFiles.initiate(currentProject.id)
      ).unwrap();
      dispatch(
        setMetadata({
          totalSize: result.reduce((sum, file) => sum + file.size, 0),
          totalDuration: result.reduce(
            (sum, file) => sum + (file.duration || 0),
            0
          ),
          formats: result.reduce((acc, file) => {
            acc[file.format] = (acc[file.format] || 0) + 1;
            return acc;
          }, {} as Record<string, number>),
        })
      );
    } catch (error) {
      dispatch(
        setError(
          error instanceof Error ? error.message : "Failed to fetch files"
        )
      );
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, currentProject?.id]);

  const fetchFile = useCallback(
    async (fileId: string) => {
      if (!currentProject?.id) return;

      try {
        dispatch(setLoading(true));
        const result = await dispatch(
          api.endpoints.getFile.initiate({
            projectId: currentProject.id,
            fileId,
          })
        ).unwrap();
        dispatch(setCurrentFile(result));
      } catch (error) {
        dispatch(
          setError(
            error instanceof Error ? error.message : "Failed to fetch file"
          )
        );
        throw error;
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch, currentProject?.id]
  );

  const uploadFile = useCallback(
    async (file: File) => {
      if (!currentProject?.id) return;

      try {
        // Cancel any ongoing upload
        if (uploadController.current) {
          uploadController.current.abort();
        }
        uploadController.current = new AbortController();

        const formData = new FormData();
        formData.append("file", file);

        dispatch(setUploadProgress(0));
        const result = await dispatch(
          api.endpoints.uploadFile.initiate(
            {
              projectId: currentProject.id,
              file: formData,
            },
            {
              signal: uploadController.current.signal,
              onUploadProgress: (progressEvent) => {
                const progress = Math.round(
                  (progressEvent.loaded * 100) / (progressEvent.total || 100)
                );
                dispatch(setUploadProgress(progress));
              },
            }
          )
        ).unwrap();

        dispatch(setCurrentFile(result));
        return result;
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          throw new Error("Upload cancelled");
        }
        dispatch(
          setError(
            error instanceof Error ? error.message : "Failed to upload file"
          )
        );
        throw error;
      } finally {
        dispatch(setUploadProgress(0));
        uploadController.current = null;
      }
    },
    [dispatch, currentProject?.id]
  );

  const deleteFile = useCallback(
    async (fileId: string) => {
      if (!currentProject?.id) return;

      try {
        await dispatch(
          api.endpoints.deleteFile.initiate({
            projectId: currentProject.id,
            fileId,
          })
        ).unwrap();
        dispatch(setCurrentFile(null));
      } catch (error) {
        dispatch(
          setError(
            error instanceof Error ? error.message : "Failed to delete file"
          )
        );
        throw error;
      }
    },
    [dispatch, currentProject?.id]
  );

  const cancelUpload = useCallback(() => {
    if (uploadController.current) {
      uploadController.current.abort();
      dispatch(setUploadProgress(0));
      uploadController.current = null;
    }
  }, [dispatch]);

  const updateFilters = useCallback(
    (filters: Partial<typeof files.filters>) => {
      dispatch(setFilters(filters));
    },
    [dispatch]
  );

  const updatePagination = useCallback(
    (pagination: Partial<typeof files.pagination>) => {
      dispatch(setPagination(pagination));
    },
    [dispatch]
  );

  const resetFilters = useCallback(() => {
    dispatch(clearFilters());
  }, [dispatch]);

  return {
    files: files.files,
    currentFile: files.currentFile,
    isLoading: files.isLoading,
    error: files.error,
    uploadProgress,
    filters: files.filters,
    pagination: files.pagination,
    metadata: files.metadata,
    fetchFiles,
    fetchFile,
    uploadFile,
    deleteFile,
    cancelUpload,
    updateFilters,
    updatePagination,
    resetFilters,
  };
};
