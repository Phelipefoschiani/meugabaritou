import React, { useState } from 'react';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { BrandName } from './BrandName';
import { getKiwifyCheckoutUrl } from '../config/kiwifyConfig';
import { PrivacyAndTermsModal } from './PrivacyAndTermsModal';

interface FooterProps {
  onOpenLogin: () => void;
  onOpenCheckout: (planId?: string) => void;
  onOpenFreeTrial?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  onOpenLogin, 
  onOpenCheckout, 
  onOpenFreeTrial 
}) => {
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);
  const [legalModalTab, setLegalModalTab] = useState<'privacy' | 'terms'>('privacy');
  return (
    <footer className="bg-slate-100 text-slate-600 py-14 border-t border-slate-200 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <BrandLogo size="sm" />
            <p className="text-slate-600 text-xs leading-relaxed">
              O ecossistema completo de preparação para o ENEM e Concursos Públicos. Estude com método, simulados em PDF diagramados e eliminação contínua de erros.
            </p>
            <div className="pt-2 flex items-center gap-1.5 text-emerald-700 text-[11px] font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Garantia incondicional de 7 dias</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-3">
              Navegação
            </h4>
            <ul className="space-y-2 font-medium">
              <li><a href="#o-que-faz" className="hover:text-blue-600 transition-colors">O que o App Faz</a></li>
              <li><a href="#simulados" className="hover:text-blue-600 transition-colors">Simulados em PDF & Digital</a></li>
              <li><a href="#planos" className="hover:text-blue-600 transition-colors">Planos e Preços</a></li>
              <li><a href="#comparativo" className="hover:text-blue-600 transition-colors">Tabela Comparativa</a></li>
              <li><a href="#faq" className="hover:text-blue-600 transition-colors">Perguntas Frequentes</a></li>
            </ul>
          </div>

          {/* Planos */}
          <div>
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-3">
              Planos de Acesso
            </h4>
            <ul className="space-y-2 font-medium">
              <li>
                <a 
                  href={getKiwifyCheckoutUrl('iniciante')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 transition-colors text-left cursor-pointer inline-block"
                >
                  Iniciante — R$ 27,00/mês
                </a>
              </li>
              <li>
                <a 
                  href={getKiwifyCheckoutUrl('intermediario')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 transition-colors text-left text-blue-700 font-bold cursor-pointer inline-block"
                >
                  Intermediário ⭐ — R$ 47,00/mês
                </a>
              </li>
              <li>
                <a 
                  href={getKiwifyCheckoutUrl('avancado')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-700 transition-colors text-left text-amber-600 font-semibold cursor-pointer inline-block"
                >
                  Avançado — R$ 77,00/mês
                </a>
              </li>
              {onOpenFreeTrial && (
                <li className="pt-1">
                  <button
                    type="button"
                    onClick={onOpenFreeTrial}
                    className="text-emerald-700 font-bold hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <span>Cadastre-se gratuitamente</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Área do Aluno & Contato */}
          <div>
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-3">
              Acesso
            </h4>
            <p className="text-xs text-slate-600 mb-3">
              Já é nosso aluno ou cadastrado gratuitamente?
            </p>
            <button
              type="button"
              onClick={onOpenLogin}
              className="w-full py-2.5 px-3 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs border border-slate-300 shadow-xs transition-colors mb-3 cursor-pointer"
            >
              Entrar na Minha Conta
            </button>
            <div className="text-[11px] text-slate-500 font-medium">
              Suporte: contato@meugabaritou.com.br
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span>© {new Date().getFullYear()}</span>
            <BrandName theme="blue" />
            <span>• Todos os direitos reservados.</span>
          </div>
          <div className="flex items-center gap-4 font-medium">
            <button
              type="button"
              onClick={() => {
                setLegalModalTab('terms');
                setIsLegalModalOpen(true);
              }}
              className="hover:text-blue-600 cursor-pointer transition-colors"
            >
              Termos de Uso
            </button>
            <button
              type="button"
              onClick={() => {
                setLegalModalTab('privacy');
                setIsLegalModalOpen(true);
              }}
              className="hover:text-blue-600 cursor-pointer transition-colors"
            >
              Políticas de Privacidade
            </button>
            <span className="text-slate-400">Garantia de 7 Dias</span>
          </div>
        </div>
      </div>

      {/* Modal Institucional de Políticas de Privacidade e Termos de Uso */}
      <PrivacyAndTermsModal
        isOpen={isLegalModalOpen}
        onClose={() => setIsLegalModalOpen(false)}
        defaultTab={legalModalTab}
      />
    </footer>
  );
};
