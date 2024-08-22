"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/remix-dropdown-menu";
// "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pen, Trash2, UserPlus } from "lucide-react";
import React, { useState } from "react";
import { EditProjectDialogue } from "../Dialogues/EditProjectDialogue";
import { DeleteProjectModal } from "../Dialogues/DeleteProjectModal";

const TableDropdown = ({ item,  }) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  return (
    <div className="">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="h-8 w-8 p-0"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsEditDialogOpen(true);
              // navigator.clipboard.writeText(item.id);
            }}
          >
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsEditDialogOpen(false);
              // navigator.clipboard.writeText(item.id);
            }}
          >
            {/* <span className="w-6 h-6 flex items-center justify-center text-gray-500 mr-2 rounded-xl bg-gray-100">
              <Pen className=" h-3 w-3" />
            </span>
            Rename Project */}
            <EditProjectDialogue item={item} />
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem disabled>
            <span className="w-6 h-6 flex items-center justify-center text-gray-500 mr-2 rounded-xl bg-gray-100">
              <UserPlus className=" h-3 w-3" />
            </span>
            Project access
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span className="w-6 h-6 flex items-center justify-center text-gray-500 mr-2 rounded-xl bg-gray-100">
              <Trash2 className=" h-3 w-3" />
            </span>
            {/* <DeleteProjectModal
              item={item}
              // onDeleteProject={onDeleteProject}
            /> */}
            Delete Project
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default TableDropdown;
