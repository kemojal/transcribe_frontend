"use client";

import { formatDate, formatFullDate } from "@/utils";
import { ColumnDef } from "@tanstack/react-table";
import { create } from "domain";

interface User {
  username: string;
  email: string;
}
export type ProjectProps = {
  id: string;
  name: number;
  user: User;
  created_at: string;
  lastViewed: string;
};

export const ProjectColumns: ColumnDef<ProjectProps>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return (
        <div className="min-w-[40vw] text-gray-900 font-medium">
          {row.getValue("name")}
        </div>
      );
    },
  },
  {
    accessorKey: "user",
    header: "Owner",
    cell: ({ row }) => {
      const user = row.getValue("user");
      return (
        <div className="flex items-center text-xs gap-1">
          <span className="w-6 h-6 rounded-full bg-gray-300 text-center flex items-center justify-center">
            {(user && user?.username?.substring(0, 1).toUpperCase()) || "-"}
          </span>
          <span className="text-gray-600">{(user && user?.email) || "-"}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Created",
    cell: ({ row }) => {
      const createdAt = row.getValue("created_at");
      return (
        <div
          className="text-xs text-gray-500 truncate cursor-pointer"
          title={formatFullDate(createdAt)}
        >
          {formatDate(createdAt)}
        </div>
      );
    },
  },
  {
    accessorKey: "updated_at",
    header: "Last Viewed",
    cell: ({ row }) => {
      const updatedAt = row.getValue("updated_at");
      return (
        <div
          className="text-xs text-gray-500 truncate cursor-pointer"
          title={formatFullDate(updatedAt)}
        >
          {updatedAt ? formatDate(updatedAt) : "-"}
        </div>
      );
    },
  },
];
