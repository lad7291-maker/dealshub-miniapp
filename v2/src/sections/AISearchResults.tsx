import { Sparkles, SearchX } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import type { Product } from '@/types';

interface AISearchResultsProps {
  query: string;
  results: Product[];
  favorites: number[];
  onToggleFavorite: (id: number) => void;
  onProductClick: (id: number) => void;
}

export function AISearchResults({
  query,
  results,
  favorites,
  onToggleFavorite,
  onProductClick,
}: AISearchResultsProps) {
  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-cyan-400" />
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white">Результаты AI-поиска</h1>
          <p className="text-sm text-slate-400">
            По запросу "<span className="text-cyan-400">{query}</span>" найдено {results.length}{' '}
            товаров
          </p>
        </div>
      </div>

      {results.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
          {results.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isFavorite={favorites.includes(product.id)}
              onToggleFavorite={onToggleFavorite}
              onProductClick={onProductClick}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 sm:py-24">
          <div className="w-16 h-16 bg-slate-700/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <SearchX className="w-8 h-8 text-slate-500" />
          </div>
          <h2 className="text-lg font-bold text-white mb-2">Ничего не найдено</h2>
          <p className="text-sm text-slate-400 max-w-md mx-auto">
            Попробуйте изменить запрос. Например: "беспроводные наушники", "коврик для мыши" или
            "зарядное устройство".
          </p>
        </div>
      )}
    </div>
  );
}
