import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/remix-dropdown-menu";
// "@/components/ui/dropdown-menu";
import { Box, Copy, Ellipsis, MoreHorizontal, Pencil, SquarePen, Trash } from "lucide-react";
import { Button } from "../ui/button";

export const ProjectDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className="flex items-center gap-2">
          <Box className="w-4 h-4" />
          Workspace Actions
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <Copy className="mr-2 h-4 w-4" />
          <span>Copy shared link</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <Pencil className="mr-2 h-4 w-4" />
          <span>Edit</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer text-red-600">
          <Trash className="mr-2 h-4 w-4" />
          <span>Remove</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
