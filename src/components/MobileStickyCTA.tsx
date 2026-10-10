import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { PlanId } from '../types';

interface MobileStickyCTAProps {
  onOpenPlans: () => void;
  onOpenCheckout: (planId: PlanId) => void;
  onOpenFreeTrial: () => void;
}

export const MobileStickyCTA: React.FC<MobileStickyCTAProps> = ({
  onOpenPlans,
  onOpenCheckout,
  onOpenFreeTrial,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when user scrolls past 380px, hide near the very bottom footer if needed
      const scrollY = window.scrollY;
      if (scrollY > 380) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-[0_-8px_25px_rgba(0,0,0,0.08)] px-4 pt-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom,0px))] transition-all duration-300">
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        
        {/* Price & Guarantee Micro-Info */}
        <div className="flex flex-col">
          <div className="flex items-center gap-1 text-[11px] font-bold text-slate-900 leading-tight">
            <span>A partir de</span>
            <span className="text-blue-600 font-black text-xs">R$ 17,00/mês</span>
          </div>
          <span className="text-[10px] text-slate-500 font-medium leading-tight">
            7 dias de garantia total
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenFreeTrial}
            className="relative group overflow-hidden px-3.5 min-h-[44px] rounded-xl text-xs font-black text-amber-950 bg-gradient-to-r from-amber-300 to-amber-400 border border-amber-400 transition-colors cursor-pointer flex items-center justify-center shadow-xs"
          >
            <div 
              className="absolute inset-0 w-2/3 h-full bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-[-25deg] pointer-events-none animate-shimmer-sweep"
              aria-hidden="true"
            />
            <span className="relative z-10">Cadastre-se grátis</span>
          </button>

          <button
            type="button"
            onClick={() => onOpenCheckout('intermediario')}
            className="px-4 min-h-[44px] rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/30 transition-all cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span>Assinar</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
