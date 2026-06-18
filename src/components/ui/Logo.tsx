import { cn } from "@/lib/utils";

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  variant?: "full" | "monogram";
}

export function Logo({ variant = "full", className, ...props }: LogoProps) {
  const isMonogram = variant === "monogram";

  return (
    <svg 
      viewBox={isMonogram ? "0 0 48 48" : "0 0 250 48"} 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-primary", className)}
      {...props}
    >
      <circle cx="24" cy="24" r="17" stroke="currentColor" strokeWidth="1" />
      <text 
        x="24" 
        y="33" 
        fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
        fontSize="26" 
        fontWeight="400" 
        textAnchor="middle" 
        fill="currentColor"
        letterSpacing="-0.02em"
      >
        CP
      </text>

      {!isMonogram && (
        <g 
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
          fill="currentColor"
        >
          <text 
            x="54" 
            y="14" 
            fontSize="8.5" 
            fontWeight="500" 
            letterSpacing="0.25em"
          >
            THE
          </text>
          
          <text 
            x="54" 
            y="30" 
            fontSize="16.5" 
            fontWeight="500" 
            letterSpacing="0.15em"
          >
            CALHOUN
          </text>

          <text 
            x="54" 
            y="42" 
            fontSize="8.5" 
            fontWeight="500" 
            letterSpacing="0.25em"
          >
            PRACTICE
          </text>
        </g>
      )}
    </svg>
  );
}
