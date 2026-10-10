import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  FileText, 
  Trash2, 
  Mail, 
  CheckCircle2, 
  Lock, 
  UserCheck, 
  AlertCircle 
} from 'lucide-react';

interface PrivacyAndTermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'privacy' | 'terms';
}

export const PrivacyAndTermsModal: React.FC<PrivacyAndTermsModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'privacy',
}) => {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms'>(defaultTab);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabeçalho do Modal */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-xs flex items-center justify-center text-white border border-white/20 shadow-xs">
              {activeTab === 'privacy' ? (
                <ShieldCheck className="w-5 h-5 text-emerald-300" />
              ) : (
                <FileText className="w-5 h-5 text-amber-300" />
              )}
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black tracking-tight leading-tight">
                {activeTab === 'privacy' ? 'Políticas de Privacidade' : 'Termos de Uso e Serviço'}
              </h3>
              <p className="text-xs text-blue-100 font-medium">
                Meu Gabaritou • Plataforma Oficial de Estudos (LGPD Compliant)
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Seletor de Abas */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-3 shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('privacy')}
            className={`pb-3 px-4 font-black text-xs sm:text-sm border-b-2 flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'privacy'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Políticas de Privacidade</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('terms')}
            className={`pb-3 px-4 font-black text-xs sm:text-sm border-b-2 flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'terms'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Termos de Uso</span>
          </button>
        </div>

        {/* Conteúdo com Rolagem Suave */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed font-sans">
          
          {activeTab === 'privacy' ? (
            /* CONTEÚDO: POLÍTICA DE PRIVACIDADE */
            <>
              {/* Box de Destaque da LGPD */}
              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-blue-900 flex items-start gap-3">
                <Lock className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-black text-xs sm:text-sm mb-1">
                    Compromisso com a sua Privacidade e Segurança (LGPD)
                  </h4>
                  <p className="text-xs text-blue-800 leading-normal">
                    O <strong>Meu Gabaritou</strong> respeita integralmente a Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018). Coletamos apenas os dados estritamente necessários para viabilizar seu acesso aos simulados e fornecer estatísticas pedagógicas personalizadas.
                  </p>
                </div>
              </div>

              {/* 1. Coleta de Dados */}
              <section className="space-y-2">
                <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-blue-600" />
                  <span>1. Dados Pessoais Coletados</span>
                </h4>
                <p>
                  Para criação e manutenção do seu cadastro na plataforma, coletamos as seguintes informações fornecidas no momento da compra (processada de forma segura pela integradora parceira Kiwify) ou no preenchimento de teste gratuito:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-slate-600">
                  <li><strong>Nome completo:</strong> utilizado para personalização da folha de respostas e identificação do aluno.</li>
                  <li><strong>Endereço de e-mail:</strong> utilizado como login de acesso, envio de notificações acadêmicas e comprovantes de compra.</li>
                  <li><strong>Telefone/WhatsApp (opcional):</strong> utilizado exclusivamente para avisos de liberação de novos simulados e suporte ao aluno.</li>
                  <li><strong>Histórico de Desempenho e Gabaritos:</strong> respostas assinaladas, acertos, erros e matérias revisadas no Caderno de Erros.</li>
                </ul>
              </section>

              {/* 2. Finalidade do Tratamento */}
              <section className="space-y-2">
                <h4 className="text-sm sm:text-base font-black text-slate-900">
                  2. Finalidade e Uso das Informações
                </h4>
                <p>
                  Seus dados nunca serão vendidos, cedidos, alugados ou compartilhados com terceiros para fins de marketing ou publicidade externa. Os dados são utilizados unicamente para:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-slate-600">
                  <li>Permitir o login e autenticação na Área do Aluno;</li>
                  <li>Calcular a nota do simulado e gerar o relatório do Caderno de Erros;</li>
                  <li>Prestar suporte técnico e pedagógico direto via e-mail e WhatsApp oficial.</li>
                </ul>
              </section>

              {/* 3. Destaque Especial: EXCLUSÃO DA CONTA E DIREITO DE RETIRADA DE DADOS */}
              <section className="p-5 rounded-2xl bg-gradient-to-br from-amber-50 to-rose-50 border-2 border-amber-300 text-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-amber-900">
                  <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0">
                    <Trash2 className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm sm:text-base font-black">
                    3. Exclusão da Conta e Eliminação Definitiva dos Seus Dados
                  </h4>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                  Em estrita conformidade com o <strong>Art. 18, inciso VI, da Lei Geral de Proteção de Dados (LGPD)</strong>, você tem o direito incondicional de solicitar a qualquer momento a <strong>exclusão total e definitiva da sua conta</strong>, bem como a remoção completa de todos os seus dados dos nossos servidores.
                </p>

                <div className="bg-white/90 rounded-xl p-4 border border-amber-200 space-y-2">
                  <h5 className="font-black text-xs text-amber-950 uppercase tracking-wide flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-amber-600" />
                    <span>Como solicitar a exclusão ao Suporte:</span>
                  </h5>
                  <p className="text-xs text-slate-600">
                    Basta enviar um e-mail para o nosso canal oficial de suporte:
                  </p>
                  <div className="p-2.5 bg-slate-100 rounded-lg text-slate-800 font-mono text-xs font-bold select-all flex items-center justify-between">
                    <span>suporte@meugabaritou.com.br</span>
                    <span className="text-[11px] font-sans font-normal text-slate-500">Assunto: "Exclusão de Conta e Dados LGPD"</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-normal">
                    No corpo do e-mail, informe o endereço de e-mail utilizado na sua conta. Nossa equipe processará a exclusão completa em até <strong>3 (três) dias úteis</strong>, eliminando:
                  </p>
                  <ul className="list-disc pl-5 space-y-0.5 text-xs text-slate-600">
                    <li>Registro cadastral e credenciais de login;</li>
                    <li>Histórico de notas, gabaritos e folhas de respostas;</li>
                    <li>Registros do Caderno de Erros e dados de desempenho.</li>
                  </ul>
                  <p className="text-[11px] text-emerald-800 font-semibold pt-1">
                    ✓ Um comprovante de exclusão definitiva será enviado imediatamente após a confirmação.
                  </p>
                </div>
              </section>

              {/* 4. Segurança e Armazenamento */}
              <section className="space-y-2">
                <h4 className="text-sm sm:text-base font-black text-slate-900">
                  4. Armazenamento e Criptografia
                </h4>
                <p>
                  Todas as comunicações entre seu navegador e a plataforma trafegam com protocolo de segurança HTTPS e criptografia SSL de 256 bits. Seus dados de pagamento (como cartões de crédito e PIX) são processados exclusivamente em ambiente seguro com certificação PCI-DSS da integradora bancária Kiwify, sem qualquer armazenamento de senhas ou dados bancários em nossos bancos de dados.
                </p>
              </section>

              {/* 5. Contato do Encarregado de Dados (DPO) */}
              <section className="space-y-2 pt-2 border-t border-slate-100">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Canal de Atendimento ao Titular de Dados
                </h4>
                <p className="text-xs text-slate-600">
                  Dúvidas sobre o tratamento de dados pessoais ou solicitações adicionais podem ser encaminhadas para: <strong className="text-blue-600">suporte@meugabaritou.com.br</strong> ou <strong className="text-blue-600">contato@meugabaritou.com.br</strong>.
                </p>
              </section>
            </>
          ) : (
            /* CONTEÚDO: TERMOS DE USO */
            <>
              {/* Box de Boas-Vindas */}
              <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-950 flex items-start gap-3">
                <FileText className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-black text-xs sm:text-sm mb-1">
                    Termos de Uso e Condições de Acesso
                  </h4>
                  <p className="text-xs text-indigo-900 leading-normal">
                    Ao acessar a plataforma <strong>Meu Gabaritou</strong> ou adquirir qualquer um de nossos planos de simulados, você concorda expressamente com os seguintes termos e condições de uso.
                  </p>
                </div>
              </div>

              {/* 1. Objeto */}
              <section className="space-y-2">
                <h4 className="text-sm sm:text-base font-black text-slate-900">
                  1. Objeto do Serviço
                </h4>
                <p>
                  O Meu Gabaritou disponibiliza uma plataforma educacional com simulados preparatórios em formato PDF para impressão, folha de respostas no padrão oficial OMR e sistema de Caderno de Erros automatizado para concurseiros e vestibulandos.
                </p>
              </section>

              {/* 2. Licença Individual e Intransferível */}
              <section className="space-y-2">
                <h4 className="text-sm sm:text-base font-black text-slate-900">
                  2. Uso Individual e Direitos Autorais
                </h4>
                <p>
                  O acesso aos cadernos, materiais diagramados e ferramentas de correção é de <strong>uso pessoal, individual e intransferível</strong> do titular cadastrado.
                </p>
                <ul className="list-disc pl-5 space-y-1 text-slate-600">
                  <li>É expressamente proibido o compartilhamento de login, revenda, rateio ou distribuição pública dos cadernos protegidos por direitos autorais;</li>
                  <li>O aluno tem o direito de imprimir quantas cópias desejar para seu próprio treino pessoal de estudos.</li>
                </ul>
              </section>

              {/* 3. Garantia Incondicional de 7 Dias */}
              <section className="space-y-2">
                <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-1.5 text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>3. Garantia Incondicional de 7 Dias (CDC - Art. 49)</span>
                </h4>
                <p>
                  Nos termos do Código de Defesa do Consumidor, qualquer assinatura ou plano adquirido possui <strong>garantia incondicional de 7 (sete) dias corridos</strong> a contar da confirmação do pagamento. Caso o aluno não se adapte ao método, poderá solicitar o reembolso integral diretamente pelo portal da Kiwify ou pelo nosso suporte, sem burocracias.
                </p>
              </section>

              {/* 4. Disponibilidade e Suporte */}
              <section className="space-y-2">
                <h4 className="text-sm sm:text-base font-black text-slate-900">
                  4. Suporte ao Aluno
                </h4>
                <p>
                  O suporte operacional e pedagógico funciona em dias úteis, através do e-mail oficial <strong className="text-blue-600">suporte@meugabaritou.com.br</strong> e WhatsApp de atendimento informado na Área do Aluno.
                </p>
              </section>
            </>
          )}

        </div>

        {/* Rodapé do Modal */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <span className="text-xs text-slate-500 font-medium text-center sm:text-left">
            Última atualização: {new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
          >
            Entendido e Fechar
          </button>
        </div>

      </div>
    </div>
  );
};
