"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Transcriptions = () => {
  const router = useRouter();
  const [transcriptions, setTranscriptions] = useState([]);

  useEffect(() => {
    const fetchTranscriptions = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://127.0.0.1:8000/transcriptions",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTranscriptions(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTranscriptions();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container px-4 py-8 mx-auto">
        <h1 className="text-3xl font-bold text-center">Transcriptions</h1>

        <div className="grid gap-4 mt-8 max-w-5xl mx-auto">
          {transcriptions?.map((transcription: any) => (
            <div
              key={transcription.id}
              className="p-4 bg-white rounded-xl flex justify-between"
            >
              <div>
                <h2 className="text-xl font-bold">
                  {transcription.original_filename}
                </h2>
                <p>{transcription.transcription_text.slice(0, 100)}</p>
              </div>

              <button
                onClick={() =>
                  router.push(`/transcriptions/${transcription.id}`)
                }
                className="px-4 py-2 mt-4 font-bold text-white bg-indigo-600 rounded hover:bg-indigo-700"
              >
                View
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Transcriptions;
