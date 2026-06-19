import { useState, useMemo } from 'react'
import { Heart, AlertTriangle, Trash2, ShoppingBag } from 'lucide-react'
import { ProductCard } from '@/components/ProductCard'
import type { Product } from '@/types'

interface FavoritesPageProps {
  products: Product[]
  favorites: number[]
  onToggleFavorite: (id: number) => void
  onClearFavorites: () => void
}

type SortMode = 'discount' | 'price' | 'date'

export function FavoritesPage({ products, favorites, onToggleFavorite, onClearFavorites }: FavoritesPageProps) {
  const [sortMode, setSortMode] = useState<SortMode>('discount')

  const favoriteProducts = useMemo(() => {
    const list = products.filter(p => favorites.includes(p.id))
    switch (sortMode) {
      case 'discount': return [...list].sort((a, b) => b.discount - a.discount)
      case 'price': return [...list].sort((a, b) => a.price - b.price)
      case 'date': return list // By default order (date added = order in favorites array)
      default: return list
    }
  }, [products, favorites, sortMode])

  if (favorites.length === 0) {
    return (
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
        <div className="w-16 h-16 bg-slate-700/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Heart className="w-8 h-8 text-slate-600" />
        </div>
        <h2 className="text-xl font-bold text-white mb-2">Избранное пусто</h2>
        <p className="text-sm text-slate-400 max-w-md mx-auto">
          Добавляйте товары в избранное, нажимая на сердечко в карточке товара. 
          Все избранные товары сохраняются в вашем браузере.
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-red-500 fill-red-500" />
          <h1 className="text-xl sm:text-2xl font-bold text-white">
            Избранное <span className="text-slate-500 text-base font-normal">({favorites.length})</span>
          </h1>
        </div>
        <div className="flex items-center gap-2">
          {/* Sort */}
          <div className="flex items-center bg-[#1e293b] border border-slate-700/30 rounded-xl overflow-hidden">
            <span className="px-3 text-xs text-slate-500 border-r border-slate-700/30">Сортировка</span>
            {([
              { mode: 'discount' as SortMode, label: 'По скидке' },
              { mode: 'price' as SortMode, label: 'По цене' },
              { mode: 'date' as SortMode, label: 'По дате' },
            ]).map(opt => (
              <button
                key={opt.mode}
                onClick={() => setSortMode(opt.mode)}
                className={`px-3 py-2 text-xs font-medium transition-colors ${sortMode === opt.mode ? 'bg-cyan-500/15 text-cyan-400' : 'text-slate-400 hover:text-white'}`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <button
            onClick={onClearFavorites}
            className="flex items-center gap-1.5 px-3 py-2 text-xs text-red-400 hover:bg-red-500/10 rounded-xl transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Очистить
          </button>
        </div>
      </div>

      {/* Warning about price changes */}
      <div className="flex items-start gap-2.5 p-3 sm:p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl mb-5 sm:mb-6">
        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <p className="text-xs text-amber-300/80">
          Цены и скидки обновляются ежедневно. Если товар подорожал — скидка может быть уже неактуальной. 
          Всегда проверяйте финальную цену на странице AliExpress перед покупкой.
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
        {favoriteProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            isFavorite={true}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>

      {/* Tip */}
      <div className="mt-8 text-center">
        <p className="text-xs text-slate-500 flex items-center justify-center gap-1.5">
          <ShoppingBag className="w-3.5 h-3.5" />
          Избранное сохраняется в вашем браузере и доступно только на этом устройстве
        </p>
      </div>
    </div>
  )
}
