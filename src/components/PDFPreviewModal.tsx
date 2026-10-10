import React, { useState } from 'react';
import { 
  X, 
  Printer, 
  FileText, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  Star, 
  Rocket, 
  ExternalLink
} from 'lucide-react';
import { getKiwifyCheckoutUrl } from '../config/kiwifyConfig';

interface PDFPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlan?: (planId: 'intermediario' | 'avancado', cycle?: 'monthly' | 'quarterly') => void;
}

export const PDFPreviewModal: React.FC<PDFPreviewModalProps> = ({
  isOpen,
  onClose,
  onSelectPlan,
}) => {
  const [view, setView] = useState<'preview' | 'choose_plan'>('preview');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'quarterly'>('monthly');

  if (!isOpen) return null;

  const handleClose = () => {
    setView('preview');
    onClose();
  };

  const handlePlanClick = (planId: 'intermediario' | 'avancado') => {
    if (onSelectPlan) {
      onSelectPlan(planId, billingCycle);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-slate-100 rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-300 overflow-hidden">
        
        {/* Modal Top Bar */}
        <div className="px-5 sm:px-6 py-4 bg-white border-b border-slate-200 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold border border-blue-200 shrink-0">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
                {view === 'choose_plan' 
                  ? 'Planos com Gerador de Provas em PDF' 
                  : 'Modelo de Simulado Impresso em PDF (A4)'}
              </h3>
              <p className="text-xs text-slate-500">
                {view === 'choose_plan'
                  ? 'Selecione abaixo o plano desejado para gerar cadernos e gabaritos'
                  : 'Gere provas completas com folha de respostas nos planos Intermediário e Avançado'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {view === 'choose_plan' ? (
              <button
                type="button"
                onClick={() => setView('preview')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer border border-slate-200"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Ver Modelo de Prova</span>
                <span className="sm:hidden">Voltar</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer border border-slate-200"
              >
                <Printer className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Imprimir Modelo</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer transition-colors"
              title="Fechar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* View 1: PDF Sheet Representation */}
        {view === 'preview' ? (
          <>
            <div className="p-3 sm:p-6 overflow-y-auto flex-1 bg-slate-200/80 flex justify-center">
              <div className="bg-white text-slate-900 shadow-lg rounded-sm w-full max-w-2xl p-4 sm:p-8 border border-slate-300 font-sans text-xs leading-normal">
                
                {/* Exam Header */}
                <div className="border-2 border-slate-800 p-3 sm:p-4 mb-4 sm:mb-5 flex flex-col sm:flex-row justify-between items-center text-center gap-2 sm:gap-0">
                  <div className="text-center sm:text-left sm:w-1/4">
                    <div className="font-black text-sm uppercase tracking-tight text-blue-700">
                      MEU GABARITOU
                    </div>
                    <div className="text-[10px] text-slate-600 font-medium">Simulado Oficial</div>
                  </div>
                  <div className="sm:w-2/4">
                    <h4 className="font-extrabold text-xs sm:text-sm uppercase tracking-wider text-slate-900">
                      CADERNO DE QUESTÕES • SIMULADO GERAL
                    </h4>
                    <div className="text-[10px] sm:text-[11px] font-semibold text-slate-700">
                      ENEM & CONCURSOS PÚBLICOS • 2026
                    </div>
                  </div>
                  <div className="text-center sm:text-right sm:w-1/4">
                    <div className="text-[10px] font-mono text-slate-600">PROVA: 8941-MG</div>
                    <div className="text-[10px] text-slate-500">DURAÇÃO: 4h30min</div>
                  </div>
                </div>

                {/* Candidate Info Box */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 p-3 bg-slate-50 border border-slate-300 rounded mb-4 sm:mb-5 text-[11px]">
                  <div>
                    <span className="font-bold">NOME: </span>
                    <span className="border-b border-dashed border-slate-400 inline-block w-36 sm:w-44"></span>
                  </div>
                  <div className="sm:text-right">
                    <span className="font-bold">DATA: </span>
                    <span>___ / ___ / 2026</span>
                  </div>
                </div>

                {/* Instructions */}
                <div className="mb-4 sm:mb-5 p-2.5 bg-slate-100 border-l-4 border-blue-600 text-[10px] space-y-1">
                  <div className="font-bold text-blue-950">INSTRUÇÕES AO CANDIDATO:</div>
                  <div>• Utilize apenas caneta esferográfica de tinta preta fabricada em material transparente.</div>
                  <div>• Este caderno contém questões formuladas com 5 alternativas (A, B, C, D, E) com apenas uma resposta correta.</div>
                  <div>• Transfira as respostas para a FOLHA DE RESPOSTAS na última folha antes de finalizar o tempo.</div>
                </div>

                {/* Questions in 2 columns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pb-6 border-b border-slate-300">
                  {/* Question 1 */}
                  <div className="space-y-2">
                    <div className="font-bold text-[11px] bg-slate-100 p-1 rounded border border-slate-200 text-slate-900">
                      QUESTÃO 01 (Matemática • Funções)
                    </div>
                    <p className="text-[11px] text-justify leading-relaxed text-slate-800">
                      Um comerciante determinou que o custo diário C, em reais, para produzir x unidades de um item é C(x) = x² - 40x + 600. Sabendo que o custo total deve ser mínimo, a quantidade ideal de produção diária e o valor do custo mínimo são:
                    </p>
                    <div className="space-y-1 text-[10px] pl-1 text-slate-700">
                      <div><strong>(A)</strong> 15 peças e R$ 150,00</div>
                      <div><strong>(B)</strong> 20 peças e R$ 200,00</div>
                      <div><strong>(C)</strong> 20 peças e R$ 400,00</div>
                      <div><strong>(D)</strong> 40 peças e R$ 600,00</div>
                      <div><strong>(E)</strong> 25 peças e R$ 225,00</div>
                    </div>
                  </div>

                  {/* Question 2 */}
                  <div className="space-y-2">
                    <div className="font-bold text-[11px] bg-slate-100 p-1 rounded border border-slate-200 text-slate-900">
                      QUESTÃO 02 (Português • Sintaxe)
                    </div>
                    <p className="text-[11px] text-justify leading-relaxed text-slate-800">
                      Assinale a alternativa em que a concordância verbal está em estrita conformidade com a norma-padrão da língua portuguesa:
                    </p>
                    <div className="space-y-1 text-[10px] pl-1 text-slate-700">
                      <div><strong>(A)</strong> Fazem muitos anos que não se realizavam concursos nessa região.</div>
                      <div><strong>(B)</strong> Havia muitas dúvidas entre os candidatos durante a prova.</div>
                      <div><strong>(C)</strong> Devem haver outras maneiras de solucionar o problema.</div>
                      <div><strong>(D)</strong> Tratam-se de questões prioritárias para a educação.</div>
                      <div><strong>(E)</strong> Aluga-se salas comerciais no centro da cidade.</div>
                    </div>
                  </div>
                </div>

                {/* Answer Sheet Mock */}
                <div className="pt-4 sm:pt-5 text-center">
                  <div className="text-[11px] font-bold uppercase tracking-wider mb-2 text-slate-800">
                    Cartão-Resposta / Folha Óptica Destacável
                  </div>
                  <div className="inline-block border border-slate-300 p-2.5 sm:p-3 bg-slate-50 rounded max-w-full overflow-x-auto">
                    <div className="flex gap-3 sm:gap-4 text-[9.5px] sm:text-[10px] text-slate-700 font-mono">
                      <div className="space-y-1">
                        <div>Q01: ◯ A ◯ B ◯ C ◯ D ◯ E</div>
                        <div>Q02: ◯ A ◯ B ◯ C ◯ D ◯ E</div>
                        <div>Q03: ◯ A ◯ B ◯ C ◯ D ◯ E</div>
                      </div>
                      <div className="space-y-1">
                        <div>Q04: ◯ A ◯ B ◯ C ◯ D ◯ E</div>
                        <div>Q05: ◯ A ◯ B ◯ C ◯ D ◯ E</div>
                        <div>Q06: ◯ A ◯ B ◯ C ◯ D ◯ E</div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Modal Footer CTA */}
            <div className="px-4 sm:px-6 py-3.5 sm:py-4 bg-white border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs text-slate-600 text-center sm:text-left">
                Incluso nos planos <strong>Intermediário (R$ 47)</strong> e <strong>Avançado (R$ 77)</strong>
              </div>
              <button
                type="button"
                onClick={() => setView('choose_plan')}
                className="w-full sm:w-auto px-5 sm:px-6 py-3 min-h-[44px] rounded-xl font-bold text-xs sm:text-sm text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-md shadow-blue-600/20 hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Desbloquear Gerador de Simulados em PDF</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </>
        ) : (
          /* View 2: Prompt to choose one of the plans that has the PDF feature available */
          <div className="p-5 sm:p-8 overflow-y-auto flex-1 bg-slate-50 flex flex-col items-center">
            <div className="max-w-3xl w-full">
              
              {/* Header explanation */}
              <div className="text-center mb-6">
                <h4 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Qual plano você prefere para desbloquear o Gerador em PDF?
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto mt-1">
                  A diagramação de provas para impressão e folhas de gabarito em PDF está disponível nos planos <strong>Intermediário</strong> e <strong>Avançado</strong>. Selecione o seu:
                </p>

                {/* Billing Cycle Switch */}
                <div className="mt-4 inline-flex items-center gap-1 p-1 bg-white rounded-xl border border-slate-200 shadow-2xs">
                  <button
                    type="button"
                    onClick={() => setBillingCycle('monthly')}
                    className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      billingCycle === 'monthly'
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Mensal
                  </button>
                  <button
                    type="button"
                    onClick={() => setBillingCycle('quarterly')}
                    className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                      billingCycle === 'quarterly'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <span>Trimestral</span>
                    <span className="bg-amber-300 text-amber-950 px-1.5 py-0.5 rounded text-[10px] font-extrabold">
                      -20%
                    </span>
                  </button>
                </div>
              </div>

              {/* The 2 Plans that have PDF Available */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                
                {/* 1. Plano Intermediário */}
                <div className="bg-gradient-to-b from-blue-50/70 via-white to-blue-50/30 rounded-2xl p-6 border-2 border-blue-500 shadow-md flex flex-col justify-between relative hover:border-blue-600 transition-all">
                  <div className="absolute -top-3 left-6">
                    <span className="bg-blue-600 text-white border border-blue-700 px-3 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider flex items-center gap-1 shadow-xs">
                      <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
                      <span>Mais Escolhido</span>
                    </span>
                  </div>

                  <div>
                    <div className="pt-2 mb-3 text-center">
                      <h5 className="text-xl font-black text-blue-950">Plano Intermediário</h5>
                      <div className="mt-1 flex justify-center">
                        <span className="inline-block text-xs font-bold text-blue-700 bg-blue-100/80 px-2.5 py-0.5 rounded">
                          Pratique + Analise
                        </span>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="bg-white/90 p-3.5 rounded-xl border border-blue-100 mb-4">
                      <div className="flex items-baseline gap-1">
                        <span className="text-xs font-bold text-slate-500">R$</span>
                        <span className="text-3xl font-black text-blue-900">
                          {billingCycle === 'monthly' ? '47,00' : '37,60'}
                        </span>
                        <span className="text-xs font-bold text-slate-500">/mês</span>
                      </div>
                      <div className="text-[11px] text-slate-600 mt-1 font-medium">
                        {billingCycle === 'quarterly'
                          ? 'Faturado R$ 112,80 a cada 3 meses (20% OFF)'
                          : 'Cobrança mensal sem fidelidade'}
                      </div>
                    </div>

                    {/* PDF and Core features */}
                    <div className="space-y-2 mb-6">
                      <div className="text-[11px] font-extrabold uppercase tracking-wider text-blue-900">
                        O que você desbloqueia:
                      </div>
                      <div className="flex items-start gap-2 text-xs text-slate-800 font-semibold bg-blue-100/50 p-2 rounded-lg border border-blue-200">
                        <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <span>Gerador ilimitado de simulados em PDF (A4 para imprimir)</span>
                      </div>
                      <div className="flex items-start gap-2 text-xs text-slate-700">
                        <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <span>Cartão-resposta oficial destacável para caneta</span>
                      </div>
                      <div className="flex items-start gap-2 text-xs text-slate-700">
                        <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <span>Simulados online ilimitados e personalizados</span>
                      </div>
                      <div className="flex items-start gap-2 text-xs text-slate-700">
                        <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <span>Caderno de revisão exclusivo de questões erradas</span>
                      </div>
                      <div className="flex items-start gap-2 text-xs text-slate-700">
                        <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <span>Diagnóstico de desempenho e metas diárias</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-bold text-blue-800 bg-blue-100/60 p-2 rounded-lg border border-blue-200/80 mt-1">
                        <span>+ 9 outros recursos inclusos neste plano</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <a
                      href={getKiwifyCheckoutUrl('intermediario', billingCycle)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => handlePlanClick('intermediario')}
                      className="w-full py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Desbloquear no Intermediário</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <div className="text-[10px] text-slate-500 text-center mt-2 flex items-center justify-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                      <span>7 dias de garantia incondicional</span>
                    </div>
                  </div>
                </div>

                {/* 2. Plano Avançado */}
                <div className="bg-gradient-to-b from-purple-50/70 via-white to-purple-50/30 rounded-2xl p-6 border-2 border-purple-400 shadow-md flex flex-col justify-between relative hover:border-purple-500 transition-all">
                  <div className="absolute -top-3 left-6">
                    <span className="bg-purple-700 text-white border border-purple-800 px-3 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider flex items-center gap-1 shadow-xs">
                      <Rocket className="w-3 h-3 text-amber-300" />
                      <span>Máxima Performance</span>
                    </span>
                  </div>

                  <div>
                    <div className="pt-2 mb-3 text-center">
                      <h5 className="text-xl font-black text-purple-950">Plano Avançado</h5>
                      <div className="mt-1 flex justify-center">
                        <span className="inline-block text-xs font-bold text-purple-700 bg-purple-100/80 px-2.5 py-0.5 rounded">
                          Pratique + Analise + Mentoria Guiada
                        </span>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="bg-white/90 p-3.5 rounded-xl border border-purple-100 mb-4">
                      <div className="flex items-baseline gap-1">
                        <span className="text-xs font-bold text-slate-500">R$</span>
                        <span className="text-3xl font-black text-purple-900">
                          {billingCycle === 'monthly' ? '77,00' : '61,60'}
                        </span>
                        <span className="text-xs font-bold text-slate-500">/mês</span>
                      </div>
                      <div className="text-[11px] text-slate-600 mt-1 font-medium">
                        {billingCycle === 'quarterly'
                          ? 'Faturado R$ 184,80 a cada 3 meses (20% OFF)'
                          : 'Cobrança mensal sem fidelidade'}
                      </div>
                    </div>

                    {/* PDF and Advanced features */}
                    <div className="space-y-2 mb-6">
                      <div className="text-[11px] font-extrabold uppercase tracking-wider text-purple-950">
                        O que você desbloqueia:
                      </div>
                      <div className="flex items-start gap-2 text-xs text-slate-800 font-semibold bg-purple-100/50 p-2 rounded-lg border border-purple-200">
                        <Check className="w-4 h-4 text-purple-700 shrink-0 mt-0.5" />
                        <span>Tudo do Intermediário (inclusive Gerador de PDF em A4)</span>
                      </div>
                      <div className="flex items-start gap-2 text-xs text-slate-700">
                        <Check className="w-4 h-4 text-purple-700 shrink-0 mt-0.5" />
                        <span>Plano semanal automático baseado no edital</span>
                      </div>
                      <div className="flex items-start gap-2 text-xs text-slate-700">
                        <Check className="w-4 h-4 text-purple-700 shrink-0 mt-0.5" />
                        <span>Fila diária inteligente com Revisão Espaçada (SRS)</span>
                      </div>
                      <div className="flex items-start gap-2 text-xs text-slate-700">
                        <Check className="w-4 h-4 text-purple-700 shrink-0 mt-0.5" />
                        <span>Simulado adaptativo focado nas suas fraquezas</span>
                      </div>
                      <div className="flex items-start gap-2 text-xs text-slate-700">
                        <Check className="w-4 h-4 text-purple-700 shrink-0 mt-0.5" />
                        <span>Missão diária de estudo e projeção de nota</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-bold text-purple-900 bg-purple-100/60 p-2 rounded-lg border border-purple-200/80 mt-1">
                        <span>+ 13 outros recursos inclusos neste plano</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <a
                      href={getKiwifyCheckoutUrl('avancado', billingCycle)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => handlePlanClick('avancado')}
                      className="w-full py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm text-white bg-purple-700 hover:bg-purple-800 shadow-md shadow-purple-700/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Desbloquear no Avançado</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <div className="text-[10px] text-slate-500 text-center mt-2 flex items-center justify-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-purple-700" />
                      <span>7 dias de garantia incondicional</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Clarification banner why Iniciante is not displayed here */}
              <div className="p-3.5 bg-amber-50/80 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2.5">
                <span className="text-base shrink-0">ℹ️</span>
                <p className="leading-relaxed">
                  <strong>Por que o Plano Iniciante (R$ 27) não está nesta lista?</strong> O plano Iniciante foi desenvolvido exclusivamente para treino de questões avulsas online no aplicativo e <u>não contempla</u> o módulo de geração de cadernos e gabaritos em PDF para impressão.
                </p>
              </div>

              {/* Bottom return link */}
              <div className="text-center mt-5">
                <button
                  type="button"
                  onClick={() => setView('preview')}
                  className="text-xs font-bold text-slate-600 hover:text-slate-900 inline-flex items-center gap-1.5 cursor-pointer underline underline-offset-2"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Voltar para visualizar o modelo de folha A4</span>
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
