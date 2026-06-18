import React from 'react';
import { cn } from '@/lib/utils';

interface SiteWrapperProps {
  children?: React.ReactNode;
}

export function SiteWrapper({ children }: SiteWrapperProps) {
  return (
    <div id="siteWrapper" className="clearfix site-wrapper flex flex-col min-h-screen relative bg-[--siteBackgroundColor]">
      <a 
        href="#page" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[9999] bg-[hsl(var(--terracotta-main))] text-white px-4 py-2 rounded-md font-medium outline-none focus:ring-2 focus:ring-[hsl(var(--terracotta-main))] focus:ring-offset-2"
      >
        Skip to main content
      </a>
      {children}
    </div>
  );
}
