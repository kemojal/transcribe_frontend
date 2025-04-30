"use client";

import { formatDate, formatFullDate } from "@/utils";
import { ColumnDef } from "@tanstack/react-table";
import { Box } from "lucide-react";
import type { Project } from "@/lib/store/types";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

export const ProjectColumns: ColumnDef<Project>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return (
        <div className="min-w-[40vw] text-gray-900 font-medium flex items-center">
          <span className="mr-1">
            <Box size={16} strokeWidth={1} />
          </span>
          {row.getValue("name")}
        </div>
      );
    },
  },
  {
    accessorKey: "user",
    header: "Members",
    cell: ({ row }) => {
      return (
        <div className="flex items-center text-xs gap-1">
          <span className="flex items-center gap-1">1 Member</span>
        </div>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Created",
    cell: ({ row }) => {
      const createdAt = row.getValue("created_at") as string;
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
      const updatedAt = row.getValue("updated_at") as string | null;
      return (
        <div
          className="text-xs text-gray-500 truncate cursor-pointer"
          title={updatedAt ? formatFullDate(updatedAt) : ""}
        >
          {updatedAt ? formatDate(updatedAt) : "-"}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const item = row.original;
      return (
        <div className="flex items-center justify-end">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
];
