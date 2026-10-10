import React from 'react';
import { Check } from 'lucide-react';
import { COMPARISON_TABLE_DATA } from '../data/plansData';
import { PlanId } from '../types';
import { getKiwifyCheckoutUrl } from '../config/kiwifyConfig';

interface ComparisonTableSectionProps {
  onSelectPlan?: (planId: PlanId) => void;
}

export const ComparisonTableSection: React.FC<ComparisonTableSectionProps> = () => {
  // Group rows by category to render sleek, compact grouped sections
  const categories = [
    'Estudo & Questões',
    'Simulados',
    'Análise & Diagnóstico',
    'Estudo Direcionado & Metas',
  ];

  const renderValue = (val: boolean | string, isPopularCol: boolean = false) => {
    if (typeof val === 'string') {
      return (
        <span
          className={`inline-block px-2 py-0.5 rounded text-[11px] font-bold ${
            isPopularCol
              ? 'bg-blue-100 text-blue-800 border border-blue-200'
              : 'bg-slate-100 text-slate-700 border border-slate-200'
          }`}
        >
          {val}
        </span>
      );
    }
    if (val === true) {
      return (
        <div className="flex items-center justify-center">
          <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </span>
        </div>
      );
    }
    return (
      <span className="text-slate-300 font-semibold text-xs tracking-wider">—</span>
    );
  };

  return (
    <section id="comparativo" className="py-12 lg:py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Compact Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Comparativo Rápido de Recursos
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Veja em segundos a diferença exata entre os planos para escolher o seu.
          </p>
        </div>

        {/* Mobile Swipe Cue */}
        <div className="sm:hidden flex items-center justify-center gap-1.5 text-[11px] font-bold text-blue-700 bg-blue-50 py-2 px-3 rounded-xl border border-blue-200 mb-3 text-center">
          <span>👉 Deslize para o lado para ver todos os recursos</span>
        </div>

        {/* Compact Comparison Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto overscroll-x-contain">
            <table className="w-full text-left border-collapse min-w-[560px]">
              
              {/* Table Header */}
              <thead>
                <tr className="border-b border-slate-200 bg-slate-100/80 text-xs">
                  <th className="py-3 px-4 font-bold text-slate-700 w-5/12">
                    Recurso
                  </th>
                  <th className="py-3 px-3 text-center text-slate-800 w-2/12 bg-emerald-50/40">
                    <span className="font-extrabold text-sm block text-emerald-900">Iniciante</span>
                    <span className="text-[11px] font-semibold text-emerald-700">R$ 27/mês</span>
                  </th>
                  <th className="py-3 px-3 text-center text-blue-700 w-2.5/12 bg-blue-50/80 border-x border-blue-200">
                    <div className="inline-flex items-center gap-1 font-black text-sm text-blue-700">
                      <span>Intermediário</span>
                      <span className="text-[10px] bg-blue-600 text-white px-1.5 py-0.2 rounded font-bold">TOP</span>
                    </div>
                    <span className="text-[11px] font-bold text-blue-600 block">R$ 47/mês</span>
                  </th>
                  <th className="py-3 px-3 text-center text-slate-800 w-2.5/12 bg-purple-50/40">
                    <span className="font-extrabold text-sm block text-purple-900">Avançado</span>
                    <span className="text-[11px] font-semibold text-purple-700">R$ 77/mês</span>
                  </th>
                </tr>
              </thead>

              {/* Table Body Grouped by Category */}
              <tbody className="text-xs divide-y divide-slate-100">
                {categories.map((category) => {
                  const rows = COMPARISON_TABLE_DATA.filter((r) => r.category === category);
                  if (rows.length === 0) return null;

                  return (
                    <React.Fragment key={category}>
                      {/* Compact Category Header Divider */}
                      <tr className="bg-slate-50/90 border-t border-b border-slate-200">
                        <td
                          colSpan={4}
                          className="py-1.5 px-4 font-bold uppercase tracking-wider text-[10px] text-slate-500"
                        >
                          {category}
                        </td>
                      </tr>

                      {/* Items */}
                      {rows.map((row, idx) => (
                        <tr
                          key={idx}
                          className="hover:bg-slate-50/70 transition-colors"
                        >
                          <td className="py-2.5 px-4 font-medium text-slate-800">
                            {row.feature}
                          </td>
                          <td className="py-2.5 px-3 text-center text-slate-600">
                            {renderValue(row.iniciante)}
                          </td>
                          <td className="py-2.5 px-3 text-center bg-blue-50/30 border-x border-blue-100">
                            {renderValue(row.intermediario, true)}
                          </td>
                          <td className="py-2.5 px-3 text-center text-slate-700">
                            {renderValue(row.avancado)}
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  );
                })}
              </tbody>

              {/* Table Footer with direct Kiwify buttons */}
              <tfoot className="border-t-2 border-slate-200 bg-slate-50">
                <tr>
                  <td className="py-3 px-4 font-bold text-slate-700 text-xs">
                    Assinatura Kiwify
                  </td>
                  <td className="py-3 px-2 text-center bg-emerald-50/30">
                    <a
                      href={getKiwifyCheckoutUrl('iniciante')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block w-full py-1.5 px-2 rounded-lg text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-2xs"
                    >
                      Assinar
                    </a>
                  </td>
                  <td className="py-3 px-2 text-center bg-blue-50/50 border-x border-blue-200">
                    <a
                      href={getKiwifyCheckoutUrl('intermediario')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block w-full py-1.5 px-2 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-2xs"
                    >
                      Assinar ⭐
                    </a>
                  </td>
                  <td className="py-3 px-2 text-center bg-purple-50/30">
                    <a
                      href={getKiwifyCheckoutUrl('avancado')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block w-full py-1.5 px-2 rounded-lg text-xs font-bold text-white bg-purple-700 hover:bg-purple-800 transition-colors shadow-2xs"
                    >
                      Assinar
                    </a>
                  </td>
                </tr>
              </tfoot>

            </table>
          </div>
        </div>

        {/* Quick Micro-Note */}
        <div className="mt-3 text-center text-[11px] text-slate-500">
          Todos os planos contam com 7 dias de garantia incondicional e cancelamento imediato sem taxa.
        </div>

      </div>
    </section>
  );
};
