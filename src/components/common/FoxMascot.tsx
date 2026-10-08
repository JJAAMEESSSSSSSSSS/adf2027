import React from 'react';

interface FoxMascotProps {
  className?: string;
  size?: number;
  variant?: 'head' | 'badge' | 'pixel';
}

export const FoxMascot: React.FC<FoxMascotProps> = ({
  className = '',
  size = 40,
  variant = 'head'
}) => {
  if (variant === 'pixel') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        className={`inline-block ${className}`}
        style={{ shapeRendering: 'crispEdges' }}
      >
        {/* Pixel Art Fox */}
        <path d="M4 3h3v3H4zM17 3h3v3h-3z" fill="#E65A15" />
        <path d="M5 4h1v1H5zM18 4h1v1h-1z" fill="#FFF2E0" />
        <path d="M6 6h12v4H6z" fill="#E65A15" />
        <path d="M3 10h18v4H3z" fill="#E65A15" />
        <path d="M6 10h3v2H6zM15 10h3v2h-3z" fill="#1A0B05" />
        <path d="M7 10h1v1H7zM16 10h1v1h-1z" fill="#FFFFFF" />
        <path d="M5 14h14v4H5z" fill="#FFFFFF" />
        <path d="M11 13h2v2h-2z" fill="#1A0B05" />
        <path d="M8 18h8v2H8z" fill="#FFFFFF" />
      </svg>
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={`inline-block select-none ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer Ears */}
      <polygon points="12,18 36,44 14,46" fill="#D95A11" stroke="#A73E06" strokeWidth="2" />
      <polygon points="88,18 86,46 64,44" fill="#D95A11" stroke="#A73E06" strokeWidth="2" />

      {/* Inner Ears */}
      <polygon points="18,24 32,42 20,44" fill="#FFF7ED" />
      <polygon points="82,24 80,44 68,42" fill="#FFF7ED" />
      <polygon points="21,29 30,41 23,43" fill="#FB923C" opacity="0.6" />
      <polygon points="79,29 77,43 70,41" fill="#FB923C" opacity="0.6" />

      {/* Main Face Shape */}
      <path
        d="M20,42 C14,52 14,64 24,74 C34,84 46,92 50,94 C54,92 66,84 76,74 C86,64 86,52 80,42 C72,32 28,32 20,42 Z"
        fill="#E65A15"
        stroke="#A73E06"
        strokeWidth="2.5"
      />

      {/* White Cheeks and Muzzle */}
      <path
        d="M22,66 C18,60 20,52 28,48 C36,44 44,52 50,60 C56,52 64,44 72,48 C80,52 82,60 78,66 C72,78 58,92 50,94 C42,92 28,78 22,66 Z"
        fill="#FFFFFF"
      />

      {/* Forehead Fox Diamond/Blaze */}
      <path d="M46,38 L54,38 L50,48 Z" fill="#FED7AA" opacity="0.7" />

      {/* Left Eye */}
      <ellipse cx="36" cy="53" rx="4.5" ry="6" fill="#1C0E07" />
      <circle cx="34.5" cy="51" r="1.8" fill="#FFFFFF" />
      <circle cx="37.5" cy="55.5" r="0.9" fill="#FFFFFF" />

      {/* Right Eye */}
      <ellipse cx="64" cy="53" rx="4.5" ry="6" fill="#1C0E07" />
      <circle cx="62.5" cy="51" r="1.8" fill="#FFFFFF" />
      <circle cx="65.5" cy="55.5" r="0.9" fill="#FFFFFF" />

      {/* Fox Nose */}
      <path
        d="M45,67 C45,67 50,64 55,67 C55,70 50,74 50,74 C50,74 45,70 45,67 Z"
        fill="#1C0E07"
      />
      <circle cx="48.5" cy="67.5" r="1.2" fill="#FFFFFF" opacity="0.8" />

      {/* Mouth & Whiskers */}
      <path
        d="M50,74 L50,78 M46,78 C48,80 52,80 54,78"
        stroke="#1C0E07"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      {/* Cute Blush */}
      <ellipse cx="26" cy="61" rx="4" ry="2.5" fill="#F87171" opacity="0.45" />
      <ellipse cx="74" cy="61" rx="4" ry="2.5" fill="#F87171" opacity="0.45" />
    </svg>
  );
};

export const PixelHearts: React.FC<{ count?: number; className?: string }> = ({
  count = 3,
  className = ''
}) => {
  return (
    <div className={`flex items-center gap-1.5 select-none ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="text-amber-500 text-sm filter drop-shadow hover:scale-125 transition-transform inline-block"
          style={{ imageRendering: 'pixelated' }}
        >
          🧡
        </span>
      ))}
    </div>
  );
};
