import { Tag, Copy, Check, Clock, ShoppingCart, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import type { PromoCode, FAQItem } from '@/types';

interface PromoCodesSectionProps {
  promos: PromoCode[];
  faq?: FAQItem[];
}

export function PromoCodesSection({ promos, faq }: PromoCodesSectionProps) {
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [categoryFilter, setCategoryFilter] = useState('all');

  const handleCopy = (code: string, id: number) => {
    navigator.clipboard.writeText(code).catch(() => {});
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const categories = ['all', ...new Set(promos.map((p) => p.category))];
  const categoryNames: Record<string, string> = {
    all: 'Все',
    electronics: 'Электроника',
    clothing: 'Одежда',
    shoes: 'Обувь',
    home: 'Дом',
    auto: 'Авто',
    sport: 'Спорт',
    beauty: 'Красота',
  };

  const filtered =
    categoryFilter === 'all' ? promos : promos.filter((p) => p.category === categoryFilter);

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="text-center mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/20 rounded-full mb-4">
          <Tag className="w-4 h-4 text-cyan-400" />
          <span className="text-sm font-semibold text-cyan-300">Промокоды и купоны</span>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
          Промокоды AliExpress 2026
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
          Актуальные промокоды и купоны AliExpress. Копируйте коды и применяйте при оформлении
          заказа для дополнительной экономии.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-6 sm:mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${categoryFilter === cat ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20' : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700 hover:text-white'}`}
          >
            {categoryNames[cat] || cat}
          </button>
        ))}
      </div>

      {/* Promo Codes Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-10 sm:mb-14">
        {filtered.map((promo) => (
          <div
            key={promo.id}
            className="relative bg-[#1e293b] border border-slate-700/50 hover:border-cyan-500/30 rounded-2xl p-4 sm:p-5 transition-all hover:-translate-y-0.5"
          >
            {promo.isNew && (
              <span className="absolute top-3 right-3 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                NEW
              </span>
            )}

            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 bg-cyan-500/10 rounded-xl flex items-center justify-center shrink-0">
                <Tag className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">{promo.discount}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{promo.description}</p>
              </div>
            </div>

            <div className="bg-[#0f172a] rounded-xl p-3 mb-3 flex items-center justify-between">
              <code className="text-sm font-mono font-bold text-cyan-400">{promo.code}</code>
              <button
                onClick={() => handleCopy(promo.code, promo.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${copiedId === promo.id ? 'bg-green-500/20 text-green-400' : 'bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20'}`}
              >
                {copiedId === promo.id ? (
                  <Check className="w-3 h-3" />
                ) : (
                  <Copy className="w-3 h-3" />
                )}
                {copiedId === promo.id ? 'Скопировано' : 'Копировать'}
              </button>
            </div>

            <div className="space-y-1.5 text-xs text-slate-500">
              <div className="flex items-center gap-1.5">
                <ShoppingCart className="w-3 h-3" />
                Мин. заказ: {promo.minOrder.toLocaleString('ru')} ₽
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3 h-3" />
                До: {promo.expiry}
              </div>
              <div className="flex items-center gap-1.5">
                <AlertCircle className="w-3 h-3" />
                Категория: {categoryNames[promo.category] || promo.category}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* How to use */}
      <div className="bg-gradient-to-br from-[#1e293b] to-[#1a2636] border border-slate-700/50 rounded-2xl p-5 sm:p-8 mb-10">
        <h2 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-cyan-400" />
          Как использовать промокоды и купоны AliExpress
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[
            {
              step: '1',
              title: 'Выберите товар',
              desc: 'Найдите нужный товар в нашем каталоге и перейдите на страницу товара.',
            },
            {
              step: '2',
              title: 'Скопируйте код',
              desc: 'Нажмите "Копировать" рядом с подходящим промокодом на этой странице.',
            },
            {
              step: '3',
              title: 'Перейдите на AliExpress',
              desc: 'Нажмите "На AliExpress" в карточке товара и добавьте товар в корзину.',
            },
            {
              step: '4',
              title: 'Примените код',
              desc: 'При оформлении заказа вставьте промокод в поле "Код купона" и нажмите "Применить".',
            },
          ].map((item) => (
            <div key={item.step} className="flex gap-3">
              <div className="w-8 h-8 shrink-0 bg-cyan-500/10 rounded-lg flex items-center justify-center">
                <span className="text-sm font-bold text-cyan-400">{item.step}</span>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white mb-1">{item.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      {faq && faq.length > 0 && (
        <div className="bg-[#1e293b]/40 border border-slate-700/30 rounded-2xl p-5 sm:p-8">
          <h2 className="text-lg sm:text-xl font-bold text-white mb-5">
            Частые вопросы о промокодах
          </h2>
          <div className="space-y-4">
            {faq.map((item, i) => (
              <details key={i} className="group bg-[#0f172a]/50 rounded-xl overflow-hidden">
                <summary className="flex items-center justify-between p-4 cursor-pointer list-none">
                  <span className="text-sm font-medium text-white pr-4">{item.question}</span>
                  <span className="w-6 h-6 shrink-0 bg-cyan-500/10 rounded-full flex items-center justify-center group-open:rotate-180 transition-transform">
                    <svg
                      className="w-3 h-3 text-cyan-400"
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
                <div className="px-4 pb-4 text-sm text-slate-400 leading-relaxed">
                  {item.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
