import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  MoreHorizontal,
  Settings,
  Archive,
  Star,
  Share2,
  Trash2,
} from "lucide-react";
import { EditProjectDialogue } from "../Dialogues/EditProjectDialogue";
import { DeleteProjectModal } from "../Dialogues/DeleteProjectModal";
import { motion } from "framer-motion";
import { toast } from "sonner";
import React, { useState } from "react";
import { ProjectProps } from "@/types/interfaces";

interface TableDropdownProps {
  item: ProjectProps;
  onArchive?: (id: string) => Promise<void>;
  onFavorite?: (id: string) => Promise<void>;
  onShare?: (id: string) => Promise<void>;
}

const TableDropdown = ({
  item,
  onArchive,
  onFavorite,
  onShare,
}: TableDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState<string | null>(null);

  const projectId = item.id.toString();

  const handleAction = async (
    e: React.MouseEvent,
    action: string,
    handler?: (id: string) => Promise<void>
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (!handler) return;

    setLoading(action);
    try {
      await handler(projectId);
      toast.success(`Project ${action.toLowerCase()}d successfully`);
    } catch (error) {
      toast.error(`Failed to ${action.toLowerCase()} project`);
    } finally {
      setLoading(null);
    }
  };

  const menuItemClass =
    "flex items-center gap-2 px-3 py-2 text-sm transition-colors hover:bg-primary/5 cursor-pointer focus:bg-primary/5 focus:outline-none";
  const iconClass = "h-4 w-4 text-muted-foreground";

  return (
    <div className="relative" onClick={(e) => e.stopPropagation()}>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="h-8 w-8 p-0 bg-background/80 hover:bg-primary/5 focus:bg-primary/5 transition-colors rounded-xl"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <motion.div
              animate={{ rotate: isOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
            </motion.div>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="w-48 bg-background/80 backdrop-blur-xl border border-border/50 shadow-lg rounded-lg overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="py-1"
          >
            <div onClick={(e) => e.stopPropagation()}>
              <EditProjectDialogue projectId={projectId} />
            </div>

            <DropdownMenuItem
              className={menuItemClass}
              onClick={(e) => handleAction(e, "Archive", onArchive)}
            >
              {loading === "Archive" ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              ) : (
                <Archive className={iconClass} />
              )}
              Archive Project
            </DropdownMenuItem>

            <DropdownMenuItem
              className={menuItemClass}
              onClick={(e) => handleAction(e, "Favorite", onFavorite)}
            >
              {loading === "Favorite" ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              ) : (
                <Star className={iconClass} />
              )}
              Add to Favorites
            </DropdownMenuItem>

            <DropdownMenuItem
              className={menuItemClass}
              onClick={(e) => handleAction(e, "Share", onShare)}
            >
              {loading === "Share" ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              ) : (
                <Share2 className={iconClass} />
              )}
              Share Project
            </DropdownMenuItem>

            <DropdownMenuSeparator className="my-1 border-border/50" />

            <div onClick={(e) => e.stopPropagation()}>
              <DeleteProjectModal projectId={projectId} />
            </div>
          </motion.div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default TableDropdown;
