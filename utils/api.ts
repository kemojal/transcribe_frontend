import axios from "axios";
import { BASEURL } from "@/constants";
import { useRouter } from "next/navigation";

export const fetchProjectDetails = async (id: string) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  const response = await axios.get(`${BASEURL}/projects/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  // console.log("project Detail response = ", response.status);
  return response.data;
};

export const fetchProjectFiles = async (id: string) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }
  const response = await axios.get(`${BASEURL}/projects/${id}/files`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const handleFileUpload = async (file: File) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post(`${BASEURL}/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
