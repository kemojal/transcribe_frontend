"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/remix-dropdown-menu";
// "@/components/ui/remix-dropdown-menu"
import { Copy, Ellipsis, Info, SquarePen, Trash, UserPlus } from "lucide-react";
import { useState } from "react";
import DeleteConfirmModal from "../Dialogues/DeleteFile";

export const FileDropdown = ({ file }) => {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteCompleted, setDeleteCompleted] = useState(false);
  const menuItems = [
    { icon: <Info size={16} />, label: "Detail" },
    { icon: <SquarePen size={16} />, label: "Edit" },
    {
      icon: <Trash size={16} />,
      label: "Delete",
      action: () => {
        setDeleteModalOpen(true);
      },
    },
    { icon: <UserPlus size={16} />, label: "File Access" },
  ];

  const handleDeleteConfirm = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No token found. Please log in.");
      return;
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/projects/${file.project_id}/files/${file.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        // alert("File deleted successfully");
        setDeleteCompleted(true);
        // Optionally, trigger a callback to refresh the file list
      } else {
        alert("Failed to delete the file");
      }
    } catch (error) {
      console.error("Error deleting file:", error);
      alert("An error occurred. Please try again later.");
    } finally {
      setDeleteModalOpen(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Ellipsis size={20} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-2 text-sm">
        <DropdownMenuLabel>File Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {menuItems.map((item, index) => (
          <DropdownMenuItem
            key={index}
            className="cursor-pointer gap-2"
            onClick={(e) => {
              e.preventDefault();
              item?.action && item?.action();
            }}
          >
            <span>{item.icon}</span>
            {item.label}
          </DropdownMenuItem>
        ))}

        <DropdownMenuItem>
          <DeleteConfirmModal
            isOpen={isDeleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
            onConfirm={handleDeleteConfirm}
            file={file}
            deleteCompleted={deleteCompleted}
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
