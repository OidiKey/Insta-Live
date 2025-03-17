import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const instagramButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white hover:from-purple-600 hover:via-pink-600 hover:to-orange-600",
        live: "bg-gradient-to-r from-pink-500 to-red-500 text-white hover:from-pink-600 hover:to-red-600",
        secondary:
          "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600",
        outline:
          "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface InstagramButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof instagramButtonVariants> {}

const InstagramButton = React.forwardRef<
  HTMLButtonElement,
  InstagramButtonProps
>(({ className, variant, size, ...props }, ref) => {
  return (
    <button
      className={cn(instagramButtonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  );
});
InstagramButton.displayName = "InstagramButton";

export { InstagramButton, instagramButtonVariants };
