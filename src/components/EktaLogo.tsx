import React from 'react';

interface EktaLogoProps {
  className?: string;
  size?: number;
}

export default function EktaLogo({ className = 'h-11 w-11', size = 100 }: EktaLogoProps) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      className={`${className} shrink-0`}
      width={size} 
      height={size}
      style={{ overflow: 'visible' }}
    >
      <defs>
        {/* Clip path to force everything inside a perfect circle */}
        <clipPath id="globe-clip">
          <circle cx="50" cy="50" r="48" />
        </clipPath>
      </defs>

      {/* Main Clipped Globe Background */}
      <g clipPath="url(#globe-clip)">
        {/* Left Hemisphere (Blue) */}
        <rect x="0" y="0" width="50" height="100" fill="#154ab3" />
        
        {/* Right Hemisphere (Green) */}
        <rect x="50" y="0" width="50" height="100" fill="#23a854" />

        {/* Globe Grid lines (latitude / longitude) */}
        {/* Longitudinal Bezier Curves */}
        <path 
          d="M 50 2 Q 23 50 50 98" 
          fill="none" 
          stroke="#e2fffc" 
          strokeWidth="1.5" 
          strokeOpacity="0.8" 
        />
        <path 
          d="M 50 2 Q 77 50 50 98" 
          fill="none" 
          stroke="#e2fffc" 
          strokeWidth="1.5" 
          strokeOpacity="0.8" 
        />

        {/* Transverse/Latitude Curves */}
        <path 
          d="M 2 50 Q 50 50 98 50" 
          fill="none" 
          stroke="#e2fffc" 
          strokeWidth="1.8" 
          strokeOpacity="0.8" 
        />
        <path 
          d="M 14 26 Q 50 32 86 26" 
          fill="none" 
          stroke="#e2fffc" 
          strokeWidth="1.5" 
          strokeOpacity="0.75" 
        />
        <path 
          d="M 14 74 Q 50 68 86 74" 
          fill="none" 
          stroke="#e2fffc" 
          strokeWidth="1.5" 
          strokeOpacity="0.75" 
        />

        {/* Vertical bisector / Central Meridian */}
        <line 
          x1="50" 
          y1="2" 
          x2="50" 
          y2="98" 
          stroke="#e2fffc" 
          strokeWidth="1.8" 
          strokeOpacity="0.8" 
        />
      </g>

      {/* Outer border of the globe */}
      <circle 
        cx="50" 
        cy="50" 
        r="48" 
        fill="none" 
        stroke="#ffffff" 
        strokeWidth="1.8" 
        strokeOpacity="0.9"
      />

      {/* Bold Serif "EL" Characters */}
      {/* Red/Crimson fill with distinct white/light outline */}
      <text 
        x="50" 
        y="62" 
        textAnchor="middle" 
        fill="#dc2626" 
        stroke="#ffffff" 
        strokeWidth="3.2" 
        paintOrder="stroke fill" 
        fontSize="34" 
        fontFamily="Georgia, 'Times New Roman', serif" 
        fontWeight="900" 
        letterSpacing="0.5"
      >
        EL
      </text>
    </svg>
  );
}
