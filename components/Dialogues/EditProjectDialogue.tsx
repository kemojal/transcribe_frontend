"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { BASEURL } from "@/constants";
import Loader from "../Loader";
import { Pen } from "lucide-react";
import { DialogueBase } from "./DialogueBase";

import {
  fetchProjects,
  addProject,
  updateProject,
  deleteProject,
  // Project,
} from "@/lib/reducers/ProjectSlice";
import { ProjectProps } from "@/types/interfaces";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

export const EditProjectDialogue = ({
  item,
  // onUpdateProject
}) => {
  const [name, setName] = useState(item?.name || "");
  const [submitting, setSubmitting] = useState(false);
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const dispatch = useAppDispatch();
  const { projects, isLoading, error } = useAppSelector(
    (state) => state.project
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      const response = await fetch(`${BASEURL}/projects/${item.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setSubmitting(false);
      setOpen(false);

      // console.log("Project updated:", data);

      dispatch(updateProject(data));
      //   onUpdateProject(data);
      // Optionally, you can navigate to the updated project page
      // router.push(`/projects/${data.id}`);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      setOpen(false);
      setSubmitting(false);
    }
  };

  return (
    // <Dialog open={open} onOpenChange={setOpen}>
    //   <DialogTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-8 px-4 ">
    //     <span className="w-6 h-6 flex items-center justify-center text-gray-500 mr-2 rounded-xl bg-gray-100">
    //       <Pen className=" h-3 w-3" />
    //     </span>
    //     Rename project
    //   </DialogTrigger>
    //   <DialogContent className="overflow-hidden py-8 px-4">
    //     <DialogHeader className="border-b-1 border-gray-200">
    //       <DialogTitle>Edit Project</DialogTitle>
    //       <DialogDescription>Update your project name</DialogDescription>
    //     </DialogHeader>
    //     <form onSubmit={handleSubmit} className="p-2 space-y-4">
    //       <div className="mb-4">
    //         <label
    //           htmlFor="name"
    //           className="block text-sm font-medium text-gray-700"
    //         >
    //           Name
    //         </label>
    //         <Input
    //           type="text"
    //           id="name"
    //           name="name"
    //           value={name}
    //           onChange={(e) => setName(e.target.value)}
    //           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
    //           required
    //           disabled={submitting}
    //         />
    //       </div>
    //       <Button type="submit" className="mt-4" onClick={handleSubmit}>
    //         {submitting ? "Updating Project..." : "Update Project"}
    //       </Button>
    //     </form>
    //     {submitting && (
    //       <div className="absolute inset-0 flex items-center justify-center">
    //         <Loader />
    //       </div>
    //     )}
    //   </DialogContent>
    // </Dialog>
    <DialogueBase
      trigger={
        <>
          <span className="w-6 h-6 flex items-center justify-center text-gray-500 mr-2 rounded-xl bg-gray-100">
            <Pen className="h-3 w-3" />
          </span>
          Edit project
        </>
      }
      triggerStyle="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm   transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 !bg-transparent text-gray-500 "
      title="Edit Project"
      description="Update your project name"
      open={open}
      setOpen={setOpen}
      footerButton={
        <>
          <Button
            type="submit"
            className="mt-4"
            disabled={submitting}
            onClick={handleSubmit}
          >
            {submitting ? "Updating Project..." : "Update Project"}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="p-2 space-y-4">
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <Input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
            disabled={submitting}
          />
        </div>
        {/* <Button type="submit" className="mt-4" disabled={submitting}>
          {submitting ? "Updating Project..." : "Update Project"}
        </Button> */}
      </form>
      {submitting && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader />
        </div>
      )}
    </DialogueBase>
  );
};
