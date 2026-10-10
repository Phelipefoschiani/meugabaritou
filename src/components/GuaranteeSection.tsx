import React from 'react';
import { ShieldCheck, Clock, Lock, CheckCircle2, ArrowRight } from 'lucide-react';
import { BrandName } from './BrandName';

interface GuaranteeSectionProps {
  onOpenFreeTrial?: () => void;
}

export const GuaranteeSection: React.FC<GuaranteeSectionProps> = ({ onOpenFreeTrial }) => {
  return (
    <section className="py-14 sm:py-18 bg-gradient-to-b from-slate-50 via-white to-slate-50/80 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Quadrante Principal */}
        <div className="bg-white rounded-3xl border-2 border-emerald-500/30 shadow-xl shadow-emerald-950/5 relative overflow-hidden">
          
          {/* Linha de Destaque Superior com Gradiente */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-400 via-blue-600 to-teal-400" />

          <div className="p-6 sm:p-10 lg:p-12">
            
            {/* Cabeçalho do Quadrante */}
            <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-3">
              <h3 className="text-2xl sm:text-3xl lg:text-[2.5rem] font-black tracking-tight leading-tight flex flex-col items-center gap-1.5">
                <span className="text-amber-500">Teste Grátis de 1 Dia</span>
                <span className="text-emerald-600">Garantia de 7 Dias</span>
                <span className="text-blue-600">Compra 100% Segura pela Kiwify</span>
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed pt-1">
                Aqui você estuda com foco e total tranquilidade. Criamos um ecossistema seguro e transparente para você experimentar, comprovar os resultados e conquistar a sua vaga.
              </p>
            </div>

            {/* Os 3 Pilares do Quadrante */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              
              {/* 1. TESTE GRÁTIS DE 1 DIA */}
              <div className="bg-gradient-to-b from-amber-50/60 via-white to-amber-50/20 rounded-2xl p-6 border-2 border-amber-300/80 shadow-sm flex flex-col justify-between relative group hover:border-amber-400 transition-all hover:shadow-md">
                <div className="space-y-4">
                  
                  {/* Ícone / Selo de 24 Horas */}
                  <div className="mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-700 shadow-xs">
                      <Clock className="w-7 h-7 stroke-[2.2]" />
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-black text-slate-900 tracking-tight mb-1.5">
                      Teste Grátis de 1 Dia
                    </h4>
                    <p className="text-xs font-bold text-amber-800 mb-2.5">
                      24 horas de acesso total sem compromisso
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Experimente a plataforma na prática antes de pagar qualquer valor. Crie sua conta em 30 segundos, monte simulados, responda questões e teste o método sem precisar informar cartão de crédito.
                    </p>
                  </div>

                  {/* Vantagens do Teste */}
                  <div className="space-y-1.5 pt-2 text-[11px] text-slate-700 font-medium border-t border-amber-100">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>Sem cartão de crédito necessário</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>Liberação imediata em 30 segundos</span>
                    </div>
                  </div>
                </div>

                {onOpenFreeTrial && (
                  <div className="mt-6 pt-2">
                    <button
                      type="button"
                      onClick={onOpenFreeTrial}
                      className="relative group overflow-hidden w-full py-3.5 px-4 rounded-xl text-sm font-black text-amber-950 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-300 hover:from-amber-400 hover:to-amber-500 border border-amber-500 shadow-md shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {/* Reflexo Animado Contínuo da Esquerda para a Direita */}
                      <div 
                        className="absolute inset-0 w-2/3 h-full bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-[-25deg] pointer-events-none animate-shimmer-sweep"
                        aria-hidden="true"
                      />
                      <span className="relative z-10">Ativar Teste Grátis</span>
                      <ArrowRight className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                )}
              </div>

              {/* 2. COMPRA SEGURA PELA PLATAFORMA KIWIFY */}
              <div className="bg-gradient-to-b from-blue-50/60 via-white to-blue-50/20 rounded-2xl p-6 border-2 border-blue-300/80 shadow-sm flex flex-col justify-between relative group hover:border-blue-500 transition-all hover:shadow-md">
                <div className="space-y-4">
                  
                  {/* Ícone / Selo Kiwify */}
                  <div className="mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-blue-100 border border-blue-300 flex items-center justify-center text-blue-700 shadow-xs">
                      <Lock className="w-7 h-7 stroke-[2.2]" />
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-black text-slate-900 tracking-tight mb-1.5">
                      Compra Segura pela Kiwify
                    </h4>
                    <p className="text-xs font-bold text-blue-800 mb-2.5">
                      Líder em pagamentos protegidos e criptografia
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Seu pagamento é intermediado e 100% protegido pela <strong className="text-blue-950">Kiwify</strong>, a plataforma de educação e pagamentos mais segura do Brasil. Criptografia SSL 256 bits, antifraude ativo e privacidade bancária garantida.
                    </p>
                  </div>

                  {/* Vantagens do Checkout Kiwify */}
                  <div className="space-y-1.5 pt-2 text-[11px] text-slate-700 font-medium border-t border-blue-100">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>Liberação automática via PIX ou Cartão</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>Dados 100% blindados e criptografados</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-2">
                  <div className="bg-blue-50/90 border border-blue-200/80 rounded-xl px-3 py-2 text-center text-[11px] font-bold text-blue-900">
                    Ambiente Certificado & Blindado
                  </div>
                </div>
              </div>

              {/* 3. GARANTIA INCONDICIONAL DE 7 DIAS */}
              <div className="bg-gradient-to-b from-emerald-50/60 via-white to-emerald-50/20 rounded-2xl p-6 border-2 border-emerald-400/90 shadow-sm flex flex-col justify-between relative group hover:border-emerald-500 transition-all hover:shadow-md">
                <div className="space-y-4">
                  
                  {/* Ícone / Selo de 7 Dias */}
                  <div className="mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700 shadow-xs">
                      <ShieldCheck className="w-8 h-8 stroke-[2.2]" />
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-black text-slate-900 tracking-tight mb-1.5">
                      Garantia de 7 Dias
                    </h4>
                    <p className="text-xs font-bold text-emerald-800 mb-2.5">
                      100% do seu dinheiro de volta se não amar
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Ao assinar qualquer plano do <BrandName theme="blue" />, você tem 7 dias corridos de teste. Se por qualquer motivo achar que não valeu a pena, devolvemos <strong className="text-slate-900">100% do seu investimento</strong> sem burocracia e direto na Kiwify.
                    </p>
                  </div>

                  {/* Vantagens da Garantia */}
                  <div className="space-y-1.5 pt-2 text-[11px] text-slate-700 font-medium border-t border-emerald-100">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Reembolso em 1 clique sem burocracia</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Garantia respaldada pelo Código de Defesa</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-2">
                  <div className="bg-emerald-100/80 border border-emerald-300/80 rounded-xl px-3 py-2 text-center text-[11px] font-black text-emerald-900">
                    Risco Zero para o Aluno
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
