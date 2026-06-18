import React from "react";
import { cn } from "@/lib/utils";

interface MainContentWrapperProps {
  children?: React.ReactNode;
  className?: string;
}

export function MainContentWrapper({ children, className }: MainContentWrapperProps) {
  return (
    <main 
      id="page" 
      role="main" 
      className={cn("flex-1 relative z-0 w-full", className)}
    >
      <article 
        id="sections" 
        className="sections relative w-full"
      >
        {children}
      </article>
    </main>
  );
}
