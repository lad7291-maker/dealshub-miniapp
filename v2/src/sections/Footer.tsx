import { Zap, Mail, FileText, Shield, HelpCircle } from 'lucide-react';

export function Footer() {
  const categoryLinks = [
    { name: 'Электроника', slug: 'electronics' },
    { name: 'Одежда', slug: 'clothing' },
    { name: 'Обувь', slug: 'shoes' },
    { name: 'Товары для дома', slug: 'home' },
    { name: 'Автотовары', slug: 'auto' },
    { name: 'Красота', slug: 'beauty' },
    { name: 'Спорт', slug: 'sport' },
  ];

  const infoLinks = [
    { name: 'О нас', slug: 'about' },
    { name: 'Контакты', slug: 'contacts' },
    { name: 'Политика конфиденциальности', slug: 'privacy' },
    { name: 'Условия использования', slug: 'terms' },
  ];

  const promoLinks = [
    { name: 'Промокоды AliExpress', slug: 'promo' },
    { name: 'Промокод для первого заказа', slug: 'promo/first-order' },
    { name: 'Чёрная пятница 2026', slug: 'promo/black-friday' },
    { name: 'Распродажа 11.11', slug: 'promo/11-11' },
    { name: 'Киберпонедельник', slug: 'promo/cyber-monday' },
  ];

  return (
    <footer className="bg-[#0a0f1c] border-t border-slate-700/30">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 mb-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white">
                Smart<span className="text-cyan-400">Skidka</span>.ru
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              Лучшие скидки и промокоды на товары с AliExpress. Экономьте умнее — мы ежедневно
              отбираем самые выгодные предложения.
            </p>
            <div className="flex items-center gap-2">
              <a
                href="https://t.me/SmartRuMarket"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-[#0088cc]/20 hover:bg-[#0088cc]/30 rounded-lg flex items-center justify-center transition-colors"
                title="Telegram-канал"
              >
                <svg className="w-4 h-4 text-[#0088cc]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-sm font-bold text-white mb-3 uppercase tracking-wider">
              Категории
            </h4>
            <ul className="space-y-2">
              {categoryLinks.map((link) => (
                <li key={link.slug}>
                  <span className="text-sm text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer">
                    {link.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Promo */}
          <div>
            <h4 className="text-sm font-bold text-white mb-3 uppercase tracking-wider">
              Промокоды
            </h4>
            <ul className="space-y-2">
              {promoLinks.map((link) => (
                <li key={link.slug}>
                  <span className="text-sm text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer flex items-center gap-1">
                    <FileText className="w-3 h-3" />
                    {link.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-sm font-bold text-white mb-3 uppercase tracking-wider">
              Информация
            </h4>
            <ul className="space-y-2">
              {infoLinks.map((link) => (
                <li key={link.slug}>
                  <span className="text-sm text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer flex items-center gap-1">
                    {link.slug === 'contacts' && <Mail className="w-3 h-3" />}
                    {link.slug === 'privacy' && <Shield className="w-3 h-3" />}
                    {link.slug === 'terms' && <FileText className="w-3 h-3" />}
                    {!['contacts', 'privacy', 'terms'].includes(link.slug) && (
                      <HelpCircle className="w-3 h-3" />
                    )}
                    {link.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="pt-6 border-t border-slate-700/30">
          <p className="text-xs text-slate-500 text-center leading-relaxed mb-3">
            SmartSkidka.ru — не является магазином. Все товары продаются на AliExpress через
            партнёрскую программу Admitad. Мы получаем комиссию за переходы, что позволяет
            поддерживать сервис бесплатным для пользователей.
          </p>
          <p className="text-xs text-slate-600 text-center">
            © 2024–2026 SmartSkidka.ru. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
}
