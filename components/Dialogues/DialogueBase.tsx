import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export const DialogueBase = ({
  trigger,
  triggerStyle,
  title,
  description,
  open,
  setOpen,
  //   onOpenChange,
  footerButton,
  children,
}: {
  trigger: React.ReactNode;
  triggerStyle?: string;
  title: string;
  description?: string;
  open: boolean;
  //   onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  footerButton?: React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-6 px-0 bg-red-500",
          triggerStyle
        )}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen(true);
        }}
      >
        {trigger}
      </DialogTrigger>
      <DialogContent
        className="overflow-hidden py-0 px-0"
        onEscapeKeyDown={(e) => {
          e.stopPropagation();
          e.preventDefault();
          setOpen(false);
        }}
      >
        <DialogHeader
          className="border-b-[1px] border-gray-100 pt-4 pb-2 px-4"
          //   style={{ backgroundColor: "red !important" }}
        >
          <div className="flex items-center gap-2">
            <div>
              {title && <DialogTitle className="">{title}</DialogTitle>}
              {description && (
                <DialogDescription className="text-sm text-muted-foreground mt-1">
                  {description}
                </DialogDescription>
              )}
            </div>
          </div>
        </DialogHeader>
        {/* {title ||
          (description && (
            <DialogHeader
              className="border-b-[1px] border-gray-200  bg-red-500"
            //   style={{ backgroundColor: "red !important" }}
            >
              {title && <DialogTitle className="">{title}</DialogTitle>}
              {description && (
                <DialogDescription>{description}CCC</DialogDescription>
              )}
            </DialogHeader>
          ))} */}

        <div className="p-4">{children}</div>

        <DialogFooter className=" border-t-[1px] border-gray-200 pb-4 px-4">
          {
            <div className="flex items-center justify-end gap-2">
              {footerButton}
            </div>
          }
        </DialogFooter>

        {/* </div> */}
      </DialogContent>
    </Dialog>
  );
};
