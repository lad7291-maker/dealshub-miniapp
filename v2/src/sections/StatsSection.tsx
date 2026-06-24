import { Package, Layers, Calendar, TrendingDown } from 'lucide-react';
import type { Stats } from '@/types';

interface StatsSectionProps {
  stats: Stats;
}

export function StatsSection({ stats }: StatsSectionProps) {
  const items = [
    {
      icon: Package,
      value: `${stats.productCount}+`,
      label: 'товаров в базе',
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10',
    },
    {
      icon: Layers,
      value: `${stats.categoryCount}`,
      label: 'категорий',
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
    },
    {
      icon: Calendar,
      value: `${stats.yearLaunched}`,
      label: 'год запуска',
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
    },
    {
      icon: TrendingDown,
      value: `${stats.dailyDeals}+`,
      label: 'новых скидок ежедневно',
      color: 'text-pink-400',
      bg: 'bg-pink-500/10',
    },
  ];

  return (
    <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5 bg-[#1e293b]/60 border border-slate-700/30 rounded-2xl"
          >
            <div
              className={`w-10 h-10 sm:w-12 sm:h-12 ${item.bg} rounded-xl flex items-center justify-center shrink-0`}
            >
              <item.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${item.color}`} />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-white">{item.value}</div>
              <div className="text-xs sm:text-sm text-slate-400">{item.label}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
