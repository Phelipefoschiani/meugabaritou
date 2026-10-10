import React from 'react';
import { XCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { BrandIcon } from './BrandLogo';
import { BrandName } from './BrandName';

interface ComparisonVsTraditionalProps {
  onOpenPlans: () => void;
}

export const ComparisonVsTraditionalSection: React.FC<ComparisonVsTraditionalProps> = ({
  onOpenPlans,
}) => {
  const comparisons = [
    {
      pillar: 'Resolução & Comentários',
      traditional: 'Fóruns desorganizados de 2014, opiniões contraditórias de outros alunos e respostas sem embasamento.',
      meuGabaritou: 'Resolução didática linha por linha por professores, explicando a pegadinha exata de cada alternativa errada.',
    },
    {
      pillar: 'Treino Real da Prova',
      traditional: '100% preso na tela do computador. No dia da prova você sofre com cansaço mental e erra preenchimento de bolinha.',
      meuGabaritou: 'Gere simulados completos em PDF formatados para folha A4 com cartão-resposta oficial para treinar a caneta preta.',
    },
    {
      pillar: 'Diagnóstico dos Erros',
      traditional: 'Apenas uma porcentagem geral ("70% de acertos"). Você continua sem saber exatamente onde está perdendo pontos.',
      meuGabaritou: 'Raio-X de pontos cegos por subtema e filtro inteligente para retrabalhar exclusivamente as questões erradas.',
    },
    {
      pillar: 'Velocidade no Celular',
      traditional: 'Sistemas pesados, lentos, cheios de poluição visual e dezenas de filtros complexos que desanimam o estudo diário.',
      meuGabaritou: 'Tecnologia leve e instantânea. Resolva de 20 a 50 questões no celular na pausa do almoço, no ônibus ou antes de dormir.',
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900">
            Por que concurseiros sérios estão trocando de plataforma?
          </h2>

          <p className="text-sm sm:text-base text-slate-600">
            A diferença entre apenas acumular questões em plataformas antigas e estudar com o método do <BrandName theme="blue" />.
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-12">
          
          {/* Card: Plataformas Tradicionais */}
          <div className="rounded-2xl border border-rose-200 bg-rose-50/30 p-6 sm:p-8">
            <div className="flex items-center gap-2 text-rose-600 font-extrabold text-sm uppercase tracking-wider mb-6">
              <XCircle className="w-5 h-5 text-rose-500" />
              <span>Plataformas Antigas & Fóruns</span>
            </div>

            <div className="space-y-6">
              {comparisons.map((item, idx) => (
                <div key={idx} className="space-y-1.5 pb-5 border-b border-rose-100 last:border-0 last:pb-0">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                    {item.pillar}
                  </div>
                  <div className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed flex items-start gap-2">
                    <span className="text-rose-500 font-bold shrink-0">✕</span>
                    <span>{item.traditional}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card: Meu Gabaritou */}
          <div className="rounded-2xl border-2 border-blue-500 bg-blue-50/40 p-6 sm:p-8 shadow-xl shadow-blue-500/10 relative">
            <div className="absolute -top-3.5 right-6 px-3 py-1 rounded-full bg-blue-600 text-white text-[11px] font-black tracking-wider uppercase shadow-md">
              Metodologia Moderna
            </div>

            <div className="flex items-center gap-2 text-blue-700 font-extrabold text-sm uppercase tracking-wider mb-6">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div className="flex items-center gap-2">
                <span>O Novo Padrão:</span>
                <span className="inline-flex items-center gap-1.5">
                  <BrandIcon size={18} />
                  <BrandName theme="blue" />
                </span>
              </div>
            </div>

            <div className="space-y-6">
              {comparisons.map((item, idx) => (
                <div key={idx} className="space-y-1.5 pb-5 border-b border-blue-100/80 last:border-0 last:pb-0">
                  <div className="text-xs font-bold text-blue-700 uppercase tracking-wide">
                    {item.pillar}
                  </div>
                  <div className="text-xs sm:text-sm text-slate-900 font-semibold leading-relaxed flex items-start gap-2">
                    <span className="text-emerald-600 font-bold shrink-0">✓</span>
                    <span>{item.meuGabaritou}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Conversion Callout Banner - Enxuto, mais estreito e direto ao ponto */}
        <div className="max-w-3xl mx-auto relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 border border-blue-500/40 p-6 sm:p-7 shadow-xl shadow-blue-950/30 text-center">
          {/* Subtle Ambient Lighting */}
          <div className="absolute -top-16 -left-16 w-48 h-48 bg-blue-600/20 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-emerald-500/15 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center gap-4">
            {/* Title & Concise Copy */}
            <div className="max-w-xl mx-auto">
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug">
                Pare de gastar horas em fóruns confusos.
                <span className="block mt-1 sm:mt-1.5 bg-gradient-to-r from-blue-400 via-sky-300 to-emerald-300 bg-clip-text text-transparent">
                  Estude com foco cirúrgico.
                </span>
              </h3>
            </div>

            {/* Shimmering Direct Button */}
            <div className="pt-1">
              <button
                type="button"
                onClick={onOpenPlans}
                className="relative group overflow-hidden px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-sm sm:text-base tracking-wide shadow-lg shadow-blue-600/35 hover:shadow-xl hover:shadow-blue-500/45 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer border border-blue-400/40 flex items-center justify-center gap-2.5"
              >
                {/* Continuous Shimmer Light Sweep */}
                <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-25deg] pointer-events-none animate-shimmer-sweep" />

                <span className="relative z-10 font-black">Ver Planos Disponíveis</span>
                <ArrowRight className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
