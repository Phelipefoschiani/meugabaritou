import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Scale, 
  Building2, 
  Landmark, 
  GraduationCap, 
  CheckCircle2, 
  XCircle, 
  ArrowRight,
  FileText,
  Award
} from 'lucide-react';

interface CareerData {
  id: string;
  name: string;
  badge: string;
  icon: React.ElementType;
  bancas: string;
  examFocus: string;
  totalQuestions: string;
  sampleQuestion: {
    exam: string;
    banca: string;
    discipline: string;
    statement: string;
    options: { letter: string; text: string }[];
    correctLetter: string;
    explanation: string;
    keyTip: string;
  };
}

const CAREERS: CareerData[] = [
  {
    id: 'policial',
    name: 'Carreiras Policiais',
    badge: 'PF, PRF, PC & PM',
    icon: ShieldAlert,
    bancas: 'CEBRASPE, FGV & Vunesp',
    examFocus: 'Direito Penal, Processual Penal, Constitucional & Informática',
    totalQuestions: '+ de 6 mil questões',
    sampleQuestion: {
      exam: 'Polícia Federal - Agente',
      banca: 'CEBRASPE',
      discipline: 'Direito Penal & Processo',
      statement: 'Em relação às excludentes de ilicitude e aos direitos individuais, considere a situação em que um agente policial ingressa em domicílio alheio durante a noite, sem mandado judicial, após constatar que um indivíduo está sendo agredido em flagrante delito. Nessa hipótese, a conduta do policial:',
      options: [
        { letter: 'A', text: 'É ilícita, pois a Constituição exige mandado judicial noturno mesmo em crimes em andamento.' },
        { letter: 'B', text: 'É legítima e constitucional, uma vez que a situação de flagrante delito autoriza o ingresso domiciliar a qualquer hora do dia ou da noite.' },
        { letter: 'C', text: 'Só seria permitida se houvesse prévio consentimento expresso por escrito do vizinho.' },
        { letter: 'D', text: 'Configura violação de domicílio com atenuação de pena.' },
      ],
      correctLetter: 'B',
      explanation: 'Nos termos do art. 5º, XI, da Constituição Federal, o domicílio é asilo inviolável, mas o ingresso SEM consentimento é admitido a qualquer hora (dia ou noite) em caso de flagrante delito, desastre ou para prestar socorro.',
      keyTip: 'Pegadinha clássica da banca: Mandado judicial só vale DE DIA. Flagrante, desastre ou socorro valem DIA e NOITE.',
    },
  },
  {
    id: 'tribunais',
    name: 'Tribunais & Jurídica',
    badge: 'TJ, TRF, TRT & MPU',
    icon: Scale,
    bancas: 'FGV, FCC & CEBRASPE',
    examFocus: 'Processo Civil, Processo Penal, Constitucional & Legislação Especial',
    totalQuestions: '+ de 5.800 questões',
    sampleQuestion: {
      exam: 'TJ-SP - Escrevente Técnico Judiciário',
      banca: 'Vunesp',
      discipline: 'Direito Processual Civil',
      statement: 'A respeito dos prazos processuais e da contagem nos termos do Código de Processo Civil (CPC/2015), é correto afirmar que os prazos computam-se:',
      options: [
        { letter: 'A', text: 'Somente em dias úteis, para a prática de atos processuais que dependam de prazo fixado em dias.' },
        { letter: 'B', text: 'Exclusivamente em dias corridos, incluindo sábados e domingos.' },
        { letter: 'C', text: 'Em dias úteis apenas se houver concordância prévia de ambas as partes.' },
        { letter: 'D', text: 'Contando-se o dia do começo e excluindo-se o do vencimento.' },
      ],
      correctLetter: 'A',
      explanation: 'Art. 219 do CPC/2015: Na contagem de prazo em dias, estabelecido por lei ou pelo juiz para a prática de qualquer ato processual, computar-se-ão somente os dias úteis.',
      keyTip: 'Atenção: No CPC são dias úteis; já no Processo Penal (CPP) a regra continua em dias corridos!',
    },
  },
  {
    id: 'inss',
    name: 'INSS & Administrativo',
    badge: 'INSS & Ministérios',
    icon: Building2,
    bancas: 'CEBRASPE & Cesgranrio',
    examFocus: 'Seguridade Social, Direito Administrativo (Lei 8.112/90) & Português',
    totalQuestions: '+ de 5 mil questões',
    sampleQuestion: {
      exam: 'INSS - Técnico do Seguro Social',
      banca: 'CEBRASPE',
      discipline: 'Seguridade Social',
      statement: 'A seguridade social compreende um conjunto integrado de ações de iniciativa dos poderes públicos e da sociedade, destinadas a assegurar os direitos relativos:',
      options: [
        { letter: 'A', text: 'Exclusivamente à previdência social e à segurança pública.' },
        { letter: 'B', text: 'Apenas à saúde pública dos cidadãos com carteira assinada.' },
        { letter: 'C', text: 'À saúde, à previdência e à assistência social (o tripé da seguridade).' },
        { letter: 'D', text: 'À previdência complementar e aos fundos privados de pensão.' },
      ],
      correctLetter: 'C',
      explanation: 'Art. 194 da CF/88: A Seguridade Social é o famoso tripé "S-A-P" (Saúde, Assistência Social e Previdência Social).',
      keyTip: 'Lembre-se: Saúde e Assistência não exigem contribuição; a Previdência Social tem caráter contributivo!',
    },
  },
  {
    id: 'bancarios',
    name: 'Bancárias & Fiscais',
    badge: 'Caixa, BB & Receita',
    icon: Landmark,
    bancas: 'Cesgranrio & FGV',
    examFocus: 'Conhecimentos Bancários, Matemática Financeira, Atendimento & TI',
    totalQuestions: '+ de 5.500 questões',
    sampleQuestion: {
      exam: 'Caixa Econômica Federal - Técnico Bancário',
      banca: 'Cesgranrio',
      discipline: 'Conhecimentos Bancários',
      statement: 'No âmbito do Sistema Financeiro Nacional (SFN), a instituição responsável por formular a política da moeda e do crédito, objetivando a estabilidade da moeda e o desenvolvimento econômico e social do País, é:',
      options: [
        { letter: 'A', text: 'O Banco Central do Brasil (BACEN).' },
        { letter: 'B', text: 'O Conselho Monetário Nacional (CMN).' },
        { letter: 'C', text: 'A Comissão de Valores Mobiliários (CVM).' },
        { letter: 'D', text: 'A Caixa Econômica Federal.' },
      ],
      correctLetter: 'B',
      explanation: 'O CMN é o órgão máximo NORMATIVO do SFN (dita as regras e metas de inflação). O Banco Central (BACEN) é quem executa e fiscaliza.',
      keyTip: 'Macete de memorização (Mnemônico): Conselho (CMN) = Manda / Dita regras. Banco Central (BACEN) = Executa / Fiscaliza.',
    },
  },
  {
    id: 'enem',
    name: 'ENEM & Vestibulares',
    badge: 'ENEM, Fuvest & Unicamp',
    icon: GraduationCap,
    bancas: 'INEP, Vunesp & Comvest',
    examFocus: 'Matemática (Cálculo TRI), Redação, Linguagens & Ciências da Natureza',
    totalQuestions: '+ de 6.500 questões',
    sampleQuestion: {
      exam: 'ENEM - Matemática e suas Tecnologias',
      banca: 'INEP',
      discipline: 'Funções e Otimização',
      statement: 'O custo C (em reais) para fabricar x unidades de um produto é dado por C(x) = x² - 40x + 600. A quantidade de peças que minimiza o custo total de produção é:',
      options: [
        { letter: 'A', text: '15 peças' },
        { letter: 'B', text: '30 peças' },
        { letter: 'C', text: '20 peças' },
        { letter: 'D', text: '40 peças' },
      ],
      correctLetter: 'C',
      explanation: 'Para achar o ponto de custo mínimo de uma parábola voltada para cima, usamos o vértice Xv = -b / (2a). Com a = 1 e b = -40: Xv = -(-40) / (2 * 1) = 20 peças.',
      keyTip: 'Na prova do ENEM, questões de vértice de parábola garantem pontuação TRI altíssima por serem consideradas padrão.',
    },
  },
];

interface CareerTargetSelectorProps {
  onOpenFreeTrial: () => void;
  onOpenPlans: () => void;
}

export const CareerTargetSelector: React.FC<CareerTargetSelectorProps> = ({
  onOpenFreeTrial,
  onOpenPlans,
}) => {
  const [selectedCareerId, setSelectedCareerId] = useState<string>('policial');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState<boolean>(false);

  const currentCareer = CAREERS.find((c) => c.id === selectedCareerId) || CAREERS[0];
  const q = currentCareer.sampleQuestion;

  const handleSelectCareer = (careerId: string) => {
    setSelectedCareerId(careerId);
    setSelectedOption(null);
    setIsAnswerRevealed(false);
  };

  const handleSelectOption = (letter: string) => {
    setSelectedOption(letter);
    setIsAnswerRevealed(true);
  };

  return (
    <section className="py-14 sm:py-20 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white border-b border-blue-400/40 relative overflow-hidden">
      {/* Top Gloss / Specular Sheen Layer matching top header */}
      <div 
        className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-white/25 via-white/5 to-transparent pointer-events-none" 
        aria-hidden="true"
      />

      {/* Ultra-fine top highlight edge line */}
      <div 
        className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none" 
        aria-hidden="true"
      />

      {/* Ambient specular light highlight */}
      <div className="absolute top-0 left-1/3 w-96 h-40 bg-sky-300/20 blur-3xl rounded-full pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header com a marca 100% em branco e sem ícone */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 space-y-3">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white drop-shadow-sm">
            Qual é o seu Concurso-Alvo?
          </h2>

          <div className="text-sm sm:text-base text-blue-100 flex items-center justify-center flex-wrap gap-x-1.5 gap-y-1">
            <span>Selecione sua carreira abaixo e veja como o</span>
            <span className="font-extrabold text-white drop-shadow-xs inline-flex items-baseline gap-1">
              <span 
                style={{ fontFamily: "'Satisfy', 'Caveat', cursive, sans-serif" }} 
                className="italic font-bold text-white text-lg sm:text-xl"
              >
                Meu
              </span>
              <span 
                style={{ fontFamily: "'Caveat', 'Satisfy', cursive, sans-serif" }} 
                className="font-black text-white text-lg sm:text-xl"
              >
                Gabaritou
              </span>
            </span>
            <span>calibra as questões, bancas e simulados sob medida para a sua prova.</span>
          </div>
        </div>

        {/* Career Selection Buttons Grid (Cards Super Modernos com Vidro e Destaque Visual) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3.5 mb-7 sm:mb-8">
          {CAREERS.map((career) => {
            const isSelected = career.id === selectedCareerId;
            const IconComponent = career.icon;
            return (
              <button
                key={career.id}
                type="button"
                onClick={() => handleSelectCareer(career.id)}
                className={`group relative p-3.5 sm:p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[110px] last:col-span-2 sm:last:col-span-1 ${
                  isSelected
                    ? 'bg-white text-slate-950 border-2 border-white shadow-2xl shadow-blue-950/45 scale-[1.03] ring-4 ring-amber-400/40 -translate-y-1'
                    : 'bg-white/10 hover:bg-white/20 backdrop-blur-md border-white/20 hover:border-white/40 text-white shadow-lg hover:-translate-y-1'
                }`}
              >
                <div className="flex items-center justify-between mb-2.5">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105 ${
                      isSelected 
                        ? 'bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-md shadow-blue-600/30' 
                        : 'bg-white/15 text-white border border-white/20'
                    }`}
                  >
                    <IconComponent className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                  </div>
                  <span
                    className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                      isSelected 
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                        : 'bg-white/15 text-amber-300 border border-white/20'
                    }`}
                  >
                    {career.totalQuestions}
                  </span>
                </div>

                <div>
                  <div className={`font-black text-xs sm:text-sm leading-snug tracking-tight ${
                    isSelected ? 'text-slate-950' : 'text-white'
                  }`}>
                    {career.name}
                  </div>
                  <div className={`text-[11px] truncate mt-0.5 font-bold ${
                    isSelected ? 'text-blue-700' : 'text-sky-200/90'
                  }`}>
                    {career.badge}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Dynamic Career Diagnostic Card & Interactive Question (Design de Alta Fidelidade) */}
        <div className="bg-white rounded-3xl border border-white/80 shadow-[0_20px_60px_-15px_rgba(15,23,42,0.4)] p-5 sm:p-8 text-slate-900 relative">
          
          {/* Career Specs Summary Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100 text-xs">
            <div className="flex items-center gap-2.5">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse shrink-0 ring-4 ring-emerald-100" />
              <span className="font-bold text-slate-700 text-xs sm:text-sm">
                Carreira Ativa: <span className="text-blue-700 font-black">{currentCareer.name} ({currentCareer.badge})</span>
              </span>
            </div>

            <div className="flex flex-wrap gap-2 text-xs">
              <span className="px-3 py-1.5 rounded-xl bg-blue-50 text-blue-900 border border-blue-200 font-semibold flex items-center gap-1.5">
                <span>🏛️ Bancas:</span>
                <strong className="font-black text-blue-950">{currentCareer.bancas}</strong>
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-sky-50 text-sky-900 border border-sky-200 font-semibold flex items-center gap-1.5">
                <span>🎯 Foco:</span>
                <strong className="font-black text-sky-950">{currentCareer.examFocus}</strong>
              </span>
            </div>
          </div>

          {/* Interactive Question Sandbox */}
          <div className="pt-5 sm:pt-6">
            <div className="flex flex-wrap items-center justify-between gap-2.5 mb-3.5">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-black px-2.5 py-1 rounded-lg bg-blue-600 text-white shadow-xs">
                  {q.exam}
                </span>
                <span className="text-xs font-bold text-slate-500">
                  Banca {q.banca} • {q.discipline}
                </span>
              </div>
              <span className="text-xs text-amber-900 font-black flex items-center gap-1.5 bg-amber-100/80 px-2.5 py-1 rounded-lg border border-amber-300">
                <span>⚡ Teste Prático com Correção Instantânea</span>
              </span>
            </div>

            {/* Enunciado Formatado em Bloco Limpo */}
            <div className="bg-slate-50/90 p-4 sm:p-5 rounded-2xl border border-slate-200/90 mb-5">
              <p className="text-xs sm:text-base text-slate-900 font-semibold leading-relaxed">
                {q.statement}
              </p>
            </div>

            {/* Answer Options */}
            <div className="space-y-2.5 sm:space-y-3 mb-6">
              {q.options.map((opt) => {
                const isSelected = selectedOption === opt.letter;
                const isCorrect = opt.letter === q.correctLetter;

                let optStyles = 'bg-white hover:bg-blue-50/60 border-slate-200 text-slate-800 shadow-xs hover:border-blue-300';
                if (isAnswerRevealed) {
                  if (isCorrect) {
                    optStyles = 'bg-emerald-50 border-2 border-emerald-500 text-emerald-950 ring-2 ring-emerald-500/20 shadow-sm';
                  } else if (isSelected && !isCorrect) {
                    optStyles = 'bg-rose-50 border-2 border-rose-400 text-rose-950';
                  } else {
                    optStyles = 'bg-slate-50/50 border-slate-100 text-slate-400 opacity-60';
                  }
                }

                return (
                  <button
                    key={opt.letter}
                    type="button"
                    onClick={() => handleSelectOption(opt.letter)}
                    className={`w-full p-3 sm:p-4 min-h-[50px] rounded-2xl border text-left flex items-start gap-3 sm:gap-3.5 transition-all duration-200 cursor-pointer ${optStyles}`}
                  >
                    <span
                      className={`w-7 h-7 rounded-xl font-black text-xs flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                        isAnswerRevealed && isCorrect
                          ? 'bg-emerald-600 text-white'
                          : isAnswerRevealed && isSelected && !isCorrect
                          ? 'bg-rose-600 text-white'
                          : 'bg-slate-100 text-slate-700 border border-slate-200'
                      }`}
                    >
                      {opt.letter}
                    </span>
                    <span className="text-xs sm:text-sm font-medium leading-relaxed">
                      {opt.text}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Instant Educational Feedback Banner */}
            {isAnswerRevealed && (
              <div className="rounded-2xl border p-4 sm:p-5 mb-6 transition-all bg-blue-50/80 border-blue-200">
                <div className="flex items-center gap-2 mb-2.5 font-bold text-xs sm:text-sm">
                  {selectedOption === q.correctLetter ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      <span className="text-emerald-800 font-black">Resposta Correta! Você gabaritou esta questão.</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                      <span className="text-rose-800 font-black">Alternativa Incorreta! A resposta correta é a letra {q.correctLetter}.</span>
                    </>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-3.5">
                  <strong className="text-slate-900 font-black">Comentário do Professor:</strong> {q.explanation}
                </p>

                <div className="bg-amber-100/80 border border-amber-300 rounded-xl p-3 text-xs text-amber-950 flex items-start sm:items-center gap-2.5 shadow-xs">
                  <Award className="w-4 h-4 text-amber-700 shrink-0 mt-0.5 sm:mt-0" />
                  <span><strong>Dica de Ouro da Banca:</strong> {q.keyTip}</span>
                </div>
              </div>
            )}

            {/* CTAs inside the Career Box */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3.5 sm:gap-4 pt-5 border-t border-slate-100">
              <div className="text-xs text-slate-500 text-center sm:text-left flex items-center justify-center sm:justify-start gap-2">
                <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Simulados diagramados em folha A4 com gabarito oficial disponíveis para esta carreira.</span>
              </div>

              <div className="flex flex-col xs:flex-row items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={onOpenFreeTrial}
                  className="w-full xs:w-auto px-4 py-2.5 min-h-[44px] rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors cursor-pointer flex items-center justify-center"
                >
                  Cadastre-se gratuitamente
                </button>
                <button
                  type="button"
                  onClick={onOpenPlans}
                  className="w-full xs:w-auto px-5 py-2.5 min-h-[44px] rounded-xl text-xs font-black text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/30 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Gabaritar Meu Concurso</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
