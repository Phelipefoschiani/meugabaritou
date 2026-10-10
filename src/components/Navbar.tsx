import React from 'react';
import { 
  LogIn, 
  BarChart3,
  ArrowRight
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface NavbarProps {
  onOpenLogin: () => void;
  onOpenFreeTrial: () => void;
  currentUser: { name: string; email: string; plan: string; isTrial?: boolean } | null;
  onLogout: () => void;
  onSwitchToStudentPortal: () => void;
  isInPortal?: boolean;
  onBackToLanding?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenLogin,
  onOpenFreeTrial,
  currentUser,
  onLogout,
  onSwitchToStudentPortal,
  isInPortal = false,
  onBackToLanding,
}) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white shadow-2xl shadow-blue-950/35 border-b border-blue-400/40 relative overflow-hidden transition-all">
      
      {/* Top Gloss / Reflective Sheen Layer across full width */}
      <div 
        className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/30 via-white/10 to-transparent pointer-events-none" 
        aria-hidden="true"
      />

      {/* Ultra-fine top highlight edge line across full width */}
      <div 
        className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none" 
        aria-hidden="true"
      />

      {/* Subtle ambient specular light highlight */}
      <div 
        className="absolute -top-16 left-1/3 w-96 h-32 bg-sky-300/25 blur-3xl rounded-full pointer-events-none" 
        aria-hidden="true"
      />

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo in Light Mode with high contrast */}
          <button 
            type="button"
            onClick={onBackToLanding || (() => window.scrollTo({ top: 0, behavior: 'smooth' }))}
            className="flex items-center gap-1.5 sm:gap-2 group focus:outline-none cursor-pointer py-1"
            id="nav-brand-btn"
          >
            <BrandLogo size="md" textColorMode="light" />
          </button>

          {/* Actions: Entrar & Teste Grátis 1 Dia */}
          <div className="flex items-center gap-1.5 sm:gap-3.5">
            {currentUser ? (
              <div className="flex items-center gap-2 sm:gap-3">
                {!isInPortal && (
                  <button
                    type="button"
                    onClick={onSwitchToStudentPortal}
                    className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 min-h-[40px] sm:min-h-[44px] rounded-xl text-xs sm:text-sm font-bold text-white bg-white/20 hover:bg-white/30 border border-white/30 backdrop-blur-md transition-all cursor-pointer shadow-sm"
                  >
                    <BarChart3 className="w-4 h-4 text-sky-200" />
                    <span>Área do Aluno</span>
                  </button>
                )}
                {isInPortal && (
                  <button
                    type="button"
                    onClick={onBackToLanding}
                    className="text-xs sm:text-sm font-semibold text-blue-100 hover:text-white hover:underline cursor-pointer px-2 py-1"
                  >
                    Voltar ao Início
                  </button>
                )}
                <div className="flex items-center gap-2 pl-2 border-l border-white/20">
                  <span className="text-xs text-blue-100 font-medium hidden sm:inline">{currentUser.name}</span>
                  <button
                    type="button"
                    onClick={onLogout}
                    className="text-xs font-semibold text-rose-200 hover:text-white transition-colors cursor-pointer"
                  >
                    Sair
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Botão Entrar (Estilo Espelhado / Frosted Glass) */}
                <button
                  type="button"
                  onClick={onOpenLogin}
                  className="relative group overflow-hidden inline-flex items-center justify-center gap-1 sm:gap-2 px-2.5 sm:px-4 min-h-[40px] sm:min-h-[44px] rounded-xl text-xs sm:text-sm font-bold text-white bg-white/10 hover:bg-white/20 border border-white/30 hover:border-white/50 backdrop-blur-md transition-all duration-300 shadow-xs cursor-pointer"
                  id="top-nav-login-btn"
                >
                  {/* Top mirror specular highlight */}
                  <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/35 via-white/10 to-transparent pointer-events-none rounded-t-xl" />
                  
                  <LogIn className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-200 relative z-10 transition-transform group-hover:-translate-x-0.5" />
                  <span className="relative z-10 whitespace-nowrap">Entrar</span>
                </button>

                {/* Botão Teste Grátis 1 Dia (Maior e com Reflexo Animado Contínuo da Esquerda para a Direita) */}
                <button
                  type="button"
                  onClick={onOpenFreeTrial}
                  className="relative group overflow-hidden inline-flex items-center justify-center gap-1.5 sm:gap-2.5 px-3.5 sm:px-6 min-h-[44px] sm:min-h-[48px] rounded-xl text-xs sm:text-base font-black text-emerald-950 bg-gradient-to-b from-emerald-300 via-emerald-400 to-teal-500 hover:from-emerald-200 hover:via-emerald-300 hover:to-teal-400 border-2 border-white/70 shadow-xl shadow-emerald-950/30 hover:shadow-2xl hover:shadow-emerald-500/30 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 cursor-pointer"
                  id="top-nav-free-trial-btn"
                >
                  {/* Mirror Top Specular Reflection (Brilho espelhado superior) */}
                  <div className="absolute inset-x-0 top-0 h-[48%] bg-gradient-to-b from-white/70 via-white/25 to-transparent pointer-events-none rounded-t-xl" />
                  
                  {/* Mirror Edge Highlight Line */}
                  <div className="absolute top-0 inset-x-2 h-[1px] bg-white/90 pointer-events-none" />

                  {/* Reflexo Animado Contínuo da Esquerda para a Direita */}
                  <div 
                    className="absolute inset-0 w-2/3 h-full bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-[-25deg] pointer-events-none animate-shimmer-sweep" 
                    aria-hidden="true"
                  />

                  <span className="relative z-10 tracking-tight whitespace-nowrap drop-shadow-xs">
                    <span className="hidden xs:inline">Teste </span>Grátis 1 Dia
                  </span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-900 relative z-10 transition-transform group-hover:translate-x-1" />
                </button>
              </>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};
