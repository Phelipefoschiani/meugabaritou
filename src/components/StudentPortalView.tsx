import React, { useState } from 'react';
import { 
  BarChart3, 
  Clock, 
  ArrowLeft, 
  Target, 
  Check, 
  BookOpen, 
  Flame, 
  Printer
} from 'lucide-react';
import { SAMPLE_QUESTIONS } from '../data/plansData';
import { BrandName } from './BrandName';
import { BrandIcon } from './BrandLogo';
import { saveStudyStats, logQuestionAnswer } from '../config/firebase';

interface StudentPortalViewProps {
  user: { name: string; email: string; plan: string; planId: string; isTrial?: boolean };
  onBackToFunnel: () => void;
  onOpenPDFPreview: () => void;
}

export const StudentPortalView: React.FC<StudentPortalViewProps> = ({
  user,
  onBackToFunnel,
  onOpenPDFPreview,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [markedForReview, setMarkedForReview] = useState(false);
  const [userStats, setUserStats] = useState({
    answeredToday: 12,
    correctCount: 10,
    errorsCount: 2,
    streakDays: 6,
  });

  const question = SAMPLE_QUESTIONS[currentQuestionIndex % SAMPLE_QUESTIONS.length];

  const handleSelectOption = (letter: string) => {
    if (!hasAnswered) {
      setSelectedOption(letter);
    }
  };

  const handleConfirm = () => {
    if (!selectedOption) return;
    setHasAnswered(true);
    const isCorrect = selectedOption === question.correctOptionLetter;
    const newStats = {
      answeredToday: userStats.answeredToday + 1,
      correctCount: isCorrect ? userStats.correctCount + 1 : userStats.correctCount,
      errorsCount: isCorrect ? userStats.errorsCount : userStats.errorsCount + 1,
      streakDays: userStats.streakDays,
    };
    setUserStats(newStats);

    // Salva progresso e resposta no Firebase Firestore
    const studentUid = user.email || 'anon_student';
    saveStudyStats(studentUid, newStats);
    logQuestionAnswer(studentUid, Number(question.id) || 1, selectedOption, isCorrect);
  };

  const handleNext = () => {
    setSelectedOption(null);
    setHasAnswered(false);
    setMarkedForReview(false);
    setCurrentQuestionIndex((prev) => (prev + 1) % SAMPLE_QUESTIONS.length);
  };

  const isAvancado = user.planId === 'avancado';
  const isIntermediarioOrAbove = user.planId === 'intermediario' || user.planId === 'avancado';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Trial Alert Ribbon */}
        {user.isTrial && (
          <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-xs sm:text-sm text-slate-900">
                  Teste Grátis de 24 Horas Ativo
                </div>
                <div className="text-[11px] text-slate-600">
                  Tempo restante: <strong>23h 58min</strong> • Acesso liberado a todas as ferramentas
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={onBackToFunnel}
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
            >
              Ver Planos Definitivos
            </button>
          </div>
        )}

        {/* Top Student Header */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-lg sm:text-xl shadow-md shadow-blue-600/20 shrink-0">
              {user.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-lg sm:text-xl font-bold text-slate-900">
                  Olá, {user.name}!
                </h1>
                <span className="px-2 py-0.5 rounded-md text-[11px] sm:text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                  {user.plan}
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                <span>Ambiente de Treino •</span>
                <BrandIcon size={14} />
                <BrandName theme="blue" />
                <span className="hidden xs:inline">ENEM & Concursos</span>
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 w-full md:w-auto">
            <button
              type="button"
              onClick={onOpenPDFPreview}
              className="inline-flex items-center justify-center gap-2 px-3.5 py-2.5 min-h-[42px] rounded-xl text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-colors cursor-pointer shadow-xs"
            >
              <Printer className="w-4 h-4" />
              <span>Gerar Simulado em PDF</span>
            </button>
            <button
              type="button"
              onClick={onBackToFunnel}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[42px] rounded-xl text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 transition-colors cursor-pointer shadow-xs"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar ao Funil</span>
            </button>
          </div>
        </div>

        {/* Daily Mission (Plan Avançado or Free Trial) */}
        {isAvancado && (
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center font-bold text-xs">
                  <Target className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">
                  Sua Missão Diária (Estudo Direcionado)
                </h3>
              </div>
              <span className="text-xs font-bold text-emerald-700">
                Meta do Dia: 25 Questões
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900">15 Questões</div>
                  <div className="text-[11px] text-slate-500">Geometria e Funções</div>
                </div>
                <Check className="w-4 h-4 text-emerald-600 font-bold" />
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900">10 Questões</div>
                  <div className="text-[11px] text-slate-500">Química Orgânica</div>
                </div>
                <span className="text-[11px] font-bold text-blue-600">Em andamento</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900">Revisar 6 Erros</div>
                  <div className="text-[11px] text-slate-500">Caderno de Erros</div>
                </div>
                <span className="text-[11px] font-bold text-slate-400">Pendente</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900">Simulado Sábado</div>
                  <div className="text-[11px] text-slate-500">90 Questões Oficial</div>
                </div>
                <span className="text-[11px] font-bold text-amber-700">Agendado</span>
              </div>
            </div>
          </div>
        )}

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div className="text-xs text-slate-500 font-medium">Respondidas Hoje</div>
            <div className="text-2xl font-black text-slate-900 mt-1">
              {userStats.answeredToday}
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div className="text-xs text-slate-500 font-medium">Taxa de Acertos</div>
            <div className="text-2xl font-black text-emerald-700 mt-1">
              {Math.round((userStats.correctCount / Math.max(1, userStats.answeredToday)) * 100)}%
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div className="text-xs text-slate-500 font-medium">Caderno de Erros</div>
            <div className="text-2xl font-black text-rose-600 mt-1">
              {userStats.errorsCount} <span className="text-xs text-slate-400 font-normal">para revisar</span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div className="text-xs text-slate-500 font-medium flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              <span>Sequência de Dias</span>
            </div>
            <div className="text-2xl font-black text-amber-600 mt-1">
              {userStats.streakDays} dias
            </div>
          </div>
        </div>

        {/* Main Working Area: Question Solver */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          
          {/* Question Meta header */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-md text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                {question.exam} {question.year} • {question.institution}
              </span>
              <span className="text-xs text-slate-700 font-medium">
                Matéria: <strong>{question.subject}</strong>
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-500">Tópico: {question.topic}</span>
              <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                {question.difficulty}
              </span>
            </div>
          </div>

          {/* Statement */}
          <div className="text-xs sm:text-sm text-slate-800 leading-relaxed bg-slate-50 p-5 rounded-xl border border-slate-200">
            {question.statement}
          </div>

          {/* Alternatives */}
          <div className="space-y-2.5">
            {question.options.map((opt) => {
              const isSelected = selectedOption === opt.letter;
              const isCorrect = opt.letter === question.correctOptionLetter;

              let style = 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800';
              let badge = 'bg-slate-100 text-slate-600 border border-slate-200';

              if (hasAnswered) {
                if (isCorrect) {
                  style = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold ring-1 ring-emerald-400';
                  badge = 'bg-emerald-600 text-white';
                } else if (isSelected && !isCorrect) {
                  style = 'border-rose-300 bg-rose-50 text-rose-900';
                  badge = 'bg-rose-600 text-white';
                } else {
                  style = 'opacity-40 border-slate-200 bg-white';
                }
              } else if (isSelected) {
                style = 'border-blue-600 bg-blue-50 text-blue-900 ring-1 ring-blue-600';
                badge = 'bg-blue-600 text-white';
              }

              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleSelectOption(opt.letter)}
                  disabled={hasAnswered}
                  className={`w-full flex items-center gap-3.5 p-3.5 rounded-xl border text-left text-xs sm:text-sm transition-all cursor-pointer ${style}`}
                >
                  <span className={`w-7 h-7 rounded-md flex items-center justify-center font-bold text-xs shrink-0 ${badge}`}>
                    {opt.letter}
                  </span>
                  <span className="flex-1">
                    {opt.text}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100">
            {!hasAnswered ? (
              <button
                type="button"
                onClick={handleConfirm}
                disabled={!selectedOption}
                className={`px-6 py-3 rounded-xl font-bold text-xs sm:text-sm shadow-sm transition-all ${
                  selectedOption
                    ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer shadow-blue-600/20'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                }`}
              >
                Responder Questão
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-md shadow-blue-600/20 cursor-pointer"
                >
                  Próxima Questão →
                </button>
                {isIntermediarioOrAbove && (
                  <button
                    type="button"
                    onClick={() => setMarkedForReview(!markedForReview)}
                    className={`px-4 py-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      markedForReview
                        ? 'border-amber-300 bg-amber-50 text-amber-800 font-bold'
                        : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {markedForReview ? '★ Salva no Caderno de Erros' : 'Salvar no Caderno de Revisão'}
                  </button>
                )}
              </div>
            )}

            <div className="text-xs text-slate-500">
              Questão {currentQuestionIndex + 1} de {SAMPLE_QUESTIONS.length} disponíveis
            </div>
          </div>

          {/* Explanation Step */}
          {hasAnswered && (
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center gap-2 text-blue-700 font-bold text-sm">
                <BookOpen className="w-4 h-4" />
                <span>Explicação do Professor e Resolução Didática:</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {question.explanation}
              </p>

              <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                <span>Estatística: {question.stats.correctRate}% dos alunos acertaram esta questão</span>
                <span className="font-bold text-emerald-700">Gabarito Oficial: Letra {question.correctOptionLetter}</span>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
