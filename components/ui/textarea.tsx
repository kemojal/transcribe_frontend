import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    const [height, setHeight] = React.useState<number>(0);

    const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const target = event.target;
      setHeight(target.scrollHeight); // Set height to scrollHeight
    };

    return (
      <textarea
        className={cn(
          "flex items-center w-full min-h-[50px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        style={{ height: `${height}px`, overflow: "hidden" }} // Dynamic height
        onInput={handleInput} // Trigger on input
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
