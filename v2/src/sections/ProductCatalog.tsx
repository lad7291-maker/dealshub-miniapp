import { useState, useMemo } from 'react'
import { LayoutGrid, ChevronRight } from 'lucide-react'
import { ProductCard } from '@/components/ProductCard'
import { FilterBar } from '@/components/FilterBar'
import { CategorySidebar } from '@/components/CategorySidebar'
import type { Product, Category } from '@/types'

interface ProductCatalogProps {
  products: Product[]
  categories: Category[]
  activeCategory: string
  onCategoryChange: (cat: string) => void
  favorites: number[]
  onToggleFavorite: (id: number) => void
  searchQuery: string
}

export function ProductCatalog({
  products, categories, activeCategory, onCategoryChange,
  favorites, onToggleFavorite, searchQuery,
}: ProductCatalogProps) {
  const [discountFilter, setDiscountFilter] = useState('all')
  const [priceFrom, setPriceFrom] = useState('')
  const [priceTo, setPriceTo] = useState('')

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

    // Price filter
    if (priceFrom) {
      const min = parseInt(priceFrom)
      result = result.filter(p => p.price >= min)
    }
    if (priceTo) {
      const max = parseInt(priceTo)
      result = result.filter(p => p.price <= max)
    }

    return result
  }, [products, activeCategory, searchQuery, discountFilter, priceFrom, priceTo])

  const handleResetFilters = () => {
    setDiscountFilter('all')
    setPriceFrom('')
    setPriceTo('')
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
          {/* Mobile Category Chips */}
          <div className="lg:hidden flex gap-2 overflow-x-auto pb-3 mb-2 -mx-1 px-1 scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => onCategoryChange(cat.id)}
                className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${activeCategory === cat.id ? 'bg-cyan-500 text-white' : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'}`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Category Title */}
          <div className="flex items-center gap-2 mb-4">
            <LayoutGrid className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg sm:text-xl font-bold text-white">{activeCategoryName}</h2>
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </div>

          {/* Filters */}
          <FilterBar
            discountFilter={discountFilter}
            onDiscountFilterChange={setDiscountFilter}
            priceFrom={priceFrom}
            priceTo={priceTo}
            onPriceFromChange={setPriceFrom}
            onPriceToChange={setPriceTo}
            onApplyPriceFilter={() => {}}
            onResetFilters={handleResetFilters}
            productCount={filteredProducts.length}
          />

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isFavorite={favorites.includes(product.id)}
                  onToggleFavorite={onToggleFavorite}
                />
              ))}
            </div>
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
