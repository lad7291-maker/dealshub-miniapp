import { ExternalLink, Zap, Gift, Bell } from 'lucide-react';

interface TelegramBannerProps {
  variant?: 'inline' | 'sidebar' | 'bottom';
}

export function TelegramBanner({ variant = 'inline' }: TelegramBannerProps) {
  if (variant === 'sidebar') {
    return (
      <div className="bg-gradient-to-br from-[#0088cc]/20 to-[#0088cc]/5 border border-[#0088cc]/30 rounded-2xl p-4 text-center">
        <div className="w-10 h-10 bg-[#0088cc]/20 rounded-xl flex items-center justify-center mx-auto mb-3">
          <svg className="w-5 h-5 text-[#0088cc]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
          </svg>
        </div>
        <h4 className="text-sm font-bold text-white mb-1">Telegram-канал</h4>
        <p className="text-xs text-slate-400 mb-3">
          Горячие скидки каждый день + эксклюзивные промокоды
        </p>
        <a
          href="https://t.me/SmartRuMarket"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#0088cc] hover:bg-[#0099dd] text-white text-xs font-semibold rounded-xl transition-colors"
        >
          Подписаться
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    );
  }

  if (variant === 'bottom') {
    return (
      <div className="bg-gradient-to-r from-[#0088cc]/10 via-[#0088cc]/5 to-transparent border-t border-[#0088cc]/20 py-4 px-4">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <svg className="w-8 h-8 text-[#0088cc]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
            </svg>
            <div>
              <p className="text-sm font-semibold text-white">Эксклюзивные скидки в Telegram</p>
              <p className="text-xs text-slate-400">Получайте лучшие предложения первыми</p>
            </div>
          </div>
          <a
            href="https://t.me/SmartRuMarket"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#0088cc] hover:bg-[#0099dd] text-white text-sm font-semibold rounded-xl transition-colors"
          >
            Подписаться
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    );
  }

  // Inline (default)
  return (
    <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="relative overflow-hidden bg-gradient-to-r from-[#0f172a] via-[#162033] to-[#0f172a] border border-[#0088cc]/20 rounded-2xl p-5 sm:p-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#0088cc]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

        <div className="relative flex flex-col lg:flex-row items-center gap-5 lg:gap-8">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#0088cc]/20 rounded-2xl flex items-center justify-center shrink-0">
            <svg
              className="w-7 h-7 sm:w-8 sm:h-8 text-[#0088cc]"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
            </svg>
          </div>

          <div className="flex-1 text-center lg:text-left">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
              Горячие скидки каждый день в Telegram
            </h3>
            <p className="text-sm text-slate-400 mb-3">
              Подпишитесь на наш канал @SmartRuMarket и получайте эксклюзивные промокоды,
              флеш-скидки и подборки товаров раньше других.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-2">
              <span className="inline-flex items-center gap-1 text-xs text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-full">
                <Zap className="w-3 h-3" /> Мгновенные уведомления
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full">
                <Gift className="w-3 h-3" /> Эксклюзивные промокоды
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full">
                <Bell className="w-3 h-3" /> Анонсы распродаж
              </span>
            </div>
          </div>

          <a
            href="https://t.me/SmartRuMarket"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-[#0088cc] hover:bg-[#0099dd] text-white font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-[#0088cc]/20"
          >
            Подписаться
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
