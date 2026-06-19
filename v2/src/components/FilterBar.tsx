import { SlidersHorizontal, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface FilterBarProps {
  discountFilter: string
  onDiscountFilterChange: (filter: string) => void
  priceFrom: string
  priceTo: string
  onPriceFromChange: (value: string) => void
  onPriceToChange: (value: string) => void
  onApplyPriceFilter: () => void
  onResetFilters: () => void
  productCount: number
}

export function FilterBar({
  discountFilter, onDiscountFilterChange,
  priceFrom, priceTo, onPriceFromChange, onPriceToChange,
  onApplyPriceFilter, onResetFilters, productCount,
}: FilterBarProps) {
  const discountOptions = [
    { value: 'all', label: 'Все скидки' },
    { value: '30', label: '30%+' },
    { value: '50', label: '50%+' },
    { value: '70', label: '70%+' },
    { value: '90', label: '90%+' },
  ]

  const hasActiveFilters = discountFilter !== 'all' || priceFrom || priceTo

  return (
    <div className="bg-[#1e293b]/60 border border-slate-700/30 rounded-2xl p-3 sm:p-4 mb-4 sm:mb-6">
      <div className="flex flex-col gap-3">
        {/* Discount Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-slate-400 mr-1" />
          {discountOptions.map(opt => (
            <button
              key={opt.value}
              onClick={() => onDiscountFilterChange(opt.value)}
              className={`px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all ${discountFilter === opt.value ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20' : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700 hover:text-white'}`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Price Filter */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <span className="text-xs text-slate-400">Цена:</span>
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="От ₽"
              value={priceFrom}
              onChange={e => onPriceFromChange(e.target.value)}
              className="w-20 sm:w-24 h-8 px-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
            />
            <span className="text-slate-500">—</span>
            <input
              type="number"
              placeholder="До ₽"
              value={priceTo}
              onChange={e => onPriceToChange(e.target.value)}
              className="w-20 sm:w-24 h-8 px-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
            />
            <Button
              onClick={onApplyPriceFilter}
              variant="outline"
              size="sm"
              className="h-8 px-3 text-xs border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
            >
              ОК
            </Button>
          </div>

          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="flex items-center gap-1 text-xs text-slate-400 hover:text-red-400 transition-colors ml-auto"
            >
              <X className="w-3 h-3" />
              Сбросить
            </button>
          )}
        </div>

        {/* Count */}
        <div className="text-xs text-slate-500">
          {productCount} товаров
        </div>
      </div>
    </div>
  )
}
