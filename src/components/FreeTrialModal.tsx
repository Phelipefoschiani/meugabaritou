import React, { useState } from 'react';
import { 
  X, 
  ArrowRight, 
  LockOpen
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { registerTrialLead, syncStudentProfile } from '../config/firebase';

interface FreeTrialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTrialActivated: (user: { name: string; email: string; phone?: string; plan: string; planId: string; isTrial: boolean }) => void;
}

export const FreeTrialModal: React.FC<FreeTrialModalProps> = ({
  isOpen,
  onClose,
  onTrialActivated,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleStartTrial = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const candidateName = name.trim() || 'Aluno Teste Grátis';
    const candidateEmail = email.trim() || 'aluno.gratis@meugabaritou.com.br';
    const candidatePhone = phone.trim() || '';

    try {
      // Grava lead no Firebase Firestore na coleção /trials
      await registerTrialLead({
        name: candidateName,
        email: candidateEmail,
        phone: candidatePhone
      });
      // Sincroniza perfil do aluno no Firebase
      await syncStudentProfile(candidateEmail, candidateName, 'avancado', true, candidatePhone);
    } catch (err) {
      console.warn('Firebase trial lead notice:', err);
    } finally {
      setIsSubmitting(false);
    }

    onTrialActivated({
      name: candidateName,
      email: candidateEmail,
      phone: candidatePhone,
      plan: 'Teste Grátis (24 Horas)',
      planId: 'avancado',
      isTrial: true,
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
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Limpo */}
        <div className="text-center mb-6 flex flex-col items-center">
          <BrandLogo size="md" className="mb-3" />
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">
            Ativar Teste Grátis
          </h3>
        </div>

        {/* Formulário com Nome, E-mail e WhatsApp */}
        <form onSubmit={handleStartTrial} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Seu Nome Completo
            </label>
            <input
              type="text"
              required
              placeholder="Ex: Mariana Costa"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-3 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Seu Melhor E-mail
            </label>
            <input
              type="email"
              required
              placeholder="mariana@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-3 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              WhatsApp (com DDD)
            </label>
            <input
              type="tel"
              required
              placeholder="(11) 99999-9999"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3.5 py-3 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>

          {/* Botão Maior com Reflexo Animado da Esquerda para a Direita */}
          <div className="pt-2">
            <button
              type="submit"
              className="relative group overflow-hidden w-full py-4 px-6 rounded-2xl font-black text-base sm:text-lg text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:via-indigo-700 hover:to-blue-800 shadow-xl shadow-blue-600/35 hover:shadow-2xl hover:shadow-blue-600/45 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer"
              id="start-free-trial-submit-btn"
            >
              {/* Reflexo Animado Contínuo da Esquerda para a Direita */}
              <div 
                className="absolute inset-0 w-2/3 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-25deg] pointer-events-none animate-shimmer-sweep"
                aria-hidden="true"
              />

              {/* Borda superior de vidro reflexivo */}
              <div className="absolute top-0 inset-x-3 h-[1px] bg-white/60 pointer-events-none" />

              <LockOpen className="w-5 h-5 text-emerald-300 relative z-10 shrink-0" />
              <span className="relative z-10 tracking-tight whitespace-nowrap drop-shadow-sm">
                Ativar Teste Grátis
              </span>
              <ArrowRight className="w-5 h-5 text-white/90 relative z-10 shrink-0 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
