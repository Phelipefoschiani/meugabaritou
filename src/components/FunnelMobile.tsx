import React, { useState } from 'react';
import { 
  Check, 
  ArrowRight, 
  Clock, 
  ShieldCheck, 
  Star, 
  FileText, 
  Download, 
  Smartphone, 
  BookOpen, 
  ChevronDown, 
  ChevronUp, 
  Lock, 
  Award, 
  CheckCircle2, 
  XCircle,
  Zap,
  UserPlus,
  LogIn,
  Sparkles,
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { FloatingActionsWidget } from './FloatingActionsWidget';
import { PrivacyAndTermsModal } from './PrivacyAndTermsModal';
import { TESTIMONIALS, FAQ_ITEMS } from '../data/plansData';

export interface FunnelMobileProps {
  onOpenLogin: () => void;
  onOpenFreeTrial: () => void;
  onOpenPDFPreview: () => void;
  onScrollToPlans: () => void;
  onOpenCheckout: (planId?: string, cycle?: 'monthly' | 'quarterly') => void;
  currentUser?: {
    name: string;
    email: string;
    phone?: string;
    plan: string;
    planId: string;
    isTrial?: boolean;
  } | null;
  onLogout?: () => void;
  onNavigateToPortal?: () => void;
}

export const FunnelMobile: React.FC<FunnelMobileProps> = ({
  onOpenLogin,
  onOpenFreeTrial,
  onOpenPDFPreview,
  onScrollToPlans,
  onOpenCheckout,
  currentUser,
  onNavigateToPortal,
}) => {
  // Ciclo de faturamento: Mensal vs Trimestral (-20% OFF)
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'quarterly'>('quarterly');

  // Carreira ativa no seletor
  const [selectedCareer, setSelectedCareer] = useState<'policial' | 'tribunais' | 'administrativo' | 'bancario'>('policial');

  // FAQ Accordion
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Modal institucional de Termos e Privacidade (LGPD)
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);
  const [legalModalTab, setLegalModalTab] = useState<'privacy' | 'terms'>('privacy');

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const careersData = {
    policial: {
      name: 'Carreiras Policiais',
      badge: 'PF, PRF, PC & PM',
      focus: 'Direito Penal, Processual Penal, Constitucional & Informática',
      bancas: 'CEBRASPE, FGV & Vunesp',
      totalSimulados: '+ de 60 Simulados Prontos',
    },
    tribunais: {
      name: 'Tribunais & Judiciário',
      badge: 'TJ, TRF, TRT & TRE',
      focus: 'Direito Administrativo, Civil, Processual Civil & Português',
      bancas: 'FCC, FGV & Cebraspe',
      totalSimulados: '+ de 45 Simulados Prontos',
    },
    administrativo: {
      name: 'Área Administrativa',
      badge: 'INSS, Ministérios & Prefeituras',
      focus: 'Administração Pública, Raciocínio Lógico & Legislação',
      bancas: 'Cebraspe, FGV & Cesgranrio',
      totalSimulados: '+ de 50 Simulados Prontos',
    },
    bancario: {
      name: 'Carreiras Bancárias',
      badge: 'Caixa Econômica & Banco do Brasil',
      focus: 'Conhecimentos Bancários, Atendimento & Matemática Financeira',
      bancas: 'Cesgranrio & FCC',
      totalSimulados: '+ de 35 Simulados Prontos',
    },
  };

  const scrollToPlansLocal = () => {
    const el = document.getElementById('mobile-planos');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      onScrollToPlans();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-24 selection:bg-blue-600 selection:text-white relative">
      
      {/* ============================================================== */}
      {/* 1. HERO IMPACTO MOBILE (COMEÇO DIRETO E NATURAL DO SITE)       */}
      {/* ============================================================== */}
      <section className="relative px-4 pt-7 pb-10 bg-gradient-to-b from-blue-700 via-blue-600 to-indigo-800 text-white overflow-hidden">
        {/* Brilho decorativo de fundo */}
        <div className="absolute top-0 inset-x-0 h-44 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-md mx-auto text-center space-y-4">
          
          {/* Logo Oficial Integrada Organicamente */}
          <div className="flex items-center justify-center pt-2 pb-1">
            <BrandLogo size="md" textColorMode="light" />
          </div>

          {/* Badge de Destaque */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-[11px] font-bold text-amber-300 shadow-xs">
            <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
            <span>Método Prático dos Concursados Aprovados</span>
          </div>

          {/* Título Principal */}
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
            Passe no seu Concurso Estudando por{' '}
            <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-sky-200 bg-clip-text text-transparent">
              Simulados Reais
            </span>
          </h1>

          {/* Subtítulo Fluido para Mobile */}
          <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed font-medium">
            Chega de perder meses em 500 horas de videoaulas que você esquece na hora da prova. Treine com provas em PDF idênticas às bancas, correção na tela e caderno automático de erros.
          </p>

          {/* Botões de Ação Imediata */}
          <div className="pt-2 flex flex-col gap-2.5">
            <button
              type="button"
              onClick={onOpenFreeTrial}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black text-sm shadow-lg shadow-amber-950/20 active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <Clock className="w-4 h-4 text-slate-950" />
              <span>Experimentar Grátis por 24 Horas</span>
              <ArrowRight className="w-4 h-4 opacity-75" />
            </button>

            <button
              type="button"
              onClick={scrollToPlansLocal}
              className="w-full py-3 px-4 rounded-xl bg-white/15 hover:bg-white/25 active:bg-white/30 text-white font-extrabold text-xs border border-white/25 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Ver Simulados & Planos Disponíveis</span>
              <ChevronDown className="w-3.5 h-3.5 text-amber-300" />
            </button>
          </div>

          {/* Prova Social Rápida */}
          <div className="pt-3 flex items-center justify-center gap-2 text-[11px] text-blue-200/90">
            <div className="flex -space-x-1.5">
              <img className="w-6 h-6 rounded-full border border-white" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80" alt="Aluno" />
              <img className="w-6 h-6 rounded-full border border-white" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80" alt="Aluno" />
              <img className="w-6 h-6 rounded-full border border-white" src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&auto=format&fit=crop&q=80" alt="Aluno" />
            </div>
            <span>
              <strong className="text-white">4.9/5 estrelas</strong> por mais de 3.200 concurseiros
            </span>
          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 2. SELETOR RÁPIDO DE CARREIRAS (MOBILE TABS)                   */}
      {/* ============================================================== */}
      <section className="px-4 py-6 max-w-md mx-auto">
        <div className="text-center mb-4">
          <span className="text-[11px] font-black text-blue-600 uppercase tracking-wider">
            Escolha seu Objetivo
          </span>
          <h2 className="text-lg font-black text-slate-900 mt-0.5">
            Qual concurso você vai prestar?
          </h2>
        </div>

        {/* Abas Mobile */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          {(['policial', 'tribunais', 'administrativo', 'bancario'] as const).map((key) => {
            const isSelected = selectedCareer === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setSelectedCareer(key)}
                className={`py-2 px-2.5 rounded-xl text-xs font-bold transition-all text-center border cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {careersData[key].name}
              </button>
            );
          })}
        </div>

        {/* Card da Carreira Selecionada */}
        <div className="bg-white rounded-2xl p-4 border border-blue-100 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-blue-900">
              {careersData[selectedCareer].badge}
            </span>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              {careersData[selectedCareer].totalSimulados}
            </span>
          </div>

          <div className="space-y-1 text-xs">
            <div className="flex items-start gap-1.5 text-slate-600">
              <span className="font-bold text-slate-800 shrink-0">Bancas:</span>
              <span>{careersData[selectedCareer].bancas}</span>
            </div>
            <div className="flex items-start gap-1.5 text-slate-600">
              <span className="font-bold text-slate-800 shrink-0">Disciplinas:</span>
              <span className="leading-snug">{careersData[selectedCareer].focus}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenPDFPreview}
            className="w-full py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-extrabold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-blue-200"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Espiar Prova em PDF Desta Área</span>
          </button>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. OS 4 PILARES DO MÉTODO NO CELULAR                           */}
      {/* ============================================================== */}
      <section className="px-4 py-6 bg-white border-y border-slate-200/80">
        <div className="max-w-md mx-auto space-y-4">
          <div className="text-center">
            <span className="text-[11px] font-black text-blue-600 uppercase tracking-wider">
              Como Funciona
            </span>
            <h2 className="text-lg font-black text-slate-900 mt-0.5">
              O que você recebe no Meu Gabaritou
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-3">
            
            {/* Pilar 1: Simulados em PDF */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-xs shadow-xs">
                <FileText className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-black text-slate-900">
                1. Provas em PDF para Imprimir
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Diagramadas em folha A4 oficial com cartão-resposta destacável. Treine a memória muscular de preencher bolinha antes do grande dia.
              </p>
            </div>

            {/* Pilar 2: Modo Digital */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-black text-xs shadow-xs">
                <Smartphone className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-black text-slate-900">
                2. Modo Celular Instantâneo
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Responda questões com cronômetro no ônibus, no intervalo ou no sofá. Todas as respostas sincronizam na nuvem.
              </p>
            </div>

            {/* Pilar 3: Caderno de Erros */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black text-xs shadow-xs">
                <BookOpen className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-black text-slate-900">
                3. Caderno Automático de Erros
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                O sistema isola tudo que você erra e adiciona comentários com macetes e leis comentadas para não errar nunca mais.
              </p>
            </div>

            {/* Pilar 4: Diagnóstico Visual */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black text-xs shadow-xs">
                <Award className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-black text-slate-900">
                4. Diagnóstico por Disciplina
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Saiba exatamente onde focar seu tempo de estudo para subir sua pontuação final e alcançar a nota de corte.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. COMPARATIVO MOBILE: CURSINHO TRADICIONAL VS MEU GABARITOU  */}
      {/* ============================================================== */}
      <section className="px-4 py-6 max-w-md mx-auto space-y-4">
        <div className="text-center">
          <span className="text-[11px] font-black text-rose-600 uppercase tracking-wider">
            Pare de Perder Tempo
          </span>
          <h2 className="text-lg font-black text-slate-900 mt-0.5">
            Por que o estudo tradicional falha?
          </h2>
        </div>

        <div className="space-y-3">
          
          {/* Cursinho Tradicional */}
          <div className="p-4 rounded-2xl bg-rose-50/80 border border-rose-200 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-black text-rose-800">
              <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>Cursinhos Tradicionais (Passivos)</span>
            </div>
            <ul className="text-xs text-rose-900/80 space-y-1.5 font-medium">
              <li>• 500 horas de videoaulas que você não lembra depois</li>
              <li>• PDFs teóricos de 300 páginas cansativos</li>
              <li>• Sem treino com caneta e tempo de prova</li>
              <li>• Mensalidades caras de R$ 150 a R$ 300/mês</li>
            </ul>
          </div>

          {/* Meu Gabaritou */}
          <div className="p-4 rounded-2xl bg-blue-50/90 border-2 border-blue-500 space-y-2 shadow-sm">
            <div className="flex items-center gap-1.5 text-xs font-black text-blue-900">
              <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Método Meu Gabaritou (Ativo & Prático)</span>
            </div>
            <ul className="text-xs text-blue-950 space-y-1.5 font-semibold">
              <li>✓ Provas reais diagramadas em PDF para imprimir</li>
              <li>✓ Caderno automático que salva seus erros para revisar</li>
              <li>✓ Treino do ritmo de prova com cronômetro e cartão-resposta</li>
              <li>✓ A partir de R$ 21,60/mês no trimestral (acesso imediato)</li>
            </ul>
          </div>

        </div>

        {/* High-Impact Mobile Conversion Callout */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 border border-blue-500/40 p-5 text-white shadow-xl shadow-blue-950/40 space-y-4 mt-4">
          <div className="absolute -top-16 -left-16 w-48 h-48 bg-blue-600/20 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-emerald-500/15 rounded-full blur-2xl pointer-events-none" />
          
          <div className="relative z-10 space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-[10px] font-bold tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>DECISÃO INTELIGENTE · SEM RISCO</span>
            </div>

            <h3 className="text-base font-black leading-snug">
              Pare de gastar horas em fóruns confusos.{' '}
              <span className="block mt-0.5 bg-gradient-to-r from-blue-400 via-sky-300 to-emerald-300 bg-clip-text text-transparent">
                Estude com foco cirúrgico.
              </span>
            </h3>

            <p className="text-xs text-slate-300 font-medium leading-relaxed">
              Resoluções didáticas linha por linha, caderno automático de erros e simulados oficiais em folha A4.
            </p>

            <div className="space-y-1.5 pt-1 text-[11px] text-slate-300 font-medium">
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>7 dias de garantia incondicional</span>
              </div>
              <div className="flex items-center gap-1.5 text-sky-300 font-medium">
                <Zap className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span>Acesso liberado no mesmo instante</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 space-y-2 pt-1">
            <button
              type="button"
              onClick={onScrollToPlans}
              className="relative group w-full overflow-hidden py-3.5 px-5 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 active:scale-[0.98] text-white font-black text-xs tracking-wide shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 border border-blue-400/40 ring-2 ring-blue-400/20 cursor-pointer"
            >
              <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-25deg] pointer-events-none animate-shimmer-sweep" />
              <span className="relative z-10">Ver Planos Disponíveis</span>
              <ArrowRight className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1" />
            </button>
            <p className="text-[10px] text-center text-slate-400 font-medium">
              A partir de R$ 21,60/mês · Sem fidelidade
            </p>
          </div>
        </div>

      </section>

      {/* ============================================================== */}
      {/* 5. BANNER DO SIMULADO EM PDF                                   */}
      {/* ============================================================== */}
      <section className="px-4 py-5 max-w-md mx-auto">
        <div className="bg-gradient-to-br from-slate-900 to-blue-950 rounded-2xl p-5 text-white space-y-3 shadow-lg">
          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-bold border border-blue-400/30">
            <FileText className="w-3 h-3" />
            <span>Formato Oficial A4</span>
          </div>

          <h3 className="text-base font-black leading-snug">
            Quer ver como é a folha de prova em PDF pronta para impressão?
          </h3>

          <p className="text-xs text-slate-300 font-medium leading-relaxed">
            Veja a diagramação idêntica às bancas Cebraspe e FGV com instruções, questões em duas colunas e folha OMR.
          </p>

          <button
            type="button"
            onClick={onOpenPDFPreview}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-black text-xs flex items-center justify-center gap-2 shadow-md transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Abrir Amostra Gratuita do Simulado</span>
          </button>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 6. PLANOS & PREÇOS (SEÇÃO PRINCIPAL DE CONVERSÃO)              */}
      {/* ============================================================== */}
      <section id="mobile-planos" className="px-4 py-8 bg-slate-100/80 border-t border-slate-200">
        <div className="max-w-md mx-auto space-y-5">
          
          <div className="text-center space-y-1">
            <span className="text-[11px] font-black text-blue-600 uppercase tracking-wider">
              Planos & Investimento
            </span>
            <h2 className="text-xl font-black text-slate-900">
              Escolha seu Plano de Estudos
            </h2>
            <p className="text-xs text-slate-600 font-medium">
              Sem fidelidade. Cancele com 1 clique a qualquer momento.
            </p>
          </div>

          {/* Toggle Mensal vs Trimestral (-20% OFF) */}
          <div className="flex items-center justify-center p-1 bg-white rounded-2xl border border-slate-200 shadow-2xs max-w-xs mx-auto">
            <button
              type="button"
              onClick={() => setBillingCycle('monthly')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                billingCycle === 'monthly'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Mensal
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle('quarterly')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer ${
                billingCycle === 'quarterly'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>Trimestral</span>
              <span className="text-[10px] bg-amber-400 text-slate-950 px-1.5 py-0.2 rounded-full font-black">
                -20%
              </span>
            </button>
          </div>

          {/* LISTA DOS 3 PLANOS EM CARDS VERTICAIS MOBILE */}
          <div className="space-y-4">
            
            {/* 1. PLANO INICIANTE */}
            <div className="bg-white rounded-2xl p-5 border border-emerald-300 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    Essencial
                  </span>
                  <h3 className="text-base font-black text-slate-900 mt-1">Iniciante</h3>
                </div>
                <div className="text-right">
                  <div className="text-xl font-black text-slate-900">
                    R$ {billingCycle === 'quarterly' ? '21,60' : '27,00'}
                    <span className="text-[11px] font-normal text-slate-500">/mês</span>
                  </div>
                  {billingCycle === 'quarterly' && (
                    <div className="text-[10px] text-emerald-700 font-semibold">
                      Cobrado R$ 64,80 a cada 3 meses
                    </div>
                  )}
                </div>
              </div>

              <p className="text-xs text-slate-600 font-medium">
                Para quem quer apenas resolver questões avulsas com comentários.
              </p>

              <ul className="text-xs text-slate-700 space-y-1.5 pt-1">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Questões por matéria e assunto</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Gabarito comentado detalhado</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Histórico completo de resolução</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Até 2 simulados completos por mês</span>
                </li>
              </ul>

              <button
                type="button"
                onClick={() => onOpenCheckout('iniciante', billingCycle)}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-extrabold text-xs shadow-md transition-colors cursor-pointer"
              >
                Garantir Plano Iniciante
              </button>
            </div>

            {/* 2. PLANO INTERMEDIÁRIO (MAIS ESCOLHIDO - DESTAQUE MÁXIMO) */}
            <div className="bg-gradient-to-b from-blue-50/90 to-white rounded-2xl p-5 border-2 border-blue-600 shadow-xl shadow-blue-600/15 relative space-y-3">
              
              {/* Badge Topo */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-black uppercase px-3 py-0.5 rounded-full shadow-md tracking-wider flex items-center gap-1">
                <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
                <span>Mais Escolhido pelos Aprovados</span>
              </div>

              <div className="flex items-center justify-between pt-1">
                <div>
                  <h3 className="text-lg font-black text-blue-950">Intermediário</h3>
                  <span className="text-[10px] font-extrabold text-blue-700">
                    Pratique + Analise + Simule
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-blue-950">
                    R$ {billingCycle === 'quarterly' ? '37,60' : '47,00'}
                    <span className="text-xs font-normal text-slate-500">/mês</span>
                  </div>
                  {billingCycle === 'quarterly' && (
                    <div className="text-[10px] text-blue-700 font-bold">
                      Cobrado R$ 112,80 no trimestre (-20%)
                    </div>
                  )}
                </div>
              </div>

              <p className="text-xs text-slate-700 font-medium">
                O pacote completo com simulados ilimitados e impressão de provas em PDF.
              </p>

              <div className="bg-blue-100/50 p-2 rounded-xl text-[11px] font-bold text-blue-900 border border-blue-200">
                ⭐ Inclui Gerador Ilimitado de Provas em PDF para imprimir!
              </div>

              <ul className="text-xs text-slate-800 space-y-1.5 pt-1 font-semibold">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Tudo do plano Iniciante</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Simulados online ILIMITADOS</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Caderno exclusivo de Questões Erradas</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Gerar provas prontas em PDF (A4 para imprimir)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Diagnóstico analítico de desempenho por matéria</span>
                </li>
              </ul>

              <button
                type="button"
                onClick={() => onOpenCheckout('intermediario', billingCycle)}
                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-black text-sm shadow-lg shadow-blue-600/30 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Assinar Plano Intermediário</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* 3. PLANO AVANÇADO */}
            <div className="bg-white rounded-2xl p-5 border border-purple-300 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-200">
                    Máxima Performance
                  </span>
                  <h3 className="text-base font-black text-slate-900 mt-1">Avançado</h3>
                </div>
                <div className="text-right">
                  <div className="text-xl font-black text-slate-900">
                    R$ {billingCycle === 'quarterly' ? '61,60' : '77,00'}
                    <span className="text-[11px] font-normal text-slate-500">/mês</span>
                  </div>
                  {billingCycle === 'quarterly' && (
                    <div className="text-[10px] text-purple-700 font-semibold">
                      Cobrado R$ 184,80 a cada 3 meses
                    </div>
                  )}
                </div>
              </div>

              <p className="text-xs text-slate-600 font-medium">
                Tudo do Intermediário + Cronograma guiado e Revisão Espaçada (SRS).
              </p>

              <ul className="text-xs text-slate-700 space-y-1.5 pt-1">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                  <span>Tudo do plano Intermediário</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                  <span>Plano semanal montado com base no seu edital</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                  <span>Fila inteligente de Revisão Espaçada (SRS)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                  <span>Simulado adaptativo nas suas fraquezas</span>
                </li>
              </ul>

              <button
                type="button"
                onClick={() => onOpenCheckout('avancado', billingCycle)}
                className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white font-extrabold text-xs shadow-md transition-colors cursor-pointer"
              >
                Garantir Plano Avançado
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 7. GARANTIA BLINDADA (MOBILE)                                  */}
      {/* ============================================================== */}
      <section className="px-4 py-6 max-w-md mx-auto">
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3 text-center">
          <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <ShieldCheck className="w-6 h-6" />
          </div>

          <h3 className="text-base font-black text-slate-900">
            Garantia Incondicional de 7 Dias
          </h3>

          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            Assine com risco zero. Se dentro de 7 dias você achar que a plataforma não aumentou seu ritmo de estudos, basta pedir o cancelamento e estornamos 100% do seu valor via Kiwify.
          </p>

          <div className="flex items-center justify-center gap-4 text-[11px] text-slate-500 pt-1 border-t border-slate-100">
            <span className="flex items-center gap-1 font-semibold">
              <Lock className="w-3 h-3 text-emerald-600" />
              Pagamento Seguro Kiwify
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 font-semibold">
              <Zap className="w-3 h-3 text-amber-500" />
              Liberação Imediata
            </span>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 8. DEPOIMENTOS DE ALUNOS APROVADOS                             */}
      {/* ============================================================== */}
      <section className="px-4 py-6 bg-white border-y border-slate-200">
        <div className="max-w-md mx-auto space-y-4">
          <div className="text-center">
            <span className="text-[11px] font-black text-blue-600 uppercase tracking-wider">
              Resultados Reais
            </span>
            <h2 className="text-lg font-black text-slate-900 mt-0.5">
              O que dizem os concurseiros
            </h2>
          </div>

          <div className="space-y-3">
            {TESTIMONIALS.map((t) => (
              <div key={t.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center gap-2.5">
                  <img src={t.avatar} alt={t.name} className="w-9 h-9 rounded-full object-cover border border-slate-300" />
                  <div>
                    <h4 className="text-xs font-black text-slate-900 leading-tight">{t.name}</h4>
                    <span className="text-[10px] text-emerald-700 font-bold block">{t.approvedRole}</span>
                  </div>
                </div>
                <p className="text-xs text-slate-600 italic leading-relaxed">
                  "{t.quote}"
                </p>
                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-200/60 font-semibold">
                  <span>{t.targetExam}</span>
                  <span className="text-amber-500 font-bold">★★★★★</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 9. FAQ ACCORDION MOBILE                                        */}
      {/* ============================================================== */}
      <section className="px-4 py-6 max-w-md mx-auto space-y-4">
        <div className="text-center">
          <span className="text-[11px] font-black text-blue-600 uppercase tracking-wider">
            Tire suas Dúvidas
          </span>
          <h2 className="text-lg font-black text-slate-900 mt-0.5">
            Perguntas Frequentes
          </h2>
        </div>

        <div className="space-y-2">
          {FAQ_ITEMS.slice(0, 6).map((item, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div key={idx} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-3.5 text-left flex items-center justify-between gap-2 cursor-pointer font-bold text-xs text-slate-900"
                >
                  <span>{item.question}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-blue-600 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-3.5 pb-3.5 pt-1 text-xs text-slate-600 leading-relaxed font-medium border-t border-slate-100">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 10. RODAPÉ MOBILE COM LINKS INSTITUCIONAIS                     */}
      {/* ============================================================== */}
      <footer className="px-4 py-8 bg-slate-900 text-white text-center space-y-4">
        <div className="flex justify-center">
          <BrandLogo size="md" textColorMode="light" />
        </div>

        <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
          A plataforma definitiva de simulados diagramados em PDF e resolução inteligente para concurseiros.
        </p>

        {/* Links Legais e Suporte */}
        <div className="flex items-center justify-center gap-3 text-xs text-slate-400 pt-2 border-t border-slate-800">
          <button
            type="button"
            onClick={() => {
              setLegalModalTab('privacy');
              setIsLegalModalOpen(true);
            }}
            className="hover:text-blue-400 cursor-pointer"
          >
            Políticas de Privacidade
          </button>
          <span>•</span>
          <button
            type="button"
            onClick={() => {
              setLegalModalTab('terms');
              setIsLegalModalOpen(true);
            }}
            className="hover:text-blue-400 cursor-pointer"
          >
            Termos de Uso
          </button>
        </div>

        <div className="text-[11px] text-slate-500 pt-2">
          © {new Date().getFullYear()} Meu Gabaritou. Todos os direitos reservados.
        </div>
      </footer>

      {/* ============================================================== */}
      {/* 11. CARD FLUTUANTE DE AÇÕES RÁPIDAS NO LADO DIREITO INFERIOR   */}
      {/* ============================================================== */}
      <FloatingActionsWidget
        onOpenFreeTrial={onOpenFreeTrial}
        onOpenLogin={onOpenLogin}
        currentUser={currentUser}
        onNavigateToPortal={onNavigateToPortal}
        isMobile={true}
      />

      {/* Modal Institucional com Termos e Exclusão LGPD */}
      <PrivacyAndTermsModal
        isOpen={isLegalModalOpen}
        onClose={() => setIsLegalModalOpen(false)}
        defaultTab={legalModalTab}
      />

    </div>
  );
};
