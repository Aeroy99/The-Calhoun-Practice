import type { SVGProps } from "react";

interface ArchitecturalShadowProps extends SVGProps<SVGSVGElement> {
  variant?: "window" | "archway" | "minimal";
  className?: string;
}

/**
 * Architectural shadow patterns that evoke calm introspection
 * Inspired by minimalist architecture and natural light
 */
export function ArchitecturalShadow({
  variant = "window",
  className = "",
  ...props
}: ArchitecturalShadowProps) {
  if (variant === "archway") {
    // Archway shadow - represents passage and transition
    return (
      <svg
        viewBox="0 0 800 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        preserveAspectRatio="xMidYMid slice"
        {...props}
      >
        <defs>
          <linearGradient id="shadowGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#E8B4A0", stopOpacity: 0.15 }} />
            <stop offset="50%" style={{ stopColor: "#C67B5C", stopOpacity: 0.08 }} />
            <stop offset="100%" style={{ stopColor: "#A05940", stopOpacity: 0.05 }} />
          </linearGradient>
        </defs>

        {/* Background */}
        <rect width="800" height="600" fill="transparent" />

        {/* Archway shadow */}
        <path
          d="M 200 600 L 200 300 Q 200 100, 400 100 Q 600 100, 600 300 L 600 600 Z"
          fill="url(#shadowGradient2)"
          opacity="0.6"
        />

        {/* Inner arch detail */}
        <path
          d="M 250 600 L 250 320 Q 250 150, 400 150 Q 550 150, 550 320 L 550 600 Z"
          fill="url(#shadowGradient2)"
          opacity="0.3"
        />
      </svg>
    );
  }

  if (variant === "minimal") {
    // Minimal geometric shadows - clean and modern
    return (
      <svg
        viewBox="0 0 800 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        preserveAspectRatio="xMidYMid slice"
        {...props}
      >
        <defs>
          <linearGradient id="shadowGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#E8B4A0", stopOpacity: 0.12 }} />
            <stop offset="100%" style={{ stopColor: "#C67B5C", stopOpacity: 0.05 }} />
          </linearGradient>
        </defs>

        {/* Background */}
        <rect width="800" height="600" fill="transparent" />

        {/* Diagonal light rays */}
        <rect
          x="0"
          y="0"
          width="300"
          height="600"
          fill="url(#shadowGradient3)"
          opacity="0.5"
          transform="skewX(-15)"
        />
        <rect
          x="400"
          y="0"
          width="200"
          height="600"
          fill="url(#shadowGradient3)"
          opacity="0.3"
          transform="skewX(-15)"
        />
      </svg>
    );
  }

  // Default: Window shadow - represents light and hope
  return (
    <svg
      viewBox="0 0 800 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid slice"
      {...props}
    >
      <defs>
        <linearGradient id="shadowGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#E8B4A0", stopOpacity: 0.2 }} />
          <stop offset="50%" style={{ stopColor: "#C67B5C", stopOpacity: 0.1 }} />
          <stop offset="100%" style={{ stopColor: "#A05940", stopOpacity: 0.05 }} />
        </linearGradient>

        <filter id="blur">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" />
        </filter>
      </defs>

      {/* Background */}
      <rect width="800" height="600" fill="transparent" />

      {/* Window frame shadow */}
      <rect
        x="150"
        y="50"
        width="250"
        height="400"
        fill="url(#shadowGradient1)"
        opacity="0.5"
        filter="url(#blur)"
      />

      {/* Cross pattern (window panes) */}
      <line
        x1="275"
        y1="50"
        x2="275"
        y2="450"
        stroke="#C67B5C"
        strokeWidth="2"
        opacity="0.15"
      />
      <line
        x1="150"
        y1="250"
        x2="400"
        y2="250"
        stroke="#C67B5C"
        strokeWidth="2"
        opacity="0.15"
      />

      {/* Soft light diffusion */}
      <rect
        x="100"
        y="0"
        width="350"
        height="500"
        fill="url(#shadowGradient1)"
        opacity="0.3"
        filter="url(#blur)"
      />
    </svg>
  );
}
