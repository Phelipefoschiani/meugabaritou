import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'motion/react';
import { 
  BookOpen, 
  Scale, 
  Building2, 
  Calculator, 
  Atom, 
  FlaskConical, 
  Zap, 
  Landmark, 
  Laptop, 
  ShieldAlert, 
  Globe, 
  Search,
  Layers,
  GraduationCap,
  Play
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface SubjectItem {
  id: string;
  name: string;
  category: 'concurso' | 'enem' | 'geral';
  icon: React.ElementType;
  colorClass: string;
  strokeColor: string;
  side: 'left' | 'right' | 'top' | 'bottom';
  phoneAnchorRatio: number; // Posição fixa no celular
  windDuration: number;
  windDelay: number;
}

interface LineState {
  id: string;
  path: string;
  phoneX: number;
  phoneY: number;
  cardX: number;
  cardY: number;
  strokeColor: string;
}

// Matérias e configurações declaradas fora do componente para manter referências imutáveis
export const SUBJECTS: SubjectItem[] = [
  // LADO ESQUERDO (4 pontos de ancoragem fixos no celular)
  {
    id: 'portugues',
    name: 'Língua Portuguesa',
    category: 'geral',
    icon: BookOpen,
    colorClass: 'from-blue-500 to-indigo-600 text-blue-900',
    strokeColor: '#3b82f6',
    side: 'left',
    phoneAnchorRatio: 0.18, // 18% do topo do celular
    windDuration: 4.2,
    windDelay: 0,
  },
  {
    id: 'constitucional',
    name: 'Direito Constitucional',
    category: 'concurso',
    icon: Scale,
    colorClass: 'from-indigo-500 to-purple-600 text-indigo-900',
    strokeColor: '#6366f1',
    side: 'left',
    phoneAnchorRatio: 0.38, // 38% do topo do celular
    windDuration: 4.8,
    windDelay: 0.4,
  },
  {
    id: 'administrativo',
    name: 'Direito Administrativo',
    category: 'concurso',
    icon: Building2,
    colorClass: 'from-sky-500 to-blue-600 text-sky-900',
    strokeColor: '#0284c7',
    side: 'left',
    phoneAnchorRatio: 0.62, // 62% do topo do celular
    windDuration: 4.5,
    windDelay: 0.8,
  },
  {
    id: 'penal',
    name: 'Direito Penal & Processo',
    category: 'concurso',
    icon: ShieldAlert,
    colorClass: 'from-rose-500 to-amber-600 text-rose-900',
    strokeColor: '#f43f5e',
    side: 'left',
    phoneAnchorRatio: 0.82, // 82% do topo do celular
    windDuration: 5.0,
    windDelay: 1.2,
  },

  // TOPO (2 pontos de ancoragem fixos no topo do celular)
  {
    id: 'quimica',
    name: 'Química & Matéria',
    category: 'enem',
    icon: FlaskConical,
    colorClass: 'from-violet-500 to-fuchsia-600 text-violet-900',
    strokeColor: '#8b5cf6',
    side: 'top',
    phoneAnchorRatio: 0.30, // 30% da largura do topo
    windDuration: 4.6,
    windDelay: 0.3,
  },
  {
    id: 'historia',
    name: 'História & Humanas',
    category: 'geral',
    icon: Landmark,
    colorClass: 'from-amber-600 to-yellow-600 text-amber-950',
    strokeColor: '#d97706',
    side: 'top',
    phoneAnchorRatio: 0.70, // 70% da largura do topo
    windDuration: 4.7,
    windDelay: 0.7,
  },

  // LADO DIREITO (4 pontos de ancoragem fixos no celular)
  {
    id: 'matematica',
    name: 'Raciocínio Lógico & Mat.',
    category: 'geral',
    icon: Calculator,
    colorClass: 'from-emerald-500 to-teal-600 text-emerald-900',
    strokeColor: '#10b981',
    side: 'right',
    phoneAnchorRatio: 0.18, // 18% do topo do celular
    windDuration: 4.4,
    windDelay: 0.2,
  },
  {
    id: 'biologia',
    name: 'Biologia & Natureza',
    category: 'enem',
    icon: Atom,
    colorClass: 'from-teal-500 to-cyan-600 text-teal-900',
    strokeColor: '#14b8a6',
    side: 'right',
    phoneAnchorRatio: 0.38, // 38% do topo do celular
    windDuration: 5.1,
    windDelay: 0.6,
  },
  {
    id: 'fisica',
    name: 'Física & Mecânica',
    category: 'enem',
    icon: Zap,
    colorClass: 'from-amber-500 to-orange-600 text-amber-900',
    strokeColor: '#f59e0b',
    side: 'right',
    phoneAnchorRatio: 0.62, // 62% do topo do celular
    windDuration: 4.9,
    windDelay: 1.0,
  },
  {
    id: 'informatica',
    name: 'Informática & TI',
    category: 'concurso',
    icon: Laptop,
    colorClass: 'from-cyan-500 to-blue-600 text-cyan-900',
    strokeColor: '#06b6d4',
    side: 'right',
    phoneAnchorRatio: 0.82, // 82% do topo do celular
    windDuration: 4.3,
    windDelay: 0.5,
  },

  // BASE (1 ponto de ancoragem fixo na base do celular)
  {
    id: 'geografia',
    name: 'Geografia & Geopolítica',
    category: 'geral',
    icon: Globe,
    colorClass: 'from-emerald-600 to-teal-700 text-emerald-950',
    strokeColor: '#059669',
    side: 'bottom',
    phoneAnchorRatio: 0.50, // 50% centro da base
    windDuration: 4.0,
    windDelay: 1.1,
  },
];

// Nomes de bancas e exames em marca d'água sutil ricocheteando pelas extremidades da tela
export const WATERMARK_BANCAS = [
  { 
    label: 'CEBRASPE', 
    xPoints: ['1%', '42%', '94%', '52%', '1%', '38%', '94%', '46%', '1%'], 
    yPoints: ['8%', '94%', '42%', '3%', '88%', '3%', '62%', '94%', '8%'], 
    duration: 32, 
    delay: 0,
    size: 'text-sm sm:text-base lg:text-lg'
  },
  { 
    label: 'FGV CONCURSOS', 
    xPoints: ['94%', '32%', '1%', '64%', '94%', '22%', '1%', '58%', '94%'], 
    yPoints: ['82%', '3%', '58%', '94%', '28%', '94%', '12%', '3%', '82%'], 
    duration: 36, 
    delay: 3,
    size: 'text-xs sm:text-sm lg:text-base'
  },
  { 
    label: 'ENEM 2026', 
    xPoints: ['48%', '94%', '32%', '1%', '68%', '94%', '24%', '1%', '48%'], 
    yPoints: ['3%', '48%', '94%', '62%', '3%', '76%', '94%', '18%', '3%'], 
    duration: 28, 
    delay: 1.5,
    size: 'text-base sm:text-lg lg:text-xl'
  },
  { 
    label: 'FCC', 
    xPoints: ['1%', '74%', '94%', '14%', '1%', '82%', '94%', '28%', '1%'], 
    yPoints: ['42%', '94%', '24%', '3%', '72%', '94%', '16%', '3%', '42%'], 
    duration: 30, 
    delay: 4.5,
    size: 'text-sm sm:text-base lg:text-lg'
  },
  { 
    label: 'VUNESP', 
    xPoints: ['88%', '8%', '1%', '72%', '94%', '32%', '1%', '62%', '88%'], 
    yPoints: ['3%', '94%', '32%', '3%', '68%', '94%', '18%', '3%', '3%'], 
    duration: 34, 
    delay: 1,
    size: 'text-xs sm:text-sm lg:text-base'
  },
  { 
    label: 'CESGRANRIO', 
    xPoints: ['22%', '1%', '58%', '94%', '38%', '1%', '74%', '94%', '22%'], 
    yPoints: ['94%', '22%', '3%', '52%', '94%', '42%', '3%', '72%', '94%'], 
    duration: 38, 
    delay: 2.2,
    size: 'text-xs sm:text-sm lg:text-base'
  },
  { 
    label: 'FUVEST / UNICAMP', 
    xPoints: ['94%', '42%', '1%', '66%', '94%', '14%', '1%', '48%', '94%'], 
    yPoints: ['18%', '94%', '62%', '3%', '78%', '94%', '8%', '3%', '18%'], 
    duration: 40, 
    delay: 3.8,
    size: 'text-xs sm:text-sm lg:text-base'
  },
  { 
    label: 'IBFC', 
    xPoints: ['1%', '48%', '94%', '28%', '1%', '68%', '94%', '12%', '1%'], 
    yPoints: ['68%', '3%', '62%', '94%', '12%', '3%', '48%', '94%', '68%'], 
    duration: 29, 
    delay: 5,
    size: 'text-sm sm:text-base lg:text-lg'
  },
  { 
    label: 'QUADRIX', 
    xPoints: ['64%', '94%', '22%', '1%', '78%', '94%', '8%', '1%', '64%'], 
    yPoints: ['94%', '32%', '3%', '68%', '94%', '12%', '3%', '52%', '94%'], 
    duration: 33, 
    delay: 2.8,
    size: 'text-xs sm:text-sm lg:text-base'
  },
  { 
    label: 'INSTITUTO AOCP', 
    xPoints: ['12%', '94%', '52%', '1%', '72%', '94%', '32%', '1%', '12%'], 
    yPoints: ['3%', '62%', '94%', '38%', '3%', '82%', '94%', '22%', '3%'], 
    duration: 35, 
    delay: 4,
    size: 'text-xs sm:text-sm lg:text-base'
  },
];

export const SubjectsQuadrantSection: React.FC = () => {
  const [hoveredSubject, setHoveredSubject] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'todos' | 'concursos' | 'enem'>('todos');
  const [lines, setLines] = useState<LineState[]>([]);
  const [activeWatermarkBlink, setActiveWatermarkBlink] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const socketRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Cálculo: o ponto no celular é estritamente fixo e o ponto no retângulo conecta ao card
  const updateLines = useCallback(() => {
    if (!containerRef.current || !phoneRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const phoneRect = phoneRef.current.getBoundingClientRect();

    if (containerRect.width === 0 || phoneRect.width === 0) return;

    const computed: LineState[] = [];

    SUBJECTS.forEach((sub) => {
      const socketEl = socketRefs.current[sub.id];
      const cardEl = cardRefs.current[sub.id];
      if (!cardEl) return;

      let cardX = 0;
      let cardY = 0;

      // Ponto no retângulo flutuante
      if (socketEl) {
        const sRect = socketEl.getBoundingClientRect();
        cardX = sRect.left + sRect.width / 2 - containerRect.left;
        cardY = sRect.top + sRect.height / 2 - containerRect.top;
      } else {
        const cardRect = cardEl.getBoundingClientRect();
        if (sub.side === 'left') {
          cardX = cardRect.right - containerRect.left;
          cardY = cardRect.top + cardRect.height / 2 - containerRect.top;
        } else if (sub.side === 'right') {
          cardX = cardRect.left - containerRect.left;
          cardY = cardRect.top + cardRect.height / 2 - containerRect.top;
        } else if (sub.side === 'top') {
          cardX = cardRect.left + cardRect.width / 2 - containerRect.left;
          cardY = cardRect.bottom - containerRect.top;
        } else {
          cardX = cardRect.left + cardRect.width / 2 - containerRect.left;
          cardY = cardRect.top - containerRect.top;
        }
      }

      // Ponto no celular: Fixo
      let phoneX = 0;
      let phoneY = 0;

      if (sub.side === 'left') {
        phoneX = phoneRect.left - containerRect.left;
        phoneY = (phoneRect.top - containerRect.top) + (phoneRect.height * sub.phoneAnchorRatio);
      } else if (sub.side === 'right') {
        phoneX = phoneRect.right - containerRect.left;
        phoneY = (phoneRect.top - containerRect.top) + (phoneRect.height * sub.phoneAnchorRatio);
      } else if (sub.side === 'top') {
        phoneY = phoneRect.top - containerRect.top;
        phoneX = (phoneRect.left - containerRect.left) + (phoneRect.width * sub.phoneAnchorRatio);
      } else {
        phoneY = phoneRect.bottom - containerRect.top;
        phoneX = (phoneRect.left - containerRect.left) + (phoneRect.width * sub.phoneAnchorRatio);
      }

      // Curva Bezier suave
      let control1X = phoneX;
      let control1Y = phoneY;
      let control2X = cardX;
      let control2Y = cardY;

      if (sub.side === 'left' || sub.side === 'right') {
        const deltaX = cardX - phoneX;
        control1X = phoneX + deltaX * 0.45;
        control1Y = phoneY;
        control2X = phoneX + deltaX * 0.55;
        control2Y = cardY;
      } else {
        const deltaY = cardY - phoneY;
        control1X = phoneX;
        control1Y = phoneY + deltaY * 0.45;
        control2X = cardX;
        control2Y = phoneY + deltaY * 0.55;
      }

      const path = `M ${phoneX} ${phoneY} C ${control1X} ${control1Y}, ${control2X} ${control2Y}, ${cardX} ${cardY}`;

      computed.push({
        id: sub.id,
        path,
        phoneX,
        phoneY,
        cardX,
        cardY,
        strokeColor: sub.strokeColor,
      });
    });

    setLines(computed);
  }, []);

  // Atualização estável e segura no carregamento e ao redimensionar a janela
  useEffect(() => {
    const timer = setTimeout(() => {
      updateLines();
    }, 120);

    const handleResize = () => {
      updateLines();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, [updateLines]);

  // Recalcular quando a aba mudar para garantir alinhamento
  useEffect(() => {
    const t = setTimeout(() => {
      updateLines();
    }, 60);
    return () => clearTimeout(t);
  }, [activeTab, updateLines]);

  // Fila sequencial da marca d'água
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveWatermarkBlink((prev) => (prev + 1) % WATERMARK_BANCAS.length);
    }, 1500);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50/80 to-sky-50/50 pt-8 pb-14 lg:pt-12 lg:pb-20 border-b border-slate-200" id="materias-quadrante">
      
      {/* Estilos para animação do fluxo de pulsos elétricos das linhas */}
      <style>{`
        @keyframes pulseFlow {
          from {
            stroke-dashoffset: 24;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
        .circuit-cable-flow {
          stroke-dasharray: 6 5;
          animation: pulseFlow 2.2s linear infinite;
        }
      `}</style>

      {/* Ambient background styling */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[550px] bg-gradient-to-r from-blue-100/35 via-cyan-100/25 to-indigo-100/35 blur-3xl pointer-events-none -z-10" />

      {/* Nomes de Bancas e Exames em Marca D'água Ricocheteando de Borda a Borda com Piscada Sequencial */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none w-full h-full">
        {WATERMARK_BANCAS.map((item, idx) => {
          const isBlinking = idx === activeWatermarkBlink;

          return (
            <motion.div
              key={`watermark-banca-${idx}`}
              className="absolute whitespace-nowrap"
              animate={{
                left: item.xPoints,
                top: item.yPoints,
              }}
              transition={{
                duration: item.duration,
                repeat: Infinity,
                ease: "linear",
                delay: item.delay,
              }}
            >
              <span 
                className={`font-black ${item.size} tracking-widest uppercase select-none transition-all duration-500 inline-block ${
                  isBlinking 
                    ? 'text-slate-950 opacity-90 scale-110 drop-shadow-sm' 
                    : 'text-slate-800/[0.045] sm:text-slate-900/[0.055] opacity-100 scale-100'
                }`}
              >
                {item.label}
              </span>
            </motion.div>
          );
        })}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* CABEÇALHO */}
        <div className="text-center max-w-4xl mx-auto mb-6 sm:mb-8">
          <h2 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-black text-slate-900 tracking-tight leading-[1.15] mb-5">
            Todas as matérias que você precisa,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600">
              conectadas na palma da sua mão.
            </span>
          </h2>

          <div className="inline-flex flex-wrap items-center justify-center p-1.5 rounded-2xl bg-white/85 border border-slate-200/90 shadow-md shadow-slate-200/50 backdrop-blur-md gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('todos')}
              className={`relative group overflow-hidden inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-black transition-all duration-300 cursor-pointer ${
                activeTab === 'todos'
                  ? 'text-white bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 shadow-md shadow-blue-600/30'
                  : 'text-slate-600 hover:text-slate-900 bg-slate-50/80 hover:bg-slate-100/80 border border-slate-200/60'
              }`}
            >
              {activeTab === 'todos' && (
                <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/30 via-white/10 to-transparent pointer-events-none rounded-t-xl" />
              )}
              <Layers className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${activeTab === 'todos' ? 'text-cyan-200' : 'text-slate-400'}`} />
              <span className="relative z-10 whitespace-nowrap">Todas as Disciplinas</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('concursos')}
              className={`relative group overflow-hidden inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-black transition-all duration-300 cursor-pointer ${
                activeTab === 'concursos'
                  ? 'text-white bg-gradient-to-r from-indigo-600 via-blue-600 to-sky-600 shadow-md shadow-indigo-600/30'
                  : 'text-slate-600 hover:text-slate-900 bg-slate-50/80 hover:bg-slate-100/80 border border-slate-200/60'
              }`}
            >
              {activeTab === 'concursos' && (
                <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/30 via-white/10 to-transparent pointer-events-none rounded-t-xl" />
              )}
              <Landmark className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${activeTab === 'concursos' ? 'text-sky-200' : 'text-slate-400'}`} />
              <span className="relative z-10 whitespace-nowrap">Foco em Concursos</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('enem')}
              className={`relative group overflow-hidden inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-black transition-all duration-300 cursor-pointer ${
                activeTab === 'enem'
                  ? 'text-white bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600 shadow-md shadow-emerald-600/30'
                  : 'text-slate-600 hover:text-slate-900 bg-slate-50/80 hover:bg-slate-100/80 border border-slate-200/60'
              }`}
            >
              {activeTab === 'enem' && (
                <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/30 via-white/10 to-transparent pointer-events-none rounded-t-xl" />
              )}
              <GraduationCap className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${activeTab === 'enem' ? 'text-teal-200' : 'text-slate-400'}`} />
              <span className="relative z-10 whitespace-nowrap">Foco no ENEM</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* PALCO CENTRAL DESKTOP (VISÍVEL A PARTIR DE MD) COM LINHAS SVG E CELULAR  */}
        {/* ========================================================================= */}
        <div 
          ref={containerRef}
          className="hidden md:block relative w-full max-w-6xl mx-auto h-[620px] sm:h-[680px] lg:h-[720px] select-none"
        >

          {/* SVG Canvas com Linhas Vivas */}
          <svg 
            className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible"
          >
            <defs>
              <filter id="lineGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {lines.map((l) => {
              const sub = SUBJECTS.find(s => s.id === l.id);
              if (!sub) return null;

              const isHovered = hoveredSubject === l.id;
              const isVisible = activeTab === 'todos' || 
                (activeTab === 'concursos' && (sub.category === 'concurso' || sub.category === 'geral')) ||
                (activeTab === 'enem' && (sub.category === 'enem' || sub.category === 'geral'));

              return (
                <g 
                  key={`dynamic-line-${l.id}`} 
                  className="transition-opacity duration-300" 
                  opacity={isVisible ? (hoveredSubject && !isHovered ? 0.25 : 0.95) : 0.08}
                >
                  {/* Linha com efeito de fluxo suave */}
                  <path
                    d={l.path}
                    fill="none"
                    stroke={isHovered ? l.strokeColor : '#93c5fd'}
                    strokeWidth={isHovered ? '3.5' : '2'}
                    strokeLinecap="round"
                    className={`transition-colors duration-200 ${isHovered ? '' : 'circuit-cable-flow'}`}
                    filter={isHovered ? 'url(#lineGlow)' : undefined}
                  />

                  {/* Terminal FIXO no Celular */}
                  <circle 
                    cx={l.phoneX} 
                    cy={l.phoneY} 
                    r={isHovered ? '4.5' : '3.5'} 
                    fill={isHovered ? l.strokeColor : '#2563eb'}
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />
                </g>
              );
            })}
          </svg>

          {/* CELULAR CENTRAL */}
          <div 
            ref={phoneRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-[190px] sm:w-[215px] lg:w-[230px]"
          >
            <div className="relative rounded-[36px] p-2.5 bg-slate-900 shadow-2xl shadow-blue-900/35 border-[3.5px] border-slate-800 ring-1 ring-white/20">
              
              {/* Speaker Notch */}
              <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-16 h-3 bg-slate-950 rounded-full z-30 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-slate-800 mr-1.5" />
                <div className="w-1 h-1 rounded-full bg-blue-950" />
              </div>

              {/* Smartphone Screen Display */}
              <div className="relative rounded-[28px] overflow-hidden bg-slate-50 text-slate-900 border border-slate-200 h-[365px] sm:h-[390px] flex flex-col pt-6 pb-3 px-2.5">
                
                {/* Logo oficial limpa no topo */}
                <div className="flex items-center justify-center pb-2 border-b border-slate-200/80">
                  <div className="scale-75 origin-center -my-1">
                    <BrandLogo size="sm" showText={true} />
                  </div>
                </div>

                {/* Search Bar in Mockup */}
                <div className="mt-2 relative">
                  <Search className="w-3 h-3 text-slate-400 absolute left-2 top-2" />
                  <div className="w-full bg-white border border-slate-200 rounded-lg pl-6 pr-2 py-1 text-[10px] text-slate-500 shadow-xs flex items-center justify-between">
                    <span>Buscar disciplina...</span>
                  </div>
                </div>

                {/* Card Banco de +10.000 Questões */}
                <div className="mt-2 p-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-600/20">
                  <div className="flex items-center justify-between text-[10px] font-bold mb-0.5">
                    <span>Banco Oficial</span>
                    <span className="text-sky-200">+10.000 qst</span>
                  </div>
                  <div className="text-[8px] text-blue-100 leading-tight">
                    Filtre por Banca, Ano, Cargo ou Órgão em tempo real.
                  </div>
                </div>

                {/* Mini Subject Cards inside Phone */}
                <div className="mt-2 space-y-1 overflow-hidden">
                  <div className="p-1.5 rounded-lg bg-white border border-slate-200 flex items-center justify-between shadow-2xs">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                      <span className="text-[10px] font-bold text-slate-800">Português</span>
                    </div>
                    <span className="text-[9px] font-bold text-blue-600">6.240 qst</span>
                  </div>

                  <div className="p-1.5 rounded-lg bg-white border border-slate-200 flex items-center justify-between shadow-2xs">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-indigo-500" />
                      <span className="text-[10px] font-bold text-slate-800">Direito Const.</span>
                    </div>
                    <span className="text-[9px] font-bold text-indigo-600">4.890 qst</span>
                  </div>

                  <div className="p-1.5 rounded-lg bg-white border border-slate-200 flex items-center justify-between shadow-2xs">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span className="text-[10px] font-bold text-slate-800">RLM / Mat.</span>
                    </div>
                    <span className="text-[9px] font-bold text-emerald-600">3.710 qst</span>
                  </div>

                  <div className="p-1.5 rounded-lg bg-white border border-slate-200 flex items-center justify-between shadow-2xs">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-rose-500" />
                      <span className="text-[10px] font-bold text-slate-800">Direito Penal</span>
                    </div>
                    <span className="text-[9px] font-bold text-rose-600">3.450 qst</span>
                  </div>
                </div>

                {/* Simulated Mode Badge */}
                <div className="mt-2 p-1.5 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-[9px] font-extrabold text-emerald-800">Simulado PDF</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[9px] font-bold text-emerald-600">Disponível</span>
                  </div>
                </div>

                {/* Bottom Action Button in Mockup */}
                <div className="mt-auto pt-1">
                  <div className="w-full py-1.5 bg-slate-900 text-white rounded-lg text-center text-[10px] font-bold shadow-xs flex items-center justify-center gap-1.5">
                    <Play className="w-2.5 h-2.5 fill-cyan-300 text-cyan-300" />
                    <span>Praticar Questões</span>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* RETÂNGULOS FLUTUANTES EM MOVIMENTO (SWAYING IN THE WIND) */}
          {/* ========================================================================= */}

          {/* COLUNA ESQUERDA (4 ITENS) */}
          <div className="absolute left-2 sm:left-4 lg:left-8 top-0 bottom-0 flex flex-col justify-around py-4 z-30 pointer-events-auto">
            {SUBJECTS.filter(s => s.side === 'left').map((sub) => {
              const Icon = sub.icon;
              const isHovered = hoveredSubject === sub.id;
              const isVisible = activeTab === 'todos' || 
                (activeTab === 'concursos' && (sub.category === 'concurso' || sub.category === 'geral')) ||
                (activeTab === 'enem' && (sub.category === 'enem' || sub.category === 'geral'));

              return (
                <div
                  key={sub.id}
                  ref={(el) => { cardRefs.current[sub.id] = el; }}
                  className="transition-opacity duration-300"
                  style={{ opacity: isVisible ? 1 : 0.2 }}
                  onMouseEnter={() => setHoveredSubject(sub.id)}
                  onMouseLeave={() => setHoveredSubject(null)}
                >
                  <motion.div
                    className="cursor-pointer"
                    animate={{
                      rotate: [-2, 3, -2],
                      y: [-4, 6, -4],
                      x: [-2, 2, -2],
                    }}
                    transition={{
                      duration: sub.windDuration,
                      repeat: Infinity,
                      repeatType: "mirror",
                      ease: "easeInOut",
                      delay: sub.windDelay,
                    }}
                    whileHover={{ scale: 1.08, rotate: 0 }}
                  >
                    <div className={`group relative flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl bg-white/95 backdrop-blur-md border shadow-md transition-all duration-300 ${
                      isHovered 
                        ? 'border-blue-500 shadow-xl shadow-blue-500/20 ring-2 ring-blue-400/30' 
                        : 'border-slate-200/90 shadow-slate-300/40 hover:border-slate-300'
                    }`}>
                      <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${sub.colorClass} flex items-center justify-center text-white shadow-xs shrink-0 transition-transform group-hover:rotate-6`}>
                        <Icon className="w-3.5 h-3.5 text-white" />
                      </div>
                      <span className="text-xs sm:text-sm font-extrabold text-slate-900 tracking-tight whitespace-nowrap">
                        {sub.name}
                      </span>

                      {/* Socket de conexão no lado direito do retângulo */}
                      <div 
                        ref={(el) => { socketRefs.current[sub.id] = el; }}
                        className={`w-3 h-3 rounded-full absolute -right-1.5 top-1/2 -translate-y-1/2 border-2 border-white shadow-xs transition-transform ${
                          isHovered ? 'bg-blue-600 scale-125' : 'bg-blue-500'
                        }`} 
                      />
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>

          {/* LINHA SUPERIOR (2 ITENS) */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 flex items-center gap-8 sm:gap-16 z-30 pointer-events-auto">
            {SUBJECTS.filter(s => s.side === 'top').map((sub) => {
              const Icon = sub.icon;
              const isHovered = hoveredSubject === sub.id;
              const isVisible = activeTab === 'todos' || 
                (activeTab === 'concursos' && (sub.category === 'concurso' || sub.category === 'geral')) ||
                (activeTab === 'enem' && (sub.category === 'enem' || sub.category === 'geral'));

              return (
                <div
                  key={sub.id}
                  ref={(el) => { cardRefs.current[sub.id] = el; }}
                  className="transition-opacity duration-300"
                  style={{ opacity: isVisible ? 1 : 0.2 }}
                  onMouseEnter={() => setHoveredSubject(sub.id)}
                  onMouseLeave={() => setHoveredSubject(null)}
                >
                  <motion.div
                    className="cursor-pointer"
                    animate={{
                      rotate: [-2, 2, -2],
                      y: [-4, 5, -4],
                      x: [2, -2, 2],
                    }}
                    transition={{
                      duration: sub.windDuration,
                      repeat: Infinity,
                      repeatType: "mirror",
                      ease: "easeInOut",
                      delay: sub.windDelay,
                    }}
                    whileHover={{ scale: 1.08, rotate: 0 }}
                  >
                    <div className={`group relative flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl bg-white/95 backdrop-blur-md border shadow-md transition-all duration-300 ${
                      isHovered 
                        ? 'border-blue-500 shadow-xl shadow-blue-500/20 ring-2 ring-blue-400/30' 
                        : 'border-slate-200/90 shadow-slate-300/40 hover:border-slate-300'
                    }`}>
                      <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${sub.colorClass} flex items-center justify-center text-white shadow-xs shrink-0 transition-transform group-hover:rotate-6`}>
                        <Icon className="w-3.5 h-3.5 text-white" />
                      </div>
                      <span className="text-xs sm:text-sm font-extrabold text-slate-900 tracking-tight whitespace-nowrap">
                        {sub.name}
                      </span>

                      {/* Socket de conexão na base do retângulo */}
                      <div 
                        ref={(el) => { socketRefs.current[sub.id] = el; }}
                        className={`w-3 h-3 rounded-full absolute -bottom-1.5 left-1/2 -translate-x-1/2 border-2 border-white shadow-xs transition-transform ${
                          isHovered ? 'bg-blue-600 scale-125' : 'bg-blue-500'
                        }`} 
                      />
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>

          {/* COLUNA DIREITA (4 ITENS) */}
          <div className="absolute right-2 sm:right-4 lg:right-8 top-0 bottom-0 flex flex-col justify-around py-4 z-30 pointer-events-auto">
            {SUBJECTS.filter(s => s.side === 'right').map((sub) => {
              const Icon = sub.icon;
              const isHovered = hoveredSubject === sub.id;
              const isVisible = activeTab === 'todos' || 
                (activeTab === 'concursos' && (sub.category === 'concurso' || sub.category === 'geral')) ||
                (activeTab === 'enem' && (sub.category === 'enem' || sub.category === 'geral'));

              return (
                <div
                  key={sub.id}
                  ref={(el) => { cardRefs.current[sub.id] = el; }}
                  className="transition-opacity duration-300"
                  style={{ opacity: isVisible ? 1 : 0.2 }}
                  onMouseEnter={() => setHoveredSubject(sub.id)}
                  onMouseLeave={() => setHoveredSubject(null)}
                >
                  <motion.div
                    className="cursor-pointer"
                    animate={{
                      rotate: [2, -3, 2],
                      y: [-5, 6, -5],
                      x: [2, -2, 2],
                    }}
                    transition={{
                      duration: sub.windDuration,
                      repeat: Infinity,
                      repeatType: "mirror",
                      ease: "easeInOut",
                      delay: sub.windDelay,
                    }}
                    whileHover={{ scale: 1.08, rotate: 0 }}
                  >
                    <div className={`group relative flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl bg-white/95 backdrop-blur-md border shadow-md transition-all duration-300 ${
                      isHovered 
                        ? 'border-blue-500 shadow-xl shadow-blue-500/20 ring-2 ring-blue-400/30' 
                        : 'border-slate-200/90 shadow-slate-300/40 hover:border-slate-300'
                    }`}>
                      {/* Socket de conexão no lado esquerdo do retângulo */}
                      <div 
                        ref={(el) => { socketRefs.current[sub.id] = el; }}
                        className={`w-3 h-3 rounded-full absolute -left-1.5 top-1/2 -translate-y-1/2 border-2 border-white shadow-xs transition-transform ${
                          isHovered ? 'bg-blue-600 scale-125' : 'bg-blue-500'
                        }`} 
                      />

                      <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${sub.colorClass} flex items-center justify-center text-white shadow-xs shrink-0 transition-transform group-hover:rotate-6`}>
                        <Icon className="w-3.5 h-3.5 text-white" />
                      </div>
                      <span className="text-xs sm:text-sm font-extrabold text-slate-900 tracking-tight whitespace-nowrap">
                        {sub.name}
                      </span>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>

          {/* BASE INFERIOR (1 ITEM) */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-30 pointer-events-auto">
            {SUBJECTS.filter(s => s.side === 'bottom').map((sub) => {
              const Icon = sub.icon;
              const isHovered = hoveredSubject === sub.id;
              const isVisible = activeTab === 'todos' || 
                (activeTab === 'concursos' && (sub.category === 'concurso' || sub.category === 'geral')) ||
                (activeTab === 'enem' && (sub.category === 'enem' || sub.category === 'geral'));

              return (
                <div
                  key={sub.id}
                  ref={(el) => { cardRefs.current[sub.id] = el; }}
                  className="transition-opacity duration-300"
                  style={{ opacity: isVisible ? 1 : 0.2 }}
                  onMouseEnter={() => setHoveredSubject(sub.id)}
                  onMouseLeave={() => setHoveredSubject(null)}
                >
                  <motion.div
                    className="cursor-pointer"
                    animate={{
                      rotate: [-2, 2, -2],
                      y: [-3, 4, -3],
                      x: [-2, 2, -2],
                    }}
                    transition={{
                      duration: sub.windDuration,
                      repeat: Infinity,
                      repeatType: "mirror",
                      ease: "easeInOut",
                      delay: sub.windDelay,
                    }}
                    whileHover={{ scale: 1.08, rotate: 0 }}
                  >
                    <div className={`group relative flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl bg-white/95 backdrop-blur-md border shadow-md transition-all duration-300 ${
                      isHovered 
                        ? 'border-blue-500 shadow-xl shadow-blue-500/20 ring-2 ring-blue-400/30' 
                        : 'border-slate-200/90 shadow-slate-300/40 hover:border-slate-300'
                    }`}>
                      {/* Socket de conexão no topo do retângulo */}
                      <div 
                        ref={(el) => { socketRefs.current[sub.id] = el; }}
                        className={`w-3 h-3 rounded-full absolute -top-1.5 left-1/2 -translate-x-1/2 border-2 border-white shadow-xs transition-transform ${
                          isHovered ? 'bg-blue-600 scale-125' : 'bg-blue-500'
                        }`} 
                      />

                      <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${sub.colorClass} flex items-center justify-center text-white shadow-xs shrink-0 transition-transform group-hover:rotate-6`}>
                        <Icon className="w-3.5 h-3.5 text-white" />
                      </div>
                      <span className="text-xs sm:text-sm font-extrabold text-slate-900 tracking-tight whitespace-nowrap">
                        {sub.name}
                      </span>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>

        </div>

        {/* ========================================================================= */}
        {/* PALCO CENTRAL MOBILE (EXCLUSIVO PARA DISPOSITIVOS MÓVEIS < MD)            */}
        {/* ========================================================================= */}
        <div className="block md:hidden space-y-6 pt-2">
          
          {/* Smartphone Showcase no Centro */}
          <div className="flex justify-center">
            <div className="w-[210px] xs:w-[230px] rounded-[36px] p-2.5 bg-slate-900 shadow-2xl shadow-blue-900/40 border-[3.5px] border-slate-800 ring-1 ring-white/20 relative">
              {/* Notch */}
              <div className="w-16 h-3 bg-slate-950 rounded-full mx-auto mb-2 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-slate-800 mr-1.5" />
                <div className="w-1 h-1 rounded-full bg-blue-950" />
              </div>

              {/* Smartphone Screen Display */}
              <div className="rounded-[28px] overflow-hidden bg-slate-50 text-slate-900 border border-slate-200 p-3 space-y-2">
                <div className="flex items-center justify-center pb-1.5 border-b border-slate-200/80">
                  <div className="scale-75 origin-center -my-1">
                    <BrandLogo size="sm" showText={true} />
                  </div>
                </div>

                <div className="p-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm">
                  <div className="flex items-center justify-between text-[10px] font-bold">
                    <span>Banco Oficial</span>
                    <span className="text-sky-200">+10.000 qst</span>
                  </div>
                  <div className="text-[8px] text-blue-100 mt-0.5">
                    Filtre por Banca, Órgão e Ano em tempo real.
                  </div>
                </div>

                {/* Question Preview in Phone */}
                <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-2xs space-y-1">
                  <div className="text-[9px] font-extrabold text-blue-600 flex items-center justify-between">
                    <span>{hoveredSubject ? SUBJECTS.find(s => s.id === hoveredSubject)?.name : 'Língua Portuguesa'}</span>
                    <span className="text-slate-400">Ativo</span>
                  </div>
                  <div className="text-[8.5px] text-slate-700 font-medium">
                    Questões calibradas por recorrência das bancas
                  </div>
                </div>

                <div className="p-1.5 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-[9px] font-extrabold text-emerald-800">Simulado PDF A4</span>
                  </div>
                  <span className="text-[8.5px] font-bold text-emerald-600">Disponível</span>
                </div>
              </div>
            </div>
          </div>

          {/* Grid Ergonômico de Matérias para Mobile (Touch-friendly 2 Colunas) */}
          <div className="space-y-2">
            <div className="text-center text-xs font-bold text-slate-500">
              Toque em qualquer matéria para calibrar:
            </div>
            <div className="grid grid-cols-2 gap-2">
              {SUBJECTS.filter(sub => {
                if (activeTab === 'concursos') return sub.category === 'concurso' || sub.category === 'geral';
                if (activeTab === 'enem') return sub.category === 'enem' || sub.category === 'geral';
                return true;
              }).map((sub) => {
                const Icon = sub.icon;
                const isSelected = hoveredSubject === sub.id;

                return (
                  <button
                    key={sub.id}
                    type="button"
                    onClick={() => setHoveredSubject(sub.id === hoveredSubject ? null : sub.id)}
                    className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition-all cursor-pointer min-h-[48px] ${
                      isSelected
                        ? 'bg-blue-600 text-white border-blue-700 shadow-md ring-2 ring-blue-400/40'
                        : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-900 shadow-xs'
                    }`}
                  >
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-white/20 text-white' : `bg-gradient-to-br ${sub.colorClass} text-white`
                    }`}>
                      <Icon className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-xs font-bold leading-tight truncate">
                      {sub.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
