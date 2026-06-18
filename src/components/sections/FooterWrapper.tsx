import React from "react";
import { cn } from "@/lib/utils";

interface FooterWrapperProps {
  children?: React.ReactNode;
  className?: string;
}

export function FooterWrapper({ children, className }: FooterWrapperProps) {
  return (
    <div className={cn("footer-wrapper", className)}>
      {children}
    </div>
  );
}
