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
import { motion, AnimatePresence } from "framer-motion";
import { useCallback } from "react";
import { X } from "lucide-react";

const contentVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 10,
    transition: {
      duration: 0.15,
      ease: "easeOut",
    },
  },
};

export function DialogueBase({
  trigger,
  triggerStyle,
  title,
  description,
  open,
  setOpen,
  footerButton,
  children,
}: {
  trigger: React.ReactNode;
  triggerStyle?: string;
  title: string;
  description?: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  footerButton?: React.ReactNode;
  children: React.ReactNode;
}) {
  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className={triggerStyle}>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-0 gap-0 bg-background/95 backdrop-blur-xl border-border/50 shadow-lg">
        <AnimatePresence mode="wait">
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <DialogHeader className="p-6 pb-0">
              <button
                onClick={handleClose}
                className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </button>
              <DialogTitle className="text-xl font-semibold tracking-tight">
                {title}
              </DialogTitle>
              {description && (
                <DialogDescription className="text-sm text-muted-foreground">
                  {description}
                </DialogDescription>
              )}
            </DialogHeader>
            <div className="p-6 pt-4">{children}</div>
            {footerButton && (
              <DialogFooter className="p-6 pt-0">{footerButton}</DialogFooter>
            )}
          </motion.div>
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
