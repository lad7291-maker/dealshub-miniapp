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
  const [priceFrom, setPriceFrom] = useState('')
  const [priceTo, setPriceTo] = useState('')
  const [appliedSort, setAppliedSort] = useState('discount')
  const [currentPage, setCurrentPage] = useState(1)
  const ITEMS_PER_PAGE = 24

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
  }, [products, activeCategory, searchQuery, discountFilter, priceFrom, priceTo, appliedSort])

  const handleSortChange = (value: string) => {
    setCurrentPage(1)
    setAppliedSort(value)
    trackSort(value)
  }

  const handleDiscountFilterChange = (value: string) => {
    setCurrentPage(1)
    setDiscountFilter(value)
    if (value !== 'all') trackFilter(`discount_${value}`)
  }

  const handleResetFilters = () => {
    setCurrentPage(1)
    setDiscountFilter('all')
    setPriceFrom('')
    setPriceTo('')
    trackFilter('reset')
  }

  const handleApplyPriceFilter = () => {
    trackFilter(`price_${priceFrom || 0}_${priceTo || 'max'}`)
  }

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredProducts, currentPage])

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    trackPagination(page, activeCategory)
    window.scrollTo({ top: 0, behavior: 'smooth' })
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
            onDiscountFilterChange={handleDiscountFilterChange}
            priceFrom={priceFrom}
            priceTo={priceTo}
            onPriceFromChange={setPriceFrom}
            onPriceToChange={setPriceTo}
            onApplyPriceFilter={handleApplyPriceFilter}
            onResetFilters={handleResetFilters}
            productCount={filteredProducts.length}
            sortValue={appliedSort}
            onSortChange={handleSortChange}
          />

          {/* Product Grid */}
          {paginatedProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                {paginatedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isFavorite={favorites.includes(product.id)}
                    onToggleFavorite={onToggleFavorite}
                    onProductClick={onProductClick}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-6">
                  <button
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1.5 rounded-lg text-sm font-medium bg-slate-700 text-white hover:bg-slate-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    ← Назад
                  </button>
                  <span className="text-sm text-slate-400 px-2">
                    Страница {currentPage} из {totalPages}
                  </span>
                  <button
                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1.5 rounded-lg text-sm font-medium bg-slate-700 text-white hover:bg-slate-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    Вперёд →
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
