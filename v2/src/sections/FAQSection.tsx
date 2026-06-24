import { HelpCircle } from 'lucide-react';
import type { FAQItem } from '@/types';

interface FAQSectionProps {
  faq: FAQItem[];
  title?: string;
}

export function FAQSection({ faq, title = 'Часто задаваемые вопросы' }: FAQSectionProps) {
  if (!faq || faq.length === 0) return null;

  return (
    <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="flex items-center gap-2 mb-5 sm:mb-6">
        <HelpCircle className="w-5 h-5 text-cyan-400" />
        <h2 className="text-lg sm:text-xl font-bold text-white">{title}</h2>
      </div>

      <div className="max-w-3xl space-y-3">
        {faq.map((item, i) => (
          <details
            key={i}
            className="group bg-[#1e293b]/60 border border-slate-700/30 rounded-xl overflow-hidden hover:border-slate-600/50 transition-colors"
          >
            <summary className="flex items-center justify-between p-4 sm:p-5 cursor-pointer list-none">
              <span className="text-sm sm:text-base font-medium text-white pr-4">
                {item.question}
              </span>
              <span className="w-7 h-7 shrink-0 bg-cyan-500/10 rounded-lg flex items-center justify-center group-open:rotate-180 transition-transform duration-300">
                <svg
                  className="w-3.5 h-3.5 text-cyan-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </span>
            </summary>
            <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-sm text-slate-400 leading-relaxed">
              {item.answer}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
