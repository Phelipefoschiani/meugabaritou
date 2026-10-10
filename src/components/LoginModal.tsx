import React, { useState } from 'react';
import { 
  X, 
  LogIn, 
  Mail, 
  Lock 
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: { name: string; email: string; plan: string; planId: string }) => void;
  onNavigateToPlans: () => void;
  onOpenFreeTrial?: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  onOpenFreeTrial,
}) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [selectedPlan] = useState<'iniciante' | 'intermediario' | 'avancado'>('intermediario');
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage('Por favor, preencha seu e-mail e senha.');
      return;
    }

    onLoginSuccess({
      name: name || (email.split('@')[0] ?? 'Aluno'),
      email: email,
      plan: selectedPlan === 'avancado' ? 'Avançado' : selectedPlan === 'intermediario' ? 'Intermediário ⭐' : 'Iniciante',
      planId: selectedPlan,
    });
    onClose();
  };

  const handleQuickDemoLogin = (plan: 'iniciante' | 'intermediario' | 'avancado') => {
    const planNames = {
      iniciante: 'Iniciante (Pratique)',
      intermediario: 'Intermediário ⭐ (Pratique + Analise)',
      avancado: 'Avançado 🚀 (Direcionado)',
    };

    onLoginSuccess({
      name: 'Estudante Focado',
      email: 'aluno@meugabaritou.com.br',
      plan: planNames[plan],
      planId: plan,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative text-slate-900">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          id="login-modal-close-btn"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="text-center mb-6 flex flex-col items-center">
          <BrandLogo size="md" className="mb-3" />
          <h3 className="text-xl font-black text-slate-900 tracking-tight">
            Área do Aluno
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Entre na sua conta para resolver questões e simulados
          </p>
        </div>

        {/* Tabs: Entrar / Cadastro */}
        <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl mb-5 border border-slate-200">
          <button
            type="button"
            onClick={() => { setActiveTab('login'); setErrorMessage(''); }}
            className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === 'login'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            id="tab-login-btn"
          >
            Entrar na Conta
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab('register'); setErrorMessage(''); }}
            className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === 'register'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            id="tab-register-btn"
          >
            Criar Conta
          </button>
        </div>

        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
            {errorMessage}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {activeTab === 'register' && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Nome Completo
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Lucas Silva"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              E-mail
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu.email@exemplo.com"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Senha
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
            id="submit-auth-btn"
          >
            <LogIn className="w-4 h-4" />
            <span>{activeTab === 'login' ? 'Acessar Meu Gabaritou' : 'Finalizar Cadastro'}</span>
          </button>
        </form>

        {/* 1-Day Trial Option for Non-Users */}
        {onOpenFreeTrial && (
          <div className="mt-4 pt-4 border-t border-slate-200 text-center">
            <p className="text-xs text-slate-500 mb-2">
              Ainda não tem conta nem plano?
            </p>
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenFreeTrial();
              }}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:underline cursor-pointer"
            >
              <span>Experimente com o Teste Grátis de 24 Horas →</span>
            </button>
          </div>
        )}

        {/* Quick Demo Access */}
        <div className="mt-4 pt-4 border-t border-slate-200 text-center">
          <span className="text-[11px] text-slate-500 block mb-2 font-medium">
            Ou acesse diretamente com perfil demonstrativo:
          </span>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('iniciante')}
              className="py-1.5 px-2 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-[10px] font-bold text-slate-700 cursor-pointer"
            >
              Iniciante (R$27)
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('intermediario')}
              className="py-1.5 px-2 rounded-lg bg-blue-50 hover:bg-blue-100 border border-blue-200 text-[10px] font-bold text-blue-700 cursor-pointer"
            >
              Intermediário ⭐
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('avancado')}
              className="py-1.5 px-2 rounded-lg bg-amber-50 hover:bg-amber-100 border border-amber-200 text-[10px] font-bold text-amber-800 cursor-pointer"
            >
              Avançado (R$77)
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
