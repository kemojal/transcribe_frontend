import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/remix-dropdown-menu";
// "@/components/ui/dropdown-menu";
import { Copy, Download, Ellipsis, SquarePen, Trash } from "lucide-react";

export const TranscriptionDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="inline-flex items-center justify-center whitespace-nowrap text-xs ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md px-3 py-0 h-8 font-medium flex items-center gap-1">
        {" "}
        <Download size={15} /> Export transcript
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-2">
        <DropdownMenuLabel>Export Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer gap-2 ">
          <span>
            <Copy size={16} />
          </span>
          Copy txt
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer gap-2 ">
          <span>
            <Copy size={16} />
          </span>
          Copy srt
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer gap-2 ">
          <span>
            <Copy size={16} />
          </span>
          Save txt
        </DropdownMenuItem>

        <DropdownMenuItem className="cursor-pointer gap-2 ">
          <span>
            <Copy size={16} />
          </span>
          Save srt
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
