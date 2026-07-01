import { Zap, ArrowRight, Tag, TrendingUp, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  onNavigate: (page: string) => void;
  onCategorySelect: (category: string) => void;
}

export function HeroSection({ onNavigate, onCategorySelect }: HeroSectionProps) {
  const quickCategories = [
    { id: 'electronics', label: 'Электроника', icon: 'Monitor', discount: 'до 90%' },
    { id: 'clothing', label: 'Одежда', icon: 'Shirt', discount: 'до 80%' },
    { id: 'shoes', label: 'Обувь', icon: 'Footprints', discount: 'до 75%' },
    { id: 'home', label: 'Товары для дома', icon: 'Home', discount: 'до 85%' },
  ];

  return (
    <section className="relative bg-gradient-to-b from-[#0f172a] via-[#162032] to-[#0f172a] overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, cyan 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />

      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-20">
        {/* Badge */}
        <div className="flex justify-center mb-4 sm:mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/30 rounded-full">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-xs sm:text-sm font-semibold text-cyan-300">
              1000+ товаров со скидками до 90%
            </span>
          </div>
        </div>

        {/* Main Title */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 sm:mb-6">
            Выгодные предложения с{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text text-transparent">
              AliExpress
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed px-4">
            Экономьте до <span className="text-cyan-400 font-bold">90%</span> на топовых товарах с
            бесплатной доставкой. Мы собираем реальные скидки, проверяем отзывы и обновляем каталог
            каждый день.
          </p>
        </div>

        {/* Stats Row */}
        <div className="flex justify-center gap-4 sm:gap-8 mb-8 sm:mb-10">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1.5 text-xl sm:text-2xl font-bold text-white">
              <TrendingUp className="w-5 h-5 text-cyan-400" />
              1050+
            </div>
            <div className="text-xs sm:text-sm text-slate-500 mt-0.5">товаров</div>
          </div>
          <div className="w-px bg-slate-700" />
          <div className="text-center">
            <div className="flex items-center justify-center gap-1.5 text-xl sm:text-2xl font-bold text-white">
              <Tag className="w-5 h-5 text-pink-400" />
              до 90%
            </div>
            <div className="text-xs sm:text-sm text-slate-500 mt-0.5">скидки</div>
          </div>
          <div className="w-px bg-slate-700" />
          <div className="text-center">
            <div className="flex items-center justify-center gap-1.5 text-xl sm:text-2xl font-bold text-white">
              <Users className="w-5 h-5 text-emerald-400" />
              Бесплатная
            </div>
            <div className="text-xs sm:text-sm text-slate-500 mt-0.5">доставка</div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-10 sm:mb-14">
          <Button
            onClick={() => onCategorySelect('electronics')}
            className="h-12 px-6 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-white font-semibold rounded-xl shadow-lg shadow-cyan-500/25 text-sm sm:text-base"
          >
            Смотреть скидки на электронику
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <Button
            onClick={() => onNavigate('promo')}
            variant="outline"
            className="h-12 px-6 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-300 font-semibold rounded-xl text-sm sm:text-base"
          >
            <Tag className="w-4 h-4 mr-2" />
            Актуальные промокоды
          </Button>
        </div>

        {/* Quick Category Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
          {quickCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onCategorySelect(cat.id)}
              className="group relative p-4 sm:p-5 bg-[#1e293b]/80 hover:bg-[#243447] border border-slate-700/50 hover:border-cyan-500/30 rounded-2xl transition-colors duration-200 text-left"
            >
              <div className="absolute top-3 right-3 text-xs font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full">
                {cat.discount}
              </div>
              <h3 className="text-sm sm:text-base font-semibold text-white group-hover:text-cyan-300 transition-colors mb-1">
                {cat.label}
              </h3>
              <p className="text-xs text-slate-500">{cat.discount} скидки</p>
              <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 mt-3 transition-colors" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
