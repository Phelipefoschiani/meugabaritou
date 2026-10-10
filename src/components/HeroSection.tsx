import React from 'react';
import { motion } from 'motion/react';
import { BrandLogo } from './BrandLogo';

interface HeroSectionProps {
  onOpenFreeTrial?: () => void;
  onOpenPDFPreview?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-sky-100 via-cyan-50 to-blue-50/70 text-slate-900 pt-4 pb-12 sm:pt-8 sm:pb-20 border-b border-sky-200/80 flex items-center justify-center">
      
      {/* Mirror Glass Specular Reflective Highlight Layer across the top */}
      <div 
        className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-white/90 via-white/40 to-transparent pointer-events-none" 
        aria-hidden="true"
      />

      {/* Mirror highlight line */}
      <div 
        className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none" 
        aria-hidden="true"
      />

      {/* Ambient water-blue glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[900px] h-[340px] bg-gradient-to-b from-cyan-200/50 via-sky-100/35 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* CONTEÚDO CENTRALIZADO DO 1º QUADRANTE */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-8 lg:px-12 text-center w-full">
        
        {/* ========================================================================= */}
        {/* DESENHOS CONTORNADOS EM MOVIMENTO (VISÍVEIS A PARTIR DE TELAS SM)         */}
        {/* ========================================================================= */}

        {/* 1. Folha de Gabarito Contornada */}
        <motion.div 
          className="absolute -top-10 -right-2 sm:top-[-10px] sm:right-2 lg:right-6 pointer-events-none select-none hidden sm:block"
          animate={{ 
            y: [0, -14, 0], 
            x: [0, 6, 0],
            rotate: [8, 14, 8] 
          }}
          transition={{ 
            duration: 5.5, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          <svg 
            width="72" 
            height="95" 
            viewBox="0 0 80 105" 
            fill="none" 
            stroke="#0284c7" 
            strokeWidth="1.6" 
            className="opacity-50 lg:opacity-65 drop-shadow-xs"
          >
            <rect x="2" y="2" width="76" height="101" rx="8" />
            <line x1="12" y1="14" x2="45" y2="14" strokeWidth="2.2" strokeLinecap="round" />
            <circle cx="64" cy="14" r="4.5" strokeWidth="1.6" />
            <g transform="translate(12, 28)">
              <circle cx="6" cy="6" r="4" />
              <circle cx="20" cy="6" r="4" strokeWidth="2.8" stroke="#0369a1" />
              <circle cx="34" cy="6" r="4" />
              <circle cx="48" cy="6" r="4" />

              <circle cx="6" cy="20" r="4" />
              <circle cx="20" cy="20" r="4" />
              <circle cx="34" cy="20" r="4" strokeWidth="2.8" stroke="#0369a1" />
              <circle cx="48" cy="20" r="4" />

              <circle cx="6" cy="34" r="4" strokeWidth="2.8" stroke="#0369a1" />
              <circle cx="20" cy="34" r="4" />
              <circle cx="34" cy="34" r="4" />
              <circle cx="48" cy="34" r="4" />
            </g>
            <path d="M50 82L58 90L72 74" stroke="#0284c7" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>

        {/* 2. Símbolo de Foco / Alvo Contornado */}
        <motion.div 
          className="absolute -top-8 -left-2 sm:top-[-8px] sm:left-2 lg:left-6 pointer-events-none select-none hidden sm:block"
          animate={{ 
            y: [0, 14, 0], 
            x: [0, -6, 0],
            rotate: [-6, -12, -6] 
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 0.4
          }}
        >
          <svg 
            width="68" 
            height="68" 
            viewBox="0 0 75 75" 
            fill="none" 
            stroke="#0284c7" 
            strokeWidth="1.6" 
            className="opacity-50 lg:opacity-65"
          >
            <circle cx="37.5" cy="37.5" r="32" strokeDasharray="4 3" />
            <circle cx="37.5" cy="37.5" r="22" strokeWidth="2" />
            <circle cx="37.5" cy="37.5" r="11" strokeWidth="2" />
            <circle cx="37.5" cy="37.5" r="3.5" strokeWidth="2.5" stroke="#0369a1" />
            <line x1="37.5" y1="2" x2="37.5" y2="12" strokeLinecap="round" strokeWidth="2.2" />
            <line x1="37.5" y1="63" x2="37.5" y2="73" strokeLinecap="round" strokeWidth="2.2" />
            <line x1="2" y1="37.5" x2="12" y2="37.5" strokeLinecap="round" strokeWidth="2.2" />
            <line x1="63" y1="37.5" x2="73" y2="37.5" strokeLinecap="round" strokeWidth="2.2" />
          </svg>
        </motion.div>

        {/* 3. Medalha de Aprovação com Visto */}
        <motion.div 
          className="absolute bottom-6 -right-3 sm:bottom-8 sm:right-4 lg:right-10 pointer-events-none select-none hidden sm:block"
          animate={{ 
            y: [0, -12, 0], 
            x: [0, -6, 0],
            rotate: [4, -4, 4] 
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 0.8
          }}
        >
          <svg 
            width="64" 
            height="64" 
            viewBox="0 0 68 68" 
            fill="none" 
            stroke="#0284c7" 
            strokeWidth="1.8" 
            className="opacity-50 lg:opacity-65"
          >
            <circle cx="34" cy="34" r="30" strokeWidth="1.8" />
            <circle cx="34" cy="34" r="25" strokeDasharray="3 3" />
            <path d="M22 35L30 43L46 25" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>

        {/* 4. Caderno de Questões com Caneta */}
        <motion.div 
          className="absolute bottom-4 -left-3 sm:bottom-6 sm:left-4 lg:left-10 pointer-events-none select-none hidden sm:block"
          animate={{ 
            y: [0, 12, 0], 
            x: [0, 6, 0],
            rotate: [-8, 0, -8] 
          }}
          transition={{ 
            duration: 5.8, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 1.2
          }}
        >
          <svg 
            width="66" 
            height="66" 
            viewBox="0 0 70 70" 
            fill="none" 
            stroke="#0284c7" 
            strokeWidth="1.6" 
            className="opacity-50 lg:opacity-65"
          >
            <rect x="6" y="8" width="46" height="54" rx="5" />
            <line x1="14" y1="18" x2="38" y2="18" strokeLinecap="round" strokeWidth="1.8" />
            <line x1="14" y1="26" x2="32" y2="26" strokeLinecap="round" strokeWidth="1.8" />
            <line x1="14" y1="34" x2="42" y2="34" strokeLinecap="round" strokeWidth="1.8" />
            <circle cx="18" cy="46" r="3" strokeWidth="2.2" stroke="#0369a1" />
            <circle cx="28" cy="46" r="3" />
            <circle cx="38" cy="46" r="3" />
            <path d="M38 52L58 20L64 26L44 58L36 60L38 52Z" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M54 26L60 32" strokeWidth="1.4" />
          </svg>
        </motion.div>

        {/* ========================================================================= */}
        {/* BLOCO CENTRAL DE ESCRITA */}
        {/* ========================================================================= */}
        <div className="space-y-4 sm:space-y-7">
          
          {/* Logo Oficial Proeminente Acima do Título Principal */}
          <div className="flex items-center justify-center pb-2 sm:pb-5">
            <BrandLogo size="xl" />
          </div>

          {/* Título: Linha 1 */}
          <h1 className="text-2xl xs:text-3xl sm:text-5xl lg:text-[3.5rem] font-black tracking-tight text-slate-900 leading-[1.18] sm:leading-[1.14]">
            Tenha em suas mãos a{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-700 to-cyan-700">
              melhor ferramenta de questões
            </span>{' '}
            para
          </h1>

          {/* Título: Linha 2 (Concursos e ENEM na mesma linha com a fonte cursiva do Gabaritou) */}
          <div className="relative inline-block py-1 sm:py-2 max-w-full">
            <span 
              className="font-cursive font-black text-4xl xs:text-5xl sm:text-7xl lg:text-[6.75rem] text-blue-700 tracking-wide inline-block drop-shadow-md select-none"
              style={{
                fontFamily: "'Caveat', 'Satisfy', cursive, sans-serif",
                lineHeight: 1.05,
                WebkitTextStroke: '1px #1d4ed8',
              }}
            >
              Concursos e ENEM
            </span>

            {/* Traço sublinhado dinâmico */}
            <svg 
              className="w-full h-2.5 sm:h-4 text-blue-600 mt-[-4px] sm:mt-[-12px] overflow-visible pointer-events-none" 
              viewBox="0 0 200 12" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M4 8 C 50 2, 140 2, 196 6" 
                stroke="#2563eb" 
                strokeWidth="3.5" 
                strokeLinecap="round" 
              />
              <circle cx="196" cy="6" r="3" fill="#0284c7" />
            </svg>
          </div>

          {/* Arte Escrita Manualmente Pulsando: "+ de 10.000 questões variadas" em Vermelho */}
          <div className="pt-2 sm:pt-4 flex flex-col items-center justify-center select-none">
            <motion.div 
              className="relative inline-flex flex-col items-center group cursor-default"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              
              {/* Texto com tipografia manuscrita humana na cor vermelha */}
              <div className="flex items-center gap-2 sm:gap-3 transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                <span 
                  className="font-cursive font-bold text-3xl sm:text-5xl lg:text-[3.25rem] text-red-600 tracking-wide drop-shadow-sm select-none"
                  style={{
                    fontFamily: "'Caveat', cursive, sans-serif",
                    lineHeight: 1.1,
                  }}
                >
                  + de 10.000 questões variadas
                </span>
                
                {/* Ícone sutil de caneta vermelha simulando anotação à mão */}
                <span className="inline-flex text-red-500 transform rotate-12">
                  <svg 
                    width="26" 
                    height="26" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2.2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="w-5 h-5 sm:w-7 sm:h-7"
                  >
                    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                    <path d="m15 5 4 4" />
                  </svg>
                </span>
              </div>

              {/* Traço orgânico desenhado à mão (sublinhado de caneta vermelha) */}
              <svg 
                className="w-48 sm:w-72 lg:w-80 h-3 sm:h-4 text-red-500 mt-[-2px] sm:mt-[-4px] overflow-visible pointer-events-none" 
                viewBox="0 0 240 16" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M6 10 C 60 2, 160 3, 232 9" 
                  stroke="#dc2626" 
                  strokeWidth="3" 
                  strokeLinecap="round" 
                />
                <path 
                  d="M18 13 C 80 7, 180 8, 224 13" 
                  stroke="#ef4444" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeOpacity="0.85" 
                />
              </svg>

            </motion.div>
          </div>

        </div>

      </div>

    </section>
  );
};
