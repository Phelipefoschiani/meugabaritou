import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQ_ITEMS } from '../data/plansData';
import { BrandName } from './BrandName';

export const FAQSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 sm:py-20 bg-white text-slate-900 border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header - Without "Dúvidas Comuns" pill */}
        <div className="text-center mb-10 sm:mb-14 space-y-3">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
            Perguntas Frequentes
          </h2>

          <div className="text-sm sm:text-base text-slate-600 flex items-center justify-center flex-wrap gap-x-1.5">
            <span>Tudo o que você precisa saber sobre o</span>
            <BrandName theme="blue" />
            <span>, cancelamento e planos.</span>
          </div>
        </div>

        {/* Animated Accordion List */}
        <div className="space-y-3">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIdx === index;
            return (
              <div
                key={index}
                className={`border rounded-xl transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'border-blue-400/80 shadow-md shadow-blue-500/5 bg-white ring-1 ring-blue-500/15'
                    : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50/50 shadow-xs'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer select-none transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xs font-bold w-6 h-6 rounded-md flex items-center justify-center shrink-0 transition-colors duration-200 ${
                        isOpen
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={`font-bold text-sm sm:text-base transition-colors duration-200 ${
                        isOpen ? 'text-blue-900' : 'text-slate-800'
                      }`}
                    >
                      {item.question}
                    </span>
                  </div>

                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isOpen
                        ? 'bg-blue-50 text-blue-600 rotate-180'
                        : 'bg-slate-100/70 text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4 stroke-[2.5]" />
                  </div>
                </button>

                {/* Smooth Animated Height & Opacity Collapse using CSS Grid */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen
                      ? 'grid-rows-[1fr] opacity-100'
                      : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 pb-5 pt-2 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100/80 bg-slate-50/50 whitespace-pre-line">
                      {item.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Micro-Help Bar */}
        <div className="mt-10 text-center flex items-center justify-center gap-2 text-xs text-slate-500">
          <HelpCircle className="w-4 h-4 text-blue-600" />
          <span>Ainda tem dúvidas? Fale com nossa equipe de suporte no WhatsApp.</span>
        </div>

      </div>
    </section>
  );
};
