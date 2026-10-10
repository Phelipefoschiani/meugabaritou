export type PlanId = 'iniciante' | 'intermediario' | 'avancado';

export interface PlanFeature {
  text: string;
  included: boolean;
  highlight?: boolean;
}

export interface Plan {
  id: PlanId;
  name: string;
  priceMonthly: number;
  priceQuarterly: number;
  priceQuarterlyTotal: number;
  priceYearly?: number;
  tagline: string;
  summaryAction: string;
  description: string;
  badge?: string;
  isPopular?: boolean;
  colorScheme: {
    primary: string;
    border: string;
    bgBadge: string;
    textBadge: string;
    buttonBg: string;
  };
  highlights: string[];
}

export interface ComparisonRow {
  feature: string;
  category: 'Estudo & Questões' | 'Simulados' | 'Análise & Diagnóstico' | 'Estudo Direcionado & Metas';
  iniciante: string | boolean;
  intermediario: string | boolean;
  avancado: string | boolean;
  description?: string;
}

export interface QuestionOption {
  id: string;
  text: string;
  letter: 'A' | 'B' | 'C' | 'D' | 'E';
}

export interface SampleQuestion {
  id: string;
  exam: string;
  year: number;
  institution: string;
  subject: string;
  topic: string;
  difficulty: 'Fácil' | 'Médio' | 'Difícil';
  statement: string;
  codeSnippet?: string;
  options: QuestionOption[];
  correctOptionLetter: string;
  explanation: string;
  resolutionSteps: string[];
  stats: {
    totalAnswers: number;
    correctRate: number;
    distribution: Record<string, number>;
  };
}

export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  targetExam: string;
  approvedRole: string;
  quote: string;
  planUsed: string;
  scoreOrRank: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}
