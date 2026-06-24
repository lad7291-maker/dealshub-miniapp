import { useEffect } from 'react';
import {
  Heart,
  Star,
  Users,
  Eye,
  Check,
  ArrowLeft,
  ShoppingCart,
  Share2,
  Store,
  Truck,
  Tag,
} from 'lucide-react';
import type { Product } from '@/types';
import { trackViewItem, trackPurchase } from '@/lib/analytics';

interface ProductPageProps {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  onBack: () => void;
}

export function ProductPage({ product, isFavorite, onToggleFavorite, onBack }: ProductPageProps) {
  useEffect(() => {
    trackViewItem({ id: product.id, title: product.title, price: product.price });
  }, [product]);

  const discountAmount = product.oldPrice - product.price;

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      {/* Breadcrumb / Back */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-cyan-400 transition-colors mb-4"
      >
        <ArrowLeft className="w-4 h-4" />
        Назад в каталог
      </button>

      <div className="grid lg:grid-cols-2 gap-6 lg:gap-10">
        {/* Image */}
        <div className="bg-[#1e293b] border border-slate-700/50 rounded-2xl overflow-hidden">
          <div className="aspect-square">
            <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col">
          {/* Badges */}
          {product.badges.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {product.badges.map((badge) => {
                const labels: Record<string, string> = {
                  bestseller: 'Хит продаж',
                  topRated: 'Лучший рейтинг',
                  bestPrice: 'Лучшая цена',
                  flash: 'Флеш-скидка',
                  new: 'Новинка',
                };
                const colors: Record<string, string> = {
                  bestseller: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
                  topRated: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
                  bestPrice: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
                  flash: 'bg-red-500/20 text-red-400 border-red-500/30',
                  new: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
                };
                return (
                  <span
                    key={badge}
                    className={`text-xs font-medium px-2.5 py-1 rounded-full border ${colors[badge] || ''}`}
                  >
                    {labels[badge] || badge}
                  </span>
                );
              })}
            </div>
          )}

          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2">
            {product.title}
          </h1>

          {product.subtitle && (
            <p className="text-sm sm:text-base text-slate-400 mb-4">{product.subtitle}</p>
          )}

          {/* Rating & Orders */}
          <div className="flex items-center gap-4 mb-5 text-sm text-slate-400">
            <span className="flex items-center gap-1">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span className="text-white font-medium">{product.rating}</span>
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {product.orders} заказов
            </span>
            {product.viewers > 0 && (
              <span className="flex items-center gap-1 text-pink-400">
                <Eye className="w-4 h-4" />
                {product.viewers} смотрят
              </span>
            )}
          </div>

          {/* Price */}
          <div className="bg-gradient-to-br from-[#1e293b] to-[#1a2636] border border-slate-700/50 rounded-2xl p-4 sm:p-5 mb-5">
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-3xl sm:text-4xl font-bold text-cyan-400">
                {product.price.toLocaleString('ru')} ₽
              </span>
              <span className="text-base sm:text-lg text-slate-500 line-through">
                {product.oldPrice.toLocaleString('ru')} ₽
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="bg-red-500 text-white font-bold px-2 py-0.5 rounded">
                -{product.discount}%
              </span>
              <span className="text-emerald-400">
                Экономия {discountAmount.toLocaleString('ru')} ₽
              </span>
            </div>
          </div>

          {/* Tags */}
          {product.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-5">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 text-xs text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-full"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Features */}
          {product.features.length > 0 && (
            <div className="mb-5">
              <h3 className="text-sm font-semibold text-white mb-2">Характеристики</h3>
              <ul className="space-y-1.5">
                {product.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Shop & Shipping */}
          <div className="space-y-2 mb-6 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <Store className="w-4 h-4 text-slate-500" />
              Магазин: <span className="text-white">{product.shopName}</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-slate-500" />
              Доставка: <span className="text-emerald-400">{product.shipping}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 mt-auto">
            <a
              href={product.affiliateLink || product.aliLink || '#'}
              target="_blank"
              rel="noopener noreferrer sponsored nofollow"
              onClick={() =>
                trackPurchase({ id: product.id, title: product.title, price: product.price })
              }
              className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-white text-base font-bold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/20"
            >
              <ShoppingCart className="w-5 h-5" />
              Перейти на AliExpress
            </a>
            <button
              onClick={() => onToggleFavorite(product.id)}
              className={`flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-medium transition-colors ${
                isFavorite
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'bg-slate-700 text-white hover:bg-slate-600'
              }`}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-white' : ''}`} />
              {isFavorite ? 'В избранном' : 'В избранное'}
            </button>
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: product.title, url: window.location.href });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                }
              }}
              className="flex items-center justify-center gap-2 px-5 py-3.5 bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 rounded-xl transition-colors"
            >
              <Share2 className="w-5 h-5" />
              Поделиться
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
