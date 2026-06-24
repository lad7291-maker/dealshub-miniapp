import { useState, useMemo } from 'react'
import { LayoutGrid, ChevronRight } from 'lucide-react'
import { ProductCard } from '@/components/ProductCard'
import { FilterBar } from '@/components/FilterBar'
import { CategorySidebar } from '@/components/CategorySidebar'
import { trackFilter, trackSort, trackPagination } from '@/lib/analytics'
import type { Product, Category } from '@/types'

interface ProductCatalogProps {
  products: Product[]
  categories: Category[]
  activeCategory: string
  onCategoryChange: (cat: string) => void
  favorites: number[]
  onToggleFavorite: (id: number) => void
  onProductClick: (id: number) => void
  searchQuery: string
}

export function ProductCatalog({
  products, categories, activeCategory, onCategoryChange,
  favorites, onToggleFavorite, onProductClick, searchQuery,
}: ProductCatalogProps) {
  const [discountFilter, setDiscountFilter] = useState('all')
  const [appliedSort, setAppliedSort] = useState('discount')
  const ITEMS_PER_PAGE = 12
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE)

  const filteredProducts = useMemo(() => {
    let result = [...products]

    // Category filter
    if (activeCategory !== 'all') {
      result = result.filter(p => p.category === activeCategory)
    }

    // Search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      result = result.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.subtitle?.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      )
    }

    // Discount filter
    if (discountFilter !== 'all') {
      const min = parseInt(discountFilter)
      result = result.filter(p => p.discount >= min)
    }

    // Sort
    switch (appliedSort) {
      case 'price_asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price_desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'orders':
        result.sort((a, b) => b.orders - a.orders)
        break
      case 'discount':
      default:
        result.sort((a, b) => b.discount - a.discount)
        break
    }

    return result
  }, [products, activeCategory, searchQuery, discountFilter, appliedSort])

  const visibleProducts = useMemo(() => {
    return filteredProducts.slice(0, displayCount)
  }, [filteredProducts, displayCount])

  const handleDiscountFilterChange = (value: string) => {
    setDisplayCount(ITEMS_PER_PAGE)
    setDiscountFilter(value)
    if (value !== 'all') trackFilter(`discount_${value}`)
  }

  const handleResetFilters = () => {
    setDisplayCount(ITEMS_PER_PAGE)
    setDiscountFilter('all')
    trackFilter('reset')
  }

  const handleLoadMore = () => {
    setDisplayCount(prev => prev + ITEMS_PER_PAGE)
    trackPagination(displayCount / ITEMS_PER_PAGE + 1, activeCategory)
  }

  const handleSortChange = (value: string) => {
    setAppliedSort(value)
    trackSort(value)
  }

  const activeCategoryName = categories.find(c => c.id === activeCategory)?.name || 'Все'

  return (
    <section className="max-w-[1440px] mx-auto px-3 sm:px-4 lg:px-6 py-6 sm:py-8">
      <div className="flex gap-4 lg:gap-6">
        {/* Sidebar - Desktop */}
        <div className="hidden lg:block w-64 shrink-0">
          <CategorySidebar
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={onCategoryChange}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">

          {/* Category Title */}
          <div className="flex items-center gap-2 mb-4">
            <LayoutGrid className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg sm:text-xl font-bold text-white">{activeCategoryName}</h2>
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </div>

          {/* Filters */}
          <FilterBar
            discountFilter={discountFilter}
            onDiscountFilterChange={handleDiscountFilterChange}
            onResetFilters={handleResetFilters}
            productCount={filteredProducts.length}
            sortValue={appliedSort}
            onSortChange={handleSortChange}
          />

          {/* Product Grid */}
          {visibleProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                {visibleProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isFavorite={favorites.includes(product.id)}
                    onToggleFavorite={() => onToggleFavorite(product.id)}
                    onProductClick={() => onProductClick(product.id)}
                  />
                ))}
              </div>

              {visibleProducts.length < filteredProducts.length && (
                <div className="text-center mt-6">
                  <button
                    onClick={handleLoadMore}
                    className="px-6 py-3 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-cyan-400 hover:bg-cyan-500/20 transition-colors"
                  >
                    Ещё товары ({filteredProducts.length - visibleProducts.length} осталось)
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <LayoutGrid className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <p className="text-slate-400 text-sm">Товары не найдены</p>
              <button
                onClick={handleResetFilters}
                className="text-cyan-400 text-sm hover:underline mt-2"
              >
                Сбросить фильтры
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
