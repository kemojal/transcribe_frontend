"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { BASEURL } from "@/constants";

const TranscriptionDetail = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const [transcription, setTranscription] = useState<any>(null);

  useEffect(() => {
    if (id) {
      const fetchTranscription = async () => {
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get(
            `${BASEURL}/transcriptions/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setTranscription(response.data);
        } catch (error) {
          console.error(error);
        }
      };

      fetchTranscription();
    }
  }, [id]);

  if (!transcription) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container px-4 py-8 mx-auto">
        <h1 className="text-3xl font-bold text-center">
          {transcription.original_filename}
        </h1>
        <div className="p-4 mt-8 bg-white rounded shadow-md">
          <h2 className="text-xl font-bold">Transcribed Text</h2>
          <p>{transcription.transcription_text}</p>
        </div>
      </div>
    </div>
  );
};

export default TranscriptionDetail;
