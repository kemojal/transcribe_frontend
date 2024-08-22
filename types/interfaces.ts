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
