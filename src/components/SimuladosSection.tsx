import React, { useState } from 'react';
import { 
  Printer, 
  Monitor, 
  Clock, 
  Award, 
  Download, 
  Eye, 
  ArrowRight,
  FileCheck2,
  FileText,
  Trophy,
  BarChart3,
  Layers,
  Zap
} from 'lucide-react';
import { BrandName } from './BrandName';

interface SimuladosSectionProps {
  onOpenPDFPreview: () => void;
  onOpenCheckout?: (planId?: string) => void;
  onOpenFreeTrial?: () => void;
}

export const SimuladosSection: React.FC<SimuladosSectionProps> = ({
  onOpenPDFPreview,
  onOpenCheckout,
  onOpenFreeTrial,
}) => {
  const [activeTab, setActiveTab] = useState<'hibrido' | 'pdf' | 'digital'>('hibrido');

  // Concursos ampliados com ENEM e outros, sem cargo e sem número de questões, com Personalizado intercalado
  const simuladosDisponiveis = [
    {
      nome: 'ENEM',
      banca: 'MEC / INEP',
      isCustom: false,
    },
    {
      nome: 'Polícia Federal',
      banca: 'CEBRASPE',
      isCustom: false,
    },
    {
      nome: 'PRF',
      banca: 'CEBRASPE',
      isCustom: false,
    },
    {
      nome: 'Personalizado',
      banca: 'Você escolhe banca e matérias',
      isCustom: true,
      tag: 'Monte o Seu',
    },
    {
      nome: 'INSS',
      banca: 'CEBRASPE',
      isCustom: false,
    },
    {
      nome: 'Caixa Econômica',
      banca: 'CESGRANRIO',
      isCustom: false,
    },
    {
      nome: 'TJ-SP',
      banca: 'VUNESP',
      isCustom: false,
    },
    {
      nome: 'Banco do Brasil',
      banca: 'CESGRANRIO',
      isCustom: false,
    },
    {
      nome: 'Personalizado',
      banca: 'Foco cirúrgico no seu edital',
      isCustom: true,
      tag: 'Sob Medida',
    },
    {
      nome: 'Receita Federal',
      banca: 'FGV',
      isCustom: false,
    },
    {
      nome: 'OAB 1ª Fase',
      banca: 'FGV',
      isCustom: false,
    },
    {
      nome: 'PM-SP',
      banca: 'VUNESP',
      isCustom: false,
    },
    {
      nome: 'CNU Unificado',
      banca: 'CESGRANRIO',
      isCustom: false,
    },
    {
      nome: 'Personalizado',
      banca: 'Selecione os seus pontos fracos',
      isCustom: true,
      tag: 'Personalizado',
    },
    {
      nome: 'Polícia Civil',
      banca: 'VUNESP / FGV',
      isCustom: false,
    },
    {
      nome: 'Tribunais (TRT / TRE)',
      banca: 'FCC / CEBRASPE',
      isCustom: false,
    },
  ];

  return (
    <section id="simulados" className="py-12 sm:py-16 lg:py-24 bg-gradient-to-b from-[#F0F7FF] via-[#E8F3FE]/85 to-[#F0F7FF] text-slate-900 border-b border-blue-200/70 relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] bg-blue-200/20 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* CABEÇALHO */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 space-y-2.5 sm:space-y-3">
          <h2 className="text-2xl sm:text-4xl lg:text-[2.65rem] font-black text-slate-900 tracking-tight leading-tight flex items-center justify-center flex-wrap gap-x-2.5">
            <span>Simulados Completos com o</span>
            <BrandName theme="blue" />
          </h2>

          <div className="text-xs sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Não treine apenas questões soltas. No dia da prova, o que aprova é o <strong>controle de tempo, o preenchimento do gabarito e a resistência mental</strong>. Escolha como prefere praticar:
          </div>
        </div>

        {/* OS DOIS FORMATOS LADO A LADO: PDF IMPRESSO VS DIGITAL NA TELA */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-10 sm:mb-12 items-stretch">
          
          {/* FORMATO 1: CADERNO EM PDF PARA IMPRIMIR */}
          <div className="bg-white rounded-3xl p-5 sm:p-8 border-2 border-blue-200 shadow-xl shadow-blue-900/5 flex flex-col justify-between relative overflow-hidden group hover:border-blue-400 transition-all">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-100/50 rounded-bl-full pointer-events-none -z-10" />

            <div>
              <div className="mb-4">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md shadow-amber-500/25">
                  <Printer className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-2">
                Caderno em PDF Diagramado
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5 sm:mb-6">
                Baixe e imprima em folha sulfite exatamente como a banca entrega no domingo de prova. Treine com caneta preta esferográfica e sem telas.
              </p>

              {/* Vantagens do PDF */}
              <div className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8">
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <FileCheck2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Diagramação em 2 colunas:</strong> padrão oficial das bancas CEBRASPE, FGV, VUNESP e FCC.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <FileCheck2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Cartão-Resposta incluso:</strong> folha com as bolinhas para treinar o tempo exato de preenchimento.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <FileCheck2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Gabarito comentado no final:</strong> com justificativa de cada item e análise de pegadinhas.</span>
                </div>
              </div>
            </div>

            {/* Ação: Abrir Preview do PDF */}
            <div className="pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={onOpenPDFPreview}
                className="w-full py-3 sm:py-3.5 px-4 sm:px-5 min-h-[48px] rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-black text-xs sm:text-sm shadow-lg shadow-amber-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer group-hover:scale-[1.01]"
              >
                <Eye className="w-4 h-4" />
                <span>Visualizar Modelo do PDF Impresso</span>
              </button>
              <span className="block text-center text-[10px] sm:text-[11px] text-slate-400 mt-2">
                Veja o caderno idêntico ao que você recebe para imprimir
              </span>
            </div>
          </div>

          {/* FORMATO 2: SIMULADO DIGITAL NA TELA */}
          <div className="bg-white rounded-3xl p-5 sm:p-8 border-2 border-blue-200 shadow-xl shadow-blue-900/5 flex flex-col justify-between relative overflow-hidden group hover:border-blue-500 transition-all">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100/50 rounded-bl-full pointer-events-none -z-10" />

            <div>
              <div className="mb-4">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-600/25">
                  <Monitor className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-2">
                Simulador Online com Cronômetro
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5 sm:mb-6">
                Faça no computador, tablet ou celular. O cronômetro regressivo simula a pressão do relógio do fiscal de sala com correção instantânea.
              </p>

              {/* Vantagens do Digital */}
              <div className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8">
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <Clock className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span><strong>Cronômetro inteligente:</strong> alerta de tempo médio por questão para você não se atrasar.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <Trophy className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span><strong>Ranking nacional ao vivo:</strong> compare sua pontuação líquida com milhares de concorrentes.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <BarChart3 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span><strong>Diagnóstico de pontos fracos:</strong> o app mostra exatamente quais matérias derrubaram sua nota.</span>
                </div>
              </div>
            </div>

            {/* Ação: Testar Simulado */}
            <div className="pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={onOpenFreeTrial || (() => onOpenCheckout && onOpenCheckout('intermediario'))}
                className="w-full py-3 sm:py-3.5 px-4 sm:px-5 min-h-[48px] rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-xs sm:text-sm shadow-lg shadow-blue-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer group-hover:scale-[1.01]"
              >
                <Zap className="w-4 h-4 fill-cyan-200 text-cyan-200" />
                <span>Testar Simulado Digital Grátis</span>
              </button>
              <span className="block text-center text-[10px] sm:text-[11px] text-slate-400 mt-2">
                Acesse o ambiente do aluno durante 24 horas sem custo
              </span>
            </div>
          </div>

        </div>

        {/* VITRINE DOS PRÓXIMOS SIMULADOS DISPONÍVEIS - ROLAGEM CONTÍNUA DA DIREITA PARA A ESQUERDA */}
        <div className="bg-white/85 backdrop-blur-md rounded-3xl border border-blue-200/80 p-5 sm:p-7 shadow-md overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-slate-200/80">
            <div>
              <h4 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                Simulados Prontos para Treino Imediato
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Role ou passe o mouse para pausar e ver detalhes de cada prova ou monte um personalizado.
              </p>
            </div>
            <button
              type="button"
              onClick={onOpenPDFPreview}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer self-start sm:self-auto shrink-0"
            >
              <span>Ver demonstração em PDF</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* CARROSSEL DE ROLAGEM CONTÍNUA DA DIREITA PARA A ESQUERDA */}
          <div className="relative overflow-hidden w-full py-1">
            {/* Sombras suaves nas bordas para efeito infinito */}
            <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

            {/* Trilha animada com repetição contínua */}
            <div className="animate-marquee-left flex gap-3.5 sm:gap-4 py-2 select-none">
              {[...simuladosDisponiveis, ...simuladosDisponiveis].map((item, idx) => {
                const isCustom = item.isCustom;

                if (isCustom) {
                  return (
                    <button
                      key={`custom-${idx}`}
                      type="button"
                      onClick={onOpenFreeTrial || onOpenPDFPreview}
                      className="w-[215px] sm:w-[235px] shrink-0 p-4 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 text-white border border-blue-400/80 shadow-md hover:shadow-xl hover:shadow-blue-600/30 transition-all text-left flex flex-col justify-between cursor-pointer group hover:scale-[1.02]"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-1.5 mb-2.5">
                          <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-white/20 text-white backdrop-blur-xs tracking-wider border border-white/20">
                            {item.tag || 'Personalizado'}
                          </span>
                          <span className="text-[10px] font-semibold text-blue-200">
                            Simulado
                          </span>
                        </div>

                        <h5 className="font-black text-base text-white tracking-tight">
                          {item.nome}
                        </h5>
                        <p className="text-[11px] text-blue-100 font-medium mt-1 leading-snug">
                          {item.banca}
                        </p>
                      </div>

                      <div className="pt-2.5 mt-3 border-t border-white/20 flex items-center justify-between text-[11px] font-bold text-blue-100">
                        <span className="flex items-center gap-1 text-white">
                          <FileCheck2 className="w-3.5 h-3.5 text-cyan-200" />
                          PDF + Online
                        </span>
                        <span className="text-amber-300 font-extrabold group-hover:translate-x-0.5 transition-transform">
                          Criar →
                        </span>
                      </div>
                    </button>
                  );
                }

                return (
                  <button
                    key={`${item.nome}-${idx}`}
                    type="button"
                    onClick={onOpenPDFPreview}
                    className="w-[215px] sm:w-[235px] shrink-0 p-4 rounded-2xl bg-slate-50 border border-slate-200/90 hover:border-blue-300 hover:bg-blue-50/50 hover:shadow-md transition-all text-left flex flex-col justify-between cursor-pointer group hover:scale-[1.02]"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1.5 mb-2.5">
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-blue-100 text-blue-800 tracking-wider">
                          {item.banca}
                        </span>
                        <span className="text-[10px] font-semibold text-slate-400">
                          Simulado
                        </span>
                      </div>

                      <h5 className="font-extrabold text-base text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-1">
                        {item.nome}
                      </h5>
                    </div>

                    <div className="pt-2.5 mt-3 border-t border-slate-200/70 flex items-center justify-between text-[11px] font-bold">
                      <span className="text-slate-500 flex items-center gap-1">
                        <FileText className="w-3.5 h-3.5 text-blue-500" />
                        PDF + Online
                      </span>
                      <span className="text-blue-600 font-extrabold group-hover:translate-x-0.5 transition-transform">
                        Treinar →
                      </span>
                    </div>
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
