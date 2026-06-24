import { Heart, Clock, Eye, ShoppingCart, Star, Users, Check } from 'lucide-react';
import type { Product } from '@/types';
import { trackClickOutbound, trackPurchase } from '@/lib/analytics';

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  onProductClick?: (id: number) => void;
  index?: number;
}

const badgeConfig: Record<string, { label: string; className: string }> = {
  bestseller: {
    label: 'Хит продаж',
    className: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  },
  topRated: {
    label: 'Высокий рейтинг',
    className: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  },
  bestPrice: {
    label: 'Выгодная цена',
    className: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  },
  flash: { label: 'Флеш-скидка', className: 'bg-red-500/20 text-red-400 border-red-500/30' },
  new: { label: 'Новинка', className: 'bg-purple-500/20 text-purple-400 border-purple-500/30' },
};

export function ProductCard({
  product,
  isFavorite,
  onToggleFavorite,
  onProductClick,
  index,
}: ProductCardProps) {
  return (
    <div
      onClick={() => onProductClick?.(product.id)}
      className="group bg-[#1e293b] hover:bg-[#23304a] border border-slate-700/50 hover:border-cyan-500/30 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/5 cursor-pointer"
    >
      {/* Image */}
      <div className="relative aspect-square bg-[#161f30] overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Discount Badge */}
        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg shadow-lg">
          -{product.discount}%
        </div>

        {/* Rank Number (for top lists) */}
        {index !== undefined && index < 10 && (
          <div className="absolute top-2 right-10 w-7 h-7 flex items-center justify-center bg-cyan-500 text-white text-xs font-bold rounded-full shadow-lg">
            {index + 1}
          </div>
        )}

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(product.id);
          }}
          className={`absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200 ${isFavorite ? 'bg-red-500 text-white shadow-lg' : 'bg-black/40 text-white hover:bg-black/60 backdrop-blur-sm'}`}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-white' : ''}`} />
        </button>

        {/* Timer */}
        {product.timer && (
          <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/60 backdrop-blur-sm text-amber-400 text-xs font-medium px-2 py-1 rounded-lg">
            <Clock className="w-3 h-3" />
            {product.timer}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4">
        {/* Badges */}
        {product.badges.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {product.badges.map((badge) => (
              <span
                key={badge}
                className={`text-[10px] sm:text-xs font-medium px-2 py-0.5 rounded-full border ${badgeConfig[badge]?.className || ''}`}
              >
                {badgeConfig[badge]?.label || badge}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h3 className="text-sm sm:text-base font-semibold text-white mb-1 line-clamp-2 group-hover:text-cyan-300 transition-colors min-h-[2.5rem] sm:min-h-[3rem]">
          {product.title}
        </h3>

        {/* Subtitle (if exists) */}
        {product.subtitle && (
          <p className="text-xs text-slate-400 mb-2 line-clamp-1">{product.subtitle}</p>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-2">
          {product.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="text-[10px] text-cyan-400/80 bg-cyan-500/10 px-1.5 py-0.5 rounded"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Price */}
        <div className="mb-2">
          <div className="flex items-baseline gap-2">
            <span className="text-lg sm:text-xl font-bold text-cyan-400">
              {product.price.toLocaleString('ru')} ₽
            </span>
            <span className="text-xs sm:text-sm text-slate-500 line-through">
              {product.oldPrice.toLocaleString('ru')} ₽
            </span>
          </div>
        </div>

        {/* Stats Row */}
        <div className="flex items-center gap-2 sm:gap-3 mb-3 text-xs text-slate-500">
          <span className="flex items-center gap-0.5">
            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
            {product.rating}
          </span>
          <span className="flex items-center gap-0.5">
            <Users className="w-3 h-3" />
            {product.orders}
          </span>
          {product.viewers > 0 && (
            <span className="flex items-center gap-0.5 text-pink-400">
              <Eye className="w-3 h-3" />
              {product.viewers}
            </span>
          )}
        </div>

        {/* Shipping */}
        <p className="text-[10px] sm:text-xs text-slate-500 mb-3 flex items-center gap-1">
          <Check className="w-3 h-3 text-emerald-400" />
          {product.shipping}
        </p>

        {/* CTA Buttons */}
        <div className="flex gap-2">
          <a
            href={product.affiliateLink || product.aliLink || '#'}
            target="_blank"
            rel="noopener noreferrer sponsored nofollow"
            onClick={(e) => {
              e.stopPropagation();
              trackClickOutbound(product.id);
              trackPurchase({ id: product.id, title: product.title, price: product.price });
            }}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-white text-sm font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/20"
          >
            <ShoppingCart className="w-4 h-4" />
            На AliExpress
          </a>
          {onProductClick && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onProductClick(product.id);
              }}
              className="px-3 py-2.5 bg-slate-700 hover:bg-slate-600 text-white text-sm font-medium rounded-xl transition-colors"
            >
              Подробнее
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
