import { formatDate, formatFullDate } from "@/utils";
import { ColumnDef } from "@tanstack/react-table";
import TableDropdown from "../Dropdowns/TableDropdown";
import { ExternalLink, FileText } from "lucide-react";
import { FileProps } from "@/types/interfaces";
import Link from "next/link";

export const FileColumns: ColumnDef<FileProps>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return (
        <div className="min-w-[40vw] text-gray-900 font-medium flex items-center">
          <span className="mr-1">
            <FileText size={16} strokeWidth={1} />
          </span>
          {row.getValue("name")}
        </div>
      );
    },
  },
  {
    accessorKey: "size",
    header: "Size",
    cell: ({ row }) => {
      const size = row.getValue("size");
      return (
        <div className="text-xs text-gray-600">
          {size ? `${(size / 1024).toFixed(2)} KB` : "-"}
        </div>
      );
    },
  },
  {
    accessorKey: "path",
    header: "url",
    cell: ({ row }) => {
      const path = row.getValue("path");
      return (
        <div className="text-xs text-gray-500 truncate">
          <Link href={`${path}`} className="cursor-pointer" target="_blank">
            <span>
              <ExternalLink size={16} strokeWidth={1} />
            </span>
          </Link>
        </div>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Uploaded",
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
    header: "Modified",
    cell: ({ row }) => {
      const updatedAt = row.getValue("updated_at");
      return (
        <div
          className="text-xs text-gray-500 truncate cursor-pointer"
          title={updatedAt ? formatFullDate(updatedAt) : "-"}
        >
          {updatedAt ? formatDate(updatedAt) : "-"}
        </div>
      );
    },
  },
  {
    accessorKey: "transcriptions",
    header: "Transcriptions",
    cell: ({ row }) => {
      const transcriptions = row.getValue("transcriptions");
      return (
        <div className="text-xs text-gray-600">
          {transcriptions.length > 0
            ? `${transcriptions.length} transcription(s)`
            : "No transcriptions"}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const item = row.original;
      return <TableDropdown item={item} />;
    },
  },
];
