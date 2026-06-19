import { Trophy } from 'lucide-react'
import { ProductCard } from '@/components/ProductCard'
import type { Product } from '@/types'

interface TopProductsProps {
  products: Product[]
  favorites: number[]
  onToggleFavorite: (id: number) => void
  onProductClick: (id: number) => void
}

export function TopProducts({ products, favorites, onToggleFavorite, onProductClick }: TopProductsProps) {
  const sorted = [...products].sort((a, b) => b.orders - a.orders).slice(0, 10)

  return (
    <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="flex items-center gap-2 mb-6">
        <Trophy className="w-5 h-5 text-amber-400" />
        <h2 className="text-xl sm:text-2xl font-bold text-white">Топ-10 за неделю</h2>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4">
        {sorted.map((product, i) => (
          <ProductCard
            key={product.id}
            product={product}
            isFavorite={favorites.includes(product.id)}
            onToggleFavorite={onToggleFavorite}
            onProductClick={onProductClick}
            index={i}
          />
        ))}
      </div>
    </section>
  )
}
