import React, { useState, useEffect } from 'react';
import { 
  LogIn, 
  Mail, 
  Lock, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  CheckCircle2, 
  BookOpen, 
  ChevronLeft, 
  ChevronRight
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { PrivacyAndTermsModal } from './PrivacyAndTermsModal';
import { loginWithGoogle, syncStudentProfile } from '../config/firebase';

export interface LoginPageMobileProps {
  onLoginSuccess: (user: { name: string; email: string; plan: string; planId: string }) => void;
  onNavigateToFunnel: () => void;
  onOpenFreeTrial?: () => void;
}

// Cards rotativos com informações e dicas úteis para o aluno
const studentInfoSlides = [
  {
    id: 1,
    icon: <Lock className="w-3.5 h-3.5 text-blue-600" />,
    iconBg: 'bg-blue-100',
    badge: 'Ativação Imediata',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200/80',
    title: 'Primeiro acesso após a compra?',
    text: 'Sua conta é liberada instantaneamente com o e-mail cadastrado na Kiwify. Seus simulados já estão disponíveis para download!'
  },
  {
    id: 2,
    icon: <Mail className="w-3.5 h-3.5 text-amber-600" />,
    iconBg: 'bg-amber-100',
    badge: 'Senha e Acesso',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200/80',
    title: 'Como recebo minha senha?',
    text: 'A senha de acesso foi enviada para o seu e-mail no ato da compra. Se preferir, use o link "Esqueceu a senha?" para redefini-la.'
  },
  {
    id: 3,
    icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />,
    iconBg: 'bg-emerald-100',
    badge: 'Método Oficial',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
    title: 'Simulados em PDF & OMR',
    text: 'Baixe provas diagramadas idênticas às bancas, preencha sua folha de respostas e receba o diagnóstico instantâneo de acertos.'
  },
  {
    id: 4,
    icon: <BookOpen className="w-3.5 h-3.5 text-indigo-600" />,
    iconBg: 'bg-indigo-100',
    badge: 'Evolução Contínua',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200/80',
    title: 'Caderno de Erros',
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

export const LoginPageMobile: React.FC<LoginPageMobileProps> = ({
  onLoginSuccess,
  onNavigateToFunnel,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Modal institucional de Políticas de Privacidade e Termos de Uso
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);
  const [legalModalTab, setLegalModalTab] = useState<'privacy' | 'terms'>('privacy');

  // Carrossel de Informações rotativas (8 segundos por slide)
  const [currentInfoIdx, setCurrentInfoIdx] = useState(0);
  const [isInfoHovered, setIsInfoHovered] = useState(false);

  useEffect(() => {
    if (isInfoHovered) return;
    const interval = setInterval(() => {
      setCurrentInfoIdx((prev) => (prev + 1) % studentInfoSlides.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [isInfoHovered]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !password) {
      setErrorMessage('Por favor, informe seu e-mail e senha.');
      return;
    }

    setIsLoading(true);

    try {
      const studentName = cleanEmail.split('@')[0];
      await syncStudentProfile(cleanEmail, studentName, 'intermediario', false);

      onLoginSuccess({
        name: studentName,
        email: cleanEmail,
        plan: 'Intermediário ⭐ (Pratique + Analise)',
        planId: 'intermediario',
      });
    } catch (err) {
      console.warn('Mobile sync notice:', err);
      onLoginSuccess({
        name: cleanEmail.split('@')[0],
        email: cleanEmail,
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
      console.error('Erro no login Google mobile:', err);
      setErrorMessage('Não foi possível entrar com Google. Tente com e-mail e senha.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-700 via-blue-600 to-indigo-800 text-white flex flex-col justify-between px-4 py-6 relative overflow-x-hidden selection:bg-blue-300 selection:text-blue-950 font-sans">
      
      {/* Brilho decorativo no topo */}
      <div className="absolute top-0 inset-x-0 h-48 bg-gradient-to-b from-white/15 to-transparent pointer-events-none" />

      {/* 1. TOPO MOBILE: LOGO E BOTÃO PARA VER PLANOS */}
      <header className="relative z-10 flex items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-2">
          <BrandLogo theme="white" size="sm" />
        </div>

        <button
          type="button"
          onClick={onNavigateToFunnel}
          className="text-xs font-bold text-white bg-white/15 hover:bg-white/25 active:bg-white/30 backdrop-blur-xs px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 border border-white/20 shadow-xs cursor-pointer"
        >
          <span>Conhecer Planos</span>
          <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
        </button>
      </header>

      {/* 2. CONTEÚDO PRINCIPAL: APENAS O LOGIN */}
      <main className="relative z-10 w-full max-w-[420px] mx-auto my-auto flex flex-col space-y-4">
        
        {/* Título "Acesse sua Conta" com Fonte Grande e Colorida */}
        <div className="text-center px-2">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-center drop-shadow-md leading-tight bg-gradient-to-r from-amber-300 via-yellow-200 to-sky-200 bg-clip-text text-transparent">
            Acesse sua Conta
          </h1>
          <p className="text-xs text-blue-100/90 font-medium mt-1">
            Entre com seus dados para acessar seus simulados
          </p>
        </div>

        {/* Retângulo Branco com os Campos e Botões de Login */}
        <div className="bg-white rounded-3xl p-6 shadow-2xl shadow-blue-950/40 border border-slate-100 text-slate-900 flex flex-col space-y-5">
          
          {/* Alerta de Erro */}
          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold text-center">
              {errorMessage}
            </div>
          )}

          {/* Formulário de Login */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Campo E-mail */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 flex items-center justify-between">
                <span>E-mail de Acesso</span>
                <span className="text-[10px] font-normal text-slate-400">utilizado na compra</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seuemail@exemplo.com"
                  autoComplete="email"
                  required
                  className="w-full pl-10 pr-3.5 py-3.5 bg-slate-50 border border-slate-300 rounded-2xl text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-600 transition-all font-medium"
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
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  required
                  className="w-full pl-10 pr-10 py-3.5 bg-slate-50 border border-slate-300 rounded-2xl text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-600 transition-all font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer p-0.5"
                  aria-label={showPassword ? 'Ocultar senha' : 'Exibir senha'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4 text-blue-600" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Checkbox Permanecer Conectado e Badge de Segurança */}
            <div className="flex items-center justify-between pt-0.5">
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

            {/* Botão Entrar */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 px-4 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:scale-[0.99] text-white font-black text-base shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 mt-1"
            >
              {isLoading ? (
                <span className="inline-flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Acessando Portal...</span>
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
              <span className="flex-shrink mx-2 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                ou continue com
              </span>
              <div className="flex-grow border-t border-slate-200"></div>
            </div>

            {/* Botão Google Login Mobile */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 active:scale-[0.99] text-slate-700 font-bold text-xs shadow-2xs transition-all flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-60"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Entrar com Google</span>
            </button>

          </form>

          {/* Carrossel de Informações que Passam Automaticamente a cada 8s */}
          <div 
            onTouchStart={() => setIsInfoHovered(true)}
            onTouchEnd={() => setIsInfoHovered(false)}
            className="p-3.5 rounded-2xl bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 border border-slate-200/90 relative overflow-hidden"
          >
            {/* Barra de progresso */}
            <div className="absolute top-0 inset-x-0 h-0.5 bg-slate-200/60 overflow-hidden">
              <div 
                key={currentInfoIdx}
                className="h-full bg-blue-600"
                style={{
                  animation: isInfoHovered ? 'none' : 'progressFill 8s linear infinite',
                  width: isInfoHovered ? '100%' : undefined
                }}
              />
            </div>

            {/* Slide de Conteúdo */}
            <div key={studentInfoSlides[currentInfoIdx].id} className="animate-in fade-in duration-200">
              <div className="flex items-center justify-between gap-1.5 mb-1">
                <div className="flex items-center gap-1.5">
                  <div className={`w-5 h-5 rounded-md ${studentInfoSlides[currentInfoIdx].iconBg} flex items-center justify-center shrink-0`}>
                    {studentInfoSlides[currentInfoIdx].icon}
                  </div>
                  <h4 className="text-[11px] font-black text-slate-800 tracking-tight">
                    {studentInfoSlides[currentInfoIdx].title}
                  </h4>
                </div>
                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md border shrink-0 ${studentInfoSlides[currentInfoIdx].badgeColor}`}>
                  {studentInfoSlides[currentInfoIdx].badge}
                </span>
              </div>
              <p className="text-[10px] text-slate-600 leading-snug font-medium min-h-[30px]">
                {studentInfoSlides[currentInfoIdx].text}
              </p>
            </div>

            {/* Bolinhas e Setas de Navegação */}
            <div className="flex items-center justify-between pt-2 mt-1 border-t border-slate-200/60">
              <div className="flex items-center gap-1">
                {studentInfoSlides.map((slide, idx) => (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => setCurrentInfoIdx(idx)}
                    className={`transition-all duration-300 rounded-full cursor-pointer ${
                      currentInfoIdx === idx
                        ? 'w-4 h-1 bg-blue-600'
                        : 'w-1 h-1 bg-slate-300'
                    }`}
                    aria-label={`Slide ${idx + 1}`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-0.5">
                <button
                  type="button"
                  onClick={() => setCurrentInfoIdx((prev) => (prev - 1 + studentInfoSlides.length) % studentInfoSlides.length)}
                  className="p-1 rounded-md text-slate-400 hover:text-blue-600 cursor-pointer"
                  aria-label="Slide anterior"
                >
                  <ChevronLeft className="w-3 h-3" />
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentInfoIdx((prev) => (prev + 1) % studentInfoSlides.length)}
                  className="p-1 rounded-md text-slate-400 hover:text-blue-600 cursor-pointer"
                  aria-label="Próximo slide"
                >
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>

          </div>

          {/* Políticas de Privacidade e Termos de Uso (Modal LGPD) */}
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

      </main>

      {/* 3. RODAPÉ MOBILE */}
      <footer className="relative z-10 pt-6 text-center text-[11px] text-blue-200/80">
        © {new Date().getFullYear()} Meu Gabaritou • Plataforma Oficial de Estudos
      </footer>

      {/* Modal Institucional com Termos e Exclusão LGPD */}
      <PrivacyAndTermsModal
        isOpen={isLegalModalOpen}
        onClose={() => setIsLegalModalOpen(false)}
        defaultTab={legalModalTab}
      />

    </div>
  );
};
