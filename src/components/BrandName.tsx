import React from 'react';

interface BrandNameProps {
  className?: string;
  theme?: 'default' | 'amber' | 'blue' | 'light' | 'dark' | 'white';
}

export const BrandName: React.FC<BrandNameProps> = ({
  className = '',
  theme = 'blue',
}) => {
  // Cores dinâmicas de acordo com o quadrante
  let meuClass = 'text-slate-800 italic font-bold';
  let gabaritouClass = 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 font-bold';

  if (theme === 'amber') {
    meuClass = 'text-amber-800 italic font-bold';
    gabaritouClass = 'text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 font-bold';
  } else if (theme === 'light' || theme === 'white') {
    meuClass = 'text-blue-200 italic font-bold';
    gabaritouClass = 'text-white font-bold';
  } else if (theme === 'dark') {
    meuClass = 'text-white italic font-bold';
    gabaritouClass = 'text-blue-400 font-bold';
  }

  return (
    <span className={`inline-flex items-baseline gap-1.5 select-none align-baseline whitespace-nowrap ${className}`}>
      <span 
        style={{
          fontFamily: "'Satisfy', 'Caveat', cursive, sans-serif",
          transform: 'rotate(-2deg)',
          display: 'inline-block',
        }}
        className={`tracking-normal ${meuClass}`}
      >
        Meu
      </span>
      <span 
        style={{
          fontFamily: "'Caveat', 'Satisfy', cursive, sans-serif",
          display: 'inline-block',
          letterSpacing: '0.02em',
        }}
        className={gabaritouClass}
      >
        Gabaritou
      </span>
    </span>
  );
};
