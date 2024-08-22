import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const DialogueBase = ({
  trigger,
  title,
  description,
  open,
  setOpen,
//   onOpenChange,
  children,
}: Readonly<{
  trigger: React.ReactElement;
  title: string;
  description?: string;
  open: boolean;
//   onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}>) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-8 px-4 ">
        {trigger}
      </DialogTrigger>
      <DialogContent className="overflow-hidden py-8 px-4">
        {title ||
          (description && (
            <DialogHeader className="border-b-1 border-gray-200">
              {title && <DialogTitle>{title}</DialogTitle>}
              {description && (
                <DialogDescription>{description}</DialogDescription>
              )}
            </DialogHeader>
          ))}
        {children}
      </DialogContent>
    </Dialog>
  );
};
