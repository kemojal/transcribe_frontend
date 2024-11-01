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
import {
  ChartNoAxesCombined,
  Copy,
  Ellipsis,
  ExternalLink,
  FilePenLine,
  Info,
  SquarePen,
  Trash,
  UserPlus,
} from "lucide-react";
import { useState } from "react";
import DeleteConfirmModal from "../Dialogues/DeleteFile";
import { useAppDispatch } from "@/lib/hooks";
import { deleteFile, editFile } from "@/lib/reducers/fileSlice";
import FileDetailSheet from "../sheets/fileDetail";
import { FileProps } from "@/types/interfaces";
import { EditFileDialogue } from "../Dialogues/File/EditFileDialogue";

export const FileDropdown = ({ file }: FileProps) => {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteCompleted, setDeleteCompleted] = useState(false);
  const [isDetailSheetOpen, setIsDetailSheetOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const menuItems = [
    // {
    //   icon: <FilePenLine size={16} />,
    //   label: "Edit",
    //   action: () => setIsEditModalOpen(true),
    // },
    {
      icon: <Info size={16} />,
      label: "Detail",
      action: () => setIsDetailSheetOpen(true),
    },
    { icon: <SquarePen size={16} />, label: "Edit", disable: true },
    {
      icon: <ChartNoAxesCombined size={16} />,
      label: "Analytics",
      action: () => {
        setDeleteModalOpen(true);
      },
    },
    {
      icon: <Trash size={16} />,
      label: "Delete",
      action: () => {
        setDeleteModalOpen(true);
      },
    },
    { icon: <UserPlus size={16} />, label: "File Access", disable: true },
  ];

  const dispatch = useAppDispatch();

  const handleDeleteConfirm = async (fileId: string, projectId: string) => {
    try {
      await dispatch(
        deleteFile({ projectId: file.project_id, fileId: file.id })
      ).unwrap();
      setDeleteModalOpen(false);
      setDeleteCompleted(true);
      // Optionally, you can show a success message here
    } catch (error) {
      console.error("Error deleting file:", error);
      // Optionally, you can show an error message here
      setDeleteModalOpen(false);
      // setDeleteCompleted(true);
    }
  };

  const handleEditFile = async (
    fileId: string,
    projectId: string,
    data: any
  ) => {
    try {
      await dispatch(
        editFile({ projectId: file.project_id, fileId: file.id, data })
      ).unwrap();
      // Optionally, you can show a success message here
    } catch (error) {
      console.error("Error editing file:", error);
      // Optionally, you can show an error message here
    }
  };

  // const handleDeleteConfirm = async () => {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     alert("No token found. Please log in.");
  //     return;
  //   }

  //   try {
  //     const response = await fetch(
  //       `http://127.0.0.1:8000/projects/${file.project_id}/files/${file.id}`,
  //       {
  //         method: "DELETE",
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     if (response.ok) {
  //       // alert("File deleted successfully");
  //       setDeleteCompleted(true);
  //       // Optionally, trigger a callback to refresh the file list
  //     } else {
  //       alert("Failed to delete the file");
  //     }
  //   } catch (error) {
  //     console.error("Error deleting file:", error);
  //     alert("An error occurred. Please try again later.");
  //   } finally {
  //     setDeleteModalOpen(false);
  //   }
  // };

  return (
    <>
      <DropdownMenu isOpen={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Ellipsis size={20} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-2  ">
          <DropdownMenuLabel>File Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsDropdownOpen(false);
            }}
          >
            <EditFileDialogue fileData={file} />
          </DropdownMenuItem>
          {menuItems.map((item, index) => (
            <DropdownMenuItem
              disabled={item.disable}
              key={index}
              className="cursor-pointer gap-2 flex flex items-center justify-between"
              onClick={(e) => {
                e.preventDefault();
                item?.action && item?.action();
                setIsDropdownOpen(false);
              }}
            >
              <div className="flex items-center gap-1">
                <span>{item.icon}</span>
                {item.label}
              </div>
              <div>
                <ExternalLink size={16} />
              </div>
            </DropdownMenuItem>
          ))}

          <DropdownMenuItem
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsDropdownOpen(true);
            }}
          >
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
      {}
      <FileDetailSheet
        isOpen={isDetailSheetOpen}
        onClose={() => setIsDetailSheetOpen(false)}
        file={file}
        onEdit={handleEditFile}
        onDelete={() => {
          setIsDetailSheetOpen(false);
          setDeleteModalOpen(true);
        }}
      />
    </>
  );
};
