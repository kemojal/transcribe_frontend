import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Copy, Ellipsis, SquarePen, Trash } from "lucide-react";

export const ProjectDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {" "}
        <Ellipsis size={20} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-2">
        <DropdownMenuLabel>Project Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer gap-2 ">
          <span>
            <Copy size={16} />
          </span>
          Copy shared link
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer gap-2 ">
          <span>
            <SquarePen size={16} />
          </span>
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer gap-2 ">
          <span>
            <Trash size={16} />
          </span>
          Remove
        </DropdownMenuItem>
        {/* <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
