export interface TranscriptionProps {
  id: number;
  transcription_text: string;
  language: string | null;
}

export interface ProjectProps {
  name: string;
  path: string;
  id: number;
  project_id: number;
  public_id: string;
  created_at: string;
  updated_at: string | null;
  transcriptions: TranscriptionProps[];
}

export interface FileProps {
  id: string | number;
  name: string;
  path: string;
  project_id: number;
  public_id: string;
  created_at: string;
  updated_at: string | null;
  transcriptions: TranscriptionProps[];
  lastModified?: number;
  webkitRelativePath?: string;
  size?: number;
  type?: string;
}

export interface UserProps {
  username: string;
  email: string;
}

export interface ProjectDetailsProps {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  user: UserProps;
  files: FileProps[];
  transcriptions: TranscriptionProps[];
}

export interface ProjectDataProps {
  project: ProjectProps;
  files: FileProps[];
}
