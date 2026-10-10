import React, { useState } from 'react';
import { 
  Printer, 
  Monitor, 
  RotateCcw, 
  BarChart3, 
  Calendar, 
  ListTodo, 
  Clock, 
  Target, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2,
  FileText,
  Layers,
  Compass
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BrandName } from './BrandName';

interface AppFeaturesSectionProps {
  onOpenPDFPreview: () => void;
  onOpenFreeTrial?: () => void;
}

type FeatureCategory = 'todos' | 'simulados' | 'analise' | 'direcionamento';

interface FeatureItem {
  id: string;
  category: 'simulados' | 'analise' | 'direcionamento';
  title: string;
  icon: React.ElementType;
  iconGradient: string;
  iconShadow: string;
  description: string;
  points: string[];
  pdfButton?: boolean;
}

export const AppFeaturesSection: React.FC<AppFeaturesSectionProps> = ({
  onOpenPDFPreview,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<FeatureCategory>('todos');
  const [expandedFeatureId, setExpandedFeatureId] = useState<string | null>(null);

  const features: FeatureItem[] = [
    {
      id: 'simulados-pdf',
      category: 'simulados',
      title: 'Simulados Impressos em PDF (Folha A4)',
      icon: Printer,
      iconGradient: 'from-amber-500 to-orange-600',
      iconShadow: 'shadow-amber-500/30',
      description: 'Gere cadernos diagramados em 2 colunas no padrão oficial de bancas reais, com cartão-resposta e gabarito comentado ao final.',
      points: [
        'Formato idêntico à prova real para treinar com caneta.',
        'Economiza tempo de impressão com diagramação otimizada.',
        'Treina o preenchimento correto da folha de respostas.'
      ],
      pdfButton: true,
    },
    {
      id: 'simulados-online',
      category: 'simulados',
      title: 'Simulados Online Cronometrados',
      icon: Monitor,
      iconGradient: 'from-blue-500 to-indigo-600',
      iconShadow: 'shadow-blue-500/30',
      description: 'Monte provas sob medida filtrando por banca, disciplina e cargo, com cronômetro regressivo e nota calculada na hora.',
      points: [
        'Controle de tempo gasto por questão.',
        'Ranking e comparativo com nota de corte.',
        'Possibilidade de marcar questões para revisar depois.'
      ],
    },
    {
      id: 'caderno-erros',
      category: 'analise',
      title: 'Caderno Automático de Revisão dos Erros',
      icon: RotateCcw,
      iconGradient: 'from-rose-500 to-red-600',
      iconShadow: 'shadow-rose-500/30',
      description: 'Todas as questões que você errar são salvas em um caderno inteligente para você refazer apenas seus pontos fracos.',
      points: [
        'Classificação por motivo do erro (atenção, teoria ou pegadinha).',
        'Gera testes rápidos só com o que você errou anteriormente.',
        'Só sai da lista quando você acertar 2 vezes em dias diferentes.'
      ],
    },
    {
      id: 'relatorios-desempenho',
      category: 'analise',
      title: 'Diagnóstico & Raio-X por Assunto',
      icon: BarChart3,
      iconGradient: 'from-indigo-500 to-violet-600',
      iconShadow: 'shadow-indigo-500/30',
      description: 'Descubra exatamente qual matéria ou micro-tópico está puxando sua média para baixo com gráficos claros de evolução.',
      points: [
        'Taxa de acertos detalhada por micro-tema do edital.',
        'Curva de rendimento semana a semana.',
        'Identificação imediata de matérias que precisam de reforço.'
      ],
    },
    {
      id: 'plano-semanal',
      category: 'direcionamento',
      title: 'Plano Semanal Baseado no Edital',
      icon: Calendar,
      iconGradient: 'from-teal-500 to-emerald-600',
      iconShadow: 'shadow-teal-500/30',
      description: 'Cronograma automático que organiza suas matérias nos dias da semana de acordo com suas horas livres e o peso do edital.',
      points: [
        'Distribuição equilibrada entre teoria, questões e revisões.',
        'Reajuste dinâmico automático caso ocorra algum imprevisto.',
        'Foco maior nos temas com menor taxa de acerto.'
      ],
    },
    {
      id: 'fila-diaria',
      category: 'direcionamento',
      title: 'Fila Diária de Questões (Missão do Dia)',
      icon: ListTodo,
      iconGradient: 'from-emerald-500 to-green-600',
      iconShadow: 'shadow-emerald-500/30',
      description: 'Abra o app e resolva o lote exato de questões separadas especialmente para o seu dia, sem perder tempo escolhendo.',
      points: [
        'Metas curtas e objetivas com barra de progresso.',
        'Mistura de assuntos novos com revisões pendentes.',
        'Ajuda a manter a consistência diária de estudos.'
      ],
    },
    {
      id: 'revisao-espacada',
      category: 'direcionamento',
      title: 'Revisão Espaçada Periódica (SRS)',
      icon: Clock,
      iconGradient: 'from-purple-500 to-fuchsia-600',
      iconShadow: 'shadow-purple-500/30',
      description: 'O método agenda revisões periódicas (1, 7, 15 e 30 dias) para você fixar os conteúdos mais difíceis na memória.',
      points: [
        'Combate direto à Curva do Esquecimento.',
        'Reapresenta questões difíceis no intervalo ideal.',
        'Garante memória fresca até o dia da prova.'
      ],
    },
    {
      id: 'simulado-adaptativo',
      category: 'direcionamento',
      title: 'Simulados Focados por Fraqueza',
      icon: Target,
      iconGradient: 'from-cyan-500 to-blue-600',
      iconShadow: 'shadow-cyan-500/30',
      description: 'Provas geradas automaticamente com foco nos assuntos onde você mais erra, blindando suas vulnerabilidades.',
      points: [
        'Mais questões nos temas onde seu aproveitamento for baixo.',
        'Treino intensivo para transformar fraquezas em acertos.',
        'Comparativo de evolução antes e depois do teste.'
      ],
    },
  ];

  const filteredFeatures = selectedCategory === 'todos' 
    ? features 
    : features.filter(f => f.category === selectedCategory);

  // Divide em 2 colunas independentes para que o clique em uma coluna empurre apenas para baixo sem mexer nada acima ou na coluna ao lado
  const col1 = filteredFeatures.filter((_, idx) => idx % 2 === 0);
  const col2 = filteredFeatures.filter((_, idx) => idx % 2 !== 0);

  const toggleExpand = (id: string) => {
    setExpandedFeatureId(prev => prev === id ? null : id);
  };

  const renderCard = (item: FeatureItem) => {
    const isExpanded = expandedFeatureId === item.id;
    const Icon = item.icon;

    return (
      <div
        key={item.id}
        className={`rounded-2xl transition-all duration-300 bg-white select-none overflow-hidden ${
          isExpanded 
            ? 'border-2 border-amber-500 shadow-[0_12px_28px_-6px_rgba(217,119,6,0.22),0_4px_12px_rgba(0,0,0,0.06)] ring-4 ring-amber-400/20' 
            : 'border border-amber-200/90 shadow-[0_6px_20px_-4px_rgba(202,138,4,0.14),0_2px_6px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_28px_-6px_rgba(202,138,4,0.25),0_4px_12px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 hover:border-amber-300'
        }`}
      >
        {/* CABEÇALHO DO RETÂNGULO: ÍCONE VIBRANTE 3D, TÍTULO E SETA EM ALTA EVIDÊNCIA */}
        <button
          type="button"
          onClick={() => toggleExpand(item.id)}
          className="w-full text-left p-4 sm:p-5 cursor-pointer flex items-center justify-between gap-3.5 group relative"
        >
          <div className="flex items-center gap-4 min-w-0">
            {/* Ícone estilizado com gradiente vibrante e sombra tridimensional */}
            <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0 bg-gradient-to-br ${item.iconGradient} text-white shadow-md ${item.iconShadow} group-hover:scale-108 transition-all duration-300 ring-2 ring-white`}>
              <Icon className="w-5 h-5 sm:w-6 sm:h-6 drop-shadow-xs" />
            </div>

            <h3 className="text-sm sm:text-base font-extrabold text-slate-900 group-hover:text-amber-800 transition-colors truncate">
              {item.title}
            </h3>
          </div>

          {/* Setinha em forte evidência (Botão destacado com alto contraste e presença) */}
          <div className={`shrink-0 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl font-bold text-xs transition-all duration-200 shadow-xs ${
            isExpanded 
              ? 'bg-amber-500 text-white shadow-amber-500/30' 
              : 'bg-amber-100/90 text-amber-900 border border-amber-300/80 group-hover:bg-amber-500 group-hover:text-white group-hover:border-amber-500 group-hover:shadow-md'
          }`}>
            <span className="hidden sm:inline text-[11px] font-bold">
              {isExpanded ? 'Fechar' : 'Abrir'}
            </span>
            {isExpanded ? (
              <ChevronUp className="w-4 h-4 stroke-[2.5]" />
            ) : (
              <ChevronDown className="w-4 h-4 stroke-[2.5]" />
            )}
          </div>
        </button>

        {/* PAINEL EXPANDIDO: ABRE ESTRITAMENTE PARA BAIXO */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              key={`content-${item.id}`}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="border-t border-amber-100 bg-gradient-to-b from-amber-50/50 to-amber-50/20 overflow-hidden"
            >
              <div className="p-4 sm:p-5 space-y-3.5 text-xs sm:text-sm">
                
                {/* Resumo Direto */}
                <p className="text-slate-700 leading-relaxed font-medium">
                  {item.description}
                </p>

                {/* Pontos Principais Simples */}
                <div className="space-y-2 bg-white/95 p-3.5 rounded-xl border border-amber-200/80 shadow-xs">
                  {item.points.map((pt, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-2.5 text-slate-700 text-xs sm:text-[13px]">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>

                {/* Botão de PDF quando aplicável */}
                {item.pdfButton && (
                  <button
                    type="button"
                    onClick={onOpenPDFPreview}
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md shadow-amber-500/25"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Visualizar Exemplo de Prova Impressa (PDF Diagramado)</span>
                  </button>
                )}

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <section id="recursos-completos" className="py-16 lg:py-24 bg-gradient-to-b from-[#FFFDF0] via-[#FEFCE8]/80 to-[#FFFDF0] text-slate-900 border-b border-amber-200/70 relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] bg-amber-200/25 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* CABEÇALHO DO QUADRANTE */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 space-y-3 sm:space-y-4">
          <h2 className="text-2xl sm:text-4xl lg:text-[2.75rem] font-black text-slate-900 tracking-tight leading-tight flex items-center justify-center flex-wrap gap-x-2">
            <span>Tudo o que o</span>
            <BrandName theme="amber" />
            <span>oferece para acelerar seu aprendizado</span>
          </h2>

          {/* BOTÕES DE FILTRO REESTILIZADOS COM EFEITO 3D, GRADIENTES E SOMBRAS FLUTUANTES */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            
            {/* Botão: Todos */}
            <button
              type="button"
              onClick={() => setSelectedCategory('todos')}
              className={`group relative px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-300 cursor-pointer inline-flex items-center gap-1.5 sm:gap-2 min-h-[42px] ${
                selectedCategory === 'todos'
                  ? 'bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white shadow-[0_8px_20px_-4px_rgba(15,23,42,0.4)] scale-105 ring-2 ring-slate-700/50'
                  : 'bg-white/95 border border-amber-200/90 text-slate-700 shadow-[0_4px_14px_-2px_rgba(202,138,4,0.15)] hover:shadow-[0_8px_20px_-4px_rgba(202,138,4,0.28)] hover:-translate-y-0.5 hover:border-amber-400 hover:text-slate-950'
              }`}
            >
              <div className={`w-5 h-5 rounded-md flex items-center justify-center transition-transform group-hover:scale-110 ${
                selectedCategory === 'todos' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
              }`}>
                <Layers className="w-3.5 h-3.5" />
              </div>
              <span>Todos</span>
              <span className={`text-[10px] sm:text-[11px] px-1.5 py-0.2 rounded-full font-black ${
                selectedCategory === 'todos' ? 'bg-amber-400 text-slate-950' : 'bg-amber-100 text-amber-900'
              }`}>
                {features.length}
              </span>
            </button>

            {/* Botão: Simulados & PDFs */}
            <button
              type="button"
              onClick={() => setSelectedCategory('simulados')}
              className={`group relative px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-300 cursor-pointer inline-flex items-center gap-1.5 sm:gap-2 min-h-[42px] ${
                selectedCategory === 'simulados'
                  ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white shadow-[0_8px_20px_-4px_rgba(245,158,11,0.45)] scale-105 ring-2 ring-amber-300'
                  : 'bg-white/95 border border-amber-200/90 text-slate-700 shadow-[0_4px_14px_-2px_rgba(202,138,4,0.15)] hover:shadow-[0_8px_20px_-4px_rgba(245,158,11,0.3)] hover:-translate-y-0.5 hover:border-amber-400 hover:text-amber-900'
              }`}
            >
              <div className={`w-5 h-5 rounded-md flex items-center justify-center transition-transform group-hover:scale-110 ${
                selectedCategory === 'simulados' ? 'bg-white/25 text-white' : 'bg-amber-100 text-amber-700'
              }`}>
                <Printer className="w-3.5 h-3.5" />
              </div>
              <span>Simulados & PDFs</span>
            </button>

            {/* Botão: Erros & Diagnóstico */}
            <button
              type="button"
              onClick={() => setSelectedCategory('analise')}
              className={`group relative px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-300 cursor-pointer inline-flex items-center gap-1.5 sm:gap-2 min-h-[42px] ${
                selectedCategory === 'analise'
                  ? 'bg-gradient-to-r from-rose-500 via-red-500 to-rose-600 text-white shadow-[0_8px_20px_-4px_rgba(244,63,94,0.45)] scale-105 ring-2 ring-rose-300'
                  : 'bg-white/95 border border-amber-200/90 text-slate-700 shadow-[0_4px_14px_-2px_rgba(202,138,4,0.15)] hover:shadow-[0_8px_20px_-4px_rgba(244,63,94,0.3)] hover:-translate-y-0.5 hover:border-rose-400 hover:text-rose-900'
              }`}
            >
              <div className={`w-5 h-5 rounded-md flex items-center justify-center transition-transform group-hover:scale-110 ${
                selectedCategory === 'analise' ? 'bg-white/25 text-white' : 'bg-rose-100 text-rose-700'
              }`}>
                <RotateCcw className="w-3.5 h-3.5" />
              </div>
              <span>Erros & Raio-X</span>
            </button>

            {/* Botão: Cronograma & Guiado */}
            <button
              type="button"
              onClick={() => setSelectedCategory('direcionamento')}
              className={`group relative px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-300 cursor-pointer inline-flex items-center gap-1.5 sm:gap-2 min-h-[42px] ${
                selectedCategory === 'direcionamento'
                  ? 'bg-gradient-to-r from-teal-500 via-emerald-500 to-teal-600 text-white shadow-[0_8px_20px_-4px_rgba(20,184,166,0.45)] scale-105 ring-2 ring-teal-300'
                  : 'bg-white/95 border border-amber-200/90 text-slate-700 shadow-[0_4px_14px_-2px_rgba(202,138,4,0.15)] hover:shadow-[0_8px_20px_-4px_rgba(20,184,166,0.3)] hover:-translate-y-0.5 hover:border-teal-400 hover:text-teal-900'
              }`}
            >
              <div className={`w-5 h-5 rounded-md flex items-center justify-center transition-transform group-hover:scale-110 ${
                selectedCategory === 'direcionamento' ? 'bg-white/25 text-white' : 'bg-teal-100 text-teal-700'
              }`}>
                <Compass className="w-3.5 h-3.5" />
              </div>
              <span>Cronograma</span>
            </button>
          </div>
        </div>

        {/* GRADE EM 2 COLUNAS INDEPENDENTES (EMPÚRRA ESTRITAMENTE PARA BAIXO COM CARDS SALTADOS) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 items-start">
          
          {/* Coluna 1 */}
          <div className="flex flex-col gap-4 sm:gap-5">
            {col1.map(renderCard)}
          </div>

          {/* Coluna 2 */}
          <div className="flex flex-col gap-4 sm:gap-5">
            {col2.map(renderCard)}
          </div>

        </div>

      </div>
    </section>
  );
};
