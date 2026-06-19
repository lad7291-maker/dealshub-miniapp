import { Search, Filter, BadgeCheck, ShoppingCart, RefreshCw } from 'lucide-react'

const steps = [
  {
    icon: Search,
    title: 'Собираем товары',
    description: 'Ежедневно сканируем AliExpress и отбираем товары с реальными скидками от 30% до 90% через партнёрскую программу Admitad.',
    color: 'from-cyan-500/20 to-cyan-600/10',
    iconColor: 'text-cyan-400',
  },
  {
    icon: Filter,
    title: 'Проверяем качество',
    description: 'Фильтруем по рейтингу продавца (4.5+), количеству продаж (100+), отзывам с фото и реальной истории цен за 90 дней.',
    color: 'from-emerald-500/20 to-emerald-600/10',
    iconColor: 'text-emerald-400',
  },
  {
    icon: BadgeCheck,
    title: 'Публикуем лучшее',
    description: 'Добавляем только проверенные товары с подробным описанием, характеристиками и актуальными ценами в рублях.',
    color: 'from-amber-500/20 to-amber-600/10',
    iconColor: 'text-amber-400',
  },
  {
    icon: ShoppingCart,
    title: 'Вы покупаете выгодно',
    description: 'Переходите на AliExpress по нашим ссылкам, получаете ту же цену + применяете промокоды. Мы получаем комиссию и развиваем сервис.',
    color: 'from-pink-500/20 to-pink-600/10',
    iconColor: 'text-pink-400',
  },
  {
    icon: RefreshCw,
    title: 'Обновляем ежедневно',
    description: 'Каталог обновляется каждый день: удаляем товары с истекшими скидками, добавляем новые выгодные предложения.',
    color: 'from-purple-500/20 to-purple-600/10',
    iconColor: 'text-purple-400',
  },
]

export function HowItWorks() {
  return (
    <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="text-center mb-8 sm:mb-10">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2">
          Как работает SmartSkidka
        </h2>
        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
          Прозрачный процесс отбора товаров — вы всегда знаете, что покупаете
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-5">
        {steps.map((step, i) => (
          <div
            key={i}
            className={`relative p-5 sm:p-6 bg-gradient-to-br ${step.color} border border-slate-700/30 rounded-2xl hover:border-slate-600/50 transition-all`}
          >
            <div className={`w-10 h-10 bg-slate-800/80 rounded-xl flex items-center justify-center mb-4 ${step.iconColor}`}>
              <step.icon className="w-5 h-5" />
            </div>
            <div className="absolute top-4 right-4 text-2xl font-bold text-slate-700/50">
              {String(i + 1).padStart(2, '0')}
            </div>
            <h3 className="text-sm sm:text-base font-bold text-white mb-2">{step.title}</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
