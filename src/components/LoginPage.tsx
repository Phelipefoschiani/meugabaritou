import React, { useState, useEffect } from 'react';
import { 
  LogIn, 
  Mail, 
  Lock, 
  ArrowRight, 
  Eye, 
  EyeOff,
  CheckCircle2,
  XCircle,
  GraduationCap,
  Play,
  Pause,
  ChevronRight,
  ChevronLeft,
  BookOpen,
  Lightbulb,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { PrivacyAndTermsModal } from './PrivacyAndTermsModal';
import { LoginPageMobile } from './LoginPageMobile';
import { loginWithGoogle, syncStudentProfile } from '../config/firebase';

interface LoginPageProps {
  onLoginSuccess: (user: { name: string; email: string; plan: string; planId: string }) => void;
  onNavigateToFunnel: () => void;
  onOpenFreeTrial?: () => void;
}

interface Question {
  id: number;
  banca: string;
  concurso: string;
  cargo: string;
  materia: string;
  topico: string;
  enunciado: string;
  alternativas: { id: string; texto: string }[];
  correta: string;
  dicaProfessor: {
    professor: string;
    fundamento: string;
    texto: string;
    macete: string;
    acertos: string;
  };
}

const sampleQuestions: Question[] = [
  {
    id: 1,
    banca: 'CESPE / CEBRASPE',
    concurso: 'Polícia Federal',
    cargo: 'Agente da Polícia Federal',
    materia: 'Direito Constitucional',
    topico: 'Art. 5º • Direitos e Garantias Fundamentais',
    enunciado: 'No que concerne aos direitos e garantias fundamentais previstos na Constituição Federal de 1988, é livre a manifestação do pensamento, sendo vedado o anonimato.',
    alternativas: [
      { id: 'C', texto: 'Certo' },
      { id: 'E', texto: 'Errado' },
    ],
    correta: 'C',
    dicaProfessor: {
      professor: 'Prof. Ricardo Santos • Direito Constitucional',
      fundamento: 'Art. 5º, inciso IV, da CF/88',
      texto: 'A manifestação do pensamento é amplamente assegurada, porém o anonimato é expressamente VEDADO. A banca adora trocar "vedado" por "permitido". Atenção à literalidade da lei!',
      macete: 'Lembre-se: Você é livre para se expressar, mas deve assinar embaixo!',
      acertos: '92% de acertos',
    }
  },
  {
    id: 2,
    banca: 'VUNESP',
    concurso: 'TJ-SP',
    cargo: 'Escrevente Técnico Judiciário',
    materia: 'Direito Administrativo',
    topico: 'Princípios da Administração Pública',
    enunciado: 'A proibição expressa de que constem nomes, símbolos ou imagens que caracterizem promoção pessoal de autoridades ou servidores em atos ou campanhas dos órgãos públicos decorre diretamente do princípio da:',
    alternativas: [
      { id: 'A', texto: 'Eficiência administrativa' },
      { id: 'B', texto: 'Impessoalidade' },
      { id: 'C', texto: 'Continuidade dos serviços públicos' },
      { id: 'D', texto: 'Autotutela' },
    ],
    correta: 'B',
    dicaProfessor: {
      professor: 'Profª. Camila Faria • Direito Administrativo',
      fundamento: 'Art. 37, § 1º, da CF/88 (Princípio do LIMPE)',
      texto: 'A vedação da promoção pessoal decorre expressamente do princípio da Impessoalidade. Os atos pertencem à Administração Pública, e não à pessoa física do gestor.',
      macete: 'Regra de ouro VUNESP: autopromoção em obra pública = violação direta da IMPESSOALIDADE.',
      acertos: '86% de acertos',
    }
  },
  {
    id: 3,
    banca: 'FGV',
    concurso: 'Receita Federal',
    cargo: 'Auditor-Fiscal da Receita Federal',
    materia: 'Língua Portuguesa',
    topico: 'Regência e Crase',
    enunciado: 'Assinale a alternativa em que o uso do acento grave indicativo de crase está estritamente correto de acordo com a norma culta:',
    alternativas: [
      { id: 'A', texto: 'Os auditores compareceram à reunião de alinhamento com a diretoria.' },
      { id: 'B', texto: 'O candidato começou à responder o caderno de questões com calma.' },
      { id: 'C', texto: 'Entregamos a folha de respostas à um fiscal de sala credenciado.' },
      { id: 'D', texto: 'O resultado final será divulgado à partir das dezoito horas.' },
    ],
    correta: 'A',
    dicaProfessor: {
      professor: 'Prof. Eduardo Silva • Língua Portuguesa',
      fundamento: 'Fusão da preposição "a" (comparecer a) + artigo "a" (a reunião)',
      texto: 'Na opção A, "comparecer a" exige a preposição "a" e "reunião" aceita o artigo feminino "a" -> "à reunião". Nas demais: crase proibida antes de verbo (responder/partir) e antes de artigo indefinido (um).',
      macete: 'Dica prática: Nunca utilize crase antes de verbo ou antes de palavra masculina!',
      acertos: '88% de acertos',
    }
  },
  {
    id: 4,
    banca: 'CEBRASPE',
    concurso: 'Polícia Rodoviária Federal (PRF)',
    cargo: 'Policial Rodoviário Federal',
    materia: 'Legislação de Trânsito',
    topico: 'Código de Trânsito Brasileiro (CTB)',
    enunciado: 'O trânsito de qualquer natureza nas vias terrestres do território nacional, abertas à circulação, rege-se pelas disposições do Código de Trânsito Brasileiro (CTB).',
    alternativas: [
      { id: 'C', texto: 'Certo' },
      { id: 'E', texto: 'Errado' },
    ],
    correta: 'C',
    dicaProfessor: {
      professor: 'Prof. Marcelo Prado • Legislação Especial',
      fundamento: 'Art. 1º do Código de Trânsito Brasileiro (Lei nº 9.503/97)',
      texto: 'Dispositivo literal do Art. 1º do CTB. Abrange tanto vias urbanas e rurais quanto praias abertas à circulação e vias internas de condomínios residenciais.',
      macete: 'Item clássico e recorrente que abre os simulados oficiais da PRF!',
      acertos: '95% de acertos',
    }
  }
];

// Palavras motivacionais caindo suavemente de cima a baixo no fundo
const fallingMotivationalWords = [
  { text: 'FOCO', left: '4%', delay: '0s', duration: '12s', color: 'text-blue-500/35' },
  { text: 'ESTUDO', left: '88%', delay: '1.8s', duration: '14s', color: 'text-indigo-500/35' },
  { text: 'META', left: '16%', delay: '3.5s', duration: '11.5s', color: 'text-emerald-500/35' },
  { text: 'RESILIÊNCIA', left: '76%', delay: '5.2s', duration: '15s', color: 'text-purple-500/35' },
  { text: 'TEMPO', left: '30%', delay: '7s', duration: '13s', color: 'text-amber-500/35' },
  { text: 'DISCIPLINA', left: '60%', delay: '2.5s', duration: '14.5s', color: 'text-blue-600/35' },
  { text: 'CONSTÂNCIA', left: '10%', delay: '9s', duration: '12.5s', color: 'text-cyan-500/35' },
  { text: 'GABARITO', left: '84%', delay: '10.5s', duration: '13.5s', color: 'text-emerald-600/35' },
  { text: 'ESTRATÉGIA', left: '45%', delay: '4s', duration: '15.5s', color: 'text-indigo-600/35' },
  { text: 'APROVAÇÃO', left: '92%', delay: '6.8s', duration: '12s', color: 'text-blue-500/35' },
  { text: 'PERSISTÊNCIA', left: '22%', delay: '8.4s', duration: '14s', color: 'text-purple-600/35' },
  { text: 'REVISÃO', left: '68%', delay: '11.2s', duration: '13s', color: 'text-amber-600/35' },
];

// Cards rotativos com informações, dicas e orientações úteis para o aluno
const studentInfoSlides = [
  {
    id: 1,
    icon: <Lock className="w-3.5 h-3.5 text-blue-600" />,
    iconBg: 'bg-blue-100',
    badge: 'Ativação Imediata',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200/80',
    title: 'Primeiro acesso após a compra?',
    text: 'Sua conta é liberada instantaneamente com o e-mail cadastrado na Kiwify. Seus simulados já estão disponíveis para download e treino!'
  },
  {
    id: 2,
    icon: <Mail className="w-3.5 h-3.5 text-amber-600" />,
    iconBg: 'bg-amber-100',
    badge: 'Senha e Acesso',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200/80',
    title: 'Como recebo minha senha?',
    text: 'A senha de acesso foi enviada para o seu e-mail no ato da compra. Se preferir, use o link "Esqueceu a senha?" acima para redefini-la.'
  },
  {
    id: 3,
    icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />,
    iconBg: 'bg-emerald-100',
    badge: 'Método Oficial',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
    title: 'Simulados em PDF & Gabarito OMR',
    text: 'Baixe as provas diagramadas idênticas às bancas oficiais, preencha sua folha de respostas e receba o diagnóstico instantâneo de acertos.'
  },
  {
    id: 4,
    icon: <BookOpen className="w-3.5 h-3.5 text-indigo-600" />,
    iconBg: 'bg-indigo-100',
    badge: 'Evolução Contínua',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200/80',
    title: 'Caderno de Erros Automatizado',
    text: 'Cada alternativa errada é salva automaticamente com fundamentação legal e macetes de memorização para você nunca mais errar.'
  },
  {
    id: 5,
    icon: <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />,
    iconBg: 'bg-purple-100',
    badge: 'Suporte ao Aluno',
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200/80',
    title: 'Precisa de ajuda ou suporte?',
    text: 'Nossa equipe atende rapidamente pelo WhatsApp e e-mail oficial (suporte@meugabaritou.com.br). Bons estudos!'
  }
];

export const LoginPage: React.FC<LoginPageProps> = ({
  onLoginSuccess,
  onNavigateToFunnel,
  onOpenFreeTrial,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // States do Carrossel de Informações que fica passando no card de login
  const [currentInfoIdx, setCurrentInfoIdx] = useState(0);
  const [isInfoHovered, setIsInfoHovered] = useState(false);

  // Efeito para passar as informações com mais tempo de leitura (8 segundos)
  useEffect(() => {
    if (isInfoHovered) return;
    const interval = setInterval(() => {
      setCurrentInfoIdx((prev) => (prev + 1) % studentInfoSlides.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [isInfoHovered]);

  // States do Simulado Interativo em Loop
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showDica, setShowDica] = useState(false);
  const [isManualAnswer, setIsManualAnswer] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Modal de Políticas de Privacidade e Termos de Uso
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);
  const [legalModalTab, setLegalModalTab] = useState<'privacy' | 'terms'>('privacy');

  // Ciclo de tempo exato solicitado:
  // 1. 10s para ler a pergunta
  // 2. 5s para responder
  // 3. 5s com a resposta revelada e dica do professor (tanto se responder quanto se não responder)
  const [readingCountdown, setReadingCountdown] = useState(10);
  const [answeringCountdown, setAnsweringCountdown] = useState(5);
  const [revealCountdown, setRevealCountdown] = useState(5);

  const currentQ = sampleQuestions[currentIdx];

  // LOOP EFFECT DO SIMULADO
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      // Se ainda não houve resposta
      if (!selectedOption) {
        if (readingCountdown > 0) {
          // Fase 1: 10s de leitura
          setReadingCountdown((prev) => prev - 1);
        } else if (answeringCountdown > 0) {
          // Fase 2: 5s para responder
          setAnsweringCountdown((prev) => prev - 1);
        } else {
          // Fase 3: Tempo esgotado sem resposta -> auto-marca a correta e mostra a dica
          setSelectedOption(currentQ.correta);
          setShowDica(true);
          setIsManualAnswer(false);
          setRevealCountdown(5); // 5s de resposta revelada
        }
      } 
      // Se a resposta já foi marcada (auto ou manual)
      else if (showDica) {
        setRevealCountdown((prev) => {
          if (prev <= 1) {
            // Fim dos 5 segundos da resposta revelada -> avança em loop infinito para a próxima
            goToNextQuestion();
            return 5;
          }
          return prev - 1;
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isPaused, selectedOption, showDica, readingCountdown, answeringCountdown, currentQ.correta, currentIdx]);

  const goToNextQuestion = () => {
    setSelectedOption(null);
    setShowDica(false);
    setIsManualAnswer(false);
    setReadingCountdown(10);
    setAnsweringCountdown(5);
    setRevealCountdown(5);
    setCurrentIdx((prev) => (prev + 1) % sampleQuestions.length);
  };

  const goToPrevQuestion = () => {
    setSelectedOption(null);
    setShowDica(false);
    setIsManualAnswer(false);
    setReadingCountdown(10);
    setAnsweringCountdown(5);
    setRevealCountdown(5);
    setCurrentIdx((prev) => (prev - 1 + sampleQuestions.length) % sampleQuestions.length);
  };

  // Quando o usuário responde manualmente
  const handleSelectOptionManual = (optId: string) => {
    setSelectedOption(optId);
    setShowDica(true);
    setIsManualAnswer(true);
    setReadingCountdown(0);
    setAnsweringCountdown(0);
    setRevealCountdown(5); // 5s também antes de passar!
  };

  const handleJumpToQuestion = (index: number) => {
    setSelectedOption(null);
    setShowDica(false);
    setIsManualAnswer(false);
    setReadingCountdown(10);
    setAnsweringCountdown(5);
    setRevealCountdown(5);
    setCurrentIdx(index);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage('Por favor, informe seu e-mail e senha cadastrados.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      const studentName = email.split('@')[0] ? (email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1)) : 'Aluno';
      // Sincroniza com Firebase Firestore
      await syncStudentProfile(email, studentName, 'intermediario', false);
      
      onLoginSuccess({
        name: studentName,
        email: email,
        plan: 'Intermediário ⭐ (Pratique + Analise)',
        planId: 'intermediario',
      });
    } catch (err) {
      console.warn('Login sync notice:', err);
      onLoginSuccess({
        name: email.split('@')[0] ? (email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1)) : 'Aluno',
        email: email,
        plan: 'Intermediário ⭐ (Pratique + Analise)',
        planId: 'intermediario',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const profile = await loginWithGoogle();
      onLoginSuccess({
        name: profile.name,
        email: profile.email,
        plan: profile.plan,
        planId: profile.planId,
      });
    } catch (err) {
      console.error('Erro no login Google:', err);
      setErrorMessage('Não foi possível autenticar com o Google. Tente com e-mail e senha.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* 1. LAYOUT MOBILE DEDICADO: APENAS O LOGIN (Arquivo: LoginPageMobile.tsx) */}
      <div className="block lg:hidden">
        <LoginPageMobile
          onLoginSuccess={onLoginSuccess}
          onNavigateToFunnel={onNavigateToFunnel}
          onOpenFreeTrial={onOpenFreeTrial}
        />
      </div>

      {/* 2. LAYOUT DESKTOP: SPLIT SCREEN COM SIMULADO E BANCA INTERATIVA */}
      <div className="hidden lg:flex min-h-screen bg-[#F8FAFC] text-slate-900 flex-col justify-between font-sans">
        
        {/* 1. FAIXA AZUL LÁ EM CIMA (NAVBAR OFICIAL MEU GABARITOU) 
            - Logo centralizada especificamente em relação à coluna de login abaixo!
        */}
        <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white shadow-lg shadow-blue-900/20 border-b border-blue-400/30">
        <div className="w-full flex items-center justify-between h-16 sm:h-18">
          
          {/* SEÇÃO DA LOGO: Centralizada na mesma largura da faixa de login abaixo */}
          <div className="w-auto lg:w-[480px] xl:w-[520px] flex items-center justify-start lg:justify-center px-4 sm:px-8 lg:px-12 shrink-0">
            <BrandLogo size="md" textColorMode="light" />
          </div>

          {/* SEÇÃO DIREITA DO HEADER: Botão para Conhecer o Meu Gabaritou */}
          <div className="flex-1 flex items-center justify-end px-4 sm:px-6 lg:px-8">
            <button
              type="button"
              onClick={onNavigateToFunnel}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-white text-blue-700 hover:bg-blue-50 hover:text-blue-800 font-extrabold text-xs sm:text-sm shadow-md shadow-blue-950/20 transition-all cursor-pointer group"
            >
              <span>Conhecer o Meu Gabaritou</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

        </div>
      </header>

      {/* 2. ÁREA PRINCIPAL SPLIT:
          - LADO ESQUERDO: FAIXA NO MESMO AZUL DO TOPO COM LOGIN DENTRO DO RETÂNGULO BRANCO
          - LADO DIREITO: SIMULADO INTERATIVO EM LOOP COM AUTO-RESOLUÇÃO, DICA DO PROFESSOR E PALAVRAS CAINDO
      */}
      <div className="flex-1 flex flex-col lg:flex-row w-full items-stretch min-h-[calc(100vh-4.5rem)]">
        
        {/* ============================================================== */}
        {/* LADO ESQUERDO: FAIXA NO MESMO AZUL DO TOPO (DE CIMA A BAIXO)   */}
        {/* ============================================================== */}
        <section className="w-full lg:w-[480px] xl:w-[520px] bg-gradient-to-b from-blue-700 via-blue-600 to-indigo-700 text-white border-r border-blue-400/40 shadow-2xl flex flex-col justify-between px-4 sm:px-8 lg:px-10 py-8 lg:py-12 z-20 shrink-0 relative overflow-hidden">
          
          {/* Brilho sutil no topo da faixa */}
          <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />

          {/* ========================================================== */}
          {/* O LOGIN DENTRO DE UM RETÂNGULO BRANCO ELEGANTE              */}
          {/* ========================================================== */}
          <div className="my-auto max-w-[450px] w-full mx-auto relative z-10">
            
            {/* Título "Acesse sua Conta": Maior, Colorido e com Presença */}
            <div className="text-center mb-4 sm:mb-5 px-1">
              <h1 className="text-3xl sm:text-[2.65rem] font-black tracking-tight text-center drop-shadow-md leading-tight bg-gradient-to-r from-amber-300 via-yellow-200 to-sky-200 bg-clip-text text-transparent">
                Acesse sua Conta
              </h1>
            </div>

            {/* Retângulo Branco com Preenchimento Perfeito, Espaçamento Confortável e Design Moderno */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl shadow-blue-950/35 border border-slate-100 text-slate-900 transition-all flex flex-col space-y-5 sm:space-y-6">
              
              {/* Mensagem de Erro (se houver) */}
              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold text-center">
                  {errorMessage}
                </div>
              )}

              {/* Formulário de Login com Excelente Espaçamento */}
              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                
                {/* Campo E-mail */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 flex items-center justify-between">
                    <span>E-mail de Acesso</span>
                    <span className="text-[11px] font-normal text-slate-400">utilizado na compra</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seuemail@exemplo.com"
                      autoComplete="email"
                      required
                      className="w-full pl-11 pr-4 py-3.5 sm:py-4 bg-slate-50 border border-slate-300 rounded-2xl text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-600 transition-all font-medium shadow-2xs"
                    />
                  </div>
                </div>

                {/* Campo Senha */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-slate-700">
                      Sua Senha
                    </label>
                    <button
                      type="button"
                      onClick={() => alert('Sua senha de acesso foi enviada para o seu e-mail no momento da compra pela Kiwify. Caso precise de suporte para redefinir, verifique a caixa de entrada ou spam.')}
                      className="text-[11px] font-bold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
                    >
                      Esqueceu a senha?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      autoComplete="current-password"
                      required
                      className="w-full pl-11 pr-11 py-3.5 sm:py-4 bg-slate-50 border border-slate-300 rounded-2xl text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-600 transition-all font-medium shadow-2xs"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer p-0.5"
                      aria-label={showPassword ? 'Ocultar senha' : 'Exibir senha'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4 text-blue-600" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Linha de Manter Conectado e Segurança */}
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer accent-blue-600"
                    />
                    <span className="text-xs font-semibold text-slate-600">
                      Permanecer conectado
                    </span>
                  </label>
                  <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Acesso Seguro
                  </span>
                </div>

                {/* Botão Entrar na Plataforma */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 px-5 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:scale-[0.99] text-white font-black text-base shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40 transition-all flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-70 mt-2"
                >
                  {isLoading ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Acessando Portal do Aluno...</span>
                    </span>
                  ) : (
                    <>
                      <LogIn className="w-5 h-5" />
                      <span>Entrar no Meu Gabaritou</span>
                      <ArrowRight className="w-4 h-4 opacity-80" />
                    </>
                  )}
                </button>

                {/* Divisor */}
                <div className="relative flex py-0.5 items-center">
                  <div className="flex-grow border-t border-slate-200"></div>
                  <span className="flex-shrink mx-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    ou acesse com
                  </span>
                  <div className="flex-grow border-t border-slate-200"></div>
                </div>

                {/* Botão Google Login Oficial */}
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={isLoading}
                  className="w-full py-3 px-4 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 active:scale-[0.99] text-slate-700 font-bold text-sm shadow-2xs transition-all flex items-center justify-center gap-3 cursor-pointer disabled:opacity-60"
                >
                  <svg className="w-4.5 h-4.5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span>Entrar com Google</span>
                </button>

              </form>

              {/* Card Dinâmico com Informações Rotativas para o Aluno ("Passando em Carrossel") */}
              <div 
                onMouseEnter={() => setIsInfoHovered(true)}
                onMouseLeave={() => setIsInfoHovered(false)}
                className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 border border-slate-200/90 shadow-2xs relative overflow-hidden transition-all group"
              >
                {/* Linha de progresso no topo do card informativo */}
                <div className="absolute top-0 inset-x-0 h-0.5 bg-slate-200/60 overflow-hidden">
                  <div 
                    key={currentInfoIdx}
                    className="h-full bg-blue-600 animate-in fade-in"
                    style={{
                      animation: isInfoHovered ? 'none' : 'progressFill 8s linear infinite',
                      width: isInfoHovered ? '100%' : undefined
                    }}
                  />
                </div>

                {/* Conteúdo do Slide Atual com Animação Suave */}
                <div key={studentInfoSlides[currentInfoIdx].id} className="animate-in fade-in slide-in-from-right-2 duration-300">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded-lg ${studentInfoSlides[currentInfoIdx].iconBg} flex items-center justify-center shrink-0 shadow-2xs`}>
                        {studentInfoSlides[currentInfoIdx].icon}
                      </div>
                      <h4 className="text-xs font-black text-slate-800 tracking-tight">
                        {studentInfoSlides[currentInfoIdx].title}
                      </h4>
                    </div>

                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border shrink-0 ${studentInfoSlides[currentInfoIdx].badgeColor}`}>
                      {studentInfoSlides[currentInfoIdx].badge}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-600 leading-relaxed font-medium min-h-[34px]">
                    {studentInfoSlides[currentInfoIdx].text}
                  </p>
                </div>

                {/* Controles de Navegação e Bolinhas Indicadoras (Dots) */}
                <div className="flex items-center justify-between pt-2.5 mt-1 border-t border-slate-200/60">
                  {/* Bolinhas indicadoras */}
                  <div className="flex items-center gap-1.5">
                    {studentInfoSlides.map((slide, idx) => (
                      <button
                        key={slide.id}
                        type="button"
                        onClick={() => setCurrentInfoIdx(idx)}
                        className={`transition-all duration-300 rounded-full cursor-pointer ${
                          currentInfoIdx === idx
                            ? 'w-5 h-1.5 bg-blue-600'
                            : 'w-1.5 h-1.5 bg-slate-300 hover:bg-slate-400'
                        }`}
                        title={slide.title}
                        aria-label={`Ir para informação ${idx + 1}`}
                      />
                    ))}
                  </div>

                  {/* Setas discretas para passar manualmente se quiser */}
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setCurrentInfoIdx((prev) => (prev - 1 + studentInfoSlides.length) % studentInfoSlides.length)}
                      className="p-1 rounded-md text-slate-400 hover:text-blue-600 hover:bg-white/80 transition-colors cursor-pointer"
                      title="Informação anterior"
                      aria-label="Informação anterior"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentInfoIdx((prev) => (prev + 1) % studentInfoSlides.length)}
                      className="p-1 rounded-md text-slate-400 hover:text-blue-600 hover:bg-white/80 transition-colors cursor-pointer"
                      title="Próxima informação"
                      aria-label="Próxima informação"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>

              {/* Políticas de Privacidade e Termos de Uso (Abrem Modal Completo com Exclusão LGPD) */}
              <div className="pt-3 border-t border-slate-100 text-center flex items-center justify-center gap-3 text-xs text-slate-400">
                <button
                  type="button"
                  onClick={() => {
                    setLegalModalTab('privacy');
                    setIsLegalModalOpen(true);
                  }}
                  className="hover:text-blue-600 transition-colors cursor-pointer hover:underline font-semibold"
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
                  className="hover:text-blue-600 transition-colors cursor-pointer hover:underline font-semibold"
                >
                  Termos de Uso
                </button>
              </div>

            </div>

          </div>

          {/* Rodapé da faixa de login */}
          <div className="pt-6 text-center text-xs text-blue-200/80 relative z-10">
            © {new Date().getFullYear()} Meu Gabaritou • Plataforma Oficial de Estudos
          </div>

        </section>

        {/* ============================================================== */}
        {/* LADO DIREITO: SIMULADO INTERATIVO COM AUTO-EXECUÇÃO EM LOOP   */}
        {/* DICA DO PROFESSOR E PALAVRAS MOTIVACIONAIS CAINDO NO FUNDO   */}
        {/* ============================================================== */}
        <section className="flex-1 bg-[#F8FAFC] flex flex-col justify-center items-center px-4 sm:px-8 lg:px-10 py-8 relative overflow-hidden">
          
          {/* Fundo sutil quadriculado */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-25"
            style={{
              backgroundImage: `radial-gradient(#94a3b8 1px, transparent 1px)`,
              backgroundSize: '24px 24px'
            }}
          />

          {/* ========================================================== */}
          {/* ANIMAÇÃO DE PALAVRAS MOTIVACIONAIS CAINDO DE CIMA A BAIXO   */}
          {/* "Foco, estudo, meta, resiliência, tempo, disciplina..."      */}
          {/* ========================================================== */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
            {fallingMotivationalWords.map((word, idx) => (
              <span
                key={`falling-word-${idx}`}
                className={`absolute top-[-30px] font-black text-xs sm:text-sm tracking-widest uppercase transition-opacity ${word.color} animate-fall-words`}
                style={{
                  left: word.left,
                  animationDelay: word.delay,
                  animationDuration: word.duration,
                }}
              >
                {word.text}
              </span>
            ))}
          </div>

          {/* Container do Simulado Interativo */}
          <div className="max-w-2xl xl:max-w-3xl w-full relative z-10 flex flex-col items-center">
            
            {/* Top Bar do Simulado Interativo */}
            <div className="w-full flex items-center justify-between mb-3 px-1">
              <div className="flex items-center gap-2">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-black uppercase tracking-wider text-slate-700">
                  Simulado Oficial em Tempo Real
                </span>
              </div>

              {/* Botão de Pausar / Continuar o Loop */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsPaused(!isPaused)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-blue-600 text-xs font-bold shadow-2xs transition-colors cursor-pointer"
                  title={isPaused ? 'Continuar auto-resolução' : 'Pausar auto-resolução'}
                >
                  {isPaused ? (
                    <>
                      <Play className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="hidden sm:inline">Continuar</span>
                    </>
                  ) : (
                    <>
                      <Pause className="w-3.5 h-3.5 text-amber-500" />
                      <span className="hidden sm:inline">Pausar</span>
                    </>
                  )}
                </button>
                <span className="text-xs font-bold text-slate-400 font-mono">
                  {currentIdx + 1}/{sampleQuestions.length}
                </span>
              </div>
            </div>

            {/* CADERNO DE PROVA OFICIAL (ESTÉTICA EDITORIAL DE MESA DE EXAME REAL) */}
            <div className="w-full bg-[#fdfdfd] rounded-2xl border-2 border-slate-300/80 shadow-2xl shadow-slate-900/10 p-6 sm:p-8 relative overflow-hidden transition-all text-slate-900">
              
              {/* Marca d'água sutil de autenticidade no fundo */}
              <div className="absolute right-6 top-20 pointer-events-none select-none opacity-[0.03] text-8xl font-black rotate-[-18deg] tracking-tighter">
                GABARITOU
              </div>

              {/* Barra de Progresso / Tempo no Topo do Caderno */}
              <div className="absolute top-0 inset-x-0 h-1.5 bg-slate-200">
                <div 
                  className={`h-full transition-all duration-1000 ${
                    selectedOption 
                      ? 'bg-emerald-500' 
                      : readingCountdown > 0 
                        ? 'bg-blue-600' 
                        : 'bg-amber-500'
                  }`}
                  style={{ 
                    width: selectedOption 
                      ? `${((5 - revealCountdown) / 5) * 100}%` 
                      : readingCountdown > 0
                        ? `${((10 - readingCountdown) / 10) * 100}%`
                        : `${((5 - answeringCountdown) / 5) * 100}%` 
                  }}
                />
              </div>

              {/* Cabeçalho Oficial do Caderno de Prova (Tipografia Institucional de Exame) */}
              <div className="pb-3.5 mb-4 border-b-2 border-slate-200 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-1 rounded bg-slate-900 text-white text-[11px] font-black uppercase tracking-wider shadow-xs">
                    CADERNO DE PROVA A4
                  </span>
                  <span className="px-2.5 py-1 rounded bg-amber-100/90 border border-amber-300 text-amber-950 text-xs font-black uppercase tracking-wide">
                    {currentQ.banca}
                  </span>
                  <span className="text-xs font-bold text-slate-600">
                    {currentQ.concurso} • {currentQ.cargo}
                  </span>
                </div>

                {/* Cronômetro Oficial da Sala de Prova */}
                <div className="flex items-center gap-2 bg-slate-950 text-white px-3 py-1.5 rounded-lg border border-slate-800 shadow-inner">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="font-mono text-xs font-bold text-emerald-400 tracking-wider">
                    {selectedOption
                      ? `PRÓXIMA EM: 00:0${revealCountdown}`
                      : readingCountdown > 0
                        ? `LEITURA: 00:${readingCountdown < 10 ? `0${readingCountdown}` : readingCountdown}`
                        : `TEMPO: 00:0${answeringCountdown}`}
                  </span>
                </div>
              </div>

              {/* Disciplina e Tópico */}
              <div className="flex items-center gap-2 text-xs font-extrabold text-slate-600 mb-2">
                <BookOpen className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                <span className="text-blue-900 font-black">{currentQ.materia}</span>
                <span>•</span>
                <span>{currentQ.topico}</span>
                <span className="ml-auto text-[11px] font-mono text-slate-400 font-bold">
                  QUESTÃO {currentIdx + 1 < 10 ? `0${currentIdx + 1}` : currentIdx + 1}
                </span>
              </div>

              {/* Enunciado da Prova com Diagramação Editorial */}
              <div className="mb-5 p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/70">
                <p className="text-sm sm:text-base font-serif font-medium text-slate-900 leading-relaxed">
                  "{currentQ.enunciado}"
                </p>
              </div>

              {/* Alternativas Interativas com Estilo de Caneta Esferográfica Preta OMR */}
              <div className="space-y-2.5 mb-5">
                {currentQ.alternativas.map((alt) => {
                  const isSelected = selectedOption === alt.id;
                  const isCorrect = alt.id === currentQ.correta;

                  let borderClasses = 'border-slate-300 hover:border-slate-500 bg-white';
                  let bubbleClasses = 'border-slate-400 text-slate-700 bg-white font-mono';

                  if (isSelected) {
                    if (isCorrect) {
                      borderClasses = 'border-emerald-600 bg-emerald-50/60 shadow-xs';
                      bubbleClasses = 'border-slate-950 bg-slate-950 text-white font-black ring-2 ring-emerald-500 shadow-sm';
                    } else {
                      borderClasses = 'border-rose-400 bg-rose-50/60';
                      bubbleClasses = 'border-rose-600 bg-rose-600 text-white font-black';
                    }
                  }

                  return (
                    <button
                      key={alt.id}
                      type="button"
                      onClick={() => handleSelectOptionManual(alt.id)}
                      className={`w-full p-3 sm:p-3.5 rounded-xl border-2 transition-all flex items-center justify-between text-left cursor-pointer group ${borderClasses}`}
                    >
                      <div className="flex items-center gap-3">
                        {/* Bolinha com Tinta de Caneta Preta Real */}
                        <span className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs transition-all ${bubbleClasses}`} title="Cartão-resposta OMR">
                          {alt.id}
                        </span>
                        <span className="text-xs sm:text-sm font-semibold text-slate-900">
                          {alt.texto}
                        </span>
                      </div>

                      {/* Feedback de Acerto ou Erro */}
                      {isSelected && (
                        isCorrect ? (
                          <span className="inline-flex items-center gap-1 text-xs font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                            <span>Gabarito Oficial (Caneta Preta)</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs font-black text-rose-800 bg-rose-100 px-2 py-0.5 rounded border border-rose-300">
                            <XCircle className="w-3.5 h-3.5 text-rose-700" />
                            <span>Incorreto</span>
                          </span>
                        )
                      )}
                    </button>
                  );
                })}
              </div>

              {/* ========================================================== */}
              {/* DICA DO PROFESSOR COM EFEITO MARCA-TEXTO REAL             */}
              {/* ========================================================== */}
              {showDica ? (
                <div className="p-4 sm:p-5 rounded-xl bg-amber-50/70 border-2 border-amber-300 shadow-sm transition-all animate-in fade-in slide-in-from-top-2 duration-300 relative">
                  
                  {/* Carimbo de Anotação do Professor */}
                  <div className="flex items-center justify-between gap-2 pb-2 mb-2.5 border-b border-amber-200">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center shadow-xs font-black">
                        <GraduationCap className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-slate-950 flex items-center gap-1.5 uppercase tracking-wide">
                          <span>Comentário & Fundamentação</span>
                        </h4>
                        <p className="text-[11px] font-bold text-amber-900">
                          {currentQ.dicaProfessor.professor}
                        </p>
                      </div>
                    </div>

                    <span className="text-[11px] font-black text-emerald-800 bg-white border border-emerald-300 px-2.5 py-0.5 rounded-full shadow-2xs">
                      {currentQ.dicaProfessor.acertos}
                    </span>
                  </div>

                  {/* Fundamento com Marca-Texto Fluorescente */}
                  <div className="mb-2">
                    <span className="highlighter-yellow text-slate-950 text-xs font-black inline-block mb-1 shadow-2xs">
                      {currentQ.dicaProfessor.fundamento}
                    </span>
                    <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium mt-1">
                      {currentQ.dicaProfessor.texto}
                    </p>
                  </div>

                  {/* Macete de Memorização com Marca-Texto Verde */}
                  {currentQ.dicaProfessor.macete && (
                    <div className="mt-2.5 p-2.5 rounded-lg bg-white/95 border border-amber-300/90 flex items-start gap-2 text-xs shadow-2xs">
                      <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-amber-950 block font-black text-[11px]">
                          Macete do Meu Gabaritou:
                        </strong>
                        <span className="highlighter-green text-slate-900 font-bold leading-snug">
                          {currentQ.dicaProfessor.macete}
                        </span>
                      </div>
                    </div>
                  )}

                </div>
              ) : (
                /* Estado pré-resposta (Anotação de Caderno) */
                <div className="p-3 rounded-xl bg-slate-100/90 border border-dashed border-slate-300 flex items-center justify-center gap-2 text-xs text-slate-500 font-medium">
                  <GraduationCap className="w-4 h-4 text-slate-400" />
                  <span>A fundamentação legal e o macete com marca-texto aparecerão automaticamente...</span>
                </div>
              )}

              {/* Barra de Navegação Inferior do Simulado */}
              <div className="mt-4 pt-3.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                
                {/* Botões de Questão Anterior / Próxima */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={goToPrevQuestion}
                    className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors cursor-pointer"
                    title="Questão anterior"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  {/* Botão de Próxima Questão com Temporizador */}
                  <button
                    type="button"
                    onClick={goToNextQuestion}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl font-black text-xs sm:text-sm shadow-md transition-all cursor-pointer ${
                      selectedOption
                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/25 active:scale-[0.98]'
                        : 'bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100'
                    }`}
                  >
                    <span>Próxima Questão</span>
                    {selectedOption && (
                      <span className="bg-white/20 text-white px-1.5 py-0.5 rounded-md text-[11px] font-mono">
                        {revealCountdown}s
                      </span>
                    )}
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Seletores de Questão Rápidos (1, 2, 3, 4) */}
                <div className="flex items-center gap-1.5">
                  {sampleQuestions.map((q, idx) => (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => handleJumpToQuestion(idx)}
                      className={`w-7 h-7 rounded-lg text-xs font-black transition-all cursor-pointer ${
                        currentIdx === idx
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>

              </div>

            </div>

            {/* Informação Institucional Logo Abaixo do Card */}
            <div className="mt-3.5 flex items-center justify-center gap-4 text-xs text-slate-500 font-medium text-center">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Simulados Reais com Gabarito OMR
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                Questões Comentadas por Professores
              </span>
            </div>

          </div>

        </section>

      </div>

      {/* Modal Institucional de Políticas de Privacidade e Termos de Uso (LGPD) */}
      <PrivacyAndTermsModal
        isOpen={isLegalModalOpen}
        onClose={() => setIsLegalModalOpen(false)}
        defaultTab={legalModalTab}
      />

      </div>
    </>
  );
};
