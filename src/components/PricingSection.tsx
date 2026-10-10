import React, { useState } from 'react';
import { 
  Check, 
  ShieldCheck, 
  Star, 
  ArrowRight,
  Compass,
  Rocket,
  Award
} from 'lucide-react';
import { PLANS_DATA } from '../data/plansData';
import { PlanId } from '../types';
import { getKiwifyCheckoutUrl } from '../config/kiwifyConfig';

interface PricingSectionProps {
  onSelectPlan: (planId: PlanId, billingCycle?: 'monthly' | 'quarterly') => void;
  onOpenFreeTrial?: () => void;
}

const PLAN_THEMES: Record<
  PlanId,
  {
    cardBg: string;
    border: string;
    shadow: string;
    badgeBg: string;
    badgeText: string;
    badgeBorder: string;
    badgeIcon: React.ReactNode;
    titleColor: string;
    actionBadge: string;
    taglineColor: string;
    priceBox: string;
    priceTextColor: string;
    audienceBox: string;
    audienceLabelColor: string;
    checkCircle: string;
    checkIcon: string;
    button: string;
    guaranteeIcon: string;
    elevation: string;
  }
> = {
  iniciante: {
    // Retângulo 1: Verde Esmeralda
    cardBg: 'bg-gradient-to-b from-emerald-50/95 via-white to-emerald-50/30',
    border: 'border-2 border-emerald-400 hover:border-emerald-500',
    shadow: 'shadow-lg shadow-emerald-600/10 hover:shadow-xl hover:shadow-emerald-600/20',
    badgeBg: 'bg-emerald-600 text-white',
    badgeText: 'text-white',
    badgeBorder: 'border-emerald-400 shadow-md',
    badgeIcon: <Compass className="w-3.5 h-3.5 text-emerald-100 shrink-0" />,
    titleColor: 'text-emerald-950',
    actionBadge: 'bg-emerald-100 text-emerald-800 border border-emerald-300/80 font-bold',
    taglineColor: 'text-emerald-800/80',
    priceBox: 'bg-emerald-100/40 border border-emerald-200/80',
    priceTextColor: 'text-emerald-950',
    audienceBox: 'bg-white/95 border border-emerald-200/90 text-slate-700',
    audienceLabelColor: 'text-emerald-900',
    checkCircle: 'bg-emerald-100 text-emerald-700 border border-emerald-200',
    checkIcon: 'text-emerald-700',
    button: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/25 hover:shadow-xl hover:shadow-emerald-600/35 hover:scale-[1.01]',
    guaranteeIcon: 'text-emerald-600',
    elevation: 'hover:-translate-y-1',
  },
  intermediario: {
    // Retângulo 2: Destaque Central (Claro, limpo e com leitura impecável)
    cardBg: 'bg-white',
    border: 'border-2 border-blue-500 hover:border-blue-600 ring-4 ring-blue-100',
    shadow: 'shadow-xl shadow-blue-500/10 lg:-translate-y-4 hover:shadow-2xl hover:shadow-blue-500/15 z-10',
    badgeBg: 'bg-blue-600 text-white',
    badgeText: 'text-white',
    badgeBorder: 'border-blue-400 shadow-md',
    badgeIcon: <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300 shrink-0" />,
    titleColor: 'text-slate-900',
    actionBadge: 'bg-blue-100 text-blue-800 border border-blue-200 font-extrabold',
    taglineColor: 'text-slate-600',
    priceBox: 'bg-blue-50/80 border border-blue-200',
    priceTextColor: 'text-slate-950',
    audienceBox: 'bg-slate-50/90 border border-slate-200 text-slate-700',
    audienceLabelColor: 'text-slate-900',
    checkCircle: 'bg-blue-100 text-blue-700 border border-blue-200',
    checkIcon: 'text-blue-700',
    button: 'bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-600/30 hover:shadow-2xl hover:shadow-blue-600/40 hover:scale-[1.01] ring-2 ring-blue-600/20 py-4 font-black',
    guaranteeIcon: 'text-blue-600',
    elevation: 'lg:-translate-y-4 hover:-translate-y-5',
  },
  avancado: {
    // Retângulo 3: Roxo Imperial / Violeta
    cardBg: 'bg-gradient-to-b from-purple-50/95 via-fuchsia-50/20 to-white',
    border: 'border-2 border-purple-400 hover:border-purple-600',
    shadow: 'shadow-lg shadow-purple-600/10 hover:shadow-xl hover:shadow-purple-600/20',
    badgeBg: 'bg-purple-700 text-white',
    badgeText: 'text-white',
    badgeBorder: 'border-purple-400 shadow-md',
    badgeIcon: <Rocket className="w-3.5 h-3.5 text-amber-300 shrink-0" />,
    titleColor: 'text-purple-950',
    actionBadge: 'bg-purple-100 text-purple-900 border border-purple-300/80 font-bold',
    taglineColor: 'text-purple-800/80',
    priceBox: 'bg-purple-100/40 border border-purple-200/80',
    priceTextColor: 'text-purple-950',
    audienceBox: 'bg-white/95 border border-purple-200/90 text-slate-700',
    audienceLabelColor: 'text-purple-900',
    checkCircle: 'bg-purple-100 text-purple-700 border border-purple-200',
    checkIcon: 'text-purple-700',
    button: 'bg-purple-700 hover:bg-purple-800 text-white shadow-lg shadow-purple-700/25 hover:shadow-xl hover:shadow-purple-700/35 hover:scale-[1.01]',
    guaranteeIcon: 'text-purple-600',
    elevation: 'hover:-translate-y-1',
  },
};

const formatPriceBRL = (val: number): string => {
  return val.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const PricingSection: React.FC<PricingSectionProps> = ({ 
  onSelectPlan,
}) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'quarterly'>('quarterly');

  return (
    <section id="planos" className="py-20 lg:py-24 bg-slate-50/60 text-slate-900 border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
            Planos & Preços Oficiais
          </h2>

          <p className="text-base sm:text-lg text-slate-600">
            Escolha o nível ideal para o seu momento de preparação. Cancele com 1 clique quando quiser.
          </p>

          {/* Billing Cycle Switch: Mensal vs Trimestral */}
          <div className="pt-2 sm:pt-4 flex items-center justify-center">
            <div className="bg-white p-1 rounded-xl w-full max-w-xs sm:max-w-md grid grid-cols-2 gap-1 border border-slate-200 shadow-xs">
              <button
                type="button"
                onClick={() => setBillingCycle('monthly')}
                className={`py-2 px-2.5 sm:px-5 min-h-[44px] rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center text-center ${
                  billingCycle === 'monthly'
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>Mensal</span>
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle('quarterly')}
                className={`py-2 px-2.5 sm:px-5 min-h-[44px] rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1 sm:gap-2 cursor-pointer text-center ${
                  billingCycle === 'quarterly'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>Trimestral</span>
              </button>
            </div>
          </div>
        </div>

        {/* 3 Pricing Cards Grid: Each rectangle has its own distinct color */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch max-w-6xl mx-auto pt-2 sm:pt-4">
          {PLANS_DATA.map((plan) => {
            const pricePerMonth = billingCycle === 'monthly' ? plan.priceMonthly : plan.priceQuarterly;
            const totalPrice = billingCycle === 'monthly' ? plan.priceMonthly : plan.priceQuarterlyTotal;
            const theme = PLAN_THEMES[plan.id];

            return (
              <div
                key={plan.id}
                className={`rounded-2xl p-5 sm:p-7 flex flex-col justify-between transition-all duration-300 relative ${theme.cardBg} ${theme.border} ${theme.shadow} ${theme.elevation}`}
              >
                {/* Plan Top Badge */}
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className={`px-4 py-1 rounded-full text-xs font-black uppercase tracking-wide flex items-center gap-1.5 border ${theme.badgeBg} ${theme.badgeBorder}`}>
                      {theme.badgeIcon}
                      <span>{plan.badge}</span>
                    </span>
                  </div>
                )}

                <div>
                  {/* Plan Header */}
                  <div className="mb-5 pt-1 text-center">
                    <h3 className={`text-2xl font-black ${theme.titleColor} tracking-tight`}>
                      {plan.name}
                    </h3>
                    <div className="mt-2 flex justify-center">
                      <span className={`inline-flex items-center px-3 py-1 rounded-md text-[11px] ${theme.actionBadge}`}>
                        {plan.summaryAction}
                      </span>
                    </div>
                    <p className={`text-xs ${theme.taglineColor} mt-2.5 font-medium max-w-xs mx-auto`}>
                      {plan.tagline}
                    </p>
                  </div>

                  {/* Price Box */}
                  <div className={`p-4 rounded-xl ${theme.priceBox} mb-6`}>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-sm font-bold text-slate-500">R$</span>
                      <span className={`text-4xl sm:text-5xl font-black ${theme.priceTextColor} tracking-tight`}>
                        {formatPriceBRL(pricePerMonth)}
                      </span>
                      <span className="text-xs font-bold text-slate-500">/mês</span>
                    </div>
                    <div className="text-[11px] text-slate-600 mt-2 font-medium flex items-center justify-between flex-wrap gap-1">
                      <span>
                        {billingCycle === 'quarterly' 
                          ? `Faturado trimestralmente: R$ ${formatPriceBRL(totalPrice)} a cada 3 meses` 
                          : 'Cobrança mensal sem fidelidade • Cancele quando quiser'}
                      </span>
                      {billingCycle === 'quarterly' && (
                        <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/90 px-2 py-0.5 rounded border border-emerald-200">
                          Economize R$ {formatPriceBRL((plan.priceMonthly * 3) - totalPrice)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Audience Summary */}
                  <div className={`p-4 rounded-xl ${theme.audienceBox} mb-6 text-xs leading-relaxed shadow-2xs`}>
                    <strong className={`block ${theme.audienceLabelColor} font-black mb-1 text-[11px] uppercase tracking-wider`}>
                      Para quem é indicado:
                    </strong>
                    <p className="text-slate-600">
                      {plan.description}
                    </p>
                  </div>

                  {/* Feature Highlights */}
                  <div className="space-y-3 mb-8">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      Recursos inclusos no plano:
                    </div>
                    {plan.highlights.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                        <span className={`w-5 h-5 rounded-full ${theme.checkCircle} flex items-center justify-center shrink-0 mt-0.5 shadow-2xs`}>
                          <Check className={`w-3.5 h-3.5 stroke-[2.8] ${theme.checkIcon}`} />
                        </span>
                        <span className="leading-tight pt-0.5 font-medium">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card CTA */}
                <div>
                  <a
                    href={getKiwifyCheckoutUrl(plan.id, billingCycle)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => onSelectPlan && onSelectPlan(plan.id, billingCycle)}
                    className={`w-full py-4 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${theme.button}`}
                    id={`pricing-select-${plan.id}-btn`}
                  >
                    <span>Assinar Plano {plan.name}</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>

                  <div className="mt-3.5 text-center">
                    <span className="text-[11px] text-slate-500 flex items-center justify-center gap-1.5 font-medium">
                      <ShieldCheck className={`w-4 h-4 ${theme.guaranteeIcon}`} />
                      7 dias de garantia incondicional • Kiwify Seguro
                    </span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Selo Diário Oficial e Auditoria de Editais */}
        <div className="mt-10 sm:mt-12 max-w-2xl mx-auto p-4 sm:p-5 rounded-2xl bg-amber-50/90 border-2 border-amber-300/80 shadow-md flex items-center gap-3.5 sm:gap-4 text-xs">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black shrink-0 shadow-sm">
            <Award className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div className="text-left space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] font-black uppercase px-2 py-0.5 bg-amber-200/90 text-amber-950 rounded">
                PADRÃO DIÁRIO OFICIAL (DOU)
              </span>
              <span className="text-[11px] font-bold text-amber-900 hidden xs:inline">
                Homologação de Editais 2024/2025
              </span>
            </div>
            <p className="text-xs text-slate-800 font-semibold leading-relaxed">
              Questões e simulados formatados com a mesma matriz de competências aplicada pelas comissões oficiais de concursos federais, estaduais e municipais.
            </p>
          </div>
        </div>

        {/* Comparison Callout */}
        <div className="text-center mt-14">
          <a 
            href="#comparativo" 
            className="text-sm text-blue-600 hover:text-blue-700 font-bold hover:underline inline-flex items-center gap-1.5"
          >
            <span>Ver tabela comparativa completa com os 17 recursos</span>
            <span>↓</span>
          </a>
        </div>

      </div>
    </section>
  );
};
