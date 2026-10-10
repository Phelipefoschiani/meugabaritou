import React from 'react';

interface BrandIconProps {
  size?: number;
  className?: string;
}

export const BrandIcon: React.FC<BrandIconProps> = ({
  size = 28,
  className = '',
}) => {
  return (
    <span 
      className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <svg 
        viewBox="0 0 54 54" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm overflow-visible"
      >
        {/* Subtle Paper Drop Shadow */}
        <filter id="iconCardShadow" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="0" dy="1.5" stdDeviation="2" floodColor="#1e3a8a" floodOpacity="0.15" />
        </filter>

        <filter id="iconCheckGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1" stdDeviation="1.2" floodColor="#059669" floodOpacity="0.35" />
        </filter>

        {/* Secondary Back Paper Page */}
        <rect 
          x="11" 
          y="5" 
          width="32" 
          height="40" 
          rx="5" 
          fill="#E2E8F0" 
          stroke="#CBD5E1" 
          strokeWidth="1"
          transform="rotate(4 27 25)"
        />

        {/* Main Gabarito Sheet / Answer Card */}
        <rect 
          x="7" 
          y="6" 
          width="33" 
          height="42" 
          rx="5" 
          fill="#FFFFFF" 
          stroke="#93C5FD" 
          strokeWidth="1.5"
          filter="url(#iconCardShadow)"
        />

        {/* Top Exam Header Strip */}
        <rect x="11" y="10" width="16" height="3" rx="1.5" fill="#2563EB" />
        <rect x="29" y="10" width="7" height="3" rx="1.5" fill="#38BDF8" />

        {/* Question 1 Row */}
        <circle cx="13" cy="18" r="2.2" fill="#2563EB" />
        <circle cx="19" cy="18" r="1.8" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="0.6" />
        <circle cx="25" cy="18" r="1.8" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="0.6" />
        <circle cx="31" cy="18" r="1.8" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="0.6" />

        {/* Question 2 Row */}
        <circle cx="13" cy="24" r="1.8" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="0.6" />
        <circle cx="19" cy="24" r="1.8" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="0.6" />
        <circle cx="25" cy="24" r="2.2" fill="#2563EB" />
        <circle cx="31" cy="24" r="1.8" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="0.6" />

        {/* Question 3 Row */}
        <circle cx="13" cy="30" r="1.8" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="0.6" />
        <circle cx="19" cy="30" r="2.2" fill="#2563EB" />
        <circle cx="25" cy="30" r="1.8" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="0.6" />
        <circle cx="31" cy="30" r="1.8" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="0.6" />

        {/* Question 4 Row */}
        <circle cx="13" cy="36" r="1.8" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="0.6" />
        <circle cx="19" cy="36" r="1.8" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="0.6" />
        <circle cx="25" cy="36" r="1.8" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="0.6" />
        <circle cx="31" cy="36" r="2.2" fill="#2563EB" />

        {/* Fluid Cursive Pen Stroke Checkmark */}
        <path 
          d="M13 29 C17 33, 20 38, 23 42.5 C27.5 29, 36 16, 48 9" 
          stroke="#059669" 
          strokeWidth="4.2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          filter="url(#iconCheckGlow)"
        />
        <path 
          d="M13 29 C17 33, 20 38, 23 42.5 C27.5 29, 36 16, 48 9" 
          stroke="#10B981" 
          strokeWidth="2.6" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
        <path 
          d="M14.5 29.5 C17.5 33, 20 37.5, 23 41.5 C27.5 29, 35.5 17, 46.5 10.5" 
          stroke="#6EE7B7" 
          strokeWidth="1" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
      </svg>
    </span>
  );
};

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  textColorMode?: 'dark' | 'light' | 'auto';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  textColorMode = 'auto',
}) => {
  // Enhanced dimensions and scaling
  const config = {
    sm: {
      emblemSize: 36,
      meuSize: 'text-lg sm:text-xl',
      gabaritouSize: 'text-xl sm:text-2xl',
    },
    md: {
      emblemSize: 42,
      meuSize: 'text-xl sm:text-3xl',
      gabaritouSize: 'text-2xl sm:text-4xl',
    },
    lg: {
      emblemSize: 64,
      meuSize: 'text-2xl sm:text-4xl',
      gabaritouSize: 'text-3xl sm:text-5xl',
    },
    xl: {
      emblemSize: 84,
      meuSize: 'text-3xl sm:text-5xl',
      gabaritouSize: 'text-4xl sm:text-6xl',
    },
  }[size];

  const isLightMode = textColorMode === 'light';

  return (
    <div className={`inline-flex items-center gap-2 sm:gap-3.5 select-none group ${className}`}>
      
      {/* Standalone Pure Icon */}
      <div className="transition-transform duration-300 group-hover:scale-105 shrink-0">
        <BrandIcon size={config.emblemSize} />
      </div>

      {/* Typography with Cursive/Script Style */}
      {showText && (
        <div className="flex flex-col text-left leading-none">
          <div className="flex items-baseline gap-1.5">
            {/* "Meu" in handwritten cursive */}
            <span 
              className={`font-cursive italic font-bold tracking-normal ${config.meuSize} ${
                isLightMode ? 'text-blue-200' : 'text-slate-800'
              }`}
              style={{
                fontFamily: "'Satisfy', 'Caveat', cursive, sans-serif",
                transform: 'rotate(-2deg)',
              }}
            >
              Meu
            </span>

            {/* "Gabaritou" in prominent cursive script */}
            <span 
              className={`font-cursive font-bold tracking-wide relative ${config.gabaritouSize} ${
                isLightMode 
                  ? 'text-white' 
                  : 'text-blue-600 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'
              }`}
              style={{
                fontFamily: "'Caveat', 'Satisfy', cursive, sans-serif",
                lineHeight: 1.05,
              }}
            >
              Gabaritou
              
              {/* Hand-drawn underline swash (traço de caneta) */}
              <svg 
                className="absolute -bottom-1.5 left-0 w-full h-2 text-blue-500 overflow-visible pointer-events-none" 
                viewBox="0 0 100 8" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M1 5.5 C 25 1.5, 65 2, 98 4.5" 
                  stroke={isLightMode ? '#60A5FA' : '#2563EB'} 
                  strokeWidth="2.2" 
                  strokeLinecap="round" 
                />
                <circle cx="98" cy="4.5" r="1.6" fill={isLightMode ? '#FBBF24' : '#10B981'} />
              </svg>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
