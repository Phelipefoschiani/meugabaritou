import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { UserPlus, LogIn } from 'lucide-react';

interface FloatingActionsWidgetProps {
  onOpenFreeTrial: () => void;
  onOpenLogin: () => void;
  currentUser?: { name: string; email: string; plan?: string } | null;
  onNavigateToPortal?: () => void;
  isMobile?: boolean;
}

export const FloatingActionsWidget: React.FC<FloatingActionsWidgetProps> = ({
  onOpenFreeTrial,
  onOpenLogin,
  currentUser,
  onNavigateToPortal,
  isMobile = false,
}) => {
  // isAnchoredTop:
  // false = Embaixo no canto inferior direito (início padrão ou rolou para cima)
  // true = Voou lá para cima e fica ancorado no canto superior direito (rolou para baixo)
  const [isAnchoredTop, setIsAnchoredTop] = useState(false);
  
  const cardRef = useRef<HTMLDivElement>(null);
  const [cardHeight, setCardHeight] = useState(130);
  const [windowHeight, setWindowHeight] = useState(
    typeof window !== 'undefined' ? window.innerHeight : 800
  );

  useEffect(() => {
    const updateDimensions = () => {
      setWindowHeight(window.innerHeight);
      if (cardRef.current) {
        setCardHeight(cardRef.current.offsetHeight);
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const diff = currentScrollY - lastScrollY;

      // Se voltou ao topo absoluto da página
      if (currentScrollY <= 25) {
        setIsAnchoredTop(false);
      }
      // Se rolou para baixo: voa lá para cima no canto superior direito
      else if (diff > 8 && currentScrollY > 40) {
        setIsAnchoredTop(true);
      }
      // Se rolou para cima: vai para baixo como se estivesse caindo
      else if (diff < -6) {
        setIsAnchoredTop(false);
      }

      lastScrollY = currentScrollY <= 0 ? 0 : currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLoginClick = () => {
    if (currentUser && onNavigateToPortal) {
      onNavigateToPortal();
    } else {
      onOpenLogin();
    }
  };

  const loginText = currentUser ? 'Área do Aluno' : 'Entrar';

  // Cálculo da distância de queda vertical
  // Top: ancorado em 0px do container fixo (canto superior direito)
  // Bottom: cai até o canto inferior direito com padding da tela
  const marginOffset = isMobile ? 18 : 28;
  const bottomPosition = Math.max(0, windowHeight - cardHeight - marginOffset * 2);
  const currentY = isAnchoredTop ? 0 : bottomPosition;

  return (
    <aside 
      aria-label="Ações Rápidas Flutuantes"
      className={`fixed ${isMobile ? 'top-4 right-4' : 'top-6 right-7'} z-50 pointer-events-auto select-none`}
    >
      <motion.div
        ref={cardRef}
        animate={{ 
          y: currentY,
          scale: isAnchoredTop ? 0.96 : 1,
        }}
        transition={
          isAnchoredTop
            ? {
                // Voa lá para cima com impulso ágil
                type: 'spring',
                stiffness: 280,
                damping: 24,
                mass: 0.9,
              }
            : {
                // Desce como se estivesse caindo com gravidade e leve impacto
                type: 'spring',
                stiffness: 220,
                damping: 15,
                mass: 1.25,
              }
        }
        className={`relative group bg-slate-900/95 hover:bg-slate-900/98 backdrop-blur-xl ${
          isMobile ? 'p-2.5 w-48' : 'p-3 w-54 sm:w-56'
        } rounded-2xl shadow-[0_20px_45px_rgba(0,0,0,0.48)] border border-slate-700/80 flex flex-col gap-2.5 ring-1 ring-white/10`}
      >
        {/* Título com a tipografia padrão da marca Meu Gabaritou */}
        <div className="flex items-center justify-center pt-0.5 pb-1 border-b border-slate-800/90">
          <span 
            className="font-cursive text-lg sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-sky-300 tracking-wide select-none drop-shadow-xs"
            style={{
              fontFamily: "'Caveat', 'Satisfy', cursive, sans-serif",
              lineHeight: 1.15,
            }}
          >
            Acesso Rápido
          </span>
        </div>

        {/* 1. Botão: Cadastre-se Grátis (Amarelo Ouro com Shimmer Sweep Animado) */}
        <button
          type="button"
          onClick={onOpenFreeTrial}
          className={`relative group/btn overflow-hidden w-full ${
            isMobile ? 'h-10 text-xs px-3' : 'h-12 text-sm px-4'
          } rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:via-yellow-200 hover:to-amber-300 active:scale-[0.98] text-slate-950 font-black shadow-lg shadow-amber-950/20 hover:shadow-xl hover:shadow-amber-500/25 border border-amber-200 flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer`}
          title="Cadastrar-se Grátis no Meu Gabaritou"
        >
          {/* Reflexo Superior Espelhado */}
          <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/60 to-transparent pointer-events-none rounded-t-xl" />
          
          {/* Faixa de Brilho Dinâmica em Movimento Contínuo */}
          <div 
            className="absolute inset-0 w-2/3 h-full bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-[-25deg] pointer-events-none animate-shimmer-sweep"
            aria-hidden="true"
          />

          <UserPlus className={`${isMobile ? 'w-3.5 h-3.5' : 'w-4 h-4'} text-slate-950 shrink-0 relative z-10 transition-transform group-hover/btn:scale-110`} />
          <span className="truncate relative z-10 font-black tracking-tight">Cadastre-se Grátis</span>
        </button>

        {/* 2. Botão: Entrar na Conta (Verde Esmeralda com Brilho Shimmer) */}
        <button
          type="button"
          onClick={handleLoginClick}
          className={`relative group/btn overflow-hidden w-full ${
            isMobile ? 'h-10 text-xs px-3' : 'h-12 text-sm px-4'
          } rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:via-emerald-400 hover:to-teal-500 active:scale-[0.98] text-white font-black shadow-lg shadow-emerald-950/30 hover:shadow-xl hover:shadow-emerald-600/30 border border-emerald-400/60 flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer`}
          title={currentUser ? "Acessar Portal do Aluno" : "Entrar na sua conta"}
        >
          {/* Reflexo Superior Espelhado */}
          <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/35 to-transparent pointer-events-none rounded-t-xl" />

          {/* Faixa de Brilho Dinâmica em Movimento */}
          <div 
            className="absolute inset-0 w-2/3 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-25deg] pointer-events-none animate-shimmer-sweep"
            style={{ animationDelay: '1.5s' }}
            aria-hidden="true"
          />

          <LogIn className={`${isMobile ? 'w-3.5 h-3.5' : 'w-4 h-4'} text-white shrink-0 relative z-10 transition-transform group-hover/btn:translate-x-0.5`} />
          <span className="truncate relative z-10 font-black tracking-tight">{loginText}</span>
        </button>
      </motion.div>
    </aside>
  );
};
